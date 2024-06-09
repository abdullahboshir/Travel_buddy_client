import { baseApi } from "@/app/api/baseApi";
import ToursManagement from "@/components/Management/ToursManagement";
import React from "react";

const ToursPage = async () => {
  const res = await fetch(`${baseApi}/api/v1/trips/adminTrip`, {
    cache: "no-store",
  });
  const tours = await res.json();

  return <ToursManagement tours={tours?.data}/>;
};

export default ToursPage;
