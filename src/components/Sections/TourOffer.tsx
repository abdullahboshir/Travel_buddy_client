import React from 'react';
import Image from 'next/image';

const TourOffer = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center bg-[#eae8e8] pt-20 mt-10'>
                <button className='btn bg-teal-950 text-white rounded-full -mt-[102px] hover:bg-teal-900 hover:text-white'>ViEW ALL COUNTRIES</button>
          
          <div className='w-full'>
          <Image src='https://i.ibb.co/DM9yhVK/Travel-offer-Made-with-Poster-My-Wall.jpg' width={500} height={500} alt='travel offer' className='pt-10 w-full h-[600px]'/> 
          </div>
        </div>
    );
};

export default TourOffer;