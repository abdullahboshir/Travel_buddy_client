"use client"
import React, { useState } from 'react';
import Input from '../FormHandler/Input';
import InputMultiSelection from '../FormHandler/InputMultiSelection';

const PostTrip = ({session}) => {
    const [values, setValues] = useState([]) as any;

    console.log('sessionnnnnnnnnnnn', session.user)

    const handleOnSubmit = async (e: any) => {
        try {
          e.preventDefault();
          const formData: any ={};
         const formElements = e.target.elements;
      
         for(const element of formElements){
         if(element.name){
          formData[element.name] = element.value
         }
          };

         formData.activities = values;
         
         const res = await fetch('http://localhost:5000/api/v1/trips/create', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2ZDE5NjRhLTY2MDYtNDA5Ny04OGI2LTdiNzE2YmFlNzFlNCIsInJvbGUiOiJBRE1JTiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE3MTY5MTYwNTUsImV4cCI6MTcxOTUwODA1NX0.5ER8bYVaPRZYVla4Ye8Ta3hN1yDJKNtJ8mPcK1N8Oig`
                },
                body: JSON.stringify(formData),
                cache: 'no-store'
            });
            
            const userInfo = await res.json();
            console.log('got dataaaaaaaaaaaa', userInfo)
        
        } catch (error: any) {
          throw new Error(error.message)
        }
      
      };

    
      


    return (
        <div className='flex justify-center items-center h-screen bg-gray-200'>

            <form onSubmit={handleOnSubmit} className="h-full flex flex-col justify-center">
             <div className="right-0 rounded-2xl w-full lg:w-[1000px] lg:h-[500px] shadow-2xl bg-base-100 flex flex-col items-center justify-center text-black overflow-y-scroll mt-12 p-10">

                <div className='text-black mb-6'>
                <h1 className='text-4xl font-semibold'>Create a Trip</h1>
                </div>
                      <div className='grid grid-cols-3 grid-flow-row gap-2 w-[100%] flex items-center justify-center'>
               

       <div className='w-full lg:w-[100%]'>
       <Input
          name="destination"
          type="text"
          label="Destination"
        />
       </div>


        <div className='w-full lg:w-[100%]'>
        <Input
          name="type"
          type="text"
          label="Type"
          />
          </div> 
        <div className='w-full lg:w-[100%]'>
        <Input
          name="location"
          type="text"
          label="Location"
          />
          </div> 
        <div className='w-full lg:w-[100%]'>
        <Input
          name="itinerary"
          type="text"
          label="Itinerary"
          />
          </div> 
        <div className='w-full lg:w-[100%]'>
        <Input
          name="startDate"
          type="date"
          label="Start Date"
          />
          </div> 
        <div className='w-full lg:w-[100%]'>
        <Input
          name="endDate"
          type="date"
          label="End Date"
          />
          </div> 

          <div className='w-full lg:w-[100%]'>
        <Input
          name="description"
          type="text"
          label="Description"
        />
        </div>
        

        <div className="w-full lg:w-[100%]">
        <label className='label'>
                     <span className="label-text">Activities</span>
                     </label>
      <InputMultiSelection values={values} setValues={setValues} />
        </div>

    </div>

    <div className="my-2">
    <button type='submit' className="btn bg-[#00D7C0] text-white font-bold text-lg hover:bg-black">Login</button>
</div>
</div>
</form>
                       
    </div>
    );
};

export default PostTrip;