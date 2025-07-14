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
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-2 min-w-[220px] max-w-xs border-2 border-pink-400 shadow-md">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Sponsor image</label>
                <input type="file" name="image" accept="image/*" className="bg-white/10 text-white rounded shadow-sm" onChange={handleSponsorInput} />
              </div>
              <input name="name" value={s.name} readOnly className="bg-white/10 rounded px-2 py-1 text-white mb-1 shadow-sm" placeholder="Sponsor name" />
              <input name="title" value={s.title} readOnly className="bg-white/10 rounded px-2 py-1 text-white mb-1 shadow-sm" placeholder="Sponsor title" />
              <input name="website" value={s.website} readOnly className="bg-white/10 rounded px-2 py-1 text-white shadow-sm" placeholder="Sponsor website" />
            </div>
          ))}
          {/* New sponsor input */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-2 min-w-[220px] max-w-xs border-2 border-pink-400 shadow-md">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Sponsor image</label>
              <input type="file" name="image" accept="image/*" className="bg-white/10 text-white rounded shadow-sm" onChange={handleSponsorInput} />
            </div>
            <input name="name" value={newSponsor.name} onChange={handleSponsorInput} className="bg-white/10 rounded px-2 py-1 text-white mb-1 shadow-sm" placeholder="Sponsor name" />
            <input name="title" value={newSponsor.title} onChange={handleSponsorInput} className="bg-white/10 rounded px-2 py-1 text-white mb-1 shadow-sm" placeholder="Sponsor title" />
            <input name="website" value={newSponsor.website} onChange={handleSponsorInput} className="bg-white/10 rounded px-2 py-1 text-white shadow-sm" placeholder="Sponsor website" />
            <button type="button" onClick={addSponsor} className="mt-2 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl shadow-md hover:bg-pink-600 transition-all">+</button>
          </div>
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
            <option value="Text">Text</option>
            <option value="Date">Date</option>
            <option value="Time">Time</option>
            <option value="Upload">Upload</option>
            <option value="Select One">Select One</option>
            <option value="Multiple Select">Multiple Select</option>
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