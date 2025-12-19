'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen bg-[#1B1B1B] w-full text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-[url('/connect-bg.png')] bg-cover bg-center opacity-50" />
        
        <div className="relative z-20 container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-['Montserrat'] font-bold text-5xl md:text-7xl mb-6"
          >
            Connect With Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            We'd love to hear from you. Join our community and let's grow together in faith.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#34B752]">Visit Us</h3>
                <p className="text-gray-300 leading-relaxed">
                  The Grace Rock Church<br />
                  123 Faith Avenue<br />
                  Lagos, Nigeria
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#02ADEF]">Contact</h3>
                <p className="text-gray-300">
                  <span className="block mb-2">Email: info@thegracerock.com</span>
                  <span className="block">Phone: +234 123 456 7890</span>
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Service Times</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>Sunday Service: 9:00 AM</li>
                  <li>Bible Study: Wednesday 6:00 PM</li>
                </ul>
              </div>
            </motion.div>

            {/* Simple Form Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">Name</label>
                  <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-hidden focus:border-[#34B752] transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">Email</label>
                  <input type="email" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-hidden focus:border-[#34B752] transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">Message</label>
                  <textarea rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-hidden focus:border-[#34B752] transition-colors" placeholder="How can we help?" />
                </div>
                <button type="button" className="w-full py-3 bg-gradient-to-r from-[#34B752] to-[#02ADEF] rounded-lg font-bold hover:opacity-90 transition-opacity">
                  Send Message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
