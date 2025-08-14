'use client';

import { TeamFormData } from '@/types/event-registration';

interface TeamChoiceStepProps {
  isTeamLeader: boolean;
  setIsTeamLeader: (value: boolean) => void;
  teamData: TeamFormData;
  setTeamData: (data: TeamFormData) => void;
  teamCode: string;
  setTeamCode: (value: string) => void;
  onCreateTeam: () => void;
  onJoinTeam: () => void;
  createTeamLoading: boolean;
  joinTeamLoading: boolean;
}

export default function TeamChoiceStep({
  isTeamLeader,
  setIsTeamLeader,
  teamData,
  setTeamData,
  teamCode,
  setTeamCode,
  onCreateTeam,
  onJoinTeam,
  createTeamLoading,
  joinTeamLoading
}: TeamChoiceStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Team Registration</h2>
      
      {/* Team Leader Choice */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Are you the team leader?</h3>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              checked={isTeamLeader}
              onChange={() => setIsTeamLeader(true)}
              className="mr-2 text-pink-500"
            />
            <span className="text-white">Yes, I&apos;m creating a new team</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              checked={!isTeamLeader}
              onChange={() => setIsTeamLeader(false)}
              className="mr-2 text-pink-500"
            />
            <span className="text-white">No, I&apos;m joining an existing team</span>
          </label>
        </div>
      </div>

      {isTeamLeader ? (
        /* Create Team Form */
        <div className="bg-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Create New Team</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Team Name *</label>
              <input
                type="text"
                value={teamData.teamName}
                onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter team name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Team Description</label>
              <textarea
                value={teamData.description || ''}
                onChange={(e) => setTeamData({ ...teamData, description: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={3}
                placeholder="Describe your team..."
              />
            </div>
            <button
              onClick={onCreateTeam}
              disabled={createTeamLoading || !teamData.teamName}
              className="w-full px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createTeamLoading ? 'Creating Team...' : 'Create Team'}
            </button>
          </div>
        </div>
      ) : (
        /* Join Team Form */
        <div className="bg-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Join Existing Team</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Team Code *</label>
              <input
                type="text"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter team code"
                required
              />
            </div>
            <button
              onClick={onJoinTeam}
              disabled={joinTeamLoading || !teamCode}
              className="w-full px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {joinTeamLoading ? 'Joining Team...' : 'Join Team'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 