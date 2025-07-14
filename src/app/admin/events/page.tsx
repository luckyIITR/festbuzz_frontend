'use client';
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Award,
  Calendar,
  Users,
  DollarSign
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface Event {
  id: string;
  name: string;
  festName: string;
  festId: string;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrations: number;
  maxParticipants: number;
  revenue: number;
  entryFee: number;
  organizer: string;
  location: string;
  type: 'individual' | 'team' | 'both';
  teamSize?: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Hackathon',
    festName: 'TechFest 2025',
    festId: '1',
    category: 'Technical',
    description: '24-hour coding competition with exciting prizes',
    startDate: '2025-03-15',
    endDate: '2025-03-16',
    status: 'upcoming',
    registrations: 45,
    maxParticipants: 50,
    revenue: 22500,
    entryFee: 500,
    organizer: 'IIT Roorkee',
    location: 'Main Auditorium',
    type: 'team',
    teamSize: 4
  },
  {
    id: '2',
    name: 'Dance Competition',
    festName: 'Cultural Fest 2025',
    festId: '2',
    category: 'Cultural',
    description: 'Inter-college dance competition',
    startDate: '2025-04-10',
    endDate: '2025-04-10',
    status: 'upcoming',
    registrations: 32,
    maxParticipants: 40,
    revenue: 16000,
    entryFee: 500,
    organizer: 'IIT Delhi',
    location: 'Open Air Theatre',
    type: 'both'
  },
  {
    id: '3',
    name: 'Singing Contest',
    festName: 'Cultural Fest 2025',
    festId: '2',
    category: 'Cultural',
    description: 'Solo and group singing competition',
    startDate: '2025-04-11',
    endDate: '2025-04-11',
    status: 'upcoming',
    registrations: 28,
    maxParticipants: 35,
    revenue: 14000,
    entryFee: 400,
    organizer: 'IIT Delhi',
    location: 'Auditorium',
    type: 'individual'
  },
  {
    id: '4',
    name: 'Quiz Competition',
    festName: 'TechFest 2025',
    festId: '1',
    category: 'Technical',
    description: 'General knowledge and technical quiz',
    startDate: '2025-03-17',
    endDate: '2025-03-17',
    status: 'upcoming',
    registrations: 60,
    maxParticipants: 60,
    revenue: 30000,
    entryFee: 500,
    organizer: 'IIT Roorkee',
    location: 'Seminar Hall',
    type: 'team',
    teamSize: 3
  },
  {
    id: '5',
    name: 'Art Exhibition',
    festName: 'Cultural Fest 2025',
    festId: '2',
    category: 'Cultural',
    description: 'Display of student artwork',
    startDate: '2025-04-12',
    endDate: '2025-04-12',
    status: 'upcoming',
    registrations: 15,
    maxParticipants: 20,
    revenue: 7500,
    entryFee: 500,
    organizer: 'IIT Delhi',
    location: 'Gallery',
    type: 'individual'
  }
];

const eventPerformanceData = [
  { category: 'Technical', registrations: 105, revenue: 52500 },
  { category: 'Cultural', registrations: 75, revenue: 37500 },
  { category: 'Sports', registrations: 45, revenue: 22500 },
  { category: 'Workshop', registrations: 30, revenue: 15000 }
];

export default function EventManagement() {
  const [events] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [festFilter, setFestFilter] = useState<string>('all');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.festName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesFest = festFilter === 'all' || event.festId === festFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesFest;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'Cultural': return 'bg-purple-100 text-purple-800';
      case 'Sports': return 'bg-green-100 text-green-800';
      case 'Workshop': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEvents = events.length;
  const totalRegistrations = events.reduce((sum, event) => sum + event.registrations, 0);
  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);
  const upcomingEvents = events.filter(event => event.status === 'upcoming').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Event Management</h1>
          <p className="text-gray-400 mt-1">Manage all events across all fests</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus size={16} />
          Add New Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Workshop">Workshop</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={festFilter}
          onChange={(e) => setFestFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Fests</option>
          <option value="1">TechFest 2025</option>
          <option value="2">Cultural Fest 2025</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Events</p>
              <p className="text-2xl font-bold text-white">{totalEvents}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-600">
              <Award size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Registrations</p>
              <p className="text-2xl font-bold text-white">{totalRegistrations}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-600">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-600">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Upcoming Events</p>
              <p className="text-2xl font-bold text-white">{upcomingEvents}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-600">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Event Performance Chart */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Event Performance by Category</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="category" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="registrations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Events Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-white">All Events</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Fest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Registrations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-zinc-800 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{event.name}</div>
                      <div className="text-sm text-gray-400">{event.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {event.festName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">{event.registrations}/{event.maxParticipants}</div>
                      <div className="w-16 bg-zinc-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(event.registrations / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ₹{event.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 