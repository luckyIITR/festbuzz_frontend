import React from "react";

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
  logo: File | null;
  photos: File[];
  festType: string;
  festName: string;
  visibility: string;
  state: string;
  city: string;
  venue: string;
  college: string;
  startDate: string;
  endDate: string;
  festMode: string;
  rulebook: string;
  instagram: string;
  website: string;
  about: string;
  contact: string;
  email: string;
  ticketName: string;
  feeType: string;
  ticketPrice: string;
  ticketStartDate: string;
  ticketStartTime: string;
  ticketEndDate: string;
  ticketEndTime: string;
  sponsors: SponsorType[];
  questions: QuestionType[];
  aftermovie: string;
};

interface Step4AddOnsProps {
  form: FormType;
  handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBack: () => void;
  // Sponsor-related props
  addSponsor: () => void;
  handleSponsorChange: (index: number, field: keyof SponsorType, value: string | File) => void;
  deleteSponsor: (index: number) => void;
  // Question-related props
  addQuestion: () => void;
  handleQuestionChange: (index: number, field: keyof QuestionType, value: string) => void;
  deleteQuestion: (index: number) => void;
}

const Step4AddOns: React.FC<Step4AddOnsProps> = ({
  form,
  handleInput,
  handleSubmit,
  handleBack,
  addSponsor,
  handleSponsorChange,
  deleteSponsor,
  addQuestion,
  handleQuestionChange,
  deleteQuestion,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Add sponsors */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-white font-urbanist font-[700] mb-1">Add sponsors</label>
        <div className="flex flex-wrap gap-6">
          {form.sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="w-[320px] h-[180px] bg-[#252525] backdrop-blur-md rounded-[15px] p-2 flex gap-2 border-2 border-pink-400 shadow-md relative"
            >
              {/* Delete button */}
              <button
                type="button"
                onClick={() => deleteSponsor(idx)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm hover:bg-red-600 transition-all z-10"
              >
                ×
              </button>

              {/* Left: Sponsor Image Upload */}
              <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-[#1A1A1A] overflow-hidden relative">
                <label className="cursor-pointer text-[#828282] text-xs text-center px-2 py-1 font-urbanist font-[600] w-full h-full flex items-center justify-center">
                  {sponsor.image ? (
                    <img 
                      src={URL.createObjectURL(sponsor.image)} 
                      alt="Sponsor" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Sponsor image"
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleSponsorChange(idx, 'image', file);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Right: Sponsor Details */}
              <div className="flex-1 h-full flex flex-col justify-between gap-1">
                <input
                  value={sponsor.name}
                  onChange={(e) => handleSponsorChange(idx, 'name', e.target.value)}
                  className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs font-urbanist font-[600] shadow-sm placeholder:text-[#828282]"
                  placeholder="Sponsor name"
                />
                <input
                  value={sponsor.title}
                  onChange={(e) => handleSponsorChange(idx, 'title', e.target.value)}
                  className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs font-urbanist font-[600] shadow-sm placeholder:text-[#828282]"
                  placeholder="Sponsor title"
                />
                <input
                  value={sponsor.website}
                  onChange={(e) => handleSponsorChange(idx, 'website', e.target.value)}
                  className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs font-urbanist font-[600] shadow-sm placeholder:text-[#828282]"
                  placeholder="Sponsor website"
                />
              </div>
            </div>
          ))}
          
          {/* Add New Sponsor Button */}
          <button
            type="button"
            onClick={addSponsor}
            className="w-[320px] h-[180px] bg-[#1A1A1A] backdrop-blur-md rounded-[15px] border-2 border-dashed border-gray-500 flex flex-col items-center justify-center text-[#828282] hover:border-pink-400 hover:text-pink-400 transition-all shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl mb-2">
              +
            </div>
            <span className="font-urbanist font-[600] text-sm">Add Sponsor</span>
          </button>
        </div>
      </div>

      {/* Questions Section */}
      <div className="flex flex-col gap-4 md:col-span-2">
        <label className="text-white font-urbanist font-[700] mb-1">Questions</label>
        
        {/* Display existing questions */}
        {form.questions.map((question, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                value={question.question}
                onChange={(e) => handleQuestionChange(idx, 'question', e.target.value)}
                className="w-full bg-[#252525] font-urbanist font-[600] backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-[#565656]"
                placeholder="Enter question"
              />
            </div>
            <div className="w-48">
              <select
                value={question.type}
                onChange={(e) => handleQuestionChange(idx, 'type', e.target.value)}
                className="w-full bg-[#252525] font-urbanist font-[600] backdrop-blur-md rounded-xl px-4 py-3 text-[#565656] focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option className="bg-[#1A1A1A] font-urbanist font-[600]" value="Text">Text</option>
                <option className="bg-[#1A1A1A] font-urbanist font-[600]" value="Date">Date</option>
                <option className="bg-[#1A1A1A] font-urbanist font-[600]" value="Time">Time</option>
                <option className="bg-[#1A1A1A] font-urbanist font-[600]" value="Upload">Upload</option>
                <option className="bg-[#1A1A1A] font-urbanist font-[600]" value="Select One">Select One</option>
                <option className="bg-[#1A1A1A] font-urbanist font-[600]" value="Multiple Select">Multiple Select</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => deleteQuestion(idx)}
              className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all shadow-md"
            >
              ×
            </button>
          </div>
        ))}
        
        {/* Add new question button */}
        <button
          type="button"
          onClick={addQuestion}
          className="w-full h-12 bg-[#1A1A1A] backdrop-blur-md rounded-xl border-2 border-dashed border-gray-500 flex items-center justify-center text-[#828282] hover:border-pink-400 hover:text-pink-400 transition-all shadow-md"
        >
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xl mr-2">
            +
          </div>
          <span className="font-urbanist font-[600]">Add Question</span>
        </button>
      </div>

      {/* Youtube aftermovie link */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-white font-urbanist font-[700] mb-1">Youtube aftermovie link</label>
        <input 
          name="aftermovie" 
          value={form.aftermovie} 
          onChange={handleInput} 
          className="bg-[#252525] font-urbanist font-[600] backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-[#565656]" 
          placeholder="URL" 
        />
      </div>

      {/* Page info and Submit button */}
      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between mt-4">
        <div className="text-sm text-gray-300 mb-4 md:mb-0">
          <span className="text-yellow-300 font-bold">Page 4 out 4</span><br />
          <span className="font-urbanist font-[500] text-[16px] text-[#818181]">You can easily manage these details later in manage event section.</span>
        </div>
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={handleBack} 
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold px-8 py-3 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
          >
            Back
          </button>
          <button 
            type="button" 
            onClick={(e) => handleSubmit(e as any)}
            className="bg-[#0248F7] text-[#E1FF01] font-bold px-12 py-3 rounded-full text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-pink-400 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4AddOns;