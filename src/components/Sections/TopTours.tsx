import Image from "next/image";
import React from "react";
import { TTour } from "@/types/tour.type";

const TopTours = ({ tours }: { tours: { data: TTour[] } }) => {
  return (
    <div className="flex flex-col">
      {tours?.data?.slice(0, 1).map((tour: TTour) => (
        <div
          key={tour.id}
          className="w-full lg:card-side bg-base-100 shadow-xl bg-cyan-950 flex"
        >
          <div className="w-[50%] relative">
            {tours?.data?.map((data) =>
              data?.photos?.slice(1, 2).map((photo, index) => (
                <figure key={index}>
                  <Image
                    src={`${
                      photo
                        ? "https://i.ibb.co/b723CCh/alan-hurt-jr-Eax7a3s-VHAw-unsplash.jpg"
                        : photo
                    }`}
                    alt="Album"
                    layout="fill"
                    className="object-cover rounded-none"
                  />
                </figure>
              ))
            )}
          </div>

          <div className="w-[50%] h-[400px] flex justify-center flex-col pl-16">
            <h2 className="text-4xl font-semibold text-left">
              {tour.destination}
            </h2>
            <h2 className="text-lg text-left">5 days 4 nights</h2>
            <p className="w-96">
              {tour.description.length > 300
                ? tour.description.slice(0, 300)
                : tour.description}
            </p>
            <div className="flex justify-between items-center mt-10">
              <button className="btn bg-[#02bb96] border-none rounded-full mr-16">
                VIEW DETAILS
              </button>
              <p className="pr-16 font-semibold">$999</p>
            </div>
          </div>
        </div>
      ))}

     

      {tours?.data?.slice(1, 2).map((tour) => (
        <div
          key={tour.id}
          className="w-full lg:card-side bg-base-100 shadow-xl bg-cyan-950 flex"
        >
          <div className="w-[50%] h-[400px] flex justify-center flex-col pl-16">
            <h2 className="text-4xl font-semibold text-left">
              {tour.destination}
            </h2>
            <h2 className="text-lg text-left">5 days 4 nights</h2>
            <p className="w-96">{tour.description}</p>
            <div className="flex justify-between items-center mt-10">
              <button className="btn bg-[#02bb96] border-none rounded-full mr-16">
                VIEW DETAILS
              </button>
              <p className="pr-16 font-semibold">$1099</p>
            </div>
          </div>

          <div className="w-[50%] relative">
            {tours?.data?.map((data) =>
              data?.photos?.slice(1, 2).map((photo, index) => (
                <figure key={index}>
                  <Image
                    src={`${
                      photo
                        ? photo
                        : "https://i.ibb.co/BVnfjtB/pexels-pixabay-270859.jpg"
                    }`}
                    alt="Album"
                    layout="fill"
                    className="object-cover rounded-none"
                  />
                </figure>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopTours;
