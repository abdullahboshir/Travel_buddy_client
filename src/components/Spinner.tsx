// src/components/Loading.js
import React, { useEffect, useState } from "react";

const Spinner = () => {

    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);




  const keyframes = `
    @keyframes move {
      0% { left: 0%; opacity: 0; }
      35% { left: 41%; transform: rotate(0deg); opacity: 1; }
      65% { left: 59%; transform: rotate(0deg); opacity: 1; }
      100% { left: 100%; transform: rotate(-180deg); opacity: 0; }
    }
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="absolute w-[600px] h-9 left-1/2 top-2/5 transform -translate-x-1/2 overflow-visible select-none cursor-default">
      <style>{keyframes}</style>
      {["G", "N", "I", "D", "A", "O", "L"].map((char, index) => (
        <div
          key={index}
          className="absolute w-5 h-9 opacity-0 text-[#00D7C0] font-semibold text-2xl"
          style={{
            animation: `move 2s linear infinite`,
            animationDelay: `${index * 0.2}s`,
          }}
        >
          {char}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Spinner;
