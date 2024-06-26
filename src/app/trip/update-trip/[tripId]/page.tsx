import PrivateRoute from "@/components/PrivateRoute";
import UpdateTrip from "@/components/Trip/UpdateTrip";
import React from "react";

const updateTripPage = async ({ params }: any) => {
  return (
    <div className="pt-10 bg-gray-200">
      <PrivateRoute>
        <UpdateTrip tripId={params?.tripId} />
      </PrivateRoute>
    </div>
  );
};

export default updateTripPage;
