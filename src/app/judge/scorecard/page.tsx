import React from 'react';
import { Star } from 'lucide-react';

const DancingScoreCard = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden p-6">
                <div className="text-sm text-[#E1FF01] font-medium mb-1">Music Festival</div>
                <h1 className="text-3xl font-bold text-[#FD3EB5]">Dancing on Floor</h1>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-white text-sm font-medium mb-2 mt-5">Name</label>
                        <input
                            type="text"
                            defaultValue="Neha Gupta"
                            className="w-full bg-[#2C2C2C] text-[#E1FF01] rounded-lg px-4 py-3    outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Institute name</label>
                        <input
                            type="text"
                            defaultValue="IIT Bombay, Maharashtra"
                            className="w-full bg-[#2C2C2C] text-[#E1FF01] rounded-lg px-4 py-3    outline-none transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#F659BB] mt-10">Score card</h2>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Coordination (20%)</span>
                            <div className="bg-[#FFFFFF] px-3 py-1 rounded-full">
                                <span className="text-black text-sm font-bold">8/10</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 ${star <= 8 ? 'fill-[#E1FF01] text-[#E1FF01]' : 'fill-gray-600 text-gray-600'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Timing (20%)</span>
                            <div className="bg-[#FFFFFF] px-3 py-1 rounded-full">
                                <span className="text-black text-sm font-bold">5/10</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 ${star <= 5 ? 'fill-[#E1FF01] text-[#E1FF01]' : 'fill-gray-600 text-gray-600'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Rhythm (20%)</span>
                            <div className="bg-[#FFFFFF] px-3 py-1 rounded-full">
                                <span className="text-black text-sm font-bold">7/10</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 ${star <= 7 ? 'fill-[#E1FF01] text-[#E1FF01]' : 'fill-gray-600 text-gray-600'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Expression (20%)</span>
                            <div className="bg-[#FFFFFF] px-3 py-1 rounded-full">
                                <span className="text-black text-sm font-bold">6/10</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 ${star <= 6 ? 'fill-[#E1FF01] text-[#E1FF01]' : 'fill-gray-600 text-gray-600'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-bold text-pink-400 mt-10">Remarks (if any)</h3>
                    <textarea
                        placeholder="Write here..."
                        className="w-full bg-[#2C2C2C] text-white rounded-lg px-4 py-3  outline-none transition-colors resize-none h-24"
                    />
                </div>

                <div className="flex items-center justify-between py-4 border-t border-gray-600">
                    <span className="text-xl font-bold text-pink-400">Total Score</span>
                    <span className="text-2xl font-bold text-[#E1FF01]">130.0 pts</span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default DancingScoreCard;