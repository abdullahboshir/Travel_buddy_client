import TripDetails from '@/components/Trip/TripDetails';
import React from 'react';

type TParams = {
    params: {
        tripDetails : string
    }
}

const TravelDetailsPage = async ({params}: TParams) => {
    let tour;

    try {
        const res = await fetch(`http://localhost:5000/api/v1/trips/getSingleTrip/${params.tripDetails}`, {
        cache: 'no-store'
    });
     tour = await res.json();
    } catch (error: any) {
        new Error(error?.message)
    }

    return (
        <div>
             <TripDetails data={tour.data}/>
        </div>
    );
};

export default TravelDetailsPage;