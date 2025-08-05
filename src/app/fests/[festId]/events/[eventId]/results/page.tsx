'use client';
import React from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation';
import image from '../../../../../../../public/assets/HomePageImage.png'
import lo from '../../../../../../../public/assets/Location.png'
import cal from '../../../../../../../public/assets/Calender.png'
import clock from '../../../../../../../public/assets/Clock.png'
import pinkdiamond from '../../../../../../../public/assets/PinkDiamond.png'
import whiteDiamond from '../../../../../../../public/assets/WhiteDiamond.png'

import { useEvent } from '@/hooks/events/useEvent';
import Link from 'next/link';
interface Sponsor {
  id?: string;
  _id?: string;
  name?: string;
  logo?: string;
  image?: string;
}


const Page = () => {
  const params = useParams();
  const festId = params?.festId as string;
  const eventId = params?.eventId as string;
  const { data: event, isLoading, error } = useEvent(festId, eventId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading event details</div>;
  if (!event) return <div>No event found</div>;

  return (
    <div>
      <div className='overflow-x-hidden'>
        <div className='w-full h-full bg-[#101010] min-h-screen'>
          <div className='flex justify-bewteen flex-col md:flex-row md:mr-5 p-4  md:pt-5  md:gap-10 gap-4 overflow-hidden'>
            <Image src={image} alt='' className=' md:p-0  rounded-2xl h-60 object-cover md:rounded-r-2xl md:h-90 object-bottom md:w-1/2' />
            <div className='flex flex-col md:w-1/2 '>
              <div className='flex md:flex-col flex-row-reverse items-center md:items-stretch '>
                <div className='px-6 py-1 bg-[#FD3EB5] h-8 text-white rounded-2xl w-25 '>Culture</div>
                <div className='font-[700] mt-5 pl-2 text-2xl md:text-5xl '>SINGING THE FLOOR</div>
              </div>
              <div className='font-urbanist pl-3 mt-5 text-[#CBCBCB] font-[700] md:text-[18px]   '>Organized by - IIT Roorkee</div>
              <div className='pl-3 flex gap-1 mt-4  content-center items-center '>
                <div>
                  <Image src={lo} alt='' className='w-4' />
                </div>
                <div className='text-[#717171] font-[700] font-urbanist  '>IIT Roorkee</div>
              </div>
              <div className='pl-3 flex gap-1   content-center items-center '>
                <div>
                  <Image src={cal} alt='' className='w-4' />
                </div>
                <div className='text-[#717171] font-[700] font-urbanist '>14-20 Sep, 2025</div>
              </div>
              <div className='pl-3 flex gap-1   content-center items-center '>
                <div>
                  <Image src={clock} alt='' className=' w-4' />
                </div>
                <div className='text-[#717171] font-[700] font-urbanist '>10 AM Onwards</div>
              </div>
              <div className=' md:mt-4 -mt-20 flex justify-end content-center gap-4 w-full'>

                <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.75 14.7485C14.9583 14.7485 14.25 15.061 13.7083 15.5506L6.28125 11.2277C6.33333 10.9881 6.375 10.7485 6.375 10.4985C6.375 10.2485 6.33333 10.0089 6.28125 9.76935L13.625 5.4881C14.1875 6.00893 14.9271 6.33185 15.75 6.33185C17.4792 6.33185 18.875 4.93601 18.875 3.20685C18.875 1.47768 17.4792 0.0818481 15.75 0.0818481C14.0208 0.0818481 12.625 1.47768 12.625 3.20685C12.625 3.45685 12.6667 3.69643 12.7188 3.93601L5.375 8.21726C4.8125 7.69643 4.07292 7.37351 3.25 7.37351C1.52083 7.37351 0.125 8.76935 0.125 10.4985C0.125 12.2277 1.52083 13.6235 3.25 13.6235C4.07292 13.6235 4.8125 13.3006 5.375 12.7798L12.7917 17.1131C12.7396 17.3318 12.7083 17.561 12.7083 17.7902C12.7083 19.4673 14.0729 20.8318 15.75 20.8318C17.4271 20.8318 18.7917 19.4673 18.7917 17.7902C18.7917 16.1131 17.4271 14.7485 15.75 14.7485Z" fill="white" />
                </svg>

                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.3115 2.50913C16.9773 0.0498337 14.2743 1.08705 12.6007 2.18391C11.655 2.80369 10.345 2.80369 9.39929 2.18392C7.72564 1.08706 5.02272 0.0498608 2.68853 2.50914C-2.85249 8.3471 6.64988 19.5967 11 19.5967C15.3502 19.5967 24.8525 8.3471 19.3115 2.50913Z" stroke="white" />
                </svg>

              </div>
              <div className='flex justify-between content-center pl-3 md:-mt-1 mt-20'>
                <div className='flex flex-col'>
                  <div className='font-[600] font-urbanist text-3xl text-[#E1FF01]'>₹200</div>
                  <div className=' font-[700] text-[#9A9A9A] font-urbanist  text-sm '>Individual fee</div>
                </div>
                <div className='text-[#E1FF01] font-urbanist bg-[#0248F7] px-6 md:py-1 md:h-10 text-center h-full py-4 rounded-2xl md:mt-6 font-[700] '>Download certificate</div>
              </div>
            </div>
          </div>
          <div className="flex md:ml-10 ml-6 gap-2 items-center md:mt-10 mt-15 overflow-hidden">
            <Image src={pinkdiamond} alt="" className="md:h-6 md:w-6 w-5 h-5" />
            <div className="font-clash font-[700] md:text-3xl text-2xl uppercase">Results</div>
          </div>
          <div className='flex md:px-60  justify-between md:mt-20 mt-10 overflow-hidden w-screen'>
            <div className='flex flex-col gap-10 content-center justify-center flex-wrap items-center'>
              <div className='relative'>
                <div className='md:w-18 md:h-18 w-15 h-15 rounded-full shadow-2xl shadow-[#FD3EB5] border border-[#FD3EB5] bg-white'>
                </div>
                <div className='md:py-2 md:px-4 py-1 px-3 rounded-full bg-[#FD3EB5] text-white absolute left-3.5 -bottom-4 md:-bottom-5 md:left-3'>2
                </div>
              </div>
              <div className='md:w-70 w-25 md:h-30 h-10 bg-gradient-to-t from-[#101010] to-[#313131] py-2 text-center rounded-t-2xl'>Participant XYZ</div>
            </div>
            <div className='flex flex-col gap-10 content-center justify-center flex-wrap items-center'>
              <div className='relative'>
                <div className='md:w-18 md:h-18 w-15 h-15 rounded-full shadow-2xl shadow-[#E1FF01] border border-[#E1FF01] bg-white'>
                </div>
                <div className='md:py-2 md:px-4 py-1 px-3 rounded-full bg-[#E1FF01] text-black absolute left-3.5 -bottom-4 md:-bottom-5 md:left-4 font-bold'>1
                </div>
              </div>
              <div className='md:w-70 md:h-60 w-35 h-20  bg-gradient-to-t from-[#101010] to-[#313131] py-2 text-center rounded-t-2xl'>Participant XYZ</div>
            </div>

            <div className='flex flex-col gap-10 content-center justify-center flex-wrap items-center'>
              <div className='relative'>
                <div className='md:w-18 md:h-18 w-15 h-15 rounded-full shadow-2xl shadow-[#0248F7] border border-[#0248F7] bg-white'>
                </div>
                <div className='md:py-2 md:px-4 py-1 px-3 rounded-full bg-[#0248F7] text-white absolute left-3.5 -bottom-4 md:-bottom-5 md:left-4'>3
                </div>
              </div>
              <div className='md:w-70 w-24 md:h-30 h-10  bg-gradient-to-t from-[#101010] to-[#313131] py-2 text-center rounded-t-2xl'>Participant XYZ</div>
            </div>
          </div>
          <div className="md:ml-20 ml-6 mt-20 mb-10 font-clash font-[700] md:text-3xl text-2xl uppercase text-[#E1FF01]">Rankings</div>
          <div className='overflow-x-auto md:overflow-visible px-6'>
            <div className='min-w-[700px] md:min-w-full'>
              <div className='flex justify-between content-center flex-wrap px-6 py-3 rounded-t-2xl bg-[#303030] text-[16px] font-[600] font-urbanist'>
                <span className='w-48'>Rank</span>
                <span className='w-24'>Participant</span>
                <span className='w-48'>College</span>
                <span className='w-32'>Registration ID</span>
              </div>

              {[4, 5, 6].map(rank => (
                <div key={rank} className='flex justify-between content-center flex-wrap px-6 py-3 bg-[#171717] text-[16px] font-[600] font-urbanist'>
                  <span className='min-w-48'>{rank}th</span>
                  <span className='min-w-24'>Participant Name</span>
                  <span className='min-w-48'>IIT Bombay, Maharastra</span>
                  <span className='min-w-32'>#233462796</span>
                </div>
              ))}

              <div className='md:mx-8 mt-5 mx-6 w-2 h-2 bg-white rounded-full'></div>
              <div className='md:mx-8 mt-5 mx-6 w-2 h-2 bg-white rounded-full'></div>
              <div className='md:mx-8 mt-5 mx-6 w-2 h-2 bg-white rounded-full'></div>

              <div className='flex justify-between content-center flex-wrap px-6 py-3 bg-[#171717] text-[16px] font-[600] font-urbanist mt-5'>
                <span className='min-w-48 text-[#FD3EB5]'>10th</span>
                <span className='min-w-24 text-[#FD3EB5]'>YOU</span>
                <span className='min-w-48'>IIT Bombay, Maharastra</span>
                <span className='min-w-32'>#233462796</span>
              </div>
            </div>
          </div>

          <div className='flex md:px-20 p-6  flex-col md:flex-row justify-between mt-10  overflow-hidden'>
            <div className='flex flex-col '>
              <div className='flex items-center gap-2'>
                <Image src={pinkdiamond} alt='' className='md:w-6 md:h-6 w-5 h-5' />
                <div className='font-clash uppercase font-[700] md:text-3xl text-2xl  '>Event details</div>
              </div>
              <div className='px-4 md:px-0'>
                <div className='mt-10 text-[#B7B7B7]  '><b className='text-white'>Eligibility:</b> No criteria</div>
                <div className='mt-1 text-[#B7B7B7]  '><b className='text-white'>Theme:</b> Retro Vibes</div>
                <div className='mt-1 text-[#B7B7B7]  '>Date and Time: Saturday, May 4th, 2024  at 9:00 AM - 6:00 PM</div>
                <div className='mt-1 text-[#B7B7B7]  '>Location: Virtual Event (Online)</div>
                <div className='mt-1 text-[#B7B7B7]  '>Organizer: FesTech Society</div>
                <div className='mt-1 text-[#B7B7B7]  '>Contact: techsociety@college.edu</div>
                <div className='mt-1 text-[#B7B7B7]  '>Eligibility:  No criteria</div>
                <div className='mt-1 text-[#B7B7B7]  '>Theme: [Choose a captivating theme, e.g., “Retro Vibes,” “Tech</div>
                <div className='mt-1 text-[#B7B7B7]  '>Odyssey,” or “Cultural Kaleidoscope”]</div>
                <div className='mt-1 text-[#B7B7B7]  '>Special Attractions [Highlight any unique features, e.g., celebrity </div>
                <div className='mt-1 text-[#B7B7B7]  '>guest appearances, food stalls, art installations] </div>
                <div className='mt-1 text-[#B7B7B7]  '>Perks for Participants: [Free goodies, certificates, networking </div>
                <div className='mt-1 text-[#B7B7B7]  '>opportunities]</div>


              </div>

            </div>
            <div className='mt-10 md:mt-0'>
              <div className='flex items-center gap-2'>
                <Image src={pinkdiamond} alt='' className='md:w-6 md:h-6 w-5 h-5 ' />
                <div className='font-clash uppercase font-[700] md:text-3xl text-2xl '>Rules & code of conduct</div>
              </div>
              <div className='mt-10 text-[#B7B7B7]  '>• Teams must consist of 2-4 members.</div>
              <div className='mt-1 text-[#B7B7B7]  '>• All code must be written during the event.</div>
              <div className='mt-1 text-[#B7B7B7]  '>• Projects must be submitted by the deadline.</div>
              <div className='mt-1 text-[#B7B7B7]  '>• Respectful behavior is expected at all times</div>


            </div>
          </div>

          <div className='flex items-center gap-2 md:px-20 px-6 pt-15 overflow-hidden'>
            <Image src={pinkdiamond} alt='' className='md:w-6 md:h-6 w-5 h-5 ' />
            <div className='font-clash uppercase font-[700] md:text-3xl text-2xl  '>Event JUDGES</div>
          </div>
          <div className='mt-10 flex md:px-60 justify-between flex-col items-center md:items-start md:flex-row gap-4 md:gap-0 w-screen overflow-hidden'>
            <div className='bg-[#191919] w-70 h-70 pl-2 flex flex-col items-center pt-5'>
              <Image src={image} alt='' className='w-20 h-20 rounded-full' />
              <div className='font-urbanist text-xl font-[600] mt-5 '>Rajesh kumar</div>
              <div className='font-urbanist font-[600] mt-5 text-[#ACACAC] m-auto text-center w-50  '>Head of xYZ department, Chandiagrh</div>
            </div>
            <div className='bg-[#191919] w-70 h-70 pl-2 flex flex-col items-center pt-5'>
              <Image src={image} alt='' className='w-20 h-20 rounded-full' />
              <div className='font-urbanist text-xl font-[600] mt-5 '>Rajesh kumar</div>
              <div className='font-urbanist font-[600] mt-5 text-[#ACACAC] m-auto text-center w-50  '>Head of xYZ department, Chandiagrh</div>
            </div>
            <div className='bg-[#191919] w-70 h-70 pl-2 flex flex-col items-center pt-5'>
              <Image src={image} alt='' className='w-20 h-20 rounded-full' />
              <div className='font-urbanist text-xl font-[600] mt-5 '>Rajesh kumar</div>
              <div className='font-urbanist font-[600] mt-5 text-[#ACACAC] m-auto text-center w-50  '>Head of xYZ department, Chandiagrh</div>
            </div>

          </div>

          <div className="max-w-5xl md:px-20 px-6 py-10 overflow-hidden">
            <div className='flex items-center gap-2 pt-15'>
              <Image src={pinkdiamond} alt='' className='md:w-6 md:h-6 w-5 h-5 ' />
              <div className='font-clash uppercase font-[700] md:text-3xl text-2xl'>Event sponsors</div>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 pt-10">
              {Array.isArray(event.sponsors) && event.sponsors.length > 0 ? (
                event.sponsors.map((sponsor: Sponsor) => (
                  <div key={sponsor.id || sponsor._id} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[100px] h-[100px] shadow-md">
                    <Image src={sponsor.logo || sponsor.image || 'https://via.placeholder.com/80x64'} alt={sponsor.name || 'Sponsor'} width={80} height={64} className="max-h-16 max-w-[80px] object-contain" />
                  </div>
                ))
              ) : ([
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo98Gu4mCos9dCRQKu1QPj2mL12YpK9_xjDg&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0HEjFSaLLj0ffKaOKTlFQAYwXUpir-ScjQ&s',
              ].map((logo, i) => (
                <div key={i} className="bg-white rounded-xl p-3 flex items-center justify-center min-w-[100px] h-[100px] shadow-md">
                  <Image src={logo} alt="Sponsor" width={80} height={64} className="max-h-16 max-w-[80px] object-contain" />
                </div>
              )))}
            </div>
          </div>
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center text-center overflow-hidden">
            <Image src={pinkdiamond} alt='' className='w-12 h-12 mb-5' />
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#E1FF01] mb-2">DON&apos;T MISS OUT THIS BANGER!!</h2>
            <p className="text-white text-base md:text-lg mb-6">Secure your spot now and get ready to make memories that will last a lifetime! Register today</p>
            <Link href={`/fests/${festId}/events/${eventId}/register`} className="inline-block px-8 py-3 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg hover:bg-blue-600 transition">
              Register now <span className="ml-2">↗</span>
            </Link>
          </div>
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
        </div>
      </div>
    </div>
  )
}

export default Page
