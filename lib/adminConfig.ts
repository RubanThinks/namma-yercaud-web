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
  pageUrl: string;
  timestamp: string; // ISO date
  dateString: string; // YYYY-MM-DD
  status: 'New' | 'Called Back' | 'Converted' | 'No Answer';
  notes?: string;
}

export const ADMINS: Record<'admin1' | 'admin2', AdminConfig> = {
  admin1: {
    id: 'admin1',
    name: 'Admin 1 (Stays & Concierge)',
    role: 'Cottages, Resorts & Hillside Stays',
    phone: '8220322008',
    phoneDisplay: '+91 82203 22008',
    phoneHref: 'tel:+918220322008',
    assignedServices: ['Stays', 'Cottages', 'Resorts', 'Food', 'General Concierge', 'Bookings'],
  },
  admin2: {
    id: 'admin2',
    name: 'Admin 2 (Rides & Logistics)',
    role: 'Jeep Safari, Mountain Cabs & Spices',
    phone: '7695850762',
    phoneDisplay: '+91 76958 50762',
    phoneHref: 'tel:+917695850762',
    assignedServices: ['Rides', 'Jeep Safari', 'Cabs', 'Transfers', 'Market', 'Honey & Spices'],
  },
};

/**
 * Predicts the customer's intent and automatically routes to the appropriate admin/phone
 * based on the clicked card, button text, and page location.
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

  // 1. Rides / Jeep Safari / Cabs -> Admin 2
  if (
    service.includes('ride') ||
    service.includes('jeep') ||
    service.includes('cab') ||
    service.includes('taxi') ||
    title.includes('jeep') ||
    title.includes('safari') ||
    title.includes('cab') ||
    title.includes('salem') ||
    title.includes('off-road') ||
    page.includes('/rides')
  ) {
    let purpose = 'Customer interested in 4x4 Off-Road Jeep Safari or Mountain Cab transfer';
    if (title.includes('jeep') || title.includes('safari') || title.includes('trail')) {
      purpose = `Booking inquiry for 4x4 Jeep Safari (${params.cardTitle || 'Mountain Circuit'})`;
    } else if (title.includes('cab') || title.includes('salem') || title.includes('station')) {
      purpose = `Cab booking / Salem Junction hill transfer inquiry (${params.cardTitle || 'Taxi Service'})`;
    }

    return {
      assignedAdmin: 'admin2',
      adminName: ADMINS.admin2.name,
      destinationPhone: ADMINS.admin2.phone,
      destinationPhoneDisplay: ADMINS.admin2.phoneDisplay,
      predictedPurpose: purpose,
      serviceCategory: 'Rides / Jeep & Cabs',
    };
  }

  // 2. Market / Spices / Honey -> Admin 2
  if (
    service.includes('market') ||
    service.includes('honey') ||
    service.includes('spice') ||
    service.includes('coffee') ||
    title.includes('honey') ||
    title.includes('pepper') ||
    page.includes('/market')
  ) {
    return {
      assignedAdmin: 'admin2',
      adminName: ADMINS.admin2.name,
      destinationPhone: ADMINS.admin2.phone,
      destinationPhoneDisplay: ADMINS.admin2.phoneDisplay,
      predictedPurpose: `Purchase inquiry for pure Shevaroy Hill honey & estate spices (${params.cardTitle || 'Farm Order'})`,
      serviceCategory: 'Market & Spices',
    };
  }

  // 3. Stays / Cottages / Resorts -> Admin 1
  if (
    service.includes('stay') ||
    service.includes('cottage') ||
    service.includes('resort') ||
    service.includes('villa') ||
    service.includes('suite') ||
    title.includes('cottage') ||
    title.includes('chalet') ||
    title.includes('suite') ||
    title.includes('villa') ||
    page.includes('/stays')
  ) {
    return {
      assignedAdmin: 'admin1',
      adminName: ADMINS.admin1.name,
      destinationPhone: ADMINS.admin1.phone,
      destinationPhoneDisplay: ADMINS.admin1.phoneDisplay,
      predictedPurpose: `Cottage booking & room inquiry for (${params.cardTitle || 'Hillside Stay'})`,
      serviceCategory: 'Stays & Cottages',
    };
  }

  // 4. Food & Mess -> Admin 1
  if (service.includes('food') || title.includes('mess') || title.includes('food') || page.includes('/food')) {
    return {
      assignedAdmin: 'admin1',
      adminName: ADMINS.admin1.name,
      destinationPhone: ADMINS.admin1.phone,
      destinationPhoneDisplay: ADMINS.admin1.phoneDisplay,
      predictedPurpose: `Cottage food delivery / authentic local meal inquiry (${params.cardTitle || 'Food Service'})`,
      serviceCategory: 'Food Delivery',
    };
  }

  // 5. Default / Homepage Hero / Sticky Mobile Bar -> Admin 1 (Primary Coordinator Line)
  return {
    assignedAdmin: 'admin1',
    adminName: ADMINS.admin1.name,
    destinationPhone: ADMINS.admin1.phone,
    destinationPhoneDisplay: ADMINS.admin1.phoneDisplay,
    predictedPurpose: `General hill station concierge & direct travel inquiry (${params.cardTitle || 'Direct Line'})`,
    serviceCategory: 'General Concierge',
  };
}
