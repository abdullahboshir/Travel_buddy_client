'use client'
import { TTour } from "@/types/tour.type";
import Image from "next/image";
import Link from "next/link";

const TripDetails = ({data}: {data:TTour}) => {

    return (
       <div>
         <div className='bg-white flex justify-center items-center h-screen text-black'> 

           <div className='h-screen justify-center flex bg-gray-200 w-[1100px] h-[400px] mt-16' style={{boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>



           <div className="grid grid-cols-3 gap-4">
           {
                data?.photos?.map((photo: any, index) => (
                    <div key={index} className="w-28">
                <Image src={photo} width={200} height={200} alt="tour img"  />
            </div>
                ))
            }
    </div>


           <div className="w-[60%]">
           <h1 className='text-5xl font-semibold mt-5'>{data?.destination}</h1>
            <h2>{data?.itinerary}</h2>
            <p>{data?.type}</p>
            <p>{data?.location}</p>
            <p>{data?.startDate as any}</p>
            <p>{data?.description}</p>
           </div>

            <Link href={`/trip/${data?.id}/tripRequest`} className="btn btn btn-primary">Travel Request</Link>
           </div>
        </div>
       </div>
    );
};

export default TripDetails;