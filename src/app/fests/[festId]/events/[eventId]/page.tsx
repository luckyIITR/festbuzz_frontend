'use client'
import CallToAction from '@/app/components/CallToAction';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const eventImage = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80';

export default function EventDetailsPage() {
  const params = useParams();
  const festId = params?.festId;
  const eventId = params?.eventId;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto mt-8 bg-zinc-900 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-lg">
        <Image src={eventImage} alt="Event" width={900} height={400} className="w-full md:w-1/2 h-64 md:h-auto object-cover object-center" />
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">Cultural</span>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-2">SINGING THE FLOOR</h1>
            <div className="text-gray-300 text-sm mb-2">Organized by - IIT Roorkee</div>
            <div className="flex items-center gap-3 text-gray-400 text-xs mb-2">
              <span>🏫 IIT Roorkee</span>
              <span>•</span>
              <span>📅 14-20 Sep. 2025</span>
              <span>•</span>
              <span>🕙 10 AM Onwards</span>
            </div>
          </div>
          <div className="flex flex-col md:items-end md:justify-end gap-3 mt-4 md:mt-0">
            <div className="text-right">
              <span className="text-2xl font-bold text-lime-300">₹200</span>
              <div className="text-xs text-gray-300">Individual fee</div>
            </div>
            <Link href="#">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition"
                onClick={e => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                Participate now ↗
              </button>
            </Link>
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
              >
                Individual
              </button>
              <button
                className="px-6 py-2 rounded-full bg-pink-500 text-white font-bold hover:bg-pink-600 transition"
                onClick={() => router.push(`/fests/${festId}/events/${eventId}/register/team`)}
              >
                Team
              </button>
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
          <div className="text-white text-base mb-2">
            <span className="font-bold">Eligibility:</span> No criteria<br />
            <span className="font-bold">Theme:</span> Retro Vibes
          </div>
          <div className="text-gray-300 text-sm mb-4">
            Date and Time: Saturday, May 4th, 2024 at 9:00 AM - 6:00 PM<br />
            Location: Virtual Event (Online)<br />
            Organizer: FesTech Society<br />
            Contact: techsociety@college.edu<br />
            Eligibility: No criteria<br />
            Theme: [Choose a captivating theme, e.g., &quot;Retro Vibes,&quot; &quot;Tech Odyssey,&quot; or &quot;Cultural Kaleidoscope&quot;]<br />
            Special Attractions [Highlight any unique features, e.g., celebrity guest appearances, food stalls, art installations]<br />
            Perks for Participants: [Free goodies, certificates, networking opportunities]
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
            <li>Teams must consist of 2-4 members.</li>
            <li>All code must be written during the event.</li>
            <li>Projects must be submitted by the deadline.</li>
            <li>Respectful behavior is expected at all times.</li>
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
          {[
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
          ))}
        </div>
      </div>

      {/* Event Judges Section */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">EVENT JUDGES</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {[
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo98Gu4mCos9dCRQKu1QPj2mL12YpK9_xjDg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
          ].map((logo, i) => (
            <div key={i} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[150px] h-[150px] shadow-md">
              <Image src={logo} alt="Judge" width={80} height={64} className="max-h-20 max-w-[100px] object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Banner */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center text-center">
        <span className="inline-block w-8 h-8 bg-pink-500 rounded-full mb-4 animate-pulse" />
        <h2 className="text-2xl md:text-4xl font-extrabold text-lime-200 mb-2">DON&apos;T MISS OUT THIS BANGER!!</h2>
        <p className="text-white text-base md:text-lg mb-6">Secure your spot now and get ready to make memories that will last a lifetime! Register today</p>
        <a href="#" className="inline-block px-8 py-3 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg hover:bg-blue-600 transition">
          Register now <span className="ml-2">↗</span>
        </a>
      </div>

      <CallToAction />
    </div>
  );
} 