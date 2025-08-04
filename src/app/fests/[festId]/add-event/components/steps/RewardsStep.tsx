'use client';
import React from 'react';

interface RewardsStepProps {
  rewards: Array<{ rank: string; cash: string; coupon: string; goodies: string }>;
  setRewards: React.Dispatch<React.SetStateAction<Array<{ rank: string; cash: string; coupon: string; goodies: string }>>>;
}

export default function RewardsStep({ rewards, setRewards }: RewardsStepProps) {
  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <label className="block text-lg font-semibold mb-4 text-pink-500">Rewards</label>
      <div className="rounded-2xl overflow-x-auto">
        <div className="w-full">
          {/* Header */}
          <div className="w-full flex flex-col gap-2">
            {/* Header */}
            <div className="flex py-1 gap-2 bg-[#313131] rounded-2xl">
              <div className="w-1/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">
                Rank
              </div>
              <div className="w-1/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">
                Cash
              </div>
              <div className="w-2/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">
                Coupon
              </div>
              <div className="w-2/6 px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">
                Goodies
              </div>
            </div>

            {/* Rows */}
            {rewards.map((reward, idx) => (
              <div key={idx} className="flex py-2 gap-2">
                {/* Rank */}
                <div className="w-1/6 bg-[#181818] font-urbanist text-[16px] rounded-lg px-6 py-2 text-center font-[700] text-[#E6FF4C]">
                  {reward.rank}
                </div>

                {/* Cash */}
                <div className="w-1/6 bg-[#181818] font-urbanist text-[16px] font-[700] rounded-lg px-6 py-2 text-center text-white">
                  {reward.cash}
                </div>

                {/* Coupon Input */}
                <div className="w-2/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    className="w-full bg-transparent font-urbanist text-[16px] font-[500] focus:outline-none text-white placeholder-[#535353]"
                    placeholder="Enter worth"
                    value={reward.coupon}
                    onChange={(e) =>
                      setRewards((rewards) =>
                        rewards.map((r, i) =>
                          i === idx ? { ...r, coupon: e.target.value } : r
                        )
                      )
                    }
                  />
                </div>

                {/* Goodies Input */}
                <div className="w-2/6 bg-[#181818] rounded-lg px-4 py-2">
                  <input
                    type="text"
                    className="w-full bg-transparent focus:outline-none font-urbanist text-[16px] font-[500] text-white placeholder-[#535353]"
                    placeholder="Enter worth"
                    value={reward.goodies}
                    onChange={(e) =>
                      setRewards((rewards) =>
                        rewards.map((r, i) =>
                          i === idx ? { ...r, goodies: e.target.value } : r
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center py-4">
          <button
            type="button"
            className="bg-[#252525] text-[#565656] rounded-lg px-8 py-2 font-[600] font-urbanist text-[16px] mt-2"
            onClick={() => setRewards([...rewards, { rank: `Add position +`, cash: '', coupon: '', goodies: '' }])}
          >
            Add position +
          </button>
        </div>
      </div>
    </div>
  );
} 