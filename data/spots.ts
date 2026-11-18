export interface SightSpot {
  id: string;
  name: string;
  badge: string;
  description: string;
  image: string;
  bestTime: string;
  highlight: string;
  distance: string;
}

export const SPOTS_DATA: SightSpot[] = [
  {
    id: 'emerald-lake',
    name: 'Emerald Lake & Boathouse',
    badge: 'Heart of Yercaud',
    description: 'Surrounded by tranquil hills, gardens, and towering silver oaks. Enjoy self-pedal or row boating, followed by piping hot Salem thattu vadai settu and roasted corn along the promenade.',
    image: '/images/yercaud-lake.jpg',
    bestTime: '9:00 AM – 5:30 PM',
    highlight: 'Pedal & Motor Boating • Lake Bazaar',
    distance: '0 km from Town Centre',
  },
  {
    id: 'ladys-seat',
    name: "Lady's Seat & 20 Hairpin View",
    badge: 'Salem Valley Panorama',
    description: 'A natural rock cliff looking 4,000 feet straight down onto Salem city and the winding 20 hairpin bends of the Ghat Road. Features a viewing tower with telescope facilities.',
    image: '/images/ladys-seat.jpg',
    bestTime: '4:30 PM – 6:30 PM (Sunset)',
    highlight: 'Twinkling City Lights • Telescope View',
    distance: '2 km from Lake',
  },
  {
    id: 'pagoda-point',
    name: 'Pagoda Point (Ramakkal)',
    badge: 'Eastern Ridge View',
    description: 'Features ancient stone pyramid pillars built by indigenous Malayali tribes. Offers powerful cool mountain winds and a sweeping vista of Attur valley and tribal hamlets.',
    image: '/images/pagoda-point.jpg',
    bestTime: 'Sunrise & Early Morning',
    highlight: 'Ancient Tribal Pyramids • Cool Breeze',
    distance: '4.5 km from Lake',
  },
  {
    id: 'kiliyur-falls',
    name: 'Kiliyur Falls & Oak Forest Trek',
    badge: '300ft Forest Waterfall',
    description: 'A dramatic 300-foot waterfall plunging into the deep valley of the Shevaroy range. Reached via an exhilarating forest trail of 200+ stone steps shaded by silver oak trees.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Post-Monsoon & Winter',
    highlight: 'Forest Trek • Fresh Mountain Spray',
    distance: '3.5 km from Lake',
  },
];
