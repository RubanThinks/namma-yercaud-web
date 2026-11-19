'use client';

import React from 'react';
import Image from 'next/image';
import { JEEPS_DATA } from '@/data/jeeps';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Phone, Compass, Car, Shield, CheckCircle } from 'lucide-react';

export default function RidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-extrabold text-black bg-brand-yellow border-2 border-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
          Rugged 4x4 Mountain Rides &bull; Experienced Hill Drivers
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 uppercase tracking-tight">
          Jeep Safaris &amp; Mountain Cabs in Yercaud
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-700 font-medium">
          Ordinary cars cannot reach Yercaud&apos;s wildest viewpoints. Climb secret rocky trails, private coffee estates, and misty mountain ridges in rugged open-top 4x4s.
        </p>
      </div>

      {/* Safari Packages Section */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase">
              Popular 4x4 Jeep Safari Circuits
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-semibold">
              All rides include certified local mountain drivers who know every ridge and turn.
            </p>
          </div>
          <span className="hidden sm:inline-block text-xs font-black text-black bg-brand-yellow border-2 border-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
            Open-Top 4x4 Fleet
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JEEPS_DATA.map((jeep) => (
            <div
              key={jeep.id}
              className="trendy-card overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 image-zoom-box">
                  <Image
                    src={jeep.image}
                    alt={jeep.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 badge-pill-yellow">
                    {jeep.badge}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-black text-brand-orange uppercase tracking-wider block mb-1">
                    {jeep.timing}
                  </span>
                  <h3 className="text-2xl font-black text-black">{jeep.name}</h3>
                  <p className="text-xs sm:text-sm text-neutral-700 mt-2 leading-relaxed font-medium">
                    {jeep.description}
                  </p>
                  <div className="mt-4 pt-4 border-t-2 border-neutral-200 space-y-1.5 text-xs text-neutral-900 font-bold">
                    <div>⏱️ <strong>Duration:</strong> {jeep.duration}</div>
                    <div>👥 <strong>Capacity:</strong> {jeep.capacity}</div>
                    <div className="pt-2 flex flex-wrap gap-1">
                      {jeep.highlights.map((h, i) => (
                        <span key={i} className="bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded text-[11px]">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-2">
                <a
                  href={CONTACT.phoneHref}
                  data-call-trigger="true"
                  data-service="Rides & Jeep Safari"
                  data-title={jeep.name}
                  data-admin="admin1"
                  className="flex-1 py-3 text-center rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                  <span>Call to Book</span>
                </a>
                <a
                  href={getWhatsAppUrl(`Hi Namma Yercaud, I want to book the ${jeep.name}. Please share available time slots and pricing.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp Slot</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cabs & Transfers Section */}
      <div id="cabs" className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#1A233A] shadow-[4px_4px_0px_#1A233A]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow text-black border-2 border-black text-xs font-black uppercase mb-4 shadow-[2px_2px_0px_#000000]">
            <Car className="w-4 h-4" />
            <span>Salem &harr; Yercaud Mountain Cabs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black uppercase">
            Hassle-Free Transit Across the 20 Hairpin Bends
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
            Arriving at Salem Junction Railway Station or Salem Airport? Our verified hill drivers pick you up right outside the terminal and navigate the 20 winding hairpin bends safely to your cottage door.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FAF6EE] border-2 border-[#1A233A] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-brand-orange uppercase">Station Pickup</span>
              <h4 className="text-xl font-black text-black mt-1">Salem Junction to Yercaud</h4>
              <p className="text-xs text-neutral-600 mt-2 font-medium">Direct one-way pickup or drop with comfortable AC Sedan / Ertiga.</p>
              <div className="mt-4 text-xs font-bold text-neutral-800 space-y-1">
                <div>✓ Driver waits with name placard</div>
                <div>✓ Luggage assistance</div>
                <div>✓ 20 Hairpin scenic stops on request</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-neutral-200 flex items-center gap-2">
              <a
                href={CONTACT.phoneHref}
                data-call-trigger="true"
                data-service="Rides & Cabs"
                data-title="Salem Junction to Yercaud Cab"
                data-admin="admin1"
                className="flex-1 py-2.5 rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Call to Book</span>
              </a>
              <a
                href={getWhatsAppUrl("Hi Namma Yercaud, I need a cab from Salem Railway Station to Yercaud.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-1.5 text-center"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF6EE] border-2 border-[#1A233A] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-brand-orange uppercase">Full Day Sightseeing</span>
              <h4 className="text-xl font-black text-black mt-1">Full-Day Local Yercaud Taxi</h4>
              <p className="text-xs text-neutral-600 mt-2 font-medium">Covers Lake, Pagoda Point, Lady&apos;s Seat, Shevaroy Temple &amp; 32-km Loop Road.</p>
              <div className="mt-4 text-xs font-bold text-neutral-800 space-y-1">
                <div>✓ Dedicated driver for 8 hours</div>
                <div>✓ Flexible timings and photo stops</div>
                <div>✓ Zero hidden fuel surcharges</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-neutral-200">
              <a
                href={getWhatsAppUrl("Hi Namma Yercaud, I need a full-day sightseeing taxi in Yercaud.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5"
              >
                <span>Book Day Taxi</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF6EE] border-2 border-[#1A233A] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-brand-orange uppercase">Airport &amp; Outstation</span>
              <h4 className="text-xl font-black text-black mt-1">Bangalore / Chennai / Trichy</h4>
              <p className="text-xs text-neutral-600 mt-2 font-medium">Comfortable Innova / Ertiga roundtrips from Bengaluru, Coimbatore, or Chennai.</p>
              <div className="mt-4 text-xs font-bold text-neutral-800 space-y-1">
                <div>✓ Doorstep home pickup &amp; return</div>
                <div>✓ Fast-tag toll handling</div>
                <div>✓ Verified commercial drivers</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-neutral-200">
              <a
                href={getWhatsAppUrl("Hi Namma Yercaud, I need an outstation cab package to Yercaud.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5"
              >
                <span>Book Outstation</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
