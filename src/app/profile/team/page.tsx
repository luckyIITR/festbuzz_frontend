"use client";

import React from "react";
import { useState } from "react";
type Member = {
  EventName: string;
  Role: string;
  TeamName: string;
  Passcode: string;
  Member: string;
  Actions: string;
};

type TeamInput = { input1: string };

const initialTeamData = {
  title: 'Manage Team',
  members: [
    {
      EventName: 'Dancing on the Floor',
      Role: 'Leader',
      TeamName: 'Byte Warriors',
      Passcode: '#2369240',
      Member: '2/4',
      Actions: 'Manage'
    },
    {
      EventName: 'Code Combat',
      Role: 'Member',
      TeamName: 'Stack Hackers',
      Passcode: '#998877',
      Member: '3/5',
      Actions: 'Manage'
    }
  ] as Member[]
};

const Pages = () => {
  const [teamData, setTeamData] = useState(initialTeamData);
  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = [...teamData.members];
    updatedMembers[index][field] = value;
    setTeamData({ ...teamData, members: updatedMembers });
  };

  const toggleEditAll = () => {
    setIsEditing((prev) => !prev);
  };


  const [team, setTeam] = useState<TeamInput[]>([{ input1: '' }]);

  const handleEdit = (index: number, value: string) => {
    const updatedTeam = [...team];
    updatedTeam[index] = { ...updatedTeam[index], input1: value };
    setTeam(updatedTeam);
  };
  const handleadd = () => {
    setTeam([...team, { input1: '' }])
  }
  const handleDelete = (index: number) => {
    setTeam(prevTeam => prevTeam.filter((_, i) => i !== index));
  };

  return (
    <div className='min-h-screen bg-[#181818] py-10 px-6'>
      <div className='w-full p-8'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-[#E1FF01] text-2xl font-semibold'>{teamData.title}</h2>
          <button
            onClick={toggleEditAll}
            className='bg-[#E1FF01] text-black px-5 py-2 rounded-md font-urbanist font-medium hover:brightness-90 transition-all'
          >
            {isEditing ? 'Save All' : 'Edit All'}
          </button>
        </div>

        <div className='flex flex-col pb-5'>
          <div className='flex justify-between content-center flex-wrap px-6 py-3 rounded-t-2xl bg-[#313131] text-[16px] font-[600] font-urbanist text-[#E1FF01]'>
            <span className='w-48'>Event Name</span>
            <span className='w-24'>Role</span>
            <span className='w-48'>Team Name</span>
            <span className='w-32'>Passcode</span>
            <span className='w-16'>Members</span>
            <span className='w-24'>Actions</span>
          </div>
        </div>

        <div className='flex flex-col space-y-4'>
          {teamData.members.map((item, index) => (
            <div
              key={index}
              className='flex justify-between items-center flex-wrap gap-4 px-6 py-4 bg-[#313131] text-[16px] font-semibold font-urbanist text-[#FFFFF] rounded-lg'
            >
              {/** Inputs with readOnly toggle */}
              {(['EventName', 'Role', 'TeamName', 'Passcode', 'Member', 'Actions'] as (keyof Member)[]).map((field) => (
                <input
                  key={field}
                  className={`${field === 'EventName' || field === 'TeamName' ? 'w-48' :
                    field === 'Passcode' ? 'w-32' :
                      field === 'Member' ? 'w-16' :
                        'w-24'
                    } bg-transparent ${isEditing ? 'border-b' : ''} border-gray-500 focus:outline-none`}
                  readOnly={!isEditing}
                  value={item[field]}
                  onChange={(e) => handleChange(index, field, e.target.value)}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex md:flex-row flex-col gap-8 mt-10">
          <div className="flex flex-col gap-2">
            <div className=" font-urbanist font-[700] text-[16px]">Your Team Name</div>
            <input className="px-6 py-4 bg-[#2C2C2C] font-urbanist text-[16px] rounded-xl font-semibold font-urbanist text-[#FFFFF] placeholder:text-[#CFCFCF]" placeholder="Team Name" readOnly={!isEditing} />
          </div>
          <div className="flex flex-col gap-2">
            <div className=" font-urbanist font-[700] text-[16px]">Your Team Name</div>
            <input className="px-6 py-4 bg-[#2C2C2C] font-urbanist text-[16px] rounded-xl font-semibold font-urbanist text-[#FFFFF] placeholder:text-[#CFCFCF]" placeholder="Dancing on the Floor" readOnly={!isEditing} />
          </div>
        </div>
        <div className="font-urbanist font-[700] text-[16px] mt-10">Current team member</div>
 <div className="flex flex-col gap-2 mt-5">
        {team.map((member, index) => (
         <div className="flex gap-2  ">
            <input
              key={index}
              className="px-6 py-4 bg-[#2C2C2C] w-80 font-urbanist text-[16px] rounded-xl font-semibold text-[#FFFFF] placeholder:text-[#CFCFCF]"
              placeholder="Name"
              readOnly={!isEditing}
              value={member.input1}
              onChange={(e) => handleEdit(index, e.target.value)}
            />

            <button className=" text-[#FFFFFF]" onClick={() => handleDelete(index)}>❌</button>
       </div>
        ))}
   </div>
        <button className="w-40 h-10 bg-[#252525] text-[#565656] mt-5 rounded-xl font-urbanist text-[16px] font-[600]"
          onClick={handleadd}> Add member +</button>
      </div>
    </div>
  );
};

export default Pages;
