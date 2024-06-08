import DashboardContainer from '@/components/Management/DashboardContainer';
import { getServerSession } from 'next-auth';
import { NextPage } from 'next';
import { authOptions } from '@/utils/authOptions';
import React from 'react';
import UnAthorizedPage from '@/components/UnAthurizedPage';
import { baseApi } from '@/app/api/baseApi';

const DashboardPage: NextPage = async () => {
  const session = await getServerSession(authOptions) as any;

  if (!session || session?.user?.role !== 'ADMIN') {
    return <UnAthorizedPage />;
  }

  const res = await fetch(`${baseApi}/api/v1/trips`, {
    cache: 'no-store',
  });

  const tours = await res.json();

  return (
    <div className="bg-white">
      <DashboardContainer tours={tours?.data} />
    </div>
  );
};

export default DashboardPage;
