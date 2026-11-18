'use client';

import React from 'react';
import Image from 'next/image';
import { SPOTS_DATA } from '@/data/spots';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { MapPin, Compass, Thermometer, Sun, Info } from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-extrabold text-black bg-brand-yellow border-2 border-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
          Insider Local Guide &bull; Shevaroy Hills
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 uppercase tracking-tight">
          Must-Visit Spots in Yercaud
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-700 font-medium">
          From tranquil pedal boating on Emerald Lake to the thrilling 300-foot plunge of Kiliyur Falls, discover the true soul of the &ldquo;Jewel of the South&rdquo;.
        </p>
      </div>

      {/* Hill Station Travel Advisory Card - Warm Navy */}
      <div className="mb-16 bg-[#1A233A] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#1A233A] shadow-[4px_4px_0px_#FFC800]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Thermometer className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase font-extrabold text-brand-yellow tracking-wider">Climate &amp; Weather</div>
              <div className="text-sm font-extrabold mt-0.5">13&deg;C to 25&deg;C Year-Round</div>
              <div className="text-xs text-neutral-300 mt-1 font-medium">Light woollens recommended for chilly evenings and sunrise ridge trails.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sun className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase font-extrabold text-brand-orange tracking-wider">Prime Season</div>
              <div className="text-sm font-extrabold mt-0.5">October to March (Peak Mist)</div>
              <div className="text-xs text-neutral-300 mt-1 font-medium">Summer (April-June) is great for escaping the heat of Salem plains.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase font-extrabold text-brand-yellow tracking-wider">Ghat Road Driving</div>
              <div className="text-sm font-extrabold mt-0.5">20 Hairpin Bends from Salem</div>
              <div className="text-xs text-neutral-300 mt-1 font-medium">Use lower gears (2nd &amp; 3rd) on the ghat road. Never overtake on blind curves!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {SPOTS_DATA.map((spot) => (
          <div
            key={spot.id}
            className="trendy-card overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-60 image-zoom-box">
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 badge-pill-yellow">
                  {spot.badge}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-neutral-600 font-bold mb-1">
                  <span>🕒 Best Time: {spot.bestTime}</span>
                  <span className="text-brand-orange font-black">{spot.distance}</span>
                </div>
                <h3 className="text-2xl font-black text-black">{spot.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-700 mt-2 leading-relaxed font-medium">
                  {spot.description}
                </p>
                <div className="mt-4 text-xs font-bold text-neutral-900 bg-neutral-100 p-2.5 rounded-xl border border-neutral-200">
                  ✨ <strong>Highlight:</strong> {spot.highlight}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center gap-2">
              <a
                href={getWhatsAppUrl(`Hi Namma Yercaud, please arrange a sightseeing cab to visit ${spot.name} and nearby places.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-black" />
                <span>Book Cab / Guide for This Spot</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
