'use client';
import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const steps = [
  '/event/details',
  '/event/details/venue',
  '/event/details/details',
  '/event/details/images',
  '/event/details/rewards',
  '/event/details/Addones',
];

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const currentIndex = steps.findIndex(step => step === pathname);
  const isLastStep = currentIndex === steps.length - 1;
  const nextStep = steps[currentIndex + 1];

  const handleSkip = () => {
    router.push('/event/judging');
  };

  const handleNext = () => {
    if (isLastStep) {
      router.push('/event/judging');
    } else if (nextStep) {
      router.push(nextStep);
    }
  };

  return (
    <div className='w-full min-h-screen px-4 sm:px-6'>
      {/* Scrollable Step Navbar */}
      <div className='mt-5 bg-[#1E1E1E] w-full rounded-3xl overflow-x-auto whitespace-nowrap px-4 py-2 scrollbar-hide'>
        <div className='flex justify-around gap-6 min-w-max'>
          {steps.map((step, idx) => {
            const label = ['Basics', 'Venue', 'Details', 'Images', 'Rewards', 'Add Ones'][idx];
            const isActive = pathname === step;
            return (
              <Link
                key={step}
                href={step}
                className={`flex-shrink-0 font-semibold ${
                  isActive ? 'text-[#E1FF01]' : 'text-[#545454]'
                } hover:text-[#E1FF01] transition`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className='mt-6'>{children}</div>

      {/* Bottom Buttons */}
      <div className='sticky w-full bottom-10 right-0 flex justify-end gap-4 px-2 sm:px-8 z-10'>
        <button
          onClick={handleSkip}
          className='text-white font-semibold text-base sm:text-xl px-6 sm:px-8 py-2 rounded-2xl bg-[#333333]'
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className='text-[#0248F7] font-semibold text-base sm:text-xl px-6 sm:px-8 py-2 rounded-2xl bg-[#E1FF01]'
        >
          {isLastStep ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Layout;
