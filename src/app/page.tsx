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
// import Star from '../../public/assets/star.png'
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
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-18 mb-4 font-clash">
          ENGAGE,<br />
          <span className="text-[#E1FD0C]">EXPRESS,</span><br />
          EXHILARATE.
        </h1>
        <div className="flex justify-center mb-4">
          <Image src={PinkDiamond} alt='' className='' />
        </div>
        <p className="text-lg md:text-2xl font-urbanist text-[#C6C6C6] font-[700] mb-8 max-w-xl mx-auto">
          Integrated platform to all your festival needs.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-full bg-[#0248F7] text-[#E1FF01] dm-sans font-[800]  text-lg shadow-lg hover:bg-blue-600 transition"
        >
          Get started right now! <span className="ml-2 text-[20px] dm-sans font-[800]">↗</span>
        </a>
      </main>
      {/* <section className='realtive z-10 w-full px-5 py-10 bg-black '>
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
      </section>  */}

      {/* Brand Statement Section */}
           <div className='absolute z-10 h-80 w-full bg-gradient-to-t from-[rgba(0,0,0,1)] via-[rgba(0,0,0,1)] to-[#090909a3] '></div>
      <section className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 py-10 md:py-10 ">
        <p className="text-base md:text-3xl font-bold text-white max-w-3xl mx-auto font-urbanist">
          At <span className="font-extrabold text-[#E1FF01] font-clash">FEST</span><span className="text-white font-extrabold">✦</span><span className="font-extrabold text-[#FD3EB5] font-clash">BUZZ</span>
          <span className="ml-2 italic font-semibold text-white">we <span className="italic font-urbanist">unite all stakeholders</span></span><br />
          for smooth and successful <span className="relative inline-block">college festivals
            <svg className="absolute left-0 bottom-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#3b82f6" strokeWidth="2" /></svg>
          </span><br />
          using technology, creativity and expertise.
        </p>
      </section>

      {/* WE OFFER YOU TO Section */}
      <section className="relative z-10 w-full bg-black pb-0 px-4 ">
   
        {/* Section Title */}
        
        <div className="flex items-center gap-3 pt-10 md:pt-10 justify-center">
          <Image alt='pinkdiamond' src={PinkDiamond} className='' />
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            <span className="font-extrabold uppercase font-clash text-6xl">Our Offerings</span>
          </h2>
        </div>

        {/* Offer Cards */}
        <div className="flex flex-col gap-0 mt-6">
          {/* 01 Host & Manage */}
          <div className="relative flex flex-col md:flex-row items-stretch bg-[#E1FF01] min-h-[260px] overflow-hidden pl-10  ">
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
              <div className='h-full'>
                <h3 className="text-xl md:text-5xl font-clash font-[700] text-[#0248F7] mb-1">01 Host & Manage</h3>
                <div className='w-full h-5/7  flex flex-col justify-between mt-4'>
                  <p className="text-xl font-[700] text-[#434C00]  mb-2 font-urbanist">For organizing team</p>
                  <p className="text-[#434C00] font-[600] font-urbanist text-lg md:text-lg mb-4 max-w-sm ">
                    All-in-one event hosting with easy registrations, smooth coordination, fair judging, clear communication, and quick certificate delivery.
                  </p>
                </div>
              </div>
              <a href="#" className="inline-flex items-center ">
                <span className='bg-[#0248F7] px-8 py-2 rounded-full  text-[#E1FF01] font-[800] font-urbanist shadow hover:bg-blue-700 transition text-lg w-fit'> List your fest</span><span className='rounded-full text-lg bg-[#0248F7] px-4 py-2 font-urbanist font-[800]  text-[#E1FF01]'>↗</span>
              </a>
            </div>
            <div className="relative flex-1 h-110 md:min-h-0">

              <Image src={Firstcard} alt="Team" width={600} height={160} className="w-full h-full object-cover object-center" />
              {/* Decorative squares */}
              <div className="absolute top-0 left-0 w-[39.7vw] h-[59vh]">
                <Image src={RectangleFirst} alt="Rectangle" width={600} height={160} className="relative w-full h-full object-cover " />
              </div>
            </div>
          </div>

          {/* 02 Explore & Enjoy */}
          <div className="relative flex flex-col md:flex-row items-stretch bg-[#FD3EB5] min-h-[260px] overflow-hidden ">
            <div className="relative flex-1 h-110 md:min-h-0 order-2 md:order-1">
              <Image src={SecondCard} alt="Concert" width={600} height={160} className="w-full h-full object-cover object-center" />
              {/* Decorative squares */}
              <div className="absolute top-0 w-[39.7vw] h-[59vh]">
                <Image src={RectangleSecond} alt="Rectangle" width={600} height={160} className="relative w-full h-full object-cover ml-10 " />
              </div>
            </div>
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between order-1 md:order-2 ">
              <div className='h-full'>

                <h3 className="text-xl md:text-5xl font-clash font-[700] text-[#E1FF01] mb-1">02 Explore & Enjoy</h3>
                <div className='w-full h-5/7  flex flex-col justify-between mt-4'>
                  <p className="  text-white mb-2 text-xl font-[700]  font-urbanist">For college students</p>
                  <p className="text-white font-[600] font-urbanist text-lg md:text-lg mb-4 max-w-sm ">
                    Discover and join exciting fests<br />
                    Enjoy exclusive event discounts<br />
                    Collect rewards and goodies
                  </p>
                </div>
              </div>
              <a href="#" className="inline-flex items-center ">
                <span className='text-black px-8 py-2 rounded-full  bg-[#E1FF01] font-[800] font-urbanist shadow hover:bg-blue-700 transition text-lg w-fit'> Sign up now</span><span className='rounded-full  px-4 py-2 text-lg text-black font-urbanist font-[800] bg-[#E1FF01]'>↗</span>
              </a>
            </div>
          </div>

          {/* 03 Engage & Reach */}
          <div className="relative flex flex-col md:flex-row items-stretch bg-[#0248F7] min-h-[240px] overflow-hidden pl-10 ">
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
              <div className='h-full'>
                <h3 className="text-xl md:text-5xl font-clash font-[700] text-[#E1FF01] mb-1">03 Engage & Reach</h3>
                <div className='w-full h-5/7  flex flex-col justify-between mt-4'>
                  <p className=" text-white mb-2 text-xl font-[700]  font-urbanist">For brands</p>
                  <p className="text-white font-[600] font-urbanist text-lg md:text-lg mb-4 max-w-sm ">
                    Showcase your products effectively<br />
                    Connect with your audience interactively<br />
                    Extend your reach to a broader audience
                  </p>
                </div>
              </div>
              <a href="#" className="inline-flex items-center ">
                <span className='text-black px-8 py-2 rounded-full  bg-[#E1FF01] font-[800] font-urbanist shadow hover:bg-blue-700 transition text-lg   w-fit'> Partner with us</span><span className='rounded-full text-black px-4 py-2 text-lg font-urbanist font-[800]  bg-[#E1FF01]'>↗</span>
              </a>

          </div>
          <div className="relative flex-1 h-110 md:min-h-0">
            <Image src={Firstcard} alt="Team" width={600} height={160} className="w-full h-full object-cover object-center" />
            {/* Decorative squares */}
            <div className="absolute top-0 w-[39.7vw] h-[59vh]">
              <Image src={RectangleThird} alt="Rectangle" width={600} height={160} className="relative w-full h-full object-cover " />
            </div>
          </div>
        </div>
    </div>
      </section >
    <section className='bg-black pt-20'>
      <div className='flex content-center items-center flex-wrap w-full justify-center'>
        <Image alt='pinkdiamond' src={PinkDiamond} className='' />
        <div className='font-clash text-white text-6xl uppercase'>our partners</div>
      </div>
      <div className='flex content-center items-center flex-wrap w-full justify-around mt-25'>
        <Image alt='Patner_1' src="/assets/patner01.png" width={200} height={120} className='' />
        <Image alt='Patner_2' src="/assets/patner02.png" width={200} height={120} className='' />
        <Image alt='Patner_3' src="/assets/patner03.png" width={200} height={120} className='' />

      </div>
      <div className='flex w-full md:justify-around content-center flex-wrap mt-40 md:gap-4 justify-center  '>
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

  {/* Call-to-Action Section */ }
  <CallToAction />

    </div >
  );
}
