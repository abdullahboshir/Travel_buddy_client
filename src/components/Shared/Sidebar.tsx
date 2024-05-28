import Link from 'next/link';
import React from 'react';
import ViewTours from '../Sections/ViewTours';

const Sidebar = ({children}: any) => {
    return (
        <div className='bg-white'>
           <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    <div className='p-4'>
     {
      children
     }
    </div>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 

  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li>
        <Link href='/dashboard' >Tours</Link>
      </li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default Sidebar;