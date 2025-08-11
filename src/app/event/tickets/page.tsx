'use client';
import React, { useState } from 'react';

const Page = () => {
  const [form, setForm] = useState({
    ticketName: '',
    feeType: 'paid',
    ticketPrice: '',
    ticketStartDate: '',
    ticketStartTime: '',
    ticketEndDate: '',
    ticketEndTime: '',
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
      <form
        className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(form);
        }}
      >
        {/* Ticket Name */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-white font-urbanist font-[700] mb-1">Ticket name*</label>
          <input
            name="ticketName"
            value={form.ticketName}
            onChange={(e) => setForm({ ...form, ticketName: e.target.value })}
            className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 placeholder:text-[#565656] w-full"
            placeholder="Early bird/RSVP/VIP"
          />
        </div>

        {/* Fee Type */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-white font-urbanist font-[700] mb-1">Fee Type*</label>
          <div className="flex gap-4 flex-col sm:flex-row">
            {['paid', 'free'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setForm({ ...form, feeType: type })}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 bg-[#252525] ${form.feeType === type ? 'text-white' : 'text-[#565656]'}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Pricing */}
        {form.feeType === 'paid' && (
          <div className="flex flex-col gap-2 md:col-span-2 md:max-w-xs w-full">
            <label className="text-white font-urbanist font-[700] mb-1">Ticket Pricing*</label>
            <div className="flex items-center gap-2">
              <span className="bg-[#252525] font-urbanist font-[600] px-4 py-3 rounded-l-xl text-[#565656] shadow-md">
                INR
              </span>
              <input
                name="ticketPrice"
                type="number"
                min="0"
                value={form.ticketPrice}
                onChange={(e) => setForm({ ...form, ticketPrice: e.target.value })}
                className="bg-[#252525] rounded-r-xl px-4 py-3 text-white focus:outline-none w-full shadow-md focus:ring-2 focus:ring-pink-400 placeholder:text-[#565656]"
              />
            </div>
          </div>
        )}

        {/* Tickets available from */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-urbanist font-[700] mb-1">Tickets available from*</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              name="ticketStartDate"
              value={form.ticketStartDate}
              onChange={(e) => setForm({ ...form, ticketStartDate: e.target.value })}
              className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none w-full shadow-md focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="time"
              name="ticketStartTime"
              value={form.ticketStartTime}
              onChange={(e) => setForm({ ...form, ticketStartTime: e.target.value })}
              className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none w-full shadow-md focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>

        {/* Tickets available till */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-urbanist font-[700] mb-1">Tickets available till*</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              name="ticketEndDate"
              value={form.ticketEndDate}
              onChange={(e) => setForm({ ...form, ticketEndDate: e.target.value })}
              className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none w-full shadow-md focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="time"
              name="ticketEndTime"
              value={form.ticketEndTime}
              onChange={(e) => setForm({ ...form, ticketEndTime: e.target.value })}
              className="bg-[#252525] font-urbanist font-[600] rounded-xl px-4 py-3 text-white focus:outline-none w-full shadow-md focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
