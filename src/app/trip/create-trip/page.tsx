import PostTrip from '@/components/Trip/PostTrip';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

const TripPostPage = async () => {
    const session = await getServerSession(authOptions) as any;
    return (
        <div>
        <PostTrip session={session}/>
    </div>
    );
};

export default TripPostPage;