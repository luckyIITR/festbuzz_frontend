'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSignup, useGoogleAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useVerifyOtp } from '@/hooks/auth';
import { GoogleLogin } from '@react-oauth/google';
import { VerifyResponse } from '@/types/user';

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

  const [selected, setSelected] = useState("Organiser");
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
      onSuccess: (data: VerifyResponse) => {
        if (data?.data?.user) localStorage.setItem('user', JSON.stringify(data.data.user));
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
    <div className="min-h-screen bg-black  text-white flex items-center justify-center relative -top-20 -mb-20 pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/HomePageImage.png"
          alt="Festival Crowd"
          width={1500}
          height={1000}
          className="w-full h-full object-cover object-center opacity-60"
        />
      </div>
      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 bg-opacity-95 rounded-3xl shadow-2xl p-8 md:p-12 mx-2 my-12 flex flex-col items-center">

        <h1 className="text-3xl md:text-4xl   mb-8 font-clash text-[#E1FF01] text-center"><span className='font-[700]'>Sign up</span> <span className='font-[500]'>to Festbuzz</span></h1>
        {/* Google Signup - Only show for Participant */}
        {selected === "Participant" && (
          <>
            <div className="w-full mb-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_black"
                size="large"
                text="signup_with"
                shape="circle"
                locale="en"
                context="signup"
              />
            </div>

            <div className="flex items-center w-full my-4">
              <div className="flex-1 h-px bg-zinc-700" />
              <span className="mx-3 text-zinc-400 text-sm font-urbanist">OR</span>
              <div className="flex-1 h-px bg-zinc-700" />
            </div>
          </>
        )}
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
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
                <span className=" font-urbanist font-[700]">Organiser</span>
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
                <span className=" font-urbanist font-[700]">Participant</span>
              </label>

            </div>
            <label className="block font-[700] mb-1 font-urbanist">Username</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded-lg bg-[#2D2D2D] font-[600] font-urbanist placeholder:text-[#565656] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block font-[700] mb-1 font-urbanist">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className=" w-full rounded-lg bg-[#2D2D2D] font-[600] font-urbanist placeholder:text-[#565656] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoComplete="email"
              required
            />
          </div>
          <div className="relative">
            <label className="block font-[700] mb-1 font-urbanist">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg bg-[#2D2D2D] font-[600] font-urbanist placeholder:text-[#565656] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10.5 text-gray-400 hover:text-pink-400"
              tabIndex={-1}
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001c1.636 4.01 5.735 6.999 10.066 6.999 2.042 0 3.97-.613 5.566-1.662M6.455 6.455A9.956 9.956 0 0112 5c4.243 0 8.01 2.497 9.803 6.223a10.45 10.45 0 01-1.67 2.608M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3401 6.17349L13.3462 9.17963L13.3605 9.02217C13.3605 7.44274 12.077 6.15918 10.4976 6.15918L10.3401 6.17349Z" fill="#636363" />
                  <path d="M10.4975 4.25104C13.1315 4.25104 15.2692 6.38875 15.2692 9.0227C15.2692 9.63824 15.1451 10.2252 14.9304 10.7643L17.7218 13.5557C19.1628 12.3533 20.2985 10.7978 20.9999 9.0227C19.3442 4.83321 15.274 1.86523 10.4976 1.86523C9.16149 1.86523 7.88272 2.1038 6.69458 2.53325L8.75593 4.58981C9.29507 4.37988 9.88198 4.25104 10.4975 4.25104Z" fill="#636363" />
                  <path d="M0.954313 1.65036L3.13018 3.82623L3.56442 4.26047C1.98977 5.49155 0.744376 7.12824 0 9.02255C1.651 13.212 5.72597 16.18 10.4976 16.18C11.9769 16.18 13.3892 15.8937 14.6824 15.3736L15.088 15.7792L17.8699 18.5658L19.0866 17.3538L2.17108 0.433594L0.954313 1.65036ZM6.23178 6.92304L7.70622 8.39748C7.66327 8.60268 7.63464 8.80783 7.63464 9.02255C7.63464 10.602 8.9182 11.8855 10.4976 11.8855C10.7124 11.8855 10.9175 11.8569 11.118 11.814L12.5924 13.2884C11.9577 13.6033 11.2516 13.7942 10.4976 13.7942C7.86368 13.7942 5.72597 11.6565 5.72597 9.02255C5.72597 8.26865 5.91685 7.56243 6.23178 6.92304Z" fill="#636363" />
                </svg>

              )}
            </button>
          </div>
          <div className="relative">
            <label className="block font-[700] mb-1 font-urbanist">Confirm password</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Confirm your password"
              className="w-full rounded-lg bg-[#2D2D2D] font-[600] font-urbanist placeholder:text-[#565656] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10.5 text-gray-400 hover:text-pink-400"
              tabIndex={-1}
              onClick={() => setShowConfirm(v => !v)}
            >
              {showConfirm ? (
                <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3401 6.17349L13.3462 9.17963L13.3605 9.02217C13.3605 7.44274 12.077 6.15918 10.4976 6.15918L10.3401 6.17349Z" fill="#636363" />
                  <path d="M10.4975 4.25104C13.1315 4.25104 15.2692 6.38875 15.2692 9.0227C15.2692 9.63824 15.1451 10.2252 14.9304 10.7643L17.7218 13.5557C19.1628 12.3533 20.2985 10.7978 20.9999 9.0227C19.3442 4.83321 15.274 1.86523 10.4976 1.86523C9.16149 1.86523 7.88272 2.1038 6.69458 2.53325L8.75593 4.58981C9.29507 4.37988 9.88198 4.25104 10.4975 4.25104Z" fill="#636363" />
                  <path d="M0.954313 1.65036L3.13018 3.82623L3.56442 4.26047C1.98977 5.49155 0.744376 7.12824 0 9.02255C1.651 13.212 5.72597 16.18 10.4976 16.18C11.9769 16.18 13.3892 15.8937 14.6824 15.3736L15.088 15.7792L17.8699 18.5658L19.0866 17.3538L2.17108 0.433594L0.954313 1.65036ZM6.23178 6.92304L7.70622 8.39748C7.66327 8.60268 7.63464 8.80783 7.63464 9.02255C7.63464 10.602 8.9182 11.8855 10.4976 11.8855C10.7124 11.8855 10.9175 11.8569 11.118 11.814L12.5924 13.2884C11.9577 13.6033 11.2516 13.7942 10.4976 13.7942C7.86368 13.7942 5.72597 11.6565 5.72597 9.02255C5.72597 8.26865 5.91685 7.56243 6.23178 6.92304Z" fill="#636363" />
                </svg>
              ) : (
                <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3401 6.17349L13.3462 9.17963L13.3605 9.02217C13.3605 7.44274 12.077 6.15918 10.4976 6.15918L10.3401 6.17349Z" fill="#636363" />
                  <path d="M10.4975 4.25104C13.1315 4.25104 15.2692 6.38875 15.2692 9.0227C15.2692 9.63824 15.1451 10.2252 14.9304 10.7643L17.7218 13.5557C19.1628 12.3533 20.2985 10.7978 20.9999 9.0227C19.3442 4.83321 15.274 1.86523 10.4976 1.86523C9.16149 1.86523 7.88272 2.1038 6.69458 2.53325L8.75593 4.58981C9.29507 4.37988 9.88198 4.25104 10.4975 4.25104Z" fill="#636363" />
                  <path d="M0.954313 1.65036L3.13018 3.82623L3.56442 4.26047C1.98977 5.49155 0.744376 7.12824 0 9.02255C1.651 13.212 5.72597 16.18 10.4976 16.18C11.9769 16.18 13.3892 15.8937 14.6824 15.3736L15.088 15.7792L17.8699 18.5658L19.0866 17.3538L2.17108 0.433594L0.954313 1.65036ZM6.23178 6.92304L7.70622 8.39748C7.66327 8.60268 7.63464 8.80783 7.63464 9.02255C7.63464 10.602 8.9182 11.8855 10.4976 11.8855C10.7124 11.8855 10.9175 11.8569 11.118 11.814L12.5924 13.2884C11.9577 13.6033 11.2516 13.7942 10.4976 13.7942C7.86368 13.7942 5.72597 11.6565 5.72597 9.02255C5.72597 8.26865 5.91685 7.56243 6.23178 6.92304Z" fill="#636363" />
                </svg>

              )}
            </button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 appearance-none bg-[#2D2D2D] checked:bg-[#2D2D2D] checked:before:content-['✓'] checked:before:text-white checked:before:block checked:before:text-center rounded"
            />
            <label htmlFor="remember" className="text-sm text-[#565656] font-urbanist font-[700]">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full px-10 py-3 rounded-full bg-[#0248F7] text-[#E1FF01] font-bold text-lg shadow-lg hover:bg-blue-700 transition mt-2"
            disabled={isPending}
          >
            {isPending ? 'Signing up...' : 'Sign up'}
          </button>
          {isError && <div className="text-red-500 text-sm">{(error as Error)?.message || 'Signup failed'}</div>}
          {isGoogleError && <div className="text-red-500 text-sm">{(googleError as Error)?.message || 'Google signup failed'}</div>}
        </form>
        <div className="mt-6 text-center text-[#8D8D8D] font-urbanist font-[700] text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:underline font-bold">Login</Link>
        </div>
      </div>
      {/* VERIFY MODAL showVerify */}
      {showVerify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-5 md:p-8 flex flex-col items-center relative">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-pink-500 text-left w-full" style={{ letterSpacing: '-1px' }}>ENTER CODE</h1>
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