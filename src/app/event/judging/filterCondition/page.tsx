'use client';
import { useState } from "react";

type Member = {
  round: string;
  participation: string;
  college: string;
  totalscore: string;
  judge1: string;
  judge2: string;
  judge3: string;
};

const Page = () => {
  const initialTeamData = {
    title: 'Manage Team',
    members: [
      {
        round: '1',
        participation: 'Neha Gupta',
        college: 'IIT Delhi',
        totalscore: '95',
        judge1: '30',
        judge2: '32',
        judge3: '33',
      },
      {
        round: '2',
        participation: 'Rohan Mehta',
        college: 'IIT Bombay',
        totalscore: '90',
        judge1: '28',
        judge2: '30',
        judge3: '32',
      }
    ] as Member[]
  };

  const [teamData, setTeamData] = useState(initialTeamData);

  const handleChange = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = [...teamData.members];
    updatedMembers[index][field] = value;
    setTeamData({ ...teamData, members: updatedMembers });
  };

  return (
    <div className="min-h-screen p-4 bg-black text-white">
      <h2 className="text-xl font-bold mb-4">{teamData.title}</h2>

      {/* Scrollable container for mobile */}
      <div className="overflow-x-auto">
        {/* Header */}
        <div className="flex min-w-[1000px] justify-between flex-nowrap px-6 py-3 rounded-t-2xl bg-[#1E1E1E] text-[16px] font-[600] font-urbanist text-[#E1FF01]">
          <span className='w-16'>Round</span>
          <span className='w-40'>Participation</span>
          <span className='w-40'>College</span>
          <span className='w-28'>Total Score</span>
          <span className='w-24'>Judge 1</span>
          <span className='w-24'>Judge 2</span>
          <span className='w-24'>Judge 3</span>
          <span className='w-28'>Action</span>
        </div>

        {/* Rows */}
        <div className="flex flex-col space-y-4 mt-2 min-w-[1000px]">
          {teamData.members.map((item, index) => (
            <div
              key={index}
              className='flex justify-between items-center flex-wrap md:flex-nowrap gap-2 px-6 py-4 bg-[#161616] text-sm font-semibold font-urbanist rounded-lg'
            >
              {(Object.keys(item) as (keyof Member)[]).map((field) => (
                <input
                  key={field}
                  className={`
                    ${
                      field === 'round' ? 'w-16' :
                      field === 'participation' ? 'w-40' :
                      field === 'college' ? 'w-40' :
                      field === 'totalscore' ? 'w-28' :
                      ['judge1', 'judge2', 'judge3'].includes(field) ? 'w-24' :
                      ''
                    } bg-transparent px-2 py-1 rounded border border-gray-600 focus:outline-none
                  `}
                  value={item[field]}
                  onChange={(e) => handleChange(index, field, e.target.value)}
                />
              ))}

              {/* Action buttons (e.g., Delete) */}
              <div className="w-28 flex justify-start">
                <button
                  className="px-3 py-1 bg-red-600 text-white text-xs rounded"
                  onClick={() => {
                    const updated = teamData.members.filter((_, i) => i !== index);
                    setTeamData({ ...teamData, members: updated });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
