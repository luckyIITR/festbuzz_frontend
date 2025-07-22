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
                className="w-full bg-[#252525] font-urbanist font-[600]  backdrop-blur-md rounded-xl px-4 py-3 text-[#565656] shadow-md transition-all text-left"
            >
                {value || 'State / Union Territory'}
            </button>


            {open && (
                <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-auto  rounded-xl bg-[#252525] shadow-lg ring-1 ring-[#E1FF01] ring-opacity-30">
                    {statesAndUTs.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-2 text-white  cursor-pointer font-urbanist font-[600] text-[18px] "
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
