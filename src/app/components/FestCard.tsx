'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFests } from '@/hooks/useFests';
import LocationImage from '../../../public/assets/Location.png';
import DateImage from '../../../public/assets/Calender.png';
import { Fest } from '@/types/fest';
const FestCard = () => {
  const { data: fests, isLoading, error } = useFests();

  const [heartcolor, setHeartcolor] = useState<string[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    setHeartcolor(new Array(fests?.length || 0).fill('fill-none'));
  }, [fests?.length]);

  const handleClick = (i: number) => {
    const newcolor = [...heartcolor];
    newcolor[i] = newcolor[i] === 'fill-none' ? 'fill-pink-500' : 'fill-none';
    setHeartcolor(newcolor);
  };

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading fests</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {fests?.map((fest, i) => {
        const isHovering = hoverIndex === i;
        const truncated = fest.name.length > 27 ? fest.name.slice(0, 25) + ' ...' : fest.name;
        const displayName = isHovering ? fest.name : truncated;

        return (
          <div
            key={fest.id}
            className="w-[284px] relative bg-[#1E1E1E] p-2.5 rounded-2xl overflow-hidden shadow-lg flex flex-col"
          >
            <Image
              src={fest.bannerImage || fest.heroImage || '/assets/CardImage.png'}
              alt="Fest"
              width={284}
              height={160}
              className="w-full h-[160px] object-cover rounded-[10px]"
            />

            {/* Fest name with scroll on hover */}
            <div
              style={{
                overflowX: 'auto',
                overflowY: 'hidden',
                whiteSpace: 'nowrap',
                scrollbarWidth: 'thin',
                scrollbarColor: '#FD3EB5 transparent',
              }}
              className="ml-1 mr-0.5 mt-3 text-[20px] font-urbanist font-[500] h-[4.5vh] cursor-pointer cross-browser-scroll"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {displayName}

              <style jsx>{`
                .cross-browser-scroll {
                  -webkit-overflow-scrolling: touch;
                  scroll-behavior: smooth;
                }
                .cross-browser-scroll::-webkit-scrollbar {
                  height: 3px;
                }
                .cross-browser-scroll::-webkit-scrollbar-thumb {
                  background-color: #fd3eb5;
                  border-radius: 10px;
                }
                .cross-browser-scroll::-webkit-scrollbar-track {
                  background: transparent;
                }
                .cross-browser-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #fd3eb5 transparent;
                }
              `}</style>
            </div>

            <div className="ml-1 text-[16px] text-[#717171] font-urbanist font-[600]">
              {fest.description?.slice(0, 40) || 'Exciting Fest Coming Soon!'}
            </div>

            <div className="flex justify-between flex-wrap mt-4">
              <div className="flex flex-col ml-1 gap-1">
                <div className="flex items-center gap-1">
                  <Image src={LocationImage} alt="Location" width={9} height={20} />
                  <div className="font-urbanist font-[700] text-[#888888] text-[13px]">
                    {fest.location || 'TBA'}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Image src={DateImage} alt="Date" width={9} height={20} />
                  <div className="font-urbanist font-[700] text-[#888888] text-[13px]">
                    {fest.startDate
                      ? new Date(fest.startDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                      : 'Date TBA'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-right mr-2">
                <div className="font-urbanist font-[800] text-[#FD3EB5] text-[22px]">
                  ₹{fest.price || 0}
                </div>
                <div className="font-urbanist font-[600] text-[#727272] text-[10px]">
                  Participation fees
                </div>
              </div>
            </div>

            <Link href={`/fests/${fest.id}`}>
              <button className="mt-3 h-8 rounded-xl mx-1 bg-[#FD3EB5] w-full hover:ring-2 hover:ring-white transition cursor-pointer font-urbanist font-[700]">
                View Info
              </button>
            </Link>

            <div className="absolute w-20 h-8 bg-[#1E1E1E] top-2 left-2 rounded-tl-[10px] rounded-br-[10px] text-center pt-1 font-urbanist text-[14px] font-[700] text-[#FD3EB5]">
              {fest.categories?.[0] || 'General'}
            </div>

            <div
              className="absolute top-2.5 right-4 w-[22px] h-[22px] p-[1px] rounded-full cursor-pointer"
              onClick={() => handleClick(i)}
            >
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                xmlns="http://www.w3.org/2000/svg"
                className={`object-contain w-full h-full fill-current ${heartcolor[i]}`}
              >
                <path
                  d="M19.3115 2.50913C16.9773 0.0498337 14.2743 1.08705 12.6007 2.18391C11.655 2.80369 10.345 2.80369 9.39929 2.18392C7.72564 1.08706 5.02272 0.0498608 2.68853 2.50914C-2.85249 8.3471 6.64988 19.5967 11 19.5967C15.3502 19.5967 24.8525 8.3471 19.3115 2.50913Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FestCard;
