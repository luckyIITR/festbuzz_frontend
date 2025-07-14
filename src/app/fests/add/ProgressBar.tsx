import React from "react";

interface ProgressBarProps {
  steps: string[];
  step: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, step, className }) => (
  <div className={className || "w-full max-w-3xl mb-8"}>
    <div className="bg-gradient-to-r from-pink-500 via-lime-400 to-blue-500 rounded-2xl h-12 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg mb-8 tracking-wide backdrop-blur-md">
      Register Fest
    </div>
    <div className="relative flex items-center justify-between px-2 sm:px-6 mb-8">
      {/* Progress Line */}
      <div className="absolute left-0 right-0 top-1/2 h-2 bg-gradient-to-r from-pink-500 via-lime-400 to-blue-500 opacity-30 rounded-full z-0 transition-all duration-500" style={{ zIndex: 0 }} />
      <div className="absolute left-0 top-1/2 h-2 bg-gradient-to-r from-pink-500 via-lime-400 to-blue-500 rounded-full z-10 transition-all duration-500" style={{ width: `${(step) / (steps.length - 1) * 100}%`, zIndex: 1 }} />
      {steps.map((label, idx) => (
        <div key={label} className="flex flex-col items-center z-20 w-1/4">
          <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
            idx < step ? "border-lime-400 bg-gradient-to-br from-lime-300 to-green-400" : idx === step ? "border-pink-400 bg-gradient-to-br from-pink-400 to-pink-600" : "border-gray-400 bg-gray-800"
          }`}
          >
            {idx < step ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <span className="text-white text-lg font-bold">{idx + 1}</span>
            )}
          </div>
          <span className={`text-xs mt-1 font-semibold transition-all duration-300 ${idx === step ? "text-pink-400" : idx < step ? "text-lime-400" : "text-gray-400"}`}>{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ProgressBar; 