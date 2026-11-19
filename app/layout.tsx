import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nammayercaud.com';

export const viewport: Viewport = {
  themeColor: '#FFC800',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Namma Yercaud – Verified Cottages, 4x4 Jeep Safaris & Hill Spices in Yercaud',
    template: '%s | Namma Yercaud',
  },
  description:
    'Direct booking assistance with verified hillside cottages, 4x4 off-road Jeep safaris, honest cabs, raw Shevaroy honey, and authentic food in Yercaud, Salem, Tamil Nadu.',
  keywords: [
    'Yercaud cottages',
    'Yercaud resorts',
    'Yercaud jeep safari',
    'Yercaud 4x4 off road',
    'Yercaud cab service',
    'Salem to Yercaud taxi',
    'Yercaud raw wild honey',
    'Yercaud spices and pepper',
    'Namma Yercaud',
    'Yercaud tourism local guide',
  ],
  authors: [{ name: 'Namma Yercaud Team', url: siteUrl }],
  creator: 'Namma Yercaud',
  publisher: 'Namma Yercaud',
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Namma Yercaud – Verified Cottages, 4x4 Jeep Safaris & Hill Spices',
    description:
      'Direct local bookings for verified hillside cottages, off-road 4x4 safaris, cabs, pure estate honey, and food delivery in Yercaud hills. WhatsApp: +91 76958 50762 | Call: +91 82203 22008.',
    url: siteUrl,
    siteName: 'Namma Yercaud',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Namma Yercaud – Official Hill Station Tourism & Services',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Namma Yercaud – Verified Cottages, 4x4 Jeep Safaris & Hill Spices',
    description:
      'Direct booking assistance with verified cottages, 4x4 off-road jeeps, cabs, estate honey, and food delivery in Yercaud.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Namma Yercaud',
  image: `${siteUrl}/images/og-image.jpg`,
  logo: `${siteUrl}/images/logo.png`,
  url: siteUrl,
  telephone: '+918220322008',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Main Road',
    addressLocality: 'Yercaud',
    addressRegion: 'Tamil Nadu',
    postalCode: '636601',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 11.7753,
    longitude: 78.2093,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '06:00',
    closes: '23:00',
  },
  sameAs: [
    'https://wa.me/917695850762',
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FAF6EE] text-[#121826] font-sans antialiased min-h-screen">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
