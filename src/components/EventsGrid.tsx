'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventItem {
  id: number;
  type: 'message' | 'calendar';
  category: string;
  image?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  date: string;
  time?: string;
  location?: string;
  pastor?: string;
}

const events: EventItem[] = [
  {
    id: 1,
    type: 'message',
    category: 'Sunday Service',
    image: '/hero-bg.jpg',
    title: '"The Architecture of Faith"',
    tag: 'THE WORD',
    subtitle: 'Latest Message',
    pastor: 'Pastor Adewale Joseph',
    date: '04 Nov, 2025'
  },
  {
    id: 2,
    type: 'message',
    category: 'Sunday Service',
    image: '/hero-bg.jpg',
    title: '"The Architecture of Faith"',
    tag: 'THE WORD',
    subtitle: 'Latest Message',
    pastor: 'Pastor Adewale Joseph',
    date: '04 Nov, 2025'
  },
  {
    id: 3,
    type: 'message',
    category: 'Sunday Service',
    image: '/hero-bg.jpg',
    title: '"The Architecture of Faith"',
    tag: 'THE WORD',
    subtitle: 'Latest Message',
    pastor: 'Pastor Adewale Joseph',
    date: '04 Nov, 2025'
  },
  {
    id: 4,
    type: 'calendar',
    category: 'Worship',
    title: 'Worship Night: Deeps Calls',
    tag: 'CALENDAR',
    subtitle: 'Upcoming Gatherings',
    date: '04 Nov, 2025',
    time: '6PM',
    location: 'Main Auditorium'
  },
  {
    id: 5,
    type: 'calendar',
    category: 'Worship',
    title: 'Worship Night: Deeps Calls',
    tag: 'CALENDAR',
    subtitle: 'Upcoming Gatherings',
    date: '04 Nov, 2025',
    time: '6PM',
    location: 'Main Auditorium'
  },
  {
    id: 6,
    type: 'calendar',
    category: 'Worship',
    title: 'Worship Night: Deeps Calls',
    tag: 'CALENDAR',
    subtitle: 'Upcoming Gatherings',
    date: '04 Nov, 2025',
    time: '6PM',
    location: 'Main Auditorium'
  },
];

const categories = ["All", "Sunday Service", "Outreach", "Grace Kids", "Worship"];

export default function EventsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(event => event.category === activeCategory);

  return (
    <section className="w-full bg-white py-24 px-8 md:px-16 lg:px-24 min-h-screen">
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-[#00A88D] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div
              layout
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
            >
              {event.type === 'message' ? (
                // Message Card
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${event.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                    <div>
                      <span className="text-xs font-medium tracking-widest uppercase opacity-80 mb-1 block">{event.tag}</span>
                      <h3 className="text-2xl font-bold leading-tight">{event.subtitle}</h3>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-[#00A88D] ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold mb-1">{event.title}</h4>
                      <div className="flex justify-between items-end text-xs opacity-80">
                        <span>{event.pastor}</span>
                        <span className="text-[#00A88D]">{event.date}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Calendar Card
                <div className="absolute inset-0 bg-linear-to-br from-[#2D1B36] to-[#1A0F21] p-8 flex flex-col justify-between text-white">
                   {/* Background Overlay Effect */}
                   <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                   
                   <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-[#B8860B]/20 text-[#FFD700] text-[10px] font-bold tracking-widest uppercase rounded-full mb-2">
                        {event.tag}
                      </span>
                      <h3 className="text-lg font-medium opacity-90">{event.subtitle}</h3>
                   </div>

                   <div className="relative z-10 mt-auto">
                      <h4 className="text-3xl font-bold mb-4 leading-tight">{event.title}</h4>
                      
                      <div className="flex gap-4 text-xs font-medium text-[#00A88D] mb-6">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                        <span>{event.location}</span>
                      </div>

                      <button className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-100 transition-colors">
                        View Full Calendar
                      </button>
                   </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
