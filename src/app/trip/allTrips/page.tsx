import { baseApi } from '@/app/api/baseApi';
import Footer from '@/components/Footer';
import AllTrips from '@/components/Trip/AllTrips';
import React from 'react';

const AllTripsPage = async () => {
    const res = await fetch(`${baseApi}/api/v1/trips`, {
        cache: "no-store",
      });
      const tours = await res.json();

    return (
        <div  className='h-screen bg-gray-200'>
          <div className='pt-8'>
          <AllTrips tours={tours}/>
          <Footer/>
          </div>
        </div>
    );
};

export default AllTripsPage;