'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
type Inputfield = {
    input1: string;
    input2: string;
}
type twofield = {
    input1: string;
    input3: string;
}
type round = {
    input1: string;
    input2: string;
}
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

export default function page() {

    const [Inputfield, setInputfields] = useState([{ input1: '', select: '' }]);
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handlesubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        setInputfields([...Inputfield, { input1: '', select: '' }]);
    };

    const handledit = (index: number, key: 'input1' | 'select', value: string) => {
        setInputfields(prev =>
            prev.map((item, idx) =>
                idx === index ? { ...item, [key]: value } : item
            )
        );
    };

    const deletebtn = (index: number) => {
        setInputfields(prev => prev.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (currentStep < addOns.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            router.push('/event/pricing');
        }
    };

    const handleback = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => Math.max(prev - 1, 0));
        } else {
            router.push('/event/pricing');
        }
    };

    const [twofield, setTwofield] = useState([{ input1: '', input3: '' }]);
    const submit = (e: React.MouseEvent) => {
        e.preventDefault();
        setTwofield([...twofield, { input1: '', input3: '' }])
    }
    const handlechange = (index: number, field: keyof twofield, value: string) => {
        const prev = [...twofield];
        prev[index][field] = value;
        setTwofield(prev);
    }
    const deletefield = (index: number) => {
        setTwofield(prev => prev.filter((_, i) => i !== index));
    }

    const [round, setround] = useState([{ input1: '', input2: '' }]);
    const roundsubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        setround([...round, { input1: '', input2: '' }]);
    }
    const handelroundedit = (index: number, field: keyof round, value: string) => {
        const prev = [...round];
        round[index][field] = value;
        setround(prev);
    }
    const handlerounddelete = (index: number) => {
        setround(prev => prev.filter((_, i) => i !== index))
    }
    function renderStepContent() {
        switch (currentStep) {
            case 0:
                return (
                    <form className="w-6/12 flex flex-col gap-6">
                        <label className="block font-urbanist font-[600] text-[16px] text-[#818181]">
                            Create Form for extra information you require from participant
                        </label>
                        <label className="block font-urbanist font-[600]  text-[20px] -mb-2">Enter question here</label>

                        <button
                            type="button"
                            className="rounded-full  absolute top-34 h-12 right-10 w-12 bg-[#252525] text-[#565656] text-[20px]"
                            onClick={handlesubmit}
                        >
                            +
                        </button>
                        <div className='min-h-80'>
                            {Inputfield.map((pair, index) => (
                                <div key={index} className="flex gap-4 min-w-250 items-center min">
                                    <input
                                        type="text"
                                        placeholder="Write here"
                                        value={pair.input1}
                                        onChange={e => handledit(index, 'input1', e.target.value)}
                                        className="w-full bg-[#252525] rounded-lg px-4 py-3 font-urbanist font-[600] text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]"
                                    />
                                    <select
                                        value={pair.select}
                                        onChange={e => handledit(index, 'select', e.target.value)}
                                        className="w-40 bg-[#252525] rounded-lg text-white px-4 py-3 font-urbanist font-[600] text-[18px]"
                                    >
                                        <option value="">Input Type</option>
                                        <option value="text">Text</option>
                                        <option value="date">Date</option>
                                        <option value="time">Time</option>
                                        <option value="upload">Upload</option>
                                        <option value="selectone">Select One</option>
                                        <option value="multiple select">Multiple Select</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => deletebtn(index)}
                                        className="text-xl rounded-full  h-12 w-15 bg-[#252525] text-[#red] "
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                        <label className="block font-urbanist font-[600]  text-[20px] -mb-2">Add sponsors</label>

                        <div className="flex flex-wrap gap-6 w-300 ">

                            <div className="w-[320px] h-[180px] bg-[#252525] backdrop-blur-md rounded-[15px] p-2 flex gap-2  shadow-md"
                            >
                                {/* Left: Sponsor Image Upload */}
                                <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-[#1A1A1A] overflow-hidden">
                                    <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-[#1A1A1A] overflow-hidden relative">
                                        <label className="cursor-pointer text-white text-xs text-center px-2 py-1">
                                            Sponsor image
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"

                                            />
                                        </label>
                                    </div>

                                </div>

                                {/* Right: Sponsor Details */}
                                <div className="flex-1 h-full flex flex-col justify-between gap-1">
                                    <input
                                        name="name"
                                        readOnly
                                        className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                                        placeholder="Sponsor name"
                                    />
                                    <input
                                        name="title"
                                        readOnly
                                        className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                                        placeholder="Sponsor title"
                                    />
                                    <input
                                        name="website"
                                        readOnly
                                        className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                                        placeholder="Sponsor website"
                                    />
                                </div>
                            </div>


                            {/* New sponsor input */}
                            <div className="w-[320px] h-[180px] bg-[#252525] backdrop-blur-md rounded-[15px] p-2 flex gap-2  shadow-md">
                                {/* Left: Image Upload */}
                                <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-[#1A1A1A] overflow-hidden">
                                    <div className="w-[120px] h-full flex items-center justify-center rounded-[10px] bg-[#1A1A1A] overflow-hidden relative">
                                        <label className="cursor-pointer text-white text-xs text-center px-2 py-1">
                                            Sponsor image
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"

                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Right: Sponsor Input Fields */}
                                <div className="flex-1 h-full flex flex-col justify-between gap-1">
                                    <input
                                        name="name"

                                        className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                                        placeholder="Sponsor name"
                                    />
                                    <input
                                        name="title"

                                        className="h-[40px] bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                                        placeholder="Sponsor title"
                                    />
                                    <div className="flex gap-1">
                                        <input
                                            name="website"

                                            className="h-[40px] flex-1 bg-[#1A1A1A] rounded-[10px] px-2 py-1 text-white text-xs shadow-sm"
                                            placeholder="Sponsor website"
                                        />

                                    </div>
                                </div>

                            </div>
                            <div className='h-full flex content-center flex-wrap'>
                                <button
                                    type="button"
                                    className="w-[40px] h-[40px] rounded-full bg-[#252525] flex items-center justify-center text-[#565656] text-xl shadow-md hover:bg-pink-600 transition-all"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </form>

                );
            case 1:
                return (
                    <form className="max-w-2xl m-0 flex flex-col gap-6">
                        <div>
                            <label className="block font-urbanist font-[600] text-[20px] mb-2">Enter Judge details</label>
                            <div className="flex gap-4">
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='font-urbanist font-[700] text-[16px] text-[#A4A4A4]   '>Name</label>
                                    <input className='w-80 pl-4 bg-[#252525] text-[#565656] py-2 rounded-lg font-urbanist text-[20px] font-[600] '
                                        placeholder='Enter position' />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='font-urbanist font-[700] text-[16px] text-[#A4A4A4]   '>Mobile</label>
                                    <input className='w-80 pl-4 bg-[#252525] text-[#565656] py-2 rounded-lg font-urbanist text-[20px] font-[600] '
                                        placeholder='Enter position' />
                                </div>

                            </div>

                            <div className="flex gap-4 mt-8">
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='font-urbanist font-[700] text-[16px] text-[#A4A4A4]   '>About</label>
                                    <input className='w-80 pl-4 bg-[#252525] text-[#565656] py-2 rounded-lg font-urbanist text-[20px] font-[600] '
                                        placeholder='Enter position' />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='font-urbanist font-[700] text-[16px] text-[#A4A4A4]   '>E-mail</label>
                                    <input className='w-80 pl-4 bg-[#252525] text-[#565656] py-2 rounded-lg font-urbanist text-[20px] font-[600] '
                                        placeholder='Enter position' />
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='font-urbanist font-[700] text-[16px] text-[#A4A4A4] mb-2   '>Add  photo</label>
                            <div className="w-64 h-64 bg-[#232323] rounded-2xl flex flex-col items-center justify-center border-2 border-[#232323] hover:border-[#E6FF4C] transition-colors cursor-pointer">
                                <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500 mb-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16V6a2 2 0 012-2h14a2 2 0 012 2v10M3 16l4-4a2 2 0 012.828 0l2.586 2.586a2 2 0 002.828 0L21 10M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2" /></svg>
                                <span className="text-[#818181] font-urbanist font-[700]  text-[14px] text-center">Click Here or Drag & drop<br /><span className='font-[400]'>JPEG/PNG/SVG format allowed</span></span>
                            </div>
                        </div>
                    </form>
                );
            case 2:
                return (
                    <form className="max-w-2xl  flex flex-col gap-6">
                        <button
                            type="button"
                            className="rounded-full  absolute top-10 h-12 right-10 w-12 bg-[#252525] text-[#565656] text-[20px]"
                            onClick={submit}
                        >
                            +
                        </button>
                        <label htmlFor="block font-urbanist font-[600]  w-full text-[20px] mb-2">Assign parameters</label>
                        <div className='min-h-50'>
                            {twofield.map((pair, index) => (
                                <div key={index} className='flex gap-6 w-400  flex-wrap content-center'>
                                    <div className='flex flex-col gap-2  '>
                                        <label className="block font-urbanist font-[600] text-[#A4A4A4] w-full text-[18px] ">Parameter</label>
                                        <input
                                            value={pair.input1}
                                            onChange={e => handlechange(index, 'input1', e.target.value)} type="text" placeholder="Enter position" className="appearance-none w-full bg-[#252525] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 text-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className="block font-urbanist font-[600] w-full text-[#A4A4A4] text-[18px] ">Weightage</label>
                                        <input
                                            value={pair.input3}
                                            onChange={e => handlechange(index, 'input3', e.target.value)} type="text" placeholder="Enter position" className="appearance-none w-full bg-[#252525] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 text-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => deletefield(index)}
                                        className="text-xl rounded-lg  h-12 px-10 w-50 mt-9 bg-[#252525] text-[#red] "
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="rounded-full  absolute top-70 h-12 right-10 w-12 bg-[#252525] text-[#565656] text-[20px]"
                            onClick={roundsubmit}
                        >
                            +
                        </button>
                        <label htmlFor="block font-urbanist font-[600]  w-full text-[20px] mb-2">Add Round</label>
                        <div className='min-h-50'>
                            {round.map((pair, index) => (
                                <div key={index} className='flex gap-6 w-400  flex-wrap content-center'>
                                    <div className='flex flex-col gap-2  '>
                                        <label className="block font-urbanist font-[600] text-[#A4A4A4] w-full text-[18px] ">Round 1</label>
                                        <input
                                            value={pair.input1}
                                            onChange={e => handelroundedit(index, 'input1', e.target.value)} type="text" placeholder="Enter position" className="appearance-none w-full bg-[#252525] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 text-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className="block font-urbanist font-[600] w-full text-[#A4A4A4] text-[18px] ">Selected number candidates</label>
                                        <input
                                            value={pair.input2}
                                            onChange={e => handelroundedit(index, 'input2', e.target.value)} type="text" placeholder="Enter position" className="appearance-none w-full bg-[#252525] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 text-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C]" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handlerounddelete(index)}
                                        className="text-xl rounded-lg  h-12 px-10 w-50 mt-9 bg-[#252525] text-[#red] "
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </form>
                );
            case 3:
                return (
                    <div className="max-w-5xl  flex flex-col gap-6">
                        <label className="block font-urbanist font-[600] text-[#818181] text-[16px] mb-2">Make An Organizing Team assign roles</label>
                        <div className='flex content-center flex-wrap gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label className="block font-urbanist font-[700] text-[#A4A4A4] text-[18px] mb-2">Role</label>
                                <select name="" id="" className='bg-[#252525] px-4 py-2 w-70 rounded-lg h-12 text-[#565656] font-urbanist font-[600] text-[20px]'>
                                    <option className='font-urbanist bg-[#1A1A1A] text-[#565656] hover:text-white font-[600] text-[20px] ' value="">Enter Position</option>
                                    <option className='font-urbanist bg-[#1A1A1A] text-[#565656] hover:text-white font-[600] text-[20px] ' value="">Event Coordinator</option>
                                    <option className='font-urbanist bg-[#1A1A1A] text-[#565656] hover:text-white font-[600] text-[20px] ' value="">Event Manager</option>
                                    <option className='font-urbanist bg-[#1A1A1A] text-[#565656] hover:text-white font-[600] text-[20px] ' value="">Volunteer</option>
                                    <option className='font-urbanist bg-[#1A1A1A] text-[#565656] hover:text-white font-[600] text-[20px] ' value="">Organizing team</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className="block font-urbanist font-[700] text-[#A4A4A4] text-[18px] mb-2">Name</label>
                                <input type="text" className='bg-[#252525] px-4 py-2 w-70 rounded-lg h-12 text-[#565656] font-urbanist font-[600] text-[20px]'
                                    placeholder='Enter Name' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className="block font-urbanist font-[700] text-[#A4A4A4] text-[18px] mb-2">E-mail ID</label>
                                <input type="text" className='bg-[#252525] px-4 py-2 w-70 rounded-lg h-12 text-[#565656] font-urbanist font-[600] text-[20px]'
                                    placeholder='E-mail' />
                            </div>
                        </div>
                    </div>
                );

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
                                        <span className={`w-2 h-2 rounded-full bg-[#E6FF4C]`}></span>
                                    </span>
                                    <span className={`text-sm font-urbanist text-[14px] font-[600]`}>{step.label}</span>
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
                                    <span className="w-2 h-2 bg-[#E6FF4C] rounded-full  "></span>
                                </span>
                                <span className="text-sm font-urbanist text-[14px] font-[600] ">Pricing</span>
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
                            {addOns.map((item, idx) => (
                                <li key={item.label} className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center ">
                                        <span className={`w-2 h-2 bg-[#181818] rounded-full  ${idx <= currentStep ? 'bg-[#E6FF4C]' : ''}`}></span>
                                    </span>
                                    <span className={`text-sm font-urbanist text-[14px] font-[600] ${idx <= currentStep ? 'text-white' : 'text-gray-400'}`}>{item.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-auto text-[#E6FF4C] font-bold text-lg">
                        Page <span className="text-white">1</span> out of 5
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
                            onClick={handleback}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="bg-[#0050FF] text-[#E6FF4C] font-bold text-lg px-12 py-3 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors"
                            onClick={handleNext}
                        >
                            {currentStep === addOns.length - 1 ? 'Submit' : 'Next'}
                        </button>

                    </div>
                </main>
            </div>
        </div>
    );
} 