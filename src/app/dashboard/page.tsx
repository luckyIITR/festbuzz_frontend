'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import pinkdiamond from '../../../public/assets/PinkDiamond.png'
interface FestEntry {
  id: string;
  name: string;
  year: string;
  category: 'Technical' | 'Cultural';
  description: string;
  location: string;
  date: string;
  status: 'Upcoming' | 'Completed';
  events: number;
  entryFee: number;
  registrations: {
    current: number;
    max: number;
  };
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All categories');
  const [statusFilter, setStatusFilter] = useState('All status');

  // Mock data based on the image
  const festData: FestEntry[] = [
    {
      id: '1',
      name: 'Thomso',
      year: '2025',
      category: 'Technical',
      description: 'Annual tech festival feat. hackathons, worksh...',
      location: 'IIT Roorkee',
      date: '14-20 Sep, 2025',
      status: 'Upcoming',
      events: 12,
      entryFee: 1000,
      registrations: { current: 450, max: 500 }
    },
    {
      id: '2',
      name: 'Thomso',
      year: '2025',
      category: 'Technical',
      description: 'Annual tech festival feat. hackathons, worksh...',
      location: 'IIT Roorkee',
      date: '14-20 Sep, 2025',
      status: 'Upcoming',
      events: 12,
      entryFee: 1000,
      registrations: { current: 450, max: 500 }
    },
    {
      id: '3',
      name: 'Thomso',
      year: '2025',
      category: 'Cultural',
      description: 'Annual tech festival feat. hackathons, worksh...',
      location: 'IIT Roorkee',
      date: '14-20 Sep, 2025',
      status: 'Completed',
      events: 20,
      entryFee: 1000,
      registrations: { current: 350, max: 500 }
    },
    {
      id: '4',
      name: 'Thomso',
      year: '2025',
      category: 'Cultural',
      description: 'Annual tech festival feat. hackathons, worksh...',
      location: 'IIT Roorkee',
      date: '14-20 Sep, 2025',
      status: 'Completed',
      events: 20,
      entryFee: 1000,
      registrations: { current: 350, max: 500 }
    },
    {
      id: '5',
      name: 'Thomso',
      year: '2025',
      category: 'Cultural',
      description: 'Annual tech festival feat. hackathons, worksh...',
      location: 'IIT Roorkee',
      date: '14-20 Sep, 2025',
      status: 'Completed',
      events: 20,
      entryFee: 1000,
      registrations: { current: 350, max: 500 }
    }
  ];

  const summaryStats = [
    { label: 'Total fests', value: '00', icon: '🎪' },
    { label: 'Active fests', value: '00', icon: '🔥' },
    { label: 'Total registrations', value: '00', icon: '👥' },
    { label: 'Total revenue', value: '00', icon: '💰' }
  ];

  const getProgressPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Header */}
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Image src={pinkdiamond} alt='' className='w-7 '/>
            <h1 className="text-3xl font-bold">DASHBOARD</h1>
          </div>
          <p className="text-gray-400">Manage all fests and their events</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-8">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1B1B1B] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 bg-[#1B1B1B] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          >
            <option>All categories</option>
            <option>Technical</option>
            <option>Cultural</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 bg-[#1B1B1B] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          >
            <option>All status</option>
            <option>Upcoming</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {summaryStats.map((stat, index) => (
            <div key={index} className="bg-[#1B1B1B] rounded-lg p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fest Table */}
        <div className="overflow-x-auto">
          <div className="bg-[#1B1B1B] rounded-lg min-w-[700px]">
            {/* Table Header */}
            <div className="bg-[#313131] px-6 py-4 grid grid-cols-5 gap-4 font-semibold text-xs sm:text-sm">
              <div>Fest details</div>
              <div>Status</div>
              <div>Events</div>
              <div>Registrations</div>
              <div>Action</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-700 text-xs sm:text-sm">
              {festData.map((fest) => (
                <div key={fest.id} className="px-6 py-6 grid grid-cols-5 gap-4 items-center">
                  {/* Fest Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{fest.name} {fest.year}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        fest.category === 'Technical' ? 'bg-[#E1FF01] text-black' : 'bg-[#FD3EB5] text-white'
                      }`}>
                        {fest.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{fest.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {fest.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {fest.date}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      fest.status === 'Upcoming' 
                        ? 'bg-gray-600 text-white' 
                        : 'bg-gray-600 text-white'
                    }`}>
                      {fest.status}
                    </span>
                  </div>

                  {/* Events */}
                  <div>
                    <p className="font-bold">{fest.events} events</p>
                    <p className="text-sm text-gray-400">Rs. {fest.entryFee} entry fee</p>
                  </div>

                  {/* Registrations */}
                  <div>
                    <p className="font-bold">{fest.registrations.current}/{fest.registrations.max}</p>
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                      <div 
                        className="bg-[#E1FF01] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(fest.registrations.current, fest.registrations.max)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="space-y-2">
                    <Link href={`/fests/${fest.id}/dashboard`} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                      Manage Events
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    </Link>
                    <button className="w-full bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                      Add event +
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 