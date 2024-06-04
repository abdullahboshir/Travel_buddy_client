import Image from 'next/image';
import React from 'react';
import placeImg from '../../assets/pexels-the-world-hopper-1851481.jpg';
import { TTour } from '@/types/tour.type';

const TopTours = ({tours}: {tours: {data: TTour[]}}) => {

  
    return (
        <div className='flex flex-col'>

          {
            tours?.data?.slice(1, 2).map((tour: TTour) => (
              <div key={tour.id} className='w-full lg:card-side bg-base-100 shadow-xl bg-cyan-950 flex'>

              <div className='w-[50%] '>
              <figure><Image src={placeImg} alt="Album" width={500} height={20}/></figure>
              </div>
                
                <div className="w-[50%] flex justify-center flex-col pl-16">
                  <h2 className="text-4xl font-semibold text-left">{tour.destination}</h2>
                  <h2 className="text-lg text-left">5 days 4 nights</h2>
                  <p className='w-96'>{tour.description}</p>
                  <div className="flex justify-between items-center mt-10">
                    <button className="btn bg-[#02bb96] border-none rounded-full mr-16">VIEW DETAILS</button>
                    <p className='pr-16'>$500</p>
                  </div>
                </div>
                      </div>
            ))
          }

   


{
            tours?.data.slice(0, 1).map(tour => (
              <div key={tour.id} className='w-full lg:card-side bg-base-100 shadow-xl bg-cyan-950 flex'>

                
                <div className="w-[50%] flex justify-center flex-col pl-16">
                  <h2 className="text-4xl font-semibold text-left">{tour.destination}</h2>
                  <h2 className="text-lg text-left">5 days 4 nights</h2>
                  <p className='w-96'>{tour.description}</p>
                  <div className="flex justify-between items-center mt-10">
                    <button className="btn bg-[#02bb96] border-none rounded-full mr-16">VIEW DETAILS</button>
                    <p className='pr-16'>$500</p>
                  </div>
                </div>


                <div className='w-[50%] '>
              <figure><Image src={placeImg} alt="Album" width={500} height={20}/></figure>
              </div>
                      </div>
            ))
          }

  

</div>
    );
};

export default TopTours;