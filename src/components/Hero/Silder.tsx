'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Silder = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

const image1 = "https://i.ibb.co/p3wcJgd/slider-img1.jpg";
const image3 =  "https://i.ibb.co/4mXGyxR/slider-img3.jpg"
const image2 = "https://i.ibb.co/mDv7R3d/slider-img2.jpg"

    const slidesImg = [image1, image3, image2];
    const slidesContent = [
        {
            slide: 1,
            title: "IT'S TIME FOR A NEW JOURNEY",
            description: "Enjoy the journey and try to get better every day. And don't lose the passion and the love for what you do.",
            img: image1
        },
        {
            slide: 3,
            title: "PLEASURE TO TRAVEL WITH FAMILY",
            description: "Build traditions of family vacations and trips and outings. These memories will never be forgotten by your children.",
           img: image3
        },
        {
            slide: 2,
            title:   "THE PLACE FOR YOUR ENJOYMENT",
           description: "The journey of a thousand miles begins with a single step.",
          img: image2
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === slidesImg.length - 1 ? 0 : prevSlide + 1));
        }, 10000);

        return () => clearInterval(interval);
    }, [slidesImg.length]);

    const handlePrevClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slidesImg.length - 1 : prevSlide - 1));
    };

    const handleNextClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slidesImg.length - 1 ? 0 : prevSlide + 1));
    };

    return (
        <div className="w-full overflow-hidden relative">
            <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slidesContent.map((slide, index) => (
                    <div key={index} className="min-w-full relative">
                        <Image src={slide.img} alt={`Slide ${index + 1}`} layout="responsive" width={1000} height={100} className="w-full" />
                        <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <button onClick={handlePrevClick} className="btn bg-transparent text-white border-0 hover:bg-transparent text-2xl"> ❮ </button>

                            <div className='relative mr-[400px]'>
                                <div className='w-[420px] h-[230px] bg-[#10d4b797] flex flex-col justify-center items-center py-3 bg-opacity-80'></div>
                                <div className='bg-[#d419707b] w-[420px] h-[230px] flex flex-col justify-center items-center py-3 left-5 top-5 absolute bg-opacity-80'>
                                    <h2 className='text-4xl text-center mb-2'>{slide.title}</h2>
                                    <p className='w-[75%] text-center mb-5'>{slide.description}</p>
                                    <Link href='trip/create-trip' className='btn btn-sm bg-[#00c2ab] border-none text-white font-semibold hover:text-black hover:text-white hover:bg-gray-950 hover:border-0 hover:text-[15px] hover:font-bold ease-in duration-100'>SHARE YOUR TRIP</Link>
                                </div>
                            </div>

                            <button onClick={handleNextClick} className="btn bg-transparent text-white border-0 hover:bg-transparent text-2xl"> ❯ </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Silder;










// 'use client'
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import slidesContent  from '../../assets/dummyData/carouselContent.json';

// const Slider = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide(prevSlide => (prevSlide === slidesContent.length - 1 ? 0 : prevSlide + 1));
//         }, 10000);

//         return () => clearInterval(interval);
//     }, [slidesContent.length]);

//     const handlePrevClick = () => {
//         setCurrentSlide(prevSlide => (prevSlide === 0 ? slidesContent.length - 1 : prevSlide - 1));
//     };

//     const handleNextClick = () => {
//         setCurrentSlide(prevSlide => (prevSlide === slidesContent.length - 1 ? 0 : prevSlide + 1));
//     };

//     return (
//         <div className="w-full overflow-hidden relative">
//             <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//                 {slidesContent.map((slide, index) => (
//                     <div key={index} className="min-w-full relative">
//                         <Image src={slide.img} alt={`Slide ${index + 1}`} layout="responsive" width={500} height={500} className="w-full" />
//                         <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
//                             <button onClick={handlePrevClick} className="btn bg-transparent text-white border-0 hover:bg-transparent text-2xl"> ❮ </button>

//                             <div className='relative mr-[400px]'>
//                                 <div className='w-[420px] h-[230px] bg-[#10d4b797] flex flex-col justify-center items-center py-3 bg-opacity-80'></div>
//                                 <div className='bg-[#d419707b] w-[420px] h-[230px] flex flex-col justify-center items-center py-3 left-5 top-5 absolute bg-opacity-80'>
//                                     <h2 className='text-4xl text-center mb-2'>{slide.title}</h2>
//                                     <p className='w-[75%] text-center mb-5'>{slide.description}</p>
//                                     <Link href='trip/create-trip' className='btn btn-sm bg-[#00c2ab] border-none text-white font-semibold hover:bg-gray-950 hover:text-white hover:border-0 hover:text-[15px] hover:font-bold ease-in duration-100'>SHARE YOUR TRIP</Link>
//                                 </div>
//                             </div>

//                             <button onClick={handleNextClick} className="btn bg-transparent text-white border-0 hover:bg-transparent text-2xl"> ❯ </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Slider;
