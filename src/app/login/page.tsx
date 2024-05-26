"use client";
import loginImg from '../../assets/pexels-pawan-yadav-2577274.jpg';
import icon from '../../assets/icons/313418393_513873044086941_9155546839920974588_n.png';
import Image from 'next/image';
import SocialLogin from './SocialLogin';
import Input from '@/components/FormHandler/Input';
import { FormEventHandler } from 'react';

const Login = () => {

const handleOnSubmit = async (e: any) => {
  try {
    e.preventDefault();
    const formData: any ={};
   const formElements = e.target.elements;

   for(const element of formElements){
   if(element.name){
    formData[element.name] = element.value
   }
    };

    const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const tours = await res.json();

    
    console.log('valueeeeeeeeeeeeee', tours)
  } catch (error: any) {
    throw new Error(error.message)
  }

};

    return (
        <div>
            <div className="hero min-h-screen bg-base-200 flex items-center justify-center shadow-2xl">
                <div className="relative flex items-center justify-center lg:flex-row-reverse w-[950px] max-w-6xl h-auto rounded-2xl">

                  
                    <div className="absolute right-0 z-10 rounded-2xl w-full lg:w-[480px] h-96 shadow-2xl bg-base-100 p-10">
                        <form onSubmit={handleOnSubmit} className="h-full flex flex-col justify-center">

                            <Input name='email' type='email' label='Email'/>
                            <Input name='password' type='password' label='Password'/>
                            {/* <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div> */}

                            {/* <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div> */}
                            <div className="form-control mt-6">
                                <button type='submit' className="btn bg-[#02bb96]">Login</button>
                            </div>
                        </form>
                    </div>

                  
                    <div className="w-full lg:w-[55%] absolute left-0 text-center lg:text-left shadow-2xl">
                        <Image src={loginImg} objectFit='cover' width={500} height={500} alt='tour picture' className='w-[700px] h-96 rounded-l-2xl object-cover' />

                        <div className="absolute top-0 left-0 bg-blue-950 rounded-l-2xl bg-opacity-60 w-full h-96">

                        <div className="text-white flex flex-col top-0">
                            <div className='ml-2 w-[100px]'>
                            <Image src={icon} objectFit='cover' width={500} height={500} alt='tour picture' className='w-[120px] rounded-l-2xl object-cover' />
                            </div>

                            <div className='flex flex-col justiy-center items-center '>
                            <span className='text-lg text-semibold'> Welcome to </span>
                                <h2 className="text-4xl font-bold">Travel Buddy</h2>
                                <p className="font-semibold text-center w-[200px]">Plan your perfect trip with us. and Enjoy your life.</p>
                                
                                {/* <h2 className="text-4xl font-bold">Login</h2> */}
                            </div>

                            <div className='absolute bottom-0 left-36'>
                                <SocialLogin/>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
