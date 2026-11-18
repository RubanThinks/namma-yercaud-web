# Namma Yercaud – World-Class Next.js 14 Tourism & Concierge Platform

A modern, highly engaging, high-converting tourism and local services web application for **Namma Yercaud** (Yercaud, Shevaroy Hills, Salem District, Tamil Nadu).

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, and modern mobile-first UX patterns designed to convert visitors directly into phone calls and WhatsApp enquiries.

---

## ⚡ Primary Conversion Goal
- **Direct Phone Call:** `82203 22008` &rarr; `tel:+918220322008`
- **WhatsApp Concierge:** `76958 50762` &rarr; `https://wa.me/917695850762`

---

## 🚀 Technology Stack
- **Framework:** Next.js 14.2+ (App Router)
- **Language:** TypeScript 5.5
- **Styling:** Tailwind CSS with custom nature-inspired theme (Deep Emerald, Fresh Lime, Warm Creams, Sunset Orange)
- **Typography:** `Fraunces` (Editorial Serif) & `Outfit` (Modern Sans-Serif) via `next/font/google`
- **Icons:** `lucide-react`
- **Image Optimization:** `next/image` with remote patterns for high-res hill photography

---

## 📂 Project Architecture

```
namma-yercaud-site/
├── app/
│   ├── layout.tsx         # Root layout with fonts, metadata, global nav, and floating bars
│   ├── page.tsx           # Flagship homepage with all 11 rich sections
│   ├── globals.css        # Global styles, glassmorphism, pulse animations
│   ├── stays/page.tsx     # Stays & Cottages with category filters
│   ├── rides/page.tsx     # 4x4 Jeep Safaris, Ghat road cabs, and local autos
│   ├── market/page.tsx    # Pure wild honey, black pepper, coffee, and spices
│   ├── food/page.tsx      # Namma Yercaud Kitchen & Cottage Food Delivery
│   ├── explore/page.tsx   # Curated guide to Yercaud's top spots & weather tips
│   └── bookings/page.tsx  # Step-by-step concierge flow, FAQs & local hill office card
├── components/
│   ├── Navbar.tsx         # Frosted glass header with mobile slide-out drawer
│   ├── Footer.tsx         # Comprehensive footer with local contact details
│   ├── FloatingMobileBar.tsx # Persistent thumb-friendly Call & WhatsApp bar for mobile
│   ├── FloatingWhatsApp.tsx  # Pulsing desktop WhatsApp action button
│   └── QuickEnquiryModal.tsx # 60-second interactive trip enquiry modal with WhatsApp export
├── data/
│   ├── stays.ts           # Verified cottages, villas, homestays, and amenities
│   ├── jeeps.ts           # 4x4 Jeep safaris, timings, and durations
│   ├── products.ts        # Estate raw honey, pepper, cardamom, coffee, and chocolates
│   └── spots.ts           # Sightseeing landmarks, best timings, and pro tips
├── lib/
│   └── constants.ts       # Contact numbers, WhatsApp URL generator
├── public/                # Static assets
├── tailwind.config.ts     # Custom theme configuration
├── next.config.mjs        # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Scripts and dependencies
```

---

## 🛠️ Development & Deployment

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```
