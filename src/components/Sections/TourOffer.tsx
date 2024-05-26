import React from 'react';
import taravelOfferImg from '../../assets/Travel offer - Made with PosterMyWall.jpg';
import Image from 'next/image';

const TourOffer = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center bg-[#eae8e8] pt-20 mt-10'>
                <button className='btn bg-teal-950 text-white rounded-full -mt-[102px] hover:bg-teal-900 hover:text-white'>ViEW ALL COUNTRIES</button>
          
          <div className='w-full'>
          <Image src={taravelOfferImg} width={1000} height={100} alt='travel offer' className='pt-10 w-full h-[600px]'/> 
          </div>
        </div>
    );
};

export default TourOffer;