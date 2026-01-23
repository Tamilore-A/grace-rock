'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ministry {
  title: string;
  lead: string;
  category: string;
  image: string;
}

const ministries: Ministry[] = [
  {
    title: "Community Outreach & Evangelism Ministry",
    lead: "Bro Frank Martins",
    category: "Outreach",
    image: "/ministry-outreach.png",
  },
  {
    title: "Children's Ministry",
    lead: "Sis Grace Adekunle",
    category: "Grace Kids",
    image: "/ministry-children.png",
  },
  {
    title: "Youth & Teen Ministry",
    lead: "Bro Onyeka Nzeribe",
    category: "Grace Kids",
    image: "/ministry-youth.png",
  },
  {
    title: "Women's Ministry",
    lead: "Deaconess Aramide Opawole",
    category: "Sunday Service",
    image: "/ministry-women.png",
  },
  {
    title: "Men's Fellowship Ministry",
    lead: "Elder Kasali Peter",
    category: "Sunday Service",
    image: "/ministry-men.png",
  },
  {
    title: "Music & Worship Ministry",
    lead: "Bro Samuel Oyeneye",
    category: "Worship",
    image: "/ministry-worship.png",
  },
];

const categories = ["All", "Sunday Service", "Outreach", "Grace Kids", "Worship"];

// Card animation variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.9,
    rotateX: 15
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
      delay: i * 0.08,
    }
  }),
  exit: {
    opacity: 0,
    scale: 0.85,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn" as const
    }
  }
};

// Filter button variants
const buttonVariants = {
  inactive: { 
    scale: 1,
    backgroundColor: "rgba(255, 255, 255, 1)"
  },
  active: { 
    scale: 1.05,
    backgroundColor: "rgba(0, 168, 141, 1)",
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 300
    }
  },
  tap: { scale: 0.95 }
};

export default function MinistriesGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMinistries = activeCategory === "All" 
    ? ministries 
    : ministries.filter(m => m.category === activeCategory);

  return (
    <section className="w-full bg-[#FFFBF4] py-24 px-8 md:px-16 lg:px-24 min-h-screen">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-['Montserrat'] font-bold text-4xl md:text-5xl text-[#111111] mb-4">
          Explore Our <span className="text-[#00A88D]">Ministries</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Find your place in our community through one of our vibrant ministries.
        </p>
      </motion.div>

      {/* Filter Bar with enhanced animations */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            variants={buttonVariants}
            initial="inactive"
            animate={activeCategory === category ? "active" : "inactive"}
            whileTap="tap"
            whileHover={{ scale: 1.02, y: -2 }}
            custom={index}
            className={`px-5 md:px-6 py-2.5 rounded-full text-sm font-medium shadow-sm border transition-colors duration-300 ${
              activeCategory === category
                ? 'text-white border-[#00A88D] shadow-lg shadow-[#00A88D]/20'
                : 'text-gray-600 border-gray-200 hover:border-[#00A88D]/50'
            }`}
          >
            {category}
            {/* Active indicator dot */}
            {activeCategory === category && (
              <motion.span
                layoutId="activeIndicator"
                className="ml-2 inline-block w-1.5 h-1.5 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Results count */}
      <motion.div 
        className="text-center mb-8"
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-gray-500 text-sm">
          Showing <span className="font-semibold text-[#00A88D]">{filteredMinistries.length}</span> {filteredMinistries.length === 1 ? 'ministry' : 'ministries'}
          {activeCategory !== "All" && (<span> in <span className="font-medium">{activeCategory}</span></span>)}
        </span>
      </motion.div>

      {/* Grid with enhanced animations */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto perspective-1000"
      >
        <AnimatePresence mode="popLayout">
          {filteredMinistries.map((ministry, index) => (
            <motion.div
              layout
              key={ministry.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Container */}
              <motion.div 
                className="relative aspect-square overflow-hidden rounded-2xl mb-5 shadow-lg"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 168, 141, 0.25)" }}
              >
                {/* Image with zoom effect */}
                <motion.div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${ministry.image}')` }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <motion.div 
                  className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#00A88D]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                >
                  {ministry.category}
                </motion.div>

                {/* Hover Action */}
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    Learn More 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.08 }}
              >
                <h3 className="font-['Montserrat'] text-xl font-semibold text-[#111111] mb-2 group-hover:text-[#00A88D] transition-colors duration-300">
                  {ministry.title}
                </h3>
                <p className="text-[#00A88D] text-sm font-medium flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#00A88D]/10 flex items-center justify-center text-xs">👤</span>
                  Led by {ministry.lead}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      <AnimatePresence>
        {filteredMinistries.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-gray-500 text-lg">No ministries found in this category.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

