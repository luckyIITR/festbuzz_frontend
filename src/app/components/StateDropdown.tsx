'use client';

import React, { useState } from 'react';

const statesAndUTs = [
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
].sort();

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const StateDropdown: React.FC<Props> = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (val: string) => {
        onChange(val);
        setOpen(false);
    };

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white shadow-md focus:ring-2 focus:ring-lime-400 transition-all text-left"
            >
                {value || 'State / Union Territory'}
            </button>


            {open && (
                <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-xl bg-[#2e2e2e] shadow-lg ring-1 ring-lime-400 ring-opacity-30">
                    {statesAndUTs.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-2 text-white hover:bg-lime-600 cursor-pointer"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StateDropdown;
