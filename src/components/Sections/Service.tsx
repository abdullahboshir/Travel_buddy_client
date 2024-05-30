import React from "react";
import Card from "../Cards/Card";
import bgImg from "../../assets/pexels-pixabay-207896.jpg";
import Image from "next/image";

const Service = () => {
  const typeOfTours = [
    {
      id: 1,
      name: "SUMMER TOURS",
      img: "https://i.ibb.co/6Nc8tZr/summer.png",
      description:
        "Take advantage of the just-right weather and discover a summer tour that lets you soak in the sun. Ready for some warm-weather exploring? Break out the SPF—and let us be part of your next summer trip.",
    },
    {
      id: 2,
      name: "FAMILY TOURS",
      img: "https://i.ibb.co/714fYbz/family.png",
      description:
        "There's no trip like a family trip. When your family joins one of our group tours, you'll enter a new world of unforgettable educational experiences together.",
    },
    {
      id: 3,
      name: "WINTER TOURS",
      img: "https://i.ibb.co/qR5xJfp/winter.png",
      description:
        "There’s something magical about winter getaways to new places—especially during the holiday season. See the Northern Lights in Iceland or the lit-up cobblestone streets in the Netherlands, and so much more when you travel on our trips during the winter.",
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full h-[290px] bg-cover bg-center z-20 bg-base-100 shadow-xl image-full rounded-none">
        <figure className="w-full h-full">
          <Image
            src={bgImg}
            alt="tour image"
            layout="fill"
            className="object-cover rounded-none"
          />
        </figure>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        <div className="absolute inset-0 text-white z-10">
          <div className="flex justify-evenly -mt-5 px-24">
            {typeOfTours.map((tour) => (
              <div key={tour.id}>
                <Card tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
