"use client"
import React, { useEffect, useState } from 'react';
import icon from '../../assets/icons/313418393_513873044086941_9155546839920974588_n1.png';
import Image from 'next/image';
import Link from 'next/link';
import {signOut, useSession } from 'next-auth/react';


const Navbar = () => {

  const { data: session, status } = useSession();



  useEffect(() => {
    if (status === "unauthenticated") {
      <Link href='/auth/login' />
    }
  }, [status]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }


    return (
<div>
  <div className="navbar">

  <div className="navbar-start">
   <div className='bg-black bg-opacity-30 backdrop-blur-sm text-white rounded-full flex justify-center items-center p-2 ml-5 ease-in duration-200'>
   <a className=" z-30 w-[50px] hover:w-[55px] ease-in duration-200"><Image src={icon} width={100} height={100} alt='logo' /></a>
   </div>
  </div>

  <div className="navbar-center hidden lg:flex bg-black bg-opacity-30 backdrop-blur-sm text-white rounded-full py-1 px-5">
    <ul className="menu menu-horizontal px-1 gap-7 font-bold">
      <Link href='/home'><span className='hover:text-white hover:text-[#1de2a3] hover:text-[15px] ease-in duration-200'>Home</span></Link>
      <Link href='/profile'><span className='hover:text-white hover:text-[#1de2a3] hover:text-[15px] ease-in duration-200'>My Profile</span></Link>
      <Link href='/about'><span className='hover:text-white hover:text-[#1de2a3] hover:text-[15px] ease-in duration-200'>About Us</span></Link>
      <Link href="/dashboard"><span className='hover:text-white hover:text-[#1de2a3] hover:text-[15px] ease-in duration-200'>Dashboard</span> </Link>
    </ul>
  </div>

  <div className="navbar-end mr-5">
      <div className=' bg-black bg-opacity-30 backdrop-blur-sm text-white rounded-full py-2 px-5'>
    {
      session? <button onClick={() =>  signOut()}><span className='hover:text-white hover:text-[#1de2a3] hover:text-[15px] ease-in duration-200'>Logout</span></button> : <Link href='/auth/login'><span className='hover:text-white hover:text-[#1de2a3] hover:text-[17px] ease-in duration-200 font-bold'>Login</span></Link>
    }
    </div>
  </div>
</div>
        </div>
    );
};

export default Navbar;