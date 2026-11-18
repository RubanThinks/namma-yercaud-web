import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingMobileBar from '@/components/FloatingMobileBar';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  themeColor: '#FFC800',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Namma Yercaud – Verified Cottages, 4x4 Jeep Safaris & Hill Spices in Yercaud',
  description: 'Connect directly with local experts for verified hillside cottages, 4x4 off-road Jeep safaris, honest cabs, raw Shevaroy honey, and authentic food in Yercaud, Tamil Nadu.',
  keywords: ['Yercaud cottages', 'Yercaud jeep safari', 'Yercaud cab service', 'Yercaud wild honey', 'Salem to Yercaud taxi', 'Yercaud local tourism'],
  openGraph: {
    title: 'Namma Yercaud – Your Trusted Local Hill Station Companion',
    description: 'Direct booking assistance for cottages, off-road jeeps, cabs, estate honey, and food delivery in Yercaud. Call 82203 22008 or WhatsApp 76958 50762.',
    url: 'https://nammayercaud.com',
    siteName: 'Namma Yercaud',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF6EE] text-[#121826] font-sans antialiased min-h-screen flex flex-col pt-20 pb-20 sm:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingMobileBar />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
