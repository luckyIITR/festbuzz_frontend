'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react'; 


export default function Page() {

    const [images, setImages] = useState<number[]>([0, 1, 2]);

    const addImageSlot = () => {
        setImages((prev) => [...prev, prev.length > 0 ? prev[prev.length - 1] + 1 : 0]);
    };

    const removeImageSlot = (index: number) => {
        setImages((prev) => prev.filter((_, idx) => idx !== index));
    };

    return (
        <div>
            <div className="max-w-6xl flex flex-col gap-6  min-h-140">
                <label className="block font-urbanist font-[600] text-[20px] mb-2">Upload Photos</label>

                <div className="flex flex-wrap gap-6">
                    {images.map((id, idx) => (
                        <div
                            key={id}
                            className="relative w-64 h-64 bg-[#232323] rounded-2xl flex flex-col items-center justify-center border-2 border-[#232323] hover:border-[#E6FF4C] transition-colors cursor-pointer"
                        >
                            <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500 mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 16V6a2 2 0 012-2h14a2 2 0 012 2v10M3 16l4-4a2 2 0 012.828 0l2.586 2.586a2 2 0 002.828 0L21 10M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
                            </svg>
                            <span className="text-[#818181] font-urbanist font-[700] text-[14px] text-center">
                                Click Here or Drag & drop<br />
                                <span className='font-[400]'>JPEG/PNG/SVG format allowed</span>
                            </span>
                            {images.length > 1 && (
                                <button
                                    onClick={() => removeImageSlot(idx)}
                                    className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add new slot button */}
                    <button
                        onClick={addImageSlot}
                        className="w-64 h-64 border-2 border-dashed border-[#818181] rounded-2xl flex flex-col items-center justify-center text-[#818181] hover:border-[#E6FF4C] hover:text-[#E6FF4C] transition-colors"
                    >
                        <Plus className="w-10 h-10 mb-2" />
                        <span className="font-urbanist font-[600] text-[14px]">Add Photo</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
