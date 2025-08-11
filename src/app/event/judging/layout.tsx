'use client';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const steps = [
  '/event/judging',
  '/event/judging/filterCondition',
  '/event/judging/ParametersandRounds',
];

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen px-4">
      {/* Scrollable Navbar */}
      <div className="mt-5 bg-[#1E1E1E] rounded-3xl overflow-x-auto">
        <div className="flex flex-nowrap justify-start md:justify-between gap-6 px-4 py-2 min-w-max">
          {steps.map((step, idx) => {
            const label = ['Manage judges', 'Filter Condition', 'Parameters and Rounds'][idx];
            return (
              <Link
                key={step}
                className={`whitespace-nowrap hover:text-[#A0A0A0] transition-colors duration-200 font-medium ${
                  pathname === step ? 'text-[#E1FF01]' : 'text-[#545454]'
                }`}
                href={step}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Page Content */}
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default Layout;
