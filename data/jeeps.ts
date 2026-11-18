export interface JeepSafari {
  id: string;
  name: string;
  timing: string;
  badge: string;
  description: string;
  image: string;
  duration: string;
  capacity: string;
  highlights: string[];
}

export const JEEPS_DATA: JeepSafari[] = [
  {
    id: 'manjakuttai-sunrise-safari',
    name: 'Manjakuttai Sunrise Cloud Safari',
    timing: '5:30 AM Early Morning',
    badge: 'Sunrise Cloud Bed',
    description: 'Rugged 4x4 open-top Mahindra Thar safari through mist blankets in pre-dawn chill. Reach Manjakuttai peak before sunrise to watch golden clouds drift over the Eastern Ghats.',
    image: '/images/jeep-safari.jpg',
    duration: '~3 Hours',
    capacity: 'Up to 6-8 Persons',
    highlights: ['Cloud bed sunrise view', 'Pre-dawn mountain trails', 'Pro photography viewpoints'],
  },
  {
    id: 'loop-road-secret-trail',
    name: '32-Km Loop Road Off-Road Ridge Trail',
    timing: 'Flexible (Morning / Afternoon)',
    badge: 'Secret Off-Road Trail',
    description: 'Explore untouched rocky ridges, private coffee plantation tracks, bamboo thickets, and hidden seasonal stream paths where ordinary hatchbacks and sedans cannot go.',
    image: '/images/loop-road-trail.jpg',
    duration: '4-5 Hours',
    capacity: 'Up to 6-8 Persons',
    highlights: ['Deep coffee estate trails', 'Hidden tribal village tracks', 'Zero tourist crowd'],
  },
  {
    id: 'karadiyur-sunset-safari',
    name: 'Karadiyur Ridge Golden Hour Safari',
    timing: '4:00 PM Afternoon to Dusk',
    badge: 'Sunset Panorama',
    description: 'Catch the cool mountain evening breeze as the sky turns fiery crimson over Mettur dam reservoir. Finish with a night hill drive overlooking twinkling Salem valley lights.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    duration: '~3.5 Hours',
    capacity: 'Up to 6-8 Persons',
    highlights: ['Mettur dam sunset vista', 'Night hill drive', 'Salem valley lights view'],
  },
];
