// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   GraduationCap, 
//   Calendar,
//   Edit3,
//   Save,
//   X,
//   Camera,
//   Shield,
//   Award,
//   BookOpen,
//   Settings
// } from 'lucide-react';
// import { useProfile, useUpdateProfile } from '@/hooks/user';

// interface ProfileFormData {
//   name: string;
//   phone: string;
//   college: string;
//   gender: 'Male' | 'Female' | 'Other';
//   dateOfBirth: string;
//   address: string;
// }

// export default function ProfilePage() {
//   const { data: user, isLoading: isLoadingProfile, error: profileError } = useProfile();
//   const updateProfileMutation = useUpdateProfile();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<ProfileFormData>({
//     name: '',
//     phone: '',
//     college: '',
//     gender: 'Male',
//     dateOfBirth: '',
//     address: ''
//   });

//   // Update form data when user data is loaded
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         phone: user.phone || '',
//         college: user.college || '',
//         gender: user.gender || 'Male',
//         dateOfBirth: user.dateOfBirth || '',
//         address: user.address || ''
//       });
//     }
//   }, [user]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       // Only send fields that have changed from the original user data
//       const changedFields: Partial<ProfileFormData> = {};

//       if (user) {
//         if (formData.name !== user.name) changedFields.name = formData.name;
//         if (formData.phone !== user.phone) changedFields.phone = formData.phone;
//         if (formData.college !== user.college) changedFields.college = formData.college;
//         if (formData.gender !== user.gender) changedFields.gender = formData.gender;
//         if (formData.dateOfBirth !== user.dateOfBirth) changedFields.dateOfBirth = formData.dateOfBirth;
//         if (formData.address !== user.address) changedFields.address = formData.address;
//       }

//       // Only proceed if there are actual changes
//       if (Object.keys(changedFields).length === 0) {
//         setIsEditing(false);
//         return;
//       }

//       await updateProfileMutation.mutateAsync(changedFields);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleCancel = () => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         phone: user.phone || '',
//         college: user.college || '',
//         gender: user.gender || 'Male',
//         dateOfBirth: user.dateOfBirth || '',
//         address: user.address || ''
//       });
//     }
//     setIsEditing(false);
//   };

//   if (isLoadingProfile) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         <p className="mt-4 text-gray-400">Loading profile...</p>
//       </div>
//     );
//   }

//   if (profileError) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
//         <h1 className="text-3xl font-bold mb-4 text-red-400">Error loading profile</h1>
//         <p className="text-gray-400 mb-4">{(profileError as Error).message}</p>
//         <Link href="/login" className="text-pink-400 underline">Go to Login</Link>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
//         <h1 className="text-3xl font-bold mb-4">You are not logged in</h1>
//         <Link href="/login" className="text-pink-400 underline">Go to Login</Link>
//       </div>
//     );
//   }

//   const isProfileComplete = user.college && user.phone && user.gender && user.dateOfBirth && user.address;

//   return (
//     <div className="min-h-screen bg-black text-white">

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Profile Incomplete Warning */}
//         {!isProfileComplete && (
//           <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4 mb-6">
//             <div className="flex items-center gap-3">
//               <Shield className="text-yellow-400" size={20} />
//               <div>
//                 <h3 className="font-semibold text-yellow-200">Complete Your Profile</h3>
//                 <p className="text-yellow-300 text-sm">
//                   Please complete your profile information to get the best experience.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Profile Card */}
//           <div className="lg:col-span-1">
//             <div className="bg-[#181818] rounded-xl border border-zinc-800 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold">Profile</h2>
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 >
//                   {isEditing ? <X size={16} /> : <Edit3 size={16} />}
//                   {isEditing ? 'Cancel' : 'Edit'}
//                 </button>
//               </div>

//               {/* Profile Image */}
//               <div className="flex flex-col items-center mb-6">
//                 <div className="relative">
//                   <div className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mb-4">
//                     <span className="text-black font-bold text-2xl">
//                       {user.name?.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   {isEditing && (
//                     <button className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition">
//                       <Camera size={16} className="text-white" />
//                     </button>
//                   )}
//                 </div>
//                 <h3 className="text-lg font-semibold">{user.name}</h3>
//                 <p className="text-gray-400">{user.email}</p>
//               </div>

//               {/* Profile Stats */}
//               <div className="space-y-4 mb-6">
//                 <div className="flex items-center justify-between p-3 bg-[#2C2C2C] rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <Award className="text-blue-400" size={20} />
//                     <div>
//                       <p className="text-sm text-gray-400">Fests Registered</p>
//                       <p className="font-semibold">{user.totalFestsRegistered || 0}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between p-3 bg-[#2C2C2C] rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <BookOpen className="text-green-400" size={20} />
//                     <div>
//                       <p className="text-sm text-gray-400">Events Registered</p>
//                       <p className="font-semibold">{user.totalEventsRegistered || 0}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between p-3 bg-[#2C2C2C] rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <Settings className="text-yellow-400" size={20} />
//                     <div>
//                       <p className="text-sm text-gray-400">Total Spent</p>
//                       <p className="font-semibold">₹{(user.totalAmountPaid || 0).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="space-y-2">
//                 <Link 
//                   href="/fests" 
//                   className="w-full flex items-center gap-3 p-3 bg-[#2C2C2C] rounded-lg hover:bg-zinc-700 transition"
//                 >
//                   <Award size={20} className="text-blue-400" />
//                   <span>Browse Fests</span>
//                 </Link>
//                 <Link 
//                   href="/profile" 
//                   className="w-full flex items-center gap-3 p-3 bg-[#2C2C2C] rounded-lg hover:bg-zinc-700 transition"
//                 >
//                   <Settings size={20} className="text-gray-400" />
//                   <span>Account Settings</span>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Profile Details Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-[#181818] rounded-xl border border-zinc-800 p-6">
//               <h2 className="text-xl font-bold mb-6">
//                 {isEditing ? 'Edit Profile' : 'Profile Details'}
//               </h2>

//               {isEditing ? (
//                 <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="+91 98765 43210"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">
//                         College/University
//                       </label>
//                       <input
//                         type="text"
//                         name="college"
//                         value={formData.college}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="e.g., IIT Roorkee"
//                       />
//                     </div>



//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">
//                         Gender
//                       </label>
//                       <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">
//                         Date of Birth
//                       </label>
//                       <input
//                         type="date"
//                         name="dateOfBirth"
//                         value={formData.dateOfBirth}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Address
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Enter your address"
//                     />
//                   </div>

//                   <div className="flex gap-4">
//                     <button
//                       type="submit"
//                       disabled={updateProfileMutation.isPending}
//                       className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//                     >
//                       <Save size={16} />
//                       {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleCancel}
//                       className="px-6 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex items-center gap-3">
//                       <User className="text-blue-400" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-400">Full Name</p>
//                         <p className="font-medium">{user.name}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <Mail className="text-green-400" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-400">Email</p>
//                         <p className="font-medium">{user.email}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <Phone className="text-yellow-400" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-400">Phone</p>
//                         <p className="font-medium">{user.phone || 'Not provided'}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <GraduationCap className="text-purple-400" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-400">College</p>
//                         <p className="font-medium">{user.college || 'Not provided'}</p>
//                       </div>
//                     </div>



//                     <div className="flex items-center gap-3">
//                       <User className="text-orange-400" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-400">Gender</p>
//                         <p className="font-medium capitalize">{user.gender || 'Not specified'}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <Calendar className="text-teal-400" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-400">Date of Birth</p>
//                         <p className="font-medium">
//                           {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {user.address && (
//                     <div className="flex items-start gap-3">
//                       <MapPin className="text-red-400 mt-1" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-400">Address</p>
//                         <p className="font-medium">{user.address}</p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="pt-4 border-t border-zinc-800">
//                     <p className="text-sm text-gray-400">
//                       Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently joined'}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 


'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Award,
  BookOpen,
  Settings
} from 'lucide-react';
import { useProfile, useUpdateProfile } from '@/hooks/user';

interface ProfileFormData {
  name: string;
  phone: string;
  college: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  address: string;
}

export default function ProfilePage() {
  const { data: user, isLoading: isLoadingProfile, error: profileError } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    phone: '',
    college: '',
    gender: 'Male',
    dateOfBirth: '',
    address: ''
  });

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

  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        college: user.college || '',
        gender: user.gender || 'Male',
        dateOfBirth: formatDateForInput(user.dateOfBirth),
        address: user.address || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Only send fields that have changed from the original user data
      const changedFields: Partial<ProfileFormData> = {};

      if (user) {
        if (formData.name !== user.name) changedFields.name = formData.name;
        if (formData.phone !== user.phone) changedFields.phone = formData.phone;
        if (formData.college !== user.college) changedFields.college = formData.college;
        if (formData.gender !== user.gender) changedFields.gender = formData.gender;
        if (formData.dateOfBirth !== user.dateOfBirth) changedFields.dateOfBirth = formData.dateOfBirth;
        if (formData.address !== user.address) changedFields.address = formData.address;
      }

      // Only proceed if there are actual changes
      if (Object.keys(changedFields).length === 0) {
        setIsEditing(false);
        return;
      }

      await updateProfileMutation.mutateAsync(changedFields);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        college: user.college || '',
        gender: user.gender || 'Male',
        dateOfBirth: formatDateForInput(user.dateOfBirth),
        address: user.address || ''
      });
    }
    setIsEditing(false);
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold mb-4 text-red-400">Error loading profile</h1>
        <p className="text-gray-400 mb-4">{(profileError as Error).message}</p>
        <Link href="/login" className="text-pink-400 underline">Go to Login</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">You are not logged in</h1>
        <Link href="/login" className="text-pink-400 underline">Go to Login</Link>
      </div>
    );
  }

  const isProfileComplete = user.college && user.phone && user.gender && user.dateOfBirth && user.address;
  return (
    <div>
      <div className="w-full mx-auto px-6 py-8">
        {/* Profile Incomplete Warning */}
        {!isProfileComplete && (
          <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Shield className="text-yellow-400" size={20} />
              <div>
                <h3 className="font-semibold text-yellow-200">Complete Your Profile</h3>
                <p className="text-yellow-300 text-sm">
                  Please complete your profile information to get the best experience.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="lg:col-span-2 bg-[#181818] rounded-xl md:p-6 p-3 ">
          <div className="">
            <div className='flex justify-between mb-5 md:mb-10'>
              <h2 className="text-xl font-bold text-[#E1FF01] ">
                {isEditing ? 'Edit Profile' : 'Profile Details'}
              </h2>
              <div className="bg-[#181818] rounded-xl  ">
                <div className="flex items-center justify-between ">
                  <h2 className="text-xl font-bold"></h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-3 py-1 font-urbanist font-[600] bg-[#2A2A2A] text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 ">


              {/* Profile Image */}

              <div className='flex gap-5 relative  items-center'>
                <div className="w-20 md:h-20 h-15 ml-4 bg-lime-400 rounded-full flex items-center justify-center mb-4">
                  <span className="text-black font-bold text-2xl">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 left-20 bg-blue-600 p-1 rounded-full hover:bg-blue-700 transition">
                    <Camera size={12} className="text-white" />
                  </button>
                )}
                <div className='w-60 mb-2 text-left text-[#4E4E4E] font-urbanist font-[700]  text-[16px]/5 '>At least 800x800 px recommend JPG or PNG is allowed</div>
              </div>

              {/* Profile Stats */}
              <div className="  space-y-4 mt-6 mb-6">
                <div className='text-[#E1FF01] font-urbanist font-[700]'>Profle Stats  </div>
                <div className='flex justify-between flex-col md:flex-row  gap-2 md:gap-0'>
                  <div className="flex items-center justify-between p-3 bg-[#2C2C2C] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="text-blue-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Fests Registered</p>
                        <p className="font-semibold">0</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#2C2C2C] rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="text-green-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Events Registered</p>
                        <p className="font-semibold">0</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#2C2C2C] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Settings className="text-yellow-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Total Spent</p>
                        <p className="font-semibold">₹0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='font-urbanist text-[#E1FF01] font-[700] mb-6'>Personal info</div>
          {isEditing ? (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6  ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    College/University
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., IIT Roorkee"
                  />
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#2C2C2C] border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <Save size={16} />
                  {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <User className="text-blue-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-green-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-yellow-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">{user.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <GraduationCap className="text-purple-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">College</p>
                    <p className="font-medium">{user.college || 'Not provided'}</p>
                  </div>
                </div>



                <div className="flex items-center gap-3">
                  <User className="text-orange-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Gender</p>
                    <p className="font-medium capitalize">{user.gender || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="text-teal-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Date of Birth</p>
                    <p className="font-medium">
                      {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {user.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="text-red-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Address</p>
                    <p className="font-medium">{user.address}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-zinc-800">
                <p className="text-sm text-gray-400">
                                        Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently joined'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  )
}