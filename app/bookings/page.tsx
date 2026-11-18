'use client';

import React from 'react';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Phone, MapPin, Clock, HelpCircle, Sparkles } from 'lucide-react';

export default function BookingsPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow text-black font-black text-xs tracking-wider uppercase border-2 border-black">
          ⚡ Direct Concierge &bull; Zero Booking Fees
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-black mt-4 leading-tight uppercase">
          How It Works &amp; Direct Contact
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 font-medium">
          No sign-ups, no payment gateway fees, and no waiting. One phone call or WhatsApp message connects you directly to a friendly Yercaud local who arranges everything.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: How It Works & FAQs */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* 3 Steps */}
          <div>
            <span className="text-xs font-black text-brand-orange uppercase tracking-wider">Simple 3-Step Protocol</span>
            <h2 className="text-2xl sm:text-3xl font-black text-black mt-1 mb-6 uppercase">
              Booking Your Trip Is Effortless
            </h2>

            <div className="space-y-6">
              
              <div className="flex items-start gap-4 p-6 rounded-3xl bg-white border-2 border-neutral-300 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow text-black flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-black">
                  01
                </div>
                <div>
                  <h3 className="font-black text-black text-lg">Call or Message on WhatsApp</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed font-medium">
                    Reach us at <strong>{CONTACT.phoneDisplay}</strong> or WhatsApp <strong>{CONTACT.whatsappDisplay}</strong>. Tell us what you need: a valley-view cottage, a 4x4 Jeep ride, a cab pickup from Salem station, fresh honey, or hot dinner.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-3xl bg-white border-2 border-neutral-300 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-black text-brand-yellow flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-black">
                  02
                </div>
                <div>
                  <h3 className="font-black text-black text-lg">Instant Verified Options &amp; Fixed Quotes</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed font-medium">
                    We send real room photos, exact prices, driver contact details, and itinerary schedules directly to your phone. No surprises or hidden costs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-3xl bg-white border-2 border-neutral-300 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-black">
                  03
                </div>
                <div>
                  <h3 className="font-black text-black text-lg">Confirmed Booking &amp; On-Ground Support</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed font-medium">
                    Once confirmed, our local team is at your service throughout your stay in Yercaud. If you ever need directions, food, or an extra trip, we are just a quick message away.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* FAQs */}
          <div className="pt-8 border-t-2 border-neutral-200">
            <h3 className="text-2xl font-black text-black mb-6 flex items-center gap-2 uppercase">
              <HelpCircle className="w-6 h-6 text-black" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-white border-2 border-neutral-300">
                <h4 className="font-black text-black">How far in advance should we book cottages and jeeps?</h4>
                <p className="text-neutral-600 mt-1.5 leading-relaxed font-medium">
                  For weekends and public holidays, we recommend contacting us 2 to 3 days in advance to secure the best valley-view chalets and early morning sunrise jeep slots. For weekdays, same-day bookings are usually available.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-neutral-300">
                <h4 className="font-black text-black">Is Yercaud safe for family and couples?</h4>
                <p className="text-neutral-600 mt-1.5 leading-relaxed font-medium">
                  Yes, Yercaud is one of the most peaceful, crime-free hill stations in South India. All properties and drivers partnered with Namma Yercaud are personally vetted by our local team for safety and hospitality.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-neutral-300">
                <h4 className="font-black text-black">How do we pay?</h4>
                <p className="text-neutral-600 mt-1.5 leading-relaxed font-medium">
                  You can pay via UPI (GPay, PhonePe, Paytm), cash, or bank transfer directly upon confirmation or during check-in/delivery.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-neutral-300">
                <h4 className="font-black text-black">Can you arrange station pickup if our train arrives at midnight?</h4>
                <p className="text-neutral-600 mt-1.5 leading-relaxed font-medium">
                  Yes! With prior booking, our drivers will be waiting outside Salem Railway Junction platform exit at any hour (midnight or early morning 4 AM).
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Direct Contact Office Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#1A233A] text-white p-8 sm:p-10 rounded-3xl shadow-2xl sticky top-28 border-2 border-[#2A3756]">
            
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow text-black font-black text-xs tracking-wider uppercase border border-black mb-4">
              📍 Local Hill Office
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-2">Namma Yercaud Concierge</h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed font-normal">
              Serving visitors throughout the Shevaroy Hills, Nagalur, Pagoda Point, Lake area, and Salem ghat route.
            </p>

            <div className="mt-8 space-y-6 pt-6 border-t border-[#2A3756]">
              <div>
                <div className="text-[11px] text-brand-yellow font-extrabold uppercase tracking-wider">Direct Phone Call</div>
                <a href={CONTACT.phoneHref} className="text-xl font-black text-white hover:text-brand-yellow transition-colors flex items-center gap-2 mt-1">
                  <Phone className="w-5 h-5 text-brand-yellow" />
                  +91 {CONTACT.phoneDisplay}
                </a>
              </div>

              <div>
                <div className="text-[11px] text-[#25D366] font-extrabold uppercase tracking-wider">WhatsApp Business</div>
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-xl font-black text-white hover:text-[#25D366] transition-colors flex items-center gap-2 mt-1">
                  <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
                  +91 {CONTACT.whatsappDisplay}
                </a>
              </div>

              <div>
                <div className="text-[11px] text-neutral-300 font-extrabold uppercase tracking-wider">Operating Hours</div>
                <div className="text-sm font-bold text-white mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-yellow" />
                  <span>{CONTACT.timing}</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-neutral-300 font-extrabold uppercase tracking-wider">Office Location</div>
                <div className="text-sm font-bold text-white mt-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                  <span>{CONTACT.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A3756] flex flex-col gap-3">
              <a
                href={CONTACT.phoneHref}
                className="w-full py-4 rounded-xl btn-solid-yellow text-sm font-black flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 stroke-[2.5]" />
                <span>DIRECT CALL: {CONTACT.phoneDisplay}</span>
              </a>

              <a
                href={getWhatsAppUrl("Hi Namma Yercaud, I'd like to book a trip to Yercaud. Please share available packages.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl btn-solid-whatsapp text-sm font-black flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>CHAT ON WHATSAPP: {CONTACT.whatsappDisplay}</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
