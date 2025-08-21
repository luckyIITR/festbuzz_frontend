'use client';
import { useLogin, useGoogleAuth } from '@/hooks/auth';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { LoginResponse } from '@/types/user';

const festLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Fest_logo_example.png';

export default function LoginPage() {
  const { mutate, isPending, isError, isSuccess, error } = useLogin();
  const { mutate: googleAuth, isError: isGoogleError, error: googleError } = useGoogleAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [selected, setSelected] = useState("Organiser");
  const router = useRouter();


  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1200);
    }
  }, [isSuccess, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ email, password }, {
      onSuccess: (data: LoginResponse) => {
        if (data?.data?.user) {
          localStorage.setItem('user', JSON.stringify(data.data.user));
          window.dispatchEvent(new Event('userChanged'));
          setShowSuccess(true);
          setTimeout(() => {
            router.push('/');
          }, 1200);
        }
      }
    });
  }

  function handleGoogleSuccess(credentialResponse: { credential?: string }) {
    if (credentialResponse.credential) {
      googleAuth({ accessToken: credentialResponse.credential });
    }
  }

  function handleGoogleError() {
    console.error('Google login failed');
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
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 bg-opacity-95 rounded-3xl shadow-2xl p-8 md:p-12 mx-2 flex flex-col items-center">
        <Image src={festLogo} alt="FestBuzz Logo" width={70} height={70} className="mb-4 rounded-full border-2 border-yellow-400 bg-black object-contain" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-pink-500 text-center">Login to FestBuzz</h1>
        {/* Google Login */}
        <div className="w-full mb-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_black"
            size="large"
            text="signin_with"
            shape="rectangular"
            locale="en"
            context="signin"
          />

          <div className="flex items-center w-full my-4">
            <div className="flex-1 h-px bg-zinc-700" />
            <span className="mx-3 text-zinc-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-zinc-700" />
          </div>
          <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>

            <div className="flex justify-end gap-6">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="toggle"
                  value="Organiser"
                  checked={selected === "Organiser"}
                  onChange={(e) => setSelected(e.target.value)}
                  className="peer w-4 h-4 accent-pink-500 focus:ring-pink-500 border-gray-300"
                />
                <span className="">Organiser</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="toggle"
                  value="Participant"
                  checked={selected === "Participant"}
                  onChange={(e) => setSelected(e.target.value)}
                  className="peer w-4 h-4 accent-pink-500 focus:ring-pink-500 border-gray-300"
                />
                <span className="">Participant</span>
              </label>

            </div>

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
            <div>
              <label className="block font-semibold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition mt-2"
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </button>
            {isError && <div className="text-red-500 text-sm">{(error as Error)?.message || 'Login failed'}</div>}
            {isGoogleError && <div className="text-red-500 text-sm">{(googleError as Error)?.message || 'Google login failed'}</div>}
            {isSuccess && <div className="text-green-500 text-sm">Login successful!</div>}
          </form>
          <div className="mt-6 text-center text-gray-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-pink-400 hover:underline font-bold">Register</Link>
          </div>
          {
            showSuccess && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-3xl z-20 animate-fade-in">
                <svg className="w-20 h-20 text-lime-400 mb-4 animate-pop" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13l3 3 7-7" />
                </svg>
                <div className="text-2xl font-bold text-lime-300 mb-2">Login Successful!</div>
              </div>
            )
          }
        </div >
      </div >
    </div>
  );
} 