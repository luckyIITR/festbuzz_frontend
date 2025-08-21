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
        <div className='absolute z-10 -top-7 w-full flex justify-between content-center flex-wrap h-screen overflow-x-hidden '>
          <Image src={VectorLeft} alt="" className='relative   object-cover  ' />
          <Image src={VectorRight} alt="" className='relative    object-cover ' />

        </div>
        {/* <div className="absolute inset-0 bg-black bg-opacity-70" /> */}
      </div>
      {/* Remove navbar here */}

      {/* Mobile Menu Overlay */}
      {/* This section is no longer needed as navbar is removed */}

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center gap-6 text-center min-h-[100vh] px-4 md:pt-2">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-18 ">
          ENGAGE,<br />
          <span className="text-[#E1FD0C]">EXPRESS,</span><br />
          EXHILARATE.
        </h1>
        <div className="flex justify-center ">
          <Image src={PinkDiamond} alt='' className='' />
        </div>
        <p className="text-lg md:text-2xl text-[#C6C6C6] font-[700]  max-w-xl mx-auto">
          Integrated platform to all your festival needs.
        </p>
        <a
          href="#"
          className="inline-block px-10 dm-sans  py-3 rounded-full bg-[#0248F7] text-[#E1FF01] font-[800] text-lg shadow-lg hover:bg-blue-600 transition"
        >
          Get started right now! <span className="ml-2 text-[20px]">↗</span>
        </a>
      </main>

      {/* Brand Statement Section */}
      <section className="relative z-10 w-full flex  bg-black  flex-col items-center justify-center  text-center px-4 py-10 md:py-10">
        <p className=" md:text-4xl text-white max-w-3xl mx-auto font-[700] text-2xl  font-urbanist leading-[120%] ">
          At <span className="font-[600] dm-sans text-[#E1FF01]">FEST</span>
          <span className="text-white font-extrabold">✦</span>
          <span className=" dm-sans font-[600] text-[#FD3EB5]">BUZZ</span>
          <span className="ml-2 italic font-semibold text-white">we <span className="italic">unite all stakeholders</span>
          </span>
          <br />
          for smooth and successful
          <span className="text-white font-urbanist  leading-[127.056%] tracking-[-0.06544rem] underline decoration-wavy decoration-[#0248F7] [text-decoration-thickness:12%]
              [text-underline-offset:18.5%] [text-decoration-skip-ink:auto]  [text-underline-position:from-font]"> college festivals
          </span>
          <br />
          using technology, creativity and expertise.
        </p>
      </section>

      {/* WE OFFER YOU TO Section */}
      <section className="relative z-10 w-full pt-10 bg-black pb-0  ">
        {/* Section Title */}
        <div className="flex items-center gap-3 pt-10 md:pt-10 justify-center">
          <Image src={PinkDiamond} alt='pinkdiamond' className='h-10 w-10' />
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            <span className="font-[600] leading-12 text-5xl tracking-wide  font-clash">WE OFFER YOU TO</span>
          </h2>
        </div>

        {/* Offer Cards */}
        <div className="flex flex-col pt-10 gap-0  ">
          {/* 01 Host & Manage */}
          <div className="relative flex flex-col md:flex-row justify-between items-stretch bg-[#E1FF01] min-h-[220px] overflow-hidden ">
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-around">
              <div className='h-full'>
                <h3 className="text-xl md:text-5xl  text-[#0248F7] mb-1 font-clash font-[700]">01 Host & Manage</h3>
                <div className='flex flex-col content-between justify-around h-4/5'>
                  <p className="text-sm md:text-2xl font-[700] text-[#434C00]  font-urbanist">For organizing team</p>

                  <p className="text-[#434C00] font-[700] text-sm md:text-2xl  max-w-sm font-urbanist ">
                    All-in-one event hosting with easy registrations, smooth coordination, fair judging, clear communication, and quick certificate delivery.
                  </p>
                </div>
              </div>
              <a href="#" className="inline-flex items-center font-urbanist font-[800] text-sm gap-2 px-6 py-1.5 rounded-full bg-[#0248F7] text-[#E1FF01]  shadow hover:bg-blue-600 transition  md:text-lg w-fit">
                List your fest <span>↗</span>
              </a>
            </div>
            <div className="relative  min-h-[180px] md:min-h-0">

              <Image src={Firstcard} alt="Team" className=" h-120 w-170 object-cover object-top" />
              {/* Decorative squares */}
              <div className="absolute top-0 left-0 ">
                <Image src={RectangleFirst} alt="Rectangle" className="relative h-120 object-center " />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col md:flex-row-reverse justify-between items-stretch bg-[#FD3EB5] min-h-[220px] overflow-hidden ">
            <div className="flex-1 p-6 md:p-10 md:px-40 flex flex-col justify-around">
              <div className='h-full'>
                <h3 className="text-xl md:text-5xl text-[#E1FF01] mb-1 font-clash font-[700]">02 Explore & Enjoy</h3>
                <div className='flex flex-col content-between justify-around h-4/5'>
                  <p className="text-sm md:text-2xl font-[700] text-white font-urbanist">For college students</p>

                  <p className="text-white font-[700] text-sm md:text-2xl max-w-sm font-urbanist">
                    Discover and join exciting fests with exclusive event discounts, rewards and goodies for memorable experiences.
                  </p>
                </div>
              </div>
              <a href="#" className="inline-flex items-center font-urbanist font-[800] text-sm gap-2 px-6 py-1.5 rounded-full bg-[#E1FF01] text-black shadow hover:bg-lime-100 transition md:text-lg w-fit">
                Sign up now <span>↗</span>
              </a>
            </div>
            <div className="relative min-h-[180px] md:min-h-0">
              <Image src={SecondCard} alt="Concert" className="h-120 w-170 object-cover object-center" />
              {/* Decorative squares */}
              <div className="absolute top-0 left-1 ">
                <Image src={RectangleSecond} alt="Rectangle" className="relative h-120 " />
              </div>
            </div>
          </div>

          {/* 03 Engage & Reach */}
          <div className="relative flex flex-col md:flex-row justify-between items-stretch bg-[#0248F7] min-h-[220px] overflow-hidden mb-10">
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-around">
              <div className='h-full'>
                <h3 className="text-xl md:text-5xl text-[#E1FD0C] mb-1 font-clash font-[700]">03 Engage & Reach</h3>
                <div className='flex flex-col content-between justify-around h-4/5'>
                  <p className="text-sm md:text-2xl font-[700] text-white font-urbanist">For brands</p>

                  <p className="text-white font-[700] text-sm md:text-2xl max-w-sm font-urbanist">
                    Showcase your products effectively, connect with your audience interactively, and extend your reach to a broader audience.
                  </p>
                </div>
              </div>
              <a href="#" className="inline-flex items-center font-urbanist font-[800] text-sm gap-2 px-6 py-1.5 rounded-full bg-[#E1FF01] text-black shadow hover:bg-lime-100 transition md:text-lg w-fit">
                Partner with us <span>↗</span>
              </a>
            </div>
            <div className="relative min-h-[180px] md:min-h-0">
              <Image src={Firstcard} alt="Team" className="h-120 w-170 object-cover object-top" />
              {/* Decorative squares */}
              <div className="absolute top-0 left-0">
                <Image src={RectangleThird} alt="Rectangle" className="relative h-120 object-center" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <CallToAction />

    </div>
  );
}
