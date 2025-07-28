import React from 'react'
import Image from 'next/image'
import fb from '../../../../public/assets/fb.png'
import insta from '../../../../public/assets/Insta.png'
import linkedin from '../../../../public/assets/linkedin.png'
const pages = () => {
  return (
    <div>
      <div className='w-full bg-[#181818] h-full min-h-180 mt-8 rounded-xl'>
        <div className='pl-8 text-[20px] pt-8 text-[#E1FF01] font-[500]'>Email</div>
        <div className='pl-8 text-[18px] pt-2  text-[#969696] font-[400]'>hi@festbuzz.in </div>
        <div className='pl-8 text-[18px] text-[#969696] font-[400]'> thefestbuzzgmail.com</div>
        <div className='flex gap-6 pl-8 pt-10'>
          <Image src={insta} alt='' className='h-8 w-8 object-cover' />
          <Image src={fb} alt='' className='h-8 object-cover' />
          <Image src={linkedin} alt='' className='h-8 w-8 object-cover' />
        </div>
        <div className='pl-8 text-[20px] pt-8 text-[#E1FF01] font-[500]'>Get in touch</div>
        <div className='flex flex-col gap-4 pl-8 pt-6 pr-10'>
          <input className='w-full h-14 px-4 rounded-xl bg-[#1D1D1D] font-urbanist font-[600] text-[#565656] placeholder:font-[600]'
            placeholder='Your full name'
            type='text' />
          <input className='w-full h-14 px-4 rounded-xl bg-[#1D1D1D] font-urbanist font-[600] text-[#565656] placeholder:font-[600]'
            placeholder='Your email'
            type='email' />

          <div className='flex w-full content-center justify-center flex-wrap gap-4'>
            <input type="text" placeholder='Your Message' className='h-40 w-5/6 bg-[#1D1D1D] rounded-xl text-[#565656] px-4' />
            <select name="" id="" className='w-45 bg-[#252525] h-10 rounded-xl pl-2 '>
              <option value="">Message Type</option>
              <option value="">Fest related</option>
              <option value="">Event related</option>
              <option value="">Payment related</option>
              <option value="">Account related</option>
              <option value="">Team related</option>
              <option value="">Multiple Select</option>
            </select>
          </div>

        </div>
        <button className='mx-8 mt-8 px-5 py-1 bg-[#0248F7] text-[#E1FF01] text-center rounded-xl'> Send</button>
      </div>

    </div>
  )
}

export default pages
