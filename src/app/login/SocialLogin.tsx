import { AiOutlineGoogle, AiFillGithub, AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
// import { signInWithGoogle, signInWithGithub } from './auth'; // Adjust the import paths as necessary

const SocialLogin = () => {
    return (
        <div className="text-center h-24 flex items-center justify-center gap-5">
          <div>
          <AiOutlineGoogle 
                // onClick={() => signInWithGoogle()} 
                className='w-9 h-9 p-1 text-white mb-2 cursor-pointer hover:text-black hover:bg-white hover:rounded-full transition duration-500 border border-2 rounded-full' 
            />
          </div>
            <AiFillGithub 
                // onClick={() => signInWithGithub()} 
                className='w-9 h-9 p-1 text-white mb-2 cursor-pointer hover:text-black hover:bg-white hover:rounded-full transition duration-500 border border-2 rounded-full'  
            />
            <AiFillFacebook 
                className='w-9 h-9 p-1 text-white mb-2 cursor-pointer hover:text-black hover:bg-white hover:rounded-full transition duration-500 border border-2 rounded-full'  
            />
            <AiFillInstagram 
                className='w-9 h-9 p-1 text-white mb-2 cursor-pointer hover:text-black hover:bg-white hover:rounded-full transition duration-500 border border-2 rounded-full'  
            />
         
        </div>
    );
};

export default SocialLogin;
