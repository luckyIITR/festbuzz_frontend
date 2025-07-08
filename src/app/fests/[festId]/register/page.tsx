'use client';
import Image from 'next/image';

export default function FestRegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center pt-10 pb-50">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80"
          alt="Festival Crowd"
          width={1500}
          height={800}
          className="w-full h-full object-cover object-center opacity-60"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-70" /> */}
      </div>
      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-2xl bg-zinc-900 bg-opacity-95 rounded-3xl shadow-2xl p-8 md:p-12 mx-2 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 text-white">Festbuzz</h2>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-pink-500">Confirm your fest registration</h1>
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input type="text" placeholder="Enter your full name" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Phone number</label>
            <input type="text" placeholder="Enter your phone number" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Date of birth</label>
            <input type="date" placeholder="Date of your birth" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Gender</label>
            <input type="text" placeholder="Your gender" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">City</label>
            <input type="text" placeholder="Enter your city name" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">State</label>
            <input type="text" placeholder="Enter your state name" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Institute name</label>
            <input type="text" placeholder="Enter your college/university name" className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>
          <div className="md:col-span-2 flex justify-end mt-2">
            <button type="submit" className="px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
} 