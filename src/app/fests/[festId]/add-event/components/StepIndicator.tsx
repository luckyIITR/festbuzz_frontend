'use client';
import React from 'react';

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  addOns: Step[];
}

export default function StepIndicator({ steps, currentStep, addOns }: StepIndicatorProps) {
  return (
    <aside className="w-72 p-4 rounded-b-3xl ml-4 bg-[#181818] flex flex-col gap-8 shadow-lg min-h-[80vh]">
      <div>
        <button className="flex items-center content-center flex-wrap gap-2 w-full text-left text-white font-semibold mb-4 bg-[#313131] rounded-xl px-3 h-10">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[white]">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className='font-urbanist font-[700] text-[17px] pt-[1px]'>Add Event Details</span>
        </button>
        <ul className="ml-8 flex flex-col gap-3 mt-2">
          {steps.map((step, idx) => (
            <li key={step.label} className="flex items-center gap-2">
              <span className={`w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center `}>
                <span className={`w-2 h-2 rounded-full ${idx <= currentStep ? 'bg-[#E6FF4C]' : ''}`}></span>
              </span>
              <span className={`text-sm font-urbanist text-[14px] font-[600]  ${idx <= currentStep ? 'text-white' : 'text-gray-400'}`}>{step.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-4 bg-[#181818] rounded-xl px-3 py-2">
          <span className="bg-[#232323] p-2 rounded-lg">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" />
            </svg>
          </span>
          Add Ticket
        </button>
        <ul className="ml-8 flex flex-col gap-3 mt-2">
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-[#181818] rounded-full"></span>
            </span>
            <span className="text-sm font-urbanist text-[14px] font-[600]  text-gray-400">Pricing</span>
          </li>
        </ul>
      </div>
      <div>
        <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-4 bg-[#181818] rounded-xl px-3 py-2">
          <span className="bg-[#232323] p-2 rounded-lg">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h1v-4h1m-4 0h1v4h1" />
            </svg>
          </span>
          Add ons
        </button>
        <ul className="ml-8 flex flex-col gap-3 mt-2">
          {addOns.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-[#181818] rounded-full"></span>
              </span>
              <span className="text-sm font-urbanist text-[14px] font-[600]  text-gray-400">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto text-[#E6FF4C] font-bold text-lg">
        Page <span className="text-white">{currentStep + 1}</span> out of 5
        <p className="text-xs text-gray-400 font-normal mt-1">You can easily manage these details later in manage event section.</p>
      </div>
    </aside>
  );
} 