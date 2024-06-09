'use client'
import { useEffect, useState } from 'react';
import ToursManagement from './ToursManagement';
import { baseApi } from '@/app/api/baseApi';

const DashboardContainer = () => {
    const [initialTours, setInitialTours] = useState([]);

    useEffect(() => {
      const fetchInitialTours = async () => {
        try {
          const res = await fetch(`${baseApi}/api/v1/trips/adminTrip`, {
            cache: "no-store",
          });
          const data = await res.json();
          setInitialTours(data?.data);
        } catch (error) {
          console.error("Error fetching initial tours:", error);
        }
      };
  
      fetchInitialTours();
    }, []);
    
   
    return (
        <div className='text-black'>
            <ToursManagement tours={initialTours}/>
        </div>
    );
};

export default DashboardContainer;

