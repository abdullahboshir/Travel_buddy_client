import React from "react";
import Card from "../Cards/Card";
import Image from "next/image";
import typeOfTours from '../../assets/dummyData/typeOfTours.json';

const Service = () => {
  
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full h-[290px] bg-cover bg-center z-20 bg-base-100 shadow-xl image-full rounded-none">
        <figure className="w-full h-full">
          <Image
            src='https://i.ibb.co/Kxy7k35/pexels-pixabay-207896.jpg'
            alt="tour image"
            layout="fill"
            className="object-cover rounded-none"
          />
        </figure>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        <div className="absolute inset-0 text-white z-10">
          <div className="flex justify-evenly -mt-5 px-24">
            {typeOfTours.map((typeOfTourdata) => (
              <div key={typeOfTourdata.id}>
                <Card typeOfTourdata={typeOfTourdata} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
