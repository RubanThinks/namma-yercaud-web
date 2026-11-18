export interface Product {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  image: string;
  packaging: string;
  perks: string[];
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'wild-rock-honey',
    name: 'Shevaroy Pure Wild Rock Honey',
    category: 'Honey',
    badge: 'Raw & Unheated',
    description: 'Gathered directly from cliff combs in Shevaroy hills by indigenous Malayali tribal honey collectors. 100% raw, unpasteurized, rich in wild pollen and forest medicinal nectar.',
    image: '/images/honey-spices.jpg',
    packaging: '250g, 500g & 1kg Glass Jars',
    perks: ['Raw & Unpasteurized', 'Rich Forest Aroma', 'Tribal Cliff Harvest'],
  },
  {
    id: 'tellicherry-pepper',
    name: 'Estate Bold Black & White Pepper',
    category: 'Spices',
    badge: 'Estate Grade 1',
    description: 'Sun-dried peppercorns plucked from vines twining around towering silver oak shade trees in Yercaud coffee plantations. High essential oil concentration and authentic hill pungency.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    packaging: 'Whole Peppercorns / Fresh Ground',
    perks: ['High Piperine Heat', 'Direct From Planter', 'Unpolished & Pure'],
  },
  {
    id: 'yercaud-coffee',
    name: 'Yercaud High-Grown Arabica Coffee',
    category: 'Coffee',
    badge: 'Single-Origin 4500ft',
    description: 'Freshly roasted Arabica beans cultivated on the cool slopes of Grange and Tipperary estates. Ground to order for South Indian filter, French press, or supplied whole bean.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    packaging: '250g & 500g Aroma-Lock Valve Bags',
    perks: ['100% Pure or 80:20 Chicory', 'Fresh Roasted', 'Direct Estate Sourced'],
  },
  {
    id: 'chocolates-oil',
    name: 'Homemade Chocolates & Eucalyptus Oil',
    category: 'Artisanal',
    badge: 'Handcrafted Hill Specialty',
    description: 'Rich artisanal homemade chocolates (Dark Cocoa, Roasted Almond, Fruit & Nut) paired with 100% steam-distilled eucalyptus oil for quick cold, headache, and sinus relief.',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
    packaging: 'Assorted Gift Boxes & 100ml Oil Bottles',
    perks: ['Pure Steam Distillate', 'Mouth-Melting Cocoa', 'Great Gift Souvenir'],
  },
];
