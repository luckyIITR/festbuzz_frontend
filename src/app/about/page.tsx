import React from 'react'
import Image from 'next/image'
import diamond from '../../../public/assets/Blue diamond.png'
import YellowDiamond from '../../../public/assets/Yellow Diamond.png'
import whiteDiamond from '../../../public/assets/WhiteDiamond.png'
import CallToAction from '../components/CallToAction'
const page = () => {
    return (
        <div className=' min-h-screen overflow-hidden bg-[#101010]'>
            <div className='flex justify-center flex-wrap content-center w-full mt-10'>
                <Image src={diamond} className='h-30 object-cover w-30' alt='' />
                <div className='flex flex-col h-30  flex-wrap '>
                    <div className='font-clash font-[600] text-center text-4xl uppercase' >Creative. </div>
                    <div className='font-clash font-[600] text-center text-4xl uppercase'>Dedicated. </div>
                    <div className='font-clash font-[600] text-center text-4xl uppercase text-[#FD3EB5]'>Experienced. </div>
                </div>
                <Image src={diamond} className='h-30 object-cover w-30' alt='' />
            </div>
            <div className='flex w-full justify-center content-center flex-wrap mt-20 gap-1 pr-5'>
                <Image src={YellowDiamond} className=' object-cover h-8 w-8 ' alt='' />
                <div className='font-clash font-[600] text-center h-8 text-3xl uppercase text-[#E1FF01]'>Our mission</div>
            </div>
            <div className='flex pl-5 w-200 m-auto mt-10 font-urbanist font-[300] text-xl text-center'>
                Our mission is to unite stakeholders and leverage technology to create seamless and unforgettable college festivals. We are dedicated to enhancing collaboration, fostering creativity, and delivering exceptional event experiences that leave a lasting impact.
            </div>
            <div className='flex w-full justify-center content-center flex-wrap mt-20 gap-1 pr-5'>
                <Image src={YellowDiamond} className=' object-cover h-8 w-8 ' alt='' />
                <div className='font-clash font-[600] text-center h-8 text-3xl uppercase text-[#E1FF01]'>About us</div>
            </div>
            <div className='flex pl-5 w-200 m-auto mt-10 font-urbanist font-[300] text-xl text-center'>
                We are more than just a platform; we are your partners in creating unforgettable experiences. At Festbuzz, we blend innovation and expertise to offer a comprehensive solution for event organizers, brands, and attendees.
                <br /><br />
                Our commitment to excellence drives us to continually push the boundaries of what's possible, ensuring that every event we touch is a resounding success.
            </div>
            <div className='flex w-full justify-center content-center flex-wrap mt-20 gap-1 pr-5'>
                <Image src={YellowDiamond} className=' object-cover h-8 w-8 ' alt='' />
                <div className='font-clash font-[600] text-center h-8 text-3xl uppercase text-[#E1FF01]'>Want to work with us?</div>
            </div>
            <div className='flex pl-5 w-200 m-auto mt-10 font-urbanist font-[300] text-xl text-center'>
                Join us and discover a world where technology meets imagination, and events are transformed into extraordinary moments.
            </div>
            <div className='flex w-full justify-center content-center flex-wrap mt-10 gap-1 pr-5'>
                <button className='text-[#E1FF01] bg-[#0248F7] font-[600] px-8 py-2 rounded-2xl   '>Send us a hi! </button>
            </div>
            <div className='flex w-full justify-around content-center flex-wrap mt-25 gap-4'>
                <div className='flex justify-center content-center flex-wrap gap-1 '>
                    <Image src={whiteDiamond} className=' object-cover h-8 w-8 ' alt='' />
                    <div className='font-clash text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 '>
                    <Image src={whiteDiamond} className=' object-cover h-8 w-8 ' alt='' />
                    <div className='font-clash text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 '>
                    <Image src={whiteDiamond} className=' object-cover h-8 w-8 ' alt='' />
                    <div className='font-clash text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 '>
                    <Image src={whiteDiamond} className=' object-cover h-8 w-8 ' alt='' />
                    <div className='font-clash text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 '>
                    <Image src={whiteDiamond} className=' object-cover h-8 w-8 ' alt='' />
                    <div className='font-clash text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
            </div>
            <CallToAction/>
        </div>
    )
}

export default page
