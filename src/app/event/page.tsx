'use client';
import SummaryCard from './SummaryCard';
import React, { useState } from "react";

type Member = {
    Participantname: string;
    Email: string;
    Gender: string;
    Othercontent: string;
};

const Page = () => {
    const initialTeamData = {
        title: 'Manage Team',
        members: [
            {
                Participantname: 'neha gupta',
                Email: '@nehagupta@gmail.com',
                Gender: 'Female',
                Othercontent: '',
            },
            {
                Participantname: 'neha gupta',
                Email: '@nehagupta@gmail.com',
                Gender: 'Female',
                Othercontent: '',
            }
        ] as Member[]
    };

    const summaryStats = [
        {
            label: 'Total registrations',
            value: '0',
            icon: '🎪'
        },
        {
            label: 'Total revenue',
            value: '0',
            icon: '💰'
        },
        {
            label: 'Pages Views',
            value: '0',
            icon: '🔥'
        },
    ];

    const [teamData, setTeamData] = useState(initialTeamData);

    const handleChange = (index: number, field: keyof Member, value: string) => {
        const updatedMembers = [...teamData.members];
        updatedMembers[index][field] = value;
        setTeamData({ ...teamData, members: updatedMembers });
    };

    return (
        <div className='md:w-full px-2'>
            <div className="flex items-center justify-center w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 w-full">
                    {summaryStats.map((stat, index) => (
                        <SummaryCard key={index} icon={stat.icon} label={stat.label} value={stat.value} />
                    ))}
                </div>
            </div>

            {/* Scrollable table container */}
            <div className='overflow-x-auto'>
                <div className='flex flex-col pb-5 min-w-[800px]'>
                    <div className='flex justify-between content-center flex-wrap px-6 py-3 rounded-t-2xl bg-[#1E1E1E] text-[16px] font-[600] font-urbanist text-[#E1FF01]'>
                        <span className='w-48'>Participant name</span>
                        <span className='w-48'>Email</span>
                        <span className='w-32'>Gender</span>
                        <span className='w-48'>Other content</span>
                    </div>

                    <div className='flex flex-col space-y-4'>
                        {teamData.members.map((item, index) => (
                            <div
                                key={index}
                                className='flex justify-between items-center flex-wrap gap-4 px-6 py-4 bg-[#161616] text-[16px] font-semibold font-urbanist text-[#FFFFFF] rounded-lg'
                            >
                                {(['Participantname', 'Email', 'Gender', 'Othercontent'] as (keyof Member)[]).map((field) => (
                                    <input
                                        key={field}
                                        className={`${field === 'Participantname' || field === 'Email' ? 'w-48' : field === 'Gender' ? 'w-32' : 'w-48'} bg-transparent border-b border-gray-500 text-white focus:outline-none`}
                                        value={item[field]}
                                        onChange={(e) => handleChange(index, field, e.target.value)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
