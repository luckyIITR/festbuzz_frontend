'use client';
import React, { useState } from 'react';

const Page = () => {
  const [form, setForm] = useState({
    eventname: '',
    name: '',
    visibility: '',
    ticketStartDate: '',
    ticketStartTime: '',
    ticketEndDate: '',
    ticketEndTime: '',
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-10">
      <form
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(form);
        }}
      >
        {/* Event Name */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-white font-urbanist font-[700] mb-1">Event name*</label>
          <input
            value={form.eventname}
            onChange={(e) => handleChange('eventname', e.target.value)}
            className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-[#565656]"
            placeholder="Early bird/RSVP/VIP"
          />
        </div>

        {/* Display Name + Visibility */}
        <div className="flex flex-col gap-4">
          <label className="text-white font-urbanist font-[700] mb-1">Display name*</label>
          <input
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-[#565656]"
            placeholder="Early bird/RSVP/VIP"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-white font-urbanist font-[700] mb-1">Event Visibility*</label>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 bg-[#252525] text-white w-full sm:w-3/4 md:w-full"
            onClick={() => handleChange('visibility', 'public')}
          >
            <div className="font-urbanist font-[600]">Open to all</div>
          </button>
        </div>

        {/* Start Date & Time */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-urbanist font-[700] mb-1">Event starts*</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              value={form.ticketStartDate}
              onChange={(e) => handleChange('ticketStartDate', e.target.value)}
              className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all w-full"
            />
            <input
              type="time"
              value={form.ticketStartTime}
              onChange={(e) => handleChange('ticketStartTime', e.target.value)}
              className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all w-full"
            />
          </div>
        </div>

        {/* End Date & Time */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-urbanist font-[700] mb-1">Event ends*</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              value={form.ticketEndDate}
              onChange={(e) => handleChange('ticketEndDate', e.target.value)}
              className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all w-full"
            />
            <input
              type="time"
              value={form.ticketEndTime}
              onChange={(e) => handleChange('ticketEndTime', e.target.value)}
              className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all w-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
