'use client'

import CallToAction from '../components/CallToAction';
import Image from 'next/image';
import { useFests } from '@/hooks/fest';
import FestCard from '../components/FestCard';
import GradientFestCard from '../components/GradientFestCard';

export default function FestsPage() {
  const { isLoading, error } = useFests();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading fests</div>;

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

            <div className='flex justify-between md:flex-row-reverse flex-col '>
              <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-zinc-900 rounded-2xl md:p-6 p-5 shadow-lg mb-8">
                  <h3 className="font-bold text-lg mb-4">FILTERS</h3>
                  <div className="flex  lg:flex-col gap-3  overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 pb-4 ">
                    {['Fest type', 'Date', 'Price', 'Ratings', 'Location'].map((filter) => (
                      <select key={filter} className="bg-zinc-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400">
                        <option>{filter}</option>
                      </select>
                    ))}
                  </div>
                </div>
              </aside>

              <div className='flex justify-center'>
                <FestCard /></div>
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
            <div className='flex justify-center'>
              <GradientFestCard />
            </div>
          </section>
        </div>

        {/* Filters Sidebar */}

      </div>

      {/* Call-to-Action Section (Consistent with Home Page) */}
      <CallToAction />
    </div>
  );
} 