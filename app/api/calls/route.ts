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
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const initial: CallLog[] = [
        {
          id: 'call_init_1',
          customerPhone: '9840123456',
          serviceCategory: 'Rides / Jeep, Auto & Cabs',
          cardTitle: '4x4 Kolli Hills Extreme Jeep Safari',
          predictedPurpose: 'Booking inquiry for 4x4 Jeep Safari (4x4 Kolli Hills Extreme Jeep Safari)',
          assignedAdmin: 'admin1',
          adminName: 'Admin 1 (Rides, Spices & 2 Stays)',
          destinationPhone: '7695850762',
          actionType: 'Direct Call',
          pageUrl: '/rides',
          timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
          dateString: todayStr,
          status: 'New',
          notes: 'Customer dialed for 4x4 mountain trail ride',
        },
        {
          id: 'call_init_2',
          customerPhone: '9443567890',
          serviceCategory: 'Stays (Admin 1 Line)',
          cardTitle: 'Shevaroy Valley View Chalet',
          predictedPurpose: 'Stay booking inquiry for Shevaroy Valley View Chalet',
          assignedAdmin: 'admin1',
          adminName: 'Admin 1 (Rides, Spices & 2 Stays)',
          destinationPhone: '7695850762',
          actionType: 'Direct Call',
          pageUrl: '/stays',
          timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
          dateString: todayStr,
          status: 'Called Back',
          notes: 'Customer requested 4-bed private chalet pricing',
        },
        {
          id: 'call_init_3',
          customerPhone: '9940876543',
          serviceCategory: 'Honey (Admin 2)',
          cardTitle: 'Shevaroy Pure Wild Rock Honey',
          predictedPurpose: 'Purchase inquiry for pure Shevaroy Wild Forest Honey',
          assignedAdmin: 'admin2',
          adminName: 'Admin 2 (Honey, Food & 2 Stays)',
          destinationPhone: '8220322008',
          actionType: 'Callback Request',
          pageUrl: '/market',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          dateString: todayStr,
          status: 'Converted',
          notes: 'Callback requested. Ordered 2kg honey + breakfast',
        },
        {
          id: 'call_init_4',
          customerPhone: '9789012345',
          serviceCategory: 'Stays (Admin 2 Line)',
          cardTitle: 'Tipperary Romantic Sunset Suite',
          predictedPurpose: 'Stay booking inquiry for Tipperary Romantic Sunset Suite',
          assignedAdmin: 'admin2',
          adminName: 'Admin 2 (Honey, Food & 2 Stays)',
          destinationPhone: '8220322008',
          actionType: 'Direct Call',
          pageUrl: '/stays',
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          dateString: todayStr,
          status: 'New',
          notes: 'Couples suite inquiry for weekend',
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
    calls.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCalls = calls.filter((c) => c.dateString === todayStr);

    const stats = {
      totalAllTime: calls.length,
      totalToday: todayCalls.length,
      admin1Today: todayCalls.filter((c) => c.assignedAdmin === 'admin1').length,
      admin2Today: todayCalls.filter((c) => c.assignedAdmin === 'admin2').length,
      directCallsToday: todayCalls.filter((c) => c.actionType !== 'Callback Request').length,
      callbackRequestsToday: todayCalls.filter((c) => c.actionType === 'Callback Request').length,
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
    const {
      customerPhone,
      serviceCategory,
      cardTitle,
      predictedPurpose,
      assignedAdmin,
      adminName,
      destinationPhone,
      actionType,
      pageUrl,
    } = body;

    if (!customerPhone || !/^[6-9]\d{9}$/.test(customerPhone.replace(/\D/g, ''))) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit mobile number required' }, { status: 400 });
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    const now = new Date();
    const newLog: CallLog = {
      id: `call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      customerPhone: cleanPhone,
      serviceCategory: serviceCategory || 'General Concierge',
      cardTitle: cardTitle || 'Direct Line',
      predictedPurpose: predictedPurpose || 'General Trip & Tourism Inquiry',
      assignedAdmin: assignedAdmin || 'admin1',
      adminName: adminName || (assignedAdmin === 'admin2' ? 'Admin 2 (Honey, Food & 2 Stays)' : 'Admin 1 (Rides, Spices & 2 Stays)'),
      destinationPhone: destinationPhone || (assignedAdmin === 'admin2' ? '8220322008' : '7695850762'),
      actionType: actionType === 'Callback Request' ? 'Callback Request' : 'Direct Call',
      pageUrl: pageUrl || '/',
      timestamp: now.toISOString(),
      dateString: now.toISOString().split('T')[0],
      status: 'New',
      notes: actionType === 'Callback Request' ? 'Customer requested a callback' : 'Customer initiated direct call',
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
