import React from 'react';
import Silder from './Hero/Silder';
import Service from './Sections/Service';
import TopTours from './Sections/TopTours';
import TourCard from './Cards/TourCard';
import TourOffer from './Sections/TourOffer';
import ViewTours from './Sections/ViewTours';
import Footer from './Footer';
import { TTour } from '@/types/tour.type';

const Container = ({tours}: {tours: any}) => {
    return (
        <div>
            <div className="relative h-full">
        <div className="absolute left-0 top-0 z-10">
          <div>
            <Silder />
          </div>

          <div>
            <Service />
            <TourCard tours={tours}/>
            <TopTours tours={tours} />
            <TourOffer />
            <ViewTours />

            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Container;