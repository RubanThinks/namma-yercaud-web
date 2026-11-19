'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCall } from '@/context/CallContext';
import { Phone, X, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function PriorityCallModal() {
  const { isOpen, activeIntent, closeModal } = useCall();
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionDone, setActionDone] = useState<'called' | 'callback' | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhone('');
      setError('');
      setIsSubmitting(false);
      setActionDone(null);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
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

  // Submit helper for both "Call Now" and "Request Callback"
  const submitLead = async (actionType: 'Direct Call' | 'Callback Request') => {
    if (!isValid) {
      setError('Enter a valid 10-digit mobile number');
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
      actionType,
      pageUrl: activeIntent.pageUrl || window.location.pathname,
      timestamp: new Date().toISOString(),
      dateString: new Date().toISOString().split('T')[0],
      status: 'New',
    };

    // 1. Log to Next.js API
    try {
      fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn('API log notice:', err));
    } catch (e) {}

    // 2. Log to Firestore
    try {
      if (db) {
        addDoc(collection(db, 'call_leads'), {
          ...payload,
          createdAt: serverTimestamp(),
        }).catch((err) => console.warn('Firestore write notice:', err));
      }
    } catch (e) {}

    // 3. Store in local browser storage for offline resilience
    try {
      const stored = JSON.parse(localStorage.getItem('namma_yercaud_calls') || '[]');
      stored.unshift({ ...payload, id: `local_${Date.now()}` });
      localStorage.setItem('namma_yercaud_calls', JSON.stringify(stored.slice(0, 50)));
    } catch (e) {}

    if (actionType === 'Direct Call') {
      setActionDone('called');
      const telTarget = `tel:+91${activeIntent.destinationPhone}`;
      setTimeout(() => {
        window.location.href = telTarget;
        setTimeout(() => {
          setIsSubmitting(false);
          closeModal();
        }, 1200);
      }, 200);
    } else {
      // Callback request
      setActionDone('callback');
      setTimeout(() => {
        setIsSubmitting(false);
        closeModal();
      }, 1800);
    }
  };

  return (
    <div
      id="priority-call-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) closeModal();
      }}
    >
      {/* Frosted Glass Window */}
      <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/80 transition-all">
        
        {/* Top Header Row with Minimal Badge and Close */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-neutral-800">
              Direct Coordinator Line
            </span>
          </div>

          <button
            onClick={closeModal}
            disabled={isSubmitting}
            className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Selected Context Pill */}
        <div className="bg-[#FAF6EE] border border-neutral-300 rounded-2xl px-3 py-2 mb-4 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange shrink-0" />
          <div className="text-xs font-black text-black truncate">
            {activeIntent.cardTitle}
          </div>
        </div>

        {/* Success Feedback View */}
        {actionDone === 'callback' ? (
          <div className="py-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="text-base font-black text-black">Callback Requested!</h4>
            <p className="text-xs text-neutral-600 font-semibold mt-1">
              Our on-duty coordinator will call you back within 2 minutes.
            </p>
          </div>
        ) : actionDone === 'called' ? (
          <div className="py-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-brand-yellow/30 text-black rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 stroke-[2.5] animate-bounce" />
            </div>
            <h4 className="text-base font-black text-black">Connecting Call...</h4>
            <p className="text-xs text-neutral-600 font-semibold mt-1">
              Opening dialer for verified local rate.
            </p>
          </div>
        ) : (
          /* Phone Input & Action Buttons */
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600 block mb-1.5">
                Enter your mobile number:
              </label>

              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center gap-1 px-1.5 py-0.5 bg-neutral-100 rounded-lg border border-neutral-300 pointer-events-none">
                  <span className="text-xs">🇮🇳</span>
                  <span className="text-xs font-black text-black">+91</span>
                </div>

                <input
                  ref={inputRef}
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="98765 43210"
                  maxLength={10}
                  disabled={isSubmitting}
                  className="w-full pl-16 pr-3 py-2.5 text-base font-black text-black bg-white/90 border-2 border-black rounded-2xl shadow-[2px_2px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-brand-yellow placeholder:text-neutral-400 tracking-wider"
                />
              </div>

              {error && (
                <p className="text-[11px] text-red-600 font-bold mt-1">
                  ⚠️ {error}
                </p>
              )}
            </div>

            {/* Dual Buttons: Call Now + Request Callback */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              
              {/* Button 1: Call Now */}
              <button
                type="button"
                onClick={() => submitLead('Direct Call')}
                disabled={isSubmitting || !isValid}
                className={`py-3 px-2 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 uppercase tracking-wide transition-all shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] ${
                  isValid && !isSubmitting
                    ? 'btn-solid-yellow hover:scale-[1.02]'
                    : 'bg-neutral-200 text-neutral-400 border-2 border-neutral-300 cursor-not-allowed'
                }`}
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Call Now</span>
              </button>

              {/* Button 2: Request Callback */}
              <button
                type="button"
                onClick={() => submitLead('Callback Request')}
                disabled={isSubmitting || !isValid}
                className={`py-3 px-2 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 uppercase tracking-wide transition-all shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] ${
                  isValid && !isSubmitting
                    ? 'bg-[#1A233A] text-brand-yellow border-2 border-black hover:bg-[#253252] hover:scale-[1.02]'
                    : 'bg-neutral-100 text-neutral-400 border-2 border-neutral-300 cursor-not-allowed'
                }`}
              >
                <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Callback</span>
              </button>

            </div>

            <p className="text-[10px] text-neutral-500 font-semibold text-center pt-1">
              Instant connect &bull; Zero broker markup &bull; Verified hill rate
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
