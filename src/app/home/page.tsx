'use client'
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import { baseApi } from "../api/baseApi";

const HomePage = () => {
  const [initialTours, setInitialTours] = useState([]);

  useEffect(() => {
    const fetchInitialTours = async () => {
      try {
        const res = await fetch(`${baseApi}/api/v1/trips`, {
          cache: "no-store",
        });
        const data = await res.json();
        setInitialTours(data);
      } catch (error) {
        console.error("Error fetching initial tours:", error);
      }
    };

    fetchInitialTours();
  }, []);

  return (
    <div>
      <Container initialTours={initialTours} />
    </div>
  );
};

export default HomePage;
