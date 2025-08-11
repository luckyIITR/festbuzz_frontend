'use client';
import React, { useState } from 'react';

interface Reward {
  rank: string;
  cash: string;
  coupon: string;
  goodies: string;
}

export default function Page() {
  const [rewards, setRewards] = useState<Reward[]>([
    { rank: '', cash: '', coupon: '', goodies: '' },
  ]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-140">
      <label className="block text-lg font-semibold mb-4 mt-10 mx-2">Rewards</label>
      
      {/* Scrollable wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px] sm:min-w-full">
          <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex py-1 gap-2 bg-[#313131] rounded-2xl min-w-full">
              <div className="w-1/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">Rank</div>
              <div className="w-1/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">Cash</div>
              <div className="w-2/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">Coupon</div>
              <div className="w-2/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">Goodies</div>
            </div>

            {/* Rows */}
            {rewards.map((reward, idx) => (
              <div key={idx} className="flex py-2 gap-2 items-center relative">
                <div className="w-1/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Rank"
                    value={reward.rank}
                    onChange={(e) => handleChange(idx, 'rank', e.target.value)}
                    className="w-full bg-transparent text-[#E6FF4C] font-urbanist font-[700] text-[16px] text-center focus:outline-none placeholder-[#535353]"
                  />
                </div>

                <div className="w-1/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Cash"
                    value={reward.cash}
                    onChange={(e) => handleChange(idx, 'cash', e.target.value)}
                    className="w-full bg-transparent text-white font-urbanist font-[700] text-[16px] text-center focus:outline-none placeholder-[#535353]"
                  />
                </div>

                <div className="w-2/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter worth"
                    value={reward.coupon}
                    onChange={(e) => handleChange(idx, 'coupon', e.target.value)}
                    className="w-full bg-transparent text-white font-urbanist font-[500] text-[16px] focus:outline-none placeholder-[#535353]"
                  />
                </div>

                <div className="w-2/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter worth"
                    value={reward.goodies}
                    onChange={(e) => handleChange(idx, 'goodies', e.target.value)}
                    className="w-full bg-transparent text-white font-urbanist font-[500] text-[16px] focus:outline-none placeholder-[#535353]"
                  />
                </div>

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
