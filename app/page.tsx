'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { STAYS_DATA } from '@/data/stays';
import { JEEPS_DATA } from '@/data/jeeps';
import { PRODUCTS_DATA } from '@/data/products';
import { SPOTS_DATA } from '@/data/spots';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { 
  Phone, 
  Home, 
  Compass, 
  Car, 
  ShoppingBag, 
  Utensils, 
  MapPin, 
  Clock, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Mountain
} from 'lucide-react';

export default function HomePage() {
  return (
    <>

      {/* ========================================================================= */}
      {/* 1. IMMERSIVE HERO SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#1A233A] border-b-4 border-brand-yellow">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/stay-cottage.jpg"
            alt="Scenic mountain valley in Yercaud hills"
            fill
            unoptimized
            priority
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-hero-overlay-warm" />
        </div>

        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-brand-yellow/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center pt-8 pb-14 flex flex-col items-center">
          
          {/* Official Brand Logo Emblem */}
          <div className="mb-6 bg-white p-3 sm:p-4 rounded-3xl border-2 border-brand-yellow shadow-[4px_4px_0px_#000000] inline-flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Namma Yercaud – Explore, Stay, Experience"
              width={260}
              height={95}
              className="h-16 sm:h-20 w-auto object-contain"
              priority
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-black font-extrabold text-xs sm:text-sm tracking-wide border-2 border-black shadow-[3px_3px_0px_#000000] mb-6">
            <Mountain className="w-4 h-4 stroke-[2.5]" />
            <span>YERCAUD HILLS &bull; 1,515 METRES &bull; SHEVAROY RANGE</span>
          </div>

          {/* Headline - Modern Poppins */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] max-w-4xl uppercase">
            FEEL THE MIST. <br />
            <span className="text-brand-yellow">RIDE THE TRAILS.</span> <br />
            <span className="text-white">TASTE REAL YERCAUD.</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-xl md:text-2xl text-neutral-100 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
            Your direct local connection for verified <strong className="text-brand-yellow font-extrabold">valley cottages</strong>, thrilling <strong className="text-brand-yellow font-extrabold">4x4 Jeep safaris</strong>, honest-fare cabs, pure estate honey, and hot hill food. No middlemen &mdash; one direct call.
          </p>

          {/* Direct Solid CTA Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            
            {/* Primary Call - Solid Yellow with Black Text */}
            <a
              href={CONTACT.phoneHref}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-2xl btn-solid-yellow text-base font-black shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-black text-brand-yellow flex items-center justify-center">
                <Phone className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-black font-extrabold leading-none">Instant Call</div>
                <div className="text-xl font-black leading-tight text-black">{CONTACT.phoneDisplay}</div>
              </div>
            </a>

            {/* Primary WhatsApp - Official WhatsApp Button */}
            <a
              href={getWhatsAppUrl("Hi Namma Yercaud, I'm planning a trip to Yercaud and would like to check options.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-2xl btn-solid-whatsapp text-base font-black shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-black/20 text-white flex items-center justify-center">
                <WhatsAppIcon className="w-6 h-6 fill-white" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-white font-extrabold leading-none">WhatsApp Us</div>
                <div className="text-xl font-black leading-tight text-white">{CONTACT.whatsappDisplay}</div>
              </div>
            </a>

          </div>

          {/* Quick Trust Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-neutral-100">
            <span className="flex items-center gap-2 bg-[#1A233A]/90 border-2 border-brand-yellow/30 px-4 py-2 rounded-xl text-white shadow-md">
              <CheckCircle className="w-4 h-4 text-brand-yellow" /> 100% Local Insiders
            </span>
            <span className="flex items-center gap-2 bg-[#1A233A]/90 border-2 border-brand-yellow/30 px-4 py-2 rounded-xl text-white shadow-md">
              <CheckCircle className="w-4 h-4 text-brand-yellow" /> Zero Middleman Commission
            </span>
            <span className="flex items-center gap-2 bg-[#1A233A]/90 border-2 border-brand-yellow/30 px-4 py-2 rounded-xl text-white shadow-md">
              <CheckCircle className="w-4 h-4 text-brand-yellow" /> Verified Hill Stays &amp; Drivers
            </span>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. WHAT CAN YOU FIND IN YERCAUD? (SERVICES GRID)                          */}
      {/* ========================================================================= */}
      <section id="services" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow text-black font-extrabold text-xs tracking-wider uppercase border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Sparkles className="w-4 h-4" /> All-In-One Local Hub
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black mt-4 leading-tight uppercase">
            What Can You Find in Yercaud?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
            Skip scrolling through dozens of confusing listings. One direct connection arranges your entire hill-station holiday with real local expertise.
          </p>
        </div>

        {/* 6 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Stays */}
          <div className="trendy-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-yellow text-black flex items-center justify-center mb-6 border-2 border-black shadow-[3px_3px_0px_#000000]">
                <Home className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black tracking-wider text-brand-orange uppercase block">Valley Living</span>
              <h3 className="text-2xl font-black text-black mt-1">Stays &amp; Cottages</h3>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed font-normal">
                Private wooden chalets, misty valley-view cottages, coffee plantation villas, and budget family rooms.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-bold text-neutral-900">
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> 180° Valley &amp; Lake Views</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Night Bonfire &amp; Campfire Setup</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Couples, Families &amp; Groups</li>
              </ul>
            </div>
            <div className="mt-8 pt-5 border-t-2 border-neutral-200 flex items-center justify-between">
              <Link href="/stays" className="text-sm font-extrabold text-black hover:text-brand-orange flex items-center gap-1 transition-colors">
                Explore Stays <ArrowRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="text-xs font-black btn-solid-yellow px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Call to Book</span>
              </a>
            </div>
          </div>

          {/* Card 2: 4x4 Jeep Safaris */}
          <div className="trendy-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-yellow text-black flex items-center justify-center mb-6 border-2 border-black shadow-[3px_3px_0px_#000000]">
                <Compass className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black tracking-wider text-brand-orange uppercase block">Off-Road Adventure</span>
              <h3 className="text-2xl font-black text-black mt-1">4x4 Jeep Rides</h3>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed font-normal">
                Rugged trails where hatchbacks and sedans can&apos;t reach. Sunrise ridge treks, secret viewpoints, and off-road thrills.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-bold text-neutral-900">
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Early Morning Sunrise Safari (5:30 AM)</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Secret Waterfall Off-Roading</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Open-Top Mahindra 4x4s</li>
              </ul>
            </div>
            <div className="mt-8 pt-5 border-t-2 border-neutral-200 flex items-center justify-between">
              <Link href="/rides" className="text-sm font-extrabold text-black hover:text-brand-orange flex items-center gap-1 transition-colors">
                View Safaris <ArrowRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="text-xs font-black btn-solid-yellow px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Call to Book</span>
              </a>
            </div>
          </div>

          {/* Card 3: Cabs & Autos */}
          <div className="trendy-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-yellow text-black flex items-center justify-center mb-6 border-2 border-black shadow-[3px_3px_0px_#000000]">
                <Car className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black tracking-wider text-brand-orange uppercase block">Safe Mountain Transit</span>
              <h3 className="text-2xl font-black text-black mt-1">Cabs &amp; Autos</h3>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed font-normal">
                Reliable pickups from Salem Junction &amp; Airport across the 20 hairpin bends. Honest upfront rates, zero haggling.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-bold text-neutral-900">
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Salem Station &amp; Bus Stand Pickup</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Full-Day Local Sightseeing Taxi</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Experienced Hill Drivers</li>
              </ul>
            </div>
            <div className="mt-8 pt-5 border-t-2 border-neutral-200 flex items-center justify-between">
              <Link href="/rides#cabs" className="text-sm font-extrabold text-black hover:text-brand-orange flex items-center gap-1 transition-colors">
                Check Fares <ArrowRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="text-xs font-black btn-solid-yellow px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Call for Cab</span>
              </a>
            </div>
          </div>

          {/* Card 4: Honey & Spices */}
          <div className="trendy-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-yellow text-black flex items-center justify-center mb-6 border-2 border-black shadow-[3px_3px_0px_#000000]">
                <ShoppingBag className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black tracking-wider text-brand-orange uppercase block">100% Pure Estate Harvest</span>
              <h3 className="text-2xl font-black text-black mt-1">Honey &amp; Spices</h3>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed font-normal">
                Raw forest honey, organic black pepper, cardamom, roasted Arabica coffee beans, and pure eucalyptus oil.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-bold text-neutral-900">
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Direct from Shevaroy Growers</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Delivered to Your Cottage</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Courier Shipping Across India</li>
              </ul>
            </div>
            <div className="mt-8 pt-5 border-t-2 border-neutral-200 flex items-center justify-between">
              <Link href="/market" className="text-sm font-extrabold text-black hover:text-brand-orange flex items-center gap-1 transition-colors">
                View Products <ArrowRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="text-xs font-black btn-solid-yellow px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Call to Order</span>
              </a>
            </div>
          </div>

          {/* Card 5: Local Food */}
          <div className="trendy-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-yellow text-black flex items-center justify-center mb-6 border-2 border-black shadow-[3px_3px_0px_#000000]">
                <Utensils className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black tracking-wider text-brand-orange uppercase block">Home-Style Cooking</span>
              <h3 className="text-2xl font-black text-black mt-1">Local Food Delivery</h3>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed font-normal">
                Hot meals delivered to your cottage doorstep. Piping hot pepper chicken, authentic South Indian breakfast, and barbecue.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-bold text-neutral-900">
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Authentic Yercaud Country Chicken</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Fresh Dosa, Idli &amp; Filter Coffee</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Delivered Hot to Your Stay</li>
              </ul>
            </div>
            <div className="mt-8 pt-5 border-t-2 border-neutral-200 flex items-center justify-between">
              <Link href="/food" className="text-sm font-extrabold text-black hover:text-brand-orange flex items-center gap-1 transition-colors">
                View Menu <ArrowRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="text-xs font-black btn-solid-yellow px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Call to Order</span>
              </a>
            </div>
          </div>

          {/* Card 6: Sightseeing & Spots */}
          <div className="trendy-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-yellow text-black flex items-center justify-center mb-6 border-2 border-black shadow-[3px_3px_0px_#000000]">
                <MapPin className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black tracking-wider text-brand-orange uppercase block">Sightseeing &amp; Trails</span>
              <h3 className="text-2xl font-black text-black mt-1">Explore Yercaud</h3>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed font-normal">
                Discover the best viewpoints, boating lake, hidden waterfalls, and historical coffee estates with local advice.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-bold text-neutral-900">
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Lady&apos;s Seat &amp; 20 Hairpin View</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> Emerald Lake Boating</li>
                <li className="flex items-center gap-2"><span className="text-brand-orange font-black">✦</span> 300ft Kiliyur Falls Trek</li>
              </ul>
            </div>
            <div className="mt-8 pt-5 border-t-2 border-neutral-200 flex items-center justify-between">
              <Link href="/explore" className="text-sm font-extrabold text-black hover:text-brand-orange flex items-center gap-1 transition-colors">
                View All Spots <ArrowRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="text-xs font-black btn-solid-yellow px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Call to Plan</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED STAYS & COTTAGES                                              */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-y-2 border-[#1A233A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-black text-black bg-brand-yellow border-2 border-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
                Verified Accommodations
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-black mt-4 uppercase tracking-tight">
                Featured Hill Cottages
              </h2>
              <p className="mt-2 text-base text-neutral-600 font-medium">
                Inspected for cleanliness, 24/7 hot water, good access roads, and authentic hill hospitality.
              </p>
            </div>
            <Link
              href="/stays"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-solid-yellow text-sm font-black"
            >
              <span>View All 15+ Cottages</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAYS_DATA.map((stay) => (
              <div
                key={stay.id}
                className="trendy-card overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-60 image-zoom-box">
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
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-600 font-black mb-2 uppercase">
                      <span>{stay.type}</span>
                      <span className="text-brand-orange font-black">★ Verified</span>
                    </div>
                    <h3 className="text-xl font-black text-black">{stay.name}</h3>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed font-medium">
                      {stay.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-bold text-neutral-800">
                      {stay.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded-md">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-neutral-200 flex items-center gap-2">
                    <a
                      href={CONTACT.phoneHref}
                      className="flex-1 py-2.5 text-center rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Call Book</span>
                    </a>
                    <a
                      href={getWhatsAppUrl(`Hi Namma Yercaud, I'm interested in ${stay.name}. Please share live photos and availability.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 text-center rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. JEEP SAFARIS & RIDES                                                   */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-black text-black bg-brand-yellow border-2 border-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
              4x4 Open-Top Mountain Safaris
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-black mt-4 uppercase tracking-tight">
              Yercaud Jeep Rides &amp; Safaris
            </h2>
            <p className="mt-2 text-base text-neutral-600 font-medium">
              Sunrise ridge climbs, secret seasonal waterfalls, and rocky coffee estate trails.
            </p>
          </div>
          <Link
            href="/rides"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-solid-yellow text-sm font-black"
          >
            <span>All Safari Packages</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
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
                  <span className="absolute top-3 left-3 badge-pill-yellow">
                    {jeep.badge}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-black text-brand-orange uppercase tracking-wider block mb-1">
                    {jeep.timing}
                  </span>
                  <h3 className="text-2xl font-black text-black">{jeep.name}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed font-medium">
                    {jeep.description}
                  </p>
                  <div className="mt-4 pt-4 border-t-2 border-neutral-200 text-xs font-bold text-neutral-800 space-y-1">
                    <div>⏱️ <strong>Duration:</strong> {jeep.duration}</div>
                    <div>👥 <strong>Capacity:</strong> {jeep.capacity}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-2">
                <a
                  href={CONTACT.phoneHref}
                  className="flex-1 py-3 text-center rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                  <span>Call to Book</span>
                </a>
                <a
                  href={getWhatsAppUrl(`Hi Namma Yercaud, I'd like to book the ${jeep.name}. Please confirm timing and rate.`)}
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
      </section>

      {/* ========================================================================= */}
      {/* 5. LOCAL HONEY & SPICES MARKET                                            */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-y-2 border-[#1A233A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-black bg-brand-yellow border-2 border-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
              Direct From Shevaroy Growers
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-black mt-4 uppercase tracking-tight">
              Wild Honey &amp; Estate Spices
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 font-medium">
              Don&apos;t buy adulterated, syrup-heavy souvenirs from tourist stalls. We source 100% genuine produce harvested by Shevaroy estate growers and local honey hunters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PRODUCTS_DATA.map((product) => (
              <div
                key={product.id}
                className="trendy-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 image-zoom-box mb-5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 badge-pill-yellow">
                      {product.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-black">{product.name}</h3>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-neutral-200 flex items-center gap-2">
                  <a
                    href={CONTACT.phoneHref}
                    className="flex-1 py-2.5 text-center rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Call</span>
                  </a>
                  <a
                    href={getWhatsAppUrl(`Hi Namma Yercaud, I'd like to order ${product.name}. Please share available weights and prices.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 text-center rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-1.5"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/market"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-solid-yellow text-sm font-black shadow-md"
            >
              <span>Explore All Spices &amp; Shipping Rates</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHY CHOOSE NAMMA YERCAUD                                               */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black text-black bg-brand-yellow border-2 border-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
            The Local Difference
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-black mt-4 uppercase tracking-tight">
            Why Tourists Call Namma Yercaud
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-medium">
            Big corporate travel portals don&apos;t live in Yercaud. We do. When you ring us, you talk to real local residents who know every bend of the hill.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="trendy-card p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-yellow text-black flex items-center justify-center mb-6 border-2 border-black shadow-[3px_3px_0px_#000000]">
              <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-black">Verified On-Site</h3>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
              Every cottage and jeep in our network is physically inspected. No fake photos, no surprise dirty bathrooms, and no broken geysers.
            </p>
          </div>

          <div className="trendy-card p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-yellow text-black flex items-center justify-center mb-6 border-2 border-black shadow-[3px_3px_0px_#000000]">
              <Phone className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-black">One Single Call</h3>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
              From Salem Junction pickup to off-road safari, campfire night, and raw honey purchase &mdash; one phone call coordinates everything seamlessly.
            </p>
          </div>

          <div className="trendy-card p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-yellow text-black flex items-center justify-center mb-6 border-2 border-black shadow-[3px_3px_0px_#000000]">
              <Clock className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-black">Always On Call</h3>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
              Car breakdown? Need emergency baby milk or late-night campfire wood? We are physically on the hill station and ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL HIGH-CONVERSION CTA                                              */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A233A] border-t-4 border-brand-yellow text-white text-center">
        <div className="max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-yellow text-black font-extrabold text-xs uppercase tracking-wide border-2 border-black shadow-[3px_3px_0px_#000000] mb-6">
            <span>READY TO VISIT THE JEWEL OF SOUTH INDIA?</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Plan Your Yercaud Trip in <span className="text-brand-yellow">60 Seconds</span>
          </h2>
          
          <p className="mt-6 text-lg sm:text-xl text-neutral-200 max-w-2xl mx-auto font-medium">
            Don&apos;t waste hours on confusing booking engines. Call us directly or message on WhatsApp &mdash; we share live cottage photos and lock your dates instantly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <a
              href={CONTACT.phoneHref}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-2xl btn-solid-yellow text-base font-black shadow-xl"
            >
              <Phone className="w-5 h-5 stroke-[2.5]" />
              <span>Call Now: {CONTACT.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppUrl("Hi Namma Yercaud, I'd like to plan my trip to Yercaud this weekend.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-2xl btn-solid-whatsapp text-base font-black shadow-xl"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
              <span>WhatsApp Us: {CONTACT.whatsappDisplay}</span>
            </a>

          </div>

          <div className="mt-8 text-xs text-neutral-300 font-bold">
            Available 7:00 AM – 10:30 PM &bull; Salem &bull; Yercaud &bull; Shevaroy Hills
          </div>

        </div>
      </section>
    </>
  );
}
