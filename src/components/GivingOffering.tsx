'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const bankDetails = [
  {
    type: 'Offering',
    bank: 'Access Bank',
    accountNumber: '0028773666272722',
    color: 'bg-[#E0F7FA] text-[#006064]', // Light Cyan/Teal
  },
  {
    type: 'Tithe',
    bank: 'First Bank',
    accountNumber: '47987543325679',
    color: 'bg-[#F3E5F5] text-[#4A148C]', // Light Purple
  },
  {
    type: 'Special',
    bank: 'Fidelity Bank',
    accountNumber: '556490082176',
    color: 'bg-[#E8F5E9] text-[#1B5E20]', // Light Green
  },
];

export default function GivingOffering() {
  const [accountType, setAccountType] = useState<'Naira' | 'Domiciliary'>('Naira');

  return (
    <section className="w-full bg-white py-24 px-8 md:px-16 lg:px-24 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-3xl mb-20">
        <span className="inline-block px-4 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium mb-6">
          Offering
        </span>
        <h2 className="font-['Montserrat'] font-bold text-4xl md:text-5xl text-[#111] mb-10 leading-tight">
          Your giving helps us<br />
          continue our mission
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setAccountType('Naira')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              accountType === 'Naira'
                ? 'bg-[#00A88D] text-white shadow-lg'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            Naira Account
          </button>
          <button
            onClick={() => setAccountType('Domiciliary')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              accountType === 'Domiciliary'
                ? 'bg-[#00A88D] text-white shadow-lg'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            Domiciliary Account
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl w-full">
        {/* Left Column: Bank Details Timeline */}
        <div className="relative">
          {/* Vertical Dotted Line */}
          <div className="absolute left-[50px] top-4 bottom-4 w-px border-l-2 border-dotted border-gray-200"></div>

          <div className="space-y-12">
            {bankDetails.map((detail, index) => (
              <motion.div
                key={detail.type}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-center gap-8"
              >
                {/* Label Pill */}
                <div className={`w-[100px] py-2 rounded-full text-center text-xs font-bold ${detail.color} z-10`}>
                  {detail.type}
                </div>

                {/* Connector Dot */}
                <div className="absolute left-[44px] w-3 h-3 rounded-full bg-[#111] border-2 border-white z-10"></div>

                {/* Bank Info */}
                <div>
                  <h3 className="font-bold text-2xl text-[#111] mb-1">{detail.bank}</h3>
                  <p className="text-gray-500 font-medium tracking-wide">{detail.accountNumber}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: International Payment Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-[#111] rounded-3xl p-10 md:p-12 overflow-hidden text-white min-h-[400px] flex flex-col justify-center"
        >
          {/* Decorative Background Circles/Flags Placeholder */}
          <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
             {/* Abstract circles to represent the flags in the design */}
             <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-900/50 blur-xl"></div>
             <div className="absolute right-10 top-1/2 w-32 h-32 rounded-full bg-red-900/50 blur-xl"></div>
             <div className="absolute right-0 bottom-0 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>
          </div>

          <div className="relative z-10 max-w-sm">
            <span className="inline-block px-4 py-1 bg-[#222] text-[#00A88D] rounded-full text-xs font-medium mb-6 border border-[#333]">
              International Payment
            </span>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Give securely from anywhere in the world using PayPal balance, credit/debit cards, or bank accounts.
            </p>

            <button className="px-8 py-3 bg-[#00A88D] text-white font-bold rounded-full hover:bg-[#008f78] transition-colors shadow-lg shadow-[#00A88D]/20">
              Give Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
