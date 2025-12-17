'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-slate-900 pt-24 pb-0 relative overflow-hidden">
      <div className="container mx-auto px-8 mb-32">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-32">
          
          {/* Left Column: Newsletter */}
          <div className="w-full lg:w-1/2 max-w-lg">
            <span className="inline-block px-4 py-2 bg-[#F5F5F5] text-[#00A88D] rounded-full text-sm font-medium mb-6">
              Stay Connected
            </span>
            
            <h3 className="font-['Montserrat'] text-2xl font-medium mb-8 leading-tight">
              Enter email address here to get updated on church events
            </h3>
            
            <form className="flex flex-col gap-6">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-[#F5F5F5] px-6 py-4 rounded-sm outline-none border-b-2 border-transparent focus:border-[#00A88D] transition-colors placeholder:text-gray-400"
              />
              <button 
                type="submit"
                className="w-fit px-8 py-3 bg-[linear-gradient(103.21deg,#34B752_-40.27%,#02ADEF_136.21%)] text-white rounded-full font-bold hover:scale-105 transition-transform"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right Column: Links & Address */}
          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-16 lg:gap-32">
            {/* Site Map */}
            <div>
              <h4 className="text-gray-400 mb-6 text-sm">Site Map</h4>
              <ul className="flex flex-col gap-4 font-medium">
                <li><a href="#" className="hover:text-[#00A88D] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#00A88D] transition-colors">Ministries</a></li>
                <li><a href="#" className="hover:text-[#00A88D] transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-[#00A88D] transition-colors">Giving</a></li>
              </ul>
            </div>

            {/* Visit */}
            <div>
              <h4 className="text-gray-400 mb-6 text-sm">Visit</h4>
              <address className="not-italic font-medium leading-relaxed">
                12 Grace Avenue,<br/>
                Agege, Lagos,<br/>
                Nigeria
              </address>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Watermark */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none">
        <h1 className="font-['Montserrat'] text-[12vw] lg:text-[8.5vw] text-[#F5F5F5] text-center whitespace-nowrap -mb-[1vw]">
          The Grace Rock Church
        </h1>
      </div>
    </footer>
  );
}
