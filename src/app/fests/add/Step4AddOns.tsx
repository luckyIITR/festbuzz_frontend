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
  sponsors: { image: File | null; name: string; title: string; website: string }[];
  questions: { question: string; type: string }[];
  aftermovie: string;
};

interface Step4AddOnsProps {
  form: FormType;
  newSponsor: SponsorType;
  addSponsor: () => void;
  newQuestion: QuestionType;
  addQuestion: () => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSponsorInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleQuestionInput: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBack: () => void;
}

const Step4AddOns: React.FC<Step4AddOnsProps> = ({
  form,
  newSponsor,
  addSponsor,
  newQuestion,
  addQuestion,
  handleInput,
  handleSponsorInput,
  handleQuestionInput,
  handleSubmit,
  handleBack,
}) => {
  return (
    <form className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
      {/* Add sponsors */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-white font-semibold mb-1">Add sponsors</label>
        <div className="flex flex-wrap gap-6">
          {form.sponsors.map((s, idx) => (
            <div
              key={idx}
              className="w-[320px] h-[180px] bg-white/10 backdrop-blur-md rounded-[15px] p-2 flex gap-2 border-2 border-pink-400 shadow-md"
            >
              {/* Left: Sponsor Image Upload */}
              <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-white/10 overflow-hidden">
                <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-white/10 overflow-hidden relative">
                  <label className="cursor-pointer text-white text-xs text-center px-2 py-1">
                    Sponsor image
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleSponsorInput}
                    />
                  </label>
                </div>

              </div>

              {/* Right: Sponsor Details */}
              <div className="flex-1 h-full flex flex-col justify-between gap-1">
                <input
                  name="name"
                  value={s.name}
                  readOnly
                  className="h-[40px] bg-white/10 rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                  placeholder="Sponsor name"
                />
                <input
                  name="title"
                  value={s.title}
                  readOnly
                  className="h-[40px] bg-white/10 rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                  placeholder="Sponsor title"
                />
                <input
                  name="website"
                  value={s.website}
                  readOnly
                  className="h-[40px] bg-white/10 rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                  placeholder="Sponsor website"
                />
              </div>
            </div>

          ))}
          {/* New sponsor input */}
          <div className="w-[320px] h-[180px] bg-white/10 backdrop-blur-md rounded-[15px] p-2 flex gap-2 border-2 border-pink-400 shadow-md">
            {/* Left: Image Upload */}
            <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-white/10 overflow-hidden">
              <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-white/10 overflow-hidden relative">
                <label className="cursor-pointer text-white text-xs text-center px-2 py-1">
                  Sponsor image
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
                className="h-[40px] bg-white/10 rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                placeholder="Sponsor name"
              />
              <input
                name="title"
                value={newSponsor.title}
                onChange={handleSponsorInput}
                className="h-[40px] bg-white/10 rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                placeholder="Sponsor title"
              />
              <div className="flex gap-1">
                <input
                  name="website"
                  value={newSponsor.website}
                  onChange={handleSponsorInput}
                  className="h-[40px] flex-1 bg-white/10 rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                  placeholder="Sponsor website"
                />

              </div>
            </div>

          </div>
          <button
            type="button"
            onClick={addSponsor}
            className="w-[40px] h-[40px] rounded-full bg-pink-500 flex items-center justify-center text-white text-xl shadow-md hover:bg-pink-600 transition-all"
          >
            +
          </button>
        </div>
      </div>
      {/* Enter question here */}
      <div className="flex flex-col gap-2 md:col-span-1">
        <label className="text-white font-semibold mb-1">Enter question here</label>
        <input name="question" value={newQuestion.question} onChange={handleQuestionInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400" placeholder="Write here" />
      </div>
      {/* Input type dropdown */}
      <div className="flex flex-col gap-2 md:col-span-1">
        <label className="text-white font-semibold mb-1">Input type</label>
        <div className="relative">
          <select name="type" value={newQuestion.type} onChange={handleQuestionInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none w-full shadow-md focus:ring-2 focus:ring-blue-400 transition-all">
            <option className="bg-[#1A1A1A]" value="Text">Text</option>
            <option className="bg-[#1A1A1A]" value="Date">Date</option>
            <option className="bg-[#1A1A1A]" value="Time">Time</option>
            <option className="bg-[#1A1A1A]" value="Upload">Upload</option>
            <option className="bg-[#1A1A1A]" value="Select One">Select One</option>
            <option className="bg-[#1A1A1A]" value="Multiple Select">Multiple Select</option>
          </select>
          <button type="button" onClick={addQuestion} className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl shadow-md hover:bg-pink-600 transition-all">+</button>
        </div>
      </div>
      {/* Youtube aftermovie link */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-white font-semibold mb-1">Youtube aftermovie link</label>
        <input name="aftermovie" value={form.aftermovie} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400" placeholder="URL" />
      </div>
      {/* Page info and Submit button */}
      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between mt-4">
        <div className="text-sm text-gray-300 mb-4 md:mb-0">
          <span className="text-yellow-300 font-bold">Page 4 out 4</span><br />
          <span>You can easily manage these details later in manage event section.</span>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button type="button" onClick={handleBack} className="bg-gray-700 text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-600 transition-all">
            Back
          </button>
          <button type="submit" className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold px-12 py-3 rounded-full text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-400">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step4AddOns; 