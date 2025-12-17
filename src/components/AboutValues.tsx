'use client';

import { motion } from 'framer-motion';

export default function AboutValues() {
  const values = [
    {
      letter: 'S',
      title: 'Selfless Service',
      description: 'Selfless and sacrificial service to God and to the body of Christ.',
      scripture: 'Exodus 23:25-26, Matthew 20:26-27',
      decoration: 'right'
    },
    {
      letter: 'P',
      title: 'Power-Packed Prayer',
      description: 'A lifestyle of powerful, effective prayer that moves mountains.',
      scripture: 'Jeremiah 33:3, James 5:16-18',
      decoration: 'top'
    },
    {
      letter: 'E',
      title: 'Effective Evangelism',
      description: 'Spreading the Gospel with power, signs, and wonders following.',
      scripture: 'Mark 16:15-18, Acts 8:26-40',
      decoration: 'bottom'
    },
    {
      letter: 'E',
      title: 'Excellence',
      description: 'Excellence in service delivery and relationships.',
      scripture: 'Daniel 6:1-3, Colossians 3:23-24',
      decoration: 'left'
    },
    {
      letter: 'D',
      title: 'Discipleship',
      description: 'Maturing converts and raising result-oriented soldiers of Christ.',
      scripture: '2 Timothy 2:1-2, Matthew 28:19',
      decoration: 'right'
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-[#111111] py-24 px-8 md:px-16 lg:px-24 relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-24 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 bg-white/5 text-[#00A88D] rounded-full text-sm font-medium mb-6 border border-white/10"
        >
          The Code
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Montserrat'] font-bold text-5xl md:text-6xl text-white mb-6"
        >
          Our <span className="text-[#00A88D]">SPEED</span> Values
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Our core values are summed up in <span className="text-[#00A88D] font-semibold">SPEED</span>.<br/>
          These are the pillars that hold up our house. We don't just teach them; we live them.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10 justify-items-center">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateX: 90, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 100,
              delay: index * 0.15 
            }}
            className={`relative group w-full max-w-[360px] perspective-1000 ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
          >
            {/* Decorative Stripes */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 0.75, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (index * 0.1), duration: 0.6, ease: "easeOut" }}
              className={`absolute z-0
              ${value.decoration === 'right' ? '-left-34 top-34 -translate-y-1' : ''}
              ${value.decoration === 'top' ? '-top-24 left-1/2 -translate-x-1/2' : ''}
              ${value.decoration === 'bottom' ? '-bottom-24 left-1/2 -translate-x-1/2' : ''}
              ${value.decoration === 'left' ? '-left-24 top-1/2 -translate-y-1/2' : ''}
            `}>
              <svg 
                width="273" 
                height="151" 
                viewBox="0 0 273 151" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M39.2844 109.981C77.5508 151.05 166.203 197.672 214.681 55.6024" stroke="#34B752" strokeWidth="10"/>
                <path d="M87.1494 88.6826C121.539 108.106 168.015 161.086 78.7972 217.617" stroke="#02ADEF" strokeWidth="10"/>
              </svg>
            </motion.div>

            <motion.div 
              className="w-full h-full relative z-10 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Letter Badge */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00A88D] to-[#008C75] flex items-center justify-center mb-6">
                <span className="text-white font-bold text-3xl">{value.letter}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed text-base mb-4 flex-grow">
                {value.description}
              </p>
              
              {/* Scripture Reference */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-[#00A88D] text-sm font-medium">
                  📖 {value.scripture}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
