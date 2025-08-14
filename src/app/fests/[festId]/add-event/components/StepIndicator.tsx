'use client';
import React, { useState } from 'react';


interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  addOns: Step[];
}

export default function StepIndicator({ steps, currentStep, addOns }: StepIndicatorProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#181818] text-white p-3 rounded-xl shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative
        top-0 left-0 lg:left-auto
        w-72 sm:w-80 lg:w-72 xl:w-80
        h-full lg:h-auto
        min-h-screen lg:min-h-[80vh]
        p-3 sm:p-4 lg:p-4
        ml-0 lg:ml-4
        bg-[#181818] 
        flex flex-col gap-4 sm:gap-6 lg:gap-8
        shadow-lg lg:shadow-lg
        rounded-none lg:rounded-b-3xl
        z-40 lg:z-auto
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>

        {/* Close button for mobile - matches original spacing */}
        <div className='h-10 md:h-0 md:-mt-10 '> </div>

        {/* Add Event Details Section */}
        <div>
          <button className="flex items-center content-center flex-wrap gap-2 w-full text-left text-white font-semibold mb-3 sm:mb-4 bg-[#313131] rounded-xl px-3 h-9 sm:h-10">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[white] flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
            </svg>
            <span className='font-urbanist font-[700] text-sm sm:text-[17px] pt-[1px] truncate'>Add Event Details</span>
          </button>
          <ul className="ml-4 sm:ml-6 lg:ml-8 flex flex-col gap-2 sm:gap-3 mt-2">
            {steps.map((step, idx) => (
              <li key={step.label} className="flex items-center gap-2">
                <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${idx <= currentStep ? 'bg-[#E6FF4C]' : ''}`}></span>
                </span>
                <span className={`text-xs sm:text-sm font-urbanist font-[600] truncate ${idx <= currentStep ? 'text-white' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Ticket Section */}
        <div>
          <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-3 sm:mb-4 bg-[#181818] rounded-xl px-3 py-2">
            <span className="bg-[#232323] p-1.5 sm:p-2 rounded-lg flex-shrink-0">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" />
              </svg>
            </span>
            <span className="truncate text-sm sm:text-[16px]">Add Ticket</span>
          </button>
          <ul className="ml-4 sm:ml-6 lg:ml-8 flex flex-col gap-2 sm:gap-3 mt-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2  rounded-full"></span>
              </span>
              <span className="text-xs sm:text-sm font-urbanist font-[600] text-white truncate">Pricing</span>
            </li>
          </ul>
        </div>

        {/* Add-ons Section */}
        <div>
          <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-3 sm:mb-4 bg-[#181818] rounded-xl px-3 py-2">
            <span className="bg-[#232323] p-1.5 sm:p-2 rounded-lg flex-shrink-0">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
            <span className="truncate text-sm sm:text-[16px]">Add ons</span>
          </button>
          <ul className="ml-4 sm:ml-6 lg:ml-8 flex flex-col gap-2 sm:gap-3 mt-2">
            {addOns.map((item, idx) => (
              <li key={item.label} className="flex items-center gap-2">
                <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#181818] rounded-full ${currentStep >= steps.length + 1 + idx ? 'bg-[#E6FF4C]' : ''}`}></span>
                </span>
                <span className={`text-xs sm:text-sm font-urbanist font-[600] truncate ${currentStep >= steps.length + 1 + idx ? 'text-white' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Indicator */}
        <div className="mt-auto text-[#E6FF4C] font-bold text-base sm:text-lg">
          Page <span className="text-white">{currentStep + 1}</span> out of 5
          <p className="text-xs text-gray-400 font-normal mt-1 leading-relaxed">
            You can easily manage these details later in manage event section.
          </p>
        </div>
      </aside>
    </>
  );
}