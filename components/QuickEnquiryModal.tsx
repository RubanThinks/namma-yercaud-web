'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CONTACT, getWhatsAppUrl } from '@/lib/constants';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { X, Phone, Calendar, Users, CheckCircle2 } from 'lucide-react';

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function QuickEnquiryModal({
  isOpen,
  onClose,
  defaultService = 'Cottage / Stay',
}: QuickEnquiryModalProps) {
  const [service, setService] = useState(defaultService);
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2-4 Guests');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const services = [
    'Cottage / Stay',
    '4x4 Jeep Safari',
    'Cab / Station Transfer',
    'Honey & Spices Order',
    'Cottage Food Delivery',
    'All-In-One Trip Plan',
  ];

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi Namma Yercaud!\n\nI want to enquire about: *${service}*\n• Travel Dates: ${dates || 'Flexible'}\n• Number of Guests: ${guests}\n${note ? `• Special Requests: ${note}\n` : ''}\nPlease let me know available options and rates!`;
    window.open(getWhatsAppUrl(message), '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-black">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black flex items-center justify-center border-2 border-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white p-2 rounded-2xl border-2 border-brand-yellow shadow-[2px_2px_0px_#000000] inline-block">
              <Image
                src="/images/logo.png"
                alt="Namma Yercaud"
                width={140}
                height={48}
                className="h-9 w-auto object-contain"
              />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-orange bg-orange-100 px-3 py-1 rounded-full border border-brand-orange/30 inline-block">
              ⚡ Quick Concierge
            </span>
          </div>
          <h3 className="text-2xl font-black text-black">
            Plan Your Yercaud Trip in 60s
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-medium">
            Pick your requirements and we&apos;ll immediately share verified photos, schedules, and quotes on WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          
          {/* Service Picker */}
          <div>
            <label className="block text-xs font-black text-black mb-2 uppercase tracking-wide">
              What do you need help with?
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {services.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setService(s)}
                  className={`p-2.5 rounded-xl border-2 text-left font-bold transition-all ${
                    service === s
                      ? 'bg-brand-yellow text-black border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-300'
                  }`}
                >
                  {service === s && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-black" />}
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-black mb-1 flex items-center gap-1 uppercase tracking-wide">
                <Calendar className="w-3.5 h-3.5 text-neutral-700" />
                <span>Travel Dates</span>
              </label>
              <input
                type="text"
                placeholder="e.g. This Saturday / Nov 24"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border-2 border-neutral-300 focus:border-black focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-black mb-1 flex items-center gap-1 uppercase tracking-wide">
                <Users className="w-3.5 h-3.5 text-neutral-700" />
                <span>Headcount</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border-2 border-neutral-300 focus:border-black focus:outline-none bg-white font-medium"
              >
                <option value="1-2 Guests (Couples/Solo)">1-2 Guests (Couples/Solo)</option>
                <option value="3-5 Guests (Small Family)">3-5 Guests (Small Family)</option>
                <option value="6-10 Guests (Large Family/Friends)">6-10 Guests (Large Family/Friends)</option>
                <option value="10+ Guests (Big Group Villa)">10+ Guests (Big Group Villa)</option>
              </select>
            </div>
          </div>

          {/* Additional note */}
          <div>
            <label className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
              Any special requests? (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Need valley view, campfire, or pet friendly"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border-2 border-neutral-300 focus:border-black focus:outline-none font-medium"
            />
          </div>

          {/* Send via Official WhatsApp */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl btn-solid-whatsapp text-sm font-black flex items-center justify-center gap-2 mt-3"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white" />
            <span>Send Details on WhatsApp</span>
          </button>

          {/* Or Call */}
          <div className="text-center pt-2">
            <span className="text-xs text-neutral-600 font-medium">Prefer to speak directly? </span>
            <a
              href={CONTACT.phoneHref}
              className="text-xs font-black text-black hover:text-brand-orange inline-flex items-center gap-1 underline underline-offset-2"
            >
              <Phone className="w-3 h-3" />
              <span>Call {CONTACT.phoneDisplay}</span>
            </a>
          </div>

        </form>

      </div>
    </div>
  );
}
