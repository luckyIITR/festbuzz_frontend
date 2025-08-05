'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFest } from '@/hooks/fest';
import Step1BasicDetails from '../../../../add/Step1BasicDetails';

export default function EditFestBasic() {
  const params = useParams();
  const router = useRouter();
  const festId = params?.festId as string;
  const { isLoading } = useFest(festId);
  const [form, setForm] = useState({
    logo: null as File | null,
    photos: [] as File[],
    festType: "",
    festName: "",
    visibility: "public",
    state: "",
    city: "",
    venue: "",
    college: "",
    startDate: "",
    endDate: "",
    festMode: "online", // Added for fest mode
    rulebook: "", // Added for rulebook link
    instagram: "", // Added for instagram link
    website: "", // Added for website link
    about: "", // Added for about fest
    contact: "", // Added for contact number
    email: "", // Added for email
    // Page 3 fields
    ticketName: "",
    feeType: "paid",
    ticketPrice: "",
    ticketStartDate: "",
    ticketStartTime: "",
    ticketEndDate: "",
    ticketEndTime: "",
    sponsors: [
      { image: null as File | null, name: '', title: '', website: '' },
    ],
    questions: [
      { question: '', type: 'Text' },
    ],
    aftermovie: '',
  });

  // useEffect(() => {
  //   if (fest) {
  //     setForm({
  //       logo: fest.logo || null,
  //       photos: fest.galleryImages || [],
  //       festType: fest.theme || '',
  //       festName: fest.name || '',
  //       visibility: fest.isRegistrationOpen ? 'public' : 'private',
  //       state: fest.location || '',
  //       city: '',
  //       venue: fest.location || '',
  //       college: fest.organizer || '',
  //       startDate: fest.startDate || '',
  //       endDate: fest.endDate || '',
  //       festMode: '',
  //       rulebook: fest.rules || '',
  //       instagram: '',
  //       website: '',
  //       about: fest.description || '',
  //       contact: '',
  //       email: '',
  //       ticketName: '',
  //       feeType: '',
  //       ticketPrice: '',
  //       ticketStartDate: '',
  //       ticketStartTime: '',
  //       ticketEndDate: '',
  //       ticketEndTime: '',
  //       sponsors: fest.sponsors || [],
  //       questions: [],
  //       aftermovie: '',
  //     });
  //   } else if (!isLoading && !form) {
  //     setForm({
  //       logo: null,
  //       photos: [],
  //       festType: '',
  //       festName: '',
  //       visibility: 'public',
  //       state: '',
  //       city: '',
  //       venue: '',
  //       college: '',
  //       startDate: '',
  //       endDate: '',
  //       festMode: '',
  //       rulebook: '',
  //       instagram: '',
  //       website: '',
  //       about: '',
  //       contact: '',
  //       email: '',
  //       ticketName: '',
  //       feeType: '',
  //       ticketPrice: '',
  //       ticketStartDate: '',
  //       ticketStartTime: '',
  //       ticketEndDate: '',
  //       ticketEndTime: '',
  //       sponsors: [],
  //       questions: [],
  //       aftermovie: '',
  //     });
  //   }
  // }, [fest, isLoading, form]);

  const handleNext = () => {
    router.push(`/fests/${festId}/dashboard/edit/about`);
  };

  if (isLoading && !form) return <div className="text-center py-10 text-pink-400">Loading fest details...</div>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#101010] px-2 sm:px-6 py-8">
      <div className="w-full max-w-3xl p-6 sm:p-10 flex flex-col items-center transition-all duration-500">
        <h2 className="text-2xl font-bold font-urbanist text-white mb-6">Edit Fest - Basic Details</h2>
        <Step1BasicDetails form={form} setForm={setForm} handleNext={handleNext} />
      </div>
    </div>
  );
} 