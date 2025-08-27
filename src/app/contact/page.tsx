import React from 'react'
import Image from 'next/image'
import pinkdiamond from '../../../public/assets/PinkDiamond.png'
import fb from '../../../public/assets/fb.png'
import insta from '../../../public/assets/Insta.png'
import linkedin from '../../../public/assets/linkedin.png'
import whiteDiamond from '../../../public/assets/WhiteDiamond.png'
import CallToAction from '../components/CallToAction'
const page = () => {
    return (
        <div className='min-h-screen p-6 text-white'>
            <div className='flex items-center gap-2 flex-wrap  '>
                <Image src={pinkdiamond} alt='' className='w-6 h-6' />
                <div className='font-clash font-[600] text-3xl uppercase '>Reach out to us</div>
            </div>
            <div className='font-urbanist font-[600] text-[#969696] md:w-100 w-85  pt-4  '>Feel free to ask any query related to our products and any additional help we will be happy to help you out.</div>

            <div className='font-urbanist text-[#E1FF01] font-[600] text-xl  pt-4'>Email</div>
            <div className='font-urbanist font-[600] text-[#969696] mt-3 '>hi@festbuzz.in </div>
            <div className='font-urbanist font-[600] text-[#969696] '>thefestbuzzgmail.com</div>

            <div className='flex justify-between w-40 content-center mt-10'>
                <Image src={fb} alt='' className='w-6 h-6' />
                <Image src={insta} alt='' className='w-6 h-6' />
                <Image src={linkedin} alt='' className='w-6 h-6' />
            </div>

            <div className='flex items-center gap-2 flex-wrap mt-10 '>
                <Image src={pinkdiamond} alt='' className='w-6 h-6' />
                <div className='font-clash font-[600] text-3xl uppercase '>Get in touch</div>
            </div>

            <form action="" className='md:w-120 w-85 mb-40 '>
                <input type="text" placeholder='Your full name' className='mt-4 bg-[#1D1D1D] w-full h-14 rounded-2xl pl-5 font-urbanist text-[white] placeholder:text-[#565656] ' />
                <input type="email" placeholder='Your email' className='mt-4 bg-[#1D1D1D] w-full h-14 rounded-2xl pl-5 font-urbanist text-[white] placeholder:text-[#565656] ' />
                <input type="text" placeholder='Your message' className='mt-4 bg-[#1D1D1D] w-full h-40 rounded-2xl pl-5 font-urbanist text-[white] placeholder:text-[#565656] ' />
                <button className='mt-4 bg-[#0248F7] px-6 py-2 font-[700]  text-center rounded-2xl  font-urbanist text-[#E1FF01]' >Send ↗</button>
            </form>

            <div className='flex w-full md:justify-around content-center flex-wrap mt-25 md:gap-4 justify-center  '>
                <div className='flex justify-center content-center flex-wrap gap-1 '>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 h-5 w-5 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 '>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 h-5 w-5 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 md:w-auto w-0 overflow-hidden '>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 h-5 w-5 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1  md:w-auto w-0 overflow-hidden'>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 w-5 h-5 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 md:w-auto w-0 overflow-hidden '>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
            </div>
            <CallToAction />
        </div>
    )
}

export default page
