"use client";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../FormHandler/Input";
import { MdCloudUpload, MdOutlineFileUpload } from "react-icons/md";

const MyProfile = ({ userProfileRes }: any) => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const userProfile = userProfileRes.data.userProfile[0];

  const handleProfileEdit = (e: any) => {};

  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="bg-white flex justify-center items-center h-screen text-black relative">

        <div
          className="h-screen flex justify-between items-center bg-gray-800 w-[800px] h-[460px] mt-16 p-5 rounded-lg ml-16"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
        >
          <div className="absolute left-[120px] right-0">
            <div
              className="bg-gray-700 rounded-full p-2 w-72 h-72 flex items-center justify-center"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
            {
                isEditProfile?  <label className='label rounded-full w-full h-full p-2 flex justify-center items-center bg-gray-400'>
                <MdCloudUpload className="w-28 h-28 text-white" />
                <input  type="file" multiple name="photos" className="hidden" />
            </label> :   <Image
                src="https://cdn-icons-png.flaticon.com/512/8812/8812070.png"
                width={300}
                height={300}
                alt="profile avatar"
                className="w-72"
              />
            }
            </div>
          </div>

          <div className="text-white ml-[170px] w-full pr-10 z-50">
            <h1 className="flex justify-between">
              <span className="text-4xl font-bold ">
                {userProfileRes.data.username}
              </span>
              <button
                onClick={() => setIsEditProfile(!isEditProfile)}
                className="py-2 px-4 bg-[#00c2ab] rounded-lg font-semibold"
              >
                Edit
              </button>
            </h1>
            <p className="text-2xl mb-4">{userProfileRes.data.role}</p>

            <p className="text-2xl my-2 font-semibold">Personal Information</p>

            <hr />
            <p className="mt-2 text-md ">
              User Name:
              <span className="ml-[88px] inline-block">
                {isEditProfile ? (
                    <div className="w-72 text-black">
                        <input name='username' type="text" placeholder="User Name" className="input input-bordered input-sm w-full max-w-xs ml-1" />
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
                        <input name='email' type="text" placeholder="Email" className="input input-bordered input-sm w-full max-w-xs ml-1" />
                        </div>
                ) : (
                  userProfileRes.data.email
                )}
              </span>
            </p>
            <p className="text-md">
              Password:
              <span className="ml-[100px] inline-block">
                {isEditProfile ? (
                     <div className="w-72 text-black z-50">
                        <input name='password' type="password" placeholder="Password" className="input input-bordered input-sm w-full max-w-xs" />
                        </div>
                ) : (
                  "*********"
                )}
              </span>
            </p>

            <p className="text-2xl mb-2 mt-5 font-semibold">
              Others Information
            </p>

            <hr />

            <p className="mt-2 text-md">
              Age:
              <span className="ml-[144px] inline-block">
                {isEditProfile ? (
                     <div className="w-72 text-black z-50">
                        <input name='age' type="number" placeholder="Age" className="input input-bordered input-sm w-full max-w-xs" />
                        </div>
                ) : (
                  `${userProfileRes.data.age}25 years`
                )}
              </span>
            </p>
            <p className="text-md">
              Contact Number:
              <span className="ml-[50px] inline-block py-2">
                {isEditProfile ? (
                     <div className="w-72 text-black z-50">
                        <input name='contactNumber' type="text" placeholder="Contact Number" className="input input-bordered input-sm w-full max-w-xs" />
                        </div>
                ) : (
                  userProfileRes.data.contactNumber
                )}
              </span>
            </p>
            <p className="text-lg">
              Adress:
              <span className="ml-[117px] w-[300px] inline-block">
                {isEditProfile ? (
                     <div className="w-72 text-black z-50">
                        <input name='address' type="text" placeholder="Address" className="input input-bordered input-sm w-full max-w-xs" />
                        </div>
                ) : (
                  userProfileRes.data.address
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
