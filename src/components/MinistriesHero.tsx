'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

// Floating Particle Component
const FloatingParticle = ({ delay, duration, x, size }: { delay: number; duration: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-t from-[#00A88D]/60 to-white/80"
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

export default function MinistriesHero() {
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
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      x: Math.random() * 100,
      size: 3 + Math.random() * 5,
    }))
  );

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] md:min-h-[800px] flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Animated Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/90 z-20"></div>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Main Background Image */}
        <motion.div 
          className="w-full h-[120%] bg-[url('/ministries-hero-bg.png')] bg-cover bg-center"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
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
        <div className="absolute top-1/2 left-1/4 md:left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#00A88D]/15 via-transparent to-transparent rounded-full blur-3xl"></div>
      </motion.div>

      {/* Content with Parallax - Responsive positioning */}
      <motion.div 
        className="relative z-40 flex flex-col items-start text-left px-6 md:px-16 lg:px-24 xl:px-32 pt-24 w-full max-w-7xl mx-auto"
        style={{ y: contentY, opacity }}
      >
        {/* Pill Badge */}
        <motion.span 
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-6 py-2 bg-white/5 backdrop-blur-md text-[#00A88D] rounded-full text-sm font-medium mb-6 md:mb-8 border border-white/10"
        >
          Ministries
        </motion.span>
        
        {/* Main Headline with Word-by-Word Animation */}
        <h1 className="font-['Montserrat'] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] leading-[0.85] mb-6 md:mb-8 relative perspective-1000">
          <div className="overflow-hidden py-1 md:py-2">
            <AnimatedWord delay={0.3}>Find</AnimatedWord>{' '}
            <AnimatedWord delay={0.5}>Your</AnimatedWord>
          </div>
          <div className="overflow-hidden py-1 md:py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00A88D] via-[#34B752] to-[#00A88D]">
            <AnimatedWord delay={0.7}>People</AnimatedWord>
          </div>
          
          {/* Decorative Curves */}
          <motion.svg 
            className="absolute -top-4 md:-top-8 -right-8 md:-right-20 lg:-right-32 w-20 sm:w-28 md:w-36 lg:w-48 h-auto" 
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

        {/* Subheadline */}
        <motion.p 
          className="text-gray-300 text-base sm:text-lg md:text-xl max-w-md md:max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Connect with your community through our diverse ministries and find where you belong.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-[-80px] md:bottom-[-120px] left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-gray-400 text-xs md:text-sm mb-3 tracking-widest uppercase">Scroll</span>
          <motion.div 
            className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-gray-400/50 flex items-start justify-center p-1"
            animate={{ borderColor: ['rgba(156,163,175,0.5)', 'rgba(0,168,141,0.8)', 'rgba(156,163,175,0.5)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-2 md:w-1.5 md:h-3 bg-[#00A88D] rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-[#1B1B1B] to-transparent z-50"></div>
    </section>
  );
}

