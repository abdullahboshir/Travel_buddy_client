"use client";

import { travelRequestApi } from "@/utils/travelRequestApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const TripRequest = ({ tripId, profileInfo, accessToken }: any) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const userProfile = profileInfo.data.userProfile[0];

  const router = useRouter();

  const handleTravelRequest = async () => {
    try {
      setLoading(true);
      const formData = {
        tripId,
        userId: profileInfo?.data?.id,
        accessToken,
      };

      const tripRequestRes = await travelRequestApi(formData);

      if (tripRequestRes && tripRequestRes.success === true) {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Travel request has been successfully sent",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push("/");
        });
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Form submission failed!",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Form submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="h-screen bg-white w-full flex justify-center items-center pt-28">
      <div>
        <div className="bg-gray-700 h-auto w-[600px] rounded-lg p-5 flex">
          <div className="w-[200px] h-[200px] relative rounded-lg bg-gray-200">
            {userProfile && userProfile?.profilePhoto ? (
              <Image
                src={
                  userProfile?.profilePhoto
                    ? userProfile?.profilePhoto
                    : "https://i.ibb.co/DwB0QJC/pngwing-com.png"
                }
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                alt="profile avatar"
              />
            ) : (
              <Image
                src={
                  "https://i.ibb.co/R08jLH8/stock-vector-male-avatar-profile-picture-green-earth-volunteer-member-silhou.jpg"
                }
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                alt="profile avatar"
              />
            )}
          </div>

          <div className="ml-5 flex-1">
            <div className="pt-10">
              <div className="flex items-center mb-4">
                <span className="mr-2 font-bold">Phone:</span>
                <span>{userProfile?.contactNumber}</span>
              </div>

              <div className="flex items-start">
                <span className="mr-2 font-bold">Address:</span>
                <span className="break-words">{userProfile?.address}</span>
              </div>
            </div>

            <div className="flex justify-between w-full mt-10 pb-5">
              <div className="flex justify-center items-center">
                Terms and Condition
                <input
                  type="checkbox"
                  checked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                  className={`checkbox ${
                    isCheckboxChecked ? "checkbox-accent" : "checkbox-error"
                  } ml-2`}
                />
              </div>

              <div>
                <button
                  onClick={handleTravelRequest}
                  disabled={!isCheckboxChecked}
                  type="button"
                  className={`mr-5 py-1 px-2 rounded-lg transition ease-in duration-100 ${
                    isCheckboxChecked
                      ? "bg-[#00c2ab] hover:bg-[#083344] hover:font-bold hover:text-[16px]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
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
                    "Send Request"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripRequest;
