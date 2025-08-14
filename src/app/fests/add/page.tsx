"use client";
import React, { useState } from "react";
import { RouteGuard } from "../../../components/RouteGuard";
import ProgressBar from "./ProgressBar";
import Step1BasicDetails from "./Step1BasicDetails";
import Step2AboutFest from "./Step2AboutFest";
import Step3Tickets from "./Step3Tickets";
import Step4AddOns from "./Step4AddOns";

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

  // Remove newQuestion state - no longer needed

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', form);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#23252B] via-[#1a1b1f] to-[#111215] px-2 sm:px-6 py-8">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center transition-all duration-500">
        {/* Progress Bar */}
        <ProgressBar steps={steps} step={step} />
        {/* Form */}
        <div className="w-full transition-all duration-500">
          {step === 0 && (
            <Step1BasicDetails form={form} setForm={setForm} handleNext={handleNext} />
          )}
          {step === 1 && (
            <Step2AboutFest form={form} setForm={setForm} handleNext={handleNext} handleBack={handleBack} handleTextArea={handleTextArea} />
          )}
          {step === 2 && (
            <Step3Tickets form={form} setForm={setForm} handleNext={handleNext} handleBack={handleBack} />
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