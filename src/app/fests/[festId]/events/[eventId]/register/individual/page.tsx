'use client';
import { useRegisterEvent } from '@/hooks/useRegisterEvent';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const festLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Fest_logo_example.png';

export default function IndividualEventRegisterPage() {
  const params = useParams();
  const festId = params?.festId as string;
  const eventId = params?.eventId as string;
  const { mutate, isPending, isError, isSuccess, error } = useRegisterEvent();
  const [participantName, setParticipantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ 
      festId, 
      eventId, 
      data: { 
              participantName,
      email,
      phone,
      college,
      branch 
      } 
    });
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
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-pink-500">Confirm your event registration</h1>
        {/* Event Summary */}
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
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1">Participant Name</label>
            <input type="text" value={participantName} onChange={e => setParticipantName(e.target.value)} placeholder="Enter your name" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Phone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">College</label>
            <input type="text" value={college} onChange={e => setCollege(e.target.value)} placeholder="Enter your college" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div>
            
          </div>
          <div>
            <label className="block font-semibold mb-1">Branch</label>
            <input type="text" value={branch} onChange={e => setBranch(e.target.value)} placeholder="Enter your branch" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div className="md:col-span-2 flex flex-col items-end mt-2 gap-2">
            <button type="submit" className="px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition" disabled={isPending}>
              {isPending ? 'Registering...' : 'Confirm participation'}
            </button>
            {isError && <div className="text-red-500 text-sm">{(error as Error)?.message || 'Registration failed'}</div>}
            {isSuccess && <div className="text-green-500 text-sm">Registration successful!</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
