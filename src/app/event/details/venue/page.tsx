'use client';
import { useState } from 'react';

const Page = () => {
  const [form, setForm] = useState({
    visibility: 'public',
    location: '',
    venue: '',
  });

  return (
    <div className="min-h-screen px-4 py-10">
      {/* Visibility Selection */}
      <div className="flex flex-col gap-2 w-full md:w-1/2 mx-auto">
        <label className="text-white font-urbanist font-[700] mb-1">Fest Visibility*</label>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 bg-[#252525] ${
              form.visibility === 'public' ? 'text-white' : 'text-[#565656]'
            }`}
            onClick={() => setForm((f) => ({ ...f, visibility: 'public' }))}
          >
            <div className="font-urbanist font-[600]">Open to all</div>
          </button>
          <button
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 bg-[#252525] ${
              form.visibility === 'private' ? 'text-white' : 'text-[#565656]'
            }`}
            onClick={() => setForm((f) => ({ ...f, visibility: 'private' }))}
          >
            <div className="font-urbanist font-[600]">Private</div>
          </button>
        </div>
      </div>

      {/* Location Input */}
      <div className="flex flex-col gap-2 w-full md:w-1/2 mx-auto mt-10">
        <label className="text-white font-urbanist font-[700] mb-1">Location*</label>
        <input
          name="location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="bg-[#252525] font-urbanist font-[600] backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-[#565656]"
          placeholder="Name your location"
        />
      </div>

      {/* Venue Input */}
      <div className="flex flex-col gap-2 w-full md:w-1/2 mx-auto mt-10">
        <label className="text-white font-urbanist font-[700] mb-1">Venue*</label>
        <input
          name="venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
          className="bg-[#252525] font-urbanist font-[600] backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-[#565656]"
          placeholder="Name your venue"
        />
      </div>
    </div>
  );
};

export default Page;
