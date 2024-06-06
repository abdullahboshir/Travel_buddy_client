import PrivateRoute from '@/components/PrivateRoute';
import Sidebar from '@/components/Shared/Sidebar';
import React from 'react';

const DashboardLayout = ({children}: any) => {
    return (
        <div className='pt-16 bg-white'>
            <PrivateRoute>
            <Sidebar>
             {children}
            </Sidebar>
            </PrivateRoute>
        </div>
    );
};

export default DashboardLayout;