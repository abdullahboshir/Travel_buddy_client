import { notFound, redirect } from 'next/navigation';


export const userProfileApi = async (accessToken: any) => {
  try {
   
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/users/profile`, {
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
  return userInfo;

  // if (!token) {
  //   return false;
  // }
  } catch (error) {
    return false;
  }
}
