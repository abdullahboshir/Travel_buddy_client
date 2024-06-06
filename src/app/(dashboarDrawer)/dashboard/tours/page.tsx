import ToursManagement from "@/components/Management/ToursManagement";
import React from "react";

const ToursPage = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/trips`, {
    cache: "no-store",
  });
  const tours = await res.json();

  return <ToursManagement tours={tours}/>;
};

export default ToursPage;
