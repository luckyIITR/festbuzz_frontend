'use client'
import { useState } from 'react';
// Home page for FestBuzz - Responsive, styled with Tailwind CSS

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80"
          alt="Festival Crowd"
          className="w-full h-full object-cover object-center opacity-60"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-70" /> */}
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-lg tracking-tight text-lime-400">FEST</span>
          <span className="text-lg md:text-lg text-white">✦</span>
          <span className="font-extrabold text-lg tracking-tight text-pink-500">BUZZ</span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-200 font-medium">
          <a href="#" className="text-white font-bold">Home</a>
          <a href="#" className="hover:text-white/80">List your fest</a>
          <a href="#" className="hover:text-white/80">Explore fests</a>
          <a href="#" className="hover:text-white/80">About us</a>
        </div>
        {/* Search & Auth (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <input
            type="text"
            placeholder="Search"
            className="rounded-full px-4 py-1 bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
          />
          <button className="px-5 py-1 rounded-full bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition">Login</button>
          <button className="ml-2 px-5 py-1 rounded-full bg-lime-400 text-black font-bold hover:bg-lime-300 transition">Sign up</button>
        </div>
        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none z-20"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-8 transition-all duration-300">
          <button
            className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>
          <a href="#" className="text-2xl font-bold text-white" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#" className="text-2xl text-white" onClick={() => setMobileMenuOpen(false)}>List your fest</a>
          <a href="#" className="text-2xl text-white" onClick={() => setMobileMenuOpen(false)}>Explore fests</a>
          <a href="#" className="text-2xl text-white" onClick={() => setMobileMenuOpen(false)}>About us</a>
          <input
            type="text"
            placeholder="Search"
            className="rounded-full px-4 py-2 bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 text-lg w-64"
          />
          <div className="flex gap-4 mt-4">
            <button className="px-6 py-2 rounded-full bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition">Login</button>
            <button className="px-6 py-2 rounded-full bg-lime-400 text-black font-bold hover:bg-lime-300 transition">Sign up</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center min-h-[100vh] px-4 pt-6 md:pt-2">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
          ENGAGE,<br />
          <span className="text-lime-400">EXPRESS,</span><br />
          EXHILARATE.
        </h1>
        <div className="flex justify-center mb-4">
          <span className="inline-block w-6 h-6 bg-pink-500 rounded-full animate-pulse" />
        </div>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-xl mx-auto">
          Integrated platform to all your festival needs.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg hover:bg-blue-600 transition"
        >
          Get started right now! <span className="ml-2">↗</span>
        </a>
      </main>

      {/* Brand Statement Section */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 py-10 md:py-10">
        <p className="text-base md:text-xl font-medium text-white max-w-3xl mx-auto">
          At <span className="font-extrabold text-lime-300">FEST</span><span className="text-white font-extrabold">✦</span><span className="font-extrabold text-pink-400">BUZZ</span>
          <span className="ml-2 italic font-semibold text-white">we <span className="italic">unite all stakeholders</span></span><br />
          for smooth and successful <span className="relative inline-block">college festivals
            <svg className="absolute left-0 bottom-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#3b82f6" strokeWidth="2"/></svg>
          </span><br />
          using technology, creativity and expertise.
        </p>
      </section>

      {/* WE OFFER YOU TO Section */}
      <section className="relative z-10 w-full bg-black pb-0 px-4 md:px-8 lg:px-20">
        {/* Section Title */}
        <div className="flex items-center gap-3 pt-10 md:pt-10 justify-center">
          <span className="inline-block w-6 h-6 bg-pink-500 rounded-full animate-pulse" />
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            <span className="font-extrabold">WE OFFER YOU TO</span>
          </h2>
        </div>

        {/* Offer Cards */}
        <div className="flex flex-col gap-0 mt-6">
          {/* 01 Host & Manage */}
          <div className="relative flex flex-col md:flex-row items-stretch bg-lime-200 min-h-[260px] overflow-hidden rounded-2xl mb-6 px-4 md:px-8">
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-blue-700 mb-1">01 Host & Manage</h3>
                <p className="text-sm md:text-base text-gray-700 mb-2">For organizing team</p>
                <p className="text-gray-800 text-sm md:text-base mb-4 max-w-md">
                  All-in-one event hosting with easy registrations, smooth coordination, fair judging, clear communication, and quick certificate delivery.
                </p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-sm md:text-base w-fit">
                List your fest <span>↗</span>
              </a>
            </div>
            <div className="relative flex-1 min-h-[180px] md:min-h-0">
              <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80" alt="Team" className="w-full h-full object-cover object-center" />
              {/* Decorative squares */}
              <div className="absolute top-0 right-0 flex flex-wrap gap-1 p-2">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="inline-block w-3 h-3 bg-lime-400 opacity-90 m-0.5" />
                ))}
              </div>
            </div>
          </div>

          {/* 02 Explore & Enjoy */}
          <div className="relative flex flex-col md:flex-row items-stretch bg-pink-400 min-h-[260px] overflow-hidden rounded-2xl mb-6 px-4 md:px-8">
            <div className="relative flex-1 min-h-[180px] md:min-h-0 order-2 md:order-1">
              <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="Concert" className="w-full h-full object-cover object-center" />
              {/* Decorative squares */}
              <div className="absolute top-0 left-0 flex flex-wrap gap-1 p-2">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="inline-block w-3 h-3 bg-pink-600 opacity-90 m-0.5" />
                ))}
              </div>
            </div>
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between order-1 md:order-2">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-lime-200 mb-1">02 Explore & Enjoy</h3>
                <p className="text-sm md:text-base text-white mb-2">For college students</p>
                <p className="text-white text-sm md:text-base mb-4 max-w-md">
                  Discover and join exciting fests<br />
                  Enjoy exclusive event discounts<br />
                  Collect rewards and goodies
                </p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-lime-200 text-black font-semibold shadow hover:bg-lime-100 transition text-sm md:text-base w-fit">
                Sign up now <span>↗</span>
              </a>
            </div>
          </div>

          {/* 03 Engage & Reach */}
          <div className="relative flex flex-col md:flex-row items-stretch bg-blue-600 min-h-[260px] overflow-hidden rounded-2xl mb-6 px-4 md:px-8">
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-lime-200 mb-1">03 Engage & Reach</h3>
                <p className="text-sm md:text-base text-white mb-2">For brands</p>
                <p className="text-white text-sm md:text-base mb-4 max-w-md">
                  Showcase your products effectively<br />
                  Connect with your audience interactively<br />
                  Extend your reach to a broader audience
                </p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-lime-200 text-black font-semibold shadow hover:bg-lime-100 transition text-sm md:text-base w-fit">
                Partner with us <span>↗</span>
              </a>
            </div>
            <div className="relative flex-1 min-h-[180px] md:min-h-0">
              <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80" alt="Team" className="w-full h-full object-cover object-center" />
              {/* Decorative squares */}
              <div className="absolute top-0 right-0 flex flex-wrap gap-1 p-2">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="inline-block w-3 h-3 bg-blue-400 opacity-90 m-0.5" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="relative z-10 w-full bg-blue-600 px-4 md:px-8 lg:px-20 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-start z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-lime-200 mb-2 flex items-center gap-3">
            FEST
            <span className="text-4xl md:text-5xl text-white">✦</span>
            <span className="text-pink-400">BUZZ</span>
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-2">Guide us on your campus!</h3>
          <p className="text-white text-base md:text-lg mb-6 max-w-lg">
            We are a brand that want to bring all stakeholder together for a smooth conduction of a college fest with the help of tech and our expertise.
          </p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lime-200 text-black font-bold shadow hover:bg-lime-100 transition text-base md:text-lg">
            Sign up for CA <span>↗</span>
          </a>
        </div>
        {/* Decorative squares */}
        <div className="absolute right-0 bottom-0 md:static flex-1 flex justify-end items-end h-full w-full md:w-auto z-0">
          <div className="grid grid-cols-4 grid-rows-4 gap-1 p-4 md:p-8">
            {[...Array(16)].map((_, i) => {
              // Randomly pick color and animation
              const color = Math.random() > 0.5 ? 'bg-yellow-300' : 'bg-black';
              const animate = Math.random() > 0.7 ? 'animate-pulse' : '';
              return (
                <span
                  key={i}
                  className={`w-5 h-5 md:w-7 md:h-7 ${color} ${animate} rounded-sm`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white px-4 md:px-8 lg:px-20 pt-10 pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 border-b border-gray-700 pb-8">
          {/* Logo */}
          <div className="flex flex-col items-start mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-extrabold text-2xl tracking-tight text-lime-400">FEST</span>
              <span className="text-lg md:text-lg text-white">✦</span>
              <span className="font-extrabold text-2xl tracking-tight text-pink-500">BUZZ</span>
            </div>
          </div>
          {/* Footer Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            {/* Contact */}
            <div>
              <h4 className="font-bold mb-2 text-white">Contact</h4>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>hello@festbuzz.in</li>
                <li>thefestbuzz@gmail.com</li>
                <li>+91 72495 68988</li>
                <li className="flex gap-2 mt-2">
                  <a href="#" className="hover:text-lime-300" aria-label="Facebook">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
                  </a>
                  <a href="#" className="hover:text-pink-300" aria-label="Instagram">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.094 12 2.094m0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.635.4 3.661 1.374c-.974.974-1.246 2.111-1.308 3.392C2.012 5.668 2 6.077 2 9.333v5.334c0 3.256.012 3.665.07 4.945.062 1.281.334 2.418 1.308 3.392.974.974 2.111 1.246 3.392 1.308 1.28.058 1.689.07 4.945.07s3.665-.012 4.945-.07c1.281-.062 2.418-.334 3.392-1.308.974-.974 1.246-2.111 1.308-3.392.058-1.28.07-1.689.07-4.945V9.333c0-3.256-.012-3.665-.07-4.945-.062-1.281-.334-2.418-1.308-3.392-.974-.974-2.111-1.246-3.392-1.308C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>
                  </a>
                  <a href="#" className="hover:text-blue-300" aria-label="LinkedIn">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" /></svg>
                  </a>
                </li>
              </ul>
            </div>
            {/* Services */}
            <div>
              <h4 className="font-bold mb-2 text-white">Services</h4>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>Artists</li>
                <li>Production</li>
                <li>Silent DJ</li>
                <li>Laser Tag</li>
              </ul>
            </div>
            {/* Resources */}
            <div>
              <h4 className="font-bold mb-2 text-white">Resources</h4>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>Blog</li>
                <li>Learn</li>
                <li>Magazine</li>
                <li>Templates</li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-bold mb-2 text-white">Company</h4>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>Team</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-6">
          Copyright© MoonMantra Services Pvt. Ltd. 2023<br />
          All rights reserved
        </div>
      </footer>
    </div>
  );
}
