'use client'
import React, { useState } from 'react';
import { User, Edit2 } from 'lucide-react';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    phone: string;
}

const OrganizingTeam: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
        {
            id: '1',
            name: 'Nitin Sahu',
            role: 'Organizer',
            phone: '91+ 1234567890'
        },
        {
            id: '2',
            name: 'Nitin Sahu',
            role: 'Organizer',
            phone: '91+ 1234567890'
        },
        {
            id: '3',
            name: 'Nitin Sahu',
            role: 'Organizer',
            phone: '91+ 1234567890'
        },
        {
            id: '4',
            name: 'Nitin Sahu',
            role: 'Organizer',
            phone: '91+ 1234567890'
        }
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingMember, setEditingMember] = useState<string | null>(null);
    const [newMember, setNewMember] = useState({
        name: '',
        role: '',
        phone: ''
    });

    const handleAddMember = () => {
        if (showAddForm && newMember.name && newMember.role && newMember.phone) {
            const member: TeamMember = {
                id: Date.now().toString(),
                ...newMember
            };
            setTeamMembers([...teamMembers, member]);
            setNewMember({ name: '', role: '', phone: '' });
            setShowAddForm(false);
        } else {
            setShowAddForm(true);
        }
    };

    const handleEditTeam = () => {
        setIsEditMode(!isEditMode);
        setEditingMember(null);
        setShowAddForm(false);
    };

    const handleEditMember = (member: TeamMember) => {
        setEditingMember(member.id);
        setNewMember({
            name: member.name,
            role: member.role,
            phone: member.phone
        });
    };

    const handleSaveEdit = () => {
        if (editingMember && newMember.name && newMember.role && newMember.phone) {
            setTeamMembers(teamMembers.map(member => 
                member.id === editingMember 
                    ? { ...member, ...newMember }
                    : member
            ));
            setEditingMember(null);
            setNewMember({ name: '', role: '', phone: '' });
        }
    };

    const handleDeleteMember = (id: string) => {
        setTeamMembers(teamMembers.filter(member => member.id !== id));
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold">Organizing team</h1>
                    <button
                        onClick={handleEditTeam}
                        className="p-4 bg-[#191919] rounded-full transition-colors"
                        aria-label="Edit team"
                    >
                        <Edit2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {teamMembers.map((member) => (
                        <div key={member.id}>
                            {editingMember === member.id ? (
                                // Edit Form
                                <div className="bg-[#1E1E1E] rounded-xl p-4">
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={newMember.name}
                                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                            className="w-full bg-[#191919] text-white px-3 py-2 rounded border-none outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Role"
                                            value={newMember.role}
                                            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                            className="w-full bg-[#191919] text-white px-3 py-2 rounded border-none outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Phone"
                                            value={newMember.phone}
                                            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                                            className="w-full bg-[#191919] text-white px-3 py-2 rounded border-none outline-none text-sm"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSaveEdit}
                                                className="px-3 py-1 text-white bg-[#191919] rounded hover:opacity-90 transition-opacity text-sm"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingMember(null);
                                                    setNewMember({ name: '', role: '', phone: '' });
                                                }}
                                                className="px-3 py-1 text-[#9E9E9E] bg-transparent border border-[#9E9E9E] rounded hover:opacity-90 transition-opacity text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Member Card
                                <div
                                    className="rounded-xl p-4 hover:opacity-90 transition-opacity cursor-pointer relative"
                                    style={{ backgroundColor: '#1E1E1E' }}
                                >
                                    {/* Delete button in edit mode */}
                                    {isEditMode && (
                                        <button
                                            onClick={() => handleDeleteMember(member.id)}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-700 transition-colors"
                                        >
                                            ×
                                        </button>
                                    )}

                                    {/* Avatar */}
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                                        <User className="w-6 h-6" style={{ color: '#9E9E9E' }} />
                                    </div>

                                    {/* Member Info */}
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium" style={{ color: '#9E9E9E' }}>{member.role}</p>
                                        <h3 className="font-semibold text-lg text-white">{member.name}</h3>
                                        <p className="text-sm" style={{ color: '#9E9E9E' }}>{member.phone}</p>
                                    </div>

                                    {/* Edit button in edit mode */}
                                    {isEditMode && (
                                        <button
                                            onClick={() => handleEditMember(member)}
                                            className="mt-2 px-3 py-1 text-white bg-[#191919] rounded hover:opacity-90 transition-opacity text-sm"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add New Member Form/Button - Only show if not in edit mode */}
                {!isEditMode && (showAddForm ? (
                    <div className="bg-[#1E1E1E] rounded-xl p-4 mb-4 max-w-md">
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newMember.name}
                                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                className="w-full bg-[#191919] text-white px-3 py-2 rounded border-none outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={newMember.role}
                                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                className="w-full bg-[#191919] text-white px-3 py-2 rounded border-none outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={newMember.phone}
                                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                                className="w-full bg-[#191919] text-white px-3 py-2 rounded border-none outline-none"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddMember}
                                    className="px-4 py-2 text-white bg-[#191919] rounded hover:opacity-90 transition-opacity"
                                >
                                    Add Member
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setNewMember({ name: '', role: '', phone: '' });
                                    }}
                                    className="px-4 py-2 text-[#9E9E9E] bg-transparent border border-[#9E9E9E] rounded hover:opacity-90 transition-opacity"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleAddMember}
                        className="flex items-center gap-2 hover:text-white transition-colors font-medium"
                        style={{ color: '#9E9E9E' }}
                    >
                        <div className="px-4 py-2 text-white bg-[#1E1E1E] rounded-xl">
                            Add new member +
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrganizingTeam;