import { signIn } from 'next-auth/react';

import { AiOutlineGoogle, AiFillGithub, AiFillFacebook, AiFillInstagram } from 'react-icons/ai';

const SocialLogin = () => {


    return (
        <div className="text-center h-24 flex items-center justify-center gap-5">
          <div>
          <AiOutlineGoogle 
                onClick={() => signIn('google', {
                    callbackUrl: 'http://localhost:3000/myProfile'
                })} 
                className='border border-2 text-4xl rounded-full p-[5px] hover:text-[#1de2a3] hover:text-[38px] ease-in duration-200' 
            />
          </div>
            <AiFillGithub 
                // onClick={() => signInWithGithub()} 
                className='border border-2 text-4xl rounded-full p-[5px] hover:text-[#1de2a3] hover:text-[38px] ease-in duration-200'  
            />
            <AiFillFacebook 
                className='border border-2 text-4xl rounded-full p-[5px] hover:text-[#1de2a3] hover:text-[38px] ease-in duration-200'  
            />
            <AiFillInstagram 
                className='border border-2 text-4xl rounded-full p-[5px] hover:text-[#1de2a3] hover:text-[38px] ease-in duration-200'  
            />
         
        </div>
    );
};

export default SocialLogin;
