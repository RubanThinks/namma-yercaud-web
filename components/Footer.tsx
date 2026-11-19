import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A233A] text-white pt-16 pb-12 border-t-4 border-brand-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2A3756]">
          
          {/* Brand Col with Official Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-2.5 rounded-2xl border-2 border-brand-yellow shadow-[3px_3px_0px_#000000] inline-block">
              <Image
                src="/images/logo.png"
                alt="Namma Yercaud – Explore, Stay, Experience"
                width={200}
                height={70}
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Your direct local hill-station companion in Yercaud, Shevaroy Hills, Salem District, Tamil Nadu. Verified valley cottages, 4x4 off-road safaris, honest cabs across the 20 hairpin bends, pure estate honey, and authentic food delivery.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-yellow font-bold">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{CONTACT.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-medium">
              <li><Link href="/stays" className="hover:text-brand-yellow transition-colors">Cottages &amp; Stays</Link></li>
              <li><Link href="/rides" className="hover:text-brand-yellow transition-colors">4x4 Jeep Safaris</Link></li>
              <li><Link href="/rides#cabs" className="hover:text-brand-yellow transition-colors">Cabs &amp; Transfers</Link></li>
              <li><Link href="/market" className="hover:text-brand-yellow transition-colors">Estate Honey &amp; Spices</Link></li>
              <li><Link href="/food" className="hover:text-brand-yellow transition-colors">Local Food Delivery</Link></li>
              <li><Link href="/explore" className="hover:text-brand-yellow transition-colors">Top Yercaud Spots</Link></li>
              <li><Link href="/bookings" className="hover:text-brand-yellow transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">Direct Connect</h4>
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-neutral-300 uppercase font-bold block">Primary Call Number</span>
                <a
                  href={CONTACT.phoneHref}
                  data-call-trigger="true"
                  data-service="Footer Contact"
                  data-title="Footer Primary Phone Link"
                  className="text-base font-extrabold text-brand-yellow hover:underline flex items-center gap-1.5 mt-0.5 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
              </div>

              <div>
                <span className="text-[11px] text-neutral-300 uppercase font-bold block">Official WhatsApp Number</span>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-extrabold text-[#25D366] hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                  <span>{CONTACT.whatsappDisplay}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-300 pt-1">
                <Clock className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{CONTACT.timing}</span>
              </div>
            </div>
          </div>

          {/* Direct Action Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">Instant Enquiries</h4>
            <p className="text-xs text-neutral-300">
              Visiting Yercaud this weekend? Message our local team for cottages, safaris, and weather updates.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={CONTACT.phoneHref}
                data-call-trigger="true"
                data-service="Footer Contact"
                data-title="Footer Call Button"
                className="w-full py-2.5 rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>Call {CONTACT.phoneDisplay}</span>
              </a>

              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp {CONTACT.whatsappDisplay}</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Namma Yercaud &bull; Authentic Tourism &amp; Local Concierge Platform
          </div>
          <div className="flex items-center gap-4">
            <span>Shevaroy Hills, Salem, Tamil Nadu</span>
            <span>&bull;</span>
            <Link href="/admin" className="text-neutral-400 hover:text-brand-yellow font-bold transition-colors">
              🔒 Partner Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
