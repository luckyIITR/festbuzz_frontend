'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFest } from '@/hooks/useFest';
import Step2AboutFest from '../../../../add/Step2AboutFest';
import type { FormType } from '../../../../add/Step1BasicDetails';

export default function EditFestAbout() {
  const params = useParams();
  const router = useRouter();
  const festId = params?.festId as string;
  const { isLoading } = useFest(festId);
  const [form, setForm] = useState<FormType>({
    logo: null,
    photos: [],
    festType: '',
    festName: '',
    visibility: 'public',
    state: '',
    city: '',
    venue: '',
    college: '',
    startDate: '',
    endDate: '',
    festMode: '',
    rulebook: '',
    instagram: '',
    website: '',
    about: '',
    contact: '',
    email: '',
    ticketName: '',
    feeType: '',
    ticketPrice: '',
    ticketStartDate: '',
    ticketStartTime: '',
    ticketEndDate: '',
    ticketEndTime: '',
    sponsors: [],
    questions: [],
    aftermovie: '',
  });


  const handleNext = () => {
    router.push(`/fests/${festId}/dashboard/edit/tickets`);
  };
  const handleBack = () => {
    router.push(`/fests/${festId}/dashboard/edit/basic`);
  };
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  if (isLoading && !form) return <div className="text-center py-10 text-pink-400">Loading fest details...</div>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#101010] px-2 sm:px-6 py-8">
      <div className="w-full max-w-3xl  rounded-3xl p-6 sm:p-10 flex flex-col items-center transition-all duration-500">
        <h2 className="text-2xl font-bold font-urbanist text-white mb-6">Edit Fest - About</h2>
        <Step2AboutFest form={form} setForm={setForm} handleNext={handleNext} handleBack={handleBack} handleTextArea={handleTextArea} />
      </div>
    </div>
  );
} 