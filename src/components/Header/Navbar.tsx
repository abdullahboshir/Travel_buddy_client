"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {signOut, useSession } from 'next-auth/react';
import Spinner from '../Spinner';
import { usePathname } from 'next/navigation'


const Navbar = () => {

  const { data: session, status } = useSession() as any;

 
    const pathname = usePathname()
console.log('current router ddddddddddd', pathname)

console.log('is admin?' , session)

  useEffect(() => {
    if (status === "unauthenticated") {
      <Link href='/auth/login' />
    }
  }, [status]);

  



    return (
<div>
  <div className="navbar">

  <div className="navbar-start">
   <div className='bg-black bg-opacity-30 backdrop-blur-sm text-white rounded-full flex justify-center items-center py-[10px] px-5 ml-5 ease-in duration-200'>
   <Link href='/' className=" z-30 w-[90px] hover:w-[95px] ease-in duration-200"><Image src='https://i.ibb.co/48bxVzk/wayfarer-logo-Photoroom.png' width={100} height={100} alt='logo' /></Link>
   </div>
  </div>

  <div className="navbar-center hidden lg:flex bg-black bg-opacity-30 backdrop-blur-sm text-white rounded-full py-1 px-5">
    <ul className="menu menu-horizontal px-1 gap-7 font-bold">
      <Link href='/home'><span className='hover:text-white hover:text-cyan-400 hover:text-[15px] ease-in duration-200'>Home</span></Link>
      <Link href='/myProfile'><span className='hover:text-white hover:text-cyan-400 hover:text-[15px] ease-in duration-200'>My Profile</span></Link>
      <Link href='/about'><span className='hover:text-white hover:text-cyan-400 hover:text-[15px] ease-in duration-200'>About Us</span></Link>
      { session?.user?.role === 'ADMIN' && 
        <Link href="/dashboard"><span className='hover:text-white hover:text-cyan-400 hover:text-[15px] ease-in duration-200'>Dashboard</span> </Link>
      }
    </ul>
  </div>

  <div className="navbar-end mr-5">
      <div className=' bg-black bg-opacity-30 backdrop-blur-sm text-white rounded-full py-2 px-5'>
    {
      session? <button onClick={() =>  signOut()}><span className='hover:text-white hover:text-cyan-400 hover:text-[17px] ease-in duration-200 font-bold'>Logout</span></button> : <Link href='/auth/login'><span className='hover:text-white hover:text-cyan-400 hover:text-[17px] ease-in duration-200 font-bold'>Login</span></Link>
    }
    </div>
  </div>
</div>
        </div>
    );
};

export default Navbar;