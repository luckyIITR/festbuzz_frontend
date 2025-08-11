'use client';
import React, { useState } from 'react';

type InputField = {
  input1: string;
};

const Page = () => {
  const [Inputfield, setInputfield] = useState<InputField[]>([
    { input1: '' }
  ]);

  const handlesubmit = () => {
    setInputfield([...Inputfield, { input1: '' }]);
  };

  const handledit = (index: number, field: keyof InputField, value: string) => {
    const updatedFields = [...Inputfield];
    updatedFields[index][field] = value;
    setInputfield(updatedFields);
  };

  const deletebtn = (index: number) => {
    const updatedFields = [...Inputfield];
    updatedFields.splice(index, 1);
    setInputfield(updatedFields);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 py-6">
      <form className="w-full max-w-full flex flex-col gap-6">
        <label className="block font-urbanist font-[600] text-[16px] text-[#818181]">
          Create Form for extra information you require from participant
        </label>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <label className="block font-urbanist font-[600] text-[18px] sm:text-[20px]">
            Enter question here
          </label>
          <button
            type="button"
            className="rounded-full px-5 py-2 bg-[#252525] text-[#E6FF4C] text-lg sm:text-xl shadow-md hover:bg-[#2f2f2f] transition-all w-full sm:w-auto"
            onClick={handlesubmit}
          >
            + Add Question
          </button>
        </div>

        <div className="min-h-80 flex flex-col gap-4">
          {Inputfield.map((pair, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center"
            >
              <textarea
                placeholder="Write here"
                value={pair.input1}
                onChange={(e) => handledit(index, 'input1', e.target.value)}
                className="w-full bg-[#252525] rounded-lg px-4 py-3 min-h-[60px] sm:min-h-[48px] font-urbanist font-[600] text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]"
              />
              <button
                type="button"
                onClick={() => deletebtn(index)}
                className="text-red-500 text-xl font-bold hover:text-red-600 bg-[#252525] px-4 py-2 rounded-full self-end sm:self-auto"
                title="Remove row"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Page;
