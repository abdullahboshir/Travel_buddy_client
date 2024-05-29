import Tours from '@/components/Management/Tours';
import Sidebar from '@/components/Shared/Sidebar';
import React from 'react';

const DashboardPage = () => {
    return (
        <div>
        <Sidebar>
            <Tours/>
        </Sidebar>
    </div>
    );
};

export default DashboardPage;