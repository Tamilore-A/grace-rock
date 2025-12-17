'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface GalleryItem {
  id: number;
  category: string;
  image: string;
  title: string;
  height: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, category: "Sunday Service", image: "/hero-bg.jpg", title: "Morning Worship", height: "h-[400px]" },
  { id: 2, category: "Worship", image: "/hero-bg.jpg", title: "Praise Night", height: "h-[300px]" },
  { id: 3, category: "Outreach", image: "/hero-bg.jpg", title: "Community Service", height: "h-[500px]" },
  { id: 4, category: "Grace Kids", image: "/hero-bg.jpg", title: "Children's Ministry", height: "h-[350px]" },
  { id: 5, category: "Sunday Service", image: "/hero-bg.jpg", title: "Evening Service", height: "h-[450px]" },
  { id: 6, category: "Worship", image: "/hero-bg.jpg", title: "Youth Worship", height: "h-[320px]" },
  { id: 7, category: "Outreach", image: "/hero-bg.jpg", title: "Mission Trip", height: "h-[380px]" },
  { id: 8, category: "Grace Kids", image: "/hero-bg.jpg", title: "Bible Study", height: "h-[280px]" },
  { id: 9, category: "Sunday Service", image: "/hero-bg.jpg", title: "Sermon Series", height: "h-[420px]" },
];

const categories = ["All", "Sunday Service", "Outreach", "Grace Kids", "Worship"];

// Card animation variants
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    rotateX: 15,
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
      delay: i * 0.1,
    }
  }),
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -30,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    }
  }
};

// Filter button variants
const buttonVariants: Variants = {
  inactive: { 
    scale: 1,
    backgroundColor: "rgba(42, 42, 42, 1)",
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

// 3D Card component with cursor tracking
const GalleryCard = ({ 
  item, 
  index, 
  onClick 
}: { 
  item: GalleryItem; 
  index: number;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    const rotateXVal = (mouseY / rect.height) * -15;
    const rotateYVal = (mouseX / rect.width) * 15;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
    
    // Calculate glow position
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`relative w-full ${item.height} rounded-2xl overflow-hidden break-inside-avoid cursor-pointer perspective-1000`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ z: 50 }}
    >
      {/* Glow effect that follows cursor */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(0, 168, 141, 0.3) 0%, transparent 50%)`,
        }}
      />
      
      {/* Image with zoom effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${item.image}')` }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Category badge */}
      <motion.div 
        className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.1 }}
      >
        {item.category}
      </motion.div>

      {/* Title overlay on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6 opacity-0 hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 20 }}
        whileHover={{ y: 0 }}
      >
        <h3 className="text-white text-xl font-semibold mb-1">{item.title}</h3>
        <p className="text-white/70 text-sm flex items-center gap-2">
          View photo
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            →
          </motion.span>
        </p>
      </motion.div>
      
      {/* Shine effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-500"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.3) 45%, transparent 50%)`,
        }}
      />
    </motion.div>
  );
};

// Lightbox Modal Component
const Lightbox = ({ 
  item, 
  onClose 
}: { 
  item: GalleryItem | null; 
  onClose: () => void;
}) => {
  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-5xl max-h-[90vh] w-full mx-8"
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ type: "spring" as const, damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white text-2xl font-bold">{item.title}</h3>
          <p className="text-white/70">{item.category}</p>
        </motion.div>
        
        {/* Close button */}
        <motion.button
          className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-xl"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          ×
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section className="w-full bg-[#1B1B1B] py-24 px-8 md:px-16 lg:px-24 min-h-screen">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-['Montserrat'] font-bold text-4xl md:text-5xl text-white mb-4">
          Browse Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34B752] to-[#02ADEF]">Gallery</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Explore moments captured from our community gatherings, services, and celebrations.
        </p>
      </motion.div>

      {/* Animated Filter Bar */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
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
            className={`relative px-5 md:px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeCategory === category
                ? 'text-white shadow-lg shadow-[#00A88D]/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {category}
            {/* Active indicator */}
            {activeCategory === category && (
              <motion.div
                layoutId="activeFilterIndicator"
                className="absolute inset-0 bg-[#00A88D] rounded-full -z-10"
                initial={false}
                transition={{ type: "spring" as const, damping: 25, stiffness: 300 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Results count */}
      <motion.div 
        className="text-center mb-8"
        key={activeCategory}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-gray-500 text-sm">
          Showing <motion.span 
            className="font-semibold text-[#00A88D]"
            key={filteredItems.length}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {filteredItems.length}
          </motion.span> {filteredItems.length === 1 ? 'photo' : 'photos'}
          {activeCategory !== "All" && (<span> in <span className="font-medium text-white">{activeCategory}</span></span>)}
        </span>
      </motion.div>

      {/* Masonry Grid */}
      <motion.div 
        layout
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <GalleryCard 
              key={item.id} 
              item={item} 
              index={index}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      <AnimatePresence>
        {filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-gray-400 text-lg">No photos found in this category.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
