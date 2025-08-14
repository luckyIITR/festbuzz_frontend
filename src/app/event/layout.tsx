'use-client'
import React, { ReactNode } from 'react'
import Sidebar from './sidebar'

const ProfileLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className='min-h-screen md:px-5'>
            <header className="sticky rounded-xl top-0 z-10 bg-[#0248F7] h-14 md:px-4 py-3 pl-2 flex content-center flex-wrap justify-between">
                <div className='flex justify-between content-center w-full'>
                    <button className=' px-3 py-2 rounded-full  bg-[#101010]'>
                        <div >←
                        </div>
                    </button>


                    <h2 className="pl-2 md:text-2xl font-bold uppercase text-[#E1FF01]">Event - Dancing on the floor</h2>

                    <div className='md:mr-5 mr-2 md:px-8 px-2 py-1 text-sm md:text-lg bg-[#00288D] rounded-2xl text-center text-[#FFFFFF] flex content-center items-center flex-wrap gap-2 '>Share
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.2734 4.60156V0.601562L18.2734 7.60156L11.2734 14.6016V10.5016C6.27344 10.5016 2.77344 12.1016 0.273438 15.6016C1.27344 10.6016 4.27344 5.60156 11.2734 4.60156Z" fill="white" />
                        </svg>

                    </div>
                </div>
            </header>

            <div className='flex md:flex-row flex-col gap-4 h-full' >
                <div className='md:w-1/7  h-full md:overflow-hidden overflow-auto mt-10 md:mt-0 w-full'>
                    <Sidebar />
                </div>
                <main className=' w-screen md:w-6/7 md:mr-6 mr-0'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default ProfileLayout
