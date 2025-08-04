'use client';
import React from 'react';
import BasicDetailsStep from './steps/BasicDetailsStep';
import VenueStep from './steps/VenueStep';
import DetailsStep from './steps/DetailsStep';
import ImagesStep from './steps/ImagesStep';
import RewardsStep from './steps/RewardsStep';

interface StepFormsProps {
  currentStep: number;
  visibility: string;
  setVisibility: (visibility: string) => void;
  eventMode: string;
  setEventMode: (mode: string) => void;
  rewards: Array<{ rank: string; cash: string; coupon: string; goodies: string }>;
  setRewards: React.Dispatch<React.SetStateAction<Array<{ rank: string; cash: string; coupon: string; goodies: string }>>>;
}

export default function StepForms({
  currentStep,
  visibility,
  setVisibility,
  eventMode,
  setEventMode,
  rewards,
  setRewards
}: StepFormsProps) {
  switch (currentStep) {
    case 0:
      return <BasicDetailsStep visibility={visibility} setVisibility={setVisibility} />;
    case 1:
      return <VenueStep eventMode={eventMode} setEventMode={setEventMode} />;
    case 2:
      return <DetailsStep />;
    case 3:
      return <ImagesStep />;
    case 4:
      return <RewardsStep rewards={rewards} setRewards={setRewards} />;
    default:
      return null;
  }
} 