'use client'
import CallToAction from '@/app/components/CallToAction';
import { useEvent } from '@/hooks/events/useEvent';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import eventimage from '../../../../../../public/assets/event.png'
import location from '../../../../../../public/assets/Location.png'
import dateicon from '../../../../../../public/assets/Calender.png'
import clock from '../../../../../../public/assets/Clock.png'
import PinkDiamond from '../../../../../../public/assets/PinkDiamond.png'
import whiteDiamond from '../../../../../../public/assets/WhiteDiamond.png'
import Profileimage from '../../../../../../public/assets/Profileimage.png'

interface Sponsor {
  id?: string;
  _id?: string;
  name?: string;
  logo?: string;
  image?: string;
  website?: string;
}

interface Judge {
  id?: string;
  _id?: string;
  name?: string;
  photo?: string;
  bio?: string;
  mobile?: string;
  email?: string;
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const festId = params?.festId as string;
  const eventId = params?.eventId as string;
  const { data: event, isLoading, error } = useEvent(festId, eventId);
  const [showModal, setShowModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleClick = () => {
    if (!event) return;

    if (event.isTeamEvent) {
      router.push(`/fests/${festId}/events/${eventId}/register/team`);
    } else {
      router.push(`/fests/${festId}/events/${eventId}/register/individual`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading event details</div>;
  if (!event) return <div>No event found</div>;

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startFormatted = start.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    const endFormatted = end.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${startFormatted}-${endFormatted}`;
  };

  // Get the first ticket price or default to 0
  const ticketPrice = event.tickets?.[0]?.price || 0;
 
  // Description logic
  const description = event.description || 'No description available';
  const shouldTruncate = description.length > 100;
  const displayDescription = shouldTruncate && !isDescriptionExpanded
    ? description.substring(0, 100) + '...'
    : description;

  return (
    <div className="min-h-screen  text-white">
      {/* Hero Section */}
      <div className="max-w-[90vw] mx-auto mt-8  rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-lg">
        <Image src={eventimage} alt={event.name} width={1000} height={200} className="w-full md:w-1/2 h-64 md:h-auto object-cover object-center" />
        <div className="flex-1 px-6 flex flex-col justify-between">
          <div>
            <span className="inline-block mt-1  bg-[#FD3EB5] text-white dm-sans font-[800]  px-8 py-1 rounded-full mb-4">{event.type || 'Event'}</span>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-2 font-clash">{event.name}</h1>
            <div className='text-[#CBCBCB] font-urbanist font-[700] '>Organized by - IIT Roorkee</div>
            <div className='text-[#717171] font-urbanist font-[700]  mt-2 flex  content-center items-center flex-wrap'>
              <Image src={location} alt='' width={12} height={5} className='object-cover  w-3 mr-1' />
              <p> {event.venue || event.location || 'TBA'}</p></div>
            <div className='text-[#717171] font-urbanist font-[700]  flex  content-center items-center flex-wrap'>
              <Image src={dateicon} alt='' width={12} height={5} className='object-cover  w-3 mr-1' />
              <p> <span>{event.startDate && event.endDate ? formatDateRange(event.startDate, event.endDate) : 'Date TBA'}</span>
              </p>
            </div>
            <div className='text-[#717171] font-urbanist font-[700]  flex  content-center items-center flex-wrap'>
              <Image src={clock} alt='' width={12} height={5} className='object-cover  w-3 mr-1' />
              <p> <span> {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Onwards</span>
              </p>
            </div>

          </div>
          <div className='flex justify-end w-auto content-center gap-5'>
            <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 14.7485C14.9583 14.7485 14.25 15.061 13.7083 15.5506L6.28125 11.2277C6.33333 10.9881 6.375 10.7485 6.375 10.4985C6.375 10.2485 6.33333 10.0089 6.28125 9.76935L13.625 5.4881C14.1875 6.00893 14.9271 6.33185 15.75 6.33185C17.4792 6.33185 18.875 4.93601 18.875 3.20685C18.875 1.47768 17.4792 0.0818481 15.75 0.0818481C14.0208 0.0818481 12.625 1.47768 12.625 3.20685C12.625 3.45685 12.6667 3.69643 12.7188 3.93601L5.375 8.21726C4.8125 7.69643 4.07292 7.37351 3.25 7.37351C1.52083 7.37351 0.125 8.76935 0.125 10.4985C0.125 12.2277 1.52083 13.6235 3.25 13.6235C4.07292 13.6235 4.8125 13.3006 5.375 12.7798L12.7917 17.1131C12.7396 17.3318 12.7083 17.561 12.7083 17.7902C12.7083 19.4673 14.0729 20.8318 15.75 20.8318C17.4271 20.8318 18.7917 19.4673 18.7917 17.7902C18.7917 16.1131 17.4271 14.7485 15.75 14.7485Z" fill="white" />
            </svg>
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.3115 2.50913C16.9773 0.0498337 14.2743 1.08705 12.6007 2.18391C11.655 2.80369 10.345 2.80369 9.39929 2.18392C7.72564 1.08706 5.02272 0.0498608 2.68853 2.50914C-2.85249 8.3471 6.64988 19.5967 11 19.5967C15.3502 19.5967 24.8525 8.3471 19.3115 2.50913Z" stroke="white" stroke-width="1.5" stroke-linecap="round" />
            </svg>

          </div>
          <div className='flex justify-between'>
            <div className="flex flex-col">
              <span className="text-3xl font-urbanist  font-[600] text-[#E1FF01]">₹{ticketPrice}</span>
              <div className="text-[#9A9A9A] font-urbanist font-[700] ">{event.isTeamEvent ? 'Team fee' : 'Individual fee'}</div>
            </div>
            <button
              className="bg-[#0248F7] text-[#E1FF01] h-10 px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition"
              onClick={handleClick}
            >
              Participate now ↗
            </button>
          </div>
        </div>
      </div>

      {/* Modal for registration type selection */}
      {showModal && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl flex flex-col items-center w-80">
            <h3 className="text-xl font-bold mb-4 text-white">Choose Registration Type</h3>
            <div className="flex gap-4 mb-4">
              <button
                className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                onClick={() => router.push(`/fests/${festId}/events/${eventId}/register/individual`)}
                disabled={!!event.isTeamEvent}
              >
                Individual
              </button>
              {event.isTeamEvent && (
                <button
                  className="px-6 py-2 rounded-full bg-pink-500 text-white font-bold hover:bg-pink-600 transition"
                  onClick={() => router.push(`/fests/${festId}/events/${eventId}/register/team`)}
                >
                  Team
                </button>
              )}
            </div>
            <button className="text-gray-400 hover:text-white mt-2" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="max-w-[90vw] mx-auto px-4 md:px-0 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Event Details */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Image alt='pinkdiamond' src={PinkDiamond} className='w-8 h-8' />
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">EVENT DETAILS</h2>
          </div>
          <div className="text-gray-300 text-sm mb-4 px-4">
            <span className="font-bold">Date and Time:</span> {event.startDate && event.endDate ? formatDateRange(event.startDate, event.endDate) : 'TBA'}<br />
            <span className="font-bold">Location:</span> {event.venue || event.location || 'TBA'}<br />
            <span className="font-bold">Mode:</span> {event.mode || 'TBA'}<br />
            <span className="font-bold">Max Participants:</span> {event.maxParticipants || 'Unlimited'}
          </div>
          <div className="text-gray-300 text-sm mb-4 px-4">
            <span className="font-bold">Description:</span> {displayDescription}
          </div>
          {shouldTruncate && (
            <button
              className="bg-zinc-800 text-white px-6 py-2 rounded-full mt-2"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </section>

        {/* Rewards Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Image alt='pinkdiamond' src={PinkDiamond} className='w-8 h-8' />
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">REWARDS & PRIZES</h2>
          </div>
          {event.rewards && event.rewards.length > 0 ? (
            <div className="space-y-3">
              {event.rewards.map((reward, index) => (
                <div key={index} className=" rounded-lg px-4">
                  <div className="font-bold text-[#E1FF01] px-2">{reward.rank}</div>
                  <div className="text-gray-300 text-sm px-2">
                    <div>Cash Prize: ₹{reward.cash.toLocaleString()}</div>
                    {reward.goodies && <div>Goodies: {reward.goodies}</div>}
                    {reward.coupon && <div>Coupon: {reward.coupon}</div>}
                    <div className="mt-1 mx-0.5">{reward.description}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm">Rewards information will be announced soon.</div>
          )}
        </section>
      </div>

      {/* Event Sponsors Section */}
      <div className="max-w-[90vw] mx-auto py-10">
        <div className="flex items-center gap-2 mb-4">
          <Image alt='pinkdiamond' src={PinkDiamond} className='w-8 h-8' />
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">EVENT SPONSORS</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Array.isArray(event.sponsors) && event.sponsors.length > 0 ? (
            event.sponsors.map((sponsor: Sponsor, index: number) => (
              <div key={sponsor.id || sponsor._id || index} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[100px] h-[100px] shadow-md">
                <Image src={sponsor.logo || sponsor.image || 'https://via.placeholder.com/80x64'} alt={sponsor.name || 'Sponsor'} width={80} height={64} className="max-h-16 max-w-[80px] object-contain" />
              </div>
            ))
          ) : ([
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo98Gu4mCos9dCRQKu1QPj2mL12YpK9_xjDg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
          ].map((logo, i) => (
            <div key={i} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[100px] h-[100px] shadow-md">
              <Image src={logo} alt="Sponsor" width={80} height={64} className="max-h-16 max-w-[80px] object-contain" />
            </div>
          )))}
        </div>
      </div>

      {/* Event Judges Section */}
      <div className="max-w-[90vw] mx-auto  py-10">
        <div className="flex items-center gap-2 mb-4">
          <Image alt='pinkdiamond' src={PinkDiamond} className='w-8 h-8' />
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">EVENT JUDGES</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Array.isArray(event.judges) && event.judges.length > 0 ? (
            event.judges.map((judge: Judge, index: number) => (
              <div key={judge.id || judge._id || index} className="bg-[#191919] rounded-xl p-3 flex flex-col items-center justify-center  w-70 h-80 shadow-md">
                <Image src={Profileimage || judge.photo} alt={judge.name || 'Judge'} width={150} height={150} className=" object-cover object-center rounded-full" />
                <div className="text-center mt-2">
                  <div className=" text-white font-urbanist font-[600] text-2xl mt-4">{judge.name}</div>
                  <div className="text-xs text-[#ACACAC] mt-1 mx-6 ">{judge.bio}</div>
                </div>
              </div>
            ))
          ) : ([
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo98Gu4mCos9dCRQKu1QPj2mL12YpK9_xjDg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
          ].map((logo, i) => (
            <div key={i} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[150px] h-[150px] shadow-md">
              <Image src={logo} alt="Judge" width={100} height={100} className="max-h-20 max-w-[100px] object-contain rounded-full" />
            </div>
          )))}
        </div>
      </div>

      {/* Call-to-Action Banner */}
      <div className="max-w-[90vw] mx-auto px-4 md:px-8 py-12 flex flex-col items-center text-center">
        <Image alt='pinkdiamond' src={PinkDiamond} className='w-12 h-12' />
        <h2 className="text-2xl md:text-4xl font-[800] text-[#E1FF01] font-clash mb-3 mt-5">DON&apos;T MISS OUT THIS BANGER!!</h2>
        <p className="text-white text-base max-w-lg font-[700] md:text-lg mb-6 font-urbanist">Secure your spot now and get ready to make memories that will last a lifetime! Register today</p>
        <Link href={`/fests/${festId}/events/${eventId}/register`} className="inline-block px-8 py-2 rounded-full bg-[#0248F7] text-[#E1FF01] font-bold text-lg shadow-lg hover:bg-blue-600 transition">
          Register now <span className="ml-2">↗</span>
        </Link>
      </div>
      <div className='flex w-full md:justify-around content-center flex-wrap mt-62 md:gap-4 justify-center  '>
        <div className='flex justify-center content-center flex-wrap gap-1 '>
          <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 h-5 w-5 ' alt='' />
          <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
          <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
        </div>
        <div className='flex justify-center content-center flex-wrap gap-1 '>
          <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 h-5 w-5 ' alt='' />
          <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
          <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
        </div>
        <div className='flex justify-center content-center flex-wrap gap-1 md:w-auto w-0 overflow-hidden '>
          <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 h-5 w-5 ' alt='' />
          <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
          <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
        </div>
        <div className='flex justify-center content-center flex-wrap gap-1  md:w-auto w-0 overflow-hidden'>
          <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 w-5 h-5 ' alt='' />
          <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
          <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
        </div>
        <div className='flex justify-center content-center flex-wrap gap-1 md:w-auto w-0 overflow-hidden '>
          <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 ' alt='' />
          <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
          <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
        </div>
      </div>

      <CallToAction />
    </div>
  );
}