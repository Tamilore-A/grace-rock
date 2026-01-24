'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

// Text animation for individual characters
const charVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
      delay: i * 0.03,
    }
  })
};

// Container variants for staggered children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    }
  }
};

// Floating particle component
const FloatingParticle = ({ index }: { index: number }) => {
  const randomValues = useMemo(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
    color: Math.random() > 0.5 ? '#34B752' : '#02ADEF',
  }), []);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${randomValues.left}%`,
        top: `${randomValues.top}%`,
        width: randomValues.size,
        height: randomValues.size,
        backgroundColor: randomValues.color,
        opacity: randomValues.opacity,
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
        opacity: [randomValues.opacity, randomValues.opacity * 1.5, randomValues.opacity * 0.5, randomValues.opacity],
      }}
      transition={{
        duration: randomValues.duration,
        repeat: Infinity,
        delay: randomValues.delay,
        ease: "easeInOut",
      }}
    />
  );
};

// Animated text component
const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <motion.span 
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={charVariants}
          custom={i}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function GalleryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Generate particles
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => <FloatingParticle key={i} index={i} />),
  []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-900 text-white"
    >
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        <motion.div 
          className="w-full h-[120%] bg-[url('/gallery-hero-bg.png')] bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        {particles}
      </div>

      {/* Content with parallax */}
      <motion.div 
        className="relative z-30 w-full max-w-7xl mx-auto px-8 lg:px-16"
        style={{ y: contentY, opacity }}
      >
        <div className="flex flex-col gap-8 max-w-2xl">
          {/* Badge */}
          <motion.span 
            className="inline-block px-6 py-2 bg-white/5 text-[#00A88D] rounded-full text-sm font-medium w-fit border border-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 bg-[#00A88D] rounded-full mr-2"
            />
            Visual Archive
          </motion.span>
          
          {/* Main Title */}
          <div className="relative">
            <h1 className="font-['Montserrat'] font-bold text-5xl sm:text-6xl md:text-8xl lg:text-[100px] leading-[82%] tracking-tight uppercase whitespace-nowrap">
              <AnimatedText text="Captured" />
              <br />
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#34B752] to-[#02ADEF] inline-block"
              >
                Grace
              </motion.span>
            </h1>

            {/* Animated Decorative Curves */}
            <motion.svg 
              className="absolute -top-10 -right-20 w-48 h-auto hidden lg:block" 
              viewBox="0 0 273 281" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.8, type: "spring" as const }}
            >
              <motion.path 
                d="M39.2844 109.981C77.5508 151.05 166.203 197.672 214.681 55.6024" 
                stroke="#34B752" 
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
              />
              <motion.path 
                d="M87.1494 88.6826C121.539 108.106 168.015 161.086 78.7972 217.617" 
                stroke="#02ADEF" 
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.3, ease: "easeInOut" }}
              />
            </motion.svg>
          </div>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Moments of faith, fellowship, and celebration captured through our lens.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div 
            className="flex items-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div 
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div 
                className="w-1.5 h-1.5 bg-[#00A88D] rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-sm text-gray-400">Scroll to explore</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1B1B1B] to-transparent z-30" />
    </section>
  );
}
