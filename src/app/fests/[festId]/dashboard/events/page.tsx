'use client';
import { useState } from 'react';
import Image from 'next/image';

const mockEvents = [
  {
    id: '1',
    name: 'Dancing on floor..',
    category: 'Event category',
    fest: 'Thombus 25’',
    venue: 'IIT Roorkee',
    date: '14-20 Sep. 2025',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    status: 'Draft',
    active: true,
  },
  {
    id: '2',
    name: 'Dancing on floor..',
    category: 'Event category',
    fest: 'Thombus 25’',
    venue: 'IIT Roorkee',
    date: '14-20 Sep. 2025',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    status: 'Draft',
    active: false,
  },
  {
    id: '3',
    name: 'Dancing on floor..',
    category: 'Event category',
    fest: 'Thombus 25’',
    venue: 'IIT Roorkee',
    date: '14-20 Sep. 2025',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    status: 'Draft',
    active: false,
  },
];

const tabs = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Live', value: 'Live' },
  { label: 'Past', value: 'Past' },
];

export default function EventsDashboardPage() {
  const [tab, setTab] = useState('Draft');
  const events = mockEvents.filter(e => e.status === tab);

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
        {events.map(event => (
          <div key={event.id} className="bg-[#232428] rounded-2xl shadow-lg w-[300px] flex flex-col overflow-hidden relative">
            <div className="h-40 w-full relative">
              <Image src={event.image} alt={event.name} fill className="object-cover w-full h-full" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold truncate max-w-[180px]">{event.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{event.active ? 'Active' : 'Inactive'}</span>
                  <span className={`w-8 h-5 flex items-center rounded-full px-1 ${event.active ? 'bg-yellow-300' : 'bg-gray-700'}`}>
                    <span className={`w-3 h-3 rounded-full transition-all ${event.active ? 'bg-black translate-x-3' : 'bg-gray-400'}`}></span>
                  </span>
                </div>
              </div>
              <div className="text-gray-400 text-xs mb-1">{event.category}</div>
              <div className="text-gray-400 text-xs mb-1">{event.fest}</div>
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <span>📍 {event.venue}</span>
                <span>•</span>
                <span>📅 {event.date}</span>
              </div>
              <button className="mt-auto w-full bg-black text-[#E1FD0C] font-semibold py-2 rounded-xl hover:bg-gray-900 transition-colors text-base">View details</button>
            </div>
          </div>
        ))}
      </div>
      {/* Create Event Button */}
      <button className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg flex items-center gap-2 z-50">
        Create event +
      </button>
    </div>
  );
} 