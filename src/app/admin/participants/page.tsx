'use client';
import { useState } from 'react';
import { 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Calendar,
  Mail,
  Phone,
  Award,
  UserCheck,
  Download
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

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  gender: 'male' | 'female' | 'other';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  totalFestsRegistered: number;
  totalEventsRegistered: number;
  totalAmountPaid: number;
  profileImage?: string;
}

const mockParticipants: Participant[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    college: 'IIT Roorkee',
    gender: 'male',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-12-20',
    totalFestsRegistered: 3,
    totalEventsRegistered: 8,
    totalAmountPaid: 2500
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+91 98765 43211',
    college: 'IIT Delhi',
    gender: 'female',
    status: 'active',
    joinDate: '2024-02-20',
    lastActive: '2024-12-19',
    totalFestsRegistered: 2,
    totalEventsRegistered: 5,
    totalAmountPaid: 1800
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+91 98765 43212',
    college: 'IIT Bombay',
    gender: 'male',
    status: 'active',
    joinDate: '2024-03-10',
    lastActive: '2024-12-18',
    totalFestsRegistered: 4,
    totalEventsRegistered: 12,
    totalAmountPaid: 3200
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+91 98765 43213',
    college: 'IIT Kanpur',
    gender: 'female',
    status: 'pending',
    joinDate: '2024-12-15',
    lastActive: '2024-12-17',
    totalFestsRegistered: 1,
    totalEventsRegistered: 2,
    totalAmountPaid: 800
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+91 98765 43214',
    college: 'IIT Madras',
    gender: 'male',
    status: 'inactive',
    joinDate: '2024-01-05',
    lastActive: '2024-11-25',
    totalFestsRegistered: 2,
    totalEventsRegistered: 4,
    totalAmountPaid: 1600
  }
];

const participantActivityData = [
  { day: 'Mon', newRegistrations: 12, activeUsers: 450 },
  { day: 'Tue', newRegistrations: 18, activeUsers: 520 },
  { day: 'Wed', newRegistrations: 15, activeUsers: 480 },
  { day: 'Thu', newRegistrations: 25, activeUsers: 600 },
  { day: 'Fri', newRegistrations: 30, activeUsers: 720 },
  { day: 'Sat', newRegistrations: 35, activeUsers: 850 },
  { day: 'Sun', newRegistrations: 28, activeUsers: 780 }
];

const collegeDistribution = [
  { college: 'IIT Roorkee', participants: 45, percentage: 25 },
  { college: 'IIT Delhi', participants: 38, percentage: 21 },
  { college: 'IIT Bombay', participants: 32, percentage: 18 },
  { college: 'IIT Kanpur', participants: 28, percentage: 16 },
  { college: 'IIT Madras', participants: 25, percentage: 14 },
  { college: 'Others', participants: 12, percentage: 6 }
];

export default function ParticipantManagement() {
  const [participants] = useState<Participant[]>(mockParticipants);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [collegeFilter, setCollegeFilter] = useState<string>('all');

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter;
    const matchesCollege = collegeFilter === 'all' || participant.college === collegeFilter;
    return matchesSearch && matchesStatus && matchesCollege;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'male': return 'bg-blue-100 text-blue-800';
      case 'female': return 'bg-pink-100 text-pink-800';
      case 'other': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalParticipants = participants.length;
  const activeParticipants = participants.filter(p => p.status === 'active').length;
  const totalRegistrations = participants.reduce((sum, p) => sum + p.totalFestsRegistered + p.totalEventsRegistered, 0);
  const totalRevenue = participants.reduce((sum, p) => sum + p.totalAmountPaid, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Participant Management</h1>
          <p className="text-gray-400 mt-1">Manage all participants and their registrations</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download size={16} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <UserCheck size={16} />
            Send Email
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search participants..."
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={collegeFilter}
          onChange={(e) => setCollegeFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Colleges</option>
          <option value="IIT Roorkee">IIT Roorkee</option>
          <option value="IIT Delhi">IIT Delhi</option>
          <option value="IIT Bombay">IIT Bombay</option>
          <option value="IIT Kanpur">IIT Kanpur</option>
          <option value="IIT Madras">IIT Madras</option>
        </select>

      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Participants</p>
              <p className="text-2xl font-bold text-white">{totalParticipants}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-600">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Participants</p>
              <p className="text-2xl font-bold text-white">{activeParticipants}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-600">
              <UserCheck size={24} className="text-white" />
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
              <Award size={24} className="text-white" />
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
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Participant Activity</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={participantActivityData}>
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
              <Bar dataKey="newRegistrations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="activeUsers" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">College Distribution</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <div className="space-y-4">
            {collegeDistribution.map((college) => (
              <div key={college.college} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-white font-medium">{college.college}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">{college.participants} participants</span>
                  <span className="text-blue-400">{college.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">All Participants</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">Export Participants</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  College Info
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
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredParticipants.map((participant) => (
                <tr key={participant.id} className="hover:bg-zinc-800 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center mr-3">
                        <span className="text-black font-bold text-sm">{participant.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{participant.name}</div>
                        <div className="text-sm text-gray-400">{participant.email}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGenderColor(participant.gender)}`}>
                            {participant.gender.charAt(0).toUpperCase() + participant.gender.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                                         <div>
                       <div className="text-sm text-white">{participant.college}</div>
                     </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(participant.status)}`}>
                      {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">
                        {participant.totalFestsRegistered} fests, {participant.totalEventsRegistered} events
                      </div>
                      <div className="text-sm text-gray-400">
                        Joined: {new Date(participant.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ₹{participant.totalAmountPaid.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Phone size={16} />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <Mail size={16} />
                      </button>
                    </div>
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