'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const mainLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/ministries', label: 'MINISTRIES' },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/events', label: 'EVENTS' },
    { href: '/sermons', label: 'SERMONS' },
    { href: '/giving', label: 'GIVE' },
  ];

  const ministriesLinks = [
    { href: '/ministries/worship', label: 'Grace Rock Worship' },
    { href: '/ministries/teens', label: 'Grace Teens' },
    { href: '/ministries/kids', label: 'Grace Kids' },
  ];

  const resourcesLinks = [
    { href: '/resources/membership', label: 'Membership classes' },
    { href: '/events', label: 'Celebrations' },
    { href: '/resources/counselling', label: 'Counselling' },
    { href: '/resources/pre-marital', label: 'Pre Marital Counselling' },
    { href: '/resources/post-marital', label: 'Post Marital Counselling' },
    { href: '/resources/welfare', label: 'Welfare Request' },
    { href: '/resources/volunteers', label: 'New Campus Volunteers' },
  ];

  const connectLinks = [
    { href: '/connect/cell', label: 'Cell Church' },
    { href: '/connect/member', label: 'Become a member' },
    { href: '/connect/visit', label: 'Visit Grace Rock' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const staggerContainer = {
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: -30 },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const columnVariants = {
    closed: { opacity: 0, y: 20 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 text-white font-montserrat transition-all duration-300 bg-[#1B1B1B54] backdrop-blur-md border-white/10 ${
        isScrolled ? 'h-[66px]' : 'h-[100px]'
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className={`rounded-full bg-white overflow-hidden flex items-center justify-center transition-all duration-300 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
            <div className={`relative transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <Image
                src="/logo.png"
                alt="The Grace Rock Church"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          <Link 
            href="/about" 
            className={`transition-colors ${isActive('/about') ? 'text-[#34B752]' : 'hover:text-teal-400'}`}
          >
            ABOUT
          </Link>
          <Link 
            href="/ministries" 
            className={`transition-colors ${isActive('/ministries') ? 'text-[#34B752]' : 'hover:text-teal-400'}`}
          >
            MINISTRIES
          </Link>
          <Link 
            href="/gallery" 
            className={`transition-colors ${isActive('/gallery') ? 'text-[#34B752]' : 'hover:text-teal-400'}`}
          >
            GALLERY
          </Link>
          <Link 
            href="/events" 
            className={`transition-colors ${isActive('/events') ? 'text-[#34B752]' : 'hover:text-teal-400'}`}
          >
            EVENTS
          </Link>
          <Link 
            href="/giving" 
            className={`transition-colors ${isActive('/giving') ? 'text-[#34B752]' : 'hover:text-teal-400'}`}
          >
            GIVING
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col justify-center items-center gap-1.5 p-2 hover:opacity-70 transition-opacity"
        >
          <span className="block w-6 h-0.5 bg-white rounded-full"></span>
          <span className="block w-6 h-0.5 bg-white rounded-full"></span>
          <span className="block w-6 h-0.5 bg-white rounded-full"></span>
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#1B1B1B] overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between px-8 h-[100px]">
              {/* Logo */}
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                <div className="relative w-14 h-14">
                  <Image
                    src="/logo.png"
                    alt="The Grace Rock Church"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Close Button */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:opacity-70 transition-opacity"
              >
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="px-8 md:px-12 lg:px-16 py-12 min-h-[calc(100vh-100px)] flex flex-col">
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 flex-1">
                
                {/* Main Navigation Links - Left Side */}
                <motion.div 
                  className="flex flex-col gap-1"
                  variants={staggerContainer}
                  initial="closed"
                  animate="open"
                >
                  {mainLinks.map((link) => (
                    <motion.div key={link.href} variants={linkVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-4xl md:text-5xl lg:text-6xl font-black tracking-tight transition-colors leading-tight ${
                          isActive(link.href) 
                            ? 'text-[#34B752]' 
                            : 'text-white hover:text-[#34B752]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Right Side Columns */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 lg:pt-4"
                  variants={columnVariants}
                  initial="closed"
                  animate="open"
                >
                  {/* Ministries Column */}
                  <div className="flex flex-col gap-5">
                    <h3 className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                      MINISTRIES
                    </h3>
                    <div className="flex flex-col gap-4">
                      {ministriesLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Resources Column */}
                  <div className="flex flex-col gap-5">
                    <h3 className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                      RESOURCES
                    </h3>
                    <div className="flex flex-col gap-4">
                      {resourcesLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Connect Column */}
                  <div className="flex flex-col gap-5">
                    <h3 className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                      CONNECT
                    </h3>
                    <div className="flex flex-col gap-4">
                      {connectLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Section */}
              <motion.div 
                className="mt-auto pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
                variants={columnVariants}
                initial="closed"
                animate="open"
              >
                {/* Media Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                    MEDIA
                  </h3>
                  <Link
                    href="/watch"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Watch online
                  </Link>
                  <p className="text-xs text-gray-600 mt-2">
                    © Copyright 2025 Grace Rock Church. All Rights Reserved.
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
