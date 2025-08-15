'use client';
import React from 'react';

interface Reward {
  rank: string;
  cash: string;
  coupon: string;
  goodies: string;
}

interface RewardsStepProps {
  rewards: Reward[];
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>;
}

export default function RewardsStep({ rewards, setRewards }: RewardsStepProps) {
  const handleChange = (index: number, key: keyof Reward, value: string) => {
    setRewards((prev) =>
      prev.map((reward, i) => (i === index ? { ...reward, [key]: value } : reward))
    );
  };

  const addPosition = () => {
    setRewards((prev) => [
      ...prev,
      { rank: '', cash: '', coupon: '', goodies: '' },
    ]);
  };

  const removePosition = (index: number) => {
    setRewards((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className=" flex flex-col gap-6 min-h-140">
      <label className="block text-lg font-semibold mb-4 text-pink-500">Rewards</label>

      {/* Table Scroll Wrapper */}
      <div className="rounded-2xl overflow-x-auto w-[85vw] md:w-full">
        {/* This inner wrapper ensures scroll only happens if needed */}
        <div className="min-w-[600px]  "> 
          <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex py-1 gap-2 bg-[#313131] rounded-2xl">
              <div className="w-1/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[16px]">Rank</div>
              <div className="w-1/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[16px]">Cash</div>
              <div className="w-2/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[16px]">Coupon</div>
              <div className="w-2/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[16px]">Goodies</div>
            </div>

            {/* Rows */}
            {rewards.map((reward, idx) => (
              <div key={idx} className="flex py-2 gap-2 items-center relative">
                {/* Rank */}
                <div className="w-1/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Rank"
                    value={reward.rank}
                    onChange={(e) => handleChange(idx, 'rank', e.target.value)}
                    className="w-full bg-transparent text-[#E6FF4C] font-urbanist font-[700] text-[14px] text-center focus:outline-none placeholder-[#535353]"
                  />
                </div>

                {/* Cash */}
                <div className="w-1/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Cash"
                    value={reward.cash}
                    onChange={(e) => handleChange(idx, 'cash', e.target.value)}
                    className="w-full bg-transparent text-white font-urbanist font-[700] text-[14px] text-center focus:outline-none placeholder-[#535353]"
                  />
                </div>

                {/* Coupon */}
                <div className="w-2/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter worth"
                    value={reward.coupon}
                    onChange={(e) => handleChange(idx, 'coupon', e.target.value)}
                    className="w-full bg-transparent text-white font-urbanist font-[500] text-[14px] focus:outline-none placeholder-[#535353]"
                  />
                </div>

                {/* Goodies */}
                <div className="w-2/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter worth"
                    value={reward.goodies}
                    onChange={(e) => handleChange(idx, 'goodies', e.target.value)}
                    className="w-full bg-transparent text-white font-urbanist font-[500] text-[14px] focus:outline-none placeholder-[#535353]"
                  />
                </div>

                {/* Remove Button */}
                {rewards.length > 1 && (
                  <button
                    onClick={() => removePosition(idx)}
                    className="text-red-500 text-xl font-bold hover:text-red-600 bg-[#252525] px-4 py-2 rounded-full"
                    title="Remove row"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex items-center py-4">
        <button
          type="button"
          className="bg-[#252525] text-[#E6FF4C] rounded-lg px-8 py-2 font-[600] font-urbanist text-[16px] mt-2 hover:bg-[#2f2f2f] transition-colors"
          onClick={addPosition}
        >
          Add Position +
        </button>
      </div>
    </div>
  );
}