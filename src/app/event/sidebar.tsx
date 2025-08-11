'use client';
import React from 'react';
import Image from 'next/image';
import profile from '../../../public/assets/Profile.png';
import documents from '../../../public/assets/Documents.png';
import Tickets from '../../../public/assets/Tickets.png';
import Man from '../../../public/assets/Profileman.png';
import Logout from '../../../public/assets/settings.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = () => {
  const pathname = usePathname();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }

  const items = [
    {
      label: 'Overview',
      icon: profile,
      href: `/event`,
      onClick: undefined,
    },
   
    {
      label: 'Tickets',
      icon: Tickets,
      href: `/event/tickets`,
      onClick: undefined,
    },
    {
      label: 'Details',
      icon: documents,
      href: `/event/details`,
      onClick: undefined,
    },
    {
      label: 'Judging',
      icon: Man,
      href: `/event/judging`,
      onClick: undefined,
    },
    {
      label: 'Certificates',
      icon: documents,
      href: `/event/certificates`,
      onClick: undefined,
    },
    {
      label: 'Settings',
      icon: Logout,
      href: `/event/settings`,
      onClick: undefined,
    },
  ];

  return (
    <div className='bg-[#181818] rounded-2xl w-176 md:w-full md:min-h-180 h-full'>
      <div className='md:flex-col flex md:gap-1 gap-2 px-4 md:pt-8 pt-4 md:pb-0 pb-4 h-full'>
        {items.map((item) => {
          const isActive = pathname === item.href;

          if (item.onClick) {
            // Render as button for logout
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full text-left"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#313131] transition-colors">
                  <Image src={item.icon} alt='' className='h-4 md:w-4 object-cover' />
                  <div className='font-urbanist font-[600] h-6'>{item.label}</div>
                </div>
              </button>
            );
          }

          // Render as link for other items
          return (
            <Link href={item.href!} key={item.href}>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isActive ? 'bg-[#313131]' : ''}`}
              >
                <Image src={item.icon} alt='' className='h-4 md:w-4 object-cover' />
                <div className='font-urbanist font-[600] h-6'>{item.label}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
