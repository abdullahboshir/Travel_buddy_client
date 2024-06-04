"use client";
import { TUser } from "@/types/tour.type";
import Image from "next/image";
import React, { useState } from "react";
import Swal from "sweetalert2";

const UsersManagement = ({ users, accessToken }: any) => {
    const [userUpdateData, setUserUpdatedData] = useState<any>();




  const onChangeUserUpdate = async (e: any, id: string) => {
    const optionValue = e.target.value;
    let value = {};

    if (optionValue === "ADMIN" || optionValue === "TRAVELER") {
      value = { role: optionValue };
    } else if (optionValue === "ACTIVATE" || optionValue === "DEACTIVATE") {
      value = { status: optionValue };
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/users/admin/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(value),
        }
      );
      const userInfo = await res.json();
      if (userInfo && userInfo.success === true) {
        setUserUpdatedData(userInfo)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User updated has been successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Form submission failed!",
        });
      }
    } catch (error) {}
  };



  return (
    <div className="text-black">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
           
            {users?.data?.map((user: any) => (
              <tr key={user?.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                        {
                            user?.userProfile.map((profile: any, index: number) => (
                                <div key={index} className="mask mask-squircle w-12 h-12">
                                {
                                profile?.profilePhoto? <Image
                                width={100}
                                height={100}
                                src={profile.profilePhoto}
                                alt="Avatar Tailwind CSS Component"
                              />
                                : 
                                <Image
                          width={100}
                          height={100}
                          src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                                }
                        </div>
                            ))
                        }
                    </div>
                    <div>
                      <div className="font-bold">{user?.username}</div>
                      {user?.userProfile?.map(
                        (profile: TUser, index: number) => (
                          <div key={index} className="text-sm opacity-50">
                            {profile?.age} years
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  {user?.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {userUpdateData?.data?.id === user.id?  userUpdateData?.data?.role  : user?.role}
                  </span>
                </td>
                <td>{userUpdateData?.data?.id === user.id? userUpdateData?.data?.role : user?.role}</td>
                <td>{userUpdateData?.data?.id === user.id? userUpdateData?.data?.status : user?.status}</td>
                <th>
                  <select
                    onChange={(e) => onChangeUserUpdate(e, user.id)}
                    className="select select-bordered w-full max-w-[130px]"
                  >
                    <option disabled selected>
                      Role
                    </option>
                    <option>ADMIN</option>
                    <option>TRAVELER</option>
                  </select>
                </th>

                <th>
                  <select
                    onChange={(e) => onChangeUserUpdate(e, user.id)}
                    className="select select-bordered w-full max-w-[140px]"
                  >
                    <option disabled selected>
                      Status
                    </option>
                    <option>ACTIVATE</option>
                    <option>DEACTIVATE</option>
                  </select>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
