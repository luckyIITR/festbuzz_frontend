import React from 'react'

const pages = () => {
  return (
    <div>
      <div className='w-full bg-[#181818] h-full min-h-180 mt-8 rounded-xl'>
        <div className='flex gap-8 items-center'>
          <div className='pl-8 text-[20px] pt-8 text-[#E1FF01] font-[700]'>Notifications</div>
          <div className='px-4 mt-8 font-urbanist font-[400]  border border-[#E1FF01] rounded-xl'>2 new!</div>
        </div>
        <div className='flex flex-col gap-8 pl-8 pt-10'>



          <div className='flex  justify-between  mr-8 border-b border-white pb-2'>
            <div className='flex flex-wrap content-center gap-4 '>
              <div className='w-15 h-15 rounded-full bg-[#FD3EB5]'></div>
              <div className='flex-col flex gap-2 '>
                <div className='font-urbanist font-[600] w-120 text-[14px]/5'>Meg Griffin has left you a review. Both of your reviews from this trip are now public.
                </div>
                <div className='font-urbanist font-[400] text-[13px] text-[#717171]'>March 1, 2023</div>
              </div>
            </div>
            <div className='font-urbanist pr-2 pt-4'>❌</div>
          </div>

          
          <div className='flex  justify-between  mr-8 border-b border-white pb-2'>
            <div className='flex flex-wrap content-center gap-4 '>
              <div className='w-15 h-15 rounded-full bg-[#FD3EB5]'></div>
              <div className='flex-col flex gap-2 '>
                <div className='font-urbanist font-[600] w-120 text-[14px]/5'>Meg Griffin has left you a review. Both of your reviews from this trip are now public.
                </div>
                <div className='font-urbanist font-[400] text-[13px] text-[#717171]'>March 1, 2023</div>
              </div>
            </div>
            <div className='font-urbanist pr-2 pt-4'>❌</div>
          </div>




        </div>
      </div>

    </div>
  )
}

export default pages
