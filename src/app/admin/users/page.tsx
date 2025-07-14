'use client';
import { useState } from 'react';
import { 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  UserPlus,
  Mail,
  Phone,
  Calendar
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

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'participant';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  totalRegistrations: number;
  totalEvents: number;
  phone?: string;
  college?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'organizer',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-12-20',
    totalRegistrations: 0,
    totalEvents: 3,
    phone: '+91 98765 43210',
    college: 'IIT Roorkee'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'participant',
    status: 'active',
    joinDate: '2024-02-20',
    lastActive: '2024-12-19',
    totalRegistrations: 5,
    totalEvents: 0,
    phone: '+91 98765 43211',
    college: 'IIT Delhi'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    lastActive: '2024-12-20',
    totalRegistrations: 0,
    totalEvents: 0,
    phone: '+91 98765 43212'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'organizer',
    status: 'pending',
    joinDate: '2024-12-15',
    lastActive: '2024-12-18',
    totalRegistrations: 0,
    totalEvents: 1,
    phone: '+91 98765 43213',
    college: 'IIT Bombay'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'participant',
    status: 'inactive',
    joinDate: '2024-03-10',
    lastActive: '2024-11-25',
    totalRegistrations: 2,
    totalEvents: 0,
    phone: '+91 98765 43214',
    college: 'IIT Kanpur'
  }
];

const userActivityData = [
  { day: 'Mon', activeUsers: 1200, newUsers: 45 },
  { day: 'Tue', activeUsers: 1350, newUsers: 52 },
  { day: 'Wed', activeUsers: 1100, newUsers: 38 },
  { day: 'Thu', activeUsers: 1600, newUsers: 67 },
  { day: 'Fri', activeUsers: 1800, newUsers: 89 },
  { day: 'Sat', activeUsers: 2200, newUsers: 120 },
  { day: 'Sun', activeUsers: 1900, newUsers: 95 }
];

const roleDistribution = [
  { role: 'Admin', count: 2, color: '#ef4444' },
  { role: 'Organizer', count: 15, color: '#3b82f6' },
  { role: 'Participant', count: 1250, color: '#10b981' }
];

export default function UserManagement() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'organizer': return 'bg-blue-100 text-blue-800';
      case 'participant': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const newUsersThisMonth = users.filter(u => {
    const joinDate = new Date(u.joinDate);
    const now = new Date();
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">Manage users and their permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <UserPlus size={16} />
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="organizer">Organizer</option>
          <option value="participant">Participant</option>
        </select>
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
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">{totalUsers}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-600">
              <UserPlus size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-white">{activeUsers}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-600">
              <UserPlus size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">New This Month</p>
              <p className="text-2xl font-bold text-white">{newUsersThisMonth}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-600">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Activity</p>
              <p className="text-2xl font-bold text-white">85%</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-600">
              <UserPlus size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">User Activity</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userActivityData}>
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
              <Bar dataKey="activeUsers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="newUsers" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Role Distribution</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <div className="space-y-4">
            {roleDistribution.map((role) => (
              <div key={role.role} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: role.color }}
                  ></div>
                  <span className="text-white font-medium">{role.role}</span>
                </div>
                <span className="text-gray-400">{role.count} users</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">All Users</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">Export Users</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Activity
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-800 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center mr-3">
                        <span className="text-black font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">
                        {user.totalRegistrations} registrations
                      </div>
                      <div className="text-sm text-gray-400">
                        Last active: {new Date(user.lastActive).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {user.phone && (
                        <button className="text-blue-400 hover:text-blue-300">
                          <Phone size={16} />
                        </button>
                      )}
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