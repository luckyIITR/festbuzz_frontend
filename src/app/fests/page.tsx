'use client'

import CallToAction from '../components/CallToAction';
import Image from 'next/image';
import Link from 'next/link';

const eventImage = "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80";

export default function FestsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[260px] md:h-[340px] overflow-hidden flex items-end">
        <Image src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80" alt="Fest Hero" width={1500} height={340} className="absolute inset-0 w-full h-full object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        <div className="relative z-10 flex flex-col items-center w-full pb-6">
          <div className="flex flex-col items-center mt-8">
            <button className="bg-zinc-900 text-white px-6 py-2 rounded-full mb-2">Manage your fest with us now!</button>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition">Host now ↗</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 mt-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Trending Now */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">TRENDING NOW</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {[1,2,3].map((i) => (
                <Link key={i} href={`/fests/${i}`} className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg flex flex-col hover:ring-2 hover:ring-lime-400 transition cursor-pointer">
                  <Image src={eventImage} alt="Event" width={600} height={160} className="w-full h-40 object-cover" />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">Fest name</span>
                      <span className="font-bold text-yellow-300">₹2000</span>
                    </div>
                    <div className="text-gray-400 text-xs mb-2">01 Jan 2025 • Mumbai</div>
                    <span className="mt-auto bg-yellow-300 text-black font-bold px-4 py-2 rounded-full text-center">Book now</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Browse by Type */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">BROWSE BY TYPE</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full font-semibold text-sm"><span className="text-lg">🎭</span> Cultural</span>
              <span className="inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full font-semibold text-sm"><span className="text-lg">🧑‍💻</span> Technical</span>
              <span className="inline-flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-full font-semibold text-sm"><span className="text-lg">💡</span> Entrepreneur</span>
            </div>
          </section>

          {/* Upcoming Fests */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">UPCOMING FESTS</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {[4,5,6].map((i) => (
                <Link key={i} href={`/fests/${i}`} className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg flex flex-col hover:ring-2 hover:ring-lime-400 transition cursor-pointer">
                  <Image src={eventImage} alt="Event" width={600} height={160} className="w-full h-40 object-cover" />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">Fest name</span>
                      <span className="font-bold text-yellow-300">₹2000</span>
                    </div>
                    <div className="text-gray-400 text-xs mb-2">01 Jan 2025 • Mumbai</div>
                    <span className="mt-auto bg-yellow-300 text-black font-bold px-4 py-2 rounded-full text-center">Book now</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg mb-8">
            <h3 className="font-bold text-lg mb-4">FILTERS</h3>
            <div className="flex flex-col gap-3">
              {['Fest type','Date','Price','Ratings','Location'].map((filter) => (
                <select key={filter} className="bg-zinc-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400">
                  <option>{filter}</option>
                </select>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Call-to-Action Section (Consistent with Home Page) */}
      <CallToAction />
    </div>
  );
} 