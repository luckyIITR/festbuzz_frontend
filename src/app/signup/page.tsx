'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSignup } from '@/hooks/useSignup';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useVerifyOtp } from '@/hooks/useVerifyOtp';
import { GoogleLogin } from '@react-oauth/google';


interface VerifyResponse {
  user?: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  token?: string;
}

// const festLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Fest_logo_example.png';

export default function RegisterPage() {
  const { mutate, isPending, isError, isSuccess, error } = useSignup();
  const { mutate: googleAuth, isError: isGoogleError, error: googleError } = useGoogleAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showVerify, setShowVerify] = useState(false);
  const [verifyCode, setVerifyCode] = useState(["", "", "", "", "", ""]);
  const verifyInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const [verifyErrorMsg, setVerifyErrorMsg] = useState<string | null>(null);
  const [showVerifySuccess, setShowVerifySuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return;
    mutate({ name, email, password });
  }

  function handleGoogleSuccess(credentialResponse: { credential?: string }) {
    if (credentialResponse.credential) {
      googleAuth({ accessToken: credentialResponse.credential });
    }
  }

  function handleGoogleError() {
    console.error('Google login failed');
  }

  // Redirect to verify page after successful signup
  if (isSuccess && !showVerify) {
    setShowVerify(true);
  }



  // --- VERIFY MODAL HANDLERS ---
  const handleVerifyChange = (idx: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...verifyCode];
    newCode[idx] = value;
    setVerifyCode(newCode);
    if (value && idx < 5) {
      verifyInputsRef.current[idx + 1]?.focus();
    }
  };
  const handleVerifyKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verifyCode[idx] && idx > 0) {
      verifyInputsRef.current[idx - 1]?.focus();
    }
  };
  const handleVerifyContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyErrorMsg(null);
    const otp = verifyCode.join("");
    if (otp.length !== 6) {
      setVerifyErrorMsg("Please enter the 6-digit code.");
      return;
    }
    verifyOtp({ email, otp }, {
      onSuccess: (data: unknown) => {
        const verifyData = data as VerifyResponse;
        if (verifyData?.user) localStorage.setItem('user', JSON.stringify(verifyData.user));
        window.dispatchEvent(new Event('userChanged'));
        setShowVerifySuccess(true);
        setTimeout(() => {
          setShowVerify(false);
          setShowVerifySuccess(false);
          router.push('/');
        }, 1200);
      },
      onError: (err: unknown) => {
        const error = err as Error;
        setVerifyErrorMsg(error?.message || 'Verification failed');
      }
    });
  };
  // --- END VERIFY MODAL HANDLERS ---

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
      <div className="relative z-10 w-full max-w-md bg-zinc-900 bg-opacity-95 rounded-3xl shadow-2xl p-8 md:p-12 mx-2 my-12 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 text-white">Festbuzz</h2>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-pink-500 text-center">Sign up to Festbuzz</h1>
        {/* Google Signup */}
        <div className="w-full mb-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_black"
            size="large"
            text="signup_with"
            shape="rectangular"
            locale="en"
            context="signup"
          />
        </div>
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
            disabled={isPending}
          >
            {isPending ? 'Signing up...' : 'Sign up'}
          </button>
          {isError && <div className="text-red-500 text-sm">{(error as Error)?.message || 'Signup failed'}</div>}
          {isGoogleError && <div className="text-red-500 text-sm">{(googleError as Error)?.message || 'Google signup failed'}</div>}
        </form>
        <div className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-400 hover:underline font-bold">Login</Link>
        </div>
      </div>
      {/* VERIFY MODAL showVerify */}
      {showVerify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-5 md:p-8 flex flex-col items-center relative">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-pink-500 text-left w-full" style={{letterSpacing: '-1px'}}>ENTER CODE</h1>
            <p className="text-base text-gray-200 mb-2 w-full text-left">
              Enter the 6-digit code you received on<br />
              <span className="font-bold text-white">{email}</span>
            </p>
            <form className="w-full flex flex-col items-center mt-4" onSubmit={handleVerifyContinue}>
              <div className="flex gap-3 mb-6 w-full justify-center">
                {verifyCode.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => { verifyInputsRef.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleVerifyChange(idx, e.target.value)}
                    onKeyDown={e => handleVerifyKeyDown(idx, e)}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-zinc-800 text-xl md:text-2xl text-center text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 font-bold transition"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              {verifyErrorMsg && (
                <div className="text-red-400 text-sm mb-2 w-full text-center">{verifyErrorMsg}</div>
              )}
              <div className="flex gap-4 w-full mt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-blue-600 text-yellow-300 font-bold text-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-60"
                  disabled={isVerifying}
                >
                  {isVerifying ? 'Verifying...' : 'Continue'}
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 rounded-full bg-zinc-800 text-white font-bold text-lg shadow-lg hover:bg-zinc-700 transition"
                  onClick={() => setShowVerify(false)}
                  disabled={isVerifying}
                >
                  Cancel
                </button>
              </div>
            </form>
            {showVerifySuccess && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-2xl z-20 animate-fade-in">
                <svg className="w-20 h-20 text-lime-400 mb-4 animate-pop" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13l3 3 7-7" />
                </svg>
                <div className="text-2xl font-bold text-lime-300 mb-2">Account Verified!</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 