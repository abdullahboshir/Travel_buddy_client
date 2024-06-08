import Container from "@/components/Container";
import { baseApi } from "../api/baseApi";


const HomePage = async () => {


  const res = await fetch(`${baseApi}/api/v1/trips`, {
    cache: "no-store",
  });
  const tours = await res.json();

  return (
    <div>
       <Container tours={tours}/>
        </div>
  );
};

export default HomePage;
