
import TourCard from '@/components/Cards/TourCard';
import Footer from '@/components/Footer';
import Silder from '@/components/Hero/Silder';
import Service from '@/components/Sections/Service';
import TourOffer from '@/components/Sections/TourOffer';
import ViewTours from '@/components/Sections/ViewTours';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

const HomePage = async () => {

const res = await fetch('http://localhost:5000/api/v1/trips',
    {
        cache: 'no-store'
    }
);
const tours = await res.json();


    return (
        <div>
            <div className='relative h-full'>
        <div className='absolute left-0 top-0 z-10'>
            
       <div>
       <Silder/>
       </div>

        <div>
       <Service/>
      <TourCard tours={tours}/>
        <TourOffer/>
        <ViewTours/>
        
        <div >
        <Footer/>
        </div>
     
       </div>


        </div>

        </div>

        </div>
    );
};

export default HomePage;