'use client';

import Image from 'next/image';
import { useState } from 'react';

const TourCard = () => {
  const [searchableData, setSearchableData] = useState([]);

  const handleOnSearching = async (e: any) => {
    const searchTerm = e.target.value;
    console.log('searchable value got', searchTerm);

    const res = await fetch(`http://localhost:5000/api/v1/trips?searchTerm=${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    const queryValue = await res.json();
    setSearchableData(queryValue);
    console.log('searchable value got', queryValue);
  };

  const dummyData = [
    {
      photo: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      destination: 'Explore New York',
      description: 'Experience the bustling city life of New York, with its iconic landmarks such as the Statue of Liberty, Central Park, and Times Square. Savor world-class cuisine, enjoy Broadway shows, and immerse yourself in the vibrant arts and culture scene. Whether it\'s shopping on Fifth Avenue or exploring the diverse neighborhoods, New York offers something for everyone.',
      startDate: '2024-05-21',
      button: 'View Tours'
    },
    {
      photo: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      destination: 'Discover Paris',
      description: 'Enjoy the beautiful scenery and rich history of Paris, the city of lights. Wander through the charming streets, visit world-famous museums like the Louvre and Musée d\'Orsay, and admire the architectural marvels such as the Eiffel Tower and Notre-Dame Cathedral. Indulge in exquisite French cuisine and enjoy a romantic cruise along the Seine River.',
      startDate: '2024-06-10',
      button: 'View Tours'
    },
    {
      photo: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      destination: 'Adventure in Tokyo',
      description: 'Explore the vibrant city life and culture of Tokyo, Japan. Experience the perfect blend of traditional and modern attractions, from ancient temples and serene gardens to bustling shopping districts and futuristic skyscrapers. Savor authentic Japanese cuisine, including sushi, ramen, and street food. Don\'t miss the colorful festivals and lively nightlife that make Tokyo a must-visit destination.',
      startDate: '2024-07-15',
      button: 'View Tours'
    }
  ];

  const dataToShow = searchableData.length > 0 ? searchableData : dummyData;

  return (
    <div className="flex flex-col items-center bg-base-100 shadow-xl bg-gray-200 p-8">
      <div className="w-full flex justify-center items-center flex-col text-black mb-8">
        <div className="w-96">
          <form>
            <div className="join">
              <input
                type="text"
                onChange={handleOnSearching}
                className="input input-bordered join-item"
                placeholder="Search"
              />
              <select className="select select-bordered join-item">
                <option disabled selected>Filter</option>
                <option className="font-bold" disabled>Type</option>
                <option>Nature</option>
                <option>Adventure</option>
                <option>Cultural</option>
                <option className="font-bold" disabled>Continent</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Africa</option>
              </select>
              <button type="submit" className="btn join-item">Search</button>
            </div>
          </form>
        </div>
      </div>


      <div className="flex flex-wrap justify-center gap-8 text-black">
        {dataToShow.map((tour, index) => (
          <div key={index} className="w-[370px] h-[470px] bg-white rounded-lg"style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <div className="relative w-full h-52">
              <Image
                src={tour.photo}
                alt={tour.destination}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-5">
              <h3 className="text-3xl font-bold mb-3">{tour.destination}</h3>
              <p className="text-md mb-2">{tour.description.slice(0, 170)}...</p>
              
              <div className='flex justify-between  items-center mt-8'>
              <button className="px-3 py-2 rounded-lg text-white bg-emerald-400 text-md hover:bg-[#083344] hover:font-bold hover:text-[16px] ease-in duration-100 transition">{tour.button}</button>
              <p className='text-sm flex flex-col leading-4'><span>Travel Date:</span> {tour.startDate}</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      <button className="px-3 py-2 rounded-lg text-white bg-emerald-400 text-md hover:bg-[#083344] hover:font-bold hover:text-[16px] ease-in duration-100 transition my-10">See more..</button>
    </div>
  );
};

export default TourCard;
