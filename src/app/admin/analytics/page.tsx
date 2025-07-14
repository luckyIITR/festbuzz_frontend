'use client';
import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

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

const eventPerformance = [
  { name: 'Hackathon', registrations: 120, revenue: 60000, conversion: 85 },
  { name: 'Dance Competition', registrations: 80, revenue: 40000, conversion: 72 },
  { name: 'Quiz Competition', registrations: 150, revenue: 75000, conversion: 90 },
  { name: 'Art Exhibition', registrations: 45, revenue: 22500, conversion: 68 },
  { name: 'Singing Contest', registrations: 60, revenue: 30000, conversion: 75 }
];

const userEngagement = [
  { day: 'Mon', activeUsers: 1200, newRegistrations: 45 },
  { day: 'Tue', activeUsers: 1350, newRegistrations: 52 },
  { day: 'Wed', activeUsers: 1100, newRegistrations: 38 },
  { day: 'Thu', activeUsers: 1600, newRegistrations: 67 },
  { day: 'Fri', activeUsers: 1800, newRegistrations: 89 },
  { day: 'Sat', activeUsers: 2200, newRegistrations: 120 },
  { day: 'Sun', activeUsers: 1900, newRegistrations: 95 }
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6months');

  const StatCard = ({ title, value, change, icon: Icon, color, trend }: {
    title: string;
    value: string;
    change?: number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    trend?: 'up' | 'down';
  }) => (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <ArrowUpRight size={16} className="text-green-400" />
              ) : (
                <ArrowDownRight size={16} className="text-red-400" />
              )}
              <span className={`text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {change}% from last period
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
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="₹1,210,000"
          change={12}
          trend="up"
          icon={DollarSign}
          color="bg-green-600"
        />
        <StatCard
          title="Total Registrations"
          value="2,220"
          change={8}
          trend="up"
          icon={Users}
          color="bg-blue-600"
        />
        <StatCard
          title="Active Events"
          value="15"
          change={-3}
          trend="down"
          icon={Calendar}
          color="bg-purple-600"
        />
        <StatCard
          title="Conversion Rate"
          value="78.5%"
          change={5}
          trend="up"
          icon={TrendingUp}
          color="bg-yellow-600"
        />
      </div>

      {/* Revenue & Registration Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
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
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.3}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Registration Trend</h3>
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
                dataKey="registrations" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution & User Engagement */}
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

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">User Engagement</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userEngagement}>
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
              <Bar dataKey="newRegistrations" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Event Performance Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Event Performance Analysis</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View All Events</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Registrations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {eventPerformance.map((event) => (
                <tr key={event.name} className="hover:bg-zinc-800 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{event.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {event.registrations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ₹{event.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-zinc-700 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${event.conversion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {event.conversion}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      event.conversion >= 80 ? 'bg-green-100 text-green-800' :
                      event.conversion >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.conversion >= 80 ? 'Excellent' :
                       event.conversion >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <Download size={16} />
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