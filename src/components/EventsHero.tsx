'use client';

import { motion } from 'framer-motion';

export default function EventsHero() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        {/* Replace src with actual image path later */}
        <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-6 py-2 bg-white/5 text-[#00A88D] rounded-full text-sm font-medium mb-6 border border-white/10"
        >
          Event Updates
        </motion.span>
        
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-['Montserrat'] font-bold text-6xl md:text-8xl leading-none mb-2"
          >
            Our<br/>
            Events
          </motion.h1>

          {/* Decorative Curve */}
          <motion.svg 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-[40px] right-[-100px] md:right-[-140px] w-32 md:w-48 h-auto" 
            viewBox="0 0 273 281" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M39.2844 109.981C77.5508 151.05 166.203 197.672 214.681 55.6024" stroke="#34B752" strokeWidth="10"/>
            <path d="M87.1494 88.6826C121.539 108.106 168.015 161.086 78.7972 217.617" stroke="#02ADEF" strokeWidth="10"/>
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
