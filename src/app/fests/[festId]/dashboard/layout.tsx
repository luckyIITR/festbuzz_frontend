'use client';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const sectionTitles: Record<string, string> = {
  dashboard: 'Fest Board',
  attendees: 'Attendee',
  events: 'Events',
  'edit/basic': 'Basic Details',
  'edit/about': 'About Fest',
  'edit/tickets': 'Tickets',
  'edit/addons': 'Add Ons',
  settings: 'Settings',
};

function getSectionTitle(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[parts.length - 2] === 'edit') {
    return sectionTitles[`edit/${parts[parts.length - 1]}`] || 'Dashboard';
  }
  return sectionTitles[parts[parts.length - 1]] || 'Dashboard';
}

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const sectionTitle = getSectionTitle(pathname);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Dashboard layout below Navbar */}
      <div className="pt-16">
        {/* Fixed Sidebar */}
        <div className="hidden md:block fixed top-16 left-0 h-[calc(100vh-64px)] w-48 z-20 overflow-y-auto bg-[#18191C] rounded-xl">
          <Sidebar />
        </div>
        {/* Main Content with left margin */}
        <div className="md:ml-48 flex flex-col min-h-[calc(100vh-64px)] min-w-0">
          {/* Top Header */}
          <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-4 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">{sectionTitle}</h2>
            <div>{/* Placeholder for actions/user info */}</div>
          </header>
          <main className="flex-1 min-w-0 px-2 sm:px-4 md:px-6 py-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 