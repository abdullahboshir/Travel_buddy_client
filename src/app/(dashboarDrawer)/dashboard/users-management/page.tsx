import React from 'react';
import UsersManagement from '@/components/Management/UsersManagement';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import { userProfileApi } from '@/utils/getUserProfile';

const UsersManagementPage = async () => {

    const session = (await getServerSession(authOptions)) as any;

  if (!session) {
    redirect("/login");
    return null;
  }

  const accessToken = session.user.accessToken;

  if (!accessToken) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1>Access token not found</h1>
      </div>
    );
  }

  const userProfileRes = await userProfileApi(accessToken);


    let users;
    try {
        const res = await fetch(`http://localhost:5000/api/v1/users/getUsers`, {
        cache: 'no-store'
    });
     users = await res.json();
    } catch (error: any) {
        new Error(error?.message)
    }


    return (
        <UsersManagement users={users} userProfileRes={userProfileRes} accessToken={accessToken}/>
    );
};

export default UsersManagementPage;
