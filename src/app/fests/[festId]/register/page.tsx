'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFestRegistration } from '@/hooks/registration';
import { useProfile } from '@/hooks/user';

export default function FestRegisterPage() {
  const params = useParams();
  const router = useRouter();
  const festId = params?.festId as string;
  const { data: userProfile, isLoading: profileLoading } = useProfile();

  const { mutate: registerForFest, isPending: isRegistering } = useFestRegistration();
  
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
    // Get user data from localStorage first
    let userData = null;
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      userData = userStr ? JSON.parse(userStr) : null;
    }

    // Helper function to convert ISO date to YYYY-MM-DD format
    const formatDateForInput = (dateString: string | undefined): string => {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
      } catch (error) {
        console.error('Error formatting date:', error);
        return '';
      }
    };

    // Prefill form with available data from both localStorage and profile hook
    const availableData = {
      name: userProfile?.data?.name || userData?.name || '',
      phone: userProfile?.data?.phone || userData?.phone || '',
      dateOfBirth: formatDateForInput(userProfile?.data?.dateOfBirth) || formatDateForInput(userData?.dateOfBirth) || '',
      gender: userProfile?.data?.gender || userData?.gender || '',
      city: userProfile?.data?.city || userData?.city || '',
      state: userProfile?.data?.state || userData?.state || '',
      instituteName: userProfile?.data?.college || userData?.college || userData?.instituteName || ''
    };

    setFormData(prev => ({
      ...prev,
      ...availableData
    }));
  }, [userProfile]); // Re-run when profile data is loaded

  // Show loading while loading profile
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold mb-4">Loading...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate gender enum to match backend requirements
    if (!['Male', 'Female', 'Other'].includes(formData.gender)) {
      alert('Please select a valid gender');
      return;
    }

    // Validate required fields
    const requiredFields = ['phone', 'dateOfBirth', 'gender', 'city', 'state', 'instituteName'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      // Prepare payload for backend
      const payload = {
        festId,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'Male' | 'Female' | 'Other',
        city: formData.city,
        state: formData.state,
        instituteName: formData.instituteName,
        answers: [] // Empty array for now, can be extended later
      };

      registerForFest(payload, {
        onSuccess: () => {
          alert('Registration successful!');
          
          // Small delay to ensure the status is updated
          setTimeout(() => {
            router.push(`/fests/${festId}`);
          }, 1000);
        },
        onError: (error) => {
          console.error('Registration error:', error);
          alert('Registration failed. Please try again.');
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
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
              disabled={isRegistering}
              className="px-10 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isRegistering ? 'Registering...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 