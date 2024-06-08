import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TourOffer = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center bg-[#eae8e8] pt-20 mt-10'>
                <Link href='/trip/allTrips' className='btn z-50 bg-[#02bb96] font-bold hover:bg-gray-950 text-white rounded-full -mt-[102px] hover:text-white '>ViEW ALL COUNTRIES</Link>
          
          <div className='w-full'>
          <Image src='https://i.ibb.co/DM9yhVK/Travel-offer-Made-with-Poster-My-Wall.jpg' width={500} height={500} alt='travel offer' className='pt-10 w-full h-[600px]'/> 
          </div>
        </div>
    );
};

export default TourOffer;