'use client';

import { motion } from 'framer-motion';

export default function GivingHero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 md:bg-black/60 z-10"></div>
        {/* Giving hero background image */}
        <div className="w-full h-full bg-[url('/giving-hero-bg.png')] bg-cover bg-center md:bg-[center_30%] lg:bg-top"></div>
      </div>

      {/* Content */}
      <div className="relative z-30 w-full h-full flex items-center">
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 md:gap-8 max-w-[90%] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px]"
          >
            <span className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-white/5 text-[#00A88D] rounded-full text-xs md:text-sm font-medium w-fit border border-white/10">
              Giving
            </span>
            
            <div className="relative">
              <h1 className="font-['Montserrat'] font-bold text-[40px] sm:text-[55px] md:text-[70px] lg:text-[85px] xl:text-[100px] leading-[85%] tracking-tight mb-2">
                Generosity<br/>
                Changes<br/>
                Everything.
              </h1>

              {/* Decorative Curve - Hidden on mobile, visible on larger screens */}
              <motion.svg 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden md:block absolute top-[-10px] lg:top-[-20px] right-[-80px] md:right-[-120px] lg:right-[-160px] xl:right-[-180px] w-24 md:w-32 lg:w-40 xl:w-48 h-auto" 
                viewBox="0 0 273 281" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M39.2844 109.981C77.5508 151.05 166.203 197.672 214.681 55.6024" stroke="#34B752" strokeWidth="10"/>
                <path d="M87.1494 88.6826C121.539 108.106 168.015 161.086 78.7972 217.617" stroke="#02ADEF" strokeWidth="10"/>
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
