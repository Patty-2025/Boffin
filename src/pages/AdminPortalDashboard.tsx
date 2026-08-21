import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2, Clock3, FileText, MessageSquare, RotateCcw, ShieldCheck, Users, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, doc, onSnapshot, updateDoc } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';
import writersData from '../data/topWriters.json';

type AdminOrder = { id: string; userId?: string; email?: string; topic?: string; subject?: string; taskType?: string; status?: string; paymentStatus?: string; paidAt?: any; solutionOffered?: boolean; solutionDelivered?: boolean; deliveredAt?: any; deliveryUrl?: string; totalCost?: number; writerId?: string | number | null; writerName?: string | null; revisionRequested?: boolean; requiresRevision?: boolean; revisionRequired?: boolean; revisionStatus?: string; createdAt?: any };
type DashboardRecord = { id: string; data: () => Record<string, any> };

const statusLabels: Record<string, string> = { pending: 'Pending', paid: 'Paid', in_progress: 'In progress', completed: 'Completed', cancelled: 'Cancelled' };
const formatCurrency = (value: number) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const hasSolution = (order: AdminOrder) => Boolean(order.solutionOffered || order.solutionDelivered || order.deliveredAt || order.deliveryUrl || order.status === 'completed');
const isInProgress = (order: AdminOrder) => !hasSolution(order) && (order.status === 'paid' || order.status === 'in_progress' || order.paymentStatus === 'paid' || order.paidAt);
const isRevisionRequested = (order: AdminOrder) => Boolean(order.revisionRequested || order.requiresRevision || order.revisionRequired || order.revisionStatus === 'requested' || order.status === 'revision_requested');
const isUnderRevision = (order: AdminOrder) => Boolean(order.revisionStatus === 'in_progress' || order.status === 'revision' || order.status === 'revision_in_progress');

export default function AdminPortalDashboard() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [students, setStudents] = useState(0);
  const [activeChats, setActiveChats] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let loadedSources = 0;
    const markLoaded = () => { loadedSources += 1; if (loadedSources >= 3) setLoading(false); };
    const handleError = () => { setLoading(false); };
    const ordersUnsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      setOrders((snapshot.docs as DashboardRecord[]).map((order) => ({ id: order.id, ...order.data() })).sort((first, second) => new Date(second.createdAt || 0).getTime() - new Date(first.createdAt || 0).getTime()));
      markLoaded();
    }, handleError);
    const studentsUnsubscribe = onSnapshot(collection(db, 'studentProfiles'), (snapshot) => { setStudents(snapshot.size); markLoaded(); }, handleError);
    const chatsUnsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => { setActiveChats((snapshot.docs as DashboardRecord[]).filter((chat) => chat.data().status === 'active').length); markLoaded(); }, handleError);
    return () => { ordersUnsubscribe(); studentsUnsubscribe(); chatsUnsubscribe(); };
  }, []);

  const activeOrders = orders.filter((order) => order.status !== 'completed' && order.status !== 'cancelled');
  const inProgressOrders = orders.filter(isInProgress);
  const completedOrders = orders.filter((order) => order.status === 'completed');
  const pendingOrders = orders.filter((order) => order.status === 'pending');
  const paidValue = orders.filter((order) => order.status === 'paid' || order.status === 'in_progress' || order.status === 'completed').reduce((total, order) => total + (Number(order.totalCost) || 0), 0);

  const assignWriter = async (order: AdminOrder, writerId: string) => {
    const writer = writersData.find((candidate) => String(candidate.id) === writerId);
    if (!writer) return;
    await updateDoc(doc(db, 'orders', order.id), { writerId: writer.id, writerName: writer.name, writerPayout: (Number(order.totalCost) || 0) * 0.3, writerPayoutRate: 0.3, assignedByAdmin: true, status: order.status === 'paid' ? 'in_progress' : order.status });
    setMessage(`${writer.name} assigned to order #${order.id.slice(-8).toUpperCase()}.`);
  };

  const updateStatus = async (order: AdminOrder, status: string) => {
    await updateDoc(doc(db, 'orders', order.id), { status, updatedAt: new Date().toISOString() });
    setMessage(`Order #${order.id.slice(-8).toUpperCase()} updated.`);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4">
      {message && <p className="border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">{message}</p>}
      <section className="grid gap-3 border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" aria-label="Admin summary">
        <SummaryCard label="Active orders" value={loading ? '...' : String(activeOrders.length)} icon={<Clock3 size={20} />} />
        <SummaryCard label="In progress" value={loading ? '...' : String(inProgressOrders.length)} icon={<Activity size={20} />} />
        <SummaryCard label="Completed solutions" value={loading ? '...' : String(completedOrders.length)} icon={<CheckCircle2 size={20} />} />
        <SummaryCard label="Revision requests" value={loading ? '...' : String(orders.filter(isRevisionRequested).length)} icon={<RotateCcw size={20} />} />
        <SummaryCard label="Under revision" value={loading ? '...' : String(orders.filter(isUnderRevision).length)} icon={<RotateCcw size={20} />} />
        <SummaryCard label="Students" value={loading ? '...' : String(students)} icon={<Users size={20} />} />
        <SummaryCard label="Active chats" value={loading ? '...' : String(activeChats)} icon={<MessageSquare size={20} />} />
      </section>

      <section className="-mt-2 grid gap-3 xl:grid-cols-[minmax(0,1fr)_calc((100%-36px)/4)]">
        <div className="border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5"><div><h2 className="flex items-center gap-2 text-lg font-black text-slate-900"><FileText size={20} /> Recent orders</h2><p className="mt-1 text-xs text-slate-500">Manage the latest student orders from the live database.</p></div><span className="text-xs font-semibold text-slate-500">{orders.length} total orders</span></div>
          {loading ? <p className="p-8 text-center text-sm text-slate-500">Loading live orders...</p> : orders.length === 0 ? <div className="p-8 text-center text-sm text-slate-500">No orders found in the database.</div> : <div className="overflow-x-auto"><div className="min-w-[850px]"><div className="grid grid-cols-[1fr_1.2fr_1fr_1.1fr_0.7fr] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500"><span>Order</span><span>Student</span><span>Status</span><span>Writer</span><span>Total</span></div><div className="divide-y divide-slate-100">{orders.slice(0, 10).map((order) => <div key={order.id} className="grid grid-cols-[1fr_1.2fr_1fr_1.1fr_0.7fr] items-center gap-3 px-4 py-4 text-sm"><span><strong className="font-mono text-[10px] text-[#0080d1]">#{order.id.slice(-8).toUpperCase()}</strong><span className="mt-1 block max-w-[190px] truncate text-xs text-slate-500">{order.topic || order.subject || order.taskType || 'Order requirements'}</span></span><span className="truncate text-xs text-slate-600">{order.email || order.userId || 'Unknown student'}</span><select value={order.status || 'pending'} onChange={(event) => void updateStatus(order, event.target.value)} className="w-fit border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase text-slate-600"><option value="pending">Pending</option><option value="paid">Paid</option><option value="in_progress">In progress</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select><select value={order.writerId ? String(order.writerId) : ''} onChange={(event) => void assignWriter(order, event.target.value)} className="max-w-[170px] border border-slate-200 bg-white px-2 py-1 text-xs" aria-label={`Assign writer to ${order.id}`}><option value="">{order.writerName || 'Assign writer'}</option>{writersData.map((writer) => <option key={writer.id} value={writer.id}>{writer.name}</option>)}</select><span className="text-xs font-semibold text-slate-700">{formatCurrency(Number(order.totalCost) || 0)}</span></div>)}</div></div></div>}
        </div>

        <div className="border border-slate-200 bg-white p-5"><h2 className="text-lg font-black text-slate-900">Quicklinks</h2><div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1"><AdminShortcut to="/portal/admin/chat" icon={<MessageSquare size={22} />} label="Live chat" /><AdminShortcut to="/portal/admin/sitemaps" icon={<Activity size={22} />} label="Sitemaps" /><AdminShortcut to="/portal/admin/dashboard" icon={<Users size={22} />} label={`${students} student profiles`} /><AdminShortcut to="/portal/admin/dashboard" icon={<Wallet size={22} />} label={`${formatCurrency(paidValue)} processed value`} /><AdminShortcut to="/portal/admin/dashboard" icon={<Clock3 size={22} />} label={`${pendingOrders.length} pending payments`} /></div></div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <div className="flex items-center gap-3 border border-slate-200 bg-white px-4 py-3.5 shadow-sm"><div className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-50 text-slate-600">{icon}</div><div className="min-w-0"><p className="truncate text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-0.5 text-xl font-black leading-tight text-slate-900">{value}</p></div></div>;
}

function AdminShortcut({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return <Link to={to} className="flex items-center gap-3 border border-slate-200 px-3 py-3 text-sm font-normal text-slate-700 transition hover:border-slate-400 hover:text-slate-900">{icon}{label}</Link>;
}
