import { notFound } from "next/navigation";


export const userTripApi = async (accessToken: any) => {
    try {

        if(!accessToken){
            return 'Access Token not found'
        };
     
      const res = await fetch('http://localhost:5000/api/v1/trips/getUserTrip', {
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
    console.log('ressssssssssssssssss', res, userInfo)
    return userInfo;
  
    } catch (error: any) {
      return error.message;
    }
  }
  