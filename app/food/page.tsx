'use client';

import React from 'react';
import Image from 'next/image';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Utensils, Phone } from 'lucide-react';

export default function FoodPage() {
  const menuItems = [
    {
      title: 'Yercaud Naatu Kozhi (Country Chicken) Pepper Fry',
      description: 'Slow-simmered hill country chicken infused with freshly crushed estate black pepper, small shallots, and curry leaves. Served piping hot with soft flaky parottas or steamed rice.',
      type: 'Non-Veg Hill Specialty',
      badge: '★ House Specialty',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Misty Morning South Indian Breakfast',
      description: 'Delivered at 7:30 AM to your cottage balcony. Steaming hot mallipoo idlis, crispy medu vadas, aromatic drumstick sambar, freshly ground coconut & tomato chutneys, and filter coffee.',
      type: 'Vegetarian Morning Feast',
      badge: '7:30 AM Cottage Delivery',
      image: '/images/veg-breakfast.jpg',
    },
    {
      title: 'Campfire Barbecue Skewers & Charcoal Setup',
      description: 'Pre-marinated pepper chicken skewers, paneer tikka, spicy sweet corn cobs, barbecue skewers, and hot charcoal coals delivered straight to your cottage campfire lawn.',
      type: 'Evening Bonfire Kit',
      badge: 'Campfire Ready',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow text-black font-extrabold text-xs tracking-wider uppercase border-2 border-black shadow-[2px_2px_0px_#000000]">
          <Utensils className="w-4 h-4 stroke-[2.5]" /> Namma Yercaud Kitchen
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-black mt-4 leading-tight uppercase">
          Hot, Authentic &amp; Delivered To Your Cottage
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-700 font-medium">
          Tired after navigating the 20 hairpin bends? Staying at a quiet valley retreat far from town restaurants? We deliver freshly cooked home-style meals and barbecue kits straight to your room.
        </p>
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="trendy-card overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-60 image-zoom-box">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 badge-pill-yellow">
                  {item.badge}
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-black text-brand-orange uppercase tracking-wider block mb-1">
                  {item.type}
                </span>
                <h3 className="text-xl font-black text-black">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-700 mt-2 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center gap-2">
              <a
                href={CONTACT.phoneHref}
                data-call-trigger="true"
                data-service="Food Delivery & Kitchen"
                data-title={item.title}
                data-admin="admin2"
                className="flex-1 py-3 text-center rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Call Order</span>
              </a>
              <a
                href={getWhatsAppUrl(`Hi Namma Yercaud, I'd like to order: ${item.title}. Please share available quantities and pricing.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dietary & Buffet Banner */}
      <div className="bg-brand-yellow rounded-3xl p-8 sm:p-12 border-4 border-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_#1A233A]">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-black uppercase">
            Have Dietary Preferences or Want Group Buffet Catering?
          </h3>
          <p className="text-sm text-neutral-900 mt-2 max-w-xl font-bold">
            We accommodate Jain meals, non-spicy food for toddlers, hot baby milk, and bulk buffet catering for groups of 20+ at your villa.
          </p>
        </div>
        <a
          href={getWhatsAppUrl("Hi Namma Yercaud, I have dietary requests for cottage catering.")}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-2xl btn-solid-whatsapp text-sm font-black flex items-center gap-2 flex-shrink-0"
        >
          <WhatsAppIcon className="w-5 h-5 fill-white" />
          <span>WhatsApp Kitchen</span>
        </a>
      </div>

    </div>
  );
}
