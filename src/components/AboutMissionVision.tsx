'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

// Word reveal component
const WordReveal = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <span ref={ref} className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function AboutMissionVision() {
  const mantraRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mantraRef,
    offset: ["start end", "end start"]
  });

  // Parallax for decorative elements
  const orbY1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [30, -70]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);

  return (
    <section className="flex flex-col w-full">
      {/* Core Mantra Section */}
      <div 
        ref={mantraRef}
        className="w-full bg-[#0a0a0a] py-32 px-8 md:px-16 lg:px-24 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient orbs */}
          <motion.div 
            className="absolute top-10 left-1/4 w-96 h-96 bg-[#00A88D]/10 rounded-full blur-[120px]"
            style={{ y: orbY1 }}
          />
          <motion.div 
            className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#34B752]/10 rounded-full blur-[100px]"
            style={{ y: orbY2 }}
          />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Decorative curves - left */}
        <motion.svg 
          className="absolute left-8 top-1/2 -translate-y-1/2 w-24 h-auto opacity-30 hidden lg:block"
          viewBox="0 0 100 200" 
          fill="none"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 0.3, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.path 
            d="M80 20 Q 20 100, 80 180" 
            stroke="url(#gradient1)" 
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00A88D" />
              <stop offset="100%" stopColor="#34B752" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Decorative curves - right */}
        <motion.svg 
          className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-auto opacity-30 hidden lg:block"
          viewBox="0 0 100 200" 
          fill="none"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 0.3, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.path 
            d="M20 20 Q 80 100, 20 180" 
            stroke="url(#gradient2)" 
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34B752" />
              <stop offset="100%" stopColor="#00A88D" />
            </linearGradient>
          </defs>
        </motion.svg>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Pill Badge */}
          <motion.span 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-2 bg-white/5 text-[#00A88D] rounded-full text-sm font-medium mb-10 border border-[#00A88D]/30 backdrop-blur-sm"
          >
            Core Mantra
          </motion.span>

          {/* Main Headline with word-by-word reveal */}
          <h2 className="font-['Montserrat'] font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
            <div className="mb-2">
              <WordReveal delay={0.1}>Help</WordReveal>{' '}
              <WordReveal delay={0.2}>And</WordReveal>{' '}
              <WordReveal delay={0.3}>Grace</WordReveal>{' '}
              <WordReveal delay={0.4}>From</WordReveal>{' '}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A88D] to-[#34B752] inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              >
                God
              </motion.span>
            </div>
            <div>
              <WordReveal delay={0.6}>For</WordReveal>{' '}
              <WordReveal delay={0.7}>Destiny</WordReveal>{' '}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#34B752] to-[#00A88D] inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
              >
                Fulfilment
              </motion.span>
            </div>
          </h2>

          {/* Animated divider line */}
          <motion.div 
            className="mx-auto mb-8 h-px bg-gradient-to-r from-transparent via-[#00A88D] to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* Subtext with subtle animation */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-gray-400 text-xl md:text-2xl italic"
          >
            Receiving Help On The Altar Of Grace.
          </motion.p>
        </div>
      </div>


      {/* Mission & Vision Section */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen relative">
        {/* Left Column - Image with Parallax */}
        <div className="w-full lg:w-1/2 min-h-[500px] lg:min-h-screen relative overflow-hidden">
          {/* Main Image with zoom effect */}
          <motion.div 
            className="absolute inset-0 bg-[url('/vision-mission-bg.png')] bg-cover bg-center"
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 lg:to-white z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10" />
          
          {/* Floating light particles */}
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-amber-400/40 rounded-full blur-sm"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  bottom: `${Math.random() * 30}%`,
                }}
                animate={{
                  y: [-10, -200 - Math.random() * 200],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Overlay text on image */}
          <motion.div 
            className="absolute bottom-10 left-10 z-30 hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-white/70 text-sm uppercase tracking-widest">Our Purpose</span>
          </motion.div>
        </div>

        {/* Right Column - Content */}
        <div className="w-full lg:w-1/2 bg-white text-black p-8 md:p-16 lg:p-24 flex flex-col justify-center relative">
          {/* Decorative background element */}
          <motion.div 
            className="absolute top-1/4 right-0 w-40 h-40 bg-[#00A88D]/5 rounded-full blur-3xl pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          <div className="max-w-xl relative z-10">
            {/* Vision */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >

              <div className="overflow-hidden mb-4">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-['Montserrat'] font-bold text-4xl md:text-5xl"
                >
                  Vision
                </motion.h2>
              </div>
              
              {/* Animated underline */}
              <motion.div 
                className="h-1 bg-gradient-to-r from-[#00A88D] to-[#34B752] rounded-full mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-600 text-lg leading-relaxed"
              >
                Raising men of <span className="text-[#00A88D] font-semibold">character</span>, <span className="text-[#00A88D] font-semibold">power</span> and <span className="text-[#00A88D] font-semibold">influence</span> in all nations, 
                who will find others, raise them, and guide them to fulfil 
                earthly and heavenly purpose.
              </motion.p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >

              <div className="overflow-hidden mb-4">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-['Montserrat'] font-bold text-4xl md:text-5xl"
                >
                  Mission
                </motion.h2>
              </div>
              
              {/* Animated underline */}
              <motion.div 
                className="h-1 bg-gradient-to-r from-[#34B752] to-[#00A88D] rounded-full mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gray-600 text-lg leading-relaxed"
              >
                We will follow the steps of <span className="font-semibold">Jesus Christ</span> under the full guidance 
                of the <span className="text-[#00A88D] font-semibold">Holy Spirit</span> to bring God's kingdom to men of all cadres and 
                bring them to the kingdom by engaging <span className="italic">scriptural and technological</span> avenues.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
