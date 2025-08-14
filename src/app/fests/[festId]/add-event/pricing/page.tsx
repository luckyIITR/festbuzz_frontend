'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
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

export default function PricingPage() {
    const router = useRouter();
    const params = useParams().festId;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [visibility, setVisibility] = useState('open');
    const currentStep = 4; // Adjust based on current step

    const handleNext = () => {
        router.push('./addones');
    };

    const handleback = () => {
        router.push(`/fests/${params}/add-event/`);
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col relative">
            {/* Header */}
            <div className="w-full px-2 sm:px-4 bg-[#000000]">
                <div className="bg-[#0050FF] h-[6vh] min-h-[48px] rounded-2xl sm:rounded-4xl flex mt-2 sm:mt-4 w-full justify-center items-center relative px-4">
                    <div className='font-dm-sans text-lg sm:text-[22px] font-[800] text-[#E1FF01] text-center'>Create event</div>
                    <div className='hidden sm:flex absolute right-3 sm:right-5 h-full justify-center gap-2 sm:gap-3 items-center font-dm-sans text-white font-[500] text-xs sm:text-[14px]'>
                        <div className='bg-[#00288D] px-3 sm:px-6 py-1 rounded-xl sm:rounded-2xl'>Preview</div>
                        <div className='bg-[#00288D] px-3 sm:px-6 py-1 rounded-xl sm:rounded-2xl'>Share</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-row relative">
                {/* Mobile Toggle Button */}
                <div className='h-10'></div>

                {/* Sidebar */}
                <aside className={`
                    fixed lg:relative
                    top-0 left-0 lg:left-auto
                    w-72 sm:w-80 lg:w-72 xl:w-80
                    h-full lg:h-auto
                    min-h-screen lg:min-h-[80vh]
                    p-3 sm:p-4 lg:p-4
                    ml-0 lg:ml-4
                    bg-[#181818] 
                    flex flex-col gap-4 sm:gap-6 lg:gap-8
                    shadow-lg lg:shadow-lg
                    rounded-none lg:rounded-b-3xl
                    z-40 lg:z-auto
                    transition-transform duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    overflow-y-auto
                `}>

                    {/* Close button for mobile */}
                    <button
                        className="lg:hidden self-end text-white p-2 mt-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Add Event Details Section */}
                    <div>
                        <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-3 sm:mb-4 bg-[#313131] rounded-xl px-3 h-9 sm:h-10">
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className='font-urbanist font-[700] text-sm sm:text-[17px] pt-[1px] truncate'>Add Event Details</span>
                        </button>
                        <ul className="ml-4 sm:ml-6 lg:ml-8 flex flex-col gap-2 sm:gap-3 mt-2">
                            {steps.map((step, idx) => (
                                <li key={step.label} className="flex items-center gap-2">
                                    <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${idx <= currentStep ? 'bg-[#E6FF4C]' : ''}`}></span>
                                    </span>
                                    <span className={`text-xs sm:text-sm font-urbanist font-[600] truncate ${idx <= currentStep ? 'text-white' : 'text-gray-400'}`}>
                                        {step.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Add Ticket Section */}
                    <div>
                        <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-3 sm:mb-4 bg-[#181818] rounded-xl px-3 py-2">
                            <span className="bg-[#232323] p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <span className="truncate text-sm sm:text-[16px]">Add Ticket</span>
                        </button>
                        <ul className="ml-4 sm:ml-6 lg:ml-8 flex flex-col gap-2 sm:gap-3 mt-2">
                            <li className="flex items-center gap-2">
                                <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#E6FF4C] rounded-full"></span>
                                </span>
                                <span className="text-xs sm:text-sm font-urbanist font-[600] text-white truncate">Pricing</span>
                            </li>
                        </ul>
                    </div>

                    {/* Add-ons Section */}
                    <div>
                        <button className="flex items-center gap-2 w-full text-left text-white font-semibold mb-3 sm:mb-4 bg-[#181818] rounded-xl px-3 py-2">
                            <span className="bg-[#232323] p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#E6FF4C]">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </span>
                            <span className="truncate text-sm sm:text-[16px]">Add ons</span>
                        </button>
                        <ul className="ml-4 sm:ml-6 lg:ml-8 flex flex-col gap-2 sm:gap-3 mt-2">
                            {addOns.map((item) => (
                                <li key={item.label} className="flex items-center gap-2">
                                    <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#181818] rounded-full"></span>
                                    </span>
                                    <span className="text-xs sm:text-sm font-urbanist font-[600] text-gray-400 truncate">
                                        {item.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-auto text-[#E6FF4C] font-bold text-base sm:text-lg">
                        Page <span className="text-white">{currentStep + 1}</span> out of 5
                        <p className="text-xs text-gray-400 font-normal mt-1 leading-relaxed">
                            You can easily manage these details later in manage event section.
                        </p>
                    </div>
                </aside>

                {/* Form Section */}
                <main className={`flex-1 flex flex-col p-3 sm:p-4 lg:p-10 relative transition-all duration-300 ${isMobileMenuOpen ? 'ml-0' : 'ml-0'} lg:ml-0`}>
                    <div className="w-full lg:w-8/12 xl:w-6/12 flex flex-col gap-4 sm:gap-6">
                        {/* Ticket Name */}
                        <div>
                            <label className="block font-urbanist font-[600] text-lg sm:text-[20px] mb-2">Ticket name*</label>
                            <input
                                type="text"
                                placeholder="Early bird/RSVP/VIP"
                                className="w-full bg-[#252525] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 font-urbanist font-[600] text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C] text-sm sm:text-base"
                            />
                        </div>

                        {/* Fee Type */}
                        <div>
                            <label className="block font-urbanist font-[600] text-lg sm:text-[20px] mb-2">Fee Type*</label>
                            <div className="flex gap-2 sm:gap-4">
                                <button
                                    type="button"
                                    className={`flex-1 flex items-center font-urbanist text-sm sm:text-[16px] justify-center gap-1 sm:gap-2 rounded-lg py-2.5 sm:py-3 px-2 font-[500] border-2 transition-colors ${visibility === 'open' ? 'bg-[#232323] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#232323] border-[#232323] text-white'}`}
                                    onClick={() => setVisibility('open')}
                                >
                                    <div className='flex items-center gap-1 sm:gap-2'>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0768 23.6663C10.4629 23.6663 8.94627 23.3599 7.52682 22.747C6.10738 22.1341 4.87266 21.3031 3.82266 20.2538C2.77266 19.2046 1.9416 17.9699 1.32949 16.5497C0.71738 15.1295 0.410936 13.6128 0.410158 11.9997C0.40938 10.3866 0.715824 8.8699 1.32949 7.44967C1.94316 6.02945 2.77421 4.79473 3.82266 3.74551C4.8711 2.69629 6.10582 1.86523 7.52682 1.25234C8.94782 0.639452 10.4645 0.333008 12.0768 0.333008C13.6892 0.333008 15.2058 0.639452 16.6268 1.25234C18.0478 1.86523 19.2825 2.69629 20.331 3.74551C21.3794 4.79473 22.2109 6.02945 22.8253 7.44967C23.4398 8.8699 23.7458 10.3866 23.7435 11.9997C23.7412 13.6128 23.4347 15.1295 22.8242 16.5497C22.2136 17.9699 21.3825 19.2046 20.331 20.2538C19.2794 21.3031 18.0447 22.1345 16.6268 22.7482C15.2089 23.3618 13.6923 23.6679 12.0768 23.6663ZM10.9102 21.2747V18.9997C10.2685 18.9997 9.71938 18.7714 9.26283 18.3148C8.80627 17.8583 8.5776 17.3088 8.57682 16.6663V15.4997L2.97682 9.89967C2.91849 10.2497 2.86521 10.5997 2.81699 10.9497C2.76877 11.2997 2.74427 11.6497 2.74349 11.9997C2.74349 14.3525 3.5166 16.4136 5.06282 18.183C6.60905 19.9524 8.55816 20.983 10.9102 21.2747ZM18.9602 18.2997C19.349 17.8719 19.699 17.4103 20.0102 16.9148C20.3213 16.4194 20.5787 15.9041 20.7825 15.369C20.9863 14.8339 21.1418 14.2844 21.2492 13.7205C21.3565 13.1566 21.4102 12.583 21.4102 11.9997C21.4102 10.0941 20.8801 8.35384 19.82 6.77884C18.7599 5.20384 17.3455 4.06634 15.5768 3.36634V3.83301C15.5768 4.47467 15.3485 5.02417 14.892 5.48151C14.4354 5.93884 13.8859 6.16712 13.2435 6.16634H10.9102V8.49967C10.9102 8.83023 10.7982 9.10751 10.5742 9.33151C10.3502 9.55551 10.0733 9.66712 9.74349 9.66634H7.41016V11.9997H14.4102C14.7407 11.9997 15.018 12.1117 15.242 12.3357C15.466 12.5597 15.5776 12.8366 15.5768 13.1663V16.6663H16.7435C17.249 16.6663 17.706 16.8172 18.1143 17.119C18.5227 17.4208 18.8046 17.8143 18.9602 18.2997Z" fill="#565656" />
                                        </svg>
                                        <div>Paid</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 flex items-center font-urbanist text-sm sm:text-[16px] justify-center gap-1 sm:gap-2 rounded-lg py-2.5 sm:py-3 px-2 font-[500] border-2 transition-colors ${visibility === 'private' ? 'bg-[#232323] border-[#E6FF4C] text-[#E6FF4C]' : 'bg-[#232323] border-[#232323] text-white'}`}
                                    onClick={() => setVisibility('private')}
                                >
                                    <div className='flex items-center gap-1 sm:gap-2'>
                                        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.2648 21.6496L17.3148 18.6996C16.5148 19.2329 15.6525 19.6413 14.7278 19.9246C13.8032 20.2079 12.8238 20.3496 11.7898 20.3496C10.4065 20.3496 9.10651 20.0869 7.88984 19.5616C6.67318 19.0363 5.61484 18.3239 4.71484 17.4246C3.81484 16.5253 3.10251 15.4669 2.57784 14.2496C2.05318 13.0323 1.79051 11.7323 1.78984 10.3496C1.78984 9.31628 1.93151 8.33728 2.21484 7.41261C2.49818 6.48794 2.90651 5.62528 3.43984 4.82461L0.464844 1.84961L1.88984 0.424609L21.6898 20.2246L20.2648 21.6496ZM10.7898 18.2996V16.3496C10.2398 16.3496 9.76918 16.1539 9.37784 15.7626C8.98651 15.3713 8.79051 14.9003 8.78984 14.3496V13.3496L3.98984 8.54961C3.93984 8.84961 3.89418 9.14961 3.85284 9.44961C3.81151 9.74961 3.79051 10.0496 3.78984 10.3496C3.78984 12.3663 4.45251 14.1329 5.77784 15.6496C7.10318 17.1663 8.77384 18.0496 10.7898 18.2996ZM20.1398 15.8246L18.6898 14.3746C19.0398 13.7579 19.3108 13.1123 19.5028 12.4376C19.6948 11.7629 19.7905 11.0669 19.7898 10.3496C19.7898 8.71628 19.3358 7.22461 18.4278 5.87461C17.5198 4.52461 16.3072 3.54961 14.7898 2.94961V3.34961C14.7898 3.89961 14.5942 4.37061 14.2028 4.76261C13.8115 5.15461 13.3405 5.35028 12.7898 5.34961H10.7898V6.47461L6.31484 1.99961C7.11484 1.48294 7.97318 1.07894 8.88984 0.787609C9.80651 0.496276 10.7732 0.350276 11.7898 0.349609C13.1732 0.349609 14.4732 0.612276 15.6898 1.13761C16.9065 1.66294 17.9648 2.37528 18.8648 3.27461C19.7648 4.17394 20.4775 5.23228 21.0028 6.44961C21.5282 7.66694 21.7905 8.96694 21.7898 10.3496C21.7898 11.3663 21.6442 12.3329 21.3528 13.2496C21.0615 14.1663 20.6572 15.0246 20.1398 15.8246Z" fill="#565656" />
                                        </svg>
                                        <div>Free</div>
                                    </div>
                                </button>
                            </div>

                            {/* Ticket Pricing */}
                            <div>
                                <label className="block font-urbanist font-[600] text-lg sm:text-[20px] mb-2 mt-4">Ticket Pricing*</label>
                                <input
                                    type="number"
                                    placeholder="INR"
                                    className="w-full bg-[#252525] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 font-urbanist font-[600] text-white placeholder-[#B7B7B7] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C] text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Date and Time Inputs */}
                        <div className='flex flex-col gap-6 sm:gap-8'>
                            {/* Tickets available from */}
                            <div className="flex flex-col gap-2">
                                <label className="text-white font-urbanist font-[700] text-lg sm:text-[20px] mb-1">Tickets available from*</label>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                                    <input
                                        type="date"
                                        name="ticketStartDate"
                                        className="bg-[#252525] backdrop-blur-md rounded-xl px-3 sm:px-8 py-2.5 sm:py-3 text-white focus:outline-none flex-1 shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400 text-sm sm:text-base"
                                        placeholder="Start Date"
                                    />
                                    <input
                                        type="time"
                                        name="ticketStartTime"
                                        className="bg-[#252525] backdrop-blur-md rounded-xl px-3 sm:px-8 py-2.5 sm:py-3 text-white focus:outline-none flex-1 shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400 text-sm sm:text-base"
                                        placeholder="Start Time"
                                    />
                                </div>
                            </div>

                            {/* Tickets available till */}
                            <div className="flex flex-col gap-2">
                                <label className="text-white font-urbanist font-[700] text-lg sm:text-[20px] mb-1">Tickets available till*</label>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                                    <input
                                        type="date"
                                        name="ticketEndDate"
                                        className="bg-[#252525] backdrop-blur-md rounded-xl px-3 sm:px-8 py-2.5 sm:py-3 text-white focus:outline-none flex-1 shadow-md focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400 text-sm sm:text-base"
                                        placeholder="End Date"
                                    />
                                    <input
                                        type="time"
                                        name="ticketEndTime"
                                        className="bg-[#252525] backdrop-blur-md rounded-xl px-3 sm:px-8 py-2.5 sm:py-3 text-white focus:outline-none flex-1 shadow-md focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400 text-sm sm:text-base"
                                        placeholder="End Time"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 py-3 sm:py-4 px-4 sm:px-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 z-50 bg-gradient-to-t from-black to-transparent">
                <button
                    type="button"
                    className="bg-[#0050FF] text-[#E6FF4C] font-bold text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-2 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors w-full sm:w-auto order-2 sm:order-1"
                    onClick={handleback}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="bg-[#0050FF] text-[#E6FF4C] font-bold text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-2 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors w-full sm:w-auto order-1 sm:order-2"
                    onClick={handleNext}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}