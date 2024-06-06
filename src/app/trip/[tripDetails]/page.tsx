import PrivateRoute from "@/components/PrivateRoute";
import TripDetails from "@/components/Trip/TripDetails";
import React from "react";

type TParams = {
  params: {
    tripDetails: string;
  };
};

const TravelDetailsPage = async ({ params }: TParams) => {
  let tour;

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/v1/trips/getSingleTrip/${params?.tripDetails}`,
      {
        cache: "no-store",
      }
    );
    tour = await res.json();
  } catch (error: any) {
    new Error(error?.message);
  }

  return (
    <div>
      <PrivateRoute>
        <TripDetails data={tour?.data} />
      </PrivateRoute>
    </div>
  );
};

export default TravelDetailsPage;
