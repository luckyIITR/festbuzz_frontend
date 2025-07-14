'use client';
import { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Award,
  UserCheck,
  BarChart3,
  FileText
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar
} from 'recharts';





interface DashboardStats {
  totalFests: number;
  totalEvents: number;
  totalParticipants: number;
  totalRegistrations: number;
  totalRevenue: number;
  activeFests: number;
  upcomingEvents: number;
  conversionRate: number;
}





const mockStats: DashboardStats = {
  totalFests: 8,
  totalEvents: 45,
  totalParticipants: 1250,
  totalRegistrations: 1800,
  totalRevenue: 900000,
  activeFests: 3,
  upcomingEvents: 12,
  conversionRate: 85
};

const revenueData = [
  { month: 'Jan', revenue: 120000, registrations: 240 },
  { month: 'Feb', revenue: 190000, registrations: 380 },
  { month: 'Mar', revenue: 150000, registrations: 300 },
  { month: 'Apr', revenue: 220000, registrations: 440 },
  { month: 'May', revenue: 180000, registrations: 360 },
  { month: 'Jun', revenue: 250000, registrations: 500 }
];

const categoryData = [
  { name: 'Technical', value: 45, color: '#10b981' },
  { name: 'Cultural', value: 30, color: '#f59e0b' },
  { name: 'Sports', value: 15, color: '#3b82f6' },
  { name: 'Workshop', value: 10, color: '#8b5cf6' }
];

const registrationTrend = [
  { day: 'Mon', festRegistrations: 45, eventRegistrations: 120 },
  { day: 'Tue', festRegistrations: 52, eventRegistrations: 135 },
  { day: 'Wed', festRegistrations: 38, eventRegistrations: 98 },
  { day: 'Thu', festRegistrations: 67, eventRegistrations: 156 },
  { day: 'Fri', festRegistrations: 89, eventRegistrations: 203 },
  { day: 'Sat', festRegistrations: 120, eventRegistrations: 289 },
  { day: 'Sun', festRegistrations: 95, eventRegistrations: 234 }
];

export default function AdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');

  const StatCard = ({ title, value, change, icon: Icon, color, trend }: {
    title: string;
    value: string | number;
    change?: number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    trend?: 'up' | 'down';
  }) => (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <ArrowUpRight size={16} className="text-green-400" />
              ) : (
                <ArrowDownRight size={16} className="text-red-400" />
              )}
              <span className={`text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {Math.abs(change)}% from last period
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Comprehensive overview of your fest management system</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${mockStats.totalRevenue.toLocaleString()}`}
          change={12}
          trend="up"
          icon={DollarSign}
          color="bg-green-600"
        />
        <StatCard
          title="Total Participants"
          value={mockStats.totalParticipants}
          change={8}
          trend="up"
          icon={Users}
          color="bg-blue-600"
        />
        <StatCard
          title="Active Fests"
          value={mockStats.activeFests}
          change={-3}
          trend="down"
          icon={Calendar}
          color="bg-purple-600"
        />
        <StatCard
          title="Upcoming Events"
          value={mockStats.upcomingEvents}
          change={15}
          trend="up"
          icon={Award}
          color="bg-yellow-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Registrations"
          value={mockStats.totalRegistrations}
          change={5}
          trend="up"
          icon={UserCheck}
          color="bg-indigo-600"
        />
        <StatCard
          title="Conversion Rate"
          value={`${mockStats.conversionRate}%`}
          change={3}
          trend="up"
          icon={TrendingUp}
          color="bg-pink-600"
        />
        <StatCard
          title="Total Events"
          value={mockStats.totalEvents}
          change={10}
          trend="up"
          icon={BarChart3}
          color="bg-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
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
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Registration Trend */}
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
      </div>

      {/* Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Event Category Distribution</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
              <div>
                <p className="text-white font-medium">New fest registration</p>
                <p className="text-gray-400 text-sm">TechFest 2025 - 45 participants</p>
              </div>
              <span className="text-green-400 text-sm">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
              <div>
                <p className="text-white font-medium">Event registration</p>
                <p className="text-gray-400 text-sm">Hackathon - 12 participants</p>
              </div>
              <span className="text-green-400 text-sm">5 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
              <div>
                <p className="text-white font-medium">Payment received</p>
                <p className="text-gray-400 text-sm">₹2,500 - Cultural Fest</p>
              </div>
              <span className="text-green-400 text-sm">10 min ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Create Fest</h3>
          <p className="text-gray-400 text-sm mb-4">Add a new fest to the platform</p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Create
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award size={24} className="text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Add Event</h3>
          <p className="text-gray-400 text-sm mb-4">Create a new event</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Add Event
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Manage Users</h3>
          <p className="text-gray-400 text-sm mb-4">View and manage participants</p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Manage
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
          <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Generate Report</h3>
          <p className="text-gray-400 text-sm mb-4">Create detailed reports</p>
          <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
} 