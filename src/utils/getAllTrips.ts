import { baseApi } from '@/app/api/baseApi';
import { notFound, redirect } from 'next/navigation';


export const getAllTrips = async () => {
  try {
   
    const res = await fetch(`${baseApi}/api/v1/trips`, {
      cache: 'no-store'
  });

  if (!res.ok) {
      console.error('Failed to fetch user profile', res.statusText);
      return notFound();
  };
  const tripInfo = await res.json();
  return tripInfo;

  // if (!token) {
  //   return false;
  // }
  } catch (error) {
    return false;
  }
}
