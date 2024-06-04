import UpdateTrip from '@/components/Trip/UpdateTrip';
import React from 'react';

const updateTripPage = async ({params}:any) => {
    return (
        <div className='pt-10 bg-gray-200'>
            <UpdateTrip tripId={params?.tripId}/>
        </div>
    );
};

export default updateTripPage;