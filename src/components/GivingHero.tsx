'use client';

import { motion } from 'framer-motion';

export default function GivingHero() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        {/* Replace src with actual image path later */}
        <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-50"></div>
      </div>

      {/* Content */}
      <div className="absolute top-[320px] left-[305px] w-[600px] h-[630px] flex flex-col gap-[32px] z-30 text-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-[32px] w-min"
        >
          <span className="inline-block px-6 py-2 bg-white/5 text-[#00A88D] rounded-full text-sm font-medium w-fit border border-white/10">
            Giving
          </span>
          
          <div className="relative">
            <h1 className="font-['Montserrat'] font-bold text-[100.12px] leading-[82%] tracking-[0] mb-2 whitespace-nowrap">
              Generosity<br/>
              Changes<br/>
              Everything.
            </h1>

            {/* Decorative Curve */}
            <motion.svg 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-[-20px] right-[-180px] w-48 h-auto" 
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
    </section>
  );
}
