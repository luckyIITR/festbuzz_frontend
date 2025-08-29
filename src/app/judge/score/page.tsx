'use client';
import { useState } from "react";
import { Search, Plus, ArrowLeft } from "lucide-react";

type Participant = {
    rank: string;
    name: string;
    college: string;
    points: string;
};

const Page = () => {
    const [participants, setParticipants] = useState<Participant[]>([
        { rank: '1st', name: 'Participant Name', college: 'IIT Bombay, Maharashtra', points: '59.4' },
        { rank: '2nd', name: 'Participant Name', college: 'IIT Bombay, Maharashtra', points: '59.4' },
        { rank: '3rd', name: 'Participant Name', college: 'IIT Bombay, Maharashtra', points: '59.4' },
        { rank: '4th', name: 'Participant Name', college: 'IIT Bombay, Maharashtra', points: '59.4' },
        { rank: '5th', name: 'Participant Name', college: 'IIT Bombay, Maharashtra', points: '59.4' },
        { rank: '6th', name: 'Participant Name', college: 'IIT Bombay, Maharashtra', points: '59.4' },
        { rank: '7th', name: 'Participant Name', college: 'IIT Bombay, Maharashtra', points: '59.4' },
        { rank: '8th', name: 'Participant Name', college: 'IIT Bombay, Maharashtra', points: '59.4' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handlePointsChange = (index: number, value: string) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index].points = value;
        setParticipants(updatedParticipants);
    };

    const handleSubmit = () => {
        console.log('Submitting scores:', participants);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans px-10">
            <div className="p-">
                <div className="bg-[#007BFF] rounded-lg px-4 py-3 mb-4 flex items-center">
                    <ArrowLeft className="text-[#E1FF01] w-5 h-5 mr-3" />
                    <h1 className="text-[#E1FF01] font-semibold text-lg flex-1 text-center mr-8">
                        Dancing on the floor
                    </h1>
                </div>

                <div className="text-center mb-6">
                    <span className="text-[#E1FF01] font-bold text-lg">Round 1 - Top 8</span>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#1B1B1B] text-white pl-10 pr-4 py-2 rounded-lg border-none outline-none w-48"
                        />
                    </div>

                    <button className="flex items-center gap-2 text-white font-medium text-sm">
                        <span>Add participants</span>
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[600px] ">
                    <div className="bg-[#2D2D2D] px-4 py-3 mx-4 rounded-t-lg mb-2">
                        <div className="grid grid-cols-4 gap-4 text-white  md:text-lg text-sm  font-urbanist font-[700]">
                            <div>Rank</div>
                            <div>Participant</div>
                            <div>College</div>
                            <div>Points</div>
                        </div>
                    </div>

                    <div className=" mx-4 rounded-b-lg font-urbanist font-[700]   ">
                        {participants.map((participant, index) => (
                            
                            <div key={index} className="px-4 py-3  bg-[#171717] mb-2 ">
                                <div className="grid grid-cols-4 gap-4 items-center text-sm  ">
                                    <div className="text-white font-medium">
                                        {participant.rank}
                                    </div>

                                    <div className="text-white">
                                        {participant.name}
                                    </div>

                                    <div className="text-white">
                                        {participant.college}
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={participant.points}
                                            onChange={(e) => handlePointsChange(index, e.target.value)}
                                            className="bg-transparent text-[#85FA9F] font-semibold outline-none border-none w-12 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-4 mt-8 pb-8 mx-auto w-50">
                <button
                    onClick={handleSubmit}
                    className="bg-[#0248F7] hover:bg-[#0056b3] font-[700] text-[#E1FF01] px-8 py-3 rounded-full  transition-colors w-full"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Page;