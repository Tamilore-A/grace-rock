'use client';

import { motion, Variants } from 'framer-motion';
import Globe from './Globe';

export default function Leadership() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const pastors = [
    {
      name: "Pastor Adewale Joseph",
      role: "Residential Pastor",
      image: "/hero-bg.jpg", // Placeholder
    },
    {
      name: "Reverend Ilesanmi Gbenga",
      role: "General Overseer",
      image: "/hero-bg.jpg", // Placeholder
    },
    {
      name: "Pastor Felix Uzo",
      role: "Senior Pastor",
      image: "/hero-bg.jpg", // Placeholder
    },
  ];

  return (
    <section className="w-full py-32 bg-[#111111] text-white relative overflow-hidden">
      {/* Background Globe */}
      <div className="absolute top-[290px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none z-0">
        <Globe />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-20 w-fit mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-[#4E4E4E2B] rounded-full text-sm mb-6"
          >
            <span className="bg-[linear-gradient(103.21deg,#34B752_-40.27%,#02ADEF_136.21%)] bg-clip-text text-transparent">
              Leadership
            </span>
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Montserrat'] font-bold text-[50px] leading-tight"
          >
            Shepherds of<br/>the House
          </motion.h2>
        </div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {pastors.map((pastor, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="relative w-[400px] h-[400px] overflow-hidden rounded-sm mb-6 bg-slate-800">
                {/* Image Placeholder */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url('${pastor.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div>
                <h3 className="text-[17px] font-normal italic mb-1">{pastor.name}</h3>
                <p className="text-[#34B752] text-sm font-medium">{pastor.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
