"use client"
import React from 'react';
import { useRouter } from 'next/router';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { BsTelephoneForward } from 'react-icons/bs';
import { AiOutlineYahoo, AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import Link from 'next/link';

const Footer = () => {
//   const router = useRouter();

//   const navigateTo = (path) => {
//     router.push(path);
//   };

  return (
    <footer className="bg-[#27485B] text-white flex flex-col font-raleway">
      <div className="footer-items flex justify-evenly items-center mb-8 pt-12">
        <div className="item mx-4 text-center">
          <h3 className="font-bold text-3xl">TRAVEL BUDDY</h3>
          <p className="text-lg text-[#1de2a3] hover:text-white">It is time for a new journey</p>
        </div>
        <div className="item mx-4">
          <h5 className="font-bold text-lg mb-2">NAVIGATION</h5>
          <Link href="/home" passHref className="block text-[#1de2a3] hover:text-white hover:underline mb-1">
          Home
          </Link>
          <Link href="/checkout" passHref className="block text-[#1de2a3] hover:text-white hover:underline mb-1">
            Profile
          </Link>
          <Link href="/blogs" passHref className="block text-[#1de2a3] hover:text-white hover:underline mb-1">
          Tours
          </Link>
          <Link href="/about" passHref className="block text-[#1de2a3] hover:text-white hover:underline mb-1">
          About
          </Link>
          <Link href="/login" passHref className="block text-[#1de2a3] hover:text-white hover:underline mb-1">
          Login
          </Link>
        </div>
        <div className="item mx-4">
          <h5 className="font-bold text-lg mb-2">COMPANY</h5>
          <p className="mb-1 hover:underline text-[#1de2a3]  hover:text-white hover:underline">About Us</p>
          <p className="mb-1 hover:underline text-[#1de2a3]  hover:text-white hover:underline">Clients</p>
          <p className="mb-1 hover:underline text-[#1de2a3]  hover:text-white hover:underline">Safety</p>
          <p className="mb-1 hover:underline text-[#1de2a3]  hover:text-white hover:underline">Support</p>
          <p className="mb-1 hover:underline text-[#1de2a3]  hover:text-white hover:underline">Schedule</p>
        </div>
        <div className="item mx-4 text-left">
          <h5 className="font-bold text-lg mb-2">CONTACT US</h5>
          <p className="flex items-center justify-center mb-1 text-[#1de2a3]  hover:text-white hover:underline"><HiOutlineLocationMarker className="mr-2" /> 914 Nathan Courts Suite 632</p>
          <p className="flex items-center justify-start mb-1 text-[#1de2a3]  hover:text-white hover:underline"><BsTelephoneForward className="mr-2" /> +1-924-552-4346 </p>
          <p className="flex items-center justify-start mb-1 text-[#1de2a3]  hover:text-white hover:underline"><HiOutlineMail className="mr-2" /> ralph48@hotmail.com</p>
          <p className="flex items-center justify-start mb-1 text-[#1de2a3]  hover:text-white hover:underline"><AiOutlineYahoo className="mr-2" /> ralph48@yahoo.com</p>
        </div>
      </div>
      <hr className="w-4/5 mx-auto" />
      <div className="footer-social flex flex-col justify-center items-center mt-6 pb-8">
        <div className="social flex space-x-4 mb-4">
          <AiFillFacebook className="border border-1 text-4xl rounded-full p-[6px] hover:text-[#1de2a3] hover:text-[38px] ease-in duration-200 " />
          <AiOutlineTwitter className="border border-1 text-4xl rounded-full p-[6px] hover:text-[#1de2a3] hover:text-[38px] ease-in duration-200 " />
          <AiFillInstagram className="border border-1 text-4xl rounded-full p-[6px] hover:text-[#1de2a3] hover:text-[38px] ease-in duration-200 " />
          <AiFillYoutube className="border border-1 text-4xl rounded-full p-[6px] hover:text-[#1de2a3] hover:text-[38px] ease-in duration-200" />
        </div>
        <div className="social-caption text-center text-lg">
          <small>
            &copy; {new Date().getFullYear()} Travel Sense <span className="inline-block mx-2">|</span> <span className="hover:underline">Privacy Policy</span>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
