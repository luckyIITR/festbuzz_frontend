'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { canManageUsers } = usePermissions();
 
  function handleLogout() {
    logout();
    window.location.reload();
  }

  return (
    <>
      <nav className="relative z-10 flex  items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2 bg-[#00000050] backdrop-blur-sm px-5 py-2 rounded-2xl">
          <span className="font-extrabold text-lg tracking-tight text-[#E1FF01]">FEST</span>
          <span className="text-lg md:text-lg text-white">✦</span>
          <span className="font-extrabold text-lg tracking-tight text-pink-500">BUZZ</span>
        </div>


        <div className='hidden md:flex items-center gap-6 text-gray-200 font-medium bg-[#00000050] backdrop-blur-sm px-3 py-2  rounded-3xl  '>

          <input
            type="text"
            placeholder="🔍︎ Search"
            className="rounded-full px-4 py-1 font-urbanist font-[600] bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E1FF01] text-sm"
          />
          {/* Desktop Menu */}

          <Link href="/" className={` hover:text-white/80 font-[600] font-urbanist ${pathname === '/' ? 'text-[#E1FF01]' : 'text-white'}`}>Home</Link>
          <Link href="/fests" className={` hover:text-white/80 font-[600] font-urbanist ${pathname === '/fests' ? 'text-[#E1FF01]' : 'text-white'}`}>Explore fests</Link>
          {user && (
            <>
              <Link href="/myfest" className={` hover:text-white/80 font-[600] font-urbanist ${pathname === '/myfest' ? 'text-[#E1FF01]' : 'text-white'}`}>My Fest</Link>
              {canManageUsers && (
                <Link href="/dashboard" className={` hover:text-white/80 font-[600] font-urbanist ${pathname === '/dashboard' ? 'text-[#E1FF01]' : 'text-white'}`}>Dashboard</Link>
              )}
            </>
          )}
          <Link href="/about" className={` hover:text-white/80 font-[600] font-urbanist ${pathname === '/about' ? 'text-[#E1FF01]' : 'text-white'}`}>Campus Ambassador</Link>
          {/* Search & Auth (Desktop) */}
          {user ? (
            <>
              <Link href="/profile" className={`px-5 py-1 rounded-full bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition ${pathname === '/profile' ? 'text-[#E1FF01]' : 'text-white'}`}>{user?.name || 'Profile'}</Link>
              <button onClick={handleLogout} className="ml-2 px-5 py-1 rounded-full  bg-[#E1FF01] text-black font-bold hover:bg-pink-400 transition">Logout</button>
            </>
          ) : (
            <>
            <Link href="/login" className={`ml-2 px-5 py-1 font-[700] font-urbanist rounded-full bg-[#E1FF01] text-black  hover:bg-lime-300 transition  ${pathname === '/signup' ? 'text-[#E1FF01]' : 'text-black'}`}>Login</Link>
              <Link href="/signup" className={`ml-2 px-5 py-1 font-[700] font-urbanist rounded-full bg-[#E1FF01] text-black  hover:bg-lime-300 transition  ${pathname === '/signup' ? 'text-[#E1FF01]' : 'text-black'}`}>Sign up</Link>
            </>
          )}
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
        <div className='w-screen'>
          <div className="fixed top-0 right-0  w-40 z-30 bg-black bg-opacity-90 flex flex-col  p-4 justify-center gap-2 transition-all duration-300">
            <button
              className="absolute top-4 right-6 text-white text-3xl focus:outline-none"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              &times;
            </button>
             <input
              type="text"
              placeholder="Search"
              className="rounded-xl mt-10 -ml-2 px-3  bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 text-lg w-35"
            />
            <Link href="/" className={`font-urbanist ${pathname === '/' ? 'text-[#E1FF01]' : 'text-white'}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/fests" className={`font-urbanist ${pathname === '/fests' ? 'text-[#E1FF01]' : 'text-white'}`} onClick={() => setMobileMenuOpen(false)}>Explore fests</Link>

            <Link href="/about" className={`font-urbanist ${pathname === '/about' ? 'text-[#E1FF01]' : 'text-white'}`} onClick={() => setMobileMenuOpen(false)}>About us</Link>
           
              {user ? (
                <>
                  <Link href="/myfest" className={`font-urbanist ${pathname === '/myfest' ? 'text-[#E1FF01]' : 'text-white'}`} onClick={() => setMobileMenuOpen(false)}>My Fest</Link>
                  {canManageUsers && (
                    <Link href="/dashboard" className={`font-urbanist ${pathname === '/dashboard' ? 'text-[#E1FF01]' : 'text-white'}`} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                  )}
                  <Link href="/profile" className="px-3 py-1 -ml-2 rounded-full bg-zinc-900 text-white font-urbanist hover:bg-zinc-800 transition uppercase" onClick={() => setMobileMenuOpen(false)}>{user?.name || 'Profile'}</Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="px-3 py-1 text-left -ml-2 rounded-full bg-pink-500 text-white font-urbanist font-bold hover:bg-pink-400 transition">Logout</button>

                </>

              ) : (
                <>
                  <Link href="/signup" className="px-3 -ml-2 py-1 rounded-full bg-[#E1FF01] text-black text-left font-urbanist font-bold hover:bg-lime-300 transition" onClick={() => setMobileMenuOpen(false)}>Login In</Link>
                </>
              )}
           
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 