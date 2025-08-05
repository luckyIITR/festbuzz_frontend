import React from "react";
import StateDropdown from '../../components/StateDropdown' // adjust path accordingly
import { useCallback } from "react";
import { useCollegeList } from '@/hooks/common';
import CollegeDropdown from '../../components/CollegeDropdown'
export type FormType = {
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
  const collegeList = useCollegeList();

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, [setForm]);

  const handleLogo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  }, [setForm]);

  const handlePhotos = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, photos: Array.from(e.target.files!) }));
    }
  }, [setForm]);
  return (
    <form className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={e => { e.preventDefault(); handleNext(); }}>
      {/* Upload logo */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-urbanist font-[700]  mb-1">Upload logo*</label>
        <label className="bg-[#252525]  rounded-2xl flex flex-col items-center justify-center h-16  cursor-pointer text-[#565656]  hover:bg-white/20 transition-all duration-300">
          <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
          <div className="flex content-center flex-wrap gap-2 items-center">
            <svg width="20" height="20" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.72 0.645508H2.28C1.67531 0.645508 1.09538 0.886323 0.667797 1.31498C0.240214 1.74363 0 2.32501 0 2.93122V30.3598C0 30.966 0.240214 31.5474 0.667797 31.976C1.09538 32.4047 1.67531 32.6455 2.28 32.6455H35.72C36.3247 32.6455 36.9046 32.4047 37.3322 31.976C37.7598 31.5474 38 30.966 38 30.3598V2.93122C38 2.32501 37.7598 1.74363 37.3322 1.31498C36.9046 0.886323 36.3247 0.645508 35.72 0.645508ZM2.28 2.16932H35.72C35.9216 2.16932 36.1149 2.24959 36.2574 2.39247C36.3999 2.53536 36.48 2.72915 36.48 2.93122V24.3407L30.2309 18.076C30.0191 17.8629 29.7674 17.6938 29.4902 17.5785C29.2131 17.4631 28.916 17.4037 28.6159 17.4037C28.3158 17.4037 28.0187 17.4631 27.7416 17.5785C27.4644 17.6938 27.2127 17.8629 27.0009 18.076L22.6632 22.4246L13.7674 13.5046C13.5556 13.2915 13.3039 13.1224 13.0267 13.007C12.7496 12.8917 12.4525 12.8323 12.1524 12.8323C11.8523 12.8323 11.5552 12.8917 11.2781 13.007C11.0009 13.1224 10.7492 13.2915 10.5374 13.5046L1.52 22.5503V2.93122C1.52 2.72915 1.60007 2.53536 1.7426 2.39247C1.88513 2.24959 2.07844 2.16932 2.28 2.16932ZM1.52 30.3598V24.7103L11.6223 14.5827C11.6929 14.5118 11.7767 14.4556 11.869 14.4173C11.9612 14.3789 12.0601 14.3592 12.16 14.3592C12.2599 14.3592 12.3588 14.3789 12.451 14.4173C12.5433 14.4556 12.6271 14.5118 12.6977 14.5827L29.1954 31.1217H2.28C2.07844 31.1217 1.88513 31.0414 1.7426 30.8985C1.60007 30.7557 1.52 30.5619 1.52 30.3598ZM35.72 31.1217H31.35L23.75 23.5027L28.0877 19.1541C28.1583 19.0832 28.2421 19.027 28.3344 18.9887C28.4266 18.9504 28.5255 18.9306 28.6254 18.9306C28.7253 18.9306 28.8242 18.9504 28.9164 18.9887C29.0087 19.027 29.0925 19.0832 29.1631 19.1541L36.48 26.495V30.3598C36.48 30.5619 36.3999 30.7557 36.2574 30.8985C36.1149 31.0414 35.9216 31.1217 35.72 31.1217ZM22.8 11.3122C22.8 11.0108 22.8891 10.7162 23.0562 10.4656C23.2232 10.215 23.4606 10.0197 23.7383 9.90436C24.0161 9.78902 24.3217 9.75885 24.6165 9.81764C24.9114 9.87644 25.1822 10.0216 25.3948 10.2347C25.6074 10.4478 25.7521 10.7193 25.8108 11.0149C25.8694 11.3105 25.8393 11.6169 25.7243 11.8953C25.6093 12.1738 25.4144 12.4117 25.1645 12.5792C24.9145 12.7466 24.6206 12.836 24.32 12.836C23.9169 12.836 23.5303 12.6754 23.2452 12.3897C22.9601 12.1039 22.8 11.7163 22.8 11.3122Z" fill="#565656" />
            </svg>

            <span className="font-urbanist font-[600] ">{form.logo ? form.logo.name : "Click here or drag & drop"}</span>
          </div>
        </label>
      </div>
      {/* Upload photos */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-urbanist font-[700]  mb-1">Upload photos</label>
        <label className="bg-[#252525] rounded-2xl flex flex-col items-center justify-center h-16  cursor-pointer text-[#565656] hover:bg-white/20 transition-all duration-300">
          <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} />

          <div className="flex content-center flex-wrap gap-2 items-center">
            <svg width="20" height="20" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.72 0.645508H2.28C1.67531 0.645508 1.09538 0.886323 0.667797 1.31498C0.240214 1.74363 0 2.32501 0 2.93122V30.3598C0 30.966 0.240214 31.5474 0.667797 31.976C1.09538 32.4047 1.67531 32.6455 2.28 32.6455H35.72C36.3247 32.6455 36.9046 32.4047 37.3322 31.976C37.7598 31.5474 38 30.966 38 30.3598V2.93122C38 2.32501 37.7598 1.74363 37.3322 1.31498C36.9046 0.886323 36.3247 0.645508 35.72 0.645508ZM2.28 2.16932H35.72C35.9216 2.16932 36.1149 2.24959 36.2574 2.39247C36.3999 2.53536 36.48 2.72915 36.48 2.93122V24.3407L30.2309 18.076C30.0191 17.8629 29.7674 17.6938 29.4902 17.5785C29.2131 17.4631 28.916 17.4037 28.6159 17.4037C28.3158 17.4037 28.0187 17.4631 27.7416 17.5785C27.4644 17.6938 27.2127 17.8629 27.0009 18.076L22.6632 22.4246L13.7674 13.5046C13.5556 13.2915 13.3039 13.1224 13.0267 13.007C12.7496 12.8917 12.4525 12.8323 12.1524 12.8323C11.8523 12.8323 11.5552 12.8917 11.2781 13.007C11.0009 13.1224 10.7492 13.2915 10.5374 13.5046L1.52 22.5503V2.93122C1.52 2.72915 1.60007 2.53536 1.7426 2.39247C1.88513 2.24959 2.07844 2.16932 2.28 2.16932ZM1.52 30.3598V24.7103L11.6223 14.5827C11.6929 14.5118 11.7767 14.4556 11.869 14.4173C11.9612 14.3789 12.0601 14.3592 12.16 14.3592C12.2599 14.3592 12.3588 14.3789 12.451 14.4173C12.5433 14.4556 12.6271 14.5118 12.6977 14.5827L29.1954 31.1217H2.28C2.07844 31.1217 1.88513 31.0414 1.7426 30.8985C1.60007 30.7557 1.52 30.5619 1.52 30.3598ZM35.72 31.1217H31.35L23.75 23.5027L28.0877 19.1541C28.1583 19.0832 28.2421 19.027 28.3344 18.9887C28.4266 18.9504 28.5255 18.9306 28.6254 18.9306C28.7253 18.9306 28.8242 18.9504 28.9164 18.9887C29.0087 19.027 29.0925 19.0832 29.1631 19.1541L36.48 26.495V30.3598C36.48 30.5619 36.3999 30.7557 36.2574 30.8985C36.1149 31.0414 35.9216 31.1217 35.72 31.1217ZM22.8 11.3122C22.8 11.0108 22.8891 10.7162 23.0562 10.4656C23.2232 10.215 23.4606 10.0197 23.7383 9.90436C24.0161 9.78902 24.3217 9.75885 24.6165 9.81764C24.9114 9.87644 25.1822 10.0216 25.3948 10.2347C25.6074 10.4478 25.7521 10.7193 25.8108 11.0149C25.8694 11.3105 25.8393 11.6169 25.7243 11.8953C25.6093 12.1738 25.4144 12.4117 25.1645 12.5792C24.9145 12.7466 24.6206 12.836 24.32 12.836C23.9169 12.836 23.5303 12.6754 23.2452 12.3897C22.9601 12.1039 22.8 11.7163 22.8 11.3122Z" fill="#565656" />
            </svg>
            <span className="font-urbanist font-[600]">{form.photos.length > 0 ? `${form.photos.length} file(s) selected` : "Click here or drag & drop"}</span>
          </div>
        </label>
      </div>
      {/* Fest type */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-urbanist font-[700]  mb-1">Fest type*</label>
        <select name="festType" value={form.festType} onChange={handleInput} className="bg-[#252525] backdrop-blur-md rounded-xl px-4 py-3 text-[#565656] font-[600] font-urbanist focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all">
          <option className="bg-[#252525] text-white font-urbanist font-[600]" value="">Select type</option>
          <option className="bg-[#252525] text-white font-urbanist font-[600]" value="Thomso">Thomso</option>
          <option className="bg-[#252525] text-white font-urbanist font-[600] " value="Cultural">Cultural</option>
          <option className="bg-[#252525] text-white font-urbanist font-[600]" value="Technical">Technical</option>
          <option className="bg-[#252525] text-white font-urbanist font-[600]" value="Sports">Sports</option>
        </select>
      </div>
      {/* Fest name */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-urbanist font-[700]  mb-1">Fest*</label>
        <input name="festName" value={form.festName} onChange={handleInput} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-[#565656] font-urbanist font-[600]" placeholder="Name your fest" />
      </div>
      {/* Fest Visibility */}
      <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
        <label className="text-white font-urbanist font-[700]  mb-1">Fest Visibility*</label>
        <div className="flex gap-4">
          <button type="button" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 bg-[#252525] ${form.visibility === 'public' ? 'text-[white]' : 'text-[#565656]'} `} onClick={() => setForm(f => ({ ...f, visibility: 'public' }))}>
            <div className="flex justify-center content-center flex-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0768 23.6663C10.4629 23.6663 8.94627 23.3599 7.52682 22.747C6.10738 22.1341 4.87266 21.3031 3.82266 20.2538C2.77266 19.2046 1.9416 17.9699 1.32949 16.5497C0.71738 15.1295 0.410936 13.6128 0.410158 11.9997C0.40938 10.3866 0.715824 8.8699 1.32949 7.44967C1.94316 6.02945 2.77421 4.79473 3.82266 3.74551C4.8711 2.69629 6.10582 1.86523 7.52682 1.25234C8.94782 0.639452 10.4645 0.333008 12.0768 0.333008C13.6892 0.333008 15.2058 0.639452 16.6268 1.25234C18.0478 1.86523 19.2825 2.69629 20.331 3.74551C21.3794 4.79473 22.2109 6.02945 22.8253 7.44967C23.4398 8.8699 23.7458 10.3866 23.7435 11.9997C23.7412 13.6128 23.4347 15.1295 22.8242 16.5497C22.2136 17.9699 21.3825 19.2046 20.331 20.2538C19.2794 21.3031 18.0447 22.1345 16.6268 22.7482C15.2089 23.3618 13.6923 23.6679 12.0768 23.6663ZM10.9102 21.2747V18.9997C10.2685 18.9997 9.71938 18.7714 9.26283 18.3148C8.80627 17.8583 8.5776 17.3088 8.57682 16.6663V15.4997L2.97682 9.89967C2.91849 10.2497 2.86521 10.5997 2.81699 10.9497C2.76877 11.2997 2.74427 11.6497 2.74349 11.9997C2.74349 14.3525 3.5166 16.4136 5.06282 18.183C6.60905 19.9524 8.55816 20.983 10.9102 21.2747ZM18.9602 18.2997C19.349 17.8719 19.699 17.4103 20.0102 16.9148C20.3213 16.4194 20.5787 15.9041 20.7825 15.369C20.9863 14.8339 21.1418 14.2844 21.2492 13.7205C21.3565 13.1566 21.4102 12.583 21.4102 11.9997C21.4102 10.0941 20.8801 8.35384 19.82 6.77884C18.7599 5.20384 17.3455 4.06634 15.5768 3.36634V3.83301C15.5768 4.47467 15.3485 5.02417 14.892 5.48151C14.4354 5.93884 13.8859 6.16712 13.2435 6.16634H10.9102V8.49967C10.9102 8.83023 10.7982 9.10751 10.5742 9.33151C10.3502 9.55551 10.0733 9.66712 9.74349 9.66634H7.41016V11.9997H14.4102C14.7407 11.9997 15.018 12.1117 15.242 12.3357C15.466 12.5597 15.5776 12.8366 15.5768 13.1663V16.6663H16.7435C17.249 16.6663 17.706 16.8172 18.1143 17.119C18.5227 17.4208 18.8046 17.8143 18.9602 18.2997Z" fill="#565656" />
              </svg>
            </div>
            <div className="font-urbanist font-[600]">Open to all</div>
          </button>
          <button type="button" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 bg-[#252525]  ${form.visibility === 'public' ? 'text-[#565656]' : 'text-[white]'} `} onClick={() => setForm(f => ({ ...f, visibility: 'private' }))}>
            <div className="flex justify-center content-center flex-wrap">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.2648 21.6496L17.3148 18.6996C16.5148 19.2329 15.6525 19.6413 14.7278 19.9246C13.8032 20.2079 12.8238 20.3496 11.7898 20.3496C10.4065 20.3496 9.10651 20.0869 7.88984 19.5616C6.67318 19.0363 5.61484 18.3239 4.71484 17.4246C3.81484 16.5253 3.10251 15.4669 2.57784 14.2496C2.05318 13.0323 1.79051 11.7323 1.78984 10.3496C1.78984 9.31628 1.93151 8.33728 2.21484 7.41261C2.49818 6.48794 2.90651 5.62528 3.43984 4.82461L0.464844 1.84961L1.88984 0.424609L21.6898 20.2246L20.2648 21.6496ZM10.7898 18.2996V16.3496C10.2398 16.3496 9.76918 16.1539 9.37784 15.7626C8.98651 15.3713 8.79051 14.9003 8.78984 14.3496V13.3496L3.98984 8.54961C3.93984 8.84961 3.89418 9.14961 3.85284 9.44961C3.81151 9.74961 3.79051 10.0496 3.78984 10.3496C3.78984 12.3663 4.45251 14.1329 5.77784 15.6496C7.10318 17.1663 8.77384 18.0496 10.7898 18.2996ZM20.1398 15.8246L18.6898 14.3746C19.0398 13.7579 19.3108 13.1123 19.5028 12.4376C19.6948 11.7629 19.7905 11.0669 19.7898 10.3496C19.7898 8.71628 19.3358 7.22461 18.4278 5.87461C17.5198 4.52461 16.3072 3.54961 14.7898 2.94961V3.34961C14.7898 3.89961 14.5942 4.37061 14.2028 4.76261C13.8115 5.15461 13.3405 5.35028 12.7898 5.34961H10.7898V6.47461L6.31484 1.99961C7.11484 1.48294 7.97318 1.07894 8.88984 0.787609C9.80651 0.496276 10.7732 0.350276 11.7898 0.349609C13.1732 0.349609 14.4732 0.612276 15.6898 1.13761C16.9065 1.66294 17.9648 2.37528 18.8648 3.27461C19.7648 4.17394 20.4775 5.23228 21.0028 6.44961C21.5282 7.66694 21.7905 8.96694 21.7898 10.3496C21.7898 11.3663 21.6442 12.3329 21.3528 13.2496C21.0615 14.1663 20.6572 15.0246 20.1398 15.8246Z" fill="#565656" />
              </svg>
            </div>
            <div className="font-urbanist font-[600]">Private</div>
          </button>
        </div>
      </div>
      {/* State */}
      <div className="flex flex-col gap-2">
        <label className="  font-urbanist font-[700]  mb-1">State*</label>
        <StateDropdown
          value={form.state}
          onChange={(val) => setForm(prev => ({ ...prev, state: val }))}
        />
      </div>

      {/* City */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-urbanist font-[700]   mb-1">City*</label>
        <input name="city" value={form.city} onChange={handleInput} className="bg-[#252525] font-urbanist font-[600] backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-lime-400 transition-all placeholder:text-[#565656]" placeholder="City" />
      </div>
      {/* Venue */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-urbanist font-[700]  mb-1">Venue*</label>
        <select name="venue" value={form.venue} onChange={handleInput} className="bg-[#252525] font-urbanist font-[700]  backdrop-blur-md rounded-xl px-4 py-3 text-[#565656] focus:outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all">
          <option className="bg-[#252525] text-white font-urbanist font-[600]" value="">Venue</option>
          <option className="bg-[#252525] text-white font-urbanist font-[600]" value="IIT Roorkee">IIT Roorkee</option>
          <option className="bg-[#252525] text-white font-urbanist font-[600]" value="IIT Delhi">IIT Delhi</option>
        </select>
      </div>
      {/* College */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-urbanist font-[700] mb-1">Enter your university/college name*</label>
        <CollegeDropdown
          value={form.college}
          onChange={(val) => setForm(prev => ({ ...prev, college: val }))}
         colleges={collegeList}
        />

      </div>
      {/* Fest dates */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-urbanist font-[700]  mb-1">Fest dates*</label>
        <div className="flex gap-2">
          <input type="date" name="startDate" value={form.startDate} onChange={handleInput} className="bg-[#252525] font-urbanist font-[600] backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-lime-400 transition-all w-1/2 placeholder:text-[#565656]" placeholder="Start Date" />
          <input type="date" name="endDate" value={form.endDate} onChange={handleInput} className="bg-[#252525] font-urbanist font-[600] backdrop-blur-md rounded-xl px-4 py-3 text-white focus:outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all w-1/2 placeholder:text-[#565656]" placeholder="End Date" />
        </div>
      </div>
      {/* Page info and Next button */}
      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between mt-4">
        <div className="text-sm text-gray-300 mb-4 md:mb-0">
          <span className="text-yellow-300 font-bold">Page 1 out 4</span><br />
          <span className="font-urbanist font-[500] text-[16px] text-[#818181]">You can easily manage these details later in manage event section.</span>
        </div>
        <button type="submit" className="bg-[#0248F7] text-[#E1FF01] font-bold px-12 py-3 rounded-full text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-pink-400 cursor-pointer">
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1BasicDetails; 