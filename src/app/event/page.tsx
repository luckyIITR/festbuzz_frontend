'use client';
import React from 'react';

const steps = [
  { label: 'Basics' },
  { label: 'Venue' },
  { label: 'Details' },
  { label: 'Images' },
  { label: 'Rewards' },
];

const addOns = [
  { label: 'Info' },
  { label: 'Judges' },
  { label: 'Parameters' },
  { label: 'Roles' },
];

const initialRewards = [
  { rank: '1st', cash: '₹2000', coupon: '', goodies: '' },
  { rank: '2nd', cash: '₹1000', coupon: '', goodies: '' },
  { rank: '3rd', cash: '₹500', coupon: '', goodies: '' },
];

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = React.useState(0); // 0-based index
  const [visibility, setVisibility] = React.useState('open');
  const [eventMode, setEventMode] = React.useState('online');
  const [rewards, setRewards] = React.useState(initialRewards);

  // Step content renderers
  function renderStepContent() {
    switch (currentStep) {
      case 0:
        return (
          <form className="max-w-2xl mx-auto flex flex-col gap-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Event name</label>
              <input type="text" placeholder="Name your event" className="w-full bg-[#232323] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Event type</label>
              <select className="w-full bg-[#232323] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]">
                <option value="">Select event type</option>
                <option value="workshop">Workshop</option>
                <option value="competition">Competition</option>
                <option value="seminar">Seminar</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Event Visibility</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-semibold border-2 transition-colors ${visibility === 'open' ? 'bg-[#232323] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#232323] border-[#232323] text-white'}`}
                  onClick={() => setVisibility('open')}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a8.001 8.001 0 017.938 7.09c.042.33.062.66.062.99s-.02.66-.062.99A8.001 8.001 0 0112 19.646a8.001 8.001 0 01-7.938-7.09A7.963 7.963 0 014 12c0-.33.02-.66.062-.99A8.001 8.001 0 0112 4.354z" /></svg>
                  Open to all
                </button>
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-semibold border-2 transition-colors ${visibility === 'private' ? 'bg-[#232323] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#232323] border-[#232323] text-white'}`}
                  onClick={() => setVisibility('private')}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8 0-1.657.504-3.197 1.375-4.475M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Private
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">This visibility will define who can enroll and participate.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-lg font-semibold mb-2">Event starts</label>
                <div className="relative">
                  <input type="date" className="w-full bg-[#232323] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-lg font-semibold mb-2">Event ends</label>
                <div className="relative">
                  <input type="date" className="w-full bg-[#232323] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </span>
                </div>
              </div>
            </div>
          </form>
        );
      case 1:
        return (
          <form className="max-w-2xl mx-auto flex flex-col gap-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Event Mode</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-semibold border-2 transition-colors ${eventMode === 'online' ? 'bg-[#232323] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#232323] border-[#232323] text-white'}`}
                  onClick={() => setEventMode('online')}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a8.001 8.001 0 017.938 7.09c.042.33.062.66.062.99s-.02.66-.062.99A8.001 8.001 0 0112 19.646a8.001 8.001 0 01-7.938-7.09A7.963 7.963 0 014 12c0-.33.02-.66.062-.99A8.001 8.001 0 0112 4.354z" /></svg>
                  Online
                </button>
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-semibold border-2 transition-colors ${eventMode === 'offline' ? 'bg-[#232323] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#232323] border-[#232323] text-white'}`}
                  onClick={() => setEventMode('offline')}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8 0-1.657.504-3.197 1.375-4.475M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Offline
                </button>
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Location</label>
              <input type="text" placeholder="Name your event" className="w-full bg-[#232323] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Venue</label>
              <select className="w-full bg-[#232323] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]">
                <option value="">Select event type</option>
                <option value="auditorium">Auditorium</option>
                <option value="hall">Hall</option>
                <option value="outdoor">Outdoor</option>
                <option value="other">Other</option>
              </select>
              <p className="text-xs text-gray-400 mt-2">Venue Not Decide Yet? <span className="text-[#E6FF4C] underline cursor-pointer">No worries you can add it later</span></p>
            </div>
          </form>
        );
      case 2:
        return (
          <form className="max-w-2xl mx-auto flex flex-col gap-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Rulebook link</label>
              <input type="text" placeholder="URL" className="w-full bg-[#232323] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Event details</label>
              {/* Placeholder for rich text editor */}
              <div className="bg-[#232323] rounded-xl p-4 min-h-[180px] flex flex-col">
                <div className="flex gap-2 mb-2">
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">B</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">I</button>
                  <button type="button" className="text-[#E6FF4C] font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">U</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">•</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">1.</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">"</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">🔗</button>
                </div>
                <textarea
                  className="bg-transparent w-full h-32 text-white placeholder-gray-500 focus:outline-none resize-none"
                  placeholder="Describe about your event make sure add all details including eligibility and others"
                />
              </div>
            </div>
          </form>
        );
      case 3:
        return (
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <label className="block text-lg font-semibold mb-4">Upload Photos</label>
            <div className="flex gap-8">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="w-64 h-64 bg-[#232323] rounded-2xl flex flex-col items-center justify-center border-2 border-[#232323] hover:border-[#E6FF4C] transition-colors cursor-pointer">
                  <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500 mb-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16V6a2 2 0 012-2h14a2 2 0 012 2v10M3 16l4-4a2 2 0 012.828 0l2.586 2.586a2 2 0 002.828 0L21 10M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2" /></svg>
                  <span className="text-gray-500 text-center">Click Here or Drag & drop<br />JPEG/PNG/SVG format allowed</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <label className="block text-lg font-semibold mb-4 text-pink-500">Rewards</label>
            <div className="bg-[#232323] rounded-2xl overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-white text-lg">
                    <th className="py-3 px-6 font-semibold">Rank</th>
                    <th className="py-3 px-6 font-semibold">Cash</th>
                    <th className="py-3 px-6 font-semibold">Coupon</th>
                    <th className="py-3 px-6 font-semibold">Goodies</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((reward, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-6 font-bold text-[#E6FF4C]">{reward.rank}</td>
                      <td className="py-2 px-6 font-semibold">{reward.cash}</td>
                      <td className="py-2 px-6">
                        <input
                          type="text"
                          className="bg-[#181818] rounded px-3 py-2 w-full text-white placeholder-gray-500 focus:outline-none"
                          placeholder="Enter worth"
                          value={reward.coupon}
                          onChange={e => setRewards(rewards => rewards.map((r, i) => i === idx ? { ...r, coupon: e.target.value } : r))}
                        />
                      </td>
                      <td className="py-2 px-6">
                        <input
                          type="text"
                          className="bg-[#181818] rounded px-3 py-2 w-full text-white placeholder-gray-500 focus:outline-none"
                          placeholder="Enter worth"
                          value={reward.goodies}
                          onChange={e => setRewards(rewards => rewards.map((r, i) => i === idx ? { ...r, goodies: e.target.value } : r))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center px-6 py-4">
                <button
                  type="button"
                  className="bg-[#181818] text-[#E6FF4C] rounded-full px-6 py-2 font-semibold mt-2 border-2 border-[#232323] hover:border-[#E6FF4C] transition-colors"
                  onClick={() => setRewards([...rewards, { rank: `Add position +`, cash: '', coupon: '', goodies: '' }])}
                >
                  Add position +
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#181818] text-white flex flex-col relative">
      {/* Header */}
      <div className="w-full px-0">
        <div className="bg-[#0050FF] text-[#E6FF4C] text-center font-bold text-xl py-3 rounded-b-2xl mb-8 w-full">Create event</div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-row">
        {/* Sidebar */}
        <aside className="w-72 bg-[#232323] rounded-3xl m-6 p-6 flex flex-col gap-8 shadow-lg min-h-[80vh]">
          <div>
            <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-4 bg-[#181818] rounded-xl px-3 py-2">
              <span className="bg-[#232323] p-2 rounded-lg">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </span>
              Add Event Details
            </button>
            <ul className="ml-8 flex flex-col gap-3 mt-2">
              {steps.map((step, idx) => (
                <li key={step.label} className="flex items-center gap-2">
                  <span className={`w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center ${idx <= currentStep ? 'bg-[#E6FF4C]' : ''}`}> 
                    <span className={`w-2 h-2 rounded-full ${idx === currentStep ? 'bg-[#E6FF4C]' : 'bg-[#181818]'}`}></span>
                  </span>
                  <span className={`text-sm font-medium ${idx <= currentStep ? 'text-[#E6FF4C]' : 'text-gray-400'}`}>{step.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-4 bg-[#181818] rounded-xl px-3 py-2">
              <span className="bg-[#232323] p-2 rounded-lg">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>
              </span>
              Add Ticket
            </button>
            <ul className="ml-8 flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-[#181818] rounded-full"></span>
                </span>
                <span className="text-[#E6FF4C] text-sm font-medium">Pricing</span>
              </li>
            </ul>
          </div>
          <div>
            <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-4 bg-[#181818] rounded-xl px-3 py-2">
              <span className="bg-[#232323] p-2 rounded-lg">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h1v-4h1m-4 0h1v4h1" /></svg>
              </span>
              Add ons
            </button>
            <ul className="ml-8 flex flex-col gap-3 mt-2">
              {addOns.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-[#181818] rounded-full"></span>
                  </span>
                  <span className="text-[#E6FF4C] text-sm font-medium">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto text-[#E6FF4C] font-bold text-lg">
            Page <span className="text-white">{currentStep + 1}</span> out of 5
            <p className="text-xs text-gray-400 font-normal mt-1">You can easily manage these details later in manage event section.</p>
          </div>
        </aside>
        {/* Form Section */}
        <main className="flex-1 flex flex-col p-10 relative">
          {renderStepContent()}
          <div className="fixed bottom-8 right-8 z-50">
            <button
              type="button"
              className="bg-[#0050FF] text-[#E6FF4C] font-bold text-lg px-12 py-3 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors"
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
} 