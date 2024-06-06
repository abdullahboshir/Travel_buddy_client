import React from 'react';
import ToursManagement from './ToursManagement';

const DashboardContainer = ({tours}: any) => {
    return (
        <div className='text-black'>
            <ToursManagement tours={tours}/>
        </div>
    );
};

export default DashboardContainer;