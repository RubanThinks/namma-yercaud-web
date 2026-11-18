'use client';

import React from 'react';
import Image from 'next/image';
import { PRODUCTS_DATA } from '@/data/products';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Phone, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function MarketPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-extrabold text-black bg-brand-yellow border-2 border-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
          100% Pure Hill Harvest &bull; Direct From Shevaroy Growers
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 uppercase tracking-tight">
          Wild Honey &amp; Estate Spices
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-700 font-medium">
          Say no to sugar-adulterated tourist honey and artificial spices. We source directly from indigenous Shevaroy cliff honey hunters and organic coffee planters.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {PRODUCTS_DATA.map((product) => (
          <div
            key={product.id}
            className="trendy-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 justify-between"
          >
            <div className="relative sm:w-1/2 h-56 sm:h-auto image-zoom-box">
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

            <div className="sm:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-brand-orange uppercase tracking-wider block mb-1">
                  {product.category}
                </span>
                <h3 className="text-2xl font-black text-black">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 mt-2 leading-relaxed font-medium">
                  {product.description}
                </p>

                <div className="mt-4 pt-3 border-t-2 border-neutral-200">
                  <div className="text-xs font-extrabold text-black">
                    📦 <strong>Available in:</strong> {product.packaging}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.perks.map((perk, i) => (
                      <span key={i} className="text-[11px] bg-neutral-100 border border-neutral-300 font-bold px-2 py-0.5 rounded text-neutral-800">
                        ✓ {perk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-neutral-200 flex items-center gap-2">
                <a
                  href={CONTACT.phoneHref}
                  className="flex-1 py-2.5 text-center rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Call Order</span>
                </a>
                <a
                  href={getWhatsAppUrl(`Hi Namma Yercaud, I'd like to order ${product.name}. Please share available bottle sizes, prices, and delivery options.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 text-center rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Order</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Guarantee Card */}
      <div className="bg-brand-yellow rounded-3xl p-8 sm:p-12 border-4 border-black flex flex-col md:flex-row items-center justify-between gap-8 shadow-[6px_6px_0px_#1A233A]">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-black text-brand-yellow flex items-center justify-center font-bold">
              <Truck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-black uppercase">
              Delivered Right to Your Cottage or Shipped Home
            </h3>
          </div>
          <p className="text-sm text-neutral-900 mt-3 max-w-2xl font-bold leading-relaxed">
            Staying in Yercaud? We deliver pure wild honey and fresh roasted coffee straight to your cottage reception within 60 minutes. Or we safely courier fresh airtight boxes anywhere in India.
          </p>
        </div>
        <a
          href={getWhatsAppUrl("Hi Namma Yercaud, I want to order hill spices & honey for home delivery / courier.")}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-2xl btn-solid-whatsapp text-sm font-black flex items-center gap-2 whitespace-nowrap"
        >
          <WhatsAppIcon className="w-5 h-5 fill-white" />
          <span>Quick WhatsApp Order</span>
        </a>
      </div>

    </div>
  );
}
