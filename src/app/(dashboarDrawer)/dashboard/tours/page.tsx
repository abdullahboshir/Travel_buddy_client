import ToursManagement from "@/components/Management/ToursManagement";
import React from "react";

const ToursPage = async () => {
  const res = await fetch("http://localhost:5000/api/v1/trips", {
    cache: "no-store",
  });
  const tours = await res.json();

  return <ToursManagement tours={tours}/>;
};

export default ToursPage;
