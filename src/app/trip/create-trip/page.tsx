import PrivateRoute from '@/components/PrivateRoute';
import PostTrip from '@/components/Trip/PostTrip';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

const TripPostPage = async () => {
    const session = await getServerSession(authOptions) as any;
    return (
        <PrivateRoute>
        <div>
        <PostTrip session={session}/>
    </div>
        </PrivateRoute>
    );
};

export default TripPostPage;