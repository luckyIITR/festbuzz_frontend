'use client';
import { useRegisterTeamEvent } from '@/hooks/useRegisterTeamEvent';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { getToken } from '@/lib/token';

const festLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Fest_logo_example.png';

export default function TeamEventRegisterPage() {
  const [isLeader, setIsLeader] = useState(true);
  // Placeholder: these would be dynamic in a real app
  const teamName = 'MALHAR';
  const teamCode = '1234567';
  const [created, setCreated] = useState(false);
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const params = useParams();
  const festId = params?.festId as string;
  const eventId = params?.eventId as string;
  const { mutate, isLoading, isError, isSuccess, error } = useRegisterTeamEvent();

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    mutate({ festId, eventId, data: { field1, field2 }, token });
  }

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center pt-10 pb-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80"
          alt="Festival Crowd"
          width={1500}
          height={800}
          className="w-full h-full object-cover object-center opacity-60"
        />
      </div>
      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-2xl bg-zinc-900 bg-opacity-95 rounded-3xl shadow-2xl p-8 md:p-12 mx-2 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 text-white">Festbuzz</h2>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-pink-500">Create team</h1>
        {/* Leader/Not Leader Toggle */}
        <div className="flex gap-8 mb-6 w-full justify-center">
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="leader"
              checked={isLeader}
              onChange={() => setIsLeader(true)}
              className="accent-lime-400 w-4 h-4"
            />
            <span className="text-white">Yes, I&apos;m the leader.</span>
          </label>
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="leader"
              checked={!isLeader}
              onChange={() => setIsLeader(false)}
              className="accent-lime-400 w-4 h-4"
            />
            <span className="text-white">No, I&apos;m not the leader.</span>
          </label>
        </div>
        {/* Form for Leader */}
        {isLeader ? (
          <form
            className="w-full flex flex-col gap-4 mb-8"
            onSubmit={e => {
              e.preventDefault();
              setCreated(true);
            }}
          >
            <label className="block font-semibold mb-1">Create new team</label>
            <input
              type="text"
              placeholder="Team name"
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-2"
              defaultValue={created ? teamName : ''}
              disabled={created}
            />
            {created && (
              <div className="text-sm text-gray-300 mb-2">
                You are added in <span className="text-pink-400 font-bold">{teamName}</span> &nbsp; TEAM CODE <span className="text-pink-400 font-bold">{teamCode}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition mt-2"
              disabled={created}
            >
              Create team
            </button>
          </form>
        ) : (
          <form className="w-full flex flex-col gap-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Search team name to join</label>
                <input
                  type="text"
                  placeholder="Team name"
                  className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Enter team code</label>
                <input
                  type="text"
                  placeholder="Team code"
                  className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition mt-2"
            >
              Join team
            </button>
          </form>
        )}
        {/* Event Registration Section (always visible) */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-pink-500 w-full text-left">Confirm your event registration</h1>
        <div className="w-full bg-zinc-800 rounded-xl flex flex-col md:flex-row items-center justify-between p-4 mb-8">
          <div className="flex items-center gap-4 flex-1">
            <Image src={festLogo} alt="Fest Logo" width={60} height={60} className="w-16 h-16 rounded-full border-2 border-yellow-400 bg-black object-contain" />
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-lime-200">MUSIC FESTIVAL</div>
              <div className="text-xs text-gray-300">Organized by - IIT Roorkee</div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span>🏫 IIT Roorkee</span>
                <span>•</span>
                <span>📅 14-20 Sep. 2025</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end mt-4 md:mt-0 min-w-[120px]">
            <span className="text-white text-sm">Neha Gupta</span>
            <span className="text-gray-400 text-xs">Dance</span>
            <span className="text-gray-400 text-xs">Individual</span>
            <span className="text-gray-400 text-xs">91+ 1234567890</span>
          </div>
        </div>
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleRegister}>
          <div>
            <label className="block font-semibold mb-1">Add field</label>
            <input type="text" value={field1} onChange={e => setField1(e.target.value)} placeholder="Enter details" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Add additional field</label>
            <input type="text" value={field2} onChange={e => setField2(e.target.value)} placeholder="Enter details" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div className="md:col-span-2 flex flex-col items-end mt-2 gap-2">
            <button type="submit" className="px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Confirm participation'}
            </button>
            {isError && <div className="text-red-500 text-sm">{(error as Error)?.message || 'Registration failed'}</div>}
            {isSuccess && <div className="text-green-500 text-sm">Registration successful!</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
