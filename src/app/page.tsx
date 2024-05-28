import Navbar from "@/components/Header/Navbar";
import Silder from "@/components/Hero/Silder";
import HomePage from "./home/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";


const Home = async () => {


  return (
    
   <main>
  <div>

  <div>
      <HomePage/>  
  </div>

  </div>
   </main>
  
  );
}


export default Home;