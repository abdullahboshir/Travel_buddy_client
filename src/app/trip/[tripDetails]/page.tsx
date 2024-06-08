import { baseApi } from "@/app/api/baseApi";
import PrivateRoute from "@/components/PrivateRoute";
import TripDetails from "@/components/Trip/TripDetails";
import { authOptions } from "@/utils/authOptions";
import { userProfileApi } from "@/utils/getUserProfile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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
      `${baseApi}/api/v1/trips/getSingleTrip/${params?.tripDetails}`,
      {
        cache: "no-store",
      }
    );
    tour = await res.json();
  } catch (error: any) {
    new Error(error?.message);
  };


  const session = (await getServerSession(authOptions)) as any;

  if (!session) {
    redirect("/login");
    return null;
  }

  const accessToken = session.user.accessToken;

  if (!accessToken) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1>Access token not found</h1>
      </div>
    );
  };
  



  const getUserProfile = await userProfileApi(accessToken)

  const userProfile = getUserProfile.data.userProfile[0];

let isNeedProfileEdit;
  if (
    !userProfile ||
    !userProfile.contactNumber ||
    !userProfile.address
  ) {
    isNeedProfileEdit = true;
  };


  return (
    <div>
      <PrivateRoute>
        <TripDetails data={tour?.data} isNeedProfileEdit={isNeedProfileEdit}/>
      </PrivateRoute>
    </div>
  );
};

export default TravelDetailsPage;
