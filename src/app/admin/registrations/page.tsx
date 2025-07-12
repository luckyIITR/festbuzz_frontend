'use client';
import { useState } from 'react';
import { 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  UserCheck,
  DollarSign,
  Download,
  CheckCircle,
  XCircle,
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

interface Registration {
  id: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  festId: string;
  festName: string;
  eventId?: string;
  eventName?: string;
  registrationType: 'fest' | 'event';
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  registrationDate: string;
  teamSize?: number;
  teamMembers?: string[];
  college: string;
  phone: string;
}

const mockRegistrations: Registration[] = [
  {
    id: '1',
    participantId: '1',
    participantName: 'John Doe',
    participantEmail: 'john.doe@example.com',
    festId: '1',
    festName: 'TechFest 2025',
    eventId: '1',
    eventName: 'Hackathon',
    registrationType: 'event',
    status: 'confirmed',
    amount: 500,
    paymentStatus: 'completed',
    registrationDate: '2024-12-15',
    teamSize: 4,
    teamMembers: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'],
    college: 'IIT Roorkee',
    phone: '+91 98765 43210'
  },
  {
    id: '2',
    participantId: '2',
    participantName: 'Jane Smith',
    participantEmail: 'jane.smith@example.com',
    festId: '2',
    festName: 'Cultural Fest 2025',
    registrationType: 'fest',
    status: 'confirmed',
    amount: 1000,
    paymentStatus: 'completed',
    registrationDate: '2024-12-14',
    college: 'IIT Delhi',
    phone: '+91 98765 43211'
  },
  {
    id: '3',
    participantId: '3',
    participantName: 'Mike Johnson',
    participantEmail: 'mike.johnson@example.com',
    festId: '1',
    festName: 'TechFest 2025',
    eventId: '4',
    eventName: 'Quiz Competition',
    registrationType: 'event',
    status: 'pending',
    amount: 500,
    paymentStatus: 'pending',
    registrationDate: '2024-12-16',
    teamSize: 3,
    teamMembers: ['Mike Johnson', 'David Brown', 'Lisa Chen'],
    college: 'IIT Bombay',
    phone: '+91 98765 43212'
  },
  {
    id: '4',
    participantId: '4',
    participantName: 'Sarah Wilson',
    participantEmail: 'sarah.wilson@example.com',
    festId: '2',
    festName: 'Cultural Fest 2025',
    eventId: '2',
    eventName: 'Dance Competition',
    registrationType: 'event',
    status: 'confirmed',
    amount: 500,
    paymentStatus: 'completed',
    registrationDate: '2024-12-13',
    college: 'IIT Kanpur',
    phone: '+91 98765 43213'
  },
  {
    id: '5',
    participantId: '5',
    participantName: 'David Brown',
    participantEmail: 'david.brown@example.com',
    festId: '1',
    festName: 'TechFest 2025',
    registrationType: 'fest',
    status: 'cancelled',
    amount: 1000,
    paymentStatus: 'refunded',
    registrationDate: '2024-12-10',
    college: 'IIT Madras',
    phone: '+91 98765 43214'
  }
];

const registrationStats = [
  { status: 'Confirmed', count: 45, color: '#10b981' },
  { status: 'Pending', count: 12, color: '#f59e0b' },
  { status: 'Cancelled', count: 3, color: '#ef4444' },
  { status: 'Refunded', count: 2, color: '#8b5cf6' }
];

const registrationTrend = [
  { day: 'Mon', festRegistrations: 8, eventRegistrations: 15 },
  { day: 'Tue', festRegistrations: 12, eventRegistrations: 22 },
  { day: 'Wed', festRegistrations: 6, eventRegistrations: 18 },
  { day: 'Thu', festRegistrations: 15, eventRegistrations: 28 },
  { day: 'Fri', festRegistrations: 20, eventRegistrations: 35 },
  { day: 'Sat', festRegistrations: 25, eventRegistrations: 42 },
  { day: 'Sun', festRegistrations: 18, eventRegistrations: 30 }
];

export default function RegistrationManagement() {
  const [registrations] = useState<Registration[]>(mockRegistrations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [festFilter, setFestFilter] = useState<string>('all');

  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = registration.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.participantEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.festName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (registration.eventName && registration.eventName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || registration.status === statusFilter;
    const matchesType = typeFilter === 'all' || registration.registrationType === typeFilter;
    const matchesFest = festFilter === 'all' || registration.festId === festFilter;
    return matchesSearch && matchesStatus && matchesType && matchesFest;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} className="text-green-400" />;
      case 'pending': return <Clock size={16} className="text-yellow-400" />;
      case 'cancelled': return <XCircle size={16} className="text-red-400" />;
      case 'refunded': return <XCircle size={16} className="text-purple-400" />;
      default: return <Clock size={16} className="text-gray-400" />;
    }
  };

  const totalRegistrations = registrations.length;
  const confirmedRegistrations = registrations.filter(r => r.status === 'confirmed').length;
  const totalRevenue = registrations.filter(r => r.paymentStatus === 'completed').reduce((sum, r) => sum + r.amount, 0);
  const pendingRegistrations = registrations.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Registration Management</h1>
          <p className="text-gray-400 mt-1">Manage all fest and event registrations</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download size={16} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <UserCheck size={16} />
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search registrations..."
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
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="fest">Fest Registration</option>
          <option value="event">Event Registration</option>
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
              <p className="text-gray-400 text-sm">Total Registrations</p>
              <p className="text-2xl font-bold text-white">{totalRegistrations}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-600">
              <UserCheck size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Confirmed</p>
              <p className="text-2xl font-bold text-white">{confirmedRegistrations}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-600">
              <CheckCircle size={24} className="text-white" />
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
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-white">{pendingRegistrations}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-600">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Trend Chart */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Registration Trend</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={registrationTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="festRegistrations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="eventRegistrations" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Registration Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Registration Status</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <div className="space-y-4">
            {registrationStats.map((stat) => (
              <div key={stat.status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: stat.color }}
                  ></div>
                  <span className="text-white font-medium">{stat.status}</span>
                </div>
                <span className="text-gray-400">{stat.count} registrations</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-left">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} />
                <div>
                  <div className="font-semibold">Approve Pending</div>
                  <div className="text-sm opacity-90">Approve all pending registrations</div>
                </div>
              </div>
            </button>
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-left">
              <div className="flex items-center gap-3">
                <Download size={20} />
                <div>
                  <div className="font-semibold">Export Report</div>
                  <div className="text-sm opacity-90">Generate registration report</div>
                </div>
              </div>
            </button>
            <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-left">
              <div className="flex items-center gap-3">
                <UserCheck size={20} />
                <div>
                  <div className="font-semibold">Send Notifications</div>
                  <div className="text-sm opacity-90">Notify participants about updates</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">All Registrations</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">Export Registrations</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Registration Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-zinc-800 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {registration.registrationType === 'fest' ? registration.festName : `${registration.eventName} (${registration.festName})`}
                      </div>
                      <div className="text-sm text-gray-400">
                        {registration.registrationType === 'fest' ? 'Fest Registration' : 'Event Registration'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(registration.registrationDate).toLocaleDateString()}
                      </div>
                      {registration.teamSize && (
                        <div className="text-xs text-blue-400 mt-1">
                          Team Size: {registration.teamSize}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{registration.participantName}</div>
                      <div className="text-sm text-gray-400">{registration.participantEmail}</div>
                      <div className="text-xs text-gray-500">{registration.college}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(registration.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(registration.status)}`}>
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(registration.paymentStatus)}`}>
                      {registration.paymentStatus.charAt(0).toUpperCase() + registration.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ₹{registration.amount.toLocaleString()}
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