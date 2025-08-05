'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFest } from '@/hooks/fest';
import Step4AddOns from '../../../../add/Step4AddOns';
import type { FormType } from '../../../../add/Step1BasicDetails';

export default function EditFestAddOns() {
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
  const [newSponsor, setNewSponsor] = useState<{ image: File | null; name: string; title: string; website: string }>({ image: null, name: '', title: '', website: '' });
  const [newQuestion, setNewQuestion] = useState({ question: '', type: 'Text' });

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

  const handleBack = () => {
    router.push(`/fests/${festId}/dashboard/edit/tickets`);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement PUT request to update fest details
    alert('Fest updated! (PUT request to be implemented)');
  };
  const handleSponsorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setNewSponsor((prev) => ({ ...prev, image: files[0] }));
    } else {
      setNewSponsor((prev) => ({ ...prev, [name]: value }));
    }
  };
  const addSponsor = () => {
    if (newSponsor.name || newSponsor.title || newSponsor.website || newSponsor.image) {
      setForm((prev) => prev ? { ...prev, sponsors: [...prev.sponsors, newSponsor] } : prev);
      setNewSponsor({ image: null, name: '', title: '', website: '' });
    }
  };
  const handleQuestionInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };
  const addQuestion = () => {
    if (newQuestion.question) {
      setForm((prev) => prev ? { ...prev, questions: [...prev.questions, newQuestion] } : prev);
      setNewQuestion({ question: '', type: 'Text' });
    }
  };

  if (isLoading && !form) return <div className="text-center py-10 text-pink-400">Loading fest details...</div>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#101010] px-2 sm:px-6 py-8">
      <div className="w-full max-w-3xl rounded-3xl  p-6 sm:p-10 flex flex-col items-center transition-all duration-500">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Fest - Add Ons</h2>
        <Step4AddOns
          form={form}
          newSponsor={newSponsor}
          addSponsor={addSponsor}
          newQuestion={newQuestion}
          addQuestion={addQuestion}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleInput={(e) => setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))}
          handleSponsorInput={handleSponsorInput}
          handleQuestionInput={handleQuestionInput}
          handleSubmit={handleSubmit}
          handleBack={handleBack}
        />
      </div>
    </div>
  );
} 