'use client'
import { TTour } from "@/types/tour.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ToursManagement = ({ tours }: any) => {
  const [previewImages, setPreviewImages] = useState<any>({});
  const [seeMore, setSeeMore] = useState<any>({});

  const { data: session, status }: any = useSession();



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
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:5000/api/v1/trips/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          cache: 'no-store'
        });

        const tripRes = await res.json();
        console.log('trip result', tripRes, session);

        if (tripRes && tripRes.success === true) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      }
    })
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
        <div key={tour?.id} className="bg-gray-200 my-2">
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
                  <div onClick={() => setPreviewImg(tour.id, photo)} key={index} className="w-10 h-10 relative cursor-pointer">
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
              <h1 className="text-lg">{tour?.itinerary}</h1>
              <h1 className="text-lg mt-2 mb-2">
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
                {tour?.description.length > 280 ? (
                  <p>
                    {seeMore[tour?.id] ? tour?.description : tour?.description.slice(0, 280)}{" "}
                    <span onClick={() => toggleSeeMore(tour?.id)} className="text-cyan-600 cursor-pointer font-bold">
                      {seeMore[tour?.id] ? 'less' : 'see more...'}
                    </span>
                  </p>
                ) : (
                  tour?.description
                )}
              </h1>

              <div className={`flex justify-end ${seeMore[tour?.id] ? 'py-4' : ''} ${tour?.description?.length < 280 && 'mt-[100px]'}`}>
                <Link href={`tours/update-trip/${tour?.id}`} className="px-3 py-2 rounded-lg text-white bg-[#00c2ab] text-md hover:bg-[#083344] hover:font-bold hover:text-[16px] ease-in duration-100 transition">Edit</Link>

                <button onClick={() => handleDeleteTrip(tour?.id)} className="px-3 py-2 rounded-lg text-white bg-[#ff7300] text-md hover:bg-[#083344] hover:font-bold hover:text-[16px] ease-in duration-100 transition ml-5">Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToursManagement;
