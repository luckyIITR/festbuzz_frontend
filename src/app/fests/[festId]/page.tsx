'use client'
import CallToAction from '@/app/components/CallToAction';
import { useFest } from '@/hooks/useFest';
import { useFestEvents } from '@/hooks/useFestEvents';
import { useFestRegistrationStatus } from '@/hooks/useFestRegistrationStatus';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/types/fest';
import { useRef, useState, useEffect } from 'react';
import FestCard from '@/app/components/FestCard';
import EventCard from '@/app/components/EventCard';
export default function FestDetailsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const params = useParams();
  const festId = params?.festId as string;
  const { data: fest, isLoading: festLoading, error: festError } = useFest(festId);
  const { data: events, isLoading: eventsLoading, error: eventsError } = useFestEvents(festId);
  const { data: registrationStatus, isLoading: statusLoading } = useFestRegistrationStatus(festId);

  if (festLoading) return <div>Loading...</div>;
  if (festError) return <div>Error loading fest details</div>;
  if (!fest) return <div>No fest found</div>;

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startFormatted = start.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    const endFormatted = end.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${startFormatted}-${endFormatted}`;
  };

  const isRegistered = registrationStatus?.isRegistered || false;
  const isLoadingStatus = statusLoading;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[320px] md:h-[300px] flex items-end overflow-hidden">
        <Image
          src={fest.heroImage || fest.bannerImage || 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80'}
          alt={`${fest.name} Hero`}
          width={1500}
          height={400}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end  md:justify-between px-2 md:px-16 pb-8">
          <div className="flex items-center gap-6 flex-row-reverse md:flex-row  ">
            <Image
              src={fest.logo || fest.organizerLogo || 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Fest_logo_example.png'}
              alt={`${fest.name} Logo`}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border-4 border-yellow-400 bg-black object-contain"
            />
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-yellow-300 mb-1">{fest.name}</h1>
              <div className="text-gray-200 text-sm mb-1">
                Organized by - <span className="font-semibold">{fest.organizer}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span>🏫 {fest.location}</span>
                <span>•</span>
                <span>📅 {formatDateRange(fest.startDate, fest.endDate)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 mt-6 md:mt-0">
            <div className="text-left md:text-right">
              <span className="text-2xl font-bold text-white">₹{fest.price}</span>
              <div className="text-xs text-gray-300">Individual fee</div>
            </div>
            {isLoadingStatus ? (
              <button className="bg-gray-500 text-white px-6 py-2 rounded-full font-bold cursor-not-allowed" disabled>
                Checking...
              </button>
            ) : isRegistered ? (
              <div className="flex flex-col items-end gap-2">
                <button className="bg-green-500 text-white px-6 py-2 rounded-full font-bold cursor-not-allowed" disabled>
                  ✓ Registered
                </button>
                <span className="text-xs text-green-400">Ticket: {registrationStatus?.registration?.ticket || 'N/A'}</span>
              </div>
            ) : (
              <Link href={`/fests/${festId}/register`}>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition">
                  Register now ↗
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Fest Details */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">FEST DETAILS</h2>
          </div>
          <div className="text-white text-base mb-4">
            <span className="font-bold">Eligibility:</span> {fest.eligibility || 'No criteria'}<br />
            <span className="font-bold">Theme:</span> {fest.theme || 'Not specified'}
          </div>
          <div className="text-gray-300 text-sm mb-4">
            <span className="font-bold">Special Attractions:</span> {fest.specialAttractions || 'To be announced'}
          </div>
          <div className="text-gray-300 text-sm mb-4">
            <span className="font-bold">Perks for Participants:</span> {fest.perks || 'Certificates and networking opportunities'}
          </div>
          <div className="text-gray-300 text-sm mb-4">
            <span className="font-bold">Description:</span> {fest.description || 'No description available'}
          </div>
          <button className="bg-zinc-900 text-white px-6 py-2 rounded-full mt-2">Read more</button>
        </section>

        {/* Peek in the Past */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">PEEK IN THE PAST</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {fest.galleryImages && fest.galleryImages.length > 0 ? (
              fest.galleryImages.map((img: string, i: number) => (
                <Image key={i} src={img} alt="Past Event" width={300} height={128} className="w-full h-28 md:h-32 object-cover rounded-xl" />
              ))
            ) : (
              // Fallback images if no gallery
              [
                'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
              ].map((img, i) => (
                <Image key={i} src={img} alt="Past Event" width={300} height={128} className="w-full h-28 md:h-32 object-cover rounded-xl" />
              ))
            )}
          </div>
        </section>
      </div>

      {/* Fest Events Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 mt-8">    {/* Events Grid */}
        <section className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
            <h2 className="text-xl md:text-2xl font-extrabold text-lime-300 tracking-tight">FEST EVENTS</h2>
          </div>

          <div className='flex justify-between md:flex-row-reverse flex-col'>
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="font-bold text-xl mb-4 text-white">CATEGORY</h3>
                <div className="flex  md:flex-col gap-3  overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 pb-4 ">
                  {fest.categories && fest.categories.length > 0 ? (
                    fest.categories.map((cat: string) => (
                      <select key={cat} className="bg-zinc-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400 w-full">
                        <option>{cat}</option>
                      </select>
                    ))
                  ) : (
                    ['Dance', 'Singing', 'Fine arts', 'Others'].map((cat) => (
                      <select key={cat} className="bg-zinc-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400 w-full">
                        <option>{cat}</option>
                      </select>
                    ))
                  )}
                </div>
              </div>
            </aside>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsLoading ? (
                <div>Loading events...</div>
              ) : eventsError ? (
                <div>Error loading events</div>
              ) : events && events.length > 0 ? (
                events.map((event: Event) => (
                  <Link key={event.id} href={`/fests/${festId}/events/${event.id}`} className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg flex flex-col relative hover:ring-2 hover:ring-lime-400 transition cursor-pointer">
                    <EventCard event={event} />
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-400 py-8">
                  No events available for this fest
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Category Sidebar */}

      </div>

      {/* Event Sponsors Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">EVENT SPONSORS</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {fest.sponsors && fest.sponsors.length > 0 ? (
            fest.sponsors.map((sponsor, i: number) => (
              <div key={i} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[100px] h-[100px] shadow-md">
                <Image
                  src={sponsor.logo || sponsor.image || 'https://via.placeholder.com/80x64'}
                  alt={sponsor.name || 'Sponsor'}
                  width={80}
                  height={64}
                  className="max-h-16 max-w-[80px] object-contain"
                />
              </div>
            ))
          ) : (
            // Fallback sponsor logos
            [
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo98Gu4mCos9dCRQKu1QPj2mL12YpK9_xjDg&s',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
            ].map((logo, i) => (
              <div key={i} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[100px] h-[100px] shadow-md">
                <Image src={logo} alt="Sponsor" width={80} height={64} className="max-h-16 max-w-[80px] object-contain" />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="relative w-4/5 h-120 m-auto">
        <video
          ref={videoRef}
          className="w-full h-full bg-[#393939] rounded-2xl object-cover"
          src="/assets/sample.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>

        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 px-3 py-1 text-sm bg-black text-white rounded"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button
          onClick={togglePlay}
          className="absolute bottom-4 left-4 bg-black text-white px-4 py-2 rounded-xl shadow-md"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      {/* Call-to-Action Banner */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center text-center">
        <span className="inline-block w-8 h-8 bg-pink-500 rounded-full mb-4 animate-pulse" />
        <h2 className="text-2xl md:text-4xl font-extrabold text-lime-200 mb-2">
          DON&apos;T MISS OUT THIS BANGER!!
        </h2>
        <p className="text-white text-base md:text-lg mb-6">
          Secure your spot now and get ready to make memories that will last a lifetime! Register today
        </p>
        {isLoadingStatus ? (
          <button className="inline-block px-8 py-3 rounded-full bg-gray-500 text-white font-bold text-lg shadow-lg cursor-not-allowed" disabled>
            Checking registration...
          </button>
        ) : isRegistered ? (
          <div className="inline-block px-8 py-3 rounded-full bg-green-500 text-white font-bold text-lg shadow-lg">
            ✓ Already Registered
          </div>
        ) : (
          <Link href={`/fests/${festId}/register`} className="inline-block px-8 py-3 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg hover:bg-blue-600 transition">
            Register now <span className="ml-2">↗</span>
          </Link>
        )}
      </div>

      <CallToAction />
    </div>
  );
} 