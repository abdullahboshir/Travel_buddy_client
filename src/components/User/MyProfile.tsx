"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import Swal from "sweetalert2";
import UserTrip from "../Trip/UserTrip";

const MyProfile = ({ userProfileRes, accessToken, userTrips }: any) => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [edit, setEdit] = useState(false);
  const [travelPost, setTravelPost] = useState(true);
  const [requestHistory, setRequestHistory] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [previewImg, setPreviewImg] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [updatedUser, setUpdatedUser] = useState<any | null>(null);
  const imgStorageKey = "52e2a715dfd6d706e4d4ce8b0cd8526f";

  const userProfile = userProfileRes?.data?.userProfile[0];

  const handleProfileEdit = async (e: any) => {
    e.preventDefault();
    try {
      const inputData: any = {
        username,
        email,
        age: Number(age),
        contactNumber,
        address,
      };

      const allValuesEmpty = Object.values(inputData).every(value => value === '' || value === null || value === undefined || value === 0);

      if (allValuesEmpty) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "At least one field must be filled out, if you want to update!",
        });
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      setIsEditProfile(false);

      if (file && previewImg) {
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
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image upload failed!",
          });
          return;
        }
      }

      inputData.profilePhoto = imageURL;
      const res = await fetch(
        `http://localhost:5000/api/v1/users//update/${userProfileRes?.data?.id}`,
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
      if (userInfo && userInfo.success === true) {
        setUpdatedUser(userInfo)
        setUsername('')
        setEmail('')
        setAge('')
        setContactNumber('')
        setAddress('')
        setFile({})

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        setPreviewImg("");
      } else {
        setUsername('')
        setEmail('')
        setAge('')
        setContactNumber('')
        setAddress('')
        setFile({})
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Form submission failed!",
        });
      }
    } catch (error: any) {
      setUsername('')
      setEmail('')
      setAge('')
      setContactNumber('')
      setAddress('')
      setFile({})
      console.error("Error during submission:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleImageUpload = (e: any) => {
    const imgData = e.target.files[0];
    if (imgData) {
      setFile(imgData);
      setPreviewImg(URL.createObjectURL(imgData));
    }
  };

  const handleEdit = (order: any) => {
    if (order === "edit") {
      setIsEditProfile(true);
    } else if (order === "update") {
      setIsEditProfile(false);
    }
  };

  const handleProfileState = (name: any) => {
    if(name === 'edit'){
      setRequestHistory(false)
      setTravelPost(false)
      setEdit(true)
    }
    if(name === 'travelPost'){
      setEdit(false)
      setRequestHistory(false)
      setTravelPost(true)
    }
    if(name === 'travelRequest'){
      setEdit(false)
      setTravelPost(false)
      setRequestHistory(true) 
    }
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <div className="bg-gray-200 w-full min-h-screen flex justify-center items-center pt-20 pb-28">
        <div className="w-full min-h-screen flex justify-center items-start gap-5">
          <div className="w-[280px] min-h-screen bg-white rounded-lg"></div>
          <div className="w-[900px] min-h-screen bg-white rounded-lg">
            <div className="h-16 w-full bg-gray-200 flex gap-5">
              <button
                onClick={() => handleProfileState('travelPost')}
                className={`h-full px-5 text-black ${
                  travelPost ? 'bg-white' : 'bg-gray-200'
                }`}
              >
                Travel Posts
              </button>
              <button
                onClick={() => handleProfileState('travelRequest')}
                className={`h-full px-5 text-black ${
                  requestHistory ? 'bg-white' : 'bg-gray-200'
                }`}
              >
                Travel Request
              </button>
              <button
                onClick={() => handleProfileState('edit')}
                className={`h-full px-5 text-black ${
                  edit ? 'bg-white' : 'bg-gray-200'
                }`}
              >
                Edit
              </button>
            </div>
            {edit && (
              <div className="w-full bg-white text-black">
                <h1>This is Edit Page</h1>
              </div>
            )}
            {travelPost && (
              <div className="w-full bg-white text-black pb-10">
              <UserTrip accessToken={accessToken} tours={userTrips}/>
            </div>
          )}
          {requestHistory && (
            <div className="h-full w-full bg-white text-black">
              <h1>This is Request </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>

















/* <div className="h-screen w-full bg-gray-200">
<div className="bg-white flex justify-center items-center h-screen text-black relative">

  <form onSubmit={handleProfileEdit}>
    <div
      className="h-screen flex justify-between items-center bg-gray-800 w-[800px] h-[460px] mt-16 p-5 rounded-lg ml-16"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
      }}
    >
      
      <div className="absolute left-[120px] right-0">
      <div
className="bg-gray-700 rounded-full w-72 h-72 flex items-center justify-center"
style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
>
{isEditProfile ? (
<label className="label rounded-full w-full h-full flex justify-center items-center bg-gray-200 overflow-hidden">
{previewImg ? (
  <div className="w-full h-full relative rounded-full overflow-hidden border border-gray-400">
    <Image
      src={previewImg}
      layout="fill"
      objectFit="cover"
      className="rounded-full"
      alt="profile avatar"
    />
  </div>
) : (
  <div className="w-full h-full bg-gray-700 rounded-full flex justify-center items-center p-5">
      <MdCloudUpload className="w-28 h-28 text-white" />
  </div>
)}
<input
  onChange={handleImageUpload}
  type="file"
  multiple
  name="photos"
  className="hidden"
/>
</label>
) : 
userProfile && userProfile?.profilePhoto? <div className="w-72 h-72 rounded-full overflow-hidden border border-gray-400">
<Image
src={ userProfile?.profilePhoto}
width={300}
height={300}
alt="profile avatar"
className="w-72 h-72 rounded-full object-cover"
/>
</div>
: 
<div className="w-72 h-72 rounded-full overflow-hidden border border-gray-400">
<Image
src="https://cdn-icons-png.flaticon.com/512/8812/8812070.png"
width={300}
height={300}
alt="profile avatar"
className="w-72 h-72 rounded-full object-cover"
/>
</div>
}
</div>

      </div>

      <div className="text-white ml-[170px] w-full pr-10 z-50">
        <h1 className="flex justify-between">
          <span className="text-4xl font-bold ">
            {userProfileRes.data.username}
          </span>
          {isEditProfile ? (
            <button
              onClick={() => handleEdit("update")}
              type="button"
              className="py-2 px-4 bg-[#00c2ab] rounded-lg font-semibold"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => handleEdit("edit")}
              type="submit"
              className="py-2 cursor-pointer px-4 bg-[#00c2ab] rounded-lg font-semibold"
            >
              Edit
            </button>
          )}
        </h1>
        <p className="text-2xl mb-4">{userProfileRes.data.role}</p>

        <p className="text-2xl my-2 font-semibold">
          Personal Information
        </p>

        <hr />
        <p className="mt-2 text-md ">
          User Name:
          <span className="ml-[88px] inline-block">
            {isEditProfile ? (
              <div className="w-72 text-black">
                <input
                  onBlur={(e) => setUsername(e.target.value)}
                  name="username"
                  type="text"
                  placeholder="User Name"
                  className="input input-bordered input-sm w-full max-w-xs ml-1 mr-2"
                />
              </div>
            ) : (
              userProfileRes.data.username
            )}
          </span>
        </p>

        <p className="text-md">
          Email:
          <span className="ml-[130px] inline-block py-2">
            {isEditProfile ? (
              <div className="w-72 text-black">
                <input
                  onBlur={(e) => setEmail(e.target.value)}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="input input-bordered input-sm w-full max-w-xs ml-1"
                />
              </div>
            ) : (
              userProfileRes.data.email
            )}
          </span>
        </p>

        <p className="text-md">
          Age:
          <span className="ml-[144px] inline-block my-2">
            {isEditProfile ? (
              <div className="w-72 text-black z-50">
                <input
                  onBlur={(e) => setAge(e.target.value)}
                  name="age"
                  type="number"
                  placeholder="Age"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </div>
            ) : (
              `${updatedUser?.data?.age? updatedUser?.data?.age :  userProfile?.age } years`
            )}
          </span>
        </p>
        <p className="text-md">
          Contact Number:
          <span className="ml-[50px] inline-block py-2">
            {isEditProfile ? (
              <div className="w-72 text-black z-50">
                <input
                  onBlur={(e) => setContactNumber(e.target.value)}
                  name="contactNumber"
                  type="text"
                  placeholder="Contact Number"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </div>
            ) :
            updatedUser?.data?.contactNumber?   updatedUser?.data?.contactNumber : userProfile?.contactNumber
            }
          </span>
        </p>
        <p className="text-lg">
          Adress:
          <span className="ml-[117px] w-[300px] inline-block my-2">
            {isEditProfile ? (
              <div className="w-72 text-black z-50">
                <input
                  onBlur={(e) => setAddress(e.target.value)}
                  name="address"
                  type="text"
                  placeholder="Address"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </div>
            ) : updatedUser?.data?.address? updatedUser?.data?.address : userProfile?.address}
          </span>
        </p>
      </div>
    </div>
  </form>
</div>
</div> */


  );
};

export default MyProfile;
