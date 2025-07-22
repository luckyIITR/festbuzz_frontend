'use client';
import Sidebar from './Sidebar';
import { ReactElement, ReactEventHandler, ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ReactFormState } from 'react-dom/client';
import whiteDiamond from '../../../../../public/assets/WhiteDiamond.png'
import Image from 'next/image';
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
  const [isopen, setIsopen] = useState(true);
  const handleclick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsopen(!isopen);
  }
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Dashboard layout below Navbar */}
      <div className="px-2 ">

        <header className="sticky rounded-xl top-0 z-10 bg-[#FD3EB5] h-14 md:px-4 py-3 pl-2 flex content-center flex-wrap justify-between">
          <div className='flex'>
            <button className=' w-8 rounded-full  bg-[#101010]'
              onClick={handleclick}>
              <div className='flex flex-col gap-1'>
                <div className=' mx-2 h-[1px] bg-[#FFFFFF] rounded-lg'></div>
                <div className=' mx-2 h-[1px] bg-[#FFFFFF] rounded-lg'></div>
                <div className=' mx-2 h-[1px] bg-[#FFFFFF] rounded-lg'></div>
              </div>
            </button>
            <Image  src={whiteDiamond} alt='white diamond' className='object-cover md:ml-10 ml-2 md:w-8 w-6 ' />
            <h2 className="pl-2 md:text-2xl font-bold uppercase">{sectionTitle}</h2>
          </div>
          <div className='flex'>
            <div className='md:mr-5 mr-2 md:px-8 px-2 py-1 text-sm md:text-lg bg-[#B50673] rounded-2xl text-center text-[#FFFFFF] flex content-center items-center flex-wrap gap-2 '>Share
              <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2734 4.60156V0.601562L18.2734 7.60156L11.2734 14.6016V10.5016C6.27344 10.5016 2.77344 12.1016 0.273438 15.6016C1.27344 10.6016 4.27344 5.60156 11.2734 4.60156Z" fill="white" />
              </svg>

            </div>
          </div>
        </header>

        <div className='flex gap-2 flex-col md:flex-row '>
          <div className={` md:block md:sticky md:top-33 left-0 mt-5 md:mt-0 md:h-[calc(90vh-64px)] ${isopen?'md:w-1/7':'md:w-0'} w-full h-20  z-0  overflow-x-auto md:overflow-x-hidden md:overflow-y-auto bg-[#1b1b1b] rounded-xl transition-all duration-1000 ${isopen ? ' translate-x-0  opacity-100' : 'pointer-events-none  -translate-x-50 opacity-0'}   `}>
            <Sidebar />
          </div>
          <div className={` flex flex-col min-h-[calc(100vh-64px)] min-w-0  ${isopen?'md:w-6/7':'w-full'}`}>
            <main className="flex-1 min-w-0 px-2  sm:px-4 md:px-6 py-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 