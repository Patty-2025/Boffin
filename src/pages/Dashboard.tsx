import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, Clock3, FileText, Headphones, MessageSquare, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, doc, onSnapshot, query, where } from '../lib/realtimeFirestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';

type ClientOrder = {
  id: string;
  topic?: string;
  paperType?: string;
  serviceType?: string;
  pages?: number;
  deadline?: string;
  deadlineDate?: string;
  totalCost?: number;
  status?: string;
  paymentStatus?: string;
  paidAt?: any;
  solutionOffered?: boolean;
  solutionDelivered?: boolean;
  deliveredAt?: any;
  deliveryUrl?: string;
};

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  in_progress: 'In progress',
  pending: 'Pending',
  paid: 'In progress',
  cancelled: 'Cancelled'
};

const hasSolution = (order: ClientOrder) => Boolean(order.solutionOffered || order.solutionDelivered || order.deliveredAt || order.deliveryUrl || order.status === 'completed');
const displayStatus = (order: ClientOrder) => !hasSolution(order) && (order.status === 'paid' || order.status === 'in_progress' || order.paymentStatus === 'paid' || order.paidAt) ? 'in_progress' : order.status || '';

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [balance, setBalance] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderPage, setOrderPage] = useState(1);

  useEffect(() => {
    if (!user) return;
    let loadedSources = 0;
    const markLoaded = () => { loadedSources += 1; if (loadedSources >= 2) setLoading(false); };
    const ordersUnsubscribe = onSnapshot(query(collection(db, 'orders'), where('userId', '==', user.uid)), (snapshot) => {
      setOrders(snapshot.docs.map((document: any) => ({ id: document.id, ...document.data() })));
      markLoaded();
    }, () => setLoading(false));
    const profileUnsubscribe = onSnapshot(doc(db, 'studentProfiles', user.uid), (profileSnapshot) => {
      if (profileSnapshot.exists()) {
        const profile = profileSnapshot.data();
        setBalance(Number(profile.balance) || 0);
        setLoyaltyPoints(Number(profile.loyaltyPoints) || 0);
      }
      markLoaded();
    }, () => setLoading(false));
    return () => { ordersUnsubscribe(); profileUnsubscribe(); };
  }, [user]);

  const activeOrders = orders.filter((order) => displayStatus(order) !== 'completed' && displayStatus(order) !== 'cancelled');
  const completedOrders = orders.filter((order) => order.status === 'completed');
  const ordersPerPage = 10;
  const totalOrderPages = Math.max(1, Math.ceil(orders.length / ordersPerPage));
  const visibleOrders = orders.slice((orderPage - 1) * ordersPerPage, orderPage * ordersPerPage);
  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 animate-in fade-in duration-500">
      <section className="grid gap-3 border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Client summary">
        <SummaryCard label="Active orders" value={loading ? '...' : String(activeOrders.length)} icon={<Clock3 size={20} />} tone="text-[#0080d1]" />
        <SummaryCard label="Completed solutions" value={loading ? '...' : String(completedOrders.length)} icon={<CheckCircle2 size={20} />} tone="text-emerald-600" />
        <SummaryCard label="Wallet balance" value={`$${balance.toFixed(2)}`} icon={<Wallet size={20} />} tone="text-amber-600" />
        <SummaryCard label="Loyalty points" value={String(loyaltyPoints)} icon={<Award size={20} />} tone="text-[#13bdb0]" />
      </section>

      <section className="-mt-2 grid gap-3 xl:grid-cols-[minmax(0,1fr)_calc((100%-36px)/4)]">
        <div className="border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5"><div><h2 className="flex items-center gap-2 text-lg font-black text-slate-900"><FileText size={20} className="text-[#0080d1]" /> Recent orders</h2><p className="mt-1 text-xs text-slate-500">Your latest order activity appears here.</p></div><Link to="/portal/track" className="text-xs font-bold text-[#0080d1] hover:underline">View all orders</Link></div>
          {loading ? <p className="p-8 text-center text-sm text-slate-500">Loading your orders...</p> : orders.length === 0 ? <div className="p-8 text-center"><p className="text-sm font-bold text-slate-700">No orders yet</p><Link to="/portal/place-order" className="mt-4 inline-flex bg-[#0080d1] px-4 py-2 text-sm font-bold text-white">Start your first order</Link></div> : <><div className="overflow-x-auto"><div className="min-w-[900px]"><div className="grid grid-cols-[0.35fr_1.1fr_1.5fr_1.2fr_0.5fr_1fr_1fr_0.8fr] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500"><span>#</span><span>Order ID</span><span>Topic</span><span>Service</span><span>Pages</span><span>Deadline</span><span>Status</span><span>Total</span></div><div className="divide-y divide-slate-100">{visibleOrders.map((order, index) => <div key={order.id} className="grid grid-cols-[0.35fr_1.1fr_1.5fr_1.2fr_0.5fr_1fr_1fr_0.8fr] items-center gap-3 px-4 py-4 text-sm"><span className="text-xs text-slate-400">{(orderPage - 1) * ordersPerPage + index + 1}</span><Link to={`/portal/track?orderId=${encodeURIComponent(order.id)}`} className="font-mono text-[10px] font-bold text-[#0080d1] hover:underline">#{order.id.slice(-8).toUpperCase()}</Link><span className="truncate font-medium text-slate-800">{order.topic || order.paperType || 'Untitled order'}</span><span className="truncate text-xs text-slate-600">{order.serviceType || order.paperType || '-'}</span><span className="text-slate-600">{order.pages || '-'}</span><span className="text-xs text-slate-600">{formatDeadline(order.deadlineDate || order.deadline)}</span><span className="inline-flex w-fit items-center gap-1 bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-600">{order.status === 'completed' ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}{statusLabels[order.status || ''] || 'Processing'}</span><span className="text-xs font-semibold text-slate-700">{typeof order.totalCost === 'number' ? `$${order.totalCost.toFixed(2)}` : '-'}</span></div>)}</div></div></div><div className="flex items-center justify-between border-t border-slate-200 px-4 py-3"><span className="text-xs text-slate-500">Showing {(orderPage - 1) * ordersPerPage + 1}-{Math.min(orderPage * ordersPerPage, orders.length)} of {orders.length} orders</span><div className="flex items-center gap-2"><button type="button" disabled={orderPage === 1} onClick={() => setOrderPage((page) => Math.max(1, page - 1))} className="border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Previous</button><span className="text-xs text-slate-500">Page {orderPage} of {totalOrderPages}</span><button type="button" disabled={orderPage === totalOrderPages} onClick={() => setOrderPage((page) => Math.min(totalOrderPages, page + 1))} className="border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Next</button></div></div></>}
        </div>

        <div className="border border-slate-200 bg-white p-5"><h2 className="text-lg font-black text-slate-900">Quicklinks</h2><div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1"><PortalShortcut to="/portal/track" icon={<FileText size={24} />} label="Track your order" /><PortalShortcut to="/portal/completed" icon={<CheckCircle2 size={24} />} label="Completed solutions" /><PortalShortcut to="/portal/finances" icon={<Wallet size={24} />} label="Balance and finances" /><PortalShortcut to="/portal/loyalty" icon={<Award size={24} />} label="Loyalty points" /><PortalShortcut to="/contact-us" icon={<Headphones size={24} />} label="Contact support" /></div></div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, icon, tone }: { label: string; value: string; icon: React.ReactNode; tone: string }) {
  return <div className="flex items-center gap-3 border border-slate-200 bg-white px-4 py-3.5 shadow-sm"><div className={`flex h-10 w-10 shrink-0 items-center justify-center bg-slate-50 ${tone}`}>{icon}</div><div className="min-w-0"><p className="truncate text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-0.5 text-xl font-black leading-tight text-slate-900">{value}</p></div></div>;
}

function PortalShortcut({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return <Link to={to} className="flex items-center gap-3 border border-slate-200 px-3 py-3 text-sm font-normal text-slate-700 transition hover:border-[#0080d1] hover:text-[#0080d1]">{icon}{label}</Link>;
}

function formatDeadline(value?: string) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}
