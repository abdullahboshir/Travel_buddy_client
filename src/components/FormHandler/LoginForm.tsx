'use client'
import Image from "next/image";
import SocialLogin from "./SocialLogin";
import Input from "@/components/FormHandler/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Spinner from "../Spinner";
import Swal from "sweetalert2";
import { baseApi } from "@/app/api/baseApi";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passError, setPassError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<any>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setParams(params);
    }
  }, []);

  const callbackUrl = params?.get("callbackUrl") || "/";

  const handleLoginOnSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData: any = {};
      const formElements = e.target.elements;

      if (formElements) {
        for (const element of formElements) {
          if (element.name) {
            formData[element.name] = element.value;
          }
        }
      }

      const result = await signIn("credentials", { ...formData, callbackUrl, redirect: false });

      setLoading(false);

      if (result?.ok === true && result?.status === 200) {
        router.push(callbackUrl);
      } else if (result?.ok === false) {
        setLoginError(result?.error || '');
      } else {
        console.error(result?.error);
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  const handleSignupOnSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const username = e.target.username.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;
      
      if (password !== confirmPassword) {
        setPassError("Password does not match");
        setLoading(false);
        return;
      }
      setPassError("");

      const formData = {
        username,
        email,
        password,
      };

      const res = await fetch(`${baseApi}/api/v1/traveler/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      const userInfo = await res.json();

      if (userInfo && userInfo.success === true) {
        setIsLogin(true);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign up has been Successful",
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
      throw new Error(error.message);
    }
  };

  if (status === "loading") {
    return <Spinner />;
  }


  return (
    <div>
      <div className="hero min-h-screen bg-base-200 flex items-center justify-center shadow-2xl">
        <div
          className={`relative flex items-center justify-center lg:flex-row-reverse w-[950px] ${
            !isLogin && "h-[700px]"
          } max-w-6xl h-auto rounded-2xl mt-16`}
        >
          <div className="absolute right-0 z-10 rounded-2xl w-full lg:w-[480px] shadow-2xl bg-base-100 p-8 my-52">
            <form
              onSubmit={isLogin ? handleLoginOnSubmit : handleSignupOnSubmit}
              className="h-full flex flex-col justify-center"
            >
              {!isLogin && (
                <Input
                  name="username"
                  type="text"
                  label="Username"
                  width={!isLogin && "sm"}
                  required={true}
                />
              )}
              <Input
                name="email"
                type="email"
                label="Email"
                width={!isLogin && "sm"}
                required={true}
              />
              <Input
                name="password"
                type="password"
                label="Password"
                width={!isLogin && "sm"}
                required={true}
              />
              {!isLogin && (
                <Input
                  name="confirmPassword"
                  type="password"
                  label="Cofirm Password"
                  width={!isLogin && "sm"}
                  required={true}
                />
              )}

              <div className="text-black">
                {isLogin ? (
                  <span>
                  <span className="hover:underline"><Link href="/">Forgot Password?</Link></span>
                  {loginError && <p className="text-red-400">{loginError}</p>}
                  </span>
                ) : (
                  passError && (
                    <div>
                      <p className="text-red-400">{passError}</p>
                    </div>
                  )
                )}
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn ${!isLogin && 'btn-sm'} bg-[#00D7C0] text-white font-bold text-lg hover:bg-black`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      Processing
                      <svg
                        className="animate-spin h-5 w-5 ml-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-75"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className=""
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    </span>
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>
            <div className="text-black mt-1">
              {isLogin ? (
                <button
                  onClick={() => setIsLogin(false)}
                  className="hover:underline"
                >
                  Create a new account
                </button>
              ) : (
                <button
                  onClick={() => setIsLogin(true)}
                  className="hover:underline"
                >
                  Already have an account?
                </button>
              )}
            </div>
          </div>

          <div className="w-full lg:w-[55%] absolute left-0 text-center lg:text-left shadow-2xl">
            <Image
              src='https://i.ibb.co/CvgM1JR/pexels-pawan-yadav-2577274.jpg'
              objectFit="cover"
              width={500}
              height={500}
              alt="tour picture"
              className="w-[700px] h-96 rounded-l-2xl object-cover"
            />

            <div className="absolute top-0 left-0 bg-blue-950 rounded-l-2xl bg-opacity-60 w-full h-96">
              <div className="text-white flex flex-col top-0">
                <div className="ml-5 mt-5 w-[130px] pb-[75px]">
                  <Image
                    src='https://i.ibb.co/48bxVzk/wayfarer-logo-Photoroom.png'
                    objectFit="cover"
                    width={500}
                    height={500}
                    alt="tour picture"
                    className="w-[120px] rounded-l-2xl object-cover"
                  />
                </div>

                <div className="flex flex-col justiy-center items-center mr-2">
                  <span className="text-lg text-semibold"> Welcome to </span>
                  <h2 className="text-4xl font-bold">Travel Buddy</h2>
                  <p className="font-semibold text-center w-[200px]">
                    Plan your perfect trip with us. and Enjoy your life.
                  </p>
                </div>

                <div className="absolute bottom-0 left-36">
                  <SocialLogin />
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
