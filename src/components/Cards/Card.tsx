import React from 'react';
import Image from 'next/image';

type TTour = {
    id: number;
    name: string;
    img: string;
    description: string;
}

const Card = ({tour}: {tour: TTour}) => {

   
    return (
        <div>
            <div key={tour.id} className='h-60 w-72 bg-gradient-to-r from-cyan-500 to-[#02bb96]  flex flex-col justify-center items-center text-center rounded-b-xl px-3'>
                <Image src={tour.img} width={70} height={70} alt='tour icon'/>
                <h1 className='text-3xl font-semibold my-2'>{tour.name}</h1>
                <p>{tour.description.slice(0, 120)}..</p>
            </div>
      </div>
    );
};

export default Card;