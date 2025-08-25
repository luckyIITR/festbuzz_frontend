'use client';

import Image from "next/image";
interface CallToActionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CallToAction = ({
  subheading = 'Guide us on your campus!',
  description = 'We are a brand that want to bring all stakeholder together for a smooth conduction of a college fest with the help of tech and our expertise.',
  buttonText = 'Sign up for CA',
  buttonLink = '#',
}: CallToActionProps) => (
  <section className="relative z-10 w-full flex flex-row items-center justify-between overflow-hidden h-80">
    <div className="flex-1 flex flex-col w-full  px-4  h-full justify-center items-start z-10 md:px-8 lg:px-20 py-10 md:py-16  bg-[#0248F7]">
      
      <h3 className="text-xl md:text-5xl font-bold text-[#E1FF01] mb-10 font-clash">{subheading}</h3>
      <p className="text-white text-base md:text-xl font-[600] mb-6  font-urbanist">{description}</p>
      <a href={buttonLink} className="inline-flex items-center gap-2 px-6 py-1 font-urbanist rounded-full bg-[#E1FF01] text-black font-bold shadow hover:bg-lime-100 transition text-base md:text-lg">
        {buttonText} <span>↗</span>
      </a>
    </div>
    <Image alt="" src="/assets/SideSquare.png" width={300} height={100} className="h-full"/>

    {/* Decorative squares */}
    
  </section>
);

export default CallToAction;