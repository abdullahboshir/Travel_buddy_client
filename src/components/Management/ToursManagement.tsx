'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Spinner from '../Spinner';
import { baseApi } from '@/app/api/baseApi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const ToursManagement = ({ tours }: any ) => {
  const [previewImages, setPreviewImages] = useState<any>({});
  const [seeMore, setSeeMore] = useState<any>({});

  const { data: session, status } = useSession() as any;

  useEffect(() => {
    const initialPreviewImages: any = {};
    tours.forEach((tour: any) => {
      if (tour.photos.length > 0) {
        initialPreviewImages[tour.id] = tour.photos[0];
      }
    });
    setPreviewImages(initialPreviewImages);
  }, [tours]);

  const handleDeleteTrip = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${baseApi}/api/v1/trips/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          cache: 'no-store',
        });

        const tripRes = await res.json();

        if (tripRes && tripRes.success === true) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        }
      }
    });
  };

  const setPreviewImg = (tourId: string, photo: string) => {
    setPreviewImages((prevState: any) => ({
      ...prevState,
      [tourId]: photo,
    }));
  };

  const toggleSeeMore = (tourId: any) => {
    setSeeMore((prevState: any) => ({
      ...prevState,
      [tourId]: !prevState[tourId],
    }));
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <div className="text-gray-950 overflow-hidden h-screen w-full p-4 bg-gray-100 ">
     <div className='overflow-y-scroll h-screen w-full pb-16'>
     <div className="grid grid-cols-4 bg-teal-500  text-white py-4 px-4 rounded-t-lg shadow-md mb-3 shadow-lg">
        <div className="font-semibold">Destination</div>
        <div className="font-semibold">Trip Owner</div>
        <div className="font-semibold">Trip Date</div>
        <div className="font-semibold">Action</div>
      </div>

      {tours.map((tour: any) => (
        <div key={tour.id} className="bg-white py-3 px-4 pr-9 mb-3 rounded-lg shadow-lg flex flex-col justify-center">
          <div className="grid grid-cols-4 items-center gap-4">
            <div>{tour?.destination}</div>
            <div>{tour?.user?.email}</div>
            <div>{new Date(tour?.startDate).toLocaleDateString()}</div>
       
            <div className="flex gap-5">
              <Link href={`/trip/${tour.id}`} className="px-3 py-2 rounded-lg text-white bg-teal-500 hover:bg-teal-600 transition duration-150">
                View
              </Link>
              <Link href={`/dashboard/tours/update-trip/${tour.id}`} className="px-3 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-150">
                Edit
              </Link>
              <button
                onClick={() => handleDeleteTrip(tour.id)}
                className="px-3 py-2 rounded-lg text-white bg-red-400 hover:bg-red-600 transition duration-150"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="">
            <button
              onClick={() => toggleSeeMore(tour.id)}
              className="text-sm text-blue-500 hover:underline"
            >
              {seeMore[tour.id] ?<span>Hide Images <IoIosArrowUp className='inline-block' /></span> : <span>Show Images <IoIosArrowDown className='inline-block' /></span>}
            </button>
            {seeMore[tour.id] && (
              <div>
                <div className="flex gap-1 overflow-x-auto">
                  {tour?.photos.map((photo: any, index: number) => (
                    <div
                      onClick={() => setPreviewImg(tour.id, photo)}
                      key={index}
                      className="w-52 h-52 relative cursor-pointer"
                    >
                      <Image layout="fill" objectFit="cover" className="rounded-lg" src={photo} alt="Tour Thumbnail" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
     </div>
    </div>
  );
};

export default ToursManagement;
