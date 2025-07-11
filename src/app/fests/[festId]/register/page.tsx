'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFestRegistration } from '@/hooks/useFestRegistration';
import { useFestRegistrationStatus } from '@/hooks/useFestRegistrationStatus';

export default function FestRegisterPage() {
  const params = useParams();
  const router = useRouter();
  const festId = params?.festId as string;
  const { mutate, isPending, isError, isSuccess, error } = useFestRegistration();
  const { data: registrationStatus, isLoading: statusLoading } = useFestRegistrationStatus(festId);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    state: '',
    instituteName: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : null;
      // Prefill form with user data
      if (userData) {
        setFormData(prev => ({
          ...prev,
          name: userData.name || ''
        }));
      }
    }
  }, []);

  // Check if user is already registered
  const isRegistered = registrationStatus?.isRegistered || false;

  // If already registered, redirect to fest page
  useEffect(() => {
    if (!statusLoading && isRegistered) {
      alert('You are already registered for this fest!');
      router.push(`/fests/${festId}`);
    }
  }, [isRegistered, statusLoading, router, festId]);

  // Show loading while checking registration status
  if (statusLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold mb-4">Checking registration status...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  // If already registered, show message (will redirect)
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold mb-4">Already Registered!</div>
          <div className="text-gray-400">Redirecting to fest page...</div>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate gender enum to match backend requirements
    if (!['Male', 'Female', 'Other'].includes(formData.gender)) {
      alert('Please select a valid gender');
      return;
    }

    // Prepare payload for backend
    const payload = {
      festId,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender as 'Male' | 'Female' | 'Other',
      city: formData.city,
      state: formData.state,
      instituteName: formData.instituteName,
      // answers: {} // Optional field for future use
    };

    mutate(payload, {
      onSuccess: (data) => {
        console.log('Registration successful:', data);
        alert('Registration successful! Your ticket has been generated.');
        router.push(`/fests/${festId}`);
      },
      onError: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please try again.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center pt-10 pb-50">
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
      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-2xl bg-zinc-900 bg-opacity-95 rounded-3xl shadow-2xl p-8 md:p-12 mx-2 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 text-white">Festbuzz</h2>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-pink-500">Confirm your fest registration</h1>
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" 
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Phone number</label>
            <input 
              type="tel" 
              placeholder="Enter your phone number" 
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" 
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Date of birth</label>
            <input 
              type="date" 
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" 
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Gender</label>
            <select 
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">City</label>
            <input 
              type="text" 
              placeholder="Enter your city name" 
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" 
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">State</label>
            <input 
              type="text" 
              placeholder="Enter your state name" 
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" 
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Institute name</label>
            <input 
              type="text" 
              placeholder="Enter your college/university name" 
              value={formData.instituteName}
              onChange={(e) => handleInputChange('instituteName', e.target.value)}
              className="w-full rounded-lg bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" 
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-end mt-2">
            <button 
              type="submit" 
              className="px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? 'Registering...' : 'Submit'}
            </button>
          </div>
          {isError && (
            <div className="md:col-span-2 text-red-500 text-sm text-center">
              {(error as Error)?.message || 'Registration failed. Please try again.'}
            </div>
          )}
          {isSuccess && (
            <div className="md:col-span-2 text-green-500 text-sm text-center">
              Registration successful! Redirecting...
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 