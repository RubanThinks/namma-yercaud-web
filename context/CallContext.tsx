'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { predictCallIntent, ADMINS } from '@/lib/adminConfig';

export interface CallIntentOptions {
  service?: string;
  cardTitle?: string;
  pageUrl?: string;
  assignedAdmin?: 'admin1' | 'admin2';
  targetPhone?: string;
  predictedPurpose?: string;
}

interface CallContextType {
  isOpen: boolean;
  activeIntent: {
    serviceCategory: string;
    cardTitle: string;
    predictedPurpose: string;
    assignedAdmin: 'admin1' | 'admin2';
    adminName: string;
    destinationPhone: string;
    destinationPhoneDisplay: string;
    pageUrl: string;
  } | null;
  triggerCall: (options?: CallIntentOptions) => void;
  closeModal: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export function CallProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIntent, setActiveIntent] = useState<CallContextType['activeIntent']>(null);

  const triggerCall = (options?: CallIntentOptions) => {
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '/';
    const prediction = predictCallIntent({
      service: options?.service,
      cardTitle: options?.cardTitle,
      pageUrl: options?.pageUrl || currentUrl,
    });

    const selectedAdmin = options?.assignedAdmin || prediction.assignedAdmin;
    const adminObj = ADMINS[selectedAdmin] || ADMINS.admin1;

    setActiveIntent({
      serviceCategory: prediction.serviceCategory,
      cardTitle: options?.cardTitle || 'Direct Line',
      predictedPurpose: options?.predictedPurpose || prediction.predictedPurpose,
      assignedAdmin: selectedAdmin,
      adminName: adminObj.name,
      destinationPhone: options?.targetPhone || adminObj.phone,
      destinationPhoneDisplay: adminObj.phoneDisplay,
      pageUrl: options?.pageUrl || currentUrl,
    });

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Global event interceptor: Intercepts raw tel: links and data-call buttons
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="tel:"], [data-call-trigger="true"]');
      if (!target) return;

      // Avoid intercepting if inside the admin dashboard or the modal itself
      if (target.closest('#priority-call-modal') || window.location.pathname.startsWith('/admin')) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const service = target.getAttribute('data-service') || undefined;
      const title = target.getAttribute('data-title') || target.getAttribute('aria-label') || undefined;
      const admin = (target.getAttribute('data-admin') as 'admin1' | 'admin2') || undefined;

      triggerCall({
        service,
        cardTitle: title,
        assignedAdmin: admin,
        pageUrl: window.location.pathname,
      });
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  return (
    <CallContext.Provider value={{ isOpen, activeIntent, triggerCall, closeModal }}>
      {children}
    </CallContext.Provider>
  );
}

export function useCall() {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
}
