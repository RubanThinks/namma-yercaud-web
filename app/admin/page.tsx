'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CallLog, ADMINS } from '@/lib/adminConfig';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import {
  Phone,
  PhoneCall,
  Clock,
  Search,
  Filter,
  Download,
  RefreshCw,
  LogOut,
  Lock,
  Mail,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function AdminDashboardPage() {
  // Pure Firebase Authentication States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Calls Data States
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAdminFilter, setSelectedAdminFilter] = useState<'all' | 'admin1' | 'admin2'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<'today' | 'all'>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [noteEditId, setNoteEditId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Listen directly to Firebase Auth state
  useEffect(() => {
    if (!auth) {
      setAuthChecking(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch calls function
  const fetchCalls = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/calls');
      const data = await res.json();
      if (data.success && data.calls) {
        setCalls(data.calls);
      }
    } catch (err) {
      console.error('Error fetching calls:', err);
    } finally {
      setLoading(false);
    }
  };

  // Real-time Firestore sync when authenticated
  useEffect(() => {
    if (!currentUser) return;

    fetchCalls();

    if (db) {
      try {
        const q = query(collection(db, 'call_leads'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const remoteCalls: CallLog[] = [];
          snapshot.forEach((doc) => {
            const d = doc.data();
            remoteCalls.push({
              id: doc.id,
              customerPhone: d.customerPhone,
              serviceCategory: d.serviceCategory,
              cardTitle: d.cardTitle,
              predictedPurpose: d.predictedPurpose,
              assignedAdmin: d.assignedAdmin,
              adminName: d.adminName,
              destinationPhone: d.destinationPhone,
              actionType: d.actionType || 'Direct Call',
              pageUrl: d.pageUrl,
              timestamp: d.timestamp || new Date().toISOString(),
              dateString: d.dateString || new Date().toISOString().split('T')[0],
              status: d.status || 'New',
              notes: d.notes || '',
            });
          });
          if (remoteCalls.length > 0) {
            setCalls(remoteCalls);
          }
        });
        return () => unsubscribe();
      } catch (e) {
        console.warn('Firestore live listener notice:', e);
      }
    }

    const interval = setInterval(fetchCalls, 15000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // Handle Firebase Login
  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setAuthError('Firebase Authentication is initializing. Please verify credentials.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      console.error('Firebase Auth error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setAuthError('Invalid email or password. Please verify your Firebase login credentials.');
      } else if (err.code === 'auth/too-many-requests') {
        setAuthError('Too many unsuccessful login attempts. Please try again later.');
      } else {
        setAuthError(err.message || 'Firebase login failed');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error('Error signing out:', err);
      }
    }
    setCurrentUser(null);
  };

  // Status and Notes update handler
  const handleUpdateStatus = async (callId: string, newStatus: CallLog['status']) => {
    setCalls((prev) =>
      prev.map((c) => (c.id === callId ? { ...c, status: newStatus } : c))
    );

    try {
      await fetch('/api/calls', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: callId, status: newStatus }),
      });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleSaveNote = async (callId: string) => {
    setCalls((prev) =>
      prev.map((c) => (c.id === callId ? { ...c, notes: noteText } : c))
    );
    setNoteEditId(null);

    try {
      await fetch('/api/calls', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: callId, notes: noteText }),
      });
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Call ID',
      'Customer Phone',
      'Action Taken',
      'Assigned Partner',
      'Routed Phone',
      'Service Category',
      'Clicked Card',
      'Predicted Purpose',
      'Page URL',
      'Date & Time',
      'Status',
      'Notes',
    ];

    const rows = filteredCalls.map((c) => [
      `"${c.id}"`,
      `"${c.customerPhone}"`,
      `"${c.actionType || 'Direct Call'}"`,
      `"${c.assignedAdmin === 'admin1' ? 'Admin 1 (76958 50762)' : 'Admin 2 (82203 22008)'}"`,
      `"${c.destinationPhone}"`,
      `"${c.serviceCategory}"`,
      `"${c.cardTitle.replace(/"/g, '""')}"`,
      `"${c.predictedPurpose.replace(/"/g, '""')}"`,
      `"${c.pageUrl}"`,
      `"${new Date(c.timestamp).toLocaleString()}"`,
      `"${c.status}"`,
      `"${(c.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `namma_yercaud_calls_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics Calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCalls = calls.filter((c) => c.dateString === todayStr);

  const stats = {
    totalToday: todayCalls.length,
    admin1Today: todayCalls.filter((c) => c.assignedAdmin === 'admin1').length,
    admin2Today: todayCalls.filter((c) => c.assignedAdmin === 'admin2').length,
    directCallsToday: todayCalls.filter((c) => c.actionType !== 'Callback Request').length,
    callbacksToday: todayCalls.filter((c) => c.actionType === 'Callback Request').length,
    pendingToday: todayCalls.filter((c) => c.status === 'New').length,
    totalAllTime: calls.length,
  };

  // Filtered list
  const filteredCalls = calls.filter((c) => {
    if (selectedAdminFilter !== 'all' && c.assignedAdmin !== selectedAdminFilter) {
      return false;
    }
    if (timeFilter === 'today' && c.dateString !== todayStr) {
      return false;
    }
    if (statusFilter !== 'all' && c.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchPhone = c.customerPhone.includes(q);
      const matchPurpose = c.predictedPurpose.toLowerCase().includes(q);
      const matchCard = c.cardTitle.toLowerCase().includes(q);
      if (!matchPhone && !matchPurpose && !matchCard) return false;
    }
    return true;
  });

  // -------------------------------------------------------------
  // LOADING STATE
  // -------------------------------------------------------------
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#121826] flex items-center justify-center p-4">
        <div className="text-center text-white space-y-3">
          <div className="w-10 h-10 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-black uppercase tracking-wider text-neutral-300">
            Checking Firebase Authentication...
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FIREBASE LOGIN SCREEN
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#121826] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border-4 border-black">
          
          <div className="text-center mb-6">
            <div className="bg-white p-2.5 rounded-2xl border-2 border-brand-yellow shadow-[3px_3px_0px_#000000] inline-block mb-3">
              <Image
                src="/images/logo.png"
                alt="Namma Yercaud"
                width={150}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-black text-black uppercase tracking-tight">
              Partner Admin Portal
            </h1>
            <p className="text-xs text-neutral-600 font-semibold mt-1">
              Sign in with your Firebase Admin Account
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 bg-red-100 border-2 border-red-500 rounded-2xl text-xs font-bold text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleFirebaseLogin} className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase text-neutral-800 block mb-1">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nammayercaud.com"
                  className="w-full pl-10 pr-4 py-3 text-sm font-bold bg-neutral-50 border-2 border-black rounded-2xl shadow-[2px_2px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  required
                  autoFocus
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase text-neutral-800 block mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 text-sm font-bold bg-neutral-50 border-2 border-black rounded-2xl shadow-[2px_2px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  required
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 btn-solid-yellow rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all hover:scale-[1.01]"
            >
              {authLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In with Firebase</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-neutral-500 font-semibold text-center mt-6">
            🔒 Protected by Firebase Authentication &bull; Namma Yercaud Partner Portal
          </p>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED SHARED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#121826] pb-24">
      
      {/* Top Bar */}
      <header className="bg-[#1A233A] text-white border-b-4 border-black sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl border-2 border-brand-yellow shadow-[2px_2px_0px_#000000]">
              <Image
                src="/images/logo.png"
                alt="Namma Yercaud"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                  Owner Transparency Dashboard
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Firebase Auth Connected
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 font-medium">
                Admin 1 (Rides/Spices/2 Stays: <strong>76958 50762</strong>) &bull; Admin 2 (Honey/Food/2 Stays: <strong>82203 22008</strong>)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchCalls}
              disabled={loading}
              className="p-2 sm:px-3 sm:py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-2 border-neutral-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              title="Refresh Calls"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="p-2 sm:px-3 sm:py-2 bg-brand-yellow hover:bg-yellow-400 text-black border-2 border-black rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000000] transition-all"
              title="Download CSV"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-2 bg-red-600 hover:bg-red-700 text-white border-2 border-black rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000000] transition-all"
              title={`Logged in as ${currentUser.email}. Click to log out.`}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          
          {/* Total Inquiries Today */}
          <div className="bg-white p-5 rounded-3xl border-3 border-black shadow-[4px_4px_0px_#000000]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
                Today&apos;s Total Inquiries
              </span>
              <div className="w-9 h-9 rounded-xl bg-brand-yellow border-2 border-black flex items-center justify-center">
                <PhoneCall className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-black mt-2">
              {stats.totalToday}
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-600 font-bold mt-2">
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                📞 {stats.directCallsToday} Calls
              </span>
              <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-300">
                ⏱️ {stats.callbacksToday} Callbacks
              </span>
            </div>
          </div>

          {/* Admin 1 (76958 50762) */}
          <div className="bg-white p-5 rounded-3xl border-3 border-black shadow-[4px_4px_0px_#000000]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                Admin 1 (Rides, Spices &amp; 2 Stays)
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-100 border-2 border-blue-900 flex items-center justify-center">
                <Layers className="w-4 h-4 text-blue-900 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-black mt-2">
              {stats.admin1Today}
            </div>
            <div className="text-xs font-bold text-neutral-700 mt-2">
              Phone: <strong>+91 76958 50762</strong>
            </div>
          </div>

          {/* Admin 2 (82203 22008) */}
          <div className="bg-white p-5 rounded-3xl border-3 border-black shadow-[4px_4px_0px_#000000]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                Admin 2 (Honey, Food &amp; 2 Stays)
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 border-2 border-amber-900 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-900 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-black mt-2">
              {stats.admin2Today}
            </div>
            <div className="text-xs font-bold text-neutral-700 mt-2">
              Phone: <strong>+91 82203 22008</strong>
            </div>
          </div>

          {/* Pending Follow-Ups */}
          <div className="bg-white p-5 rounded-3xl border-3 border-black shadow-[4px_4px_0px_#000000]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-red-600">
                Pending Follow-Ups
              </span>
              <div className="w-9 h-9 rounded-xl bg-red-100 border-2 border-red-900 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-900 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-red-600 mt-2">
              {stats.pendingToday}
            </div>
            <div className="text-xs font-bold text-neutral-600 mt-2">
              Needs partner attendance
            </div>
          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border-3 border-black shadow-[4px_4px_0px_#000000] mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Admin Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-neutral-600 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Partner:
              </span>
              {[
                { id: 'all', label: 'All Partners' },
                { id: 'admin1', label: 'Admin 1 (Rides/Spices - 76958)' },
                { id: 'admin2', label: 'Admin 2 (Honey/Food - 82203)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedAdminFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
                    selectedAdminFilter === tab.id
                      ? 'bg-[#1A233A] text-white border-black shadow-[2px_2px_0px_#000000]'
                      : 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-neutral-600 mr-1">Time:</span>
              <button
                onClick={() => setTimeFilter('today')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 ${
                  timeFilter === 'today'
                    ? 'btn-solid-yellow shadow-[2px_2px_0px_#000000]'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                }`}
              >
                Today Only
              </button>
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 ${
                  timeFilter === 'all'
                    ? 'btn-solid-yellow shadow-[2px_2px_0px_#000000]'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                }`}
              >
                All Time History
              </button>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t-2 border-neutral-100">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer mobile, card name, or purpose..."
                className="w-full pl-9 pr-4 py-2 text-xs font-bold bg-neutral-50 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>

            {/* Status Dropdown Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-600">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs font-black bg-neutral-100 border-2 border-black rounded-xl focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="New">🟡 New / Pending</option>
                <option value="Called Back">🟢 Called Back</option>
                <option value="Converted">⭐ Converted / Booked</option>
                <option value="No Answer">⚪ No Answer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calls List / Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-black uppercase text-black flex items-center gap-2">
              <span>Customer Inquiries Feed</span>
              <span className="text-xs font-black bg-neutral-200 px-2.5 py-0.5 rounded-full border border-neutral-400">
                {filteredCalls.length} logs
              </span>
            </h2>
            <span className="text-xs text-neutral-500 font-semibold">
              Live Click Sensors &bull; 1-Click Call Back
            </span>
          </div>

          {filteredCalls.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-3 border-black shadow-[4px_4px_0px_#000000]">
              <Phone className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-lg font-black text-neutral-800">No inquiry logs found</h3>
              <p className="text-xs text-neutral-500 font-medium mt-1">
                No customer calls match your selected filter criteria.
              </p>
            </div>
          ) : (
            filteredCalls.map((call) => {
              const isAdmin1 = call.assignedAdmin === 'admin1';
              const isToday = call.dateString === todayStr;
              const isCallback = call.actionType === 'Callback Request';

              return (
                <div
                  key={call.id}
                  className={`bg-white rounded-3xl p-5 sm:p-6 border-3 border-black shadow-[4px_4px_0px_#000000] transition-all hover:translate-x-1 ${
                    call.status === 'New' ? 'border-l-8 border-l-brand-yellow' : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left: Customer Info & Timing */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {/* Action Type Badge: Direct Call vs Callback */}
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                            isCallback
                              ? 'bg-purple-100 text-purple-900 border-purple-400'
                              : 'bg-emerald-100 text-emerald-900 border-emerald-400'
                          }`}
                        >
                          {isCallback ? '⏱️ Callback Request' : '📞 Direct Call'}
                        </span>

                        {/* Routed Partner Badge */}
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                            isAdmin1
                              ? 'bg-blue-100 text-blue-900 border-blue-400'
                              : 'bg-amber-100 text-amber-900 border-amber-400'
                          }`}
                        >
                          {isAdmin1 ? 'Admin 1 (76958 50762)' : 'Admin 2 (82203 22008)'}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                            call.status === 'New'
                              ? 'bg-yellow-100 text-yellow-900 border-yellow-400'
                              : call.status === 'Called Back'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                              : call.status === 'Converted'
                              ? 'bg-purple-100 text-purple-900 border-purple-400'
                              : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                          }`}
                        >
                          {call.status}
                        </span>

                        {/* Timestamp */}
                        <span className="text-[11px] font-bold text-neutral-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(call.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {' '}&bull;{' '}
                          {isToday ? 'Today' : new Date(call.timestamp).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Customer Phone Header */}
                      <div className="flex items-center gap-3">
                        <div className="text-xl sm:text-2xl font-black text-black tracking-wide font-mono">
                          +91 {call.customerPhone}
                        </div>
                      </div>

                      {/* Sensor & Predicted Purpose Box */}
                      <div className="mt-3 bg-[#FAF6EE] p-3 rounded-2xl border-2 border-neutral-300 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-black text-neutral-700">
                          <span className="text-brand-orange font-black">📍 Click Sensor Location:</span>
                          <span className="text-black bg-white px-2 py-0.5 rounded border border-neutral-300 font-bold">
                            {call.cardTitle}
                          </span>
                          <span className="text-neutral-500 text-[11px]">({call.pageUrl})</span>
                        </div>

                        <div className="flex items-start gap-1.5 text-xs text-neutral-900 font-medium">
                          <span className="font-black text-emerald-700 shrink-0">🎯 Predicted Purpose:</span>
                          <span className="font-bold text-neutral-800">{call.predictedPurpose}</span>
                        </div>
                      </div>

                      {/* Notes Section */}
                      {call.notes && noteEditId !== call.id && (
                        <div className="mt-2 text-xs text-neutral-600 bg-neutral-50 p-2 rounded-xl border border-neutral-200">
                          <strong>Partner Note:</strong> {call.notes}
                        </div>
                      )}

                      {noteEditId === call.id ? (
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add note (e.g., Quoted ₹3000 for 4 pax)..."
                            className="flex-1 px-3 py-1.5 text-xs font-bold border-2 border-black rounded-xl"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveNote(call.id)}
                            className="px-3 py-1.5 bg-black text-white text-xs font-black rounded-xl"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setNoteEditId(null)}
                            className="px-2 py-1.5 text-xs text-neutral-500 font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setNoteEditId(call.id); setNoteText(call.notes || ''); }}
                          className="mt-2 text-[11px] text-neutral-500 hover:text-black font-bold underline"
                        >
                          {call.notes ? 'Edit Note' : '+ Add Note'}
                        </button>
                      )}

                    </div>

                    {/* Right: Quick Action Buttons for Partners */}
                    <div className="flex flex-row lg:flex-col items-center gap-2 shrink-0 pt-3 lg:pt-0 border-t-2 lg:border-t-0 border-neutral-200">
                      
                      {/* Call Customer Back */}
                      <a
                        href={`tel:+91${call.customerPhone}`}
                        onClick={() => handleUpdateStatus(call.id, 'Called Back')}
                        className="flex-1 lg:w-48 py-2.5 px-3 rounded-xl btn-solid-yellow text-xs font-black flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000000] uppercase tracking-wide hover:scale-105 transition-all text-center"
                      >
                        <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Call Customer</span>
                      </a>

                      {/* WhatsApp Customer */}
                      <a
                        href={`https://wa.me/91${call.customerPhone}?text=${encodeURIComponent(
                          `Hi, this is Namma Yercaud coordinator following up regarding your inquiry for ${call.cardTitle}. How may we assist you today?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 lg:w-48 py-2.5 px-3 rounded-xl btn-solid-whatsapp text-xs font-black flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000000] uppercase tracking-wide hover:scale-105 transition-all text-center"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp Lead</span>
                      </a>

                      {/* Status Toggle Quick Buttons */}
                      <div className="hidden sm:flex items-center gap-1 mt-1">
                        {(['New', 'Called Back', 'Converted', 'No Answer'] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => handleUpdateStatus(call.id, s)}
                            className={`px-2 py-1 text-[10px] font-black rounded-lg border transition-all ${
                              call.status === s
                                ? 'bg-black text-white border-black'
                                : 'bg-neutral-100 text-neutral-600 border-neutral-300 hover:bg-neutral-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </main>

    </div>
  );
}
