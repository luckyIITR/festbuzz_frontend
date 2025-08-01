'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
const steps = [
  { label: 'Basics' },
  { label: 'Venue' },
  { label: 'Details' },
  { label: 'Images' },
  { label: 'Rewards' },
];

const addOns = [
  { label: 'Info' },
  { label: 'Judges' },
  { label: 'Parameters' },
  { label: 'Roles' },
];

const initialRewards = [
  { rank: '1st', cash: '₹2000', coupon: '', goodies: '' },
  { rank: '2nd', cash: '₹1000', coupon: '', goodies: '' },
  { rank: '3rd', cash: '₹500', coupon: '', goodies: '' },
];

export default function CreateEventPage() {

  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push('/event/pricing');// scrolls to <div id="Pricing"></div>
      // or: router.push('#Pricing') if using useRouter
    }
  };
  const [currentStep, setCurrentStep] = React.useState(0); // 0-based index
  const [visibility, setVisibility] = React.useState('open');
  const [eventMode, setEventMode] = React.useState('online');
  const [rewards, setRewards] = React.useState(initialRewards);

  // Step content renderers
  function renderStepContent() {
    switch (currentStep) {
      case 0:
        return (

          <form className=" w-6/12 flex flex-col gap-6">
            <div>
              <label className="block font-urbanist font-[600]  text-[20px] mb-2">Event name</label>
              <input type="text" placeholder="Name your event" className="w-full bg-[#252525] rounded-lg px-4 py-3 font-urbanist font-[600] text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
            </div>
            <div>
              <label className="block font-urbanist  font-[600]  text-[20px] mb-2">Event type</label>
              <div className="relative">
                <select
                  className="appearance-none w-full bg-[#252525] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 text-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]"
                >
                  <option className="text-white" value="">Select event type</option>
                  <option className="text-white" value="workshop">Workshop</option>
                  <option className="text-white" value="competition">Competition</option>
                  <option className="text-white" value="seminar">Seminar</option>
                  <option className="text-white" value="other">Other</option>
                </select>
                <div className="pointer-events-none text-[8px] absolute inset-y-0 right-4 flex items-center text-white">
                  ▼
                </div>
              </div>

            </div>
            <div>
              <label className="block font-urbanist  font-[600] text-[20px] mb-2">Event Visibility</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 flex items-center font-urbanist text-[16px] justify-center gap-2 rounded-lg py-3 font-[500] border-2 transition-colors ${visibility === 'open' ? 'bg-[#232323] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#232323] border-[#232323] text-white'}`}
                  onClick={() => setVisibility('open')}
                >
                  <div className='flex content-center flex-wrap gap-2'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.0768 23.6663C10.4629 23.6663 8.94627 23.3599 7.52682 22.747C6.10738 22.1341 4.87266 21.3031 3.82266 20.2538C2.77266 19.2046 1.9416 17.9699 1.32949 16.5497C0.71738 15.1295 0.410936 13.6128 0.410158 11.9997C0.40938 10.3866 0.715824 8.8699 1.32949 7.44967C1.94316 6.02945 2.77421 4.79473 3.82266 3.74551C4.8711 2.69629 6.10582 1.86523 7.52682 1.25234C8.94782 0.639452 10.4645 0.333008 12.0768 0.333008C13.6892 0.333008 15.2058 0.639452 16.6268 1.25234C18.0478 1.86523 19.2825 2.69629 20.331 3.74551C21.3794 4.79473 22.2109 6.02945 22.8253 7.44967C23.4398 8.8699 23.7458 10.3866 23.7435 11.9997C23.7412 13.6128 23.4347 15.1295 22.8242 16.5497C22.2136 17.9699 21.3825 19.2046 20.331 20.2538C19.2794 21.3031 18.0447 22.1345 16.6268 22.7482C15.2089 23.3618 13.6923 23.6679 12.0768 23.6663ZM10.9102 21.2747V18.9997C10.2685 18.9997 9.71938 18.7714 9.26283 18.3148C8.80627 17.8583 8.5776 17.3088 8.57682 16.6663V15.4997L2.97682 9.89967C2.91849 10.2497 2.86521 10.5997 2.81699 10.9497C2.76877 11.2997 2.74427 11.6497 2.74349 11.9997C2.74349 14.3525 3.5166 16.4136 5.06282 18.183C6.60905 19.9524 8.55816 20.983 10.9102 21.2747ZM18.9602 18.2997C19.349 17.8719 19.699 17.4103 20.0102 16.9148C20.3213 16.4194 20.5787 15.9041 20.7825 15.369C20.9863 14.8339 21.1418 14.2844 21.2492 13.7205C21.3565 13.1566 21.4102 12.583 21.4102 11.9997C21.4102 10.0941 20.8801 8.35384 19.82 6.77884C18.7599 5.20384 17.3455 4.06634 15.5768 3.36634V3.83301C15.5768 4.47467 15.3485 5.02417 14.892 5.48151C14.4354 5.93884 13.8859 6.16712 13.2435 6.16634H10.9102V8.49967C10.9102 8.83023 10.7982 9.10751 10.5742 9.33151C10.3502 9.55551 10.0733 9.66712 9.74349 9.66634H7.41016V11.9997H14.4102C14.7407 11.9997 15.018 12.1117 15.242 12.3357C15.466 12.5597 15.5776 12.8366 15.5768 13.1663V16.6663H16.7435C17.249 16.6663 17.706 16.8172 18.1143 17.119C18.5227 17.4208 18.8046 17.8143 18.9602 18.2997Z" fill="#565656" />
                    </svg>
                    <div>Open to all</div>
                  </div>
                </button>
                <button
                  type="button"
                  className={`flex-1 flex items-center  font-urbanist text-[16px] justify-center gap-2 rounded-lg py-3 font-[500] border-2 transition-colors ${visibility === 'private' ? 'bg-[#232323] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#232323] border-[#232323] text-white'}`}
                  onClick={() => setVisibility('private')}
                >
                  <div className='flex content-center flex-wrap gap-2'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.2648 21.6496L17.3148 18.6996C16.5148 19.2329 15.6525 19.6413 14.7278 19.9246C13.8032 20.2079 12.8238 20.3496 11.7898 20.3496C10.4065 20.3496 9.10651 20.0869 7.88984 19.5616C6.67318 19.0363 5.61484 18.3239 4.71484 17.4246C3.81484 16.5253 3.10251 15.4669 2.57784 14.2496C2.05318 13.0323 1.79051 11.7323 1.78984 10.3496C1.78984 9.31628 1.93151 8.33728 2.21484 7.41261C2.49818 6.48794 2.90651 5.62528 3.43984 4.82461L0.464844 1.84961L1.88984 0.424609L21.6898 20.2246L20.2648 21.6496ZM10.7898 18.2996V16.3496C10.2398 16.3496 9.76918 16.1539 9.37784 15.7626C8.98651 15.3713 8.79051 14.9003 8.78984 14.3496V13.3496L3.98984 8.54961C3.93984 8.84961 3.89418 9.14961 3.85284 9.44961C3.81151 9.74961 3.79051 10.0496 3.78984 10.3496C3.78984 12.3663 4.45251 14.1329 5.77784 15.6496C7.10318 17.1663 8.77384 18.0496 10.7898 18.2996ZM20.1398 15.8246L18.6898 14.3746C19.0398 13.7579 19.3108 13.1123 19.5028 12.4376C19.6948 11.7629 19.7905 11.0669 19.7898 10.3496C19.7898 8.71628 19.3358 7.22461 18.4278 5.87461C17.5198 4.52461 16.3072 3.54961 14.7898 2.94961V3.34961C14.7898 3.89961 14.5942 4.37061 14.2028 4.76261C13.8115 5.15461 13.3405 5.35028 12.7898 5.34961H10.7898V6.47461L6.31484 1.99961C7.11484 1.48294 7.97318 1.07894 8.88984 0.787609C9.80651 0.496276 10.7732 0.350276 11.7898 0.349609C13.1732 0.349609 14.4732 0.612276 15.6898 1.13761C16.9065 1.66294 17.9648 2.37528 18.8648 3.27461C19.7648 4.17394 20.4775 5.23228 21.0028 6.44961C21.5282 7.66694 21.7905 8.96694 21.7898 10.3496C21.7898 11.3663 21.6442 12.3329 21.3528 13.2496C21.0615 14.1663 20.6572 15.0246 20.1398 15.8246Z" fill="#565656" />
                    </svg>
                    <div>Private</div>
                  </div>
                </button>
              </div>
              <p className="text-[14px] font-urbanist text-[#424242] mt-2">This visibility will define who can enroll and participate.</p>
            </div>
            <div className="flex flex-col gap-4 w-44">
              <div className="flex-1">
                <label className="block font-urbanist font-[600] text-[20px] mb-2">Event starts</label>
                <input type="date" className="w-full bg-[#252525] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
              </div>
              <div className="flex-1">
                <label className="block font-urbanist  font-[600] text-[20px] mb-2">Event ends</label>
                <input type="date" className="w-full bg-[#252525] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
              </div>
            </div>
          </form >

        );
      case 1:
        return (
          <form className="max-w-2xl m-0 flex flex-col gap-6">
            <div>
              <label className="block font-urbanist font-[600] text-[20px] mb-2">Event Mode</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-semibold border-2 transition-colors ${eventMode === 'online' ? 'bg-[#252525] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#252525] border-[#232323] text-white'}`}
                  onClick={() => setEventMode('online')}
                >
                  <div className='flex content-center flex-wrap gap-2 justify-center '>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.0768 23.6663C10.4629 23.6663 8.94627 23.3599 7.52682 22.747C6.10738 22.1341 4.87266 21.3031 3.82266 20.2538C2.77266 19.2046 1.9416 17.9699 1.32949 16.5497C0.71738 15.1295 0.410936 13.6128 0.410158 11.9997C0.40938 10.3866 0.715824 8.8699 1.32949 7.44967C1.94316 6.02945 2.77421 4.79473 3.82266 3.74551C4.8711 2.69629 6.10582 1.86523 7.52682 1.25234C8.94782 0.639452 10.4645 0.333008 12.0768 0.333008C13.6892 0.333008 15.2058 0.639452 16.6268 1.25234C18.0478 1.86523 19.2825 2.69629 20.331 3.74551C21.3794 4.79473 22.2109 6.02945 22.8253 7.44967C23.4398 8.8699 23.7458 10.3866 23.7435 11.9997C23.7412 13.6128 23.4347 15.1295 22.8242 16.5497C22.2136 17.9699 21.3825 19.2046 20.331 20.2538C19.2794 21.3031 18.0447 22.1345 16.6268 22.7482C15.2089 23.3618 13.6923 23.6679 12.0768 23.6663ZM10.9102 21.2747V18.9997C10.2685 18.9997 9.71938 18.7714 9.26283 18.3148C8.80627 17.8583 8.5776 17.3088 8.57682 16.6663V15.4997L2.97682 9.89967C2.91849 10.2497 2.86521 10.5997 2.81699 10.9497C2.76877 11.2997 2.74427 11.6497 2.74349 11.9997C2.74349 14.3525 3.5166 16.4136 5.06282 18.183C6.60905 19.9524 8.55816 20.983 10.9102 21.2747ZM18.9602 18.2997C19.349 17.8719 19.699 17.4103 20.0102 16.9148C20.3213 16.4194 20.5787 15.9041 20.7825 15.369C20.9863 14.8339 21.1418 14.2844 21.2492 13.7205C21.3565 13.1566 21.4102 12.583 21.4102 11.9997C21.4102 10.0941 20.8801 8.35384 19.82 6.77884C18.7599 5.20384 17.3455 4.06634 15.5768 3.36634V3.83301C15.5768 4.47467 15.3485 5.02417 14.892 5.48151C14.4354 5.93884 13.8859 6.16712 13.2435 6.16634H10.9102V8.49967C10.9102 8.83023 10.7982 9.10751 10.5742 9.33151C10.3502 9.55551 10.0733 9.66712 9.74349 9.66634H7.41016V11.9997H14.4102C14.7407 11.9997 15.018 12.1117 15.242 12.3357C15.466 12.5597 15.5776 12.8366 15.5768 13.1663V16.6663H16.7435C17.249 16.6663 17.706 16.8172 18.1143 17.119C18.5227 17.4208 18.8046 17.8143 18.9602 18.2997Z" fill="#565656" />
                    </svg>
                    <div className='font-urbanist text-[16px]  rounded-lg  font-[500]'>Online</div>
                  </div>
                </button>
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-semibold border-2 transition-colors ${eventMode === 'offline' ? 'bg-[#252525] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#252525] border-[#232323] text-white'}`}
                  onClick={() => setEventMode('offline')}
                >
                  <div className='flex content-center flex-wrap gap-2'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.2648 21.6496L17.3148 18.6996C16.5148 19.2329 15.6525 19.6413 14.7278 19.9246C13.8032 20.2079 12.8238 20.3496 11.7898 20.3496C10.4065 20.3496 9.10651 20.0869 7.88984 19.5616C6.67318 19.0363 5.61484 18.3239 4.71484 17.4246C3.81484 16.5253 3.10251 15.4669 2.57784 14.2496C2.05318 13.0323 1.79051 11.7323 1.78984 10.3496C1.78984 9.31628 1.93151 8.33728 2.21484 7.41261C2.49818 6.48794 2.90651 5.62528 3.43984 4.82461L0.464844 1.84961L1.88984 0.424609L21.6898 20.2246L20.2648 21.6496ZM10.7898 18.2996V16.3496C10.2398 16.3496 9.76918 16.1539 9.37784 15.7626C8.98651 15.3713 8.79051 14.9003 8.78984 14.3496V13.3496L3.98984 8.54961C3.93984 8.84961 3.89418 9.14961 3.85284 9.44961C3.81151 9.74961 3.79051 10.0496 3.78984 10.3496C3.78984 12.3663 4.45251 14.1329 5.77784 15.6496C7.10318 17.1663 8.77384 18.0496 10.7898 18.2996ZM20.1398 15.8246L18.6898 14.3746C19.0398 13.7579 19.3108 13.1123 19.5028 12.4376C19.6948 11.7629 19.7905 11.0669 19.7898 10.3496C19.7898 8.71628 19.3358 7.22461 18.4278 5.87461C17.5198 4.52461 16.3072 3.54961 14.7898 2.94961V3.34961C14.7898 3.89961 14.5942 4.37061 14.2028 4.76261C13.8115 5.15461 13.3405 5.35028 12.7898 5.34961H10.7898V6.47461L6.31484 1.99961C7.11484 1.48294 7.97318 1.07894 8.88984 0.787609C9.80651 0.496276 10.7732 0.350276 11.7898 0.349609C13.1732 0.349609 14.4732 0.612276 15.6898 1.13761C16.9065 1.66294 17.9648 2.37528 18.8648 3.27461C19.7648 4.17394 20.4775 5.23228 21.0028 6.44961C21.5282 7.66694 21.7905 8.96694 21.7898 10.3496C21.7898 11.3663 21.6442 12.3329 21.3528 13.2496C21.0615 14.1663 20.6572 15.0246 20.1398 15.8246Z" fill="#565656" />
                    </svg>
                    <div className='font-urbanist text-[16px]  rounded-lg  font-[500]'>Offline</div>
                  </div>
                </button>
              </div>
            </div>
            <div>
              <label className="block font-urbanist font-[600] text-[20px] mb-2">Location</label>
              <input type="text" placeholder="Name your event" className="w-full bg-[#252525] rounded-lg px-4 py-3 font-urbanist font-[600] text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
            </div>
            <div>
              <label className="block font-urbanist font-[600] text-[20px] mb-2">Venue</label>
              <select className="appearance-none w-full bg-[#252525] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 text-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]">
                <option className="text-white" value="">Select event type</option>
                <option className="text-white" value="auditorium">Auditorium</option>
                <option className="text-white" value="hall">Hall</option>
                <option className="text-white" value="outdoor">Outdoor</option>
                <option className="text-white" value="other">Other</option>
              </select>
              <p className="font-urbanist font-[500] text-[15px] text-[#818181] mt-2">Venue Not Decide Yet? <span className="font-urbanist font-[500] text-[15px] text-[#CCDAFD] mt-2 underline cursor-pointer">No worries you can add it later</span></p>
            </div>
          </form>
        );
      case 2:
        return (
          <form className="max-w-2xl  flex flex-col gap-6">
            <div>
              <label className="block font-urbanist font-[600] text-[20px] mb-2">Rulebook link</label>
              <input type="text" placeholder="URL" className="appearance-none w-3/4 bg-[#252525] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 text-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
            </div>
            <div>
              <label className="block font-urbanist font-[600] text-[20px] mb-2">Event details</label>
              {/* Placeholder for rich text editor */}
              <div className="bg-[#232323] rounded-xl  min-h-[180px] flex flex-col">
                <div className="flex gap-2 mb-2 p-4 bg-[#353535] rounded-t-xl">
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">B</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">I</button>
                  <button type="button" className="text-[#E6FF4C] font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">U</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">•</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">1.</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">&quot;</button>
                  <button type="button" className="text-white font-bold bg-transparent px-2 py-1 rounded hover:bg-[#222]">🔗</button>
                </div>
                <textarea
                  className="bg-transparent w-full p-4 h-60 font-urbanist font-[600] text-[16px] text-white placeholder-[#565656] focus:outline-none resize-none"
                  placeholder="Describe about your event make sure add all details including eligibility and others"
                />
              </div>
            </div>
          </form>
        );
      case 3:
        return (
          <div className="max-w-5xl  flex flex-col gap-6">
            <label className="block font-urbanist font-[600] text-[20px] mb-2">Upload Photos</label>
            <div className="flex gap-8">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="w-64 h-64 bg-[#232323] rounded-2xl flex flex-col items-center justify-center border-2 border-[#232323] hover:border-[#E6FF4C] transition-colors cursor-pointer">
                  <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500 mb-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16V6a2 2 0 012-2h14a2 2 0 012 2v10M3 16l4-4a2 2 0 012.828 0l2.586 2.586a2 2 0 002.828 0L21 10M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2" /></svg>
                  <span className="text-[#818181] font-urbanist font-[700]  text-[14px] text-center">Click Here or Drag & drop<br /><span className='font-[400]'>JPEG/PNG/SVG format allowed</span></span>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="max-w-5xl  flex flex-col gap-6">
            <label className="block text-lg font-semibold mb-4 text-pink-500">Rewards</label>
            <div className=" rounded-2xl overflow-x-auto">
              <div className="w-full">
                {/* Header */}


                {/* Rows */}
                <div className="w-full flex flex-col gap-2">
                  {/* Header */}
                  <div className="flex  py-1 gap-2 bg-[#313131] rounded-2xl">
                    <div className="w-1/6  px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">
                      Rank
                    </div>
                    <div className="w-1/6  px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">
                      Cash
                    </div>
                    <div className="w-2/6  px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">
                      Coupon
                    </div>
                    <div className="w-2/6  px-4 py-2 text-white text-center font-urbanist font-[600] text-[18px]">
                      Goodies
                    </div>
                  </div>

                  {/* Rows */}
                  {rewards.map((reward, idx) => (
                    <div key={idx} className="flex  py-2 gap-2">
                      {/* Rank */}
                      <div className="w-1/6 bg-[#181818] font-urbanist text-[16px]  rounded-lg px-6 py-2 text-center font-[700] text-[#E6FF4C]">
                        {reward.rank}
                      </div>

                      {/* Cash */}
                      <div className="w-1/6 bg-[#181818] font-urbanist text-[16px]  font-[700] rounded-lg px-6 py-2 text-center  text-white">
                        {reward.cash}
                      </div>

                      {/* Coupon Input */}
                      <div className="w-2/6 bg-[#181818] rounded-lg px-4 py-2">
                        <input
                          type="text"
                          className="w-full bg-transparent font-urbanist text-[16px]  font-[500]  focus:outline-none text-white placeholder-[#535353]"
                          placeholder="Enter worth"
                          value={reward.coupon}
                          onChange={(e) =>
                            setRewards((rewards) =>
                              rewards.map((r, i) =>
                                i === idx ? { ...r, coupon: e.target.value } : r
                              )
                            )
                          }
                        />
                      </div>

                      {/* Goodies Input */}
                      <div className="w-2/6 bg-[#181818] rounded-lg px-4 py-2">
                        <input
                          type="text"
                          className="w-full bg-transparent focus:outline-none font-urbanist text-[16px]  font-[500]   text-white placeholder-[#535353]"
                          placeholder="Enter worth"
                          value={reward.goodies}
                          onChange={(e) =>
                            setRewards((rewards) =>
                              rewards.map((r, i) =>
                                i === idx ? { ...r, goodies: e.target.value } : r
                              )
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              <div className="flex items-center  py-4">
                <button
                  type="button"
                  className="bg-[#252525]  text-[#565656] rounded-lg px-8 py-2 font-[600] font-urbanist text-[16px] mt-2"
                  onClick={() => setRewards([...rewards, { rank: `Add position +`, cash: '', coupon: '', goodies: '' }])}
                >
                  Add position +
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col relative">
      {/* Header */}
      <div className="w-full px-4 bg-[#000000]">
        <div className="bg-[#0050FF] h-[6vh] rounded-4xl flex mt-4 w-full justify-center  content-center flex-wrap relative">
          <div className='font-dm-sans text-[22px] font-[800]  text-[#E1FF01]'>Create event
          </div>
          <div className=' flex absolute right-5 h-full justify-center  gap-3 content-center flex-wrap font-dm-sans text-white font-[500] text-[14px] '>
            <div className='bg-[#00288D] px-6 py-1 rounded-2xl'>Preview</div>
            <div className='bg-[#00288D] px-6 py-1 rounded-2xl'>Share</div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex  flex-row">
        {/* Sidebar */}
        <aside className="w-72 p-4 rounded-b-3xl ml-4 bg-[#181818] flex flex-col gap-8 shadow-lg min-h-[80vh]">
          <div>
            <button className="flex items-center content-center flex-wrap gap-2 w-full text-left text-white font-semibold mb-4 bg-[#313131] rounded-xl px-3 h-10">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[white]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className='font-urbanist font-[700] text-[17px] pt-[1px]'>Add Event Details</span>
            </button>
            <ul className="ml-8 flex flex-col gap-3 mt-2">
              {steps.map((step, idx) => (
                <li key={step.label} className="flex items-center gap-2">
                  <span className={`w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center `}>
                    <span className={`w-2 h-2 rounded-full ${idx <= currentStep ? 'bg-[#E6FF4C]' : ''}`}></span>
                  </span>
                  <span className={`text-sm font-urbanist text-[14px] font-[600]  ${idx <= currentStep ? 'text-white' : 'text-gray-400'}`}>{step.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-4 bg-[#181818] rounded-xl px-3 py-2">
              <span className="bg-[#232323] p-2 rounded-lg">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>
              </span>
              Add Ticket
            </button>
            <ul className="ml-8 flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-[#181818] rounded-full"></span>
                </span>
                <span className="text-sm font-urbanist text-[14px] font-[600]  text-gray-400">Pricing</span>
              </li>
            </ul>
          </div>
          <div>
            <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-4 bg-[#181818] rounded-xl px-3 py-2">
              <span className="bg-[#232323] p-2 rounded-lg">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h1v-4h1m-4 0h1v4h1" /></svg>
              </span>
              Add ons
            </button>
            <ul className="ml-8 flex flex-col gap-3 mt-2">
              {addOns.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-[#181818] rounded-full"></span>
                  </span>
                  <span className="text-sm font-urbanist text-[14px] font-[600]  text-gray-400">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto text-[#E6FF4C] font-bold text-lg">
            Page <span className="text-white">{currentStep + 1}</span> out of 5
            <p className="text-xs text-gray-400 font-normal mt-1">You can easily manage these details later in manage event section.</p>
          </div>
        </aside>
        {/* Form Section */}
        <main className="flex-1 flex flex-col p-10 relative">
          {renderStepContent()}
          <div className="fixed bottom-8 right-8 z-50 ">
            <button
              type="button"
              className="bg-[#0050FF] text-[#E6FF4C] font-bold text-lg mr-4 px-12 py-3 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            >
              Back
            </button>
            <button
              type="button"
              className="bg-[#0050FF] text-[#E6FF4C] font-bold text-lg px-12 py-3 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors"
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </button>

          </div>
        </main>
      </div>
    </div>
  );
} 