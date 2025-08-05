'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import SummaryCard from './SummaryCard';
import EventRow from './EventRow';
import { useEffect } from 'react';
import Link from 'next/link';
import { useFest } from '@/hooks/useFest';
import { useFestEvents } from '@/hooks/useFestEvents';
import { useRegistrationCount } from '@/hooks/useRegistration';
import { Fest, Event } from '@/types/fest';

const FestDashboard = () => {
  const params = useParams();
  const festId = params.festId as string;

  // Use existing hooks to get real data
  const { data: fest, isLoading: festLoading, error: festError } = useFest(festId);
  const { data: events, isLoading: eventsLoading, error: eventsError } = useFestEvents(festId);
  const { data: registrationCount, isLoading: registrationLoading } = useRegistrationCount(festId);

  // Loading and error state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All categories');
  const [statusFilter, setStatusFilter] = useState('All status');

  const getProgressPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-[#E1FF01] text-black';
      case 'Cultural': return 'bg-[#FD3EB5] text-white';
      case 'Sports': return 'bg-[#E1FF01] text-black';
      case 'Workshop': return 'bg-[#FD3EB5] text-white';
      default: return 'bg-[#FD3EB5] text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-[#3C3C3C] text-[#E1FF01]';
      case 'Ongoing': return 'bg-green-600 text-white';
      case 'Completed': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  // Calculate summary stats from real data
  const summaryStats = [
    { 
      label: 'Total events', 
      value: events ? events.length.toString() : '0', 
      icon: '🎪' 
    },
    { 
      label: 'Active events', 
      value: events ? events.filter(event => {
        const now = new Date();
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        return now >= startDate && now <= endDate;
      }).length.toString() : '0', 
      icon: '🔥' 
    },
    { 
      label: 'Total registrations', 
      value: registrationCount ? `${registrationCount.data.totalRegistrations}` : '0', 
      icon: '👥' 
    },
    { 
      label: 'Total revenue', 
      value: events ? `₹${events.reduce((total, event) => total + (event.price || 0), 0)}` : '₹0', 
      icon: '💰' 
    }
  ];

  // Filter events based on search and filters
  const filteredEvents = events?.filter((event: Event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All categories' || event.category === categoryFilter;
    
    // Determine status based on dates
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    let status = 'Completed';
    if (now < startDate) status = 'Upcoming';
    else if (now >= startDate && now <= endDate) status = 'Ongoing';
    
    const matchesStatus = statusFilter === 'All status' || status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  }) || [];

  // Format date range
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  // Determine fest status based on dates
  const getFestStatus = () => {
    if (!fest) return 'Unknown';
    const now = new Date();
    const startDate = new Date(fest.startDate);
    const endDate = new Date(fest.endDate);
    if (now < startDate) return 'Upcoming';
    else if (now >= startDate && now <= endDate) return 'Ongoing';
    else return 'Completed';
  };

  if (festLoading || eventsLoading) {
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

  if (festError || eventsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-400">
        <p className="mb-4">Error loading fest data</p>
        <p className="text-gray-400">Please try again later</p>
      </div>
    );
  }

  if (!fest) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <p>Fest not found</p>
      </div>
    );
  }

  return (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">EVENT DASHBOARD</h1>
        </div>
        <p className="text-gray-400">Manage all events for {fest.name}</p>
      </div>

      {/* Fest Info Card */}
      <div className="bg-[#1B1B1B] rounded-lg p-6 mb-8 w-full min-w-120 ">
        <div className="flex items-center justify-between">
          <div className=''>
            <h2 className="text-2xl font-bold mb-2 ">{fest.name}</h2>
            <p className="text-gray-400 mb-2">{fest.about || 'No description available'}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {fest.venue || fest.city}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDateRange(fest.startDate, fest.endDate)}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold  ${getStatusColor(getFestStatus())}`}>
                {getFestStatus()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Registration Progress</p>
            {registrationLoading ? (
              <div className="text-sm text-gray-400">Loading...</div>
            ) : registrationCount ? (
              <>
                <p className="text-2xl font-bold">{registrationCount.data.totalRegistrations}</p>
                <div className="text-sm text-gray-400">
                  <div>✓ {registrationCount.data.confirmedCount} confirmed</div>
                  <div>⏳ {registrationCount.data.pendingCount} pending</div>
                  <div>❌ {registrationCount.data.cancelledCount} cancelled</div>
                </div>
                <div className="w-32 bg-gray-600 rounded-full h-2 mt-1">
                  <div
                    className="bg-[#E1FF01] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(registrationCount.data.confirmedCount, registrationCount.data.totalRegistrations)}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-400">No registration data</div>
            )}
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
          <option>Sports</option>
          <option>Workshop</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-3 bg-[#1B1B1B] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
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
        <div className="bg-[#1B1B1B] rounded-lg min-w-[800px]">
          {/* Table Header */}
          <div className="bg-[#313131] px-6 py-4 grid grid-cols-6 gap-4 font-semibold text-xs sm:text-sm">
            <div>Event details</div>
            <div>Category</div>
            <div>Status</div>
            <div>Registrations</div>
            <div>Price</div>
            <div>Action</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-700 text-xs sm:text-sm">
            {filteredEvents.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-400">
                No events found matching your criteria
              </div>
            ) : (
              filteredEvents.map((event: Event) => {
                // Determine status based on dates
                const now = new Date();
                const startDate = new Date(event.startDate);
                const endDate = new Date(event.endDate);
                let status = 'Completed';
                if (now < startDate) status = 'Upcoming';
                else if (now >= startDate && now <= endDate) status = 'Ongoing';

                return (
                  <EventRow
                    key={event.id}
                    event={event}
                    getCategoryColor={getCategoryColor}
                    getStatusColor={getStatusColor}
                    getProgressPercentage={getProgressPercentage}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Add Event Button */}
      <div className="mt-8 text-center">
        <Link href={`/fests/${festId}/add-event`} className="bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 mx-auto focus:outline-none focus:ring-2 focus:ring-pink-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Event
        </Link >
      </div>
    </>
  );
};

export default FestDashboard; 