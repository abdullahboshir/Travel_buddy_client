import React from 'react';
import viewImg from '../../assets/gettyimages-1039937216-2048x2048.jpg';
import Image from 'next/image';


const ViewTours = () => {
    return (
      
<div className='flex flex-col-reverse'>
    <div className="relative justify-center items-center w-full image-full">

<div className='w-full'><Image src={viewImg} width={1000} height={1000} alt="traveling image" className='w-full h-[750px]'/></div>

<div className="absolute right-24 top-52">
  <h2 className="text-3xl font-bold ">Top Travelling Destinations</h2>
  <p className='w-96 text-lg'>Treat yourself with a journey to your inner self. Visit a mystique Tibet and start your spiritual adventure. We promise you&apos;ll enjoy every step your make.</p>
  <div className="card-actions mt-5">
  <button className="btn bg-yellow-400 border-none rounded-full mr-16">VIEW TOURSE</button>
  </div>
</div>


  </div>
</div>
  
    );
};

export default ViewTours;