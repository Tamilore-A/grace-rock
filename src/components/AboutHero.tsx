'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Floating Particle Component
const FloatingParticle = ({ delay, duration, x, size }: { delay: number; duration: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-t from-amber-400/60 to-white/80"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      bottom: '-20px',
      filter: 'blur(1px)',
    }}
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [-20, -800],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// Word-by-word reveal animation
const AnimatedWord = ({ children, delay }: { children: string; delay: number }) => (
  <motion.span
    className="inline-block"
    initial={{ opacity: 0, y: 50, rotateX: 90 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ 
      duration: 0.8,
      delay: delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.span>
);

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Generate particles
  const [particles] = useState(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      x: Math.random() * 100,
      size: 3 + Math.random() * 5,
    }))
  );

  const headlineWords = ["The", "Heart", "of", "The", "House"];

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Animated Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* Multi-layer cinematic gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/30 to-[#0a0a0a] z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-transparent to-[#0a0a0a]/80 z-20"></div>
        {/* Warm accent glow from bottom right to complement the subject */}
        <div className="absolute inset-0 bg-gradient-to-tl from-amber-900/20 via-transparent to-transparent z-20"></div>
        {/* Subtle teal accent from top left for brand colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A88D]/10 via-transparent to-transparent z-20"></div>
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        {/* Main Background Image - Pastor Preaching */}
        <motion.div 
          className="w-full h-[120%] bg-cover bg-center"
          style={{ backgroundImage: "url('/pastor-preaching-hero.png')" }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Floating Light Particles */}
      <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <FloatingParticle key={particle.id} {...particle} />
        ))}
      </div>

      {/* Radial Glow Behind Text */}
      <motion.div 
        className="absolute inset-0 z-25 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </motion.div>

      {/* Content with Parallax */}
      <motion.div 
        className="relative z-40 flex flex-col items-center text-center px-4 pt-24"
        style={{ y: contentY, opacity }}
      >
        {/* Pill Badge */}
        <motion.span 
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-6 py-2 bg-white/5 backdrop-blur-md text-[#00A88D] rounded-full text-sm font-medium mb-8 border border-white/10"
        >
          Who We Are
        </motion.span>
        
        {/* Main Headline with Word-by-Word Animation */}
        <h1 className="font-['Montserrat'] font-bold text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8 relative perspective-1000">
          <div className="overflow-hidden py-2">
            <AnimatedWord delay={0.3}>The</AnimatedWord>
          </div>
          <div className="overflow-hidden py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00A88D] via-[#34B752] to-[#00A88D]">
            <AnimatedWord delay={0.5}>Heart</AnimatedWord>
          </div>
          <div className="overflow-hidden py-2">
            <AnimatedWord delay={0.7}>of The</AnimatedWord>
          </div>
          <div className="overflow-hidden py-2">
            <AnimatedWord delay={0.9}>House</AnimatedWord>
          </div>
          
          {/* Decorative Curves */}
          <motion.svg 
            className="absolute -bottom-4 -right-8 md:-right-20 w-24 md:w-40 h-auto" 
            viewBox="0 0 273 281" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "backOut" }}
          >
            <motion.path 
              d="M39.2844 109.981C77.5508 151.05 166.203 197.672 214.681 55.6024" 
              stroke="#34B752" 
              strokeWidth="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.4, ease: "easeInOut" }}
            />
            <motion.path 
              d="M87.1494 88.6826C121.539 108.106 168.015 161.086 78.7972 217.617" 
              stroke="#02ADEF" 
              strokeWidth="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.6, ease: "easeInOut" }}
            />
          </motion.svg>
        </h1>

        {/* Subheadline - Core Mantra Teaser */}
        <motion.p 
          className="text-gray-300 text-lg md:text-xl max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          Help And Grace From God For Destiny Fulfilment
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-gray-400 text-sm mb-3 tracking-widest uppercase">Scroll</span>
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-gray-400/50 flex items-start justify-center p-1"
            animate={{ borderColor: ['rgba(156,163,175,0.5)', 'rgba(0,168,141,0.8)', 'rgba(156,163,175,0.5)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1.5 h-3 bg-[#00A88D] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1B1B1B] to-transparent z-50"></div>
    </section>
  );
}
