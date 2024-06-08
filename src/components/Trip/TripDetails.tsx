'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const TripDetails = ({ data, isNeedProfileEdit }:  any) => {
    const [selectedImage, setSelectedImage] = useState(data?.photos?.[0]);
    const [currentIndex, setCurrentIndex] = useState<any>(0);
    const [seeMore, setSeeMore] = useState(false);


    const toggleSeeMore = () => {
        setSeeMore(!seeMore);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex: any) => (prevIndex + 1) % data?.photos?.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, [data?.photos]);

    useEffect(() => {
        setSelectedImage(data?.photos?.[currentIndex]);
    }, [currentIndex, data?.photos]);

    const handleImageClick = (index: number) => {
        setCurrentIndex(index);
        setSelectedImage(data?.photos?.[index]);
    };


    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen text-black">
            <div className="bg-white rounded-lg overflow-hidden w-full md:w-[1100px] h-auto md:h-auto mt-16 p-6 shadow-lg">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="relative w-full h-64 md:h-[400px] overflow-hidden rounded-lg mb-4">
                            <Image
                                src={selectedImage}
                                width={800}
                                height={800}
                                alt="Selected tour img"
                                className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100 hover:opacity-90"
                            />
                        </div>
                        <div className="grid grid-cols-8 gap-2 w-full">
                            {data?.photos?.map((photo: string, index: number) => (
                                <div
                                    key={index}
                                    className="w-full h-10 md:h-10 overflow-hidden rounded-lg cursor-pointer"
                                    onClick={() => handleImageClick(index)}
                                >
                                    <Image
                                        src={photo}
                                        width={200}
                                        height={200}
                                        alt="tour img"
                                        className="w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-70 hover:opacity-100"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 p-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{data?.destination}</h1>
                        <p className="text-gray-600 mb-2"><strong>Itinerary:</strong> {data?.itinerary}</p>
                        <p className="text-gray-600 mb-2"><strong>Type:</strong> {data?.type}</p>
                        <p className="text-gray-600 mb-2"><strong>Location:</strong> {data?.location}</p>
                        <p className="text-gray-600 mb-2"><strong>Start Date:</strong> {new Date(data?.startDate).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-2"><strong>End Date:</strong> {new Date(data?.endDate).toLocaleDateString()}</p>
                        <p className="text-gray-700 mb-4">
                            <strong>Description: </strong>
                            {data?.description.length > 280 ? (
                                <>
                                    {seeMore ? data?.description : `${data?.description.slice(0, 280)}...`}
                                    <span onClick={toggleSeeMore} className="text-cyan-600 cursor-pointer font-bold">
                                        {seeMore ? " Show less" : " Show more"}
                                    </span>
                                </>
                            ) : (
                                data?.description
                            )}
                        </p>
                        {isNeedProfileEdit ? (
                           <div>
                             <button className="px-3 py-2 rounded-lg text-white bg-gray-300 text-md font-semibold cursor-not-allowed" disabled>
                                 Travel Request
                            </button>
                            <p className="text-red-400 font-semibold">You need to update your profile before <span className="text-green-400 hover:underline"><Link href='/myProfile'>go to profile</Link></span></p>
                           </div>
                        ) : (
                            <Link
                                href={`/trip/${data?.id}/tripRequest`}
                                className="px-3 py-2 rounded-lg text-white text-md font-semibold bg-[#00c2ab] hover:bg-[#083344]"
                            >
                                Travel Request
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
