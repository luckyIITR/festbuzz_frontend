'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import SummaryCard from './SummaryCard';
import EventRow from './EventRow';
import { useEffect } from 'react';

interface EventEntry {
  id: string;
  name: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Workshop';
  description: string;
  location: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  price: number;
  registrations: {
    current: number;
    max: number;
  };
  isTeamEvent: boolean;
  teamSize?: number;
}

const FestDashboard = () => {
  const params = useParams();
  const festId = params.festId as string;
  
  // Loading and error state
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All categories');
  const [statusFilter, setStatusFilter] = useState('All status');

  // Mock fest data
  const festData = {
    id: festId,
    name: 'Thomso 2025',
    description: 'Annual tech festival featuring hackathons, workshops, and cultural events',
    location: 'IIT Roorkee',
    date: '14-20 Sep, 2025',
    status: 'Upcoming',
    totalEvents: 12,
    totalRegistrations: 450,
    maxRegistrations: 500,
    revenue: 45000
  };

  // Mock event data
  const eventData: EventEntry[] = [
    {
      id: '1',
      name: 'Hackathon 2025',
      category: 'Technical',
      description: '24-hour coding competition with exciting prizes...',
      location: 'Main Auditorium',
      date: '15 Sep, 2025',
      time: '10:00 AM',
      status: 'Upcoming',
      price: 500,
      registrations: { current: 120, max: 150 },
      isTeamEvent: true,
      teamSize: 4
    },
    {
      id: '2',
      name: 'Dance Competition',
      category: 'Cultural',
      description: 'Show your dance moves and win exciting prizes...',
      location: 'Cultural Hall',
      date: '16 Sep, 2025',
      time: '6:00 PM',
      status: 'Upcoming',
      price: 200,
      registrations: { current: 45, max: 100 },
      isTeamEvent: false
    },
    {
      id: '3',
      name: 'AI Workshop',
      category: 'Workshop',
      description: 'Learn the basics of artificial intelligence...',
      location: 'Computer Lab',
      date: '17 Sep, 2025',
      time: '2:00 PM',
      status: 'Upcoming',
      price: 300,
      registrations: { current: 80, max: 80 },
      isTeamEvent: false
    },
    {
      id: '4',
      name: 'Cricket Tournament',
      category: 'Sports',
      description: 'Inter-college cricket tournament...',
      location: 'Sports Ground',
      date: '18 Sep, 2025',
      time: '9:00 AM',
      status: 'Upcoming',
      price: 100,
      registrations: { current: 200, max: 200 },
      isTeamEvent: true,
      teamSize: 11
    },
    {
      id: '5',
      name: 'Battle of Bands',
      category: 'Cultural',
      description: 'Music competition for bands...',
      location: 'Open Air Theatre',
      date: '19 Sep, 2025',
      time: '7:00 PM',
      status: 'Upcoming',
      price: 400,
      registrations: { current: 15, max: 20 },
      isTeamEvent: true,
      teamSize: 6
    }
  ];

  const summaryStats = [
    { label: 'Total events', value: festData.totalEvents.toString(), icon: '🎪' },
    { label: 'Active events', value: '8', icon: '🔥' },
    { label: 'Total registrations', value: `${festData.totalRegistrations}/${festData.maxRegistrations}`, icon: '👥' },
    { label: 'Total revenue', value: `Rs. ${festData.revenue}`, icon: '💰' }
  ];

  const getProgressPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-yellow-500 text-black';
      case 'Cultural': return 'bg-pink-500 text-white';
      case 'Sports': return 'bg-green-500 text-white';
      case 'Workshop': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-gray-600 text-white';
      case 'Ongoing': return 'bg-green-600 text-white';
      case 'Completed': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-pink-400">
        <svg className="animate-spin h-10 w-10 mb-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <h1 className="text-3xl font-bold">EVENT DASHBOARD</h1>
        </div>
        <p className="text-gray-400">Manage all events for {festData.name}</p>
      </div>

      {/* Fest Info Card */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{festData.name}</h2>
            <p className="text-gray-400 mb-2">{festData.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {festData.location}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {festData.date}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(festData.status)}`}>
                {festData.status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Registration Progress</p>
            <p className="text-2xl font-bold">{festData.totalRegistrations}/{festData.maxRegistrations}</p>
            <div className="w-32 bg-gray-600 rounded-full h-2 mt-1">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage(festData.totalRegistrations, festData.maxRegistrations)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-8">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          />
        </div>
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
        >
          <option>All categories</option>
          <option>Technical</option>
          <option>Cultural</option>
          <option>Sports</option>
          <option>Workshop</option>
        </select>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
        >
          <option>All status</option>
          <option>Upcoming</option>
          <option>Ongoing</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {summaryStats.map((stat, index) => (
          <SummaryCard key={index} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Event Table */}
      <div className="overflow-x-auto">
        <div className="bg-gray-800 rounded-lg min-w-[800px]">
          {/* Table Header */}
          <div className="bg-gray-700 px-6 py-4 grid grid-cols-6 gap-4 font-semibold text-xs sm:text-sm">
            <div>Event details</div>
            <div>Category</div>
            <div>Status</div>
            <div>Registrations</div>
            <div>Price</div>
            <div>Action</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-700 text-xs sm:text-sm">
            {eventData.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                getCategoryColor={getCategoryColor}
                getStatusColor={getStatusColor}
                getProgressPercentage={getProgressPercentage}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Button */}
      <div className="mt-8 text-center">
        <button className="bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 mx-auto focus:outline-none focus:ring-2 focus:ring-pink-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Event
        </button>
      </div>
    </>
  );
};

export default FestDashboard; 