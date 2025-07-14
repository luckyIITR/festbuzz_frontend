"use client";
import React, { useState } from "react";
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

export default function AddFestPage() {
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
  const [newSponsor, setNewSponsor] = useState({ image: null as File | null, name: '', title: '', website: '' });
  const [newQuestion, setNewQuestion] = useState({ question: '', type: 'Text' });

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

  // Sponsor handlers
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
      setForm((prev) => ({ ...prev, sponsors: [...prev.sponsors, newSponsor] }));
      setNewSponsor({ image: null, name: '', title: '', website: '' });
    }
  };

  // Question handlers
  const handleQuestionInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };
  const addQuestion = () => {
    if (newQuestion.question) {
      setForm((prev) => ({ ...prev, questions: [...prev.questions, newQuestion] }));
      setNewQuestion({ question: '', type: 'Text' });
    }
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
              newSponsor={newSponsor}
              addSponsor={addSponsor}
              newQuestion={newQuestion}
              addQuestion={addQuestion}
              handleInput={handleInput}
              handleSponsorInput={handleSponsorInput}
              handleQuestionInput={handleQuestionInput}
              handleSubmit={e => { e.preventDefault(); /* handle submit here */ }}
              handleBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
} 