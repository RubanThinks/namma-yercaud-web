import { NextRequest, NextResponse } from 'next/server';
import { CallLog } from '@/lib/adminConfig';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'calls_db.json');

// Helper to ensure file exists and read data
function getLocalCalls(): CallLog[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      // Seed with initial realistic demo records so dashboard has immediate data
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const initial: CallLog[] = [
        {
          id: 'call_init_1',
          customerPhone: '9840123456',
          serviceCategory: 'Rides / Jeep & Cabs',
          cardTitle: '4x4 Kolli Hills Extreme Jeep Safari',
          predictedPurpose: 'Booking inquiry for 4x4 Jeep Safari (4x4 Kolli Hills Extreme Jeep Safari)',
          assignedAdmin: 'admin2',
          adminName: 'Admin 2 (Rides & Logistics)',
          destinationPhone: '7695850762',
          pageUrl: '/rides',
          timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          dateString: todayStr,
          status: 'New',
          notes: 'Clicked Jeep card from mobile',
        },
        {
          id: 'call_init_2',
          customerPhone: '9443567890',
          serviceCategory: 'Stays & Cottages',
          cardTitle: 'Panoramic Valley View Cottage',
          predictedPurpose: 'Cottage booking & room inquiry for (Panoramic Valley View Cottage)',
          assignedAdmin: 'admin1',
          adminName: 'Admin 1 (Stays & Concierge)',
          destinationPhone: '8220322008',
          pageUrl: '/stays',
          timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
          dateString: todayStr,
          status: 'Called Back',
          notes: 'Customer asked for Saturday night check-in for 4 guests',
        },
        {
          id: 'call_init_3',
          customerPhone: '9940876543',
          serviceCategory: 'Market & Spices',
          cardTitle: 'Raw Shevaroy Wild Forest Honey',
          predictedPurpose: 'Purchase inquiry for pure Shevaroy Hill honey & estate spices (Raw Shevaroy Wild Forest Honey)',
          assignedAdmin: 'admin2',
          adminName: 'Admin 2 (Rides & Logistics)',
          destinationPhone: '7695850762',
          pageUrl: '/market',
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          dateString: todayStr,
          status: 'Converted',
          notes: 'Order confirmed for 3kg forest honey',
        },
      ];
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading calls DB:', err);
    return [];
  }
}

function saveLocalCalls(calls: CallLog[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(calls, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving calls DB:', err);
  }
}

export async function GET(req: NextRequest) {
  try {
    const calls = getLocalCalls();
    // Sort newest first
    calls.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCalls = calls.filter((c) => c.dateString === todayStr);

    const stats = {
      totalAllTime: calls.length,
      totalToday: todayCalls.length,
      admin1Today: todayCalls.filter((c) => c.assignedAdmin === 'admin1').length,
      admin2Today: todayCalls.filter((c) => c.assignedAdmin === 'admin2').length,
      pendingToday: todayCalls.filter((c) => c.status === 'New').length,
      admin1AllTime: calls.filter((c) => c.assignedAdmin === 'admin1').length,
      admin2AllTime: calls.filter((c) => c.assignedAdmin === 'admin2').length,
    };

    return NextResponse.json({ success: true, stats, calls });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerPhone, serviceCategory, cardTitle, predictedPurpose, assignedAdmin, adminName, destinationPhone, pageUrl } = body;

    if (!customerPhone || !/^[6-9]\d{9}$/.test(customerPhone.replace(/\D/g, ''))) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit mobile number required' }, { status: 400 });
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    const now = new Date();
    const newLog: CallLog = {
      id: `call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      customerPhone: cleanPhone,
      serviceCategory: serviceCategory || 'General Concierge',
      cardTitle: cardTitle || 'Direct Call Line',
      predictedPurpose: predictedPurpose || 'General Trip & Tourism Inquiry',
      assignedAdmin: assignedAdmin || 'admin1',
      adminName: adminName || (assignedAdmin === 'admin2' ? 'Admin 2 (Rides & Logistics)' : 'Admin 1 (Stays & Concierge)'),
      destinationPhone: destinationPhone || '8220322008',
      pageUrl: pageUrl || '/',
      timestamp: now.toISOString(),
      dateString: now.toISOString().split('T')[0],
      status: 'New',
      notes: '',
    };

    const calls = getLocalCalls();
    calls.unshift(newLog);
    saveLocalCalls(calls);

    return NextResponse.json({ success: true, call: newLog });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing call id' }, { status: 400 });
    }

    const calls = getLocalCalls();
    const index = calls.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Call record not found' }, { status: 404 });
    }

    if (status) calls[index].status = status;
    if (typeof notes === 'string') calls[index].notes = notes;

    saveLocalCalls(calls);

    return NextResponse.json({ success: true, call: calls[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
