'use client';

import { travelRequestApi } from '@/utils/travelRequestApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const TripRequest = ({ tripId, profileInfo, accessToken }: any) => {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const userProfile = profileInfo.data.userProfile[0];

    const router = useRouter();

    const handleTravelRequest = async () => {
        try {
            const formData = {
                tripId,
                userId: profileInfo?.data?.id,
                accessToken
            };

            const tripRequestRes = await travelRequestApi(formData);
            console.log('travel request sent', tripRequestRes);

            if (tripRequestRes && tripRequestRes.success === true) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Travel request has been successfully sent",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    router.push('/');
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Form submission failed!",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    return (
        <div className="h-screen bg-white w-full flex justify-center items-center pt-28">
            <div>
                <div className="bg-gray-700 h-auto w-[600px] rounded-lg p-5 flex">
                    <div className="w-[200px] h-[200px] relative rounded-lg bg-gray-200">
                        <Image
                            src={userProfile.profilePhoto}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                            alt="profile avatar"
                        />
                    </div>

                    <div className="ml-5 flex-1">
                        <div className="pt-10">
                            <div className="flex items-center mb-4">
                                <span className="mr-2 font-bold">Phone:</span>
                                <span>{userProfile.contactNumber}</span>
                            </div>

                            <div className="flex items-start">
                                <span className="mr-2 font-bold">Address:</span>
                                <span className="break-words">{userProfile.address}</span>
                            </div>
                        </div>

                        <div className="flex justify-between w-full mt-10 pb-5">
                            <div className="flex justify-center items-center">
                                Terms and Condition
                                <input 
                                    type="checkbox" 
                                    checked={isCheckboxChecked} 
                                    onChange={(e) => setIsCheckboxChecked(e.target.checked)} 
                                    className={`checkbox ${isCheckboxChecked ? 'checkbox-accent' : 'checkbox-error'} ml-2`} 
                                />
                            </div>

                            <div>
                                <button 
                                    onClick={handleTravelRequest} 
                                    disabled={!isCheckboxChecked} 
                                    className={`mr-5 py-1 px-2 rounded-lg transition ease-in duration-100 ${isCheckboxChecked ? 'bg-[#00c2ab] hover:bg-[#083344] hover:font-bold hover:text-[16px]' : 'bg-gray-400 cursor-not-allowed'}`}
                                >
                                    Send Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripRequest;
