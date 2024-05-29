import { SessionProvider, useSession } from "next-auth/react";
import HomePage from "./home/page";



const Home = async () => {


  return (
    
   <main>
  <div>
 
    <HomePage/>  
 
  </div>
   </main>

  
  );
}


export default Home;