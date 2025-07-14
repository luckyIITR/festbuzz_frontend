'use client';
import { useState } from 'react';
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Search,
  Eye,
  Share2,
  Printer
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface Report {
  id: string;
  name: string;
  type: 'financial' | 'registration' | 'analytics' | 'user';
  format: 'pdf' | 'excel' | 'csv';
  lastGenerated: string;
  size: string;
  status: 'ready' | 'generating' | 'failed';
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Revenue Report',
    type: 'financial',
    format: 'pdf',
    lastGenerated: '2024-12-20',
    size: '2.4 MB',
    status: 'ready'
  },
  {
    id: '2',
    name: 'Registration Analytics',
    type: 'registration',
    format: 'excel',
    lastGenerated: '2024-12-19',
    size: '1.8 MB',
    status: 'ready'
  },
  {
    id: '3',
    name: 'User Activity Report',
    type: 'user',
    format: 'csv',
    lastGenerated: '2024-12-18',
    size: '3.2 MB',
    status: 'ready'
  },
  {
    id: '4',
    name: 'Fest Performance Summary',
    type: 'analytics',
    format: 'pdf',
    lastGenerated: '2024-12-17',
    size: '4.1 MB',
    status: 'ready'
  },
  {
    id: '5',
    name: 'Q4 Financial Summary',
    type: 'financial',
    format: 'excel',
    lastGenerated: '2024-12-16',
    size: '5.6 MB',
    status: 'ready'
  }
];

const reportData = [
  { month: 'Jan', revenue: 120000, registrations: 240, users: 1200 },
  { month: 'Feb', revenue: 190000, registrations: 380, users: 1350 },
  { month: 'Mar', revenue: 150000, registrations: 300, users: 1100 },
  { month: 'Apr', revenue: 220000, registrations: 440, users: 1600 },
  { month: 'May', revenue: 180000, registrations: 360, users: 1800 },
  { month: 'Jun', revenue: 250000, registrations: 500, users: 2200 }
];

export default function Reports() {
  const [reports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesFormat = formatFilter === 'all' || report.format === formatFilter;
    return matchesSearch && matchesType && matchesFormat;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'financial': return 'bg-green-100 text-green-800';
      case 'registration': return 'bg-blue-100 text-blue-800';
      case 'analytics': return 'bg-purple-100 text-purple-800';
      case 'user': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalReports = reports.length;
  const readyReports = reports.filter(r => r.status === 'ready').length;
  const totalSize = reports.reduce((sum, r) => sum + parseFloat(r.size.split(' ')[0]), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-gray-400 mt-1">Generate and manage analytical reports</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <BarChart3 size={16} />
            Generate Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Download size={16} />
            Export All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="financial">Financial</option>
          <option value="registration">Registration</option>
          <option value="analytics">Analytics</option>
          <option value="user">User</option>
        </select>
        <select
          value={formatFilter}
          onChange={(e) => setFormatFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Formats</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Reports</p>
              <p className="text-2xl font-bold text-white">{totalReports}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-600">
              <FileText size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ready Reports</p>
              <p className="text-2xl font-bold text-white">{readyReports}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-600">
              <Download size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Size</p>
              <p className="text-2xl font-bold text-white">{totalSize.toFixed(1)} MB</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-600">
              <BarChart3 size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">This Month</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-600">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Report Trends Chart */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Report Generation Trends</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={reportData}>
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

      {/* Reports Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">All Reports</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">Schedule Report</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Format
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Last Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-zinc-800 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <FileText size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{report.name}</div>
                        <div className="text-sm text-gray-400">ID: {report.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(report.type)}`}>
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-white uppercase">{report.format}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {new Date(report.lastGenerated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {report.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <Download size={16} />
                      </button>
                      <button className="text-purple-400 hover:text-purple-300">
                        <Share2 size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-300">
                        <Printer size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-green-600">
              <TrendingUp size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Financial Reports</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">Generate comprehensive financial reports including revenue, expenses, and profit analysis.</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Generate Report
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-blue-600">
              <Users size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">User Analytics</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">Detailed user behavior analysis, registration patterns, and engagement metrics.</p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Generate Report
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-purple-600">
              <BarChart3 size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">Event performance analysis, conversion rates, and success metrics for all fests.</p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
} 