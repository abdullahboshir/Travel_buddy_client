import DashboardContainer from '@/components/Management/DashboardContainer';
import PrivateRoute from '@/components/PrivateRoute';
import React from 'react';

const DashboardPage = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/trips`, {
        cache: "no-store",
      });
      const tours = await res.json();

    return (
        <PrivateRoute>
        <DashboardContainer tours={tours} />
        </PrivateRoute>
    );
};

export default DashboardPage;