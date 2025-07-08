'use client';
import Image from 'next/image';
import Link from 'next/link';

const festLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Fest_logo_example.png';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80"
          alt="Festival Crowd"
          width={1500}
          height={800}
          className="w-full h-full object-cover object-center opacity-60"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-70" /> */}
      </div>
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 bg-opacity-95 rounded-3xl shadow-2xl p-8 md:p-12 mx-2 flex flex-col items-center">
        <Image src={festLogo} alt="FestBuzz Logo" width={70} height={70} className="mb-4 rounded-full border-2 border-yellow-400 bg-black object-contain" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-pink-500 text-center">Login to FestBuzz</h1>
        <form className="w-full flex flex-col gap-6">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition mt-2"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-pink-400 hover:underline font-bold">Register</Link>
        </div>
      </div>
    </div>
  );
} 