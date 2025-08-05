'use client'
import CallToAction from '@/app/components/CallToAction';
import { useEvent } from '@/hooks/events/useEvent';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Sponsor {
  id?: string;
  _id?: string;
  name?: string;
  logo?: string;
  image?: string;
}

interface Judge {
  id?: string;
  _id?: string;
  name?: string;
  photo?: string;
  bio?: string;
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const festId = params?.festId as string;
  const eventId = params?.eventId as string;
  const { data: event, isLoading, error } = useEvent(festId, eventId);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto mt-8 bg-zinc-900 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-lg">
        <Image src={event.bannerImage || event.image || 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80'} alt={event.name} width={900} height={400} className="w-full md:w-1/2 h-64 md:h-auto object-cover object-center" />
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">{event.category || 'Event'}</span>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-2">{event.name}</h1>
            <div className="flex items-center gap-3 text-gray-400 text-xs mb-2">
              <span>🏫 {event.location || 'TBA'}</span>
              <span>•</span>
              <span>📅 {event.startDate && event.endDate ? formatDateRange(event.startDate, event.endDate) : 'Date TBA'}</span>
              {event.startDate && (
                <>
                  <span>•</span>
                  <span>🕙 {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Onwards</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col md:items-end md:justify-end gap-3 mt-4 md:mt-0">
            <div className="text-right">
              <span className="text-2xl font-bold text-lime-300">₹{event.price}</span>
              <div className="text-xs text-gray-300">{event.isTeamEvent ? 'Team fee' : 'Individual fee'}</div>
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition"
              onClick={() => setShowModal(true)}
            >
              Participate now ↗
            </button>
          </div>
        </div>
      </div>

      {/* Modal for registration type selection */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
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

      <div className="max-w-5xl mx-auto px-4 md:px-0 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Event Details */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">EVENT DETAILS</h2>
          </div>
          <div className="text-gray-300 text-sm mb-4">
            <span className="font-bold">Date and Time:</span> {event.startDate && event.endDate ? formatDateRange(event.startDate, event.endDate) : 'TBA'}<br />
            <span className="font-bold">Location:</span> {event.location || 'TBA'}<br />
            <span className="font-bold">Prizes:</span> {event.prizes || 'TBA'}
          </div>
          <div className="text-gray-300 text-sm mb-4">
            <span className="font-bold">Description:</span> {event.description || 'No description available'}
          </div>
          <button className="bg-zinc-800 text-white px-6 py-2 rounded-full mt-2">Read more</button>
        </section>

        {/* Rules & Code of Conduct */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">RULES & CODE OF CONDUCT</h2>
          </div>
          <ul className="text-gray-300 text-sm mb-6 list-disc list-inside space-y-2">
            {event.rules
              ? event.rules.split('\n').map((rule: string, i: number) => <li key={i}>{rule}</li>)
              : [
                  'Teams must consist of 2-4 members.',
                  'All code must be written during the event.',
                  'Projects must be submitted by the deadline.',
                  'Respectful behavior is expected at all times.',
                ].map((rule, i) => <li key={i}>{rule}</li>)}
          </ul>
          <button className="bg-zinc-700 text-white px-6 py-2 rounded-full">Download</button>
        </section>
      </div>

      {/* Event Sponsors Section */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">EVENT SPONSORS</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Array.isArray(event.sponsors) && event.sponsors.length > 0 ? (
            event.sponsors.map((sponsor: Sponsor) => (
              <div key={sponsor.id || sponsor._id} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[100px] h-[100px] shadow-md">
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
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">EVENT JUDGES</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Array.isArray(event.judges) && event.judges.length > 0 ? (
            event.judges.map((judge: Judge) => (
              <div key={judge.id || judge._id} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[150px] h-[150px] shadow-md">
                <Image src={judge.photo || 'https://via.placeholder.com/100x100'} alt={judge.name || 'Judge'} width={100} height={100} className="max-h-20 max-w-[100px] object-contain rounded-full" />
                <div className="text-center mt-2">
                  <div className="font-bold text-black">{judge.name}</div>
                  <div className="text-xs text-gray-600">{judge.bio}</div>
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
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center text-center">
        <span className="inline-block w-8 h-8 bg-pink-500 rounded-full mb-4 animate-pulse" />
        <h2 className="text-2xl md:text-4xl font-extrabold text-lime-200 mb-2">DON&apos;T MISS OUT THIS BANGER!!</h2>
        <p className="text-white text-base md:text-lg mb-6">Secure your spot now and get ready to make memories that will last a lifetime! Register today</p>
        <Link href={`/fests/${festId}/events/${eventId}/register`} className="inline-block px-8 py-3 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg hover:bg-blue-600 transition">
          Register now <span className="ml-2">↗</span>
        </Link>
      </div>

      <CallToAction />
    </div>
  );
} 