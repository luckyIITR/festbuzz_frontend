'use client';
import { useState } from 'react';
import { useRecommendedFests } from '@/hooks/useRecommendedFests';
import { Fest } from '@/types/fest';
import FestCard from '@/app/components/FestCard';

const tabs = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Live', value: 'Live' },
  { label: 'Past', value: 'Past' },
];

export default function EventsDashboardPage() {
  const [tab, setTab] = useState('Draft');
  const { data: recommended } = useRecommendedFests() as {
    data: Fest[] | undefined;
    isLoading: boolean;
    error: Error | string | null;
  };
  const safeRecommended: Fest[] = Array.isArray(recommended) ? recommended : [];
  return (
    <div className="min-h-screen bg-[#18191C] text-white relative p-4 md:p-8">
      {/* Tabs */}
      <div className="flex gap-2 bg-black rounded-full p-1 w-full max-w-xl mx-auto mb-8">
        {tabs.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`flex-1 px-6 py-2 rounded-full font-semibold text-lg transition-colors ${tab === t.value ? 'bg-blue-600 text-white' : 'text-gray-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Event Cards */}
      <div className="flex flex-wrap gap-8 justify-start">
        {safeRecommended.map((card: Fest, idx: number) => (
          <FestCard fest={card} key={idx} />
        ))}
      </div>
      {/* Create Event Button */}
      <button className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg flex items-center gap-2 z-50">
        Create event +
      </button>
    </div>
  );
} 