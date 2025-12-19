'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import Globe from './Globe';
import Ticker from './Ticker';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

// Character animation variants
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
      delay: i * 0.04,
    }
  })
};

// Word animation variants
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
      delay: i * 0.15,
    }
  })
};

// Container variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

// Floating particle component
const FloatingParticle = ({ index }: { index: number }) => {
  const randomValues = useMemo(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 12,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.3 + 0.1,
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
        y: [0, -20, 0, 15, 0],
        x: [0, 10, -8, 5, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
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

// Animated word component
const AnimatedWord = ({ word, index }: { word: string; index: number }) => (
  <motion.span
    className="inline-block"
    variants={wordVariants}
    custom={index}
    style={{ transformStyle: 'preserve-3d' }}
  >
    {word.split('').map((char, i) => (
      <motion.span
        key={`${char}-${i}`}
        className="inline-block"
        variants={charVariants}
        custom={index * 5 + i}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {char}
      </motion.span>
    ))}
  </motion.span>
);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Cinematic parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Background cinematic transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const backgroundBlur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 8]);
  
  // Content cinematic transforms
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const contentRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 5]);
  
  // Globe cinematic transforms (moves faster for depth effect)
  const globeY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const globeScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // Mobile globe transforms
  const mobileGlobeY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const mobileGlobeOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 0]);

  // Handle client-side only rendering for random particles to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate particles only after mount
  const particles = useMemo(() => {
    if (!mounted) return null;
    return Array.from({ length: 15 }, (_, i) => <FloatingParticle key={i} index={i} />);
  }, [mounted]);

  const titleWords = ['The', 'Grace', 'Rock', 'Church'];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-x-hidden bg-slate-900 text-white"
    >
      {/* Cinematic Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y: backgroundY, 
          scale: backgroundScale,
          filter: useTransform(backgroundBlur, (value) => `blur(${value}px)`)
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-slate-900/40 z-10"></div>
        <motion.div 
          className="w-full h-[130%] bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-50"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {particles}
      </div>

      {/* Content Container with Cinematic Scroll */}
      <motion.div 
        className="relative z-20 container mx-auto px-6 md:px-8 lg:px-12 py-24 md:py-32"
        style={{ 
          y: contentY, 
          opacity: contentOpacity, 
          scale: contentScale,
          rotateX: contentRotateX,
          transformPerspective: 1200
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text Content - LEFT ALIGNED on all screen sizes */}
          <motion.div 
            className="flex flex-col gap-6 md:gap-8 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="flex flex-col gap-4 md:gap-6">
              {/* Animated Title */}
              <h1 className="font-['Montserrat'] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] leading-[82%] tracking-tight">
                {titleWords.map((word, i) => (
                  <span key={word}>
                    <AnimatedWord word={word} index={i} />
                    {i < titleWords.length - 1 && <br />}
                  </span>
                ))}
              </h1>
              
              {/* Animated Description */}
              <motion.p 
                className="text-base md:text-lg text-gray-300 leading-relaxed max-w-md"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                A sanctuary for modern believers. Where ancient faith meets contemporary lifestyle
              </motion.p>
            </motion.div>

            {/* Animated Buttons */}
            <motion.div 
              className="flex flex-wrap gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.button 
                className="px-6 md:px-8 py-2.5 md:py-3 bg-[linear-gradient(103.21deg,#34B752_-40.27%,#02ADEF_136.21%)] text-white rounded-full font-medium text-sm md:text-base shadow-lg shadow-emerald-500/20"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(52, 183, 82, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Live
              </motion.button>
              <motion.button 
                className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-slate-900 rounded-full font-medium text-sm md:text-base"
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
              >
                Quick Links
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Globe Graphic - Large screens with cinematic scroll */}
          <motion.div 
            className="hidden lg:flex justify-center items-center"
            style={{ 
              y: globeY, 
              opacity: globeOpacity, 
              scale: globeScale 
            }}
          >
            <motion.div 
              className="w-[400px] xl:w-[500px] 2xl:w-[600px] aspect-square relative"
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5, type: "spring" as const }}
            >
              <Globe />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile/Tablet Globe - Cinematic scroll on right side */}
      <motion.div 
        className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-15 lg:hidden pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8, type: "spring" as const }}
        style={{ 
          y: mobileGlobeY, 
          opacity: mobileGlobeOpacity 
        }}
      >
        <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] relative opacity-70">
          <Globe />
        </div>
      </motion.div>

      {/* Decorative Stripes Top - Animated draw effect */}
      <motion.div 
        className="absolute top-4 md:top-[30px] left-1/2 -translate-x-1/2 z-10 hidden sm:block"
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 1.5, type: "spring" as const }}
      >
        <svg className="w-32 md:w-48 lg:w-[219px] h-auto" viewBox="0 0 219 204" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M98.2071 1.98926C75.8737 53.4893 68.6071 153.389 218.207 140.989" 
            stroke="#34B752" 
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
          />
          <motion.path 
            d="M136.875 37.3382C132.83 76.6265 102.865 140.414 15.3646 81.2593" 
            stroke="#02ADEF" 
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.1, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Decorative Stripes Bottom Right */}
      <motion.div 
        className="absolute bottom-16 md:bottom-[16px] right-4 md:right-10 z-10 rotate-180 hidden sm:block"
        initial={{ opacity: 0, scale: 0, rotate: 160 }}
        animate={{ opacity: 1, scale: 1, rotate: 180 }}
        transition={{ duration: 1, delay: 1.7, type: "spring" as const }}
      >
        <svg className="w-32 md:w-48 lg:w-[219px] h-auto" viewBox="0 0 219 204" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M98.2071 1.98926C75.8737 53.4893 68.6071 153.389 218.207 140.989" 
            stroke="#34B752" 
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
          />
          <motion.path 
            d="M136.875 37.3382C132.83 76.6265 102.865 140.414 15.3646 81.2593" 
            stroke="#02ADEF" 
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.3, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <Ticker />
    </section>
  );
}


