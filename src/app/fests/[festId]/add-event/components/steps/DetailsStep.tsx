'use client';
import React from 'react';

export default function DetailsStep() {
  return (
    <form className="max-w-2xl flex flex-col gap-6 min-h-140">
      <div>
        <label className="block font-urbanist font-[600] text-[20px] mb-2">Rulebook link</label>
        <input 
          type="text" 
          placeholder="URL" 
          className="appearance-none w-3/4 bg-[#252525] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 text-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" 
        />
      </div>
      
      <div>
        <label className="block font-urbanist font-[600] text-[20px] mb-2">Event details</label>
        {/* Placeholder for rich text editor */}
        <div className="bg-[#232323] rounded-xl min-h-[180px] flex flex-col">
          <div className="flex gap-2 mb-2 p-4 bg-[#353535] rounded-t-xl">
            <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">B</button>
            <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">I</button>
            <button type="button" className="text-[#E6FF4C] font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">U</button>
            <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">•</button>
            <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">1.</button>
            <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">&quot;</button>
            <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">🔗</button>
          </div>
          <textarea
            className="bg-transparent w-full p-4 h-60 font-urbanist font-[600] text-[16px] text-white placeholder-[#565656] focus:outline-none resize-none"
            placeholder="Describe about your event make sure add all details including eligibility and others"
          />
        </div>
      </div>
    </form>
  );
} 