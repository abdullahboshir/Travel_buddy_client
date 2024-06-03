import React from 'react';

const TripRequest = ({tripId, profileInfo}: any) => {

    const userProfile = profileInfo.data.userProfile[0];


    console.log('session got from trip request ', profileInfo)



    return (
        <div>
            <>This is Trip request {profileInfo.data.userProfile[0].id}</>
        </div>
    );
};

export default TripRequest;