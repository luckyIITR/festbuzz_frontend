'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  useFestivalTeam, 
  useAssignTeamMember, 
  useRemoveTeamMember, 
  useUpdateTeamMember 
} from '../../../../../hooks/team';
import { AssignTeamMemberPayload, UpdateTeamMemberPayload, TeamMember } from '../../../../../types/team';
import { useFestPermissions } from '../../../../../hooks/useFestPermissions';
import edit from '../../../../../../public/assets/edit.png';
import UserSearchModal from './UserSearchModal';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AssignTeamMemberPayload) => void;
  isLoading: boolean;
  error?: string | null;
  onClearError: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, onSubmit, isLoading, error, onClearError }) => {
  const [formData, setFormData] = useState<AssignTeamMemberPayload>({
    email: '',
    role: '',
    notes: ''
  });
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleUserSelect = (userId: string, userEmail: string) => {
    setFormData({ ...formData, email: userEmail });
    setSelectedUserEmail(userEmail);
  };

  const handleClose = () => {
    setFormData({ email: '', role: '', notes: '' });
    setSelectedUserEmail('');
    onClearError(); // Clear error when closing
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 w-full max-w-md">
        <h3 className="font-urbanist font-[600] text-[20px] mb-4">Add New Team Member</h3>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-urbanist text-red-800 text-sm">{error}</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-urbanist font-[500] text-[14px] text-[#9E9E9E] mb-2">
              Email
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={selectedUserEmail || formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1 bg-[#191919] rounded-lg px-3 py-2 font-urbanist text-white"
                placeholder="Enter email or search for user"
                required
              />
              <button
                type="button"
                onClick={() => setIsUserSearchOpen(true)}
                className="px-3 py-2 bg-blue-600 rounded-lg font-urbanist font-[600] text-white hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          <div>
            <label className="block font-urbanist font-[500] text-[14px] text-[#9E9E9E] mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-[#191919] rounded-lg px-3 py-2 font-urbanist text-white"
              required
            >
              <option value="">Select a role</option>
              <option value="festival head">Festival Head</option>
              <option value="event manager">Event Manager</option>
              <option value="event coordinator">Event Coordinator</option>
              <option value="event volunteer">Event Volunteer</option>
            </select>
          </div>
          <div>
            <label className="block font-urbanist font-[500] text-[14px] text-[#9E9E9E] mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-[#191919] rounded-lg px-3 py-2 font-urbanist text-white"
              placeholder="Add notes about this assignment"
              rows={3}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#191919] rounded-lg px-4 py-2 font-urbanist font-[600] text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 rounded-lg px-4 py-2 font-urbanist font-[600] text-white disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
      
      <UserSearchModal
        isOpen={isUserSearchOpen}
        onClose={() => setIsUserSearchOpen(false)}
        onSelectUser={handleUserSelect}
      />
    </div>
  );
};

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateTeamMemberPayload) => void;
  isLoading: boolean;
  currentData: UpdateTeamMemberPayload;
  error?: string | null;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading, 
  currentData,
  error
}) => {
  const [formData, setFormData] = useState<UpdateTeamMemberPayload>(currentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 w-full max-w-md">
        <h3 className="font-urbanist font-[600] text-[20px] mb-4">Edit Team Member</h3>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-urbanist text-red-800 text-sm">{error}</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-urbanist font-[500] text-[14px] text-[#9E9E9E] mb-2">
              Role
            </label>
            <select
              value={formData.role || ''}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-[#191919] rounded-lg px-3 py-2 font-urbanist text-white"
            >
              <option value="">Select a role</option>
              <option value="festival head">Festival Head</option>
              <option value="event manager">Event Manager</option>
              <option value="event coordinator">Event Coordinator</option>
              <option value="event volunteer">Event Volunteer</option>
            </select>
          </div>
          <div>
            <label className="block font-urbanist font-[500] text-[14px] text-[#9E9E9E] mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-[#191919] rounded-lg px-3 py-2 font-urbanist text-white"
              placeholder="Add notes about this assignment"
              rows={3}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#191919] rounded-lg px-4 py-2 font-urbanist font-[600] text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 rounded-lg px-4 py-2 font-urbanist font-[600] text-white disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TeamManagementPage = () => {
  const params = useParams();
  const festId = params.festId as string;
  
  const { canAssignEventRoles, canManageTeam } = useFestPermissions(festId);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<{ userId: string; data: UpdateTeamMemberPayload } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [addMemberError, setAddMemberError] = useState<string | null>(null);
  const [editMemberError, setEditMemberError] = useState<string | null>(null);
  const [removeMemberError, setRemoveMemberError] = useState<string | null>(null);

  // Fetch team members
  const { data: teamData, isLoading, error } = useFestivalTeam(festId, {
    search: searchTerm,
    role: selectedRole
  });

  // Mutations
  const assignMember = useAssignTeamMember(festId);
  const removeMember = useRemoveTeamMember(festId);
  const updateMember = useUpdateTeamMember(festId);

  const handleAddMember = (data: AssignTeamMemberPayload) => {
    setAddMemberError(null); // Clear previous errors
    assignMember.mutate(data, {
      onSuccess: () => {
        setIsAddModalOpen(false);
        setAddMemberError(null);
      },
      onError: (error: Error) => {
        console.error('Failed to add member:', error);
        setAddMemberError(error.message || 'Failed to add team member. Please try again.');
      }
    });
  };

  const handleEditMember = (data: UpdateTeamMemberPayload) => {
    if (editingMember) {
      setEditMemberError(null); // Clear previous errors
      updateMember.mutate({
        userId: editingMember.userId,
        payload: data
      }, {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditingMember(null);
          setEditMemberError(null);
        },
        onError: (error: Error) => {
          console.error('Failed to update member:', error);
          setEditMemberError(error.message || 'Failed to update team member. Please try again.');
        }
      });
    }
  };

  const handleRemoveMember = (userId: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setRemoveMemberError(null); // Clear previous errors
      removeMember.mutate(userId, {
        onSuccess: () => {
          setRemoveMemberError(null);
        },
        onError: (error: Error) => {
          console.error('Failed to remove member:', error);
          setRemoveMemberError(error.message || 'Failed to remove team member. Please try again.');
        }
      });
    }
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember({
      userId: member.userId._id,
      data: {
        role: member.role,
        notes: member.notes
      }
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="font-urbanist text-white">Loading team members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="font-urbanist text-red-500">Error loading team members. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="font-urbanist font-[600] text-[20px] text-white">Organizing Team</div>
        {canAssignEventRoles && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 rounded-lg font-urbanist font-[600] text-white hover:bg-blue-700 transition-colors"
          >
            Add New Member
          </button>
        )}
      </div>

      {/* Error Messages */}
      {addMemberError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-urbanist text-red-800">{addMemberError}</span>
          </div>
        </div>
      )}
      
      {editMemberError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-urbanist text-red-800">{editMemberError}</span>
          </div>
        </div>
      )}
      
      {removeMemberError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-urbanist text-red-800">{removeMemberError}</span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 flex-col md:flex-row">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-[#191919] rounded-lg px-3 py-2 font-urbanist text-white"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="bg-[#191919] rounded-lg px-3 py-2 font-urbanist text-white"
        >
          <option value="">All Roles</option>
          <option value="festival head">Festival Head</option>
          <option value="event manager">Event Manager</option>
          <option value="event coordinator">Event Coordinator</option>
          <option value="event volunteer">Event Volunteer</option>
        </select>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamData?.data.map((member: TeamMember) => (
          <div key={member._id} className="bg-[#1E1E1E] p-4 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <span className="font-urbanist font-[600] text-[#1E1E1E] text-lg">
                  {member.userId.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex gap-2">
                {canAssignEventRoles && (
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-2 bg-[#191919] rounded-lg hover:bg-[#2A2A2A] transition-colors"
                  >
                    <Image src={edit} alt="Edit" width={16} height={16} />
                  </button>
                )}
                {canAssignEventRoles && (
                  <button
                    onClick={() => handleRemoveMember(member.userId._id)}
                    className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-white font-urbanist text-sm"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-urbanist font-[600] text-[#9E9E9E] text-[14px] capitalize">
                {member.role.replace('_', ' ')}
              </div>
              <div className="font-urbanist font-[600] text-[20px] text-white">
                {member.userId.name}
              </div>
              <div className="font-urbanist font-[500] text-[#9E9E9E] text-[14px]">
                {member.userId.email}
              </div>
              {member.userId.college && (
                <div className="font-urbanist font-[500] text-[#9E9E9E] text-[14px]">
                  {member.userId.college}
                </div>
              )}
              {member.notes && (
                <div className="font-urbanist font-[500] text-[#9E9E9E] text-[12px] mt-2 p-2 bg-[#191919] rounded">
                  {member.notes}
                </div>
              )}
              <div className="font-urbanist font-[500] text-[#9E9E9E] text-[12px]">
                Assigned: {new Date(member.assignedAt).toLocaleDateString()}
              </div>
              {member.expiresAt && (
                <div className="font-urbanist font-[500] text-[#9E9E9E] text-[12px]">
                  Expires: {new Date(member.expiresAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {teamData?.data.length === 0 && (
        <div className="text-center py-12">
          <div className="font-urbanist text-[#9E9E9E] text-lg">
            No team members found
          </div>
          <div className="font-urbanist text-[#9E9E9E] text-sm mt-2">
            {searchTerm || selectedRole ? 'Try adjusting your filters' : 'Add your first team member to get started'}
          </div>
        </div>
      )}

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMember}
        isLoading={assignMember.isPending}
        error={addMemberError}
        onClearError={() => setAddMemberError(null)}
      />

      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingMember(null);
        }}
        onSubmit={handleEditMember}
        isLoading={updateMember.isPending}
        currentData={editingMember?.data || {}}
        error={editMemberError}
      />
    </div>
  );
};

export default TeamManagementPage;
