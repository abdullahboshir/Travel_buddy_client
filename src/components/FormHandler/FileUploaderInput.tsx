import React, { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';



const FileUploaderInput = ({handleImageUpload}: any) => {
 

    return (
        <label className='label border border-1 rounded-lg mb-4'>
        <span className="label-text text-lg ml-2 text-gray-400">Upload a Images</span>
        <MdOutlineFileUpload className="w-8 h-8" />
        <input  onChange={handleImageUpload} type="file" multiple name="photos" className="hidden" />
    </label>

    );
  };

export default FileUploaderInput;