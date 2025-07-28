'use client';
import React from 'react';
import Image from 'next/image';
import profile from '../../../public/assets/Profile.png';
import documents from '../../../public/assets/Documents.png';
import Notification from '../../../public/assets/Notification.png';
import Man from '../../../public/assets/Profileman.png';
import Logout from '../../../public/assets/Logout.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = () => {
  const pathname = usePathname();

  const items = [
    {
      label: 'Profile',
      icon: profile,
      href: `/profile`,
    },
    {
      label: 'Notification',
      icon: Notification,
      href: `/profile/notification`,
    },
    {
      label: 'Manage team',
      icon: Man,
      href: `/profile/team`,
    },
    {
      label: 'Support',
      icon: documents,
      href: `/profile/support`,
    },
    {
      label: 'Logout',
      icon: Logout,
      href: `/logout`,
    },
  ];

  return (
    <div className='bg-[#181818] rounded-2xl w-full min-h-180 h-full'>
      <div className='flex-col flex gap-1 px-4 pt-8 h-full'>
        {items.map((item) => {
          const href = item.href;
          const isActive = pathname === href;

          return (
            <Link href={item.href} key={item.href}>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isActive ? 'bg-[#313131]' : ''}`}
              >
                <Image src={item.icon} alt='' className='h-4 w-4 object-cover' />
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
