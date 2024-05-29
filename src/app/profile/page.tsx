'use client'
import PrivateRoute from '@/components/PrivateRoute';
import React from 'react';

const MyProfile = () => {
    return (
       <PrivateRoute>
         <div className='h-96'>
            <h1>This my profileeeeee</h1>
        </div>
       </PrivateRoute>
    );
};

export default MyProfile;