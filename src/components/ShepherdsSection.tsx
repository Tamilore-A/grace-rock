'use client';

import { motion, Variants } from 'framer-motion';

interface Pastor {
  name: string;
  role: string;
  image: string;
}

const pastors: Pastor[] = [
  {
    name: "Pastor Mrs Popoola",
    role: "Residential Pastor",
    image: "/pastor-residential.jpg",
  },
  {
    name: "Pastor Funsho Popoola",
    role: "General Overseer",
    image: "/pastor-general-overseer.jpg",
  },
  {
    name: "Pastor Felix Uzo",
    role: "Senior Pastor",
    image: "/hero-bg.jpg",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function ShepherdsSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-[#111111] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#34B752]/30 via-transparent to-[#02ADEF]/20 blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-[#4E4E4E2B] backdrop-blur-sm rounded-full text-sm mb-4 md:mb-6 border border-white/10">
            <span className="bg-[linear-gradient(103.21deg,#34B752_-40.27%,#02ADEF_136.21%)] bg-clip-text text-transparent font-semibold">
              Leadership
            </span>
          </span>
          <h2 className="font-['Montserrat'] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white">
            Shepherds of<br />the House
          </h2>
        </motion.div>

        {/* Pastor Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {pastors.map((pastor, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                index === 1 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Card Container */}
              <div className="relative h-[500px] sm:h-[450px] md:h-[500px]">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${pastor.image}')` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Glow Border on Hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[#34B752]/50 transition-colors duration-300" />
                
                {/* Pastor Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  {index === 1 && (
                    <span className="inline-block px-3 py-1 bg-[#34B752]/20 rounded-full text-xs text-[#34B752] font-semibold mb-2">
                      General Overseer
                    </span>
                  )}
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-1">{pastor.name}</h3>
                  <p className="text-[#34B752] text-sm font-medium">{pastor.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
    </section>
  );
}
