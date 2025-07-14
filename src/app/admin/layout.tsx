'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  TrendingUp,
  FileText,
  Award,
  UserCheck
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    setUser(userStr ? JSON.parse(userStr) : null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home, description: 'Overview & Analytics' },
    { name: 'Fests', href: '/admin/fests', icon: Calendar, description: 'Manage all fests' },
    { name: 'Events', href: '/admin/events', icon: Award, description: 'Manage all events' },
    { name: 'Participants', href: '/admin/participants', icon: Users, description: 'View all participants' },
    { name: 'Registrations', href: '/admin/registrations', icon: UserCheck, description: 'Manage registrations' },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp, description: 'Detailed analytics' },
    { name: 'Reports', href: '/admin/reports', icon: FileText, description: 'Generate reports' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, description: 'System settings' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-lime-400">FEST</span>
              <span className="text-lg text-white">✦</span>
              <span className="font-extrabold text-lg tracking-tight text-pink-500">BUZZ</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-start gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={20} className="mt-0.5" />
                  <div>
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-zinc-800">
            {user && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">{user.name?.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64">
        {/* Top bar */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-white hover:text-gray-300"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 