'use client';

interface CallToActionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CallToAction = ({
  heading = 'FEST',
  subheading = 'Guide us on your campus!',
  description = 'We are a brand that want to bring all stakeholder together for a smooth conduction of a college fest with the help of tech and our expertise.',
  buttonText = 'Sign up for CA',
  buttonLink = '#',
}: CallToActionProps) => (
  <section className="relative z-10 w-full bg-[#0248F7] px-4 md:px-8 lg:px-20 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between overflow-hidden">
    <div className="flex-1 flex flex-col justify-center items-start z-10">
      <h2 className="text-4xl md:text-6xl font-extrabold text-[#E1FF01] mb-2 flex items-center gap-3">
        {heading}
        <span className="text-4xl md:text-5xl text-white">✦</span>
        <span className="text-pink-400">BUZZ</span>
      </h2>
      <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-2">{subheading}</h3>
      <p className="text-white text-base md:text-lg mb-6 max-w-lg">{description}</p>
      <a href={buttonLink} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E1FF01] text-black font-bold shadow hover:bg-lime-100 transition text-base md:text-lg">
        {buttonText} <span>↗</span>
      </a>
    </div>
    {/* Decorative squares */}
    {/* <div className="absolute right-0 bottom-0 md:static flex-1 flex justify-end items-end h-full w-full md:w-auto z-0">
      <div className="grid grid-cols-4 grid-rows-4 gap-1 p-4 md:p-8">
        {[...Array(16)].map((_, i) => {
          // Randomly pick color and animation
          const color = Math.random() > 0.5 ? 'bg-yellow-300' : 'bg-black';
          const animate = Math.random() > 0.7 ? 'animate-pulse' : '';
          return (
            <span
              key={i}
              className={`w-5 h-5 md:w-7 md:h-7 ${color} ${animate} rounded-sm`}
            />
          );
        })}
      </div>
    </div> */}
  </section>
);

export default CallToAction; 