import React from "react";

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

interface Step2AboutFestProps {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  handleNext: () => void;
  handleBack: () => void;
  handleTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Step2AboutFest: React.FC<Step2AboutFestProps> = ({ form, setForm, handleNext, handleBack, handleTextArea }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={e => { e.preventDefault(); handleNext(); }}>
      {/* Fest Mode */}
      <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
        <label className="text-white font-semibold mb-1">Fest Mode*</label>
        <div className="flex gap-4">
          <button type="button" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${form.festMode === 'online' ? 'bg-gradient-to-r from-pink-400 to-blue-500 text-white border-2 border-pink-400 scale-105' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`} onClick={() => setForm(f => ({ ...f, festMode: 'online' }))}>
            <span className="material-icons">public</span> Online
          </button>
          <button type="button" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${form.festMode === 'offline' ? 'bg-gradient-to-r from-pink-400 to-blue-500 text-white border-2 border-pink-400 scale-105' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`} onClick={() => setForm(f => ({ ...f, festMode: 'offline' }))}>
            <span className="material-icons">visibility_off</span> Offline
          </button>
        </div>
      </div>
      {/* Rulebook link */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Rulebook link*</label>
        <input name="rulebook" value={form.rulebook || ''} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400" placeholder="URL" />
      </div>
      {/* Instagram link */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Instagram link</label>
        <input name="instagram" value={form.instagram || ''} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400" placeholder="URL" />
      </div>
      {/* About Fest */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-white font-semibold mb-1">About Fest*</label>
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md">
          {/* Formatting toolbar UI (no functionality yet) */}
          <div className="flex gap-2 px-4 py-2 border-b border-pink-400">
            <button type="button" className="text-white font-bold">B</button>
            <button type="button" className="text-gray-300 italic">I</button>
            <button type="button" className="text-pink-400 font-bold">U</button>
            <button type="button" className="text-white">•</button>
            <button type="button" className="text-white">1.</button>
            <button type="button" className="text-white">&lt;/&gt;</button>
          </div>
          <textarea name="about" value={form.about || ''} onChange={handleTextArea} className="w-full bg-transparent px-4 py-3 text-white min-h-[120px] focus:outline-none resize-none placeholder:text-gray-400" placeholder="Describe about your event make sure add all details including eligibility and others" />
        </div>
      </div>
      {/* Website link */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Website link</label>
        <input name="website" value={form.website || ''} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400" placeholder="URL" />
      </div>
      {/* Contact number */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Contact number</label>
        <input name="contact" value={form.contact || ''} onChange={handleInput} className={`bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400 ${form.contact ? 'text-yellow-300 font-bold' : 'text-white'}`} placeholder="Contact number" />
      </div>
      {/* E-mail */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-white font-semibold mb-1">E-mail</label>
        <input name="email" value={form.email || ''} onChange={handleInput} className={`bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 focus:outline-none w-full shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400 ${form.email ? 'text-yellow-300 font-bold' : 'text-white'}`} placeholder="E-mail" />
      </div>
      {/* Page info and Next button */}
      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between mt-4">
        <div className="text-sm text-gray-300 mb-4 md:mb-0">
          <span className="text-yellow-300 font-bold">Page 2 out 4</span><br />
          <span>You can easily manage these details later in manage event section.</span>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button type="button" onClick={handleBack} className="bg-gray-700 text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-600 transition-all">
            Back
          </button>
          <button type="submit" className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold px-12 py-3 rounded-full text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-400">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step2AboutFest; 