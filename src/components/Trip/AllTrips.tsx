"use client";
import { baseApi } from "@/app/api/baseApi";
import { TTour } from "@/types/tour.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AllTrips = ({ tours }: {tours: any}) => {
  const [toursData, setToursData] = useState<any | TTour[]>([]);
  const [meta, setMeta] = useState(tours?.meta);


  const fetchTours = async (params = {}) => {
    const query = new URLSearchParams({ ...params, limit: meta.limit }).toString();
    const res = await fetch(`${baseApi}/api/v1/trips?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
  
    const queryValue = await res.json();
  
    setToursData(queryValue);
    setMeta(queryValue?.meta);
  };
  


  const handleOnSearching = async (e: any) => {
    const searchTerm = e.target.value;
    fetchTours({ searchTerm, page: 1 });
  };


  const handlePageChange = (newPage: number) => {
    fetchTours({ page: newPage });
  };

  useEffect(() => {
    setToursData(tours);
    setMeta(tours?.meta);
  }, [tours]);


  return (
    <div className="flex w-full flex-col items-center bg-base-100 shadow-xl bg-gray-200 p-8">
      <div className="w-full flex justify-center items-center flex-col text-black mb-8">
        <h1 className="text-5xl font-semibold text-[#00c2ab] my-10">FIND TOUR DESIRE TOUR</h1>
        <div className="w-96">
            <div className="join">
              <input
                type="text"
                onChange={handleOnSearching}
                className="input input-bordered join-item"
                placeholder="Search"
              />
              <select     onChange={handleOnSearching} className="select select-bordered join-item">
                <option disabled selected>
                  Filter
                </option>
                <option className="font-bold" disabled>
                  Type
                </option>
                <option>Nature</option>
                <option>Adventure</option>
                <option>Culture</option>
                <option className="font-bold" disabled>
                  Continent
                </option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Africa</option>
              </select>
              <button type="submit" className="btn join-item">
                Search
              </button>
            </div>
       
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 text-black">
        {toursData?.data?.map((tour: TTour, index: number) => (
          <div
            key={index}
            className="w-[370px] h-[470px] bg-white rounded-lg"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="relative w-full h-52">
              {tour?.photos?.slice(0, 1).map((photo: any, index) => (
                <Image
                  key={index}
                  src={photo}
                  alt={tour?.destination}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              ))}
            </div>
            <div className="p-5 h-12">
              <h3 className="text-2xl font-bold mb-3">
                {tour?.destination.length > 22
                  ? `${tour.destination.slice(0, 20)}...`
                  : tour.destination}
              </h3>
              <p className="text-md mb-2 h-28">
                {tour?.description.slice(0, 160)}...
              </p>

              <div className="flex justify-between items-center mt-8">
                <Link href={`/trip/${tour?.id}`} className="px-3 py-2 rounded-lg text-white bg-[#00c2ab] text-md hover:bg-[#083344] hover:font-bold hover:text-[16px] ease-in duration-100 transition">
                  View Tours
                </Link>
                <p className="text-sm flex flex-col leading-4">
                  <span>Travel Date:</span>
                  {`${
                    new Date(tour?.startDate).getUTCDate() < 10
                      ? `0${new Date(tour?.startDate).getUTCDate()}`
                      : new Date(tour?.startDate).getUTCDate()
                  }-${
                new Date(tour?.startDate).getUTCMonth() + 1 < 10
                  ? `0${ new Date(tour?.startDate).getUTCMonth() + 1}`
                  :  new Date(tour?.startDate).getUTCMonth() + 1
              }-${new Date(tour?.startDate).getUTCFullYear()}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>


  <div className="flex">
  {Array.from({ length: Math.ceil(meta.total / meta.limit) }).map((_, index) => (
  <input
    key={index}
    type="radio"
    name="options"
    className={`join-item btn btn-square mt-10 ${meta.page === index + 1 ? 'btn-primary' : ''}`}
    aria-label={`${index + 1}`}
    checked={meta.page === index + 1}
    onChange={() => handlePageChange(index + 1)}
  />
))}
  </div>

    </div>
  );
};

export default AllTrips;
