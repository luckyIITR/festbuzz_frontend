'use client';
import React from 'react';

type SponsorType = {
  image: File | null;
  name: string;
  title: string;
  website: string;
};

type QuestionType = {
  question: string;
  type: string;
};

type FormType = {
  aftermovie: string;
  sponsors: SponsorType[];
  questions: QuestionType[];
};

interface Step4AddOnsProps {
  form: FormType;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: ((e: React.FormEvent<HTMLFormElement>) => void) | (() => void);
  handleBack: () => void;
  isPending?: boolean;
  
  // For array-based approach (AddFestPage)
  addSponsor?: () => void;
  handleSponsorChange?: (index: number, field: keyof SponsorType, value: string | File) => void;
  deleteSponsor?: (index: number) => void;
  addQuestion?: () => void;
  handleQuestionChange?: (index: number, field: 'question' | 'type', value: string) => void;
  deleteQuestion?: (index: number) => void;
  
  // For individual add approach (EditFestAddOns)
  newSponsor?: SponsorType;
  handleSponsorInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newQuestion?: QuestionType;
  handleQuestionInput?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Step4AddOns: React.FC<Step4AddOnsProps> = ({
  form,
  handleInput,
  handleSubmit,
  handleBack,
  isPending = false,
  
  // Array-based props
  addSponsor,
  handleSponsorChange,
  deleteSponsor,
  addQuestion,
  handleQuestionChange,
  deleteQuestion,
  
  // Individual add props
  newSponsor,
  handleSponsorInput,
  newQuestion,
  handleQuestionInput,
}) => {
  
  const isArrayBased = !!handleSponsorChange; // Determine which approach to use
  
  const handleSponsorFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    if (e.target.files && e.target.files[0]) {
      if (isArrayBased && handleSponsorChange && index !== undefined) {
        handleSponsorChange(index, 'image', e.target.files[0]);
      } else if (handleSponsorInput) {
        handleSponsorInput(e);
      }
    }
  };

  return (
    <div className="w-full space-y-8">
      <h2 className="text-2xl font-bold text-white text-center mb-8">Add-ons</h2>
      
      {/* Aftermovie Section */}
      <div className="space-y-3">
        <label className="block text-white font-bold text-sm font-urbanist">
          Aftermovie Link
        </label>
        <input
          type="url"
          name="aftermovie"
          value={form.aftermovie}
          onChange={handleInput}
          className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
          placeholder="Enter YouTube or drive link"
        />
      </div>

      {/* Sponsors Section */}
      <div className="space-y-4">
        <label className="block text-white font-bold text-sm font-urbanist">
          Add Sponsors
        </label>
        
        {/* Display existing sponsors with new UI style */}
        <div className="flex flex-wrap gap-4">
          {form.sponsors && form.sponsors.length > 0 && form.sponsors.map((s, idx) => (
            <div
              key={idx}
              className="w-[320px] h-[180px] bg-[#252525] backdrop-blur-md rounded-[15px] p-2 flex gap-2 border-2 border-pink-400 shadow-md"
            >
              {/* Left: Sponsor Image Upload */}
              <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-[#252525] overflow-hidden">
                <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-[#1A1A1A] overflow-hidden relative">
                  <label className="cursor-pointer text-white text-xs text-center px-2 py-1">
                    Sponsor image
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleSponsorFileChange(e, idx)}
                    />
                  </label>
                </div>
              </div>
              
              {/* Right: Sponsor Details */}
              <div className="flex-1 h-full flex flex-col justify-between gap-1">
                <input
                  name="name"
                  value={s.name}
                  onChange={(e) => {
                    if (isArrayBased && handleSponsorChange) {
                      handleSponsorChange(idx, 'name', e.target.value);
                    }
                  }}
                  className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs shadow-sm font-urbanist font-[600] placeholder:text-[#828282]"
                  placeholder="Sponsor name"
                />
                <input
                  name="title"
                  value={s.title}
                  onChange={(e) => {
                    if (isArrayBased && handleSponsorChange) {
                      handleSponsorChange(idx, 'title', e.target.value);
                    }
                  }}
                  className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs shadow-sm font-urbanist font-[600] placeholder:text-[#828282]"
                  placeholder="Sponsor title"
                />
                <div className="flex gap-1">
                  <input
                    name="website"
                    value={s.website}
                    onChange={(e) => {
                      if (isArrayBased && handleSponsorChange) {
                        handleSponsorChange(idx, 'website', e.target.value);
                      }
                    }}
                    className="h-[40px] flex-1 bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs shadow-sm font-urbanist font-[600] placeholder:text-[#828282]"
                    placeholder="Sponsor website"
                  />
                  {isArrayBased && deleteSponsor && (
                    <button
                      type="button"
                      onClick={() => deleteSponsor(idx)}
                      className="h-[40px] w-[40px] bg-red-500/20 hover:bg-red-500/30 rounded-[10px] flex items-center justify-center text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* New sponsor input with same UI style */}
          {!isArrayBased && newSponsor && handleSponsorInput && (
            <div className="w-[320px] h-[180px] bg-[#252525] backdrop-blur-md rounded-[15px] p-2 flex gap-2 shadow-md">
              {/* Left: Image Upload */}
              <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-[#1A1A1A] overflow-hidden">
                <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-[#1A1A1A] overflow-hidden relative">
                  <label className="cursor-pointer text-[#828282] text-xs text-center px-2 py-1 font-urbanist font-[600]">
                    Sponsor image
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="absolute bg-[#1A1A1A] inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleSponsorInput}
                    />
                  </label>
                </div>
              </div>
              
              {/* Right: Sponsor Input Fields */}
              <div className="flex-1 h-full flex flex-col justify-between gap-1">
                <input
                  name="name"
                  value={newSponsor.name}
                  onChange={handleSponsorInput}
                  className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs font-urbanist font-[600] shadow-sm placeholder:text-[#828282]"
                  placeholder="Sponsor name"
                />
                <input
                  name="title"
                  value={newSponsor.title}
                  onChange={handleSponsorInput}
                  className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs font-urbanist font-[600] shadow-sm placeholder:text-[#828282]"
                  placeholder="Sponsor title"
                />
                <div className="flex gap-1">
                  <input
                    name="website"
                    value={newSponsor.website}
                    onChange={handleSponsorInput}
                    className="h-[40px] flex-1 bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs font-urbanist font-[600] shadow-sm placeholder:text-[#828282]"
                    placeholder="Sponsor website"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <button
          type="button"
          onClick={addSponsor}
          className="w-full py-3 bg-[#252525] border border-white/20 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
        >
          Add Sponsor
        </button>
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <label className="block text-white font-bold text-sm font-urbanist">
          Registration Questions
        </label>
        
        {/* Display existing questions */}
        {form.questions && form.questions.length > 0 && (
          <div className="space-y-4">
            {form.questions.map((question, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Question {index + 1}</h4>
                  {isArrayBased && deleteQuestion && (
                    <button
                      type="button"
                      onClick={() => deleteQuestion(index)}
                      className="text-red-400 hover:text-red-300 text-sm transition-colors duration-200"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Enter question"
                      value={question.question}
                      onChange={(e) => {
                        if (isArrayBased && handleQuestionChange) {
                          handleQuestionChange(index, 'question', e.target.value);
                        }
                      }}
                      className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <select
                    value={question.type}
                    onChange={(e) => {
                      if (isArrayBased && handleQuestionChange) {
                        handleQuestionChange(index, 'type', e.target.value);
                      }
                    }}
                    className="px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Text" className="bg-[#252525]">Text</option>
                    <option value="Number" className="bg-[#252525]">Number</option>
                    <option value="Email" className="bg-[#252525]">Email</option>
                    <option value="Phone" className="bg-[#252525]">Phone</option>
                    <option value="Date" className="bg-[#252525]">Date</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Add new question section for individual approach */}
        {!isArrayBased && newQuestion && handleQuestionInput && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h4 className="text-white font-medium">Add New Question</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="question"
                  placeholder="Enter question"
                  value={newQuestion.question}
                  onChange={handleQuestionInput}
                  className="w-full px-4 py-3 bg-[#252525]border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <select
                name="type"
                value={newQuestion.type}
                onChange={handleQuestionInput}
                className="px-4 py-3 bg-[#252525]border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
              >
                <option value="Text" className="bg-[#252525]">Text</option>
                <option value="Number" className="bg-[#252525]">Number</option>
                <option value="Email" className="bg-[#252525]">Email</option>
                <option value="Phone" className="bg-[#252525]">Phone</option>
                <option value="Date" className="bg-[#252525]">Date</option>
              </select>
            </div>
          </div>
        )}
        
        <button
          type="button"
          onClick={addQuestion}
          className="w-full py-3  bg-[#252525] border border-white/20 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
        >
          Add Question
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-8">
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 py-3 px-6 bg-[#252525] border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
        >
          Back
        </button>
        
        {handleSubmit ? (
          <button
            type="button"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              // Check if handleSubmit expects an event parameter
              if (handleSubmit.length > 0) {
                // Create a synthetic form event
                const syntheticEvent = {
                  ...e,
                  currentTarget: e.currentTarget.form || e.currentTarget,
                  target: e.currentTarget.form || e.currentTarget,
                  preventDefault: () => e.preventDefault(),
                  stopPropagation: () => e.stopPropagation(),
                } as React.FormEvent<HTMLFormElement>;
                (handleSubmit as (e: React.FormEvent<HTMLFormElement>) => void)(syntheticEvent);
              } else {
                // Call without event parameter
                (handleSubmit as () => void)();
              }
            }}
            className="flex-1 py-3 px-6 bg-pink-500 border border-white/20 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Creating Festival...' : 'Submit'}
          </button>
        ) : (
          <button
            type="button"
            className="flex-1 py-3 px-6  bg-[#252525] border border-white/20 text-white font-semibold rounded-xl  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Step4AddOns;