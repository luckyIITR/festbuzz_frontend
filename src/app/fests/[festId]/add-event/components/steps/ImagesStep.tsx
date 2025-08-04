'use client';
import React from 'react';

export default function ImagesStep() {
  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <label className="block font-urbanist font-[600] text-[20px] mb-2">Upload Photos</label>
      <div className="flex gap-8">
        {[0, 1, 2].map((idx) => (
          <div key={idx} className="w-64 h-64 bg-[#232323] rounded-2xl flex flex-col items-center justify-center border-2 border-[#232323] hover:border-[#E6FF4C] transition-colors cursor-pointer">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16V6a2 2 0 012-2h14a2 2 0 012 2v10M3 16l4-4a2 2 0 012.828 0l2.586 2.586a2 2 0 002.828 0L21 10M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
            </svg>
            <span className="text-[#818181] font-urbanist font-[700] text-[14px] text-center">
              Click Here or Drag & drop<br />
              <span className='font-[400]'>JPEG/PNG/SVG format allowed</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 