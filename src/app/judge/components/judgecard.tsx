'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

// Type definitions
interface Ticket {
  price: number;
}

interface Fest {
  id: string;
  name: string;
  about?: string;
  bannerImage?: string;
  heroImage?: string;
  venue?: string;
  city?: string;
  startDate?: string;
  tickets?: Ticket[];
  type?: string;
}

interface FestCardProps {
  fest?: Fest;
  fests?: Fest[];
}

// Mock data for demonstration
const mockFests: Fest[] = [
  {
    id: '1',
    name: 'TechFest 2025 - Innovation Summit',
    about: 'Annual technology festival showcasing innovation',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    venue: 'Mumbai',
    startDate: '2025-03-15',
    tickets: [{ price: 500 }],
    type: 'Tech'
  },
  {
    id: '2', 
    name: 'Cultural Extravaganza',
    about: 'Celebration of arts, music and dance',
    bannerImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop',
    venue: 'Delhi',
    startDate: '2025-04-20',
    tickets: [{ price: 300 }],
    type: 'Cultural'
  },
  {
    id: '3',
    name: 'Sports Championship',
    about: 'Inter-college sports competition event',
    bannerImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    venue: 'Bangalore',
    startDate: '2025-05-10',
    tickets: [{ price: 200 }],
    type: 'Sports'
  }
];

const FestCard: React.FC<FestCardProps> = ({ fest, fests: propFests }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  // Use provided fests or mock data
  const fests = propFests || mockFests;

  // If a single fest is provided, render just that one
  if (fest) {
    const truncated = fest.name.length > 27 ? fest.name.slice(0, 25) + ' ...' : fest.name;
    const displayName = hoverIndex === 0 ? fest.name : truncated;

    return (
      <div className="w-[284px] relative bg-gray-800 p-2.5 rounded-2xl overflow-hidden shadow-lg flex flex-col">
        {/* Background gradients */}
        <div 
          className="absolute inset-0 h-full z-0 rounded-2xl opacity-40"
          style={{
            background: 'linear-gradient(to bottom, rgba(253, 62, 180, 0.1) 0%, rgba(54, 10, 117, 1) 50%, rgba(2, 71, 247, 0.18) 100%)',
          }}
        />
        
        <div 
          className="absolute inset-0 h-[190px] z-[1] rounded-t-2xl"
          style={{
            background: 'linear-gradient(to right, #1e1e1e, rgba(253, 62, 180, 0.1))',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
            maskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
          }}
        />
        
        <div 
          className="absolute inset-0 h-[233px] top-[170px] z-[1] rounded-b-2xl"
          style={{
            background: 'linear-gradient(to right, #1E1E1E, rgba(2, 71, 247, 0.18))',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
          }}
        />

        <div className="relative z-10">
          <Image
            src={fest.bannerImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'}
            alt="Fest"
            width={400}
            height={160}
            className="w-full h-[160px] object-cover rounded-[10px]"
          />

          <div
            className="ml-1 mr-0.5 mt-3 text-[20px] font-medium h-[4.5vh] cursor-pointer overflow-x-auto overflow-y-hidden whitespace-nowrap"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#FD3EB5 transparent',
            }}
            onMouseEnter={() => setHoverIndex(0)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                height: 3px;
              }
              div::-webkit-scrollbar-thumb {
                background-color: #fd3eb5;
                border-radius: 10px;
              }
              div::-webkit-scrollbar-track {
                background: transparent;
              }
            `}</style>
            <span className="text-white">{displayName}</span>
          </div>

          <div className="ml-1 text-[16px] text-gray-400 font-semibold">
            {fest.about?.slice(0, 40) || 'Exciting Fest Coming Soon!'}
          </div>

          <div className="flex justify-between flex-wrap mt-4">
            <div className="flex flex-col ml-1 gap-1">
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-gray-500" />
                <div className="font-bold text-gray-500 text-[13px]">
                  {fest.venue || fest.city || 'TBA'}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} className="text-gray-500" />
                <div className="font-bold text-gray-500 text-[13px]">
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
              <div className="font-extrabold text-pink-500 text-[22px]">
                ₹{fest.tickets?.[0]?.price || 0}
              </div>
              <div className="font-semibold text-gray-400 text-[10px]">
                Participation fees
              </div>
            </div>
          </div>

          <button className="mt-3 h-8 rounded-xl mx-1 bg-pink-500 w-full hover:ring-2 hover:ring-white text-white transition cursor-pointer font-bold">
            View Info
          </button>

          <div className="absolute w-20 h-8 bg-gradient-to-r from-gray-800 to-gray-700 top-0 left-0 rounded-tl-[10px] rounded-br-[10px] text-center pt-1 text-[14px] font-bold text-pink-500">
            {fest.type || 'General'}
          </div>
        </div>
      </div>
    );
  }

  // Grid of fests
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 p-4">
      {fests?.map((fest: Fest, i: number) => {
        const isHovering = hoverIndex === i;
        const truncated = fest.name.length > 27 ? fest.name.slice(0, 25) + ' ...' : fest.name;
        const displayName = isHovering ? fest.name : truncated;

        return (
          <div
            key={i}
            className="w-[284px] relative bg-gray-800 p-2.5 rounded-2xl overflow-hidden shadow-lg flex flex-col"
          >
            {/* Background gradients */}
            <div 
              className="absolute inset-0 h-full z-0 rounded-2xl opacity-40"
              style={{
                background: 'linear-gradient(to bottom, rgba(253, 62, 180, 0.1) 0%, rgba(54, 10, 117, 1) 50%, rgba(2, 71, 247, 0.18) 100%)',
              }}
            />
            
            <div 
              className="absolute inset-0 h-[190px] z-[1] rounded-t-2xl"
              style={{
                background: 'linear-gradient(to right, #1e1e1e, rgba(253, 62, 180, 0.1))',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
                maskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
              }}
            />
            
            <div 
              className="absolute inset-0 h-[233px] top-[170px] z-[1] rounded-b-2xl"
              style={{
                background: 'linear-gradient(to right, #1E1E1E, rgba(2, 71, 247, 0.18))',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
              }}
            />

            <div className="relative z-10">
              <Image
                src={fest.bannerImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'}
                alt="Event"
                width={400}
                height={160}
                className="w-full h-[160px] object-cover rounded-[10px]"
              />

              <div
                className="ml-1 mr-0.5 mt-3 text-[20px] font-medium h-[5vh] cursor-pointer overflow-x-auto overflow-y-hidden whitespace-nowrap"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#FD3EB5 transparent',
                }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    height: 4px;
                  }
                  div::-webkit-scrollbar-thumb {
                    background-color: #fd3eb5;
                    border-radius: 10px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                  }
                  div::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  div::-webkit-scrollbar-button {
                    display: none;
                    width: 0;
                    height: 0;
                  }
                `}</style>
                <span className="text-white">{displayName}</span>
              </div>

              <div className="ml-1 text-[16px] text-gray-400 font-semibold">
                {fest.about?.slice(0, 40) || 'Exciting Fest Coming Soon!'}
              </div>

              <div className="flex justify-between flex-wrap mt-4">
                <div className="flex flex-col ml-1 gap-1">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-gray-500" />
                    <div className="font-bold text-gray-500 text-[13px]">
                      {fest.venue || fest.city || 'TBA'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-gray-500" />
                    <div className="font-bold text-gray-500 text-[13px]">
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
                  <div className="font-extrabold text-pink-500 text-[22px]">
                    ₹{fest.tickets?.[0]?.price || 0}
                  </div>
                  <div className="font-semibold text-gray-400 text-[10px]">
                    Participation fees
                  </div>
                </div>
              </div>

              <button 
                className="mt-3 h-8 rounded-xl mx-1 bg-pink-500 w-full hover:ring-2 hover:ring-pink-500 transition cursor-pointer text-white font-bold"
                onClick={() => console.log(`Viewing fest: ${fest.name}`)}
              >
                View Info
              </button>

              <div className="absolute w-20 h-8 bg-gradient-to-r from-gray-800 to-gray-700 top-0 left-0 rounded-tl-[10px] rounded-br-[10px] text-center pt-1 text-[14px] font-bold text-pink-500">
                {fest.type || 'General'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FestCard;