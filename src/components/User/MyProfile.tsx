"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { baseApi } from "@/app/api/baseApi";
import UpdateTrip from "../Trip/UpdateTrip";
import UserTripPost from "../Trip/UserTrip";
import Image from "next/image";
import { MdCloudUpload } from "react-icons/md";
import Link from "next/link";
import RequestStatus from "../Trip/RequestStatus";

const MyProfile = ({ userProfileRes, accessToken, userTrips }: any) => {
  const [profileUpdate, setProfileUpdate] = useState(true);
  const [travelPost, setTravelPost] = useState(false);
  const [requestHistory, setRequestHistory] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [updatedUser, setUpdatedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgStorageKey = "52e2a715dfd6d706e4d4ce8b0cd8526f";

  const userProfile = userProfileRes?.data?.userProfile[0];
  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const inputData: any = {
        username,
        email,
        age: Number(age),
        contactNumber,
        address,
      };

      const allValuesEmpty = Object.values(inputData).every(
        (value) =>
          value === "" || value === null || value === undefined || value === 0 || file && previewImg
      );

      if (allValuesEmpty) {
        setFile(null);
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "At least one field must be filled out, if you want to update!",
        });
        return;
      }

      if (file && previewImg) {
        const formData = new FormData();
        formData.append("image", file);

        const imgRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgStorageKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const imgData = await imgRes.json();

        if (imgData.success) {
          setImageURL(imgData.data.url);
          inputData.profilePhoto = imgData.data.url;
        } else {
          setLoading(false)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image upload failed!",
          });
          return;
        }
      }

      const res = await fetch(
        `${baseApi}/api/v1/users/update/${userProfileRes?.data?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(inputData),
        }
      );

      const userInfo = await res.json();
      if (userInfo && userInfo.success) {
        setLoading(false)
        setIsEditProfile(false);
        setUpdatedUser(userInfo);
        setUsername("");
        setEmail("");
        setAge("");
        setContactNumber("");
        setAddress("");
        setPreviewImg("");
        setFile(null);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      } else {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Form submission failed!",
        });
      }
    } catch (error: any) {
      setLoading(false)
      setIsEditProfile(false);
      setUsername("");
      setEmail("");
      setAge("");
      setContactNumber("");
      setAddress("");
      setPreviewImg("");
      setFile(null);
      console.error("Error during submission:", error?.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleEdit = (name: any) => {
    if (name === "profileEdit") {
      setIsEditProfile(true);
    } else if (name === "cancel") {
      setLoading(false)
      setIsEditProfile(false);
      setUsername("");
      setEmail("");
      setAge("");
      setContactNumber("");
      setAddress("");
      setPreviewImg("");
      setFile(null);
    }
  };

  const handleProfileState = (name: any) => {
    if (name === "profileUpdate") {
      setProfileUpdate(true);
      setRequestHistory(false);
      setTravelPost(false);
    }
    if (name === "travelPost") {
      setProfileUpdate(false);
      setRequestHistory(false);
      setTravelPost(true);
    }
    if (name === "travelRequest") {
      setProfileUpdate(false);
      setTravelPost(false);
      setRequestHistory(true);
    }
  };

  const handleImageUpload = (e: any) => {
    const imgData = e.target.files[0];
    if (imgData) {
      setFile(imgData);
      setPreviewImg(URL.createObjectURL(imgData));
    }
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <div className="bg-gray-200 w-full min-h-screen flex justify-center items-center pt-20 pb-28">
        <div className="w-full min-h-screen flex justify-center items-start gap-5 text-black">

          {/* side layout  */}
          <div className="w-[300px] min-h-screen bg-white">
            <div className="flex justify-center items-center">
              <div
                className="h-52 w-52 mt-5 relative rounded-full flex justify-center items-center border-[8px] border-white"
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                {isEditProfile ? (
                  <label className="label rounded-full w-full h-full flex justify-center items-center bg-gray-200 overflow-hidden p-0">
                    <div className="w-full h-full bg-gray-700 rounded-full flex justify-center items-center p-10">
                      {previewImg ? (
                        <div>
                          <Image
                            layout="fill"
                            objectFit="cover"
                            alt="profile avatar"
                            className="rounded-full"
                            src={previewImg}
                          />
                        </div>
                      ) : (
                        <div>
                          <MdCloudUpload className="w-28 h-28 text-white" />
                          <input
                            onChange={handleImageUpload}
                            type="file"
                            multiple
                            name="photos"
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>
                  </label>
                ) : (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt="profile avatar"
                    className="rounded-full"
                    src={
                      userProfile?.profilePhoto
                        ? userProfile?.profilePhoto
                        : "https://i.ibb.co/DwB0QJC/pngwing-com.png"
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center p-6">
              <h1 className="text-3xl font-bold mt-2 text-gray-800">
                {userProfileRes?.data?.username}
              </h1>
              <div className="w-full max-w-md mt-4 space-y-2">
                <div className="grid grid-cols-4 gap-2">
                  <span className="font-semibold text-gray-600">Email:</span>
                  <span className="col-span-2 text-gray-700">
                    {userProfileRes?.data?.email}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span className="font-semibold text-gray-600">Status:</span>
                  <span className="col-span-2 text-gray-700">
                    {userProfileRes?.data?.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <span className="font-semibold text-gray-600">Age:</span>
                  <span className="col-span-2 text-gray-700">
                    {userProfile?.age || "Empty"}
                  </span>
                </div>
              </div>
            </div>
          <p className="pl-[22%] mt-[50px]">
            <span className="bg-red-400 p-2 font-semibold text-white hover:underline rounded-lg">

          <Link href='/auth/change-password' >Change Password?</Link>
            </span>
          </p>
          </div>




          <div className="w-[900px] min-h-screen bg-white">
            {/* top navbar  */}
            <div className="h-10 w-full bg-gray-200 flex gap-5">
              <button
                onClick={() => handleProfileState("profileUpdate")}
                className={`h-full px-5 text-black ${
                  profileUpdate ? "bg-white" : "bg-gray-200"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => handleProfileState("travelPost")}
                className={`h-full px-5 text-black ${
                  travelPost ? "bg-white" : "bg-gray-200"
                }`}
              >
                Travel Posts
              </button>
              <button
                onClick={() => handleProfileState("travelRequest")}
                className={`h-full px-5 text-black ${
                  requestHistory ? "bg-white" : "bg-gray-200"
                }`}
              >
                Travel Request
              </button>
            </div>



            {requestHistory && (
              <div className="w-full bg-white text-black">
                <RequestStatus accessToken={accessToken}/>
              </div>
            )}

            {profileUpdate && (
              <div className="w-full bg-white text-black pb-10">
                <div className="max-w-xl bg-white p-6 pl-10 rounded-lg">
                  <form onSubmit={handleProfileUpdate}>
                    
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">
                      {userProfileRes?.data?.username}
                    </h1>
                    <div className="space-y-4">
                      {[
                        {
                          label: "Name:",
                          value: userProfileRes?.data?.username,
                          input: (
                            <div className="w-72 text-black">
                              <input
                                onBlur={(e) => setUsername(e.target.value)}
                                name="username"
                                type="text"
                                placeholder="User Name"
                                className="input input-bordered input-sm w-full max-w-xs ml-1 mr-2"
                              />
                            </div>
                          ),
                        },
                        {
                          label: "Email:",
                          value: userProfileRes?.data?.email,
                          input: (
                            <div className="w-72 text-black">
                              <input
                                onBlur={(e) => setEmail(e.target.value)}
                                name="email"
                                type="text"
                                placeholder="Email"
                                className="input input-bordered input-sm w-full max-w-xs ml-1"
                              />
                            </div>
                          ),
                        },
                        {
                          label: "Status:",
                          value: userProfileRes?.data?.status,
                          input: (
                            <div className="w-72 text-black">
                              <input
                                disabled
                                value={userProfileRes?.data?.status}
                                name="status"
                                type="text"
                                placeholder="Status"
                                className="input input-bordered input-sm w-full max-w-xs ml-1"
                              />
                            </div>
                          ),
                        },
                        {
                          label: "Password Change:",
                          value: userProfileRes?.data?.needPasswordChange,
                          input: (
                            <div className="w-72 text-black">
                              <input
                                disabled
                                value={userProfileRes?.data?.needPasswordChange}
                                name="text"
                                type="text"
                                placeholder="Email"
                                className="input input-bordered input-sm w-full max-w-xs ml-1"
                              />
                            </div>
                          ),
                        },
                        {
                          label: "Need Update Profile:",
                          value: userProfileRes?.data?.needUpdateProfile,
                          input: (
                            <div className="w-72 text-black">
                             
                              <input
                                disabled
                                value={userProfileRes?.data?.needUpdateProfile}
                                name="email"
                                type="text"
                                placeholder="Need Update Profile"
                                className="input input-bordered input-sm w-full max-w-xs ml-1"
                              />
                            </div>
                          ),
                        },
                        {
                          label: "Contact Number:",
                          value: userProfile?.contactNumber || "Empty",
                          input: (
                            <div className="w-72 text-black z-50">
                              <input
                                onBlur={(e) => setContactNumber(e.target.value)}
                                name="contactNumber"
                                type="text"
                                placeholder="Contact Number"
                                className="input input-bordered input-sm w-full max-w-xs"
                              />
                            </div>
                          ),
                        },
                        {
                          label: "Address:",
                          value: userProfile?.address || "Empty",
                          input: (
                            <div className="w-72 text-black z-50">
                              <input
                                onBlur={(e) => setAddress(e.target.value)}
                                name="address"
                                type="text"
                                placeholder="Address"
                                className="input input-bordered input-sm w-full max-w-xs"
                              />
                            </div>
                          ),
                        },
                        {
                          label: "Age:",
                          value: userProfile?.age || "Empty",
                          input: (
                            <div className="w-72 text-black z-50">
                              <input
                                onBlur={(e) => setAge(e.target.value)}
                                name="age"
                                type="number"
                                placeholder="Age"
                                className="input input-bordered input-sm w-full max-w-xs"
                              />
                            </div>
                          ),
                        },
                        {
                          label: "Bio:",
                          value: userProfile?.bio || "Empty",
                          input: (
                            <div className="w-72 text-black z-50">
                              <input
                                onBlur={(e) => setAge(e.target.value)}
                                name="bio"
                                type="text"
                                placeholder="Bio"
                                className="input input-bordered input-sm w-full max-w-xs"
                              />
                            </div>
                          ),
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-1/2 text-gray-600 font-semibold">
                            {item.label}
                          </span>
                          <span className="w-2/3 text-gray-700">
                            {isEditProfile ? item?.input : item.value}
                          </span>
                        </div>
                      ))}

                      {isEditProfile ? (
                        <div>
                        <button
                          type="submit"
                          className="py-2 px-4 bg-[#00c2ab] rounded-lg font-semibold mr-5"
                          >

                  {
                    loading ?   <span className="flex items-center justify-center">
                    Processing
                    <svg
                      className="animate-spin h-5 w-5 ml-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-75"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className=""
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  </span> : <span className="text-white">Update</span>
                  }
                   
                          

                        </button>

                        <button
                          onClick={() => handleEdit("cancel")}
                          type="button"
                          className="py-2 px-4 bg-red-400 rounded-lg font-semibold text-white"
                          >
                          Cancel
                        </button>
                          </div>
                      ) : (
                        <button
                          onClick={() => handleEdit("profileEdit")}
                          type="button"
                          className="py-2 cursor-pointer px-4 bg-[#00c2ab] rounded-lg font-semibold text-white"
                        >
                          
                          Edit
                        </button>
                      )}
                      
                    </div>
                  </form>
             
                </div>
              </div>
            )}

            {travelPost && (
              <div className="h-full w-full bg-white text-black">
                <UserTripPost
                  accessToken={accessToken}
                  userTrips={userTrips}
                  handleProfileState={handleProfileState}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
