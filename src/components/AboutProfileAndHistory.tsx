'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

// Animated counter for years
const AnimatedYear = ({ year }: { year: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.span 
      ref={ref}
      className="text-[#00A88D] font-bold text-xl min-w-[60px]"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {year}
    </motion.span>
  );
};

// Animated text reveal for headings
const RevealText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function AboutProfileAndHistory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for decorative elements
  const decorY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const timelineEvents = [
    {
      year: '2024',
      title: 'The Inception',
      description: 'Grace Rock began as a small prayer fellowship in a living room in Agege with just 7 members hungry for a move of God.'
    },
    {
      year: '2024',
      title: 'First Public Service',
      description: 'We launched our first public service at the Community Hall. Over 50 people gave their lives to Christ on day one.'
    },
    {
      year: '2025',
      title: 'The Expansion',
      description: 'God opened the door for our permanent facility. We launched Grace Kids and our Community Outreach arm.'
    }
  ];

  return (
    <section ref={containerRef} className="flex flex-col lg:flex-row w-full min-h-screen relative overflow-hidden">
      {/* Left Column - Profile */}
      <div className="w-full lg:w-1/2 bg-white text-black p-8 md:p-16 lg:p-24 flex flex-col justify-center relative">
        {/* Decorative gradient orb */}
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#00A88D]/10 to-transparent rounded-full blur-3xl pointer-events-none"
          style={{ y: decorY }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-gray-100 text-[#00A88D] rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Grace Rock
          </motion.span>
          
          <h2 className="font-['Montserrat'] font-bold text-5xl md:text-6xl mb-8 leading-tight">
            <RevealText delay={0.1}>Our</RevealText>
            <RevealText delay={0.2}>Profile</RevealText>
          </h2>
          
          <div className="text-gray-600 text-lg leading-relaxed space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Grace Rock Church is an apostolic center located in the heart of Agege,
              Lagos. We are not just a denomination; we are a movement of grace, called
              to restore dignity to humanity through the revelation of Christ.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Founded on the principles of unadulterated truth and fervent worship, we
              are a home for the broken, a training ground for the called, and a launching
              pad for world changers.
            </motion.p>
          </div>
          
          {/* Decorative line */}
          <motion.div 
            className="mt-12 h-1 bg-gradient-to-r from-[#00A88D] to-[#34B752] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      {/* Right Column - History */}
      <div className="w-full lg:w-1/2 bg-[#111111] text-white p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-[#00A88D]/5 rounded-full blur-3xl pointer-events-none"
          style={{ y: decorY }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-white/5 text-[#00A88D] rounded-full text-sm font-medium mb-6 border border-white/10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Journey
          </motion.span>
          
          <h2 className="font-['Montserrat'] font-bold text-5xl md:text-6xl mb-16 leading-tight">
            <RevealText delay={0.1}>How we</RevealText>
            <RevealText delay={0.2}>Started</RevealText>
          </h2>

          <div ref={timelineRef} className="relative ml-4 md:ml-12 pl-8 md:pl-12 space-y-16">
            {/* Animated Timeline Line */}
            <motion.div 
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#00A88D] via-gray-700 to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ originY: 0 }}
            />
            
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              >
                {/* Animated Dot */}
                <motion.div 
                  className="absolute -left-[33px] md:-left-[49px] top-1 w-4 h-4 rounded-full bg-[#00A88D] border-4 border-[#111111]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 15, 
                    delay: 0.5 + index * 0.2 
                  }}
                >
                  {/* Pulse ring */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-[#00A88D]"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                </motion.div>
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                  <AnimatedYear year={event.year} />
                  <div>
                    <motion.h3 
                      className="text-2xl font-bold mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                    >
                      {event.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-400 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                    >
                      {event.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

