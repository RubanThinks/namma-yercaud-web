'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function FloatingMobileBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-40 sm:hidden bg-[#1A233A] border-t-2 border-[#2A3756] px-3 py-2.5 shadow-2xl pb-safe-area">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Direct Call Button - Intercepted with Priority Call Modal */}
        <a
          href={CONTACT.phoneHref}
          data-call-trigger="true"
          data-service="General Concierge"
          data-title="Sticky Mobile Call Bar"
          className="flex-1 py-3 px-3 rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
        >
          <Phone className="w-4 h-4 stroke-[2.5]" />
          <span>Call Now</span>
        </a>

        {/* Official WhatsApp Button - Solid WhatsApp Green with White Text */}
        <a
          href={getWhatsAppUrl("Hi Namma Yercaud, I'm visiting Yercaud and need details about stays and jeep rides.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-2 uppercase tracking-wide"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </a>

      </div>
    </div>
  );
}
