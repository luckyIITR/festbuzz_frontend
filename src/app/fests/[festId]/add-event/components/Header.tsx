'use client';
import React from 'react';

export default function Header() {
  return (
    <div className="w-full px-4 bg-[#000000]">
      <div className="bg-[#0050FF] h-[6vh] rounded-4xl flex mt-4 w-full justify-center content-center flex-wrap relative">
        <div className='font-dm-sans text-[22px] font-[800] text-[#E1FF01]'>Create event</div>
        <div className='flex absolute right-5 h-full justify-center gap-3 content-center flex-wrap font-dm-sans text-white font-[500] text-[14px]'>
          <div className='bg-[#00288D] px-6 py-1 rounded-2xl'>Preview</div>
          <div className='bg-[#00288D] px-6 py-1 rounded-2xl'>Share</div>
        </div>
      </div>
    </div>
  );
} 