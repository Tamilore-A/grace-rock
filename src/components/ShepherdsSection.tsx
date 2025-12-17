'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants, useInView, useMotionTemplate } from 'framer-motion';
import Globe from './Globe';

interface Pastor {
  name: string;
  role: string;
  image: string;
  id: string;
}

const pastors: Pastor[] = [
  {
    name: "Pastor Adewale Joseph",
    role: "Residential Pastor",
    image: "/hero-bg.jpg",
    id: "left",
  },
  {
    name: "Reverend Ilesanmi Gbenga",
    role: "General Overseer",
    image: "/pastor-general-overseer.jpg",
    id: "center",
  },
  {
    name: "Pastor Felix Uzo",
    role: "Senior Pastor",
    image: "/hero-bg.jpg",
    id: "right",
  },
];

export default function ShepherdsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring for scroll progress - lower stiffness and higher damping for fluid motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 40,
    restDelta: 0.0001,
    mass: 1.5,
  });

  // Animation Phases - stretched for smoother transitions
  // 0.0 - 0.15: Initial state
  // 0.15 - 0.5: Middle image reveals with 3D effect
  // 0.4 - 0.85: Side images fan out with overlap for seamless flow
  // 0.85 - 1.0: Final state hold

  // Center pastor animations - more gradual 3D reveal
  const rotateX = useTransform(smoothProgress, [0.1, 0.5], [90, 0]);
  const rotateY = useTransform(smoothProgress, [0.1, 0.5], [-15, 0]);
  const yMiddle = useTransform(smoothProgress, [0.1, 0.5], [120, 0]);
  const opacityMiddle = useTransform(smoothProgress, [0.1, 0.35], [0, 1]);
  const scaleMiddle = useTransform(smoothProgress, [0.1, 0.5], [0.7, 1]);
  const blurMiddle = useTransform(smoothProgress, [0.1, 0.35], [12, 0]);
  const filterMiddle = useMotionTemplate`blur(${blurMiddle}px)`;

  // Left pastor - smoother slide with longer range and overlap
  const xLeft = useTransform(smoothProgress, [0.4, 0.85], ["0%", "-130%"]);
  const rotateYLeft = useTransform(smoothProgress, [0.4, 0.85], [25, 0]);
  const scaleLeft = useTransform(smoothProgress, [0.4, 0.85], [0.85, 1]);
  const opacityLeft = useTransform(smoothProgress, [0.35, 0.5], [0, 1]);

  // Right pastor - smoother slide with longer range and overlap
  const xRight = useTransform(smoothProgress, [0.4, 0.85], ["0%", "130%"]);
  const rotateYRight = useTransform(smoothProgress, [0.4, 0.85], [-25, 0]);
  const scaleRight = useTransform(smoothProgress, [0.4, 0.85], [0.85, 1]);
  const opacityRight = useTransform(smoothProgress, [0.35, 0.5], [0, 1]);

  // Globe animation
  const globeScale = useTransform(smoothProgress, [0, 0.3, 0.8], [0.8, 1.2, 1]);
  const globeOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.1, 0.25, 0.2, 0.1]);
  const globeRotate = useTransform(smoothProgress, [0, 1], [0, 45]);

  // Floating particles configuration
  const particleVariants: Variants = {
    animate: (i: number) => ({
      y: [0, -40, 0],
      x: [0, Math.sin(i * 0.5) * 30, 0],
      opacity: [0.2, 0.6, 0.2],
      scale: [1, 1.3, 1],
      transition: {
        duration: 4 + i * 0.7,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.4,
      },
    }),
  };

  // Header text animation variants
  const headerContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
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
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0,
      },
    },
  };

  // Card glow effect
  const glowVariants: Variants = {
    animate: {
      boxShadow: [
        '0 0 30px rgba(52, 183, 82, 0.2)',
        '0 0 60px rgba(52, 183, 82, 0.4)',
        '0 0 30px rgba(52, 183, 82, 0.2)',
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Light beam variants
  const lightBeamVariants: Variants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: (i: number) => ({
      opacity: [0, 0.4, 0.2],
      scaleY: [0, 1, 1],
      transition: {
        duration: 2.5,
        delay: i * 0.3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    }),
  };

  useEffect(() => {
    if (isHeaderInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isHeaderInView, hasAnimated]);

  // Split text for animation
  const line1 = "Shepherds of";
  const line2 = "the House";

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#111111]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(52, 183, 82, 0.08) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Animated Light Beams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={lightBeamVariants}
              initial="hidden"
              animate={hasAnimated ? 'visible' : 'hidden'}
              className="absolute top-0 origin-top"
              style={{
                left: `${20 + i * 20}%`,
                width: '3px',
                height: '100%',
                background: `linear-gradient(to bottom, rgba(52, 183, 82, 0.6), rgba(2, 173, 239, 0.3), transparent)`,
                filter: 'blur(3px)',
                transform: `rotate(${-10 + i * 6}deg)`,
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={particleVariants}
              animate="animate"
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${3 + Math.random() * 6}px`,
                height: `${3 + Math.random() * 6}px`,
                background: i % 2 === 0
                  ? `radial-gradient(circle, rgba(52, 183, 82, 0.8), transparent)`
                  : `radial-gradient(circle, rgba(2, 173, 239, 0.8), transparent)`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        {/* Background Globe with Animation */}
        <motion.div
          className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none z-0"
          style={{
            scale: globeScale,
            opacity: globeOpacity,
            rotate: globeRotate,
          }}
        >
          <Globe />
        </motion.div>

        {/* Header with Character Animation */}
        <div ref={headerRef} className="relative z-20 text-center mb-12">
          {/* Badge */}
          <motion.span
            className="inline-block px-5 py-2.5 bg-[#4E4E4E2B] backdrop-blur-sm rounded-full text-sm mb-6 border border-white/10"
            variants={badgeVariants}
            initial="hidden"
            animate={hasAnimated ? 'visible' : 'hidden'}
          >
            <span className="bg-[linear-gradient(103.21deg,#34B752_-40.27%,#02ADEF_136.21%)] bg-clip-text text-transparent font-semibold">
              Leadership
            </span>
          </motion.span>

          {/* Animated Title */}
          <motion.h2
            className="font-['Montserrat'] font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-white perspective-1000"
            variants={headerContainerVariants}
            initial="hidden"
            animate={hasAnimated ? 'visible' : 'hidden'}
          >
            <span className="block">
              {line1.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                  style={{
                    textShadow: '0 4px 30px rgba(52, 183, 82, 0.3)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
            <span className="block mt-1">
              {line2.split('').map((char, index) => (
                <motion.span
                  key={index + line1.length}
                  variants={letterVariants}
                  className="inline-block"
                  style={{
                    textShadow: '0 4px 30px rgba(52, 183, 82, 0.3)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </motion.h2>
        </div>

        {/* The Stage - Pastor Cards */}
        <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[450px] flex items-center justify-center perspective-1000">

          {/* Left Pastor */}
          <motion.div
            style={{
              x: xLeft,
              rotateY: rotateYLeft,
              scale: scaleLeft,
              opacity: opacityLeft,
            }}
            className="absolute inset-0 z-10"
          >
            <motion.div
              className="w-full h-full relative rounded-2xl overflow-hidden bg-slate-800 shadow-2xl"
              variants={glowVariants}
              animate="animate"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url('${pastors[0].image}')` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-white font-bold text-xl">{pastors[0].name}</h3>
                <p className="text-[#34B752] text-sm font-medium mt-1">{pastors[0].role}</p>
              </motion.div>

              {/* Card Border Glow */}
              <div className="absolute inset-0 rounded-2xl border border-white/10" />
            </motion.div>
          </motion.div>

          {/* Right Pastor */}
          <motion.div
            style={{
              x: xRight,
              rotateY: rotateYRight,
              scale: scaleRight,
              opacity: opacityRight,
            }}
            className="absolute inset-0 z-10"
          >
            <motion.div
              className="w-full h-full relative rounded-2xl overflow-hidden bg-slate-800 shadow-2xl"
              variants={glowVariants}
              animate="animate"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url('${pastors[2].image}')` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-white font-bold text-xl">{pastors[2].name}</h3>
                <p className="text-[#34B752] text-sm font-medium mt-1">{pastors[2].role}</p>
              </motion.div>

              {/* Card Border Glow */}
              <div className="absolute inset-0 rounded-2xl border border-white/10" />
            </motion.div>
          </motion.div>

          {/* Center Pastor (Main) - Most Dramatic Animation */}
          <motion.div
            style={{
              scale: scaleMiddle,
              rotateX,
              rotateY,
              y: yMiddle,
              opacity: opacityMiddle,
              filter: filterMiddle,
            }}
            className="absolute inset-0 z-20"
          >
            <motion.div
              className="w-full h-full relative rounded-2xl overflow-hidden bg-slate-800"
              animate={{
                boxShadow: [
                  '0 25px 50px -12px rgba(52, 183, 82, 0.25), 0 0 0 1px rgba(255,255,255,0.1)',
                  '0 25px 80px -12px rgba(52, 183, 82, 0.4), 0 0 0 1px rgba(255,255,255,0.15)',
                  '0 25px 50px -12px rgba(52, 183, 82, 0.25), 0 0 0 1px rgba(255,255,255,0.1)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${pastors[1].image}')` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

              {/* Pastor Info with Reveal Animation */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-5"
                style={{
                  opacity: useTransform(scrollYProgress, [0.35, 0.45], [0, 1]),
                  y: useTransform(scrollYProgress, [0.35, 0.45], [30, 0]),
                }}
              >
                <motion.div
                  className="inline-block px-3 py-1 bg-[#34B752]/20 rounded-full text-xs text-[#34B752] font-semibold mb-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  General Overseer
                </motion.div>
                <h3 className="text-white font-bold text-2xl">{pastors[1].name}</h3>
              </motion.div>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    'inset 0 0 0 2px rgba(52, 183, 82, 0.3)',
                    'inset 0 0 0 2px rgba(52, 183, 82, 0.6)',
                    'inset 0 0 0 2px rgba(52, 183, 82, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#111111] to-transparent pointer-events-none" />

      </div>
    </section>
  );
}
