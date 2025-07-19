import React from 'react';

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, label, value }) => (
  <div className="bg-gray-800 rounded-lg p-6 flex items-center gap-4">
    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl">
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default SummaryCard; 