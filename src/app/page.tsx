// 'use client'
// import { useState } from 'react';
// Home page for FestBuzz - Responsive, styled with Tailwind CSS
import CallToAction from './components/CallToAction';
import Image from 'next/image';
import HomePageImage from '../../public/assets/HomePageImage.png'
import Firstcard from '../../public/assets/FirstCardImage.png'
import SecondCard from '../../public/assets/SecondCardImage.png'
import VectorRight from '../../public/assets/VectorRightHelical.png'
import VectorLeft from '../../public/assets/VectorLeftHelical.png'
import RectangleFirst from '../../public/assets/Rectangleimageforcard1.png'
import RectangleSecond from '../../public/assets/RectangleImageforcard2.png'
import RectangleThird from '../../public/assets/Rectangleimageforcard3.png'
import PinkDiamond from '../../public/assets/PinkDiamond.png'
import Star from '../../public/assets/star.png'
import whiteDiamond from '../../public/assets/WhiteDiamond.png'
export default function Home() {
  // Remove mobileMenuOpen and navbar code
  return (
    <div className="min-h-screen  text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HomePageImage}
          alt="Festival Crowd"
          width={1500}
          height={800}
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className='absolute z-10 -top-3 w-full flex justify-between content-center flex-wrap h-screen overflow-x-hidden '>
          <Image src={VectorLeft} alt="" className='relative   object-cover  ' />
          <Image src={VectorRight} alt="" className='relative    object-cover ' />

        </div>
        {/* <div className="absolute inset-0 bg-black bg-opacity-70" /> */}
      </div>
      {/* Remove navbar here */}

      {/* Mobile Menu Overlay */}
      {/* This section is no longer needed as navbar is removed */}

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center min-h-[100vh] px-4 md:pt-2">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
          ENGAGE,<br />
          <span className="text-[#E1FD0C]">EXPRESS,</span><br />
          EXHILARATE.
        </h1>
        <div className="flex justify-center mb-4">
          <Image src={PinkDiamond} alt='' className='' />
        </div>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-xl mx-auto">
          Integrated platform to all your festival needs.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-full bg-[#0248F7] text-[#E1FF01] font-bold text-lg shadow-lg hover:bg-blue-600 transition"
        >
          Get started right now! <span className="ml-2 text-[20px]">↗</span>
        </a>
      </main>
      <section className='realtive z-10 w-full px-5 py-10 bg-black '>
        <div className='flex content-center items-center flex-wrap w-full justify-center mb-20'>
          <Image alt='pinkdiamond' src={PinkDiamond} className='' />
          <div className='font-clash text-white text-6xl uppercase'>Discover Discounts</div>
        </div>
        <div className='flex justify-center content-center items-center flex-wrap '>
          <div className="grid grid-cols-4 gap-15" >
            {[1, 2, 3, 4].map((value: number, index: number) => (
              <div className='bg-[#1A1A1A] rounded-2xl relative' key={index} >
                <div className='absolute -top-10 z-10 -left-10'>
                  <div className='relative'>
                    <Image src={Star} alt='star' className='' />
                    <div className='absolute top-7 left-7  z-20  flex justify-center content-center items-center flex-wrap text-[#0248F7] font-urbanist font-[800] text-2xl w-20 h-10'>
                      5%
                      OFF
                    </div>
                  </div>
                </div>
                <div>
                  <Image alt='' width={300} height={150} src={SecondCard} className='rounded-t-xl' />
                </div>
                <div>
                  <div className='font-urbanist font-[600] text-[#E1FF01] w-65 m-auto text-xl mb-3 mt-3'>
                    Unlock 5% OFF on tickets at THOMBUS 2025
                  </div>
                  <div className=' text-[#5E5E5E] font-urbanist font-[600] w-65 m-auto  mb-2 '>
                    Available for the first 100 students
                  </div>
                  <div className='m-auto w-65'>
                    <button className='bg-[#0248F7] text-center w-full rounded-2xl py-1 mb-5'>
                      View Offer
                    </button>
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>
      </section>

      {/* Brand Statement Section */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 py-10 md:py-10 bg-black">
        <p className="text-base md:text-xl font-medium text-white max-w-3xl mx-auto">
          At <span className="font-extrabold text-lime-300">FEST</span><span className="text-white font-extrabold">✦</span><span className="font-extrabold text-pink-400">BUZZ</span>
          <span className="ml-2 italic font-semibold text-white">we <span className="italic">unite all stakeholders</span></span><br />
          for smooth and successful <span className="relative inline-block">college festivals
            <svg className="absolute left-0 bottom-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#3b82f6" strokeWidth="2" /></svg>
          </span><br />
          using technology, creativity and expertise.
        </p>
      </section>

      {/* WE OFFER YOU TO Section */}
      <section className="relative z-10 w-full bg-black pb-0 px-4 md:px-8 lg:px-20">
        {/* Section Title */}
        <div className="flex items-center gap-3 pt-10 md:pt-10 justify-center">
          <span className="inline-block w-6 h-6 bg-pink-500 rounded-full animate-pulse" />
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            <span className="font-extrabold">WE OFFER YOU TO</span>
          </h2>
        </div>

        {/* Offer Cards */}
        <div className="flex flex-col gap-0 mt-6">
          {/* 01 Host & Manage */}
          <div className="relative flex flex-col md:flex-row items-stretch bg-[#E1FF01] min-h-[260px] overflow-hidden rounded-2xl mb-6 px-4 md:px-8">
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-blue-700 mb-1">01 Host & Manage</h3>
                <p className="text-sm md:text-base text-gray-700 mb-2">For organizing team</p>
                <p className="text-gray-800 text-sm md:text-base mb-4 max-w-md">
                  All-in-one event hosting with easy registrations, smooth coordination, fair judging, clear communication, and quick certificate delivery.
                </p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-sm md:text-base w-fit">
                List your fest <span>↗</span>
              </a>
            </div>
            <div className="relative flex-1 min-h-[180px] md:min-h-0">

              <Image src={Firstcard} alt="Team" width={600} height={160} className="w-full h-full object-cover object-center" />
              {/* Decorative squares */}
              <div className="absolute top-0 left-0 w-[39.7vw] h-[59vh]">
                <Image src={RectangleFirst} alt="Rectangle" width={600} height={160} className="relative w-full h-full object-cover " />
              </div>
            </div>
          </div>

          {/* 02 Explore & Enjoy */}
          <div className="relative flex flex-col md:flex-row items-stretch bg-[#FD3EB5] min-h-[260px] overflow-hidden rounded-2xl mb-6 px-4 md:px-8">
            <div className="relative flex-1 min-h-[180px] md:min-h-0 order-2 md:order-1">
              <Image src={SecondCard} alt="Concert" width={600} height={160} className="w-full h-full object-cover object-center" />
              {/* Decorative squares */}
              <div className="absolute top-0 w-[39.7vw] h-[59vh]">
                <Image src={RectangleSecond} alt="Rectangle" width={600} height={160} className="relative w-full h-full object-cover " />
              </div>
            </div>
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between order-1 md:order-2">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#E1FF01] mb-1">02 Explore & Enjoy</h3>
                <p className="text-sm md:text-base text-white mb-2">For college students</p>
                <p className="text-white text-sm md:text-base mb-4 max-w-md">
                  Discover and join exciting fests<br />
                  Enjoy exclusive event discounts<br />
                  Collect rewards and goodies
                </p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E1FF01] text-black font-semibold shadow hover:bg-lime-100 transition text-sm md:text-base w-fit">
                Sign up now <span>↗</span>
              </a>
            </div>
          </div>

          {/* 03 Engage & Reach */}
          <div className="relative flex flex-col md:flex-row items-stretch bg-[#0248F7] min-h-[260px] overflow-hidden rounded-2xl mb-6 px-4 md:px-8">
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#E1FF01] mb-1">03 Engage & Reach</h3>
                <p className="text-sm md:text-base text-white mb-2">For brands</p>
                <p className="text-white text-sm md:text-base mb-4 max-w-md">
                  Showcase your products effectively<br />
                  Connect with your audience interactively<br />
                  Extend your reach to a broader audience
                </p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E1FF01] text-black font-semibold shadow hover:bg-lime-100 transition text-sm md:text-base w-fit">
                Partner with us <span>↗</span>
              </a>
            </div>
            <div className="relative flex-1 min-h-[180px] md:min-h-0">
              <Image src={Firstcard} alt="Team" width={600} height={160} className="w-full h-full object-cover object-center" />
              {/* Decorative squares */}
              <div className="absolute top-0 w-[39.7vw] h-[59vh]">
                <Image src={RectangleThird} alt="Rectangle" width={600} height={160} className="relative w-full h-full object-cover " />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-black pt-30'>
        <div className='flex content-center items-center flex-wrap w-full justify-center'>
          <Image alt='pinkdiamond' src={PinkDiamond} className='' />
          <div className='font-clash text-white text-6xl uppercase'>our partners</div>
        </div>
        <div className='flex content-center items-center flex-wrap w-full justify-around mt-40'>
          <Image alt='Patner_1' src="/assets/patner01.png" width={150} height={70} className='' />
          <Image alt='Patner_2' src="/assets/patner02.png" width={150} height={70} className='' />
          <Image alt='Patner_3' src="/assets/patner03.png" width={150} height={70} className='' />

        </div>
        <div className='flex w-full md:justify-around content-center flex-wrap mt-62 md:gap-4 justify-center  '>
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
      </section>

      {/* Call-to-Action Section */}
      <CallToAction />

    </div>
  );
}