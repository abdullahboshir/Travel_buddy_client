"use client";
import { baseApi } from "@/app/api/baseApi";
import { TTour } from "@/types/tour.type";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserTripPost = ({ accessToken, userTrips, handleProfileState }: any) => {
  const [previewImages, setPreviewImages] = useState<any>({});
  const [seeMore, setSeeMore] = useState<any>({});
  const [tours, setTours] = useState<any>(userTrips || []);


  const refetchTours = async (token: any) => {

    try {
      if (!token) {
        return 'Access Token not found';
      }


      const res = await fetch(`${baseApi}/api/v1/trips/getUserTrip`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
      });
   

      if (!res.ok) {
        console.error('Failed to fetch user trips', res.statusText);
        return notFound();
      }

      const userInfo = await res.json();
      return userInfo;
    } catch (error: any) {
      console.error('Error fetching user trips:', error.message);
      return null;
    }
  };

  
  useEffect(() => {
    const initialPreviewImages: any = {};
    tours?.data?.forEach((tour: any) => {
      if (tour?.photos?.length > 0) {
        initialPreviewImages[tour.id] = tour.photos[0];
      }
    });
    setPreviewImages(initialPreviewImages);
  }, [tours]);

  const handleDeleteTrip = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${baseApi}/api/v1/trips/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });

        if (res.ok) {
          const tripRes = await res.json();

          if (tripRes.success === true) {
            const tripsData = await refetchTours(accessToken);
            setTours(tripsData);

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Failed to delete!`,
              footer: `FORBIDDEN!`
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Failed to delete!`,
            footer: `FORBIDDEN!`
          });
        }
      }
    });
  };

  const setPreviewImg = (tourId: string, photo: string) => {
    setPreviewImages((prevState: any) => ({
      ...prevState,
      [tourId]: photo,
    }));
  };

  const toggleSeeMore = (tourId: any) => {
    setSeeMore((prevState: any) => ({
      ...prevState,
      [tourId]: !prevState[tourId],
    }));
  };

  return (
    <div className="text-black gap-2">
      {tours?.data?.map((tour: TTour) => (
        <div key={tour?.id} className=" mb-10">
          <div className="flex items-start justify-start">
            <div className="">
              {previewImages[tour?.id] && (
                <div className="w-[350px] h-[350px] relative mb-2">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className=""
                    src={previewImages[tour?.id]}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              )}

              <div className="flex gap-1 w-[350px]">
                {tour?.photos?.map((photo: any, index: number) => (
                  <div
                    onClick={() => setPreviewImg(tour.id, photo)}
                    key={index}
                    className="w-10 h-10 relative cursor-pointer"
                  >
                    <Image
                      layout="fill"
                      objectFit="cover"
                      className=""
                      src={photo}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-base-400 mt-4 ml-5 px-5 pt-5">
              <h1 className="text-3xl mb-2 font-semibold">
                {tour?.destination}
              </h1>
              <h1 className="text-2xl text-cyan-500">
                Let&apos;s enjoy the {tour?.type} tour
              </h1>
              <h1 className="text-base">{tour?.itinerary}</h1>
              <h1 className="text-base mt-2 mb-2">
                <span className="text-cyan-500 font-semibold mt-5 flex flex-rows">
                  Tour Activities:
                </span>{" "}
                {tour?.activities?.map((activity: any, index: any) => (
                  <span key={index} className="text-md">
                    {activity},{" "}
                  </span>
                ))}
              </h1>
              <h1 className="text-md text-justify">
                <p className="text-cyan-500 font-semibold">Description: </p>
                {tour?.description.length > 280 ? (
                  <p>
                    {seeMore[tour?.id]
                      ? tour?.description
                      : tour?.description.slice(0, 280)}{" "}
                    <span
                      onClick={() => toggleSeeMore(tour?.id)}
                      className="text-cyan-600 cursor-pointer font-bold"
                    >
                      {seeMore[tour?.id] ? "less" : "see more..."}
                    </span>
                  </p>
                ) : (
                  tour?.description
                )}
              </h1>

              <div
                className={`flex justify-between items-center mt-5 ${
                  seeMore[tour?.id] ? "py-4" : ""
                } ${tour?.description?.length < 280 && "mt-[100px]"}`}
              >
                <p className="text-sm flex flex-col leading-4 font-semibold">
                  <span className="text-cyan-500">Travel Date:</span>
                  {`${
                    new Date(tour?.startDate).getUTCDate() < 10
                      ? `0${new Date(tour?.startDate).getUTCDate()}`
                      : new Date(tour?.startDate).getUTCDate()
                  }-${
                    new Date(tour?.startDate).getUTCMonth() + 1 < 10
                      ? `0${new Date(tour?.startDate).getUTCMonth() + 1}`
                      : new Date(tour?.startDate).getUTCMonth() + 1
                  }-${new Date(tour?.startDate).getUTCFullYear()}`}
                </p>

                <div>
                  <button
                    onClick={() => handleProfileState('edit')}
                    className="px-[23px] py-[10px] rounded-lg text-white bg-[#00c2ab] text-md hover:bg-[#083344] hover:font-bold hover:text-[16px] ease-in duration-100 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteTrip(tour?.id)}
                    className="px-3 py-2 rounded-lg text-white bg-[#ff7300] text-md hover:bg-[#083344] hover:font-bold hover:text-[16px] ease-in duration-100 transition ml-5"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-10 text-gray-400 divide-y-*" />
        </div>
      ))} 
    </div>
  );
};

export default UserTripPost;
