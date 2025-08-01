'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useMyFests } from '@/hooks/useMyFests';
import { useRecentlyViewedFests } from '@/hooks/useRecentlyViewedFests';
import { useWishlistFests } from '@/hooks/useWishlistFests';
import { useRegisteredFests } from '@/hooks/useRegisteredFests';
import { useRecommendedFests } from '@/hooks/useRecommendedFests';
import { Fest } from '@/types/fest';
import FestCard from '../components/FestCard';
import EventCard from '../components/EventCard';
import GradientFestCard from '../components/GradientFestCard';
const tabs = ['Upcoming', 'On Going', 'Past'];
const secondaryTabs = ['Recently viewed', 'Wishlist', 'Registered'];

function FiltersSidebar() {
  const filters = ['Fest type', 'Date', 'Price', 'Ratings', 'Location'];
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-zinc-900 rounded-2xl md:p-6 p-5 shadow-lg mb-8">
        <h3 className="font-bold text-lg mb-4">FILTERS</h3>
        <div className="flex md:flex-col gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 pb-4">
          {filters.map((filter) => (
            <select key={filter} className="bg-zinc-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400">
              <option>{filter}</option>
            </select>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function MyFestPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSecondaryTab, setActiveSecondaryTab] = useState(0);

  const { data: myFests, isLoading: isLoadingMyFests, error: errorMyFests } = useMyFests() as {
    data: { upcoming: Fest[]; ongoing: Fest[]; past: Fest[] } | undefined;
    isLoading: boolean;
    error: Error | string | null;
  };
  const { data: recentlyViewed, isLoading: isLoadingRecently, error: errorRecently } = useRecentlyViewedFests() as {
    data: Fest[] | undefined;
    isLoading: boolean;
    error: Error | string | null;
  };
  const { data: wishlist, isLoading: isLoadingWishlist, error: errorWishlist } = useWishlistFests() as {
    data: Fest[] | undefined;
    isLoading: boolean;
    error: Error | string | null;
  };
  const { data: registered, isLoading: isLoadingRegistered, error: errorRegistered } = useRegisteredFests() as {
    data: Fest[] | undefined;
    isLoading: boolean;
    error: Error | string | null;
  };
  const { data: recommended, isLoading: isLoadingRecommended, error: errorRecommended } = useRecommendedFests() as {
    data: Fest[] | undefined;
    isLoading: boolean;
    error: Error | string | null;
  };

  // Defensive: always use arrays for mapping
  const safeUpcoming: Fest[] = Array.isArray(myFests?.upcoming) ? myFests!.upcoming : [];
  const safeOngoing: Fest[] = Array.isArray(myFests?.ongoing) ? myFests!.ongoing : [];
  const safePast: Fest[] = Array.isArray(myFests?.past) ? myFests!.past : [];
  const mainCards: Fest[] = activeTab === 0 ? safeUpcoming : activeTab === 1 ? safeOngoing : safePast;

  const safeRecentlyViewed: Fest[] = Array.isArray(recentlyViewed) ? recentlyViewed : [];
  const safeWishlist: Fest[] = Array.isArray(wishlist) ? wishlist : [];
  const safeRegistered: Fest[] = Array.isArray(registered) ? registered : [];
  const safeRecommended: Fest[] = Array.isArray(recommended) ? recommended : [];

  let secondaryCards: Fest[] = safeRecentlyViewed;
  let isLoadingSecondary = isLoadingRecently;
  let errorSecondary = errorRecently;
  if (activeSecondaryTab === 1) {
    secondaryCards = safeWishlist;
    isLoadingSecondary = isLoadingWishlist;
    errorSecondary = errorWishlist;
  }
  if (activeSecondaryTab === 2) {
    secondaryCards = safeRegistered;
    isLoadingSecondary = isLoadingRegistered;
    errorSecondary = errorRegistered;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 flex flex-col">
        {/* Main Tabs */}
        <div className="flex space-x-2 mb-8 mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`px-8 py-2 rounded-full font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0057FF] ${idx === activeTab
                  ? 'bg-[#0057FF] text-white shadow-lg'
                  : 'bg-[#23252B] text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-col md:flex-row flex-1 gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Fest Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mb-12 ">
              {isLoadingMyFests && <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center">Loading...</div>}
              {errorMyFests && (
                typeof errorMyFests === 'string' ? (
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-red-400">{errorMyFests}</div>
                ) : errorMyFests instanceof Error ? (
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-red-400">{errorMyFests.message}</div>
                ) : null
              )}
              {mainCards.length === 0 && !isLoadingMyFests && !errorMyFests && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-gray-400 py-12">No fests found in this section.</div>
              )}
              {mainCards.map((card: Fest, idx: number) => (
                  <GradientFestCard fest={card} />
              ))}
            </div>

            {/* Secondary Tabs */}
            <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700">
              {secondaryTabs.map((tab, idx) => (
                <button
                  key={tab}
                  onClick={() => setActiveSecondaryTab(idx)}
                  className={`px-8 py-2 rounded-full font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3EB2] ${idx === activeSecondaryTab
                      ? 'bg-[#FF3EB2] text-white shadow-lg'
                      : 'bg-[#23252B] text-white'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Recently Viewed/Wishlist/Registered Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mb-12">
              {isLoadingSecondary && <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center">Loading...</div>}
              {errorSecondary && (
                typeof errorSecondary === 'string' ? (
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-red-400">{errorSecondary}</div>
                ) : errorSecondary instanceof Error ? (
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-red-400">{errorSecondary.message}</div>
                ) : null
              )}
              {secondaryCards.length === 0 && !isLoadingSecondary && !errorSecondary && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-gray-400 py-12">No fests found in this section.</div>
              )}
              {secondaryCards.map((card: Fest, idx: number) => (
                  <GradientFestCard fest={card} />
              ))}
            </div>

            {/* Recommend For You */}
            <div className="flex items-center mb-4">
              <span className="text-pink-400 text-2xl mr-2">◆</span>
              <h2 className="text-2xl font-bold text-white tracking-wide">RECOMMEND FOR YOU</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mb-12">
              {isLoadingRecommended && <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center">Loading...</div>}
              {errorRecommended && (
                typeof errorRecommended === 'string' ? (
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-red-400">{errorRecommended}</div>
                ) : errorRecommended instanceof Error ? (
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-red-400">{errorRecommended.message}</div>
                ) : null
              )}
              {safeRecommended.length === 0 && !isLoadingRecommended && !errorRecommended && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-gray-400 py-12">No fests found in this section.</div>
              )}
              {safeRecommended.map((card: Fest, idx: number) => (
                  <FestCard fest={card} />
              ))}
            </div>
          </div>
          {/* Filters Sidebar */}
          <FiltersSidebar />
        </div>
      </div>
    </div>
  );
}
