import React from 'react';
import icon from '../../assets/icons/313418393_513873044086941_9155546839920974588_n.png';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-black opacity-70">
  <div className="navbar-start">
    <div className="dropdown">
      
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost -mt-12 z-30"><Image src={icon} width={100} height={100} alt='logo' /></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-7 font-semibold">
      <Link href='/home'>Home</Link>
      <Link href='/profile'>My Profile</Link>
      <Link href='/about'>About Us</Link>
      <Link href='login'>Login</Link>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn btn-sm">Button</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;