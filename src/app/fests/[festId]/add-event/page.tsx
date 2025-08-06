'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import StepForms from './components/StepForms';
import NavigationButtons from './components/NavigationButtons';

const steps = [
  { label: 'Basics' },
  { label: 'Venue' },
  { label: 'Details' },
  { label: 'Images' },
  { label: 'Rewards' },
  
];

const addOns = [
  { label: 'Info' },
  { label: 'Judges' },
  { label: 'Parameters' },
  { label: 'Roles' },
];

const initialRewards = [
  { rank: '1st', cash: '', coupon: '', goodies: '' },
  { rank: '2nd', cash: '', coupon: '', goodies: '' },
  { rank: '3rd', cash: '', coupon: '', goodies: '' },
];

export default function CreateEventPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [visibility, setVisibility] = React.useState('open');
  const [eventMode, setEventMode] = React.useState('online');
  const [rewards, setRewards] = React.useState(initialRewards);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push('./add-event/pricing');
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col relative">
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-row">
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep} 
          addOns={addOns} 
        />
        
        {/* Form Section */}
        <main className="flex-1 flex flex-col p-10 relative">
          <StepForms
            currentStep={currentStep}
            visibility={visibility}
            setVisibility={setVisibility}
            eventMode={eventMode}
            setEventMode={setEventMode}
            rewards={rewards}
            setRewards={setRewards}
          />
          
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={steps.length}
            onBack={handleBack}
            onNext={handleNext}
          />
        </main>
      </div>
    </div>
  );
} 