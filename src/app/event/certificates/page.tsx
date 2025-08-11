'use client';

import React, { useState } from 'react';

// Types for Winners
type Winner = {
  round: string;
  rank: string;
  participation: string;
  college: string;
  email: string;
  status: string;
};

// Types for Participants
type Participant = {
  bookingId: string;
  participation: string;
  college: string;
  email: string;
  status: string;
};

type FormFields =
  | 'collegeName'
  | 'festName'
  | 'ticketStartDate'
  | 'ticketStartTime'
  | 'ticketEndDate'
  | 'ticketEndTime';

type FormState = {
  collegeName: string;
  festName: string;
  ticketStartDate: string;
  ticketStartTime: string;
  ticketEndDate: string;
  ticketEndTime: string;
};

const Page = () => {
  const [form, setForm] = useState<FormState>({
    collegeName: '',
    festName: '',
    ticketStartDate: '',
    ticketStartTime: '',
    ticketEndDate: '',
    ticketEndTime: ''
  });

  const [eventName, setEventName] = useState('Singing the floor');
  const [isEditingEvent, setIsEditingEvent] = useState(false);

  const handleChange = (field: FormFields, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Winners State Management
  const initialWinnersData = {
    title: 'Manage Winners',
    members: [
      {
        round: '1st',
        rank: 'Winner',
        participation: 'Neha Gupta',
        college: 'IIT Delhi',
        email: 'neha.gupta@gmail.com',
        status: 'Checked In'
      },
      {
        round: '1st',
        rank: 'Runner Up',
        participation: 'Raj Kumar',
        college: 'IIT Bombay',
        email: 'raj.kumar@gmail.com',
        status: 'Checked In'
      }
    ] as Winner[]
  };

  const [winnersData, setWinnersData] = useState(initialWinnersData);

  // Participants State Management
  const initialParticipantsData = {
    title: 'Manage Participants',
    members: [
      {
        bookingId: 'BK001',
        participation: 'Amit Sharma',
        college: 'Delhi University',
        email: 'amit.sharma@gmail.com',
        status: 'Checked In'
      },
      {
        bookingId: 'BK002',
        participation: 'Priya Singh',
        college: 'JNU',
        email: 'priya.singh@gmail.com',
        status: 'No Show'
      },
      {
        bookingId: 'BK003',
        participation: 'Rahul Verma',
        college: 'NSUT',
        email: 'rahul.verma@gmail.com',
        status: 'Pending'
      }
    ] as Participant[]
  };

  const [participantsData, setParticipantsData] = useState(initialParticipantsData);

  // Winners handlers
  const handleChangeWinners = (index: number, field: keyof Winner, value: string) => {
    const updatedMembers = [...winnersData.members];
    updatedMembers[index][field] = value;
    setWinnersData({ ...winnersData, members: updatedMembers });
  };

  const addNewWinner = () => {
    const newWinner: Winner = {
      round: '1st',
      rank: 'Winner',
      participation: '',
      college: '',
      email: '',
      status: 'Pending'
    };
    setWinnersData({
      ...winnersData,
      members: [...winnersData.members, newWinner]
    });
  };

  const deleteWinner = (index: number) => {
    const updated = winnersData.members.filter((_, i) => i !== index);
    setWinnersData({ ...winnersData, members: updated });
  };

  // Participants handlers
  const handleChangeParticipants = (index: number, field: keyof Participant, value: string) => {
    const updatedMembers = [...participantsData.members];
    updatedMembers[index][field] = value;
    setParticipantsData({ ...participantsData, members: updatedMembers });
  };

  const addNewParticipant = () => {
    const newParticipant: Participant = {
      bookingId: '',
      participation: '',
      college: '',
      email: '',
      status: 'Pending'
    };
    setParticipantsData({
      ...participantsData,
      members: [...participantsData.members, newParticipant]
    });
  };

  const deleteParticipant = (index: number) => {
    const updated = participantsData.members.filter((_, i) => i !== index);
    setParticipantsData({ ...participantsData, members: updated });
  };

  const handleEventNameChange = () => {
    setIsEditingEvent(!isEditingEvent);
  };

  const handleFileUpload = (type: 'logo' | 'signature', index: number) => {
    // This would typically handle file upload logic
    console.log(`Uploading ${type} ${index}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      <div className='flex flex-col lg:flex-row gap-8 justify-between'>
        <div className='flex flex-col flex-1'>
          {/* Title */}
          <div>
            <h2 className="text-[#FD3EB5] font-[700] text-2xl font-urbanist">
              Design certificates
            </h2>
            <p className="text-sm text-[#ACACAC] font-urbanist font-[500] mt-2">
              Provide details and assets to generate certificate
            </p>
          </div>

          {/* Event Name */}
          <div className="flex items-center gap-2 w-fit mt-5">
            {isEditingEvent ? (
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                onBlur={() => setIsEditingEvent(false)}
                onKeyPress={(e) => e.key === 'Enter' && setIsEditingEvent(false)}
                className="text-lg bg-[#181818] font-[700] p-3 rounded-lg font-urbanist focus:outline-none focus:ring-2 focus:ring-[#FD3EB5]"
                autoFocus
              />
            ) : (
              <div className="text-lg bg-[#181818] font-[700] p-3 rounded-lg font-urbanist">
                Event name - {eventName}
              </div>
            )}
            <button
              onClick={handleEventNameChange}
              className="bg-[#181818] p-3 rounded-full hover:bg-zinc-700 transition-colors"
            >
              ✏️
            </button>
          </div>

          {/* Upload Assets */}
          <div>
            <h3 className="font-[700] text-xl font-urbanist mt-5">Upload assets</h3>

            {/* Logos */}
            <p className="text-lg font-urbanist font-[700] text-[#888888] mt-4">Logos</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  onClick={() => handleFileUpload('logo', i)}
                  className="relative w-full h-64 bg-[#232323] rounded-2xl flex flex-col items-center justify-center border-2 border-[#232323] hover:border-[#E6FF4C] transition-colors cursor-pointer"
                >
                  <svg
                    width="64"
                    height="64"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-gray-500 mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 16V6a2 2 0 012-2h14a2 2 0 012 2v10M3 16l4-4a2 2 0 012.828 0l2.586 2.586a2 2 0 002.828 0L21 10M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2"
                    />
                  </svg>
                  <span className="text-[#818181] font-urbanist font-[700] text-[14px] text-center">
                    Click Here or Drag & drop
                    <br />
                    <span className="font-[400]">JPEG/PNG/SVG format allowed</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Signatures */}
            <p className="text-lg font-urbanist font-[700] text-[#888888] mt-4">Signatures</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  onClick={() => handleFileUpload('signature', i)}
                  className="relative w-full h-64 bg-[#232323] rounded-2xl flex flex-col items-center justify-center border-2 border-[#232323] hover:border-[#E6FF4C] transition-colors cursor-pointer"
                >
                  <svg
                    width="64"
                    height="64"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-gray-500 mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 16V6a2 2 0 012-2h14a2 2 0 012 2v10M3 16l4-4a2 2 0 012.828 0l2.586 2.586a2 2 0 002.828 0L21 10M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2"
                    />
                  </svg>
                  <span className="text-[#818181] font-urbanist font-[700] text-[14px] text-center">
                    Click Here or Drag & drop
                    <br />
                    <span className="font-[400]">JPEG/PNG/SVG format allowed</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="w-full lg:w-1/2 h-96 bg-gradient-to-br from-gray-100 to-gray-200 text-center text-black rounded-2xl flex flex-col items-center justify-center text-2xl shadow-lg">
          <div className="font-bold mb-2">Certificate Preview</div>
        </div>
      </div>

      {/* Confirm details */}
      <div>
        <h3 className="text-[#FD3EB5] font-[700] text-2xl font-urbanist">Confirm details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div className="flex flex-col gap-2">
            <span className="font-urbanist font-[700]">College Name</span>
            <input
              type="text"
              placeholder="Enter college name"
              value={form.collegeName}
              onChange={(e) => handleChange('collegeName', e.target.value)}
              className="bg-[#181818] mt-2 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FD3EB5]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-urbanist font-[700]">Fest name</span>
            <input
              type="text"
              placeholder="Enter fest name"
              value={form.festName}
              onChange={(e) => handleChange('festName', e.target.value)}
              className="bg-[#181818] mt-2 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FD3EB5]"
            />
          </div>
        </div>

        {/* Event Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
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
        </div>
      </div>

      {/* Winners Section */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[#FD3EB5] font-[700] text-2xl font-urbanist">Confirm Winners</h3>
          <button
            onClick={addNewWinner}
            className="bg-[#FD3EB5] text-white px-4 py-2 rounded-lg font-urbanist font-[600] hover:bg-[#e635a3] transition-colors"
          >
            + Add Winner
          </button>
        </div>

        <div className="overflow-x-auto">
          {/* Header */}
          <div className="flex min-w-[1000px] justify-between mt-5 flex-nowrap px-6 py-3 rounded-t-2xl bg-[#1E1E1E] text-[16px] font-[600] font-urbanist text-[#E1FF01]">
            <span className='w-20'>Round</span>
            <span className='w-24'>Rank</span>
            <span className='w-40'>Participant</span>
            <span className='w-32'>College</span>
            <span className='w-48'>Email</span>
            <span className='w-24'>Status</span>
            <span className='w-20'>Action</span>
          </div>

          {/* Rows */}
          <div className="flex flex-col space-y-2 mt-2 min-w-[1000px]">
            {winnersData.members.map((item, index) => (
              <div
                key={index}
                className='flex justify-between items-center flex-nowrap gap-2 px-6 py-4 bg-[#161616] text-sm font-semibold font-urbanist rounded-lg'
              >
                <input
                  className="w-20 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.round}
                  onChange={(e) => handleChangeWinners(index, 'round', e.target.value)}
                  placeholder="Round"
                />
                <input
                  className="w-24 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.rank}
                  onChange={(e) => handleChangeWinners(index, 'rank', e.target.value)}
                  placeholder="Rank"
                />
                <input
                  className="w-40 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.participation}
                  onChange={(e) => handleChangeWinners(index, 'participation', e.target.value)}
                  placeholder="Participant name"
                />
                <input
                  className="w-32 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.college}
                  onChange={(e) => handleChangeWinners(index, 'college', e.target.value)}
                  placeholder="College"
                />
                <input
                  className="w-48 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.email}
                  onChange={(e) => handleChangeWinners(index, 'email', e.target.value)}
                  placeholder="Email address"
                />
                <select
                  className="w-24 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.status}
                  onChange={(e) => handleChangeWinners(index, 'status', e.target.value)}
                >
                  <option value="Checked In" className="bg-[#161616]">Checked In</option>
                  <option value="No Show" className="bg-[#161616]">No Show</option>
                  <option value="Pending" className="bg-[#161616]">Pending</option>
                </select>

                {/* Action buttons */}
                <div className="w-20 flex justify-center">
                  <button
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                    onClick={() => deleteWinner(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Participants Section */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[#FD3EB5] font-[700] text-2xl font-urbanist">Confirm Participants</h3>
          <button
            onClick={addNewParticipant}
            className="bg-[#FD3EB5] text-white px-4 py-2 rounded-lg font-urbanist font-[600] hover:bg-[#e635a3] transition-colors"
          >
            + Add Participant
          </button>
        </div>

        <div className="overflow-x-auto">
          {/* Header */}
          <div className="flex min-w-[900px] justify-between mt-5 flex-nowrap px-6 py-3 rounded-t-2xl bg-[#1E1E1E] text-[16px] font-[600] font-urbanist text-[#E1FF01]">
            <span className='w-28'>Booking ID</span>
            <span className='w-40'>Participant</span>
            <span className='w-32'>College</span>
            <span className='w-48'>Email</span>
            <span className='w-24'>Status</span>
            <span className='w-20'>Action</span>
          </div>

          {/* Rows */}
          <div className="flex flex-col space-y-2 mt-2 min-w-[900px]">
            {participantsData.members.map((item, index) => (
              <div
                key={index}
                className='flex justify-between items-center flex-nowrap gap-2 px-6 py-4 bg-[#161616] text-sm font-semibold font-urbanist rounded-lg'
              >
                <input
                  className="w-28 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.bookingId}
                  onChange={(e) => handleChangeParticipants(index, 'bookingId', e.target.value)}
                  placeholder="Booking ID"
                />
                <input
                  className="w-40 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.participation}
                  onChange={(e) => handleChangeParticipants(index, 'participation', e.target.value)}
                  placeholder="Participant name"
                />
                <input
                  className="w-32 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.college}
                  onChange={(e) => handleChangeParticipants(index, 'college', e.target.value)}
                  placeholder="College"
                />
                <input
                  className="w-48 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.email}
                  onChange={(e) => handleChangeParticipants(index, 'email', e.target.value)}
                  placeholder="Email address"
                />
                <select
                  className="w-24 bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FD3EB5] rounded"
                  value={item.status}
                  onChange={(e) => handleChangeParticipants(index, 'status', e.target.value)}
                >
                  <option value="Checked In" className="bg-[#161616]">Checked In</option>
                  <option value="No Show" className="bg-[#161616]">No Show</option>
                  <option value="Pending" className="bg-[#161616]">Pending</option>
                  <option value="Registered" className="bg-[#161616]">Registered</option>
                </select>

                {/* Action buttons */}
                <div className="w-20 flex justify-center">
                  <button
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                    onClick={() => deleteParticipant(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <div></div>
        <button
          onClick={addNewParticipant}
          className="bg-[#E1FF01] text-[#0248F7] px-4 py-2 rounded-lg font-urbanist font-[600]"
        >
          Send Certificates
        </button>
      </div>
    </div>
  );
};

export default Page;