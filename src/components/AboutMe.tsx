import Image from 'next/image';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const AboutMe = () => {

  const html: any = { "--value": 85 };
  const css: any = { "--value": 75 };
  const js: any = { "--value": 70 };
  const react: any = { "--value": 80 };
  const node: any = { "--value": 65 };
  const mongodb: any = { "--value": 55 };
  const express: any = { "--value": 65 };
  const others: any = { "--value": 90 };


  return (
    <div>
      <div className="hero min-h-screen" style={{ backgroundImage: "url(https://i.ibb.co/ZX62G2w/about-Me-Bg.jpg)" }}>
        <div className="hero-overlay bg-opacity-90"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-4xl border-2 border-slate-600 py-2 px-4 bg-opacity-20 bg-black">
            <h1 className="mb-5 text-4xl font-bold text-white mb-0">I&apos;M ABUDLLAH BOSHIR</h1>
            <p className="mb-5 text-[#03bcbe] pb-0 mb-0">Beautiful creative experience in website development.</p>
          </div>
        </div>
      </div>


      <div className='bg-[#03BCBE] h-[670px] h-sreen flex itemx-center justify-center text-white flex-col'>
        <div className='mb-16 flex flex-col justify-center w-sreen'>
          <h1 className='text-4xl font-semibold mt- text-center'>About Me</h1>
          <p className='text-center'>CREATIVE WEB DEVELOPER</p>
        </div>
        <div className='flex justify-between items-center px-28 text-white'>
          <div className='w-[800px] text-start ml-12'>
            <h1 className='text-2xl font-semibold'>ABDULLAH BOSHIR</h1>
            <h2 className='mb-4 text-base font-semibold'>Beautiful creative experience in website development.</h2>
            <p>Hello, I&apos;m Abdulla Boshir. As a Web developer from Bangladesh. actually, Web development is my hobby. I really enjoy this job very much. I have creative experience in website development. and I always like trying to learn something new in this sector. that&apos;s why I find Confidence in this Sector. I don’t believe in declarations, I just believe in how much I have been able to satisfy you or the company with my skills.</p>
            <p className='mt-4'>So, Check out my experience below to know the extent of my experiences in the World of Web Development.</p>

            <div className="collapse mt-6 w-[260px] rounded-none">
              <input type="checkbox" className="peer pr-0" />
              <div className="collapse-title bg-violet-600 text-white peer-checked:bg-violet-600">
                DOWNLOAD MY RESUME
              </div>

              <div className="collapse-content bg-primary text-white peer-checked:bg-violet-600 peer-checked:text-violet-600-content flex  flex-col">

                <div className='flex items-center justify-start'>
                  <a href="https://storied-caramel-a8511c.netlify.app/" className='text-white-600 underline hover:text-white text-start'>Ark Reality Live</a><IoIosArrowForward className='ml-[1px] text-lg text-white' />
                </div>
                <div className='flex items-center justify-start my-2'>
                  <a href="https://travel-buddy-client-eight.vercel.app/" className='text-white-600 underline hover:text-white'>Wyfarer Live</a><IoIosArrowForward className='ml-[1px] text-lg text-white' />
                </div>

                <div className='flex items-center justify-start'>
                  <a href="https://moto-sport.web.app/" className='text-white-600 underline hover:text-white'>Moto Sport Live</a><IoIosArrowForward className='ml-[1px] text-lg text-white' />
                </div>


              </div>
            </div>
          </div>

          <div className="w-[500px]  ml-40">
          <Image width={300} height={300} className='w-60 rounded-full border-8 border-base-600' src="https://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png" alt="" />
          </div>

        </div>
      </div>


      <div className='bg-gray-200 h-[600px] h-sreen flex items-center justify-center text-black flex-col'>

        <div className='mb-16 flex flex-col justify-center w-sreen'>
          <h1 className='text-4xl font-semibold text-violet-600'>TECHNICAL SKILLS</h1>
          <p className='text-center'>CREATIVE WEB DEVELOPER</p>
        </div>

        <div className='grid grid-cols-4 gap-4 w-[800px]'>

          <div className='mb-6'>
            <div className="radial-progress text-violet-600" style={html}>85%</div>
            <h1 className='text-xl font-semibold mt-2'>HTML5</h1>
          </div>

          <div>
            <div className="radial-progress text-violet-600" style={css}>75%</div>
            <h1 className='text-xl font-semibold mt-2'>CSS3</h1>
          </div>
          
          <div>
            <div className="radial-progress text-violet-600" style={js}>70%</div>
            <h1 className='text-xl font-semibold mt-2'>JAVASRIPT</h1>
          </div>

          <div>
            <div className="radial-progress text-violet-600" style={react}>80%</div>
            <h1 className='text-xl font-semibold mt-2'>REACT</h1>
          </div>

          <div>
            <div className="radial-progress text-violet-600" style={node}>65%</div>
            <h1 className='text-xl font-semibold mt-2'>NODE</h1>
          </div>
          <div>

            <div className="radial-progress text-violet-600" style={mongodb}>55%</div>
            <h1 className='text-xl font-semibold mt-2'>MONGO DB</h1>
          </div>

          <div>
            <div className="radial-progress text-violet-600" style={express}>65%</div>
            <h1 className='text-xl font-semibold mt-2'>EXPRESS</h1>
          </div>
          <div>

            <div className="radial-progress text-violet-600" style={others}>90%</div>
            <h1 className='text-xl font-semibold mt-2'>OTHERS</h1>
          </div>


        </div>


      </div>
    </div>
  );
};

export default AboutMe;