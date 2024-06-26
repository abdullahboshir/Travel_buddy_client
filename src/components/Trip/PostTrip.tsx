"use client";
import React, { useState } from "react";
import Input from "../FormHandler/Input";
import InputMultiSelection from "../FormHandler/InputMultiSelection";
import Swal from "sweetalert2";
import Image from "next/image";
import FileUploaderInput from "../FormHandler/FileUploaderInput";
import { baseApi } from "@/app/api/baseApi";

const PostTrip = ({ session }: any) => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [files, setFiles] = useState([]);
  const [previewImgs, setPreviewImgs] = useState([]);
  const ibbStorageKey = "52e2a715dfd6d706e4d4ce8b0cd8526f";

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const inputData: any = {};
      const formElements = e.target.elements;

      for (const element of formElements) {
        if (element.name && element.type !== "file") {
          inputData[element.name] = element.value;
        }
      }

      inputData.activities = values;

      if (files.length > 0) {
        const imgURLs: string[] = [];

        for (const file of files) {
          const formData = new FormData();
          formData.append("image", file);

          const imgRes = await fetch(
            `https://api.imgbb.com/1/upload?key=${ibbStorageKey}`,
            {
              method: "POST",
              body: formData,
            }
          );
          const imgData = await imgRes.json();
          if (imgData.success) {
            imgURLs.push(imgData.data.url);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Image upload failed!",
            });
            return;
          }
        }

        setImageURL(imgURLs);
        inputData.photos = imgURLs;
      }

      const res = await fetch(`${baseApi}/api/v1/trips/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(inputData),
      });

      const userInfo = await res.json();

      if (userInfo && userInfo.success === true) {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Trip post has been successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        setValues([]);
        setPreviewImgs([]);
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Form submission failed!",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during submission:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleImageUpload = (e: any) => {
    const imgData = e.target.files;
    if (imgData && imgData.length) {
      const allFiles = Array.from(e.target.files).slice(0, 8) as any;
      setFiles(allFiles);
      const previewFiles = allFiles.map((file: any) =>
        URL.createObjectURL(file)
      ) as [];
      setPreviewImgs(previewFiles);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={handleOnSubmit}
        className="h-full flex flex-col justify-center"
      >
        <div
          className={`right-0 rounded-2xl w-full lg:w-[1000px] lg:h-[500px] shadow-2xl bg-base-100 flex flex-col items-center justify-center text-black overflow-y-scroll mt-12 p-10 pt-${
            previewImgs.length && 52
          }`}
        >
          <div className="text-black mb-6">
            <h1 className="text-4xl font-semibold">Create a Trip</h1>
          </div>
          <div className="grid grid-cols-3 grid-flow-row gap-2 w-[100%] flex items-center justify-center">
            <div className="w-full lg:w-[100%]">
              <Input
                name="destination"
                type="text"
                label="Destination"
                width="md"
                required={true}
              />
            </div>
            <div className="w-full lg:w-[100%]">
              <Input
                name="type"
                type="text"
                label="Type"
                width="md"
                required={true}
              />
            </div>
            <div className="w-full lg:w-[100%]">
              <Input
                name="location"
                type="text"
                label="Location"
                width="md"
                required={true}
              />
            </div>
            <div className="w-full lg:w-[100%]">
              <Input
                name="itinerary"
                type="text"
                label="Itinerary"
                width="md"
                required={true}
              />
            </div>
            <div className="w-full lg:w-[100%]">
              <Input
                name="startDate"
                type="date"
                label="Start Date"
                width="md"
                required={true}
              />
            </div>
            <div className="w-full lg:w-[100%]">
              <Input
                name="endDate"
                type="date"
                label="End Date"
                width="md"
                required={true}
              />
            </div>
            <div className="w-full lg:w-[100%]">
              <Input
                name="description"
                type="text"
                label="Description"
                width="md"
                required={true}
              />
            </div>
            <div className="w-full lg:w-[100%]">
              <label className="label">
                <span className="label-text">Activities</span>
              </label>
              <InputMultiSelection values={values} setValues={setValues} />
            </div>
            <div className="w-full lg:w-[100%]">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <FileUploaderInput handleImageUpload={handleImageUpload} />
            </div>
          </div>

          {previewImgs.length > 0 && (
            <div className="flex w-full justify-center items-center gap-2 mb-3">
              {previewImgs.map((img, index) => (
                <div
                  key={index}
                  className="relative w-28 h-28 overflow-hidden rounded-lg"
                >
                  <Image
                    src={img}
                    alt={`Preview Image ${index}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="my-2">
            <button
              type="submit"
              className="btn bg-[#00D7C0] text-white font-bold text-lg hover:bg-black flex items-center"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  Processing
                  <svg
                    className="animate-spin h-5 w-5 ml-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-75"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className=""
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostTrip;
