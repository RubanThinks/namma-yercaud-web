'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingMobileBar from '@/components/FloatingMobileBar';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { CallProvider } from '@/context/CallContext';
import PriorityCallModal from '@/components/PriorityCallModal';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <CallProvider>
      {isAdmin ? (
        <main className="min-h-screen">{children}</main>
      ) : (
        <div className="min-h-screen flex flex-col pt-20 pb-20 sm:pb-0">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingMobileBar />
          <FloatingWhatsApp />
        </div>
      )}
      <PriorityCallModal />
    </CallProvider>
  );
}
