"use client";
import loginImg from '../../assets/pexels-pawan-yadav-2577274.jpg';
import icon from '../../assets/icons/313418393_513873044086941_9155546839920974588_n.png';
import Image from 'next/image';
import SocialLogin from './SocialLogin';
import Input from '@/components/FormHandler/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Spinner from '../Spinner';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [passError, setPassError] = useState('');
    const router = useRouter()
    const params = useSearchParams();
    const callbackUrl = params.get('callbackUrl') || '/' as string;
    const { data: session, status } = useSession();


   
  
const handleLoginOnSubmit = async (e: any) => {
    try {
        e.preventDefault();
        const formData: any ={};
        const formElements = e.target.elements;
        
        if(formElements){
            for(const element of formElements){
                if(element.name){
                    formData[element.name] = element.value
                }
            };
        };


   
        const result = await signIn('credentials', {...formData, callbackUrl});
        console.log('resulttttttttttttttttttt', result)

if (result?.ok === true && result?.status === 200) {
    // router.push(callbackUrl);
  } else {
    console.error(result?.error);
  }

  } catch (error: any) {
    console.log('errorrrrrrrrrrrrrr', error.message)
    throw new Error(error?.message)
  }
};




const handleSignupOnSubmit = async (e: any) => {
    try {
        e.preventDefault();

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            setPassError("password does not match");
            return;
        } 
        setPassError("");

       const formData = {
        username,
        email,
        password
       };

          const res = await fetch("http://localhost:5000/api/v1/traveler/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            cache: 'no-store'
          }
        );
      
          const userInfo = await res.json();
      
          if (userInfo && userInfo.success === true) {
            setIsLogin(true)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Sign up has been Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            e.target.reset();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Form submission failed!",
            });
          }

  } catch (error: any) {
    throw new Error(error.message)
  }
};




if (status === "loading") {
    return <Spinner/>;
  }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200 flex items-center justify-center shadow-2xl">
                <div className={`relative flex items-center justify-center lg:flex-row-reverse w-[950px] ${!isLogin && 'h-[700px]'} max-w-6xl h-auto rounded-2xl mt-16`}>

                  
                    <div className="absolute right-0 z-10 rounded-2xl w-full lg:w-[480px] shadow-2xl bg-base-100 p-8 my-52">
                        <form onSubmit={isLogin? handleLoginOnSubmit: handleSignupOnSubmit} className="h-full flex flex-col justify-center">

                            {
                                !isLogin && <Input name='username' type='text' label='Username' width='md' required={true}/> 
                            }
                            <Input name='email' type='email' label='Email' width='md' required={true}/>
                            <Input name='password' type='password' label='Password'  width='md' required={true}/>
                            {
                                !isLogin && 
                                <Input name='confirmPassword' type='password' label='Cofirm Password' width='md' required={true}/>
                            }

                        <div className='text-black hover:underline'>
                        { isLogin ?
                         <Link href='/' >Forgot Password?</Link>
                         :
                       passError && <div>
                            <p className='text-red-400'>{passError}</p>
                        </div>
                         }
                         </div>
                         
                            <div className="form-control mt-6">
                                <button type='submit' className="btn bg-[#00D7C0] text-white font-bold text-lg hover:bg-black">{isLogin? 'Login' : 'Sign Up'}</button>
                            </div>
                        </form>
                        <div className='text-black mt-1'>
                                {
                                    
                                    isLogin?  <button onClick={() => setIsLogin(false)} className='hover:underline'>Create a new account</button> 
                                    :
                                    <button onClick={() => setIsLogin(true)} className='hover:underline'>Already have an account?</button>
                                }
                            </div>
                    </div>

                  
                    <div className="w-full lg:w-[55%] absolute left-0 text-center lg:text-left shadow-2xl">
                        <Image src={loginImg} objectFit='cover'  width={500} height={500} alt='tour picture' className='w-[700px] h-96 rounded-l-2xl object-cover' />

                        <div className="absolute top-0 left-0 bg-blue-950 rounded-l-2xl bg-opacity-60 w-full h-96">

                        <div className="text-white flex flex-col top-0">
                            <div className='ml-2 w-[100px]'>
                            <Image src={icon} objectFit='cover' width={500} height={500} alt='tour picture' className='w-[120px] rounded-l-2xl object-cover' />
                            </div>

                            <div className='flex flex-col justiy-center items-center '>
                            <span className='text-lg text-semibold'> Welcome to </span>
                                <h2 className="text-4xl font-bold">Travel Buddy</h2>
                                <p className="font-semibold text-center w-[200px]">Plan your perfect trip with us. and Enjoy your life.</p>
                                
                             
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

export default LoginForm;
