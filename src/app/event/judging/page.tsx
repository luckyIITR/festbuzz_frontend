'use client';

import Image from 'next/image';
import image from '../../../../public/assets/CardImage.png'
const judges = [
  {
    name: 'Judge Name',
    imageUrl: image, // Place this image inside `public/images`
  },
  {
    name: 'Judge Name',
    imageUrl: image,
  },
  {
    name: 'Judge Name',
    imageUrl: image,
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-black p-10 flex gap-6  flex-wrap">
      {judges.map((judge, index) => (
        <div
          key={index}
          className="bg-[#181818] rounded-xl w-64 h-70 shadow-lg overflow-hidden flex flex-col items-center text-white"
        >
          <Image
            src={judge.imageUrl}
            alt={judge.name}
            width={256}
            height={100}
            className="object-cover w-full h-40"
          />
          <div className="p-4 w-full text-center">
            <h3 className="text-lg text-left font-urbanist font-semibold mb-4">{judge.name}</h3>
            <button className="bg-[#313131] font-urbanist text-white px-6 py-1 rounded-full w-full hover:bg-[#333] transition-all">
              Manage details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
