'use client';
import { useState, useEffect } from 'react';

interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  status: 'Registered' | 'Checked In' | 'Cancelled';
}

const mockAttendees: Attendee[] = [
  { id: '1', name: 'Aman Sharma', email: 'aman@example.com', phone: '9876543210', college: 'IIT Roorkee', status: 'Registered' },
  { id: '2', name: 'Priya Singh', email: 'priya@example.com', phone: '9123456780', college: 'IIT Delhi', status: 'Checked In' },
  { id: '3', name: 'Rahul Verma', email: 'rahul@example.com', phone: '9988776655', college: 'IIT Bombay', status: 'Registered' },
  { id: '4', name: 'Sneha Patel', email: 'sneha@example.com', phone: '9871234567', college: 'BITS Pilani', status: 'Cancelled' },
  { id: '5', name: 'Vikram Joshi', email: 'vikram@example.com', phone: '9001122334', college: 'IIT Kanpur', status: 'Checked In' },
];

const statusColor = {
  'Registered': 'bg-blue-500',
  'Checked In': 'bg-green-500',
  'Cancelled': 'bg-red-500',
};

export default function AttendeesPage() {
  const [search, setSearch] = useState('');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAttendees(mockAttendees);
      setLoading(false);
    }, 500);
  }, []);

  const filtered = attendees.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.college.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#101010] text-white p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Attendees</h1>
        <p className="text-gray-400">List of all registered participants for this fest</p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-8">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search attendees"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1E1E1E] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          />
        </div>
      </div>
      <div className="bg-[#161616] rounded-lg overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="bg-[#1E1E1E] text-[#E1FF01] px-6 py-4 grid grid-cols-5 gap-4 font-semibold text-xs sm:text-sm">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>College</div>
            <div>Status</div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-10 text-pink-400">Loading attendees...</div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-gray-400">No attendees found.</div>
          ) : (
            filtered.map(a => (
              <div key={a.id} className="px-6 py-4 grid grid-cols-5 gap-4 items-center border-b border-gray-700 last:border-b-0 text-xs sm:text-sm">
                <div className="font-medium">{a.name}</div>
                <div className="text-gray-300">{a.email}</div>
                <div className="text-gray-300">{a.phone}</div>
                <div className="text-gray-300">{a.college}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[a.status]} text-white`}>
                    {a.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 