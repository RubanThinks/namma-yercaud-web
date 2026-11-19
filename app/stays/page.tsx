'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { STAYS_DATA } from '@/data/stays';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Phone, MapPin, Sparkles } from 'lucide-react';

export default function StaysPage() {
  const [filter, setFilter] = useState<'all' | 'valley' | 'estate' | 'couple' | 'budget'>('all');

  const filteredStays = filter === 'all' 
    ? STAYS_DATA 
    : STAYS_DATA.filter((s) => s.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-extrabold text-black bg-brand-yellow border-2 border-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
          Verified Hill Stays &bull; Zero Broker Markup
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 uppercase tracking-tight">
          Cottages &amp; Private Stays in Yercaud
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-700 font-medium">
          Avoid crowded commercial hotels. Relax in private valley-facing chalets, quiet coffee estate bungalows, and romantic couples&apos; suites with campfires.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Cottages' },
            { id: 'valley', label: 'Panoramic Valley View' },
            { id: 'estate', label: 'Coffee Estate Homestays' },
            { id: 'couple', label: 'Couples & Honeymoon' },
            { id: 'budget', label: 'Central & Budget Value' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                filter === cat.id
                  ? 'btn-solid-yellow shadow-[3px_3px_0px_#000000]'
                  : 'bg-white text-neutral-800 border-2 border-[#1A233A] hover:bg-[#FFF8D6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStays.map((stay) => (
          <div
            key={stay.id}
            className="trendy-card overflow-hidden flex flex-col md:flex-row justify-between"
          >
            <div className="relative md:w-1/2 h-64 md:h-auto image-zoom-box">
              <Image
                src={stay.image}
                alt={stay.name}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute top-3 left-3 badge-pill-yellow">
                {stay.badge}
              </div>
            </div>

            <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-brand-orange uppercase tracking-wider block mb-1">
                  {stay.type} &bull; {stay.capacity}
                </span>
                <h3 className="text-2xl font-black text-black">
                  {stay.name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-bold mt-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{stay.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 mt-3 leading-relaxed font-medium">
                  {stay.description}
                </p>

                <div className="mt-5 space-y-1.5 text-xs font-bold text-neutral-900">
                  {stay.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-brand-orange font-black">✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t-2 border-neutral-200 flex items-center gap-3">
                <a
                  href={CONTACT.phoneHref}
                  data-call-trigger="true"
                  data-service="Stays & Cottages"
                  data-title={stay.name}
                  data-admin={stay.assignedAdmin}
                  className="flex-1 py-3 text-center rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                  <span>Call to Book</span>
                </a>
                
                <a
                  href={getWhatsAppUrl(`Hi Namma Yercaud, I'm interested in ${stay.name}. Please share live photos, exact location, and today's price quote.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp Photos</span>
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Quick Booking Callout */}
      <div className="mt-16 bg-brand-yellow rounded-3xl p-8 sm:p-12 border-4 border-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_#1A233A]">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-black uppercase">
            Need a Large Villa or Custom Group Package?
          </h3>
          <p className="text-sm text-neutral-900 mt-2 max-w-xl font-bold">
            Travelling with a group of 15+? Bringing pets? Looking for exclusive campfire grounds? Message our local team directly on WhatsApp.
          </p>
        </div>
        <a
          href={getWhatsAppUrl("Hi Namma Yercaud, we are looking for a customized stay package for a group.")}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-2xl btn-solid-whatsapp text-sm font-black flex items-center gap-2 whitespace-nowrap"
        >
          <WhatsAppIcon className="w-5 h-5 fill-white" />
          <span>WhatsApp Local Team</span>
        </a>
      </div>

    </div>
  );
}
