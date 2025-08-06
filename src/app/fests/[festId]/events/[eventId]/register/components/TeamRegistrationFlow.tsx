'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useEvent } from '@/hooks/events/useEvent';
import { useCreateTeam, useJoinTeam } from '@/hooks/registration';
import { TeamFormData, TeamMember, RegistrationStep } from '@/types/event-registration';
import TeamChoiceStep from './TeamChoiceStep';

export default function TeamRegistrationFlow() {
  const params = useParams();
  const festId = params?.festId as string;
  const eventId = params?.eventId as string;
  
  const { data: event, isLoading: eventLoading } = useEvent(festId, eventId);
  const createTeam = useCreateTeam();
  const joinTeam = useJoinTeam();

  // State for team registration flow
  const [currentStep, setCurrentStep] = useState(0);
  const [teamData, setTeamData] = useState<TeamFormData>({
    teamName: '',
    description: '',
    members: [{ name: '', email: '', phone: '', college: '', branch: '' }]
  });
  const [isTeamLeader, setIsTeamLeader] = useState(true);
  const [teamCode, setTeamCode] = useState('');
  const [createdTeam, setCreatedTeam] = useState<any>(null);

  // Steps for team registration
  const steps: RegistrationStep[] = [
    { id: 'team-choice', title: 'Team Choice', description: 'Create or join a team', isCompleted: false, isActive: true },
    { id: 'team-details', title: 'Team Details', description: 'Enter team information', isCompleted: false, isActive: false },
    { id: 'member-details', title: 'Member Details', description: 'Enter team member information', isCompleted: false, isActive: false },
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

  const handleCreateTeam = async () => {
    try {
      const result = await createTeam.mutateAsync({
        eventId,
        teamName: teamData.teamName,
        description: teamData.description
      });
      setCreatedTeam(result.data.team);
      handleNextStep();
    } catch (error) {
      console.error('Team creation failed:', error);
    }
  };

  const handleJoinTeam = async () => {
    try {
      await joinTeam.mutateAsync({
        teamCode
      });
      handleNextStep();
    } catch (error) {
      console.error('Team join failed:', error);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'team-choice':
        return (
          <TeamChoiceStep 
            isTeamLeader={isTeamLeader}
            setIsTeamLeader={setIsTeamLeader}
            teamData={teamData}
            setTeamData={setTeamData}
            teamCode={teamCode}
            setTeamCode={setTeamCode}
            onCreateTeam={handleCreateTeam}
            onJoinTeam={handleJoinTeam}
            createTeamLoading={createTeam.isPending}
            joinTeamLoading={joinTeam.isPending}
          />
        );
      
      case 'team-details':
        return (
          <TeamDetailsStep 
            teamData={teamData}
            setTeamData={setTeamData}
            createdTeam={createdTeam}
            onNext={handleNextStep}
          />
        );
      
      case 'member-details':
        return (
          <MemberDetailsStep 
            teamData={teamData}
            setTeamData={setTeamData}
            onNext={handleNextStep}
          />
        );
      
      case 'review':
        return (
          <ReviewStep 
            event={event}
            teamData={teamData}
            onConfirm={handleCreateTeam}
            isLoading={createTeam.isPending}
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
              {event.name} - Team Registration
            </h1>
            <p className="text-gray-400 mt-2">Register as a team participant</p>
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

// Team-specific step components
function TeamDetailsStep({
  teamData,
  setTeamData,
  createdTeam,
  onNext
}: {
  teamData: TeamFormData;
  setTeamData: (data: TeamFormData) => void;
  createdTeam: any;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Team Details</h2>
      
      {createdTeam && (
        <div className="bg-green-900 border border-green-700 rounded-lg p-4 mb-6">
          <h3 className="text-green-400 font-semibold mb-2">Team Created Successfully!</h3>
          <div className="text-sm text-green-300">
            <p><strong>Team Name:</strong> {createdTeam.teamName}</p>
            <p><strong>Team Code:</strong> {createdTeam.teamCode}</p>
            <p><strong>Available Slots:</strong> {createdTeam.availableSlots}</p>
          </div>
        </div>
      )}

      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Team Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Team Name</label>
            <input
              type="text"
              value={teamData.teamName}
              disabled
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Team Description</label>
            <textarea
              value={teamData.description || ''}
              onChange={(e) => setTeamData({ ...teamData, description: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

function MemberDetailsStep({
  teamData,
  setTeamData,
  onNext
}: {
  teamData: TeamFormData;
  setTeamData: (data: TeamFormData) => void;
  onNext: () => void;
}) {
  const addMember = () => {
    setTeamData({
      ...teamData,
      members: [...teamData.members, { name: '', email: '', phone: '', college: '', branch: '' }]
    });
  };

  const removeMember = (index: number) => {
    if (teamData.members.length > 1) {
      const newMembers = teamData.members.filter((_, i) => i !== index);
      setTeamData({ ...teamData, members: newMembers });
    }
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...teamData.members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setTeamData({ ...teamData, members: newMembers });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Team Member Details</h2>
      
      <div className="space-y-6">
        {teamData.members.map((member, index) => (
          <div key={index} className="bg-zinc-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Member {index + 1}</h3>
              {teamData.members.length > 1 && (
                <button
                  onClick={() => removeMember(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => updateMember(index, 'email', e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={member.phone || ''}
                  onChange={(e) => updateMember(index, 'phone', e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">College</label>
                <input
                  type="text"
                  value={member.college || ''}
                  onChange={(e) => updateMember(index, 'college', e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Branch</label>
                <input
                  type="text"
                  value={member.branch || ''}
                  onChange={(e) => updateMember(index, 'branch', e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={addMember}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Add Member
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

function ReviewStep({
  event,
  teamData,
  onConfirm,
  isLoading
}: {
  event: any;
  teamData: TeamFormData;
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
            <p className="text-white font-medium">Team</p>
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
            <span className="text-gray-400">Team Name:</span>
            <p className="text-white font-medium">{teamData.teamName}</p>
          </div>
          {teamData.description && (
            <div>
              <span className="text-gray-400">Team Description:</span>
              <p className="text-white font-medium">{teamData.description}</p>
            </div>
          )}
          <div>
            <span className="text-gray-400">Team Members:</span>
            <div className="mt-2 space-y-2">
              {teamData.members.map((member, index) => (
                <div key={index} className="bg-zinc-700 rounded p-3">
                  <p className="text-white font-medium">{member.name}</p>
                  <p className="text-gray-400 text-sm">{member.email}</p>
                  {member.phone && <p className="text-gray-400 text-sm">{member.phone}</p>}
                </div>
              ))}
            </div>
          </div>
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

function SuccessStep({ event }: { event: any }) {
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
            <span className="text-white">Team</span>
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