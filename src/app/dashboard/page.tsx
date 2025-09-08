'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import pinkdiamond from '../../../public/assets/PinkDiamond.png'
import { useUserFestivals } from '@/hooks/team';
import { useFests, usePublishFest, useUnpublishFest, useArchiveFest } from '@/hooks/fest';
import { useMultipleRegistrationCounts } from '@/hooks/registration';
import { UserFestival } from '@/types/team';
import type { Fest, RegistrationCount } from '@/types/fest';
import { RouteGuard } from '../../components/RouteGuard';
import { useAuth } from '@/contexts/AuthContext';

type DashboardFest = Partial<Fest> & {
  _id?: string;
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  venue?: string;
  college?: string;
};

function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All categories');
  const [statusFilter, setStatusFilter] = useState('All status');
  const { user } = useAuth();
  const [publishError, setPublishError] = useState<string | null>(null);
  const [archiveError, setArchiveError] = useState<string | null>(null);

  // Check if user is superadmin or admin - they can view all festivals
  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';
  
  // Use different data sources based on user role
  const { data: userFestivals, isLoading: isLoadingUserFests, error: userFestsError } = useUserFestivals(user?.id || '', 1, 100);
  const { data: allFests, isLoading: isLoadingAllFests, error: allFestsError } = useFests();
  
  // Determine which data to use
  const isLoading = isSuperAdmin ? isLoadingAllFests : isLoadingUserFests;
  const error = isSuperAdmin ? allFestsError : userFestsError;
  
  // Extract fest data based on user role
  const fests: DashboardFest[] = isSuperAdmin 
    ? (allFests || [])
    : (userFestivals?.data?.map((userFest: UserFestival) => ({
        ...userFest.festId,
        id: userFest.festId._id,
      })) || []);
  
  // Publish / Unpublish mutations (superadmin/admin only)
  const publishFest = usePublishFest();
  const unpublishFest = useUnpublishFest();
  const archiveFest = useArchiveFest();

  const handleTogglePublish = (fest: DashboardFest) => {
    if (!isSuperAdmin) return;
    if (!fest?._id && !fest?.id) return;
    if (fest.status === 'archived') return; // archived cannot be toggled
    const festId = (fest.id || fest._id) as string;
    setPublishError(null);
    const isPublished = fest.status === 'published';
    if (isPublished) {
      unpublishFest.mutate(festId, {
        onError: (err: unknown) => setPublishError(err instanceof Error ? err.message : 'Failed to unpublish fest'),
      });
    } else {
      publishFest.mutate(festId, {
        onError: (err: unknown) => setPublishError(err instanceof Error ? err.message : 'Failed to publish fest'),
      });
    }
  };

  const handleArchive = (fest: DashboardFest) => {
    if (!isSuperAdmin) return;
    if (!fest?._id && !fest?.id) return;
    if (fest.status === 'archived') return;
    const festId = (fest.id || fest._id) as string;
    setArchiveError(null);
    archiveFest.mutate(festId, {
      onError: (err: unknown) => setArchiveError(err instanceof Error ? err.message : 'Failed to archive fest'),
    });
  };

  // Get registration counts for all fests
  const festIds = (fests?.map((fest: DashboardFest) => fest._id || fest.id || '').filter(Boolean) as string[]) || [];
  const { data: registrationCounts, isLoading: isLoadingRegistrations } = useMultipleRegistrationCounts(festIds);

  // Calculate summary stats from real data
  const summaryStats = [
    { 
      label: 'Total fests', 
      value: fests ? fests.length.toString() : '0', 
      icon: '🎪' 
    },
    { 
      label: 'Active fests', 
      value: fests ? fests.filter((fest: DashboardFest) => Boolean(fest.isRegistrationOpen)).length.toString() : '0', 
      icon: '🔥' 
    },
    { 
      label: 'Total registrations', 
      value: registrationCounts ? registrationCounts.reduce((total: number, reg: RegistrationCount & { festId: string }) => total + reg.totalRegistrations, 0).toString() : '0', 
      icon: '👥' 
    },
    { 
      label: 'Total revenue', 
      value: fests ? fests.reduce((total: number, fest: DashboardFest) => total + (fest.tickets?.[0]?.price || 0), 0).toString() : '0', 
      icon: '💰' 
    }
  ];

  const getProgressPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  // Helper function to get registration count for a specific fest
  const getRegistrationCount = (festId: string) => {
    if (!registrationCounts) return null;
    return registrationCounts.find(reg => reg.festId === festId);
  };

  // Filter fests based on search and filters
  const filteredFests = fests?.filter((fest: DashboardFest) => {
    const matchesSearch = (fest.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (fest.college || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (fest.venue || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (fest.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All categories' || fest.type === categoryFilter;
    
    // Determine status based on dates
    const now = new Date();
    const startDate = new Date(fest.startDate);
    const endDate = new Date(fest.endDate);
    let status = 'Completed';
    if (now < startDate) status = 'Upcoming';
    else if (now >= startDate && now <= endDate) status = 'Ongoing';
    
    const matchesStatus = statusFilter === 'All status' || status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  }) || [];

  // Show archived fests at the end
  const tableFests = [...filteredFests].sort((a: DashboardFest, b: DashboardFest) => {
    const aArchived = a.status === 'archived' ? 1 : 0;
    const bArchived = b.status === 'archived' ? 1 : 0;
    return aArchived - bArchived;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>Loading fests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading fests</p>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Image src={pinkdiamond} alt='' className='w-7 '/>
              <h1 className="text-3xl font-bold">DASHBOARD</h1>
            </div>
            <Link 
              href="/fests/add" 
              className="bg-[#FD3EB5] hover:bg-[#E91E63] text-white px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Fest
            </Link>
          </div>
          <p className="text-gray-400">
            {isSuperAdmin 
              ? "Manage all festivals and their events" 
              : "Manage your assigned festivals and their events"
            }
          </p>
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
            <option>Sports</option>
            <option>Others</option>
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
            <div className="bg-[#313131] px-6 py-4 grid grid-cols-6 gap-4 font-semibold text-xs sm:text-sm">
              <div>Fest details</div>
              <div>Your Role</div>
              <div>Status</div>
              <div>Events</div>
              <div>Registrations</div>
              <div>Action</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-700 text-xs sm:text-sm">
              {filteredFests.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-400">
                  {isSuperAdmin 
                    ? (allFests?.length === 0 ? "No festivals exist yet" : "No fests found matching your criteria")
                    : (userFestivals?.data?.length === 0 ? 
                        "You haven't been assigned to any festivals yet" : 
                        "No fests found matching your criteria"
                      )
                  }
                </div>
              ) : (
                tableFests.map((fest: DashboardFest) => {
                  // Determine status based on dates
                  const now = new Date();
                  const startDate = new Date(fest.startDate);
                  const endDate = new Date(fest.endDate);
                  let status = 'Completed';
                  if (now < startDate) status = 'Upcoming';
                  else if (now >= startDate && now <= endDate) status = 'Ongoing';

                  // Format date range
                  const formatDateRange = (start: string, end: string) => {
                    const startDate = new Date(start);
                    const endDate = new Date(end);
                    return `${startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
                  };

                  // Get registration count for this fest
                  const registrationCount = getRegistrationCount(fest.id || fest._id || '');
                  
                  // Get user's role in this festival
                  const userFestival = userFestivals?.data?.find((uf: UserFestival) => uf.festId._id === fest._id);
                  const userRole = isSuperAdmin 
                    ? (userFestival?.role || 'System Admin') 
                    : (userFestival?.role || 'No role');

                  return (
                    <div
                      key={fest.id || fest._id}
                      className={`px-6 py-6 grid grid-cols-6 gap-4 items-center ${fest.status === 'archived' ? 'opacity-60' : ''}`}
                    >
                      {/* Fest Details */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{fest.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            fest.type === 'Technical' ? 'bg-[#E1FF01] text-black' : 'bg-[#FD3EB5] text-white'
                          }`}>
                            {fest.type}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{fest.about?.slice(0, 50) || 'No description available'}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {fest.venue || fest.city}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDateRange(fest.startDate, fest.endDate)}
                        </div>
                      </div>

                      {/* Your Role */}
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          userRole === 'System Admin' 
                            ? 'bg-red-600 text-white' 
                            : userRole === 'festival head' 
                            ? 'bg-purple-600 text-white' 
                            : userRole === 'event manager'
                            ? 'bg-blue-600 text-white'
                            : userRole === 'event coordinator'
                            ? 'bg-green-600 text-white'
                            : userRole === 'event volunteer'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-600 text-white'
                        }`}>
                          {userRole}
                        </span>
                      </div>

                      {/* Status */}
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          status === 'Upcoming' 
                            ? 'bg-blue-600 text-white' 
                            : status === 'Ongoing'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 text-white'
                        }`}>
                          {status}
                        </span>
                      </div>


                      {/* Events */}
                      <div>
                        <p className="font-bold">{fest.events?.length || 0} events</p>
                        <p className="text-sm text-gray-400">₹{fest.tickets?.[0]?.price || 0} entry fee</p>
                      </div>

                      {/* Registrations */}
                      <div>
                        {isLoadingRegistrations ? (
                          <div className="text-sm text-gray-400">Loading...</div>
                        ) : registrationCount ? (
                          <div>
                            <p className="font-bold">{registrationCount.totalRegistrations} total</p>
                            <div className="text-sm text-gray-400">
                              <div>✓ {registrationCount.confirmedCount} confirmed</div>
                              <div>⏳ {registrationCount.pendingCount} pending</div>
                              <div>❌ {registrationCount.cancelledCount} cancelled</div>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                              <div 
                                className="bg-[#E1FF01] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getProgressPercentage(registrationCount.confirmedCount, registrationCount.totalRegistrations)}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="font-bold">No data</p>
                            <p className="text-sm text-gray-400">Registration info unavailable</p>
                          </div>
                        )}
                      </div>

                      {/* Action */}
                      <div className="space-y-2">
                        <Link href={`/fests/${fest.id || fest._id}/dashboard`} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                          Manage Fest
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                          </svg>
                        </Link>
                        <Link href={`/fests/${fest.id || fest._id}/add-event`} className="w-full bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                          Add event +
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </Link>
                        {isSuperAdmin && (
                          <div className="pt-1">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleTogglePublish(fest)}
                                disabled={publishFest.isPending || unpublishFest.isPending || fest.status === 'archived'}
                                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                                  fest.status === 'published' ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-gray-600 hover:bg-gray-500 text-white'
                                } disabled:opacity-60`}
                                title={fest.status === 'published' ? 'Unpublish fest' : 'Publish fest'}
                              >
                                {fest.status === 'published' ? 'Unpublish' : 'Publish'}
                              </button>
                              <button
                                onClick={() => handleArchive(fest)}
                                disabled={archiveFest.isPending || fest.status === 'archived'}
                                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                                  fest.status === 'archived' ? 'bg-yellow-700 text-white' : 'bg-yellow-600 hover:bg-yellow-500 text-black'
                                } disabled:opacity-60`}
                                title={fest.status === 'archived' ? 'Archived' : 'Archive fest'}
                              >
                                {fest.status === 'archived' ? 'Archived' : 'Archive'}
                              </button>
                            </div>
                            {(publishError || archiveError) && (
                              <div className="mt-1 text-[11px] text-red-400">{publishError || archiveError}</div>
                            )}
                          </div>
                        )}
                        {!isSuperAdmin && fest.status === 'draft' && (
                          <div className="text-[11px] text-gray-400 mt-1">Drafts are not visible in Explore/My Fest</div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <RouteGuard requiredPermissions={['manage_fests', 'create_fests']}>
      <DashboardContent />
    </RouteGuard>
  );
} 