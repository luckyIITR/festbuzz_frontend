'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFests } from '@/hooks/fest';
import { Fest } from '@/types/fest';
import LocationImage from '../../../public/assets/Location.png';
import DateImage from '../../../public/assets/Calender.png';
import WishlistToggle from './WishlistToggle';

interface FestCardProps {
  fest?: Fest;
  fests?: Fest[];
}

const FestCard: React.FC<FestCardProps> = ({ fest, fests: propFests }) => {
  const { data: fetchedFests, isLoading, error } = useFests();

  // Use prop fests if provided, otherwise use fetched fests
  const fests = propFests || fetchedFests;
  const publishedFests = fests?.filter((f) => f.status === 'published');
  const [user, setUser] = useState();
  useEffect(() => {
    function syncUser() {
      const userStr = localStorage.getItem('user');
      setUser(userStr ? JSON.parse(userStr) : null);
    }
    syncUser();
    window.addEventListener('userChanged', syncUser);
    return () => window.removeEventListener('userChanged', syncUser);
  }, []);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // If a single fest is provided, render just that one
  if (fest) {
    const truncated = fest.name.length > 27 ? fest.name.slice(0, 25) + ' ...' : fest.name;
    const displayName = hoverIndex === 0 ? fest.name : truncated;

    return (
      <div
        key={0}
        className="w-[284px] relative bg-[#1E1E1E] p-2.5 rounded-2xl overflow-hidden shadow-lg flex flex-col"
      >
        {/* Overall vertical blending gradient (top to bottom) */}
        <div className="absolute inset-0 h-full z-0 rounded-2xl"
          style={{
            background: 'linear-gradient(to bottom, #fd3eb41a 0%, #360a75 50%, #0247f72f 100%)',
            opacity: 0.4,
          }}
        />

        {/* Pink Gradient (top) */}
        <div className="absolute inset-0 h-[190px] bg-gradient-to-r from-[#1e1e1e] to-[#fd3eb41a] z-[1] rounded-t-2xl"
          style={{
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
            maskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
          }}
        />

        {/* Blue Gradient (bottom) */}
        <div className="absolute inset-0 h-[233px] top-[170px] bg-gradient-to-r from-[#1E1E1E] to-[#0247f72f] z-[1] rounded-b-2xl"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
          }}
        />
        <div className="relative z-10">
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
            onMouseEnter={() => setHoverIndex(0)}
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
            {fest.about?.slice(0, 40) || 'Exciting Fest Coming Soon!'}
          </div>

          <div className="flex justify-between flex-wrap mt-4">
            <div className="flex flex-col ml-1 gap-1">
              <div className="flex items-center gap-1">
                <Image src={LocationImage} alt="Location" width={9} height={20} />
                <div className="font-urbanist font-[700] text-[#888888] text-[13px]">
                  {fest.venue || fest.city || 'TBA'}
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
                ₹{fest.tickets?.[0]?.price || 0}
              </div>
              <div className="font-urbanist font-[600] text-[#727272] text-[10px]">
                Participation fees
              </div>
            </div>
          </div>

          <Link href={`/fests/${fest._id || fest.id}`}>
            <button className="mt-3 h-8 rounded-xl mx-1 bg-[#FD3EB5] w-full hover:ring-2 hover:ring-white text-[#FFFFFF] transition cursor-pointer font-urbanist font-[700]">
              View Info
            </button>
          </Link>

          <div className="absolute w-20 h-8  bg-gradient-to-r from-[#1e1e1e] to-[#473340] top-0 left-0 rounded-tl-[10px] rounded-br-[10px] text-center pt-1 font-urbanist text-[14px] font-[700] text-[#FD3EB5]">
            {fest.type || 'General'}
          </div>

          <div className="absolute top-2.5 right-4">
            <WishlistToggle festId={fest.id || fest._id || ''} size="sm" />
          </div>
        </div>
      </div>
    );
  }

  // Original behavior for grid of fests
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading fests</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {publishedFests?.map((fest, i) => {
        const isHovering = hoverIndex === i;
        const truncated = fest.name.length > 27 ? fest.name.slice(0, 25) + ' ...' : fest.name;
        const displayName = isHovering ? fest.name : truncated;

        return (
          <div
            key={i}
            className="w-[284px] relative bg-[#1E1E1E] p-2.5 rounded-2xl overflow-hidden shadow-lg flex flex-col"
          >
            {/* Overall vertical blending gradient (top to bottom) */}
            <div className="absolute inset-0 h-full z-0 rounded-2xl"
              style={{
                background: 'linear-gradient(to bottom, #fd3eb41a 0%, #360a75 50%, #0247f72f 100%)',
                opacity: 0.4,
              }}
            />

            {/* Pink Gradient (top) */}
            <div className="absolute inset-0 h-[190px] bg-gradient-to-r from-[#1e1e1e] to-[#fd3eb41a] z-[1] rounded-t-2xl "
              style={{
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
                maskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
              }}
            />

            {/* Blue Gradient (bottom) */}
            <div className="absolute inset-0 h-[233px] top-[170px] bg-gradient-to-r from-[#1E1E1E] to-[#0247f72f] z-[1] rounded-b-2xl"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
              }}
            />

            {/* Card content */}
            <div className="relative z-10">
              <Image
                src={fest.bannerImage || fest.heroImage || '/assets/CardImage.png'}
                alt="Event"
                width={284} // match card width
                height={160}
                className="object-cover rounded-[10px]"
              />

              <div
                style={{
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  whiteSpace: 'nowrap',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#FD3EB5 transparent',
                  WebkitAppearance: 'none',
                  msOverflowStyle: 'none',
                }}
                className="ml-1 mr-0.5 mt-3 text-[20px] font-urbanist font-[500] h-[5vh] cursor-pointer hide-chrome-scroll-arrows"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {displayName}

                <style jsx>{`
    .hide-chrome-scroll-arrows {
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }

    .hide-chrome-scroll-arrows::-webkit-scrollbar {
      height: 4px;
    }

    .hide-chrome-scroll-arrows::-webkit-scrollbar-thumb {
      background-color: #fd3eb5;
      border-radius: 10px;
      border: 2px solid transparent;
      background-clip: content-box;
    }

    .hide-chrome-scroll-arrows::-webkit-scrollbar-track {
      background: transparent;
    }

    .hide-chrome-scroll-arrows::-webkit-scrollbar-button,
    .hide-chrome-scroll-arrows::-webkit-scrollbar-button:horizontal:increment,
    .hide-chrome-scroll-arrows::-webkit-scrollbar-button:horizontal:decrement {
      display: none;
      width: 0;
      height: 0;
    }

    .hide-chrome-scroll-arrows::-webkit-scrollbar-corner {
      background: transparent;
    }

    .hide-chrome-scroll-arrows::-webkit-scrollbar-track-piece:start,
    .hide-chrome-scroll-arrows::-webkit-scrollbar-track-piece:end {
      background: transparent;
      margin: 0;
    }
  `}</style>
              </div>

              <div className="ml-1 text-[16px] text-[#717171]  font-urbanist font-[600]">
                {fest.about?.slice(0, 40) || 'Exciting Fest Coming Soon!'}
              </div>

              <div className="flex justify-between flex-wrap mt-4">
                <div className="flex flex-col ml-1 gap-1">
                  <div className="flex items-center gap-1">
                    <Image src={LocationImage} alt="Location" width={9} height={20} />
                    <div className="font-urbanist font-[700] text-[#888888] text-[13px]">
                      {fest.venue || fest.city || 'TBA'}
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
                    ₹{fest.tickets?.[0]?.price || 0}
                  </div>
                  <div className="font-urbanist font-[600] text-[#727272] text-[10px]">
                    Participation fees
                  </div>
                </div>
              </div>

              <Link href={`/fests/${fest._id || fest.id}`}>
                <button className="mt-3 h-8 rounded-xl mx-1 bg-[#FD3EB5] w-full hover:ring-2 hover:ring-[#FD3EB5]  transition cursor-pointer text-[#FFFFFF] font-urbanist font-[700]">
                  View Info
                </button>
              </Link>

              <div className="absolute w-20 h-8  bg-gradient-to-r from-[#1e1e1e] to-[#473340] top-0 left-0 rounded-tl-[10px] rounded-br-[10px] text-center pt-1 font-urbanist text-[14px] font-[700] text-[#FD3EB5]">
                {fest.type || 'General'}
              </div>
              {user ? (<div className="absolute top-2.5 right-4">
                <WishlistToggle festId={fest.id || fest._id || ''} size="sm" />
              </div>) : (<div></div>)}

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FestCard;
