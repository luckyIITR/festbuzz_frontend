'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Image from 'next/image';
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


interface Judge {
    name: string;
    mobile: string;
    about: string;
    email: string;
    photo?: File | null;
}

interface TeamMember {
    role: string;
    name: string;
    email: string;
}


export default function AddOnsPage() {
    const [sponsors, setSponsors] = useState([
        { name: '', title: '', website: '', image: null }
    ]);
    const addSponsor = () => {
        setSponsors(prev => [...prev, { name: '', title: '', website: '', image: null }]);
    };

    const handleSponsorChange = (index: number, field: keyof typeof sponsors[0], value: string | File) => {
        setSponsors(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const deleteSponsor = (index: number) => {
        setSponsors(prev => prev.filter((_, i) => i !== index));
    };

    const [Inputfield, setInputfields] = useState([{ input1: '', select: '' }]);
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();
    const festId = useParams().festId;

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
            // } else {
            //     router.push('/event/pricing');
            // }
        }
    };

    const handleback = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => Math.max(prev - 1, 0));
        } else {
            if (festId) {
                router.push(`/fests/${festId}/add-event/pricing`);
            }

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
        prev[index][field] = value;   // ✅ Change 'round' to 'prev'
        setround(prev);
    }
    const handlerounddelete = (index: number) => {
        setround(prev => prev.filter((_, i) => i !== index))
    }



    const [judges, setJudges] = useState<Judge[]>([
        { name: '', mobile: '', about: '', email: '', photo: null }
    ]);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [visibility, setVisibility] = useState('open');
    const handleChange = (
        index: number,
        field: keyof Judge,
        value: string | File | null
    ) => {
        const updatedJudges = [...judges];

        if (field === 'photo' && (value instanceof File || value === null)) {
            updatedJudges[index].photo = value;
        } else if (typeof value === 'string' && field !== 'photo') {
            updatedJudges[index][field] = value;
        }

        setJudges(updatedJudges);
    };



    const addJudge = () => {
        setJudges([...judges, { name: '', mobile: '', about: '', email: '', photo: null }]);
    };

    const removeJudge = (index: number) => {
        const updatedJudges = judges.filter((_, i) => i !== index);
        setJudges(updatedJudges);
    };


    const [team, setTeam] = useState<TeamMember[]>([
        { role: '', name: '', email: '' },
    ]);

    const handleChangeteam = (index: number, field: keyof TeamMember, value: string) => {
        const updated = [...team];
        updated[index][field] = value;
        setTeam(updated);
    };

    const addMember = () => {
        setTeam([...team, { role: '', name: '', email: '' }]);
    };

    const removeMember = (index: number) => {
        setTeam(team.filter((_, i) => i !== index));
    };
    function renderStepContent() {
        switch (currentStep) {
            case 0:
                return (
                    <form className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-4 sm:gap-6">
                        <label className="block font-urbanist font-[600] text-xs sm:text-sm md:text-base text-[#818181]">
                            Create Form for extra information you require from participant
                        </label>

                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4'>
                            <label className="block font-urbanist font-[600] text-base sm:text-lg md:text-xl">
                                Enter question here
                            </label>
                            <button
                                type="button"
                                className="rounded-full px-3 py-2 sm:px-4 sm:py-2 bg-[#252525] flex items-center justify-center text-[#565656] text-lg sm:text-xl shadow-md transition-all hover:bg-[#303030] self-end sm:self-auto"
                                onClick={handlesubmit}
                            >
                                +
                            </button>
                        </div>

                        <div className='min-h-60 sm:min-h-80'>
                            {Inputfield.map((pair, index) => (
                                <div key={index} className='flex gap-4'>
                                    <div  className="flex flex-col  md:w-150 sm:flex-row gap-2 sm:gap-3 md:gap-4 min-w-0 items-stretch sm:items-center mb-3 sm:mb-4 p-2 sm:p-0">
                                        <input
                                            type="text"
                                            placeholder="Write here"
                                            value={pair.input1}
                                            onChange={e => handledit(index, 'input1', e.target.value)}
                                            className="flex-1 bg-[#252525] rounded-lg px-3 py-2 sm:px-4 sm:py-3 font-urbanist font-[600] text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-[#E6FF4C] text-sm sm:text-base transition-all"
                                        />
                                        <select
                                            value={pair.select}
                                            onChange={e => handledit(index, 'select', e.target.value)}
                                            className="w-full sm:w-36 md:w-40 lg:w-44 bg-[#252525] rounded-lg text-white px-3 py-2 sm:px-4 sm:py-3 font-urbanist text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4C] transition-all"
                                        >
                                            <option value="">Input Type</option>
                                            <option value="text">Text</option>
                                            <option value="date">Date</option>
                                            <option value="time">Time</option>
                                            <option value="upload">Upload</option>
                                            <option value="selectone">Select One</option>
                                            <option value="multiple select">Multiple Select</option>
                                        </select>

                                    </div>
                                    <button
                                        onClick={() => deletebtn(index)}
                                        className="text-red-500 text-lg sm:text-xl mb-4 px-4 font-bold hover:text-red-600 bg-[#252525] hover:bg-[#303030]  rounded-full self-center sm:self-auto transition-all  sm:w-auto sm:h-auto flex items-center justify-center"
                                        title="Remove row"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 w-full pt-4 border-t border-[#333333]'>
                            <label className="block font-urbanist font-[600] text-base sm:text-lg md:text-xl">
                                Add sponsors
                            </label>
                            <button
                                type="button"
                                onClick={addSponsor}
                                className="px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-[#252525] flex items-center justify-center text-[#565656] text-xl shadow-md transition-all hover:bg-[#303030] self-end sm:self-auto"
                            >
                                +
                            </button>
                        </div>

                        {/* Enhanced responsive sponsor grid */}
                        <div className="-ml-10 md:ml-0 grid grid-cols-1 xs:grid-cols-1  sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full">
                            {sponsors.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="w-full min-w-[360px] sm:max-w-none mx-auto sm:mx-0 h-[160px] sm:h-[180px] md:h-[200px] bg-[#252525] backdrop-blur-md rounded-[12px] sm:rounded-[15px] p-2  sm:p-3 flex gap-2 shadow-md relative hover:shadow-lg transition-all"
                                >
                                    {/* Left: Image Upload */}
                                    <div className="w-[100px] sm:w-[120px] md:w-[130px] h-full flex items-center justify-center rounded-[8px] sm:rounded-[10px] bg-[#1A1A1A] overflow-hidden flex-shrink-0">
                                        <label className="cursor-pointer text-white text-xs text-center px-1 py-1 relative w-full h-full flex items-center justify-center hover:bg-[#222222] transition-colors">
                                            {sponsor.image ? (
                                                <Image src={URL.createObjectURL(sponsor.image)} alt="preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-center leading-tight text-[10px] sm:text-xs">Sponsor image</span>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleSponsorChange(index, 'image', file);
                                                }}
                                            />
                                        </label>
                                    </div>

                                    {/* Right: Text Fields */}
                                    <div className="flex-1 h-full  flex flex-col justify-between gap-1 sm:gap-2 min-w-50 pr-6 sm:pr-8">
                                        <input
                                            value={sponsor.name}
                                            onChange={(e) => handleSponsorChange(index, 'name', e.target.value)}
                                            className="h-[32px] sm:h-[36px] md:h-[40px] bg-[#1A1A1A] rounded-[8px] sm:rounded-[10px] px-2 py-1 text-white text-[10px] sm:text-xs shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#E6FF4C] transition-all"
                                            placeholder="Sponsor name"
                                        />
                                        <input
                                            value={sponsor.title}
                                            onChange={(e) => handleSponsorChange(index, 'title', e.target.value)}
                                            className="h-[32px] sm:h-[36px] md:h-[40px] bg-[#1A1A1A] rounded-[8px] sm:rounded-[10px] px-2 py-1 text-white text-[10px] sm:text-xs shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#E6FF4C] transition-all"
                                            placeholder="Sponsor title"
                                        />
                                        <input
                                            value={sponsor.website}
                                            onChange={(e) => handleSponsorChange(index, 'website', e.target.value)}
                                            className="h-[32px] sm:h-[36px] md:h-[40px] bg-[#1A1A1A] rounded-[8px] sm:rounded-[10px] px-2 py-1 text-white text-[10px] sm:text-xs shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#E6FF4C] transition-all"
                                            placeholder="Sponsor website"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => deleteSponsor(index)}
                                        className="absolute top-1 right-1 sm:top-2 sm:right-2 text-red-500 text-lg sm:text-xl font-bold hover:text-red-600 bg-[#1A1A1A] hover:bg-[#333333] rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all"
                                        title="Remove sponsor"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </form>
                );
            case 1:
                return (
                    <form className="max-w-4xl m-0 flex flex-col gap-6 px-4 sm:px-6">
                        {judges.map((_, index) => (
                            <div key={index}>
                                <div className='flex justify-between w-full items-center mb-4'>
                                    <label className="block font-urbanist font-[600] text-lg sm:text-[20px] mb-2">
                                        Enter Judge details {judges.length > 1 ? `- ${index + 1}` : ''}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => removeJudge(index)}
                                        className="text-red-500 text-xl font-bold hover:text-red-600 px-3 py-2 sm:px-4 bg-[#252525] rounded-full flex-shrink-0"
                                        title="Remove judge"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* Name and Mobile Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex flex-col">
                                        <label className="font-urbanist font-[700] text-sm sm:text-[16px] text-[#A4A4A4] mb-2">Name</label>
                                        <input
                                            className="w-full pl-4 bg-[#252525] text-white placeholder-[#565656] py-2 sm:py-3 rounded-lg font-urbanist text-lg sm:text-[20px] font-[600]"
                                            placeholder="Enter name"
                                            value={judges[index].name}
                                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-urbanist font-[700] text-sm sm:text-[16px] text-[#A4A4A4] mb-2">Mobile</label>
                                        <input
                                            className="w-full pl-4 bg-[#252525] text-white placeholder-[#565656] py-2 sm:py-3 rounded-lg font-urbanist text-lg sm:text-[20px] font-[600]"
                                            placeholder="Enter mobile number"
                                            value={judges[index].mobile}
                                            onChange={(e) => handleChange(index, 'mobile', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* About and Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex flex-col">
                                        <label className="font-urbanist font-[700] text-sm sm:text-[16px] text-[#A4A4A4] mb-2">About</label>
                                        <input
                                            className="w-full pl-4 bg-[#252525] text-white placeholder-[#565656] py-2 sm:py-3 rounded-lg font-urbanist text-lg sm:text-[20px] font-[600]"
                                            placeholder="Enter about"
                                            value={judges[index].about}
                                            onChange={(e) => handleChange(index, 'about', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-urbanist font-[700] text-sm sm:text-[16px] text-[#A4A4A4] mb-2">E-mail</label>
                                        <input
                                            className="w-full pl-4 bg-[#252525] text-white placeholder-[#565656] py-2 sm:py-3 rounded-lg font-urbanist text-lg sm:text-[20px] font-[600]"
                                            placeholder="Enter email"
                                            value={judges[index].email}
                                            onChange={(e) => handleChange(index, 'email', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Photo Upload Section */}
                                <div className="flex flex-col">
                                    <label className="font-urbanist font-[700] text-sm sm:text-[16px] text-[#A4A4A4] mb-2">Add photo</label>
                                    <div className="w-full max-w-xs sm:max-w-sm md:w-64 h-48 sm:h-56 md:h-64 bg-[#232323] rounded-2xl flex flex-col items-center justify-center border-2 border-[#232323] hover:border-[#E6FF4C] transition-colors cursor-pointer mx-auto md:mx-0">
                                        <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500 mb-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M3 16V6a2 2 0 012-2h14a2 2 0 012 2v10M3 16l4-4a2 2 0 012.828 0l2.586 2.586a2 2 0 002.828 0L21 10M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
                                        </svg>
                                        <span className="text-[#818181] font-urbanist font-[700] text-xs sm:text-[14px] text-center px-4">
                                            Click Here or Drag & drop
                                            <br />
                                            <span className="font-[400]">JPEG/PNG/SVG format allowed</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addJudge}
                            className="mt-4 w-full sm:w-fit px-6 py-3 bg-[#E6FF4C] text-black font-bold rounded-lg text-center"
                        >
                            + Add Another Judge
                        </button>
                    </form>
                ); case 2:
                return (
                    <form className="max-w-6xl flex flex-col gap-6 relative">
                        <div className='w-full flex justify-between content-center flex-wrap items-center'>

                            <label className="font-urbanist font-[600]  text-[20px] mb-2">Assign parameters</label>
                            <button
                                type="button"
                                className="rounded-full  px-4 py-2 bg-[#252525] text-[#565656] text-[20px]"
                                onClick={submit}
                            >
                                +
                            </button>
                        </div>

                        <div className="min-h-50">
                            {twofield.map((pair, index) => (
                                <div key={index} className="flex gap-6 w-full flex-wrap content-center">
                                    {/* Parameter Field */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block font-urbanist font-[600] text-[#A4A4A4] w-full text-[18px]">
                                            Parameter
                                        </label>
                                        <input
                                            value={pair.input1}
                                            onChange={(e) => handlechange(index, 'input1', e.target.value)}
                                            type="text"
                                            placeholder="Enter parameter"
                                            className="appearance-none w-full bg-[#252525] text-white placeholder-[#565656] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E6FF4C] mb-2"
                                        />
                                    </div>

                                    {/* Weightage Field */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block font-urbanist font-[600] text-[#A4A4A4] w-full text-[18px]">
                                            Weightage
                                        </label>
                                        <input
                                            value={pair.input3}
                                            onChange={(e) => handlechange(index, 'input3', e.target.value)}
                                            type="text"
                                            placeholder="Enter weightage"
                                            className="appearance-none w-full bg-[#252525] text-white placeholder-[#565656] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E6FF4C] mb-2"
                                        />
                                    </div>

                                    {/* Delete Field Button */}
                                    <button
                                        type="button"
                                        onClick={() => deletefield(index)}
                                        className="text-xl rounded-full px-4 py-2  mt-9 mb-2 bg-[#252525] text-red-500"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className='w-full flex justify-between content-center flex-wrap items-center'>

                            <label className="font-urbanist font-[600]  text-[20px] mb-2">Add Round</label>

                            <button
                                type="button"
                                className="rounded-full   px-4 py-2 bg-[#252525] text-[#565656] text-[20px]"
                                onClick={roundsubmit}
                            >
                                +
                            </button>

                        </div>
                        <div className="min-h-50">
                            {round.map((pair, index) => (
                                <div key={index} className="flex gap-6 w-full flex-wrap content-center">
                                    {/* Round Name */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block font-urbanist font-[600] text-[#A4A4A4] w-full text-[18px]">
                                            Round {index + 1}
                                        </label>
                                        <input
                                            value={pair.input1}
                                            onChange={(e) => handelroundedit(index, 'input1', e.target.value)}
                                            type="text"
                                            placeholder="Enter round name"
                                            className="appearance-none w-full bg-[#252525] text-white placeholder-[#565656] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E6FF4C] mb-2"
                                        />
                                    </div>

                                    {/* Candidates */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block font-urbanist font-[600] text-[#A4A4A4] w-full text-[18px]">
                                            Selected number candidates
                                        </label>
                                        <input
                                            value={pair.input2}
                                            onChange={(e) => handelroundedit(index, 'input2', e.target.value)}
                                            type="text"
                                            placeholder="Enter number"
                                            className="appearance-none w-full bg-[#252525] text-white placeholder-[#565656] font-urbanist font-[600] rounded-lg px-4 py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E6FF4C] mb-2"
                                        />
                                    </div>

                                    {/* Delete Round Button */}
                                    <button
                                        type="button"
                                        onClick={() => handlerounddelete(index)}
                                        className="text-xl rounded-full px-4 py-2 mt-9 mb-2 bg-[#252525] text-red-500"
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
                    <div className="max-w-5xl flex flex-col gap-6">
                        {/* Heading + Add Member */}
                        <div className="flex w-full justify-between items-center flex-wrap">
                            <label className="block font-urbanist font-[600] text-[#818181] text-[16px] mb-2">
                                Make An Organizing Team assign roles
                            </label>
                            <button
                                type="button"
                                onClick={addMember}
                                className="px-4 py-1 bg-[#E6FF4C] text-black rounded-lg w-fit font-urbanist"
                            >
                                + Add Member
                            </button>
                        </div>

                        {/* Team Members Loop */}
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="flex content-center flex-wrap gap-4 items-start relative p-4 rounded-xl"
                            >
                                {/* Role Select */}
                                <div className="flex flex-col gap-2">
                                    <label className="block font-urbanist font-[700] text-[#A4A4A4] text-[18px] mb-2">
                                        Role
                                    </label>
                                    <select
                                        value={member.role}
                                        onChange={(e) => handleChangeteam(index, 'role', e.target.value)}
                                        className="bg-[#252525] px-4 py-2 w-70 rounded-lg h-12 text-white placeholder-[#565656] font-urbanist font-[600] text-[20px]"
                                    >
                                        <option className="text-[#565656]" value="">
                                            Enter Position
                                        </option>
                                        <option>Event Coordinator</option>
                                        <option>Event Manager</option>
                                        <option>Volunteer</option>
                                        <option>Organizing team</option>
                                    </select>
                                </div>

                                {/* Name Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="block font-urbanist font-[700] text-[#A4A4A4] text-[18px] mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={member.name}
                                        onChange={(e) => handleChangeteam(index, 'name', e.target.value)}
                                        placeholder="Enter Name"
                                        className="bg-[#252525] px-4 py-2 w-70 rounded-lg h-12 text-white placeholder-[#565656] font-urbanist font-[600] text-[20px]"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="block font-urbanist font-[700] text-[#A4A4A4] text-[18px] mb-2">
                                        E-mail ID
                                    </label>
                                    <input
                                        type="email"
                                        value={member.email}
                                        onChange={(e) => handleChangeteam(index, 'email', e.target.value)}
                                        placeholder="E-mail"
                                        className="bg-[#252525] px-4 py-2 w-70 rounded-lg h-12 text-white placeholder-[#565656] font-urbanist font-[600] text-[20px]"
                                    />
                                </div>

                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={() => removeMember(index)}
                                    className="px-4 py-2 bg-[#252525] mt-11 rounded-full text-red-500 text-xl font-bold"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
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
                <button
                    className="lg:hidden fixed top-16 sm:top-20 left-2 sm:left-4 z-50 bg-[#181818] text-white p-2 sm:p-3 rounded-xl shadow-lg"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Overlay for mobile */}
                {isMobileMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
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
                    <div className='h-10 md:h-0 md:-mt-10 '> </div>

                    {/* Add Event Details Section */}
                    <div>
                        <button className="flex items-center content-center flex-wrap gap-2 w-full text-left text-white font-semibold mb-3 sm:mb-4 bg-[#313131] rounded-xl px-3 h-9 sm:h-10">
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[white] flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className='font-urbanist font-[700] text-sm sm:text-[17px] pt-[1px] truncate'>Add Event Details</span>
                        </button>
                        <ul className="ml-4 sm:ml-6 lg:ml-8 flex flex-col gap-2 sm:gap-3 mt-2">
                            {steps.map((step) => (
                                <li key={step.label} className="flex items-center gap-2">
                                    <span className={`w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center flex-shrink-0`}>
                                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E6FF4C]`}></span>
                                    </span>
                                    <span className={`text-xs sm:text-sm font-urbanist font-[600] truncate`}>{step.label}</span>
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h1v-4h1m-4 0h1v4h1" />
                                </svg>
                            </span>
                            <span className="truncate text-sm sm:text-[16px]">Add ons</span>
                        </button>
                        <ul className="ml-4 sm:ml-6 lg:ml-8 flex flex-col gap-2 sm:gap-3 mt-2">
                            {addOns.map((item) => (
                                <li key={item.label} className="flex items-center gap-2">
                                    <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#E6FF4C] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#181818] rounded-full ${currentStep >= addOns.indexOf(item) ? 'bg-[#E6FF4C]' : ''}`}></span>
                                    </span>
                                    <span className={`text-xs sm:text-sm font-urbanist font-[600] truncate ${currentStep >= addOns.indexOf(item) ? 'text-white' : 'text-gray-400'}`}>{item.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-auto text-[#E6FF4C] font-bold text-base sm:text-lg">
                        Page <span className="text-white">1</span> out of 5
                        <p className="text-xs text-gray-400 font-normal mt-1 leading-relaxed">You can easily manage these details later in manage event section.</p>
                    </div>
                </aside>
                {/* Form Section */}
                <main className="flex-1 flex flex-col p-10 relative">
                    {renderStepContent()}

                </main>
            </div>

            <div className="sticky bottom-0 py-4 px-8 flex justify-end gap-4 z-50">
                <button
                    type="button"
                    className="bg-[#0050FF] text-[#E6FF4C] font-bold text-lg px-8 py-2 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors"
                    onClick={handleback}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="bg-[#0050FF] text-[#E6FF4C] font-bold text-lg px-8 py-2 rounded-full shadow-lg hover:bg-[#003bb3] transition-colors"
                    onClick={handleNext}
                >

                    {currentStep === addOns.length - 1 ? 'Submit' : 'Next'}
                </button>

            </div>
        </div>
    );
} 