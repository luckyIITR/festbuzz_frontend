'use client';
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  MapPin,
  Clock
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

interface Fest {
  id: string;
  name: string;
  organizer: string;
  college: string;
  description: string;
  about?: string;
  venue?: string;
  city?: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'draft';
  type: string;
  totalEvents: number;
  totalRegistrations: number;
  totalRevenue: number;
  entryFee: number;
  location: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
  maxParticipants: number;
  categories: string[];
  featured: boolean;
}

const mockFests: Fest[] = [
  {
    id: '1',
    name: 'TechFest 2025',
    organizer: 'IIT Roorkee',
    college: 'IIT Roorkee',
    description: 'Annual technical festival featuring hackathons, workshops, and competitions',
    startDate: '2025-03-15',
    endDate: '2025-03-17',
    status: 'upcoming',
    type: 'Technical',
    totalEvents: 12,
    totalRegistrations: 450,
    totalRevenue: 225000,
    entryFee: 1000,
    location: 'IIT Roorkee Campus',
    website: 'https://techfest.iitr.ac.in',
    contactEmail: 'techfest@iitr.ac.in',
    contactPhone: '+91 98765 43210',
    maxParticipants: 500,
    categories: ['Technical', 'Workshop', 'Competition'],
    featured: true
  },
  {
    id: '2',
    name: 'Cultural Fest 2025',
    organizer: 'IIT Delhi',
    college: 'IIT Delhi',
    description: 'Celebration of arts, music, dance, and cultural diversity',
    startDate: '2025-04-10',
    endDate: '2025-04-12',
    status: 'upcoming',
    type: 'Cultural',
    totalEvents: 8,
    totalRegistrations: 320,
    totalRevenue: 160000,
    entryFee: 800,
    location: 'IIT Delhi Campus',
    website: 'https://culturalfest.iitd.ac.in',
    contactEmail: 'culturalfest@iitd.ac.in',
    contactPhone: '+91 98765 43211',
    maxParticipants: 400,
    categories: ['Cultural', 'Music', 'Dance'],
    featured: false
  },
  {
    id: '3',
    name: 'Sports Fest 2025',
    organizer: 'IIT Bombay',
    college: 'IIT Bombay',
    description: 'Inter-college sports competition with multiple disciplines',
    startDate: '2025-02-20',
    endDate: '2025-02-22',
    status: 'completed',
    type: 'Sports',
    totalEvents: 15,
    totalRegistrations: 600,
    totalRevenue: 300000,
    entryFee: 500,
    location: 'IIT Bombay Campus',
    contactEmail: 'sportsfest@iitb.ac.in',
    contactPhone: '+91 98765 43212',
    maxParticipants: 800,
    categories: ['Sports', 'Competition'],
    featured: false
  },
  {
    id: '4',
    name: 'Innovation Summit 2025',
    organizer: 'IIT Kanpur',
    college: 'IIT Kanpur',
    description: 'Showcasing innovative projects and startup ideas',
    startDate: '2025-05-15',
    endDate: '2025-05-16',
    status: 'draft',
    type: 'Innovation',
    totalEvents: 6,
    totalRegistrations: 0,
    totalRevenue: 0,
    entryFee: 1200,
    location: 'IIT Kanpur Campus',
    contactEmail: 'innovationsummit@iitk.ac.in',
    contactPhone: '+91 98765 43213',
    maxParticipants: 300,
    categories: ['Technical', 'Innovation', 'Startup'],
    featured: true
  }
];

const festPerformanceData = [
  { month: 'Jan', registrations: 120, revenue: 60000 },
  { month: 'Feb', registrations: 180, revenue: 90000 },
  { month: 'Mar', registrations: 250, revenue: 125000 },
  { month: 'Apr', registrations: 320, revenue: 160000 },
  { month: 'May', registrations: 280, revenue: 140000 },
  { month: 'Jun', registrations: 350, revenue: 175000 }
];

const categoryDistribution = [
  { category: 'Technical', fests: 8, percentage: 40 },
  { category: 'Cultural', fests: 6, percentage: 30 },
  { category: 'Sports', fests: 4, percentage: 20 },
  { category: 'Innovation', fests: 2, percentage: 10 }
];

export default function FestManagement() {
  const [fests] = useState<Fest[]>(mockFests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredFests = fests.filter(fest => {
    const matchesSearch = fest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fest.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fest.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || fest.status === statusFilter;
            const matchesCategory = categoryFilter === 'all' || fest.type === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'Cultural': return 'bg-purple-100 text-purple-800';
      case 'Sports': return 'bg-green-100 text-green-800';
      case 'Innovation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalFests = fests.length;
  const activeFests = fests.filter(f => f.status === 'upcoming' || f.status === 'ongoing').length;
  const totalRegistrations = fests.reduce((sum, fest) => sum + fest.totalRegistrations, 0);
  const totalRevenue = fests.reduce((sum, fest) => sum + fest.totalRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Fest Management</h1>
          <p className="text-gray-400 mt-1">Manage all fests and their events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus size={16} />
          Create New Fest
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search fests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="draft">Draft</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Innovation">Innovation</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Fests</p>
              <p className="text-2xl font-bold text-white">{totalFests}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-600">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Fests</p>
              <p className="text-2xl font-bold text-white">{activeFests}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-600">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Registrations</p>
              <p className="text-2xl font-bold text-white">{totalRegistrations}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-600">
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
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Fest Performance</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={festPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
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

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Category Distribution</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <div className="space-y-4">
            {categoryDistribution.map((category) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-white font-medium">{category.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">{category.fests} fests</span>
                  <span className="text-blue-400">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fests Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-white">All Fests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Fest Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Organizer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Events
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
              {filteredFests.map((fest) => (
                <tr key={fest.id} className="hover:bg-zinc-800 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-white">{fest.name}</div>
                        {fest.featured && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{fest.about}</div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {fest.venue || fest.city}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(fest.startDate).toLocaleDateString()} - {new Date(fest.endDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {fest.type && (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(fest.type)}`}>
                            {fest.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">{fest.organizer}</div>
                      <div className="text-sm text-gray-400">{fest.college}</div>
                      <div className="text-xs text-gray-500">{fest.contactEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(fest.status)}`}>
                      {fest.status.charAt(0).toUpperCase() + fest.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{fest.totalEvents} events</div>
                    <div className="text-sm text-gray-400">₹{fest.entryFee} entry fee</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">{fest.totalRegistrations}/{fest.maxParticipants}</div>
                      <div className="w-16 bg-zinc-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(fest.totalRegistrations / fest.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ₹{fest.totalRevenue.toLocaleString()}
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