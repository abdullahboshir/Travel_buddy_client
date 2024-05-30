'use client'

import Image from "next/image";
import { useState } from "react";

const TourCard = () => {
  const [searchableData, setSearchableData] = useState({});


  const handleOnSearching = async (e: any) => {
    const searchTerm = e.target.value;
    console.log('searchable value goted', searchTerm)

    

      const res = await fetch(`http://localhost:5000/api/v1/trips?searchTerm=${searchTerm}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
          cache: 'no-store'
      });
  
      const queryValue = await res.json();
      setSearchableData(queryValue)
      console.log('searchable value goted', queryValue)
     
  };



    return (
      <div className="flex flex-col bg-base-100 shadow-xl bg-cyan-950">

        <div className="w-full flex justify-center items-center flex-col text-black">
          <div className="w-96">
            <form>
            <div className="join">
              <div>
                <div>
                  <input
                  onChange={handleOnSearching}
                    className="input input-bordered join-item"
                    placeholder="Search"
                  />
                </div>
              </div>
              <select className="select select-bordered join-item">
                <option disabled selected>
                  Filter
                </option>
                <option disabled className="font-bold">Type</option>
                <option>Nature</option>
                <option>Adventure</option>
                <option>Cultural</option>
                <option disabled className="font-bold">Continent</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Africa</option>
              </select>
              <div className="indicator">
                <button type="submit" className="btn join-item">Search</button>
              </div>
            </div>
            </form>
          </div>
        </div>


<div className="relative flex justify-center items-center flex-col mt-8">

  <div className="mb-52 rounded-lg">
    <Image src='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' width={300} height={300} alt='travel img' className="w-96 rounded-lg"/>
  </div>

        <div className="lg:card-side flex justify-center items-center absolute top-48">
        
          <div className="w-[350px] flex justify-center flex-col bg-gray-500 h-36 rounded-lg">
            <h2 className="text-4xl font-semibold text-left">dfgklf</h2>
            <h2 className="text-lg text-left">5 days 4 nights</h2>
            <p className="w-96">5465453546</p>
            <div className="flex justify-between items-center mt-10">
              <p className="pr-16">$500</p>
            </div>
          </div>
        </div>
</div>

      </div>
    );
};

export default TourCard;