import React, { useState } from 'react';

type TProps = {
    values: any;
    setValues: any;
}

const InputMultiSelection = ({values, setValues}: TProps) => {
    const [inputValue, setInputValue] = useState('') as any;

    const handleAddValue = () => {
        if (inputValue.trim() && !values.includes(inputValue.trim())) {
            setValues([...values, inputValue]);
        setInputValue('');
      }
    };

  
    const handleInputKeyPress = (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddValue();
      }
    };

    return (
        <div className='mb-4'>
        <div className="border border-gray-300 p-2 rounded-lg flex flex-wrap items-center bg-white">
        {values.map((value: string, index: number) => (
          <div key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 flex items-center mr-2 mb-2">
            {value}
            <button
              type="button"
              className="ml-2 text-white hover:text-gray-300"
              onClick={() => setValues(values.filter((v: string) => v !== value))}
            >
              &times;
            </button>
          </div>
        ))}

        <input
          type="text"
          className="flex-grow bg-transparent outline-none border-none focus:ring-0 p-1"
          placeholder="Add activities..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />

        <button
          type="button"
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleAddValue}
        >
          Add
        </button>

      </div>
        </div>
    );
};

export default InputMultiSelection;