import DashboardContainer from '@/components/Management/DashboardContainer';
import { getServerSession } from 'next-auth';
import { NextPage } from 'next';
import { authOptions } from '@/utils/authOptions';
import React from 'react';
import UnAthorizedPage from '@/components/UnAthurizedPage';


const DashboardPage: NextPage = async () => {
  const session = await getServerSession(authOptions) as any;

  if (!session || session?.user?.role !== 'ADMIN') {
    return <UnAthorizedPage />;
  }


  return (
    <div className="bg-white">
      <DashboardContainer/>
    </div>
  );
};

export default DashboardPage;
