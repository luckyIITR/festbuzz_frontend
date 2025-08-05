'use client';
import React from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export default function NavigationButtons({ currentStep, totalSteps, onBack, onNext }: NavigationButtonsProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        type="button"
        className="bg-[#0050FF] text-[#E6FF4C] font-bold text-lg mr-4 px-12 py-3 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors"
        onClick={onBack}
      >
        Back
      </button>
      <button
        type="button"
        className="bg-[#0050FF] text-[#E6FF4C] font-bold text-lg px-12 py-3 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors"
        onClick={onNext}
      >
        {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
} 