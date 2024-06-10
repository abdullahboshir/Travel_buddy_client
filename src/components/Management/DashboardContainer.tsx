'use client'
import { useEffect, useState } from 'react';
import ToursManagement from './ToursManagement';
import { baseApi } from '@/app/api/baseApi';

const DashboardContainer = () => {
  
     
    return (
        <div className='text-black'>
            <ToursManagement/>
        </div>
    );
};

export default DashboardContainer;

