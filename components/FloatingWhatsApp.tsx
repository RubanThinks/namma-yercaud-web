import React from 'react';
import { getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden sm:flex fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white items-center justify-center shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white group"
      aria-label="Official WhatsApp Concierge"
    >
      <WhatsAppIcon className="w-9 h-9 fill-white group-hover:scale-105 transition-transform" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-neutral-700">
        Chat with Local Concierge
      </span>
    </a>
  );
}
