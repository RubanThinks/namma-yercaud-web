export interface AdminConfig {
  id: 'admin1' | 'admin2';
  name: string;
  role: string;
  phone: string;
  phoneDisplay: string;
  phoneHref: string;
  assignedServices: string[];
}

export interface CallLog {
  id: string;
  customerPhone: string;
  serviceCategory: string;
  cardTitle: string;
  predictedPurpose: string;
  assignedAdmin: 'admin1' | 'admin2';
  adminName: string;
  destinationPhone: string;
  actionType: 'Direct Call' | 'Callback Request';
  pageUrl: string;
  timestamp: string; // ISO date
  dateString: string; // YYYY-MM-DD
  status: 'New' | 'Called Back' | 'Converted' | 'No Answer';
  notes?: string;
}

export const ADMINS: Record<'admin1' | 'admin2', AdminConfig> = {
  admin1: {
    id: 'admin1',
    name: 'Admin 1 (Rides, Spices & 2 Stays)',
    role: 'Jeeps, Auto, Cabs, Spices & Valley/Estate Chalets',
    phone: '7695850762',
    phoneDisplay: '+91 76958 50762',
    phoneHref: 'tel:+917695850762',
    assignedServices: [
      'Rides',
      'Jeep Safari',
      'Auto',
      'Cabs',
      'Transfers',
      'Spices & Pepper',
      'Shevaroy Valley View Chalet',
      'Arabica Coffee Estate Cabin',
    ],
  },
  admin2: {
    id: 'admin2',
    name: 'Admin 2 (Honey, Food & 2 Stays)',
    role: 'Wild Honey, Foods, Sunset Suite & Lake Rooms',
    phone: '8220322008',
    phoneDisplay: '+91 82203 22008',
    phoneHref: 'tel:+918220322008',
    assignedServices: [
      'Honey',
      'Wild Forest Honey',
      'Foods',
      'Local Mess & Meals',
      'Tipperary Romantic Sunset Suite',
      'Emerald Lake Promenade Rooms',
      'General Concierge',
    ],
  },
};

/**
 * Predicts customer intent and routes to Admin 1 or Admin 2
 * strictly based on the configured segregation rules.
 */
export function predictCallIntent(params: {
  service?: string;
  cardTitle?: string;
  pageUrl?: string;
}): {
  assignedAdmin: 'admin1' | 'admin2';
  adminName: string;
  destinationPhone: string;
  destinationPhoneDisplay: string;
  predictedPurpose: string;
  serviceCategory: string;
} {
  const service = (params.service || '').toLowerCase();
  const title = (params.cardTitle || '').toLowerCase();
  const page = (params.pageUrl || '').toLowerCase();

  // -------------------------------------------------------------
  // 1. HOTEL & COTTAGE SPLIT (2 to Admin 1, 2 to Admin 2)
  // -------------------------------------------------------------
  // Hotel Card 1 & 2 -> ADMIN 1 (76958 50762)
  if (
    title.includes('shevaroy') ||
    title.includes('valley') ||
    title.includes('arabica') ||
    title.includes('cabin') ||
    title.includes('estate')
  ) {
    return {
      assignedAdmin: 'admin1',
      adminName: ADMINS.admin1.name,
      destinationPhone: ADMINS.admin1.phone,
      destinationPhoneDisplay: ADMINS.admin1.phoneDisplay,
      predictedPurpose: `Stay booking inquiry for ${params.cardTitle || 'Valley/Estate Cottage'}`,
      serviceCategory: 'Stays (Admin 1 Line)',
    };
  }

  // Hotel Card 3 & 4 -> ADMIN 2 (82203 22008)
  if (
    title.includes('tipperary') ||
    title.includes('sunset') ||
    title.includes('couple') ||
    title.includes('emerald') ||
    title.includes('lake') ||
    title.includes('promenade')
  ) {
    return {
      assignedAdmin: 'admin2',
      adminName: ADMINS.admin2.name,
      destinationPhone: ADMINS.admin2.phone,
      destinationPhoneDisplay: ADMINS.admin2.phoneDisplay,
      predictedPurpose: `Stay booking inquiry for ${params.cardTitle || 'Sunset/Lakeview Rooms'}`,
      serviceCategory: 'Stays (Admin 2 Line)',
    };
  }

  // -------------------------------------------------------------
  // 2. RIDES, JEEPS, AUTOS, CABS -> ADMIN 1 (76958 50762)
  // -------------------------------------------------------------
  if (
    service.includes('ride') ||
    service.includes('jeep') ||
    service.includes('auto') ||
    service.includes('cab') ||
    service.includes('taxi') ||
    title.includes('jeep') ||
    title.includes('safari') ||
    title.includes('auto') ||
    title.includes('cab') ||
    title.includes('salem') ||
    title.includes('off-road') ||
    page.includes('/rides')
  ) {
    let purpose = 'Customer interested in 4x4 Off-Road Jeep Safari or Mountain Cab transfer';
    if (title.includes('jeep') || title.includes('safari') || title.includes('trail')) {
      purpose = `Booking inquiry for 4x4 Jeep Safari (${params.cardTitle || 'Mountain Circuit'})`;
    } else if (title.includes('cab') || title.includes('salem') || title.includes('auto')) {
      purpose = `Cab/Auto booking inquiry (${params.cardTitle || 'Transit Service'})`;
    }

    return {
      assignedAdmin: 'admin1',
      adminName: ADMINS.admin1.name,
      destinationPhone: ADMINS.admin1.phone,
      destinationPhoneDisplay: ADMINS.admin1.phoneDisplay,
      predictedPurpose: purpose,
      serviceCategory: 'Rides / Jeep, Auto & Cabs',
    };
  }

  // -------------------------------------------------------------
  // 3. SPICES & PEPPER -> ADMIN 1 (76958 50762)
  // -------------------------------------------------------------
  if (
    service.includes('spice') ||
    title.includes('pepper') ||
    title.includes('spice') ||
    title.includes('clove') ||
    title.includes('cardamom')
  ) {
    return {
      assignedAdmin: 'admin1',
      adminName: ADMINS.admin1.name,
      destinationPhone: ADMINS.admin1.phone,
      destinationPhoneDisplay: ADMINS.admin1.phoneDisplay,
      predictedPurpose: `Purchase inquiry for Yercaud plantation spices & pepper (${params.cardTitle || 'Estate Spices'})`,
      serviceCategory: 'Market & Spices',
    };
  }

  // -------------------------------------------------------------
  // 4. HONEY -> ADMIN 2 (82203 22008)
  // -------------------------------------------------------------
  if (
    service.includes('honey') ||
    title.includes('honey') ||
    title.includes('rock honey') ||
    title.includes('wild honey')
  ) {
    return {
      assignedAdmin: 'admin2',
      adminName: ADMINS.admin2.name,
      destinationPhone: ADMINS.admin2.phone,
      destinationPhoneDisplay: ADMINS.admin2.phoneDisplay,
      predictedPurpose: `Purchase inquiry for pure Shevaroy Wild Forest Honey (${params.cardTitle || 'Forest Honey'})`,
      serviceCategory: 'Honey (Admin 2)',
    };
  }

  // -------------------------------------------------------------
  // 5. FOODS & MESS -> ADMIN 2 (82203 22008)
  // -------------------------------------------------------------
  if (
    service.includes('food') ||
    title.includes('mess') ||
    title.includes('food') ||
    title.includes('meal') ||
    title.includes('breakfast') ||
    title.includes('catering') ||
    page.includes('/food')
  ) {
    return {
      assignedAdmin: 'admin2',
      adminName: ADMINS.admin2.name,
      destinationPhone: ADMINS.admin2.phone,
      destinationPhoneDisplay: ADMINS.admin2.phoneDisplay,
      predictedPurpose: `Cottage food delivery / authentic local meal inquiry (${params.cardTitle || 'Food Delivery'})`,
      serviceCategory: 'Foods & Mess',
    };
  }

  // -------------------------------------------------------------
  // 6. DEFAULT / GENERAL CONCIERGE -> ADMIN 1 (76958 50762)
  // -------------------------------------------------------------
  return {
    assignedAdmin: 'admin1',
    adminName: ADMINS.admin1.name,
    destinationPhone: ADMINS.admin1.phone,
    destinationPhoneDisplay: ADMINS.admin1.phoneDisplay,
    predictedPurpose: `General hill station concierge & direct travel inquiry (${params.cardTitle || 'Direct Line'})`,
    serviceCategory: 'General Concierge',
  };
}
