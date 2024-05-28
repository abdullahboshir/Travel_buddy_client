import Tours from '@/components/Management/Tours';
import Sidebar from '@/components/Shared/Sidebar';
import React from 'react';

const DashboardPage = () => {
    return (
        <div className='pt-16'>
        <Sidebar>
            <Tours/>
        </Sidebar>
    </div>
    );
};

export default DashboardPage;