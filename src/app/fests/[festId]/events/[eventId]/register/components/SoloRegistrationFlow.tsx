'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useEvent } from '@/hooks/events/useEvent';
import { useSoloEventRegistration } from '@/hooks/registration';
import { RegistrationFormData, RegistrationStep } from '@/types/event-registration';
import PersonalDetailsStep from './PersonalDetailsStep';

export default function SoloRegistrationFlow() {
  const params = useParams();
  const festId = params?.festId as string;
  const eventId = params?.eventId as string;
  
  const { data: event, isLoading: eventLoading } = useEvent(festId, eventId);
  const soloRegistration = useSoloEventRegistration();

  // State for solo registration flow
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationFormData>({
    participantName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    answers: []
  });

  // Steps for solo registration
  const steps: RegistrationStep[] = [
    { id: 'details', title: 'Personal Details', description: 'Enter your information', isCompleted: false, isActive: true },
    { id: 'questions', title: 'Event Questions', description: 'Answer event-specific questions', isCompleted: false, isActive: false },
    { id: 'review', title: 'Review & Confirm', description: 'Review your registration', isCompleted: false, isActive: false },
    { id: 'success', title: 'Registration Complete', description: 'Your registration is confirmed', isCompleted: false, isActive: false }
  ];

  if (eventLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Event not found</p>
        </div>
      </div>
    );
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSoloRegistration = async () => {
    try {
      await soloRegistration.mutateAsync({
        festId,
        eventId,
        answers: formData.answers || []
      });
      handleNextStep();
    } catch (error) {
      console.error('Solo registration failed:', error);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'details':
        return <PersonalDetailsStep formData={formData} setFormData={setFormData} onNext={handleNextStep} />;
      
      case 'questions':
        return <EventQuestionsStep formData={formData} setFormData={setFormData} onNext={handleNextStep} />;
      
      case 'review':
        return (
          <ReviewStep 
            event={event}
            formData={formData}
            onConfirm={handleSoloRegistration}
            isLoading={soloRegistration.isPending}
          />
        );
      
      case 'success':
        return <SuccessStep event={event} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {event.name} - Individual Registration
            </h1>
            <p className="text-gray-400 mt-2">Register as an individual participant</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Step {currentStep + 1} of {steps.length}</div>
            <div className="text-lg font-semibold text-white">{steps[currentStep].title}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index <= currentStep 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-pink-500' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400">
            {steps[currentStep].description}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-zinc-900 rounded-2xl p-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevStep}
              className="px-6 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
            >
              Previous
            </button>
            <div className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Solo-specific step components
function EventQuestionsStep({ 
  formData, 
  setFormData, 
  onNext 
}: { 
  formData: RegistrationFormData; 
  setFormData: (data: RegistrationFormData) => void; 
  onNext: () => void; 
}) {
  const [answers, setAnswers] = useState<string[]>(formData.answers || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ ...formData, answers });
    onNext();
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Sample questions - in real app, these would come from the event data
  const questions = [
    "What is your experience level in this field?",
    "Why do you want to participate in this event?",
    "What are your expectations from this event?"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Event Questions</h2>
      
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {question}
            </label>
            <textarea
              value={answers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows={3}
              placeholder="Enter your answer..."
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition"
        >
          Next Step
        </button>
      </div>
    </form>
  );
}

function ReviewStep({
  event,
  formData,
  onConfirm,
  isLoading
}: {
  event: { name: string; venue?: string; location?: string; startDate?: string; endDate?: string };
  formData: RegistrationFormData;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Review & Confirm</h2>
      
      {/* Event Summary */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Event Name:</span>
            <p className="text-white font-medium">{event.name}</p>
          </div>
          <div>
            <span className="text-gray-400">Event Type:</span>
            <p className="text-white font-medium">Individual</p>
          </div>
          <div>
            <span className="text-gray-400">Venue:</span>
            <p className="text-white font-medium">{event.venue || event.location || 'TBA'}</p>
          </div>
          <div>
            <span className="text-gray-400">Date:</span>
            <p className="text-white font-medium">
              {event.startDate && event.endDate 
                ? `${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`
                : 'TBA'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Registration Details */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Registration Details</h3>
        
        <div className="space-y-4">
          <div>
            <span className="text-gray-400">Participant Name:</span>
            <p className="text-white font-medium">{formData.participantName}</p>
          </div>
          <div>
            <span className="text-gray-400">Email:</span>
            <p className="text-white font-medium">{formData.email}</p>
          </div>
          {formData.phone && (
            <div>
              <span className="text-gray-400">Phone:</span>
              <p className="text-white font-medium">{formData.phone}</p>
            </div>
          )}
          {formData.college && (
            <div>
              <span className="text-gray-400">College:</span>
              <p className="text-white font-medium">{formData.college}</p>
            </div>
          )}
          {formData.branch && (
            <div>
              <span className="text-gray-400">Branch:</span>
              <p className="text-white font-medium">{formData.branch}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
        >
          Previous
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Confirming...' : 'Confirm Registration'}
        </button>
      </div>
    </div>
  );
}

function SuccessStep({ event }: { event: { name: string; festId?: string } }) {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-white">Registration Successful!</h2>
      <p className="text-gray-400">
        You have successfully registered for {event.name}
      </p>
      
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Registration Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Event:</span>
            <span className="text-white">{event.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-white">Individual</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className="text-green-400">Confirmed</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-400 text-sm">
          You will receive a confirmation email with your ticket details.
        </p>
        <button
          onClick={() => window.location.href = `/fests/${event.festId || 'fest'}`}
          className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
} 