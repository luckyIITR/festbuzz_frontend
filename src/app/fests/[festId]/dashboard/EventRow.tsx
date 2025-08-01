import React from 'react';

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

interface EventRowProps {
  event: EventEntry;
  getCategoryColor: (category: string) => string;
  getStatusColor: (status: string) => string;
  getProgressPercentage: (current: number, max: number) => number;
}

const EventRow: React.FC<EventRowProps> = ({ event, getCategoryColor, getStatusColor, getProgressPercentage }) => (
  <div className="px-6 py-6 grid grid-cols-6 gap-4 items-center">
    {/* Event Details */}
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-lg">{event.name}</h3>
        {event.isTeamEvent && (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-500 text-white">
            Team ({event.teamSize})
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm">{event.description}</p>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {event.location}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {event.date} at {event.time}
      </div>
    </div>
    {/* Category */}
    <div>
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(event.category)}`}>
        {event.category}
      </span>
    </div>
    {/* Status */}
    <div>
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(event.status)}`}>
        {event.status}
      </span>
    </div>
    {/* Registrations */}
    <div>
      <p className="font-bold">{event.registrations.current}/{event.registrations.max}</p>
      <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
        <div 
          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${getProgressPercentage(event.registrations.current, event.registrations.max)}%` }}
        ></div>
      </div>
    </div>
    {/* Price */}
    <div>
      <p className="font-bold">Rs. {event.price}</p>
      <p className="text-sm text-gray-400">Entry fee</p>
    </div>
    {/* Action */}
    <div className="space-y-2">
      <button className="w-full bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
        Edit event
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
    </div>
  </div>
);

export default EventRow; 