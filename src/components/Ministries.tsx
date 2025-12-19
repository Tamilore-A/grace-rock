'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

interface Ministry {
  title: string;
  lead: string;
  image: string;
}

const ministries: Ministry[] = [
  {
    title: "Community Outreach & Evangelism Ministry",
    lead: "Bro Frank Martins",
    image: "/ministry-outreach.png",
  },
  {
    title: "Children's Ministry",
    lead: "Sis Grace Adekunle",
    image: "/ministry-children.png",
  },
  {
    title: "Youth & Teen Ministry",
    lead: "Bro Onyeka Nzeribe",
    image: "/ministry-youth.png",
  },
  {
    title: "Women's Ministry",
    lead: "Deaconess Aramide Opawole",
    image: "/ministry-women.png",
  },
  {
    title: "Men's Fellowship Ministry",
    lead: "Elder Kasali Peter",
    image: "/ministry-men.png",
  },
  {
    title: "Music & Worship Ministry",
    lead: "Bro Samuel Oyeneye",
    image: "/ministry-worship.png",
  },
];

// Unified card component with responsive styles
const MinistryCard = ({ 
  ministry, 
  index, 
  scrollYProgress,
  total
}: { 
  ministry: Ministry; 
  index: number; 
  scrollYProgress: MotionValue<number>;
  total: number;
}) => {
  const step = 1 / (total - 1);
  const peak = index * step;
  const range = 0.25;
  
  const scale = useTransform(
    scrollYProgress,
    [peak - range, peak, peak + range],
    [0.8, 1.1, 0.8]
  );

  return (
    <motion.div 
      style={{ scale, transformOrigin: 'center center' }}
      className="group relative h-[320px] w-[220px] sm:h-[400px] sm:w-[280px] md:h-[500px] md:w-[350px] overflow-hidden bg-slate-100 shrink-0 cursor-pointer rounded-2xl shadow-xl"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url('${ministry.image}')` }}
      ></div>
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <h3 className="text-xl md:text-[28px] font-bold leading-tight mb-2 md:mb-3">{ministry.title}</h3>
        <p className="text-[#34B752] text-sm md:text-base font-medium">
          Lead by <span className="text-white">{ministry.lead}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default function Ministries() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Responsive scroll ranges
  // Mobile needs a bit more travel distance because cards start further right
  const x = useTransform(
    smoothProgress, 
    [0, 1], 
    isMobile ? ["5%", "-90%"] : ["10%", "-75%"]
  );

  return (
    <section ref={targetRef} className={`relative bg-white text-slate-900 ${isMobile ? 'h-[400vh]' : 'h-[500vh]'}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <motion.div style={{ x }} className="flex gap-6 md:gap-12 pl-4 md:pl-10 items-center">
            
            {/* Title Section */}
            <div className="flex flex-col justify-center min-w-[200px] md:min-w-[400px] pr-4 md:pr-10 pl-6 md:pl-20">
                <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-[#E6F7F4] text-[#00A88D] rounded-full text-xs md:text-sm w-fit mb-4 md:mb-6 font-semibold tracking-wide">
                    MINISTRIES
                </span>
                <h2 className="font-['Montserrat'] font-bold text-4xl md:text-[60px] leading-[1.1] mb-4 md:mb-6 text-slate-900">
                    Find Your<br/>People
                </h2>
                <p className="text-sm md:text-[18px] leading-relaxed max-w-[250px] md:max-w-[350px] text-slate-600">
                    Journey through our ministries and get plugged into where God is leading you.
                </p>
            </div>

            {/* Cards */}
            {ministries.map((ministry, index) => (
                <MinistryCard 
                  key={index} 
                  ministry={ministry} 
                  index={index} 
                  scrollYProgress={smoothProgress}
                  total={ministries.length}
                />
            ))}
        </motion.div>

      </div>
    </section>
  );
}
