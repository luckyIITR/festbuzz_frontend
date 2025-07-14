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

interface Step3TicketsProps {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  handleNext: () => void;
  handleBack: () => void;
}

const Step3Tickets: React.FC<Step3TicketsProps> = ({ form, setForm, handleNext, handleBack }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={e => { e.preventDefault(); handleNext(); }}>
      {/* Ticket name */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-white font-semibold mb-1">Ticket name*</label>
        <input name="ticketName" value={form.ticketName} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400" placeholder="Early bird/RSVP/VIP" />
      </div>
      {/* Fee Type */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-white font-semibold mb-1">Fee Type*</label>
        <div className="flex gap-4">
          <button type="button" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${form.feeType === 'paid' ? 'bg-gradient-to-r from-pink-400 to-blue-500 text-white border-2 border-pink-400 scale-105' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`} onClick={() => setForm(f => ({ ...f, feeType: 'paid' }))}>
            <span className="material-icons">public</span> Paid
          </button>
          <button type="button" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${form.feeType === 'free' ? 'bg-gradient-to-r from-pink-400 to-blue-500 text-white border-2 border-pink-400 scale-105' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`} onClick={() => setForm(f => ({ ...f, feeType: 'free', ticketPrice: '' }))}>
            <span className="material-icons">visibility_off</span> Free
          </button>
        </div>
      </div>
      {/* Ticket Pricing */}
      {form.feeType === 'paid' && (
        <div className="flex flex-col gap-2 md:col-span-2 md:max-w-xs">
          <label className="text-white font-semibold mb-1">Ticket Pricing*</label>
          <div className="flex items-center gap-2">
            <span className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-l-xl text-gray-400 shadow-md">INR</span>
            <input name="ticketPrice" type="number" min="0" value={form.ticketPrice} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-r-xl px-4 py-3 text-white focus:outline-none w-full shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400" placeholder="" />
          </div>
        </div>
      )}
      {/* Tickets available from */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Tickets available from*</label>
        <div className="flex gap-2">
          <input type="date" name="ticketStartDate" value={form.ticketStartDate} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none w-1/2 shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400" placeholder="Start Date" />
          <input type="time" name="ticketStartTime" value={form.ticketStartTime} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none w-1/2 shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400" placeholder="End Clock" />
        </div>
      </div>
      {/* Tickets available till */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Tickets available till*</label>
        <div className="flex gap-2">
          <input type="date" name="ticketEndDate" value={form.ticketEndDate} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none w-1/2 shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400" placeholder="Start Date" />
          <input type="time" name="ticketEndTime" value={form.ticketEndTime} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none w-1/2 shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400" placeholder="End Time" />
        </div>
      </div>
      {/* Page info and Next button */}
      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between mt-4">
        <div className="text-sm text-gray-300 mb-4 md:mb-0">
          <span className="text-yellow-300 font-bold">Page 3 out 4</span><br />
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

export default Step3Tickets; 