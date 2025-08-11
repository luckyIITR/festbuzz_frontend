'use client';

import { useState } from 'react';

type Parameter = {
  name: string;
  weight: number;
};

type Round = {
  name: string;
  count: number;
};

export default function Page() {
  const [parameters, setParameters] = useState<Parameter[]>([
    { name: 'Coordination', weight: 30 },
    { name: 'Timing', weight: 20 },
    { name: 'Dress', weight: 20 },
    { name: 'Theme', weight: 30 },
  ]);

  const [rounds, setRounds] = useState<Round[]>([
    { name: 'Round 1: Top 8', count: 8 },
    { name: 'Semifinal', count: 6 },
    { name: 'Finale', count: 4 },
  ]);

  const handleParameterChange = (
    index: number,
    field: keyof Parameter,
    value: string
  ) => {
    const updated = [...parameters];
    if (field === 'weight') {
      updated[index].weight = Number(value);
    } else {
      updated[index].name = value;
    }
    setParameters(updated);
  };

  const handleRoundChange = (
    index: number,
    field: keyof Round,
    value: string
  ) => {
    const updated = [...rounds];
    if (field === 'count') {
      updated[index].count = Number(value);
    } else {
      updated[index].name = value;
    }
    setRounds(updated);
  };

  const handleAddParameter = () => {
    setParameters([...parameters, { name: '', weight: 0 }]);
  };

  const handleAddRound = () => {
    setRounds([...rounds, { name: '', count: 0 }]);
  };

  const totalWeight = parameters.reduce((sum, param) => sum + param.weight, 0);

  return (
    <div className="min-h-screen p-4 md:p-10 font-urbanist space-y-10">
      {/* Parameters */}
      <div>
        <h2 className="text-xl font-bold mb-4">Assign parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {parameters.map((param, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-2">
              <input
                className="bg-[#252525] text-[#E1FF01] px-4 py-2 rounded w-full"
                placeholder="Parameter"
                value={param.name}
                onChange={(e) =>
                  handleParameterChange(i, 'name', e.target.value)
                }
              />
              <input
                type="number"
                className="bg-[#252525] text-[#E1FF01] px-4 py-2 rounded md:w-24 w-full"
                placeholder="Weight"
                value={param.weight}
                onChange={(e) =>
                  handleParameterChange(i, 'weight', e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <button
          className="bg-[#252525] px-4 py-2 rounded text-[#E1FF01] hover:bg-[#E1FF01] hover:text-[#252525] transition w-full md:w-fit"
          onClick={handleAddParameter}
        >
          Add more +
        </button>
        <p
          className={`mt-2 text-sm ${
            totalWeight !== 100 ? 'text-red-400' : 'text-green-400'
          }`}
        >
          Total weightage: {totalWeight}%{' '}
          {totalWeight !== 100 && '(should be 100%)'}
        </p>
      </div>

      {/* Rounds */}
      <div>
        <h2 className="text-xl font-bold mb-4">Add rounds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {rounds.map((round, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-2">
              <input
                className="bg-[#252525] text-[#E1FF01] px-4 py-2 rounded w-full"
                placeholder="Round name"
                value={round.name}
                onChange={(e) => handleRoundChange(i, 'name', e.target.value)}
              />
              <input
                type="number"
                className="bg-[#252525] text-[#E1FF01] px-4 py-2 rounded md:w-20 w-full"
                placeholder="Count"
                value={round.count}
                onChange={(e) => handleRoundChange(i, 'count', e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          className="bg-[#252525] px-4 py-2 rounded text-[#E1FF01] hover:bg-[#E1FF01] hover:text-[#252525] transition w-full md:w-fit"
          onClick={handleAddRound}
        >
          Add more +
        </button>
      </div>
    </div>
  );
}
