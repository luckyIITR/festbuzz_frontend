'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFestCandidates } from '@/hooks/user';
import { Candidate } from '@/types/fest';

const statusColor = {
  'confirmed': 'bg-green-500',
  'pending': 'bg-yellow-500',
  'cancelled': 'bg-red-500',
};

export default function AttendeesPage() {
  const params = useParams();
  const festId = params.festId as string;
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'confirmed' | 'pending' | 'cancelled' | ''>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Get candidates with filters
  const { data: candidatesData, isLoading, error } = useFestCandidates(festId, {
    search: search || undefined,
    status: statusFilter || undefined,
    page: currentPage,
    limit: 50
  });

  const candidates = candidatesData?.data.candidates || [];
  const pagination = candidatesData?.data.pagination;

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleStatusFilter = (status: 'confirmed' | 'pending' | 'cancelled' | '') => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#101010] text-white p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Attendees</h1>
          <p className="text-red-400">Error loading attendees: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010] text-white p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Attendees</h1>
        <p className="text-gray-400">
          {candidatesData?.data.festName ? `${candidatesData.data.festName} - ` : ''}
          List of all registered participants for this fest
        </p>
        {pagination && (
          <p className="text-sm text-gray-500 mt-2">
            Showing {candidates.length} of {pagination.totalItems} attendees
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-8">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search attendees by name, email, phone, college, city..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1E1E1E] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          />
        </div>
        
        {/* Status Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusFilter('')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              statusFilter === '' 
                ? 'bg-pink-500 text-white' 
                : 'bg-[#1E1E1E] text-gray-300 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleStatusFilter('confirmed')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              statusFilter === 'confirmed' 
                ? 'bg-green-500 text-white' 
                : 'bg-[#1E1E1E] text-gray-300 hover:bg-gray-700'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => handleStatusFilter('pending')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              statusFilter === 'pending' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-[#1E1E1E] text-gray-300 hover:bg-gray-700'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleStatusFilter('cancelled')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              statusFilter === 'cancelled' 
                ? 'bg-red-500 text-white' 
                : 'bg-[#1E1E1E] text-gray-300 hover:bg-gray-700'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Attendees Table */}
      <div className="bg-[#161616] rounded-lg overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-[#1E1E1E] text-[#E1FF01] px-6 py-4 grid grid-cols-7 gap-4 font-semibold text-xs sm:text-sm">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>College</div>
            <div>City</div>
            <div>Status</div>
            <div>Ticket</div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-10 text-pink-400">
              Loading attendees...
            </div>
          ) : candidates.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-gray-400">
              No attendees found.
            </div>
          ) : (
            <>
              {candidates.map((candidate: Candidate) => (
                <div key={candidate.registrationId} className="px-6 py-4 grid grid-cols-7 gap-4 items-center border-b border-gray-700 last:border-b-0 text-xs sm:text-sm">
                  <div className="font-medium">{candidate.name}</div>
                  <div className="text-gray-300">{candidate.email}</div>
                  <div className="text-gray-300">{candidate.phone}</div>
                  <div className="text-gray-300">{candidate.college}</div>
                  <div className="text-gray-300">{candidate.city}, {candidate.state}</div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[candidate.registrationStatus]} text-white`}>
                      {candidate.registrationStatus}
                    </span>
                  </div>
                  <div className="text-gray-300 font-mono text-xs">{candidate.ticket}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrev}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pagination.hasPrev
                  ? 'bg-[#1E1E1E] text-white hover:bg-gray-700'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNext}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pagination.hasNext
                  ? 'bg-[#1E1E1E] text-white hover:bg-gray-700'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 