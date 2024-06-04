import Link from 'next/link';
import React from 'react';

const Sidebar = ({ children }: any) => {
    return (
        <div className='bg-white'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <div className='pl-4 w-full'>
                        {children}
                    </div>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 pt-[60px] w-48 min-h-full bg-gray-200 text-base-content gap-2">
                        <li>
                            <Link href='/dashboard/tours'>Tours</Link>
                        </li>
                        <li>
                            <Link href='/dashboard/users-management'>Users</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
