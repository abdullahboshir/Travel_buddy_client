import TripRequest from "@/components/Trip/TripRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { notFound, redirect } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import { baseApi } from "@/app/api/baseApi";

const TripRequestPage = async ({ params }: any) => {
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
  }

  let userProfile;
  let userInfo;
  try {
    const res = await fetch(`${baseApi}/api/v1/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch user profile", res.statusText);
      return notFound();
    }

    userInfo = await res.json();
    userProfile = userInfo.data.userProfile[0];
    console.error("Fetched user profile:", userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1>Failed to load user profile</h1>
      </div>
    );
  }

  if (
    !userProfile ||
    !userProfile.contactNumber ||
    !userProfile.address
  ) {
    redirect("/myProfile");
    return null;
  }

  return (
    <div>
      <PrivateRoute>
        <TripRequest
          tripId={params.tripDetails}
          profileInfo={userInfo}
          accessToken={accessToken}
        />
      </PrivateRoute>
    </div>
  );
};

export default TripRequestPage;
