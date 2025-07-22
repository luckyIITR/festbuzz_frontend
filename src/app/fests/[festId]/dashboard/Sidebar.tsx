'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
    <svg className="w-4 h-4" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  d="M11.2793 0.652C10.9093 0.5 10.4393 0.5 9.50032 0.5C8.56132 0.5 8.09232 0.5 7.72132 0.652C7.22877 0.854211 6.8367 1.24377 6.63132 1.735C6.53732 1.958 6.50132 2.219 6.48632 2.598C6.47965 2.8726 6.40305 3.14097 6.26376 3.37772C6.12448 3.61447 5.92711 3.81178 5.69032 3.951C5.44906 4.0851 5.17786 4.15615 4.90184 4.15754C4.62582 4.15894 4.35392 4.09065 4.11132 3.959C3.77332 3.781 3.52832 3.683 3.28632 3.651C2.75687 3.58148 2.22139 3.7238 1.79632 4.047C1.47832 4.289 1.24332 4.693 0.774315 5.5C0.304315 6.307 0.0703155 6.71 0.0173155 7.105C-0.0526845 7.631 0.0913156 8.163 0.417316 8.584C0.565316 8.776 0.774316 8.937 1.09732 9.139C1.57432 9.436 1.88032 9.942 1.88032 10.5C1.88032 11.058 1.57432 11.564 1.09832 11.86C0.774316 12.063 0.565315 12.224 0.416315 12.416C0.255398 12.6239 0.137285 12.8617 0.0687999 13.1156C0.000314891 13.3694 -0.0171837 13.6343 0.0173155 13.895C0.0703155 14.289 0.304315 14.693 0.774315 15.5C1.24432 16.307 1.47832 16.71 1.79632 16.953C2.22032 17.276 2.75632 17.418 3.28632 17.349C3.52832 17.317 3.77332 17.219 4.11132 17.041C4.35404 16.9092 4.62613 16.8408 4.90234 16.8422C5.17855 16.8436 5.44994 16.9147 5.69132 17.049C6.17732 17.329 6.46532 17.844 6.48632 18.402C6.50132 18.782 6.53732 19.042 6.63132 19.265C6.83532 19.755 7.22732 20.145 7.72132 20.348C8.09132 20.5 8.56132 20.5 9.50032 20.5C10.4393 20.5 10.9093 20.5 11.2793 20.348C11.7719 20.1458 12.1639 19.7562 12.3693 19.265C12.4633 19.042 12.4993 18.782 12.5143 18.402C12.5343 17.844 12.8233 17.328 13.3103 17.049C13.5516 16.9149 13.8228 16.8439 14.0988 16.8425C14.3748 16.8411 14.6467 16.9093 14.8893 17.041C15.2273 17.219 15.4723 17.317 15.7143 17.349C16.2443 17.419 16.7803 17.276 17.2043 16.953C17.5223 16.711 17.7573 16.307 18.2263 15.5C18.6963 14.693 18.9303 14.29 18.9833 13.895C19.0177 13.6343 19 13.3693 18.9314 13.1155C18.8627 12.8616 18.7444 12.6239 18.5833 12.416C18.4353 12.224 18.2263 12.063 17.9033 11.861C17.4263 11.564 17.1203 11.058 17.1203 10.5C17.1203 9.942 17.4263 9.436 17.9023 9.14C18.2263 8.937 18.4353 8.776 18.5843 8.584C18.7452 8.37606 18.8633 8.13829 18.9318 7.88443C19.0003 7.63057 19.0178 7.36566 18.9833 7.105C18.9303 6.711 18.6963 6.307 18.2263 5.5C17.7563 4.693 17.5223 4.29 17.2043 4.047C16.7792 3.7238 16.2438 3.58148 15.7143 3.651C15.4723 3.683 15.2273 3.781 14.8893 3.959C14.6466 4.09083 14.3745 4.15922 14.0983 4.15782C13.8221 4.15642 13.5507 4.08528 13.3093 3.951C13.0727 3.81166 12.8755 3.61429 12.7364 3.37755C12.5973 3.14081 12.5209 2.87251 12.5143 2.598C12.4993 2.218 12.4633 1.958 12.3693 1.735C12.2677 1.49174 12.1191 1.27088 11.9321 1.08506C11.745 0.899233 11.5232 0.752078 11.2793 0.652ZM9.50032 13.5C11.1703 13.5 12.5233 12.157 12.5233 10.5C12.5233 8.843 11.1693 7.5 9.50032 7.5C7.83032 7.5 6.47732 8.843 6.47732 10.5C6.47732 12.157 7.83132 13.5 9.50032 13.5Z" fill="#B7B7B7" />
    </svg>

  ),
  href: (festId: string) => `/fests/${festId}/dashboard/settings`,
};

const Sidebar = () => {

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const params = useParams();
  const festId = params.festId as string;
  const pathname = usePathname();
  const [editOpen, setEditOpen] = useState(true);

  return (
    <div>
      {isMobile ? (
        <div className='h-20 px-4 w-275 flex flex-row flex-wrap content-center overflow-x-auto overflow-y-hidden'>
          <div className="w-13 h-13 mr-4 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-pink-400 mb-2">
            U
          </div>
          <div className='flex flex-wrap flex-row content-center gap-2  '>
            {navItems.map((item) => {
              const isActive = pathname === item.href(festId);
              return (
                <Link
                  key={item.label}
                  href={item.href(festId)}
                  className={`flex items-center gap-3 px-3 py-2 w-32 rounded-lg font-medium text-sm transition-colors
              ${isActive ? 'bg-[#232428] text-white' : 'text-gray-300 hover:bg-[#232428] hover:text-white'}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}


          </div>
          {editOpen && (
            <div className="flex flex-wrap flex-row content-center gap-2">
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
          <Link
            href={settingsItem.href(festId)}
            className={`flex items-center gap-3 px-3 py-2 my-1 rounded-lg font-medium text-sm transition-colors
            ${pathname === settingsItem.href(festId) ? 'bg-[#232428] text-white' : 'text-gray-300 hover:bg-[#232428] hover:text-white'}`}
          >
            {settingsItem.icon}
            {settingsItem.label}
          </Link>

        </div>
      ) : (
        <aside className="hidden md:flex flex-col bg-[#1b1b1b] rounded-xl p-2  min-h-[80vh] shadow-lg pt-2">
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
        </aside>)}
    </div>
  );
};

export default Sidebar; 