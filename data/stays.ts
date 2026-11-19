export interface Stay {
  id: string;
  name: string;
  type: string;
  badge: string;
  highlight: string;
  description: string;
  image: string;
  amenities: string[];
  capacity: string;
  category: 'valley' | 'estate' | 'couple' | 'budget';
  location: string;
  assignedAdmin: 'admin1' | 'admin2';
}

export const STAYS_DATA: Stay[] = [
  {
    id: 'shevaroy-mist-chalet',
    name: 'Shevaroy Valley View Chalet',
    type: 'Private Hillside Villa',
    badge: 'Panoramic Valley View',
    highlight: 'Overlooking Salem Plains & 20 Hairpin Bends',
    description: 'Perched on the eastern cliff edge with unobstructed sunrise views. Features large private viewing deck, private campfire setup, and homestyle food.',
    image: '/images/stay-cottage.jpg',
    amenities: ['🔥 Campfire Lawn', '☕ Homestyle Kitchen', '🚿 24/7 Geyser', '🚗 Private Parking'],
    capacity: 'Up to 10-12 Guests',
    category: 'valley',
    location: 'Near Lady’s Seat Cliff, Yercaud',
    assignedAdmin: 'admin1',
  },
  {
    id: 'arabica-estate-cabin',
    name: 'Arabica Coffee Estate Wooden Cabin',
    type: 'Colonial Plantation Homestay',
    badge: 'Coffee Estate Stay',
    highlight: 'Deep Inside 15 Acres of Silver Oaks & Coffee',
    description: 'Authentic wooden lodge surrounded by flowering Arabica coffee and black pepper vines. Bird watching trails, silence, and estate brewed coffee.',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1000&q=80',
    amenities: ['☕ Plantation Walk', '🪵 Wooden Interiors', '📶 High Speed Wi-Fi', '📸 Bird Watching'],
    capacity: '2 to 6 Guests',
    category: 'estate',
    location: 'Grange Estate Road, Yercaud',
    assignedAdmin: 'admin1',
  },
  {
    id: 'tipperary-sunset-suite',
    name: 'Tipperary Romantic Sunset Suite',
    type: 'Couples & Honeymoon Retreat',
    badge: 'Couples & Honeymoon',
    highlight: 'Private Balcony Facing Golden Sunset Horizon',
    description: 'Romantic cottage built for couples. Glass picture windows overlook rolling clouds, evening breeze, and valley twilight with campfire.',
    image: '/images/couple-suite.jpg',
    amenities: ['🌅 Sunset Deck', '🍽️ In-Room Candlelight', '🛏️ King Bed', '🔥 Evening Campfire'],
    capacity: '2 Guests',
    category: 'couple',
    location: 'Tipperary Viewpoint Ridge, Yercaud',
    assignedAdmin: 'admin2',
  },
  {
    id: 'emerald-lakeview-rooms',
    name: 'Emerald Lake Promenade Rooms',
    type: 'Central & Family Value Stay',
    badge: 'Lake Walk & Budget Value',
    highlight: '2 Minutes Walk to Boathouse & Anna Park',
    description: 'Safe, clean, central budget accommodation right by Yercaud Lake. Walking distance to boat house, garden bazaars, and local restaurants.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    amenities: ['🚶 Walk to Lake', '🛡️ 24/7 Security', '🚿 Hot Water', '🍛 Restaurants Nearby'],
    capacity: '2 to 4 Guests',
    category: 'budget',
    location: 'Town Centre, Lake Road, Yercaud',
    assignedAdmin: 'admin2',
  },
];
