'use client';

import { motion, Variants } from 'framer-motion';

export default function GivingSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const impactAreas = [
    {
      title: "Community Care",
      description: "Supporting families in need through our food bank and welfare initiatives.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Youth Development",
      description: "Scholarships and skill acquisition programs for the next generation.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Secure Giving",
      description: "All transactions are encrypted and secure. Manage your recurring gifts easily.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5v-5h14v5zm0-7H5V8h14v3z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <section className="w-full flex flex-col lg:flex-row min-h-[700px] lg:min-h-[900px]">
      
      {/* Left Column: Call to Action */}
      <div className="w-full lg:w-1/2 relative p-8 sm:p-12 lg:p-24 flex flex-col justify-center text-white overflow-hidden">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-slate-900/40 z-10"></div>
          <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-50"></div>
        </div>

        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-black/20 text-[#00A88D] rounded-full text-xs md:text-sm mb-6 md:mb-8">
            Partner with us
          </span>
          
          <h2 className="font-['Montserrat'] font-bold text-4xl sm:text-[50px] lg:text-6xl leading-tight">
            Generosity<br/>
            Changes<br/>
            Everything.
          </h2>
          
          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 md:mb-12 max-w-md">
            Your giving helps us continue our mission of reaching the lost and serving our community in Lagos and beyond.
          </p>
          
          <div className="flex flex-wrap gap-3 md:gap-4">
            <button className="px-6 md:px-8 py-2.5 md:py-3 bg-[linear-gradient(103.21deg,#34B752_-40.27%,#02ADEF_136.21%)] text-white rounded-full hover:scale-105 transition-transform border-2 border-[#FFFFFF] text-sm md:text-base">
              Give online
            </button>
            <button className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-slate-900 rounded-full hover:bg-gray-100 transition-colors text-sm md:text-base">
              Other ways
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Impact Areas */}
      <div className="w-full lg:w-1/2 bg-[#0A0A0A] p-8 sm:p-12 lg:p-24 flex flex-col justify-center text-white">
        <motion.div 
          className="flex flex-col gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {impactAreas.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="flex gap-4 md:gap-6 items-start">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center text-black shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
