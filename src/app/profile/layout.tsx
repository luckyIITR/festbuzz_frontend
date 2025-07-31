'use-client'
import React, { ReactNode } from 'react'
import Sidebar from './sidebar'
const ProfileLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className='min-h-screen'>
            <div className='flex md:flex-row flex-col gap-4 h-full' >
                <div className='md:w-1/7 pt-8 h-full md:overflow-hidden overflow-auto'>
                    <Sidebar  />
                </div>
                <main className=' w-screen md:w-6/7 md:mr-6 mr-0'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default ProfileLayout
