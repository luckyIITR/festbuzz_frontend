'use client';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-lg tracking-tight text-lime-400">FEST</span>
          <span className="text-lg md:text-lg text-white">✦</span>
          <span className="font-extrabold text-lg tracking-tight text-pink-500">BUZZ</span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-200 font-medium">
          <Link href="/" className="text-white font-bold">Home</Link>
          <Link href="/fests" className="hover:text-white/80">List your fest</Link>
          <Link href="/fests" className="hover:text-white/80">Explore fests</Link>
          <Link href="/about" className="hover:text-white/80">About us</Link>
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
          <Link href="/" className="text-2xl font-bold text-white" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/fests" className="text-2xl text-white" onClick={() => setMobileMenuOpen(false)}>List your fest</Link>
          <Link href="/fests" className="text-2xl text-white" onClick={() => setMobileMenuOpen(false)}>Explore fests</Link>
          <Link href="/about" className="text-2xl text-white" onClick={() => setMobileMenuOpen(false)}>About us</Link>
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
    </>
  );
};

export default Navbar; 