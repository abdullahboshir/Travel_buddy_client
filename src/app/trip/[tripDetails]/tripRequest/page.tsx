import TripRequest from '@/components/Trip/TripRequest';
import { getServerSession } from "next-auth";  
import { authOptions } from '@/utils/authOptions';
import { notFound, redirect } from 'next/navigation';
const TripRequestPage = async ({params}: any) => {

    const session = await getServerSession(authOptions) as any;

    if (!session) {
        redirect('/login');
        return null;
    }

    const accessToken = session.user.accessToken;

    if (!accessToken) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <h1>Access token not found</h1>
            </div>
        );
    }

    const res = await fetch('http://localhost:5000/api/v1/users/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        cache: 'no-store'
    });

    if (!res.ok) {
        console.error('Failed to fetch user profile', res.statusText);
        return notFound();
    };
    const userInfo = await res.json();
    console.error(' fetch user profileeeeeeeeeeeeeeeeeee', userInfo);
    const userProfile = userInfo.data.userProfile[0];

    if(!userProfile.bio || !userProfile.age || !userProfile.phone || !userProfile.address){
        redirect('/myProfile');
        return null;
    };


    return (
        <div>
            <TripRequest tripId={params.tripDetails} profileInfo={userInfo} />
        </div>
    );
};

export default TripRequestPage;
