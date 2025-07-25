'use-client'
import React, { ReactNode } from 'react'
import Sidebar from './sidebar'
const ProfileLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className='min-h-screen'>
            <div className='flex gap-4 h-full' >
                <div className='w-1/7 pt-8 h-full'>
                    <Sidebar  />
                </div>
                <main className='w-6/7 mr-6'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default ProfileLayout
