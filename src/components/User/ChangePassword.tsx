"use client";
import { baseApi } from "@/app/api/baseApi";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Spinner from "../Spinner";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState("");
  const [credentailsError, setCredentailsError] = useState("");

  const { data: session, status } = useSession() as any;
  const accessToken = session?.user?.accessToken;

  if (status === "loading") {
    return <Spinner/>;
  }

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setPassError("Does't match new password and confirm password");
      setLoading(false);
      return;
    }

    try {
      const inputData: any = {
        currentPassword,
        newPassword,
        confirmPassword,
      };

      const allValuesEmpty = Object.values(inputData).every(
        (value) =>
          value === "" || value === null || value === undefined || value === 0
      );

      if (allValuesEmpty) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All field must be filled out, if you want to update!",
        });
        return;
      }

      const res = await fetch(`${baseApi}/api/v1/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(inputData),
      });

      const userInfo = await res.json();
      if (userInfo && userInfo.success) {
        setLoading(false);
        setPassError("");
        setCredentailsError("");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      } else {
        setLoading(false);
        setPassError("");
        if (userInfo && userInfo?.success === false) {
          setCredentailsError(userInfo?.message);
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error during submission:", error?.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full h-full bg-white text-black">
      <div className="hero min-h-screen">
        <div className="w-96 bg-white p-5 rounded-lg bg-gray-100 shadow-2l">
          <form onSubmit={handleChangePassword}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <input
                onBlur={(e) => setCurrentPassword(e.target.value)}
                type="password"
                placeholder="Current Password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                onBlur={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="New Password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                onBlur={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                required
              />
            </div>
            <p className="text-red-400">
              {credentailsError ? credentailsError : passError}
            </p>
            <div className="form-control mt-6">
              <button className="btn rounded-lg text-white bg-red-400 text-md hover:bg-[#083344] hover:font-bold hover:text-[16px] ease-in duration-100 transition border-none">
                {loading ? (
                  <span className="flex items-center justify-center">
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
                  </span>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
