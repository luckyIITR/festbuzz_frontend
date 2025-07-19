'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  {
    label: 'Fest board',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
    href: (festId: string) => `/fests/${festId}/dashboard`,
  },
  {
    label: 'Attendee',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    href: (festId: string) => `/fests/${festId}/dashboard/attendees`,
  },
  {
    label: 'Events',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" />
      </svg>
    ),
    href: (festId: string) => `/fests/${festId}/dashboard/events`,
  },
];

const editItems = [
  {
    label: 'Basic details',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    href: (festId: string) => `/fests/${festId}/dashboard/edit/basic`,
  },
  {
    label: 'About fest',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m0-5V3a1 1 0 00-1-1H7a1 1 0 00-1 1v9m0 0l4 4 4-4" />
      </svg>
    ),
    href: (festId: string) => `/fests/${festId}/dashboard/edit/about`,
  },
  {
    label: 'Tickets',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z" />
      </svg>
    ),
    href: (festId: string) => `/fests/${festId}/dashboard/edit/tickets`,
  },
  {
    label: 'Add ons',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    href: (festId: string) => `/fests/${festId}/dashboard/edit/addons`,
  },
];

const settingsItem = {
  label: 'Settings',
  icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  href: (festId: string) => `/fests/${festId}/dashboard/settings`,
};

const Sidebar = () => {
  const params = useParams();
  const festId = params.festId as string;
  const pathname = usePathname();
  const [editOpen, setEditOpen] = useState(true);

  return (
    <aside className="hidden md:flex flex-col bg-[#18191C] rounded-xl p-2 w-48 min-h-[90vh] shadow-lg">
      {/* User Profile Section */}
      <div className="flex flex-col items-center py-4 border-b border-gray-800 mb-2">
        <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-pink-400 mb-2">
          U
        </div>
        <div className="text-white font-semibold text-sm">Username</div>
        <div className="text-gray-400 text-xs">Organizer</div>
      </div>
      {/* Navigation */}
      {navItems.map((item) => {
        const isActive = pathname === item.href(festId);
        return (
          <Link
            key={item.label}
            href={item.href(festId)}
            className={`flex items-center gap-3 px-3 py-2 my-1 rounded-lg font-medium text-sm transition-colors
              ${isActive ? 'bg-[#232428] text-white' : 'text-gray-300 hover:bg-[#232428] hover:text-white'}`}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
      {/* Edit Section (Collapsible) */}
      <div className="mt-2">
        <button
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg font-medium text-sm text-gray-300 hover:bg-[#232428] hover:text-white transition-colors focus:outline-none"
          onClick={() => setEditOpen((open) => !open)}
        >
          <svg className={`w-4 h-4 transform transition-transform ${editOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Edit
        </button>
        {editOpen && (
          <div className="ml-4 mt-1">
            {editItems.map((item) => {
              const isActive = pathname === item.href(festId);
              return (
                <Link
                  key={item.label}
                  href={item.href(festId)}
                  className={`flex items-center gap-3 px-3 py-2 my-1 rounded-lg font-medium text-sm transition-colors
                    ${isActive ? 'bg-[#232428] text-white' : 'text-gray-300 hover:bg-[#232428] hover:text-white'}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
      {/* Settings */}
      <div className="mt-auto">
        <Link
          href={settingsItem.href(festId)}
          className={`flex items-center gap-3 px-3 py-2 my-1 rounded-lg font-medium text-sm transition-colors
            ${pathname === settingsItem.href(festId) ? 'bg-[#232428] text-white' : 'text-gray-300 hover:bg-[#232428] hover:text-white'}`}
        >
          {settingsItem.icon}
          {settingsItem.label}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar; 