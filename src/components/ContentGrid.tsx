'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

interface ContentCard {
  label: string;
  title: string;
  actionText: string;
  actionLink: string;
  backgroundImage: string;
  gradient: string;
}

const contentCards: ContentCard[] = [
  {
    label: 'WHO WE ARE',
    title: 'About us',
    actionText: 'LEARN MORE',
    actionLink: '/about',
    backgroundImage: '/about-us-bg.png',
    gradient: 'from-black/60 via-black/30 to-transparent',
  },
  {
    label: 'JOIN OUR COMMUNITY',
    title: 'Connect with us',
    actionText: 'SIGN UP',
    actionLink: '/connect',
    backgroundImage: '/connect-bg.png',
    gradient: 'from-black/50 via-transparent to-transparent',
  },
  {
    label: 'ENDLESS CELEBRATION',
    title: 'Celebrations',
    actionText: 'LEARN MORE',
    actionLink: '/events',
    backgroundImage: '/celebrations-bg.png',
    gradient: 'from-cyan-900/40 via-transparent to-transparent',
  },
];

export default function ContentGrid() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
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

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-sm text-slate-500 mb-4">
            <span className="text-[#34B752]">✦</span>
            WELCOME TO GRACE ROCK
          </span>
          <h2 className="font-['Montserrat'] text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            WELCOME HOME!
          </h2>
          <p className="mt-4 text-slate-600 text-lg max-w-xl">
            Dive into our teachings, events and community.<br />
            Your journey of faith begins here.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {contentCards.map((card, index) => (
            <Link key={index} href={card.actionLink} className="block">
              <motion.div
                variants={itemVariants}
                className="relative h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden group cursor-pointer"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${card.backgroundImage}')` }}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-t ${card.gradient}`}
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  {/* Top Content */}
                  <div>
                    <span className="text-xs font-bold tracking-wider text-[#E63946] uppercase">
                      {card.label}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 leading-tight">
                      {card.title}
                    </h3>
                  </div>

                  {/* Bottom Action Link Style */}
                  <div
                    className="inline-flex items-center gap-2 text-sm font-bold text-white tracking-wide group/link"
                  >
                    <span className="group-hover/link:underline">{card.actionText}</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
