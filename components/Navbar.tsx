'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { 
  Phone, 
  Menu, 
  X, 
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/stays', label: 'Cottages' },
    { href: '/rides', label: 'Jeeps & Cabs' },
    { href: '/market', label: 'Honey & Spices' },
    { href: '/food', label: 'Local Food' },
    { href: '/explore', label: 'Top Spots' },
    { href: '/bookings', label: 'How It Works' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#1A233A] border-b-2 border-[#2A3756] shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo with Official Image */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white px-2.5 py-1 rounded-xl border-2 border-brand-yellow shadow-[2px_2px_0px_#000000] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Namma Yercaud – Explore, Stay, Experience"
                width={170}
                height={60}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-neutral-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    isActive ? 'text-brand-yellow font-extrabold border-b-2 border-brand-yellow' : 'hover:text-brand-yellow'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct Call - Solid Yellow with Black Text */}
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-solid-yellow text-sm font-black"
            >
              <Phone className="w-4 h-4 stroke-[2.5]" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>

            {/* Official WhatsApp - Solid Green with White Text and Official Icon */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-solid-whatsapp text-sm font-black"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={CONTACT.phoneHref}
              className="w-10 h-10 rounded-xl btn-solid-yellow flex items-center justify-center font-bold"
              aria-label="Call Now"
            >
              <Phone className="w-5 h-5 stroke-[2.5]" />
            </a>
            
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl btn-solid-whatsapp flex items-center justify-center font-bold"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-[#263454] text-white flex items-center justify-center border-2 border-white/20 ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-brand-yellow" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed top-20 right-0 w-80 max-w-[85vw] h-[calc(100vh-5rem)] bg-[#1A233A] border-l-2 border-[#2A3756] p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="bg-white p-3 rounded-2xl border-2 border-brand-yellow shadow-[2px_2px_0px_#000000] mb-5 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Namma Yercaud"
                  width={180}
                  height={65}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="text-xs uppercase font-extrabold text-brand-yellow tracking-widest mb-3">
                Explore Yercaud
              </div>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-bold py-2.5 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-brand-yellow text-black font-black'
                          : 'text-neutral-200 hover:bg-[#263454] hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Drawer Call & WhatsApp Actions */}
            <div className="pt-6 border-t-2 border-[#2A3756] flex flex-col gap-3">
              <div className="text-xs text-neutral-300 font-medium text-center">
                Need immediate bookings in Yercaud?
              </div>
              
              <a
                href={CONTACT.phoneHref}
                className="w-full py-3 rounded-xl btn-solid-yellow text-sm font-black flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>Call {CONTACT.phoneDisplay}</span>
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl btn-solid-whatsapp text-sm font-black flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
