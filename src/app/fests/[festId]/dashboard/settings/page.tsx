import React from 'react'
import Image from 'next/image'
import edit from '../../../../../../public/assets/edit.png'
const page = () => {
    return (
        <div>
            <div className='flex justify-between flex-wrap content-center '>
                <div className='font-urbanist font-[600] text-[20px]  '>Organizing team</div>
                <div className='px-3 py-3 bg-[#191919] rounded-full'> <Image src={edit} alt='' /></div>
            </div>
            <div className='flex justify-between flex-wrap content-center gap-2 mt-4 flex-col md:flex-row '>
                {[1, 2, 3, 4].map((i:number) => (
                    <div key={i} className='flex justify-between content-center gap-3 bg-[#1E1E1E]  p-4 rounded-2xl'>
                        <div className='px-9 rounded-full bg-white'></div>
                        <div className='flex flex-col'>
                            <div className='font-urbanist font-[600] text-[#9E9E9E] text-[14px] '>Festival Head</div>

                            <div className='font-urbanist font-[600] text-[20px]'>Nitin Sahu</div>
                            <div className='font-urbanist font-[600] text-[#9E9E9E] text-[14px]'>91+ 1234567890</div>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className='mt-10 w-45 text-center font-urbanist font-[700] rounded-2xl px-4 py-2 bg-[#1E1E1E]'> Add new member +</div>
        </div>
    )
}

export default page
