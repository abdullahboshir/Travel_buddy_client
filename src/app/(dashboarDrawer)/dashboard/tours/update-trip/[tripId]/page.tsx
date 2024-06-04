import UpdateTrip from '@/components/Trip/UpdateTrip';
import React from 'react';

const updateTripPage = async ({params}:any) => {
    return (
        <div>
            <UpdateTrip tripId={params?.tripId}/>
        </div>
    );
};

export default updateTripPage;