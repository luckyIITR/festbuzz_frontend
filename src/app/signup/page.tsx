'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSignup } from '@/hooks/useSignup';

// const festLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Fest_logo_example.png';

export default function RegisterPage() {
  const { mutate, isLoading, isError, isSuccess, error } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return;
    mutate({ name, email, password });
  }

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
      </div>
      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 bg-opacity-95 rounded-3xl shadow-2xl p-8 md:p-12 mx-2 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 text-white">Festbuzz</h2>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-pink-500 text-center">Sign up to Festbuzz</h1>
        {/* Google Signup */}
        <button className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition text-white font-semibold py-3 rounded-lg mb-4 border border-zinc-700">
          <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={22} height={22} />
          <span>Sign up with Google</span>
        </button>
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-zinc-700" />
          <span className="mx-3 text-zinc-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-700" />
        </div>
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoComplete="email"
              required
            />
          </div>
          <div className="relative">
            <label className="block font-semibold mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-12"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-pink-400"
              tabIndex={-1}
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001c1.636 4.01 5.735 6.999 10.066 6.999 2.042 0 3.97-.613 5.566-1.662M6.455 6.455A9.956 9.956 0 0112 5c4.243 0 8.01 2.497 9.803 6.223a10.45 10.45 0 01-1.67 2.608M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0115 12m-3 3a3 3 0 01-3-3m6 0a3 3 0 00-3-3m0 0a3 3 0 00-3 3m0 0a3 3 0 003 3z" />
                </svg>
              )}
            </button>
          </div>
          <div className="relative">
            <label className="block font-semibold mb-1">Confirm password</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Confirm your password"
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-12"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-pink-400"
              tabIndex={-1}
              onClick={() => setShowConfirm(v => !v)}
            >
              {showConfirm ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001c1.636 4.01 5.735 6.999 10.066 6.999 2.042 0 3.97-.613 5.566-1.662M6.455 6.455A9.956 9.956 0 0112 5c4.243 0 8.01 2.497 9.803 6.223a10.45 10.45 0 01-1.67 2.608M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0115 12m-3 3a3 3 0 01-3-3m6 0a3 3 0 00-3-3m0 0a3 3 0 00-3 3m0 0a3 3 0 003 3z" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" id="remember" className="accent-pink-500 w-4 h-4" />
            <label htmlFor="remember" className="text-sm text-gray-300">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
          {isError && <div className="text-red-500 text-sm">{(error as Error)?.message || 'Signup failed'}</div>}
          {isSuccess && <div className="text-green-500 text-sm">Signup successful!</div>}
        </form>
        <div className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-400 hover:underline font-bold">Login</Link>
        </div>
      </div>
    </div>
  );
} 