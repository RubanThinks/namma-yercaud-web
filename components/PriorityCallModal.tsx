'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCall } from '@/context/CallContext';
import { Phone, ShieldCheck, X, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function PriorityCallModal() {
  const { isOpen, activeIntent, closeModal } = useCall();
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhone('');
      setError('');
      setIsSubmitting(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  if (!isOpen || !activeIntent) return null;

  const cleanPhone = phone.replace(/\D/g, '');
  const isValid = /^[6-9]\d{9}$/.test(cleanPhone);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (error && val.length === 10) {
      setError('');
    }
  };

  const handleConnectCall = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const payload = {
      customerPhone: cleanPhone,
      serviceCategory: activeIntent.serviceCategory,
      cardTitle: activeIntent.cardTitle,
      predictedPurpose: activeIntent.predictedPurpose,
      assignedAdmin: activeIntent.assignedAdmin,
      adminName: activeIntent.adminName,
      destinationPhone: activeIntent.destinationPhone,
      pageUrl: activeIntent.pageUrl || window.location.pathname,
      timestamp: new Date().toISOString(),
      dateString: new Date().toISOString().split('T')[0],
      status: 'New',
    };

    // 1. Log to API
    try {
      fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn('API call logging notice:', err));
    } catch (e) {
      // Continue even if network drops
    }

    // 2. Log to Firebase Firestore if configured
    try {
      if (db) {
        addDoc(collection(db, 'call_leads'), {
          ...payload,
          createdAt: serverTimestamp(),
        }).catch((err) => console.warn('Firestore write notice:', err));
      }
    } catch (e) {
      // Graceful fallback
    }

    // 3. Store locally in browser for offline session resilience
    try {
      const stored = JSON.parse(localStorage.getItem('namma_yercaud_calls') || '[]');
      stored.unshift({ ...payload, id: `local_${Date.now()}` });
      localStorage.setItem('namma_yercaud_calls', JSON.stringify(stored.slice(0, 50)));
    } catch (e) {}

    // 4. Trigger the native phone dialer immediately
    const telTarget = `tel:+91${activeIntent.destinationPhone}`;
    
    // Smooth delay so the user feels the instant verification & connection
    setTimeout(() => {
      window.location.href = telTarget;
      setTimeout(() => {
        setIsSubmitting(false);
        closeModal();
      }, 1200);
    }, 250);
  };

  return (
    <div
      id="priority-call-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) closeModal();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-black transition-all">
        
        {/* Top Priority Badge Bar */}
        <div className="bg-[#1A233A] text-white px-6 py-3.5 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-yellow">
              Priority Local Dispatch
            </span>
          </div>

          <button
            onClick={closeModal}
            disabled={isSubmitting}
            className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center text-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-7">
          
          {/* Logo & Headline */}
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-2 rounded-xl border-2 border-brand-yellow shadow-[2px_2px_0px_#000000] inline-block">
              <Image
                src="/images/logo.png"
                alt="Namma Yercaud"
                width={110}
                height={38}
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                Direct Hill Station Network
              </span>
              <h3 className="text-base sm:text-lg font-black text-black leading-tight">
                Connecting Coordinator Line
              </h3>
            </div>
          </div>

          {/* Context Intent Banner */}
          <div className="bg-[#FAF6EE] border-2 border-[#1A233A] rounded-2xl p-3.5 mb-5 shadow-[2px_2px_0px_#1A233A]">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-brand-yellow border border-black flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-black" />
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                  Routing For Your Selection:
                </div>
                <div className="text-xs sm:text-sm font-black text-black leading-tight mt-0.5">
                  {activeIntent.cardTitle}
                </div>
                <div className="text-[11px] text-neutral-600 font-semibold mt-1 flex items-center gap-1">
                  <span>⚡ Queue: Verified Hill Coordinator Line</span>
                </div>
              </div>
            </div>
          </div>

          {/* Psychological Urgency & Value Proposition */}
          <p className="text-xs text-neutral-700 leading-relaxed font-medium mb-4">
            To prevent automated spam and route you directly to our on-duty local hill-station manager without middleman markups, please confirm your 10-digit mobile number:
          </p>

          {/* The Single Input Form */}
          <form onSubmit={handleConnectCall} className="space-y-4">
            <div>
              <div className="relative flex items-center">
                {/* +91 Country Badge */}
                <div className="absolute left-3 flex items-center gap-1.5 px-2 py-1 bg-neutral-100 rounded-lg border border-neutral-300 pointer-events-none select-none">
                  <span className="text-sm">🇮🇳</span>
                  <span className="text-xs font-black text-black">+91</span>
                </div>

                <input
                  ref={inputRef}
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit mobile"
                  maxLength={10}
                  disabled={isSubmitting}
                  className="w-full pl-20 pr-4 py-3.5 text-base sm:text-lg font-black text-black bg-white border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-brand-yellow placeholder:text-neutral-400 tracking-wider"
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 font-bold mt-1.5 ml-1">
                  ⚠️ {error}
                </p>
              )}
            </div>

            {/* The Single High-Intent Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-4 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2.5 uppercase tracking-wide transition-all shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] ${
                isValid && !isSubmitting
                  ? 'btn-solid-yellow hover:scale-[1.01]'
                  : 'bg-neutral-200 text-neutral-500 border-2 border-neutral-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting Secure Line...</span>
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                  <span>Connect Direct Call Now</span>
                </>
              )}
            </button>
          </form>

          {/* Micro-Trust Footnote */}
          <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-bold">
            <Lock className="w-3 h-3 text-neutral-400" />
            <span>Instant Direct Call &bull; No Spam &bull; 100% Verified Local Rates</span>
          </div>

        </div>
      </div>
    </div>
  );
}
