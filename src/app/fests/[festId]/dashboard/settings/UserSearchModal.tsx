'use client';

import React, { useState, useEffect } from 'react';
import { useSearchUsers } from '../../../../../hooks/user';

interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (userId: string, userEmail: string) => void;
}

const UserSearchModal: React.FC<UserSearchModalProps> = ({ isOpen, onClose, onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: searchResults, isLoading, error } = useSearchUsers(searchTerm);

  const handleSelectUser = (userId: string, userEmail: string) => {
    onSelectUser(userId, userEmail);
    onClose();
    setSearchTerm('');
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-urbanist font-[600] text-[20px] text-white">Search Users</h3>
          <button
            onClick={onClose}
            className="text-[#9E9E9E] hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#191919] rounded-lg px-3 py-2 font-urbanist text-white"
            autoFocus
          />

          <div className="max-h-64 overflow-y-auto">
            {isLoading && (
              <div className="text-center py-4">
                <div className="font-urbanist text-[#9E9E9E]">Searching...</div>
              </div>
            )}

            {error && (
              <div className="text-center py-4">
                <div className="font-urbanist text-red-500">Error searching users</div>
              </div>
            )}

            {searchResults?.data && searchResults.data.length > 0 && (
              <div className="space-y-2">
                {searchResults.data.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleSelectUser(user._id, user.email)}
                    className="bg-[#191919] p-3 rounded-lg cursor-pointer hover:bg-[#2A2A2A] transition-colors"
                  >
                    <div className="font-urbanist font-[600] text-white">{user.name}</div>
                    <div className="font-urbanist text-[#9E9E9E] text-sm">{user.email}</div>
                    {user.college && (
                      <div className="font-urbanist text-[#9E9E9E] text-xs">{user.college}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {searchTerm.length >= 2 && searchResults?.data && searchResults.data.length === 0 && !isLoading && (
              <div className="text-center py-4">
                <div className="font-urbanist text-[#9E9E9E]">No users found</div>
              </div>
            )}

            {searchTerm.length < 2 && (
              <div className="text-center py-4">
                <div className="font-urbanist text-[#9E9E9E]">Type at least 2 characters to search</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchModal;
