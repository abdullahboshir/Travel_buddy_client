'use client'
import React from 'react';
import { BiRun } from 'react-icons/bi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



const NotFound = () => {
  const router = useRouter();

  return (
    <div className='w-full h-screen'>

    <div className="flex flex-col h-screen fixed ml-96">
        <div className='w-full h-screen flex mt-[150px] ml-[21px] items-center flex-col relatve'>

      <h1 className="text-3xl font-semibold mb-2">AHHHHHHH! YOU FOUND ME!</h1>
      <p className="w-96 text-center">
        Uh oh, we can&apos;t seem to find the page you&apos;re looking for. Try going back to the previous page!
      </p>
      <BiRun className="text-[100px] text-[#FC9933] transform -scale-x-100" />
      <br />
      <button
        className="w-36 mr-2 about-btn border-4 px-5 py-1 border border-[#00c2ab] rounded-lg text-[#00c2ab] hover:bg-[#00c2ab] hover:text-black font-bold"
        onClick={() => router.push('/')}
        >
        Go to Home
      </button>
          </div>

      <div className="w-96 absolute ml-[590px] h-screen">
        <span
          className="absolute w-20 h-[800px] ml-[218px] top-0 bg-[linear-gradient(0deg,#64646b,rgba(500,500,255,0))]"
        >
          {/* <Image src='https://i.ibb.co/27K8pPJ/pngegg.png' alt="Not found image" width={500} height={500} /> */}
        </span>
        
        <Image
          src='https://i.ibb.co/27K8pPJ/pngegg.png'
          alt="Not found image"
          className="absolute w-[280px] top-[348px]"
          width={500}
          height={500}
          />
      </div>
    </div>
          </div>
  );
};

export default NotFound;
