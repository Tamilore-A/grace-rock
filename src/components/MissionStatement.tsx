'use client';

import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function MissionStatement() {
  const containerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth spring for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(smoothProgress, [0, 0.5, 1], ['50px', '0px', '-30px']);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1.1, 1]);

  // Light beam animation variants
  const lightBeamVariants: Variants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: (i: number) => ({
      opacity: [0, 0.6, 0.3],
      scaleY: [0, 1, 1],
      transition: {
        duration: 2,
        delay: i * 0.2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    }),
  };

  // Particle/bokeh animation
  const floatingParticleVariants: Variants = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      x: [0, Math.sin(i) * 20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.3,
      },
    }),
  };

  // Word-by-word reveal for heading
  const headingWords = ['WE', 'BOAST', 'IN', 'CHRIST', 'JESUS'];
  
  const wordContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      rotateX: -90,
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  };

  // Paragraph line reveal
  const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Button animation
  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 1.6,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 30px rgba(2, 173, 239, 0.5)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Glow pulse animation for button
  const glowVariants: Variants = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(2, 173, 239, 0.3)',
        '0 0 40px rgba(2, 173, 239, 0.6)',
        '0 0 20px rgba(2, 173, 239, 0.3)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y: backgroundY, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/mission-bg.png')" }}
        />
      </motion.div>

      {/* Animated Light Beams Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={lightBeamVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="absolute bottom-0 origin-bottom"
            style={{
              left: `${15 + i * 18}%`,
              width: '4px',
              height: '100%',
              background: `linear-gradient(to top, rgba(2, 173, 239, 0.8), rgba(52, 183, 82, 0.3), transparent)`,
              filter: 'blur(2px)',
              transform: `rotate(${-15 + i * 7}deg)`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles/Bokeh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatingParticleVariants}
            animate="animate"
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: `radial-gradient(circle, rgba(2, ${150 + Math.random() * 50}, ${200 + Math.random() * 55}, 0.8), transparent)`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 lg:pb-32"
        style={{ y: contentY, opacity }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Animated Heading - Word by Word */}
            <motion.h2
              className="font-['Montserrat'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 perspective-1000"
              variants={wordContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {headingWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-4 md:mr-5"
                  style={{ 
                    textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {word}
                  {index === 1 && <br className="hidden sm:block" />}
                </motion.span>
              ))}
            </motion.h2>

            {/* Animated Paragraph */}
            <motion.p
              className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-xl"
              variants={paragraphVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              Our greatest success story at Grace Rock has been the &apos;grace&apos; to
              effectively evangelize, make disciples of, and deploy people who once upon a
              time were mere seekers, as mature disciples and vibrant ministers of the gospel.
            </motion.p>

            {/* Animated CTA Button */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover="hover"
              whileTap="tap"
              className="inline-block"
            >
              <motion.div variants={glowVariants} animate="animate">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[linear-gradient(103.21deg,#34B752_-40.27%,#02ADEF_136.21%)] text-white font-bold text-sm tracking-wide rounded-full transition-all duration-300"
                >
                  LEARN MORE
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#1B1B1B] to-transparent" />
    </section>
  );
}
