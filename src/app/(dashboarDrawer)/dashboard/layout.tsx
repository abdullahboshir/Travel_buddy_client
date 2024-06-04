import Sidebar from '@/components/Shared/Sidebar';
import React from 'react';

const DashboardLayout = ({children}: any) => {
    return (
        <div className='pt-16 bg-white'>
            <Sidebar>
             {children}
            </Sidebar>
        </div>
    );
};

export default DashboardLayout;