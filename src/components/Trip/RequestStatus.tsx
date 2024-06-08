import { baseApi } from "@/app/api/baseApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RequestStatus = ({ accessToken }: any) => {
  const [tripRequested, setTripRequested] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${baseApi}/api/v1/travelBuddies/requestedList`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const userInfo = await res.json();
        if (userInfo && userInfo.success) {
          setTripRequested(userInfo.data);
        } else {
          console.error("Failed to fetch trip requests:", userInfo?.message);
        }
      } catch (error: any) {
        console.error("Error during data fetching:", error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div className="container mx-auto p-5 mt-2">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">
        Your Travel Requests
      </h1>
      {loading ? (
        <p className="text-center">
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
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <tbody>
              <tr className="text-left bg-gray-100">
                <th className="py-2 px-4 border-b border-gray-200">
                  Destination
                </th>
                <th className="py-2 px-4 border-b border-gray-200">Status</th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Requested Date
                </th>
              </tr>

              { tripRequested?.map((requestStatus: any) => (
                <tr key={requestStatus?.id} className="text-left">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {requestStatus?.trip?.destination}
                  </td>
                  <td
                    className={`${
                      requestStatus?.status === "APPROVED"
                        ? "text-green-500"
                        : "text-red-500"
                    } py-2 px-4 border-b border-gray-200`}
                  >
                    {requestStatus?.status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(requestStatus?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
              }


            </tbody>
          </table>
          {
                tripRequested.length === 0 &&  <div className="h-screen w-full flex justify-center items-start">
                <Image src='https://i.ibb.co/3FpK0Z5/360-F-475012363-a-Nq-Xx8-Crso-Tf-JP5-KCf1r-ERd6-G50-K0h-Xw.jpg' width={300} height={300} alt="not data icon" className="w-52"/>
              </div>
              }
        </div>
      )}
    </div>
  );
};

export default RequestStatus;
