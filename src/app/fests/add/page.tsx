"use client";
import React, { useState } from "react";
import { RouteGuard } from "../../../components/RouteGuard";
import ProgressBar from "./ProgressBar";
import Step1BasicDetails from "./Step1BasicDetails";
import Step2AboutFest from "./Step2AboutFest";
import Step3Tickets from "./Step3Tickets";
import Step4AddOns from "./Step4AddOns";
import { useAddFest, FestivalFormData, FestivalTicket, FestivalSponsor } from "@/hooks/fest/useAddFest";

const steps = [
  "Basic details",
  "About fest",
  "Tickets",
  "Add-ons",
];

type SponsorType = {
  image: File | null;
  name: string;
  title: string;
  website: string;
};

function AddFestPageContent() {
  const [step, setStep] = useState(0);
  const { addFestival, error, isSuccess, reset } = useAddFest();

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
    festMode: "online",
    rulebook: "",
    instagram: "",
    website: "",
    about: "",
    contact: "",
    email: "",
    // Page 3 fields
    ticketName: "",
    feeType: "paid",
    ticketPrice: "",
    ticketStartDate: "",
    ticketStartTime: "",
    ticketEndDate: "",
    ticketEndTime: "",
    // Updated sponsors - start with one empty sponsor
    sponsors: [
      { image: null as File | null, name: '', title: '', website: '' },
    ] as SponsorType[],
    // Updated questions - start with one empty question
    questions: [
      { question: '', type: 'Text' },
    ] as { question: string; type: string }[],
    aftermovie: '',
  });

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/fests', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');
    const { url } = await response.json();
    return url;
  };

  // Transform form data to API format
  const transformFormData = async (formData: typeof form): Promise<FestivalFormData> => {
    // Upload files and get URLs
    let logoUrl = '';
    let heroImageUrl = '';
    let galleryImages: string[] = [];

    if (formData.logo) {
      logoUrl = await uploadFile(formData.logo);
    }

    if (formData.photos.length > 0) {
      // Use first photo as hero image, rest as gallery
      heroImageUrl = await uploadFile(formData.photos[0]);
      if (formData.photos.length > 1) {
        galleryImages = await Promise.all(
          formData.photos.slice(1).map(photo => uploadFile(photo))
        );
      }
    }

    // Transform sponsors
    const sponsors: FestivalSponsor[] = await Promise.all(
      formData.sponsors
        .filter(sponsor => sponsor.name.trim() !== '')
        .map(async (sponsor) => ({
          name: sponsor.name,
          title: sponsor.title,
          image: sponsor.image ? await uploadFile(sponsor.image) : '',
        }))
    );

    // Transform tickets
    const tickets: FestivalTicket[] = [];
    if (formData.ticketName.trim() !== '') {
      const availableFrom = formData.ticketStartDate && formData.ticketStartTime
        ? `${formData.ticketStartDate}T${formData.ticketStartTime}:00`
        : undefined;
      const availableTill = formData.ticketEndDate && formData.ticketEndTime
        ? `${formData.ticketEndDate}T${formData.ticketEndTime}:00`
        : undefined;

      tickets.push({
        name: formData.ticketName,
        feeType: formData.feeType as 'free' | 'paid',
        price: formData.feeType === 'paid' ? parseFloat(formData.ticketPrice) || 0 : undefined,
        availableFrom,
        availableTill,
      });
    }

    // Map form fields to API expected format
    return {
      name: formData.festName,
      type: formData.festType as 'Technical' | 'Cultural' | 'Sports' | 'Academic' | 'Mixed',
      visibility: formData.visibility as 'public' | 'private',
      state: formData.state,
      city: formData.city,
      venue: formData.venue,
      college: formData.college,
      startDate: formData.startDate,
      endDate: formData.endDate,
      festMode: formData.festMode as 'online' | 'offline' | 'hybrid',
      rulebook: formData.rulebook || undefined,
      instagram: formData.instagram || undefined,
      website: formData.website || undefined,
      about: formData.about,
      contact: formData.contact || undefined,
      email: formData.email || undefined,
      logo: logoUrl || undefined,
      heroImage: heroImageUrl || undefined,
      organizerLogo: logoUrl || undefined, // Using same logo for organizer
      bannerImage: heroImageUrl || undefined, // Using hero image as banner
      galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
      sponsors: sponsors.length > 0 ? sponsors : undefined,
      tickets: tickets.length > 0 ? tickets : undefined,
    };
  };

  // Handlers
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  // New sponsor handlers
  const addSponsor = () => {
    setForm(prev => ({
      ...prev,
      sponsors: [...prev.sponsors, { name: '', title: '', website: '', image: null }]
    }));
  };

  const handleSponsorChange = (index: number, field: keyof SponsorType, value: string | File) => {
    setForm(prev => ({
      ...prev,
      sponsors: prev.sponsors.map((sponsor, i) =>
        i === index ? { ...sponsor, [field]: value } : sponsor
      )
    }));
  };

  const deleteSponsor = (index: number) => {
    setForm(prev => ({
      ...prev,
      sponsors: prev.sponsors.filter((_, i) => i !== index)
    }));
  };

  // New question handlers
  const addQuestion = () => {
    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, { question: '', type: 'Text' }]
    }));
  };

  const handleQuestionChange = (index: number, field: 'question' | 'type', value: string) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.map((question, i) =>
        i === index ? { ...question, [field]: value } : question
      )
    }));
  };

  const deleteQuestion = (index: number) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Transform form data to API format
      const apiData = await transformFormData(form);

      // Submit to API
      const result = await addFestival(apiData);

      if (result) {
        // Success! Handle redirect or success message
        console.log('Festival created successfully:', result);
        // You might want to redirect to the festival page or show success message
        // router.push(`/festivals/${result.id}`);
      }
    } catch (err) {
      console.error('Error creating festival:', err);
    }
  };

  // Show success message if festival was created
  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#23252B] via-[#1a1b1f] to-[#111215] px-2 sm:px-6 py-8">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">Festival Created!</h2>
            <p className="text-gray-300">Your festival has been successfully created and is now live.</p>
          </div>
          <button
            onClick={() => {
              reset();
              setStep(0);
              setForm({
                logo: null,
                photos: [],
                festType: "",
                festName: "",
                visibility: "public",
                state: "",
                city: "",
                venue: "",
                college: "",
                startDate: "",
                endDate: "",
                festMode: "online",
                rulebook: "",
                instagram: "",
                website: "",
                about: "",
                contact: "",
                email: "",
                ticketName: "",
                feeType: "paid",
                ticketPrice: "",
                ticketStartDate: "",
                ticketStartTime: "",
                ticketEndDate: "",
                ticketEndTime: "",
                sponsors: [{ image: null, name: '', title: '', website: '' }],
                questions: [{ question: '', type: 'Text' }],
                aftermovie: '',
              });
            }}
            className="bg-[#0248F7] text-[#E1FF01] font-bold px-8 py-3 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300"
          >
            Create Another Festival
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#23252B] via-[#1a1b1f] to-[#111215] px-2 sm:px-6 py-8">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center transition-all duration-500">
        {/* Progress Bar */}
        <ProgressBar steps={steps} step={step} />

        {/* Error Message */}
        {error && (
          <div className="w-full mb-4 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="w-full transition-all duration-500">
          {step === 0 && (
            <Step1BasicDetails form={form} setForm={setForm} handleNext={handleNext} />
          )}
          {step === 1 && (
            <Step2AboutFest
              form={form}
              setForm={setForm}
              handleNext={handleNext}
              handleBack={handleBack}
              handleTextArea={handleTextArea}
            />
          )}
          {step === 2 && (
            <Step3Tickets
              form={form}
              setForm={setForm}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}
          {step === 3 && (
            <Step4AddOns
              form={form}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
              addSponsor={addSponsor}
              handleSponsorChange={handleSponsorChange}
              deleteSponsor={deleteSponsor}
              addQuestion={addQuestion}
              handleQuestionChange={handleQuestionChange}
              deleteQuestion={deleteQuestion}

            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AddFestPage() {
  return (
    <RouteGuard requiredPermissions={['create_fests']}>
      <AddFestPageContent />
    </RouteGuard>
  );
}