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

interface Step1BasicDetailsProps {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  handleNext: () => void;
}

const Step1BasicDetails: React.FC<Step1BasicDetailsProps> = ({ form, setForm, handleNext }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };
  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, photos: Array.from(e.target.files!) }));
    }
  };
  return (
    <form className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={e => { e.preventDefault(); handleNext(); }}>
      {/* Upload logo */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Upload logo*</label>
        <label className="bg-white/10 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center h-28 border-2 border-dashed border-pink-400 cursor-pointer text-pink-300 shadow-lg hover:bg-white/20 transition-all duration-300">
          <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
          <span className="text-base font-medium">{form.logo ? form.logo.name : "Click here or drag & drop"}</span>
        </label>
      </div>
      {/* Upload photos */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Upload photos</label>
        <label className="bg-white/10 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center h-28 border-2 border-dashed border-blue-400 cursor-pointer text-blue-300 shadow-lg hover:bg-white/20 transition-all duration-300">
          <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} />
          <span className="text-base font-medium">{form.photos.length > 0 ? `${form.photos.length} file(s) selected` : "Click here or drag & drop"}</span>
        </label>
      </div>
      {/* Fest type */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Fest type*</label>
        <select name="festType" value={form.festType} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all">
          <option value="">Select type</option>
          <option value="Thomso">Thomso</option>
          <option value="Cultural">Cultural</option>
          <option value="Technical">Technical</option>
          <option value="Sports">Sports</option>
        </select>
      </div>
      {/* Fest name */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Fest*</label>
        <input name="festName" value={form.festName} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400" placeholder="Name your fest" />
      </div>
      {/* Fest Visibility */}
      <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
        <label className="text-white font-semibold mb-1">Fest Visibility*</label>
        <div className="flex gap-4">
          <button type="button" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${form.visibility === 'public' ? 'bg-gradient-to-r from-lime-400 to-green-400 text-black border-2 border-lime-400 scale-105' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`} onClick={() => setForm(f => ({ ...f, visibility: 'public' }))}>
            <span className="material-icons">public</span> Open to all
          </button>
          <button type="button" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${form.visibility === 'private' ? 'bg-gradient-to-r from-pink-400 to-pink-600 text-white border-2 border-pink-400 scale-105' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`} onClick={() => setForm(f => ({ ...f, visibility: 'private' }))}>
            <span className="material-icons">visibility_off</span> Private
          </button>
        </div>
      </div>
      {/* State */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">State*</label>
        <select name="state" value={form.state} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-lime-400 transition-all">
          <option value="">State</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="Delhi">Delhi</option>
          <option value="Maharashtra">Maharashtra</option>
        </select>
      </div>
      {/* City */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">City*</label>
        <input name="city" value={form.city} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-lime-400 transition-all placeholder:text-gray-400" placeholder="City" />
      </div>
      {/* Venue */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Venue*</label>
        <select name="venue" value={form.venue} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all">
          <option value="">Venue</option>
          <option value="IIT Roorkee">IIT Roorkee</option>
          <option value="IIT Delhi">IIT Delhi</option>
        </select>
      </div>
      {/* College */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Enter your university/college name*</label>
        <input name="college" value={form.college} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400" placeholder="Name your college" />
      </div>
      {/* Fest dates */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold mb-1">Fest dates*</label>
        <div className="flex gap-2">
          <input type="date" name="startDate" value={form.startDate} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-lime-400 transition-all w-1/2" placeholder="Start Date" />
          <input type="date" name="endDate" value={form.endDate} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all w-1/2" placeholder="End Date" />
        </div>
      </div>
      {/* Page info and Next button */}
      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between mt-4">
        <div className="text-sm text-gray-300 mb-4 md:mb-0">
          <span className="text-yellow-300 font-bold">Page 1 out 4</span><br />
          <span>You can easily manage these details later in manage event section.</span>
        </div>
        <button type="submit" className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold px-12 py-3 rounded-full text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-400">
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1BasicDetails; 