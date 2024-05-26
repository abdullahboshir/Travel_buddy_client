
import TourCard from '@/components/Cards/TourCard';
import Footer from '@/components/Footer';
import Navbar from '@/components/Header/Navbar';
import Silder from '@/components/Hero/Silder';
import Service from '@/components/Sections/Service';
import TourOffer from '@/components/Sections/TourOffer';
import ViewTours from '@/components/Sections/ViewTours';
import React from 'react';

const HomePage = async () => {

const res = await fetch('http://localhost:5000/api/v1/trips',
    {
        cache: 'no-store'
    }
);
const tours = await res.json();
console.log('dtaaaaaaaaaaaaaaa', tours)


    return (
        <div>
            <div className='relative h-full'>
          <div className='absolute left-0 top-0 w-full z-20'>
          <Navbar/>
          </div>

        <div className='absolute left-0 top-0 z-10'>
            
       <div>
       <Silder/>
       </div>

        <div>
       <Service/>
      <TourCard tours={tours}/>
        <TourOffer/>
        <ViewTours/>
        <Footer/>
       </div>


        </div>

        </div>

        </div>
    );
};

export default HomePage;