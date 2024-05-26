import React from 'react';
import footerBanner from '../assets/footer-img.jpg';
import Image from 'next/image';


const Footer = () => {
    return (
        <div className="relative w-full flex justify-end items-center w-full mt-28">
       
            <div className='w-full h-[400px] z-40 absolute opacity-50 bg-gray-200 pt-28'></div>

            <div className='w-full h-[100px] z-30'>
                <Image src={footerBanner} layout="fill" objectFit="cover" alt="traveling image" className='w-full h-[100px]'/>
            </div>
        </div>
    );
};

export default Footer;