import TourCard from "@/components/Cards/TourCard";
import Footer from "@/components/Footer";
import Silder from "@/components/Hero/Silder";
import Service from "@/components/Sections/Service";
import TopTours from "@/components/Sections/TopTours";
import TourOffer from "@/components/Sections/TourOffer";
import ViewTours from "@/components/Sections/ViewTours";

const HomePage = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/trips`, {
    cache: "no-store",
  });
  const tours = await res.json();

  return (
    <div>
      <div className="relative h-full">
        <div className="absolute left-0 top-0 z-10">
          <div>
            <Silder />
          </div>

          <div>
            <Service />
            <TourCard tours={tours} />
            <TopTours tours={tours} />
            <TourOffer />
            <ViewTours />

            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
