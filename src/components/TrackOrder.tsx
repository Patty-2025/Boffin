import React, { useEffect, useMemo, useState } from 'react';
import { collection, doc, onSnapshot, query, serverTimestamp, where, writeBatch } from '../lib/realtimeFirestore';
import { CheckCircle2, Clock, Copy, FileText, LoaderCircle, MessageSquare, Search, Truck, UserCheck, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import PortalPageHeader from './PortalPageHeader';

type OrderStatus = 'draft' | 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled';

interface TrackableOrder {
  id: string;
  userId?: string;
  status?: OrderStatus | string;
  subject?: string;
  taskType?: string;
  topic?: string;
  paperType?: string;
  deadline?: string;
  deadlineDate?: string;
  totalCost?: number;
  writerId?: string | number | null;
  writerName?: string | null;
  selectedWriterId?: string | number | null;
  selectedWriterName?: string | null;
  isDraft?: boolean;
  checkoutStep?: number;
  createdAt?: { toDate?: () => Date } | string | Date | null;
}

const STATUS_STEPS: Array<{ status: OrderStatus; label: string; description: string }> = [
  { status: 'pending', label: 'Order submitted', description: 'Your requirements are being reviewed.' },
  { status: 'in_progress', label: 'Being prepared', description: 'Your assigned expert is working on your solution.' },
  { status: 'completed', label: 'Solution delivered', description: 'Your completed solution is available.' }
];

const STATUS_LABELS: Record<OrderStatus, string> = { draft: 'Draft', pending: 'Pending', paid: 'In progress', in_progress: 'In progress', completed: 'Completed', cancelled: 'Cancelled' };

function getTimestamp(value: TrackableOrder['createdAt']) {
  if (!value) return 0;
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') return value.toDate().getTime();
  return new Date(value as string | Date).getTime() || 0;
}

function getOrderTitle(order: TrackableOrder) {
  return order.subject || order.topic || order.taskType || order.paperType || 'Order requirements';
}

function getProgress(status: TrackableOrder['status']) {
  if (status === 'completed') return 100;
  if (status === 'paid' || status === 'in_progress') return 66;
  if (status === 'pending') return 33;
  return 0;
}

function getStepIndex(status: TrackableOrder['status']) {
  if (status === 'completed') return 2;
  if (status === 'paid' || status === 'in_progress') return 1;
  if (status === 'pending') return 0;
  return -1;
}

function formatDeadline(deadline: string | undefined): string {
  if (!deadline) return 'Not set';
  
  try {
    // Handle ISO format (2026-08-20T07:13 or 2026-08-20T07:13:00)
    const date = new Date(deadline);
    if (isNaN(date.getTime())) return deadline;
    
    // Format: "Aug 20, 2026 at 7:13 AM"
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return deadline;
  }
}

function isOrderOverdue(deadline: string | undefined, status: OrderStatus | string): boolean {
  if (!deadline || status === 'completed') return false;
  
  try {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return deadlineDate < now;
  } catch {
    return false;
  }
}

function isCancelledStatus(status: TrackableOrder['status']): boolean {
  return status === 'cancelled' || status === 'canceled';
}

export default function TrackOrder() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState<TrackableOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const viewCancelled = false;
  const setViewCancelled = (_value: boolean) => undefined;
  const cancelledOrders: TrackableOrder[] = [];

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const nextOrders = snapshot.docs
        .map((document: any) => ({ id: document.id, ...document.data() }) as TrackableOrder)
        .sort((first, second) => getTimestamp(second.createdAt) - getTimestamp(first.createdAt));
      setOrders(nextOrders);
      const nextActiveOrders = nextOrders.filter((order) => !isCancelledStatus(order.status));
      const requestedOrderId = searchParams.get('orderId');
      setSelectedOrderId((current) => requestedOrderId && nextActiveOrders.some((order) => order.id === requestedOrderId)
        ? requestedOrderId
        : nextActiveOrders.some((order) => order.id === current) ? current : nextActiveOrders[0]?.id || '');
      setError('');
      setLoading(false);
    }, (snapshotError) => {
      console.error('Error loading orders:', snapshotError);
      setError('The orders database could not be reached. Please try again.');
      setLoading(false);
    });
    return unsubscribe;
  }, [user, reloadKey, searchParams]);

  const activeOrders = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    let filtered = orders.filter((order) => !isCancelledStatus(order.status));
    if (!search) return filtered;
    return filtered.filter((order) => `${order.id} ${getOrderTitle(order)}`.toLowerCase().includes(search));
  }, [orders, searchTerm]);

  const filteredOrders = activeOrders;

  const activeOrder = filteredOrders.find((order) => order.id === selectedOrderId) || filteredOrders[0];
  const activeStatus = (activeOrder?.status || 'draft') as OrderStatus;
  const activeStepIndex = getStepIndex(activeStatus);
  const assignedWriter = activeOrder?.writerName || activeOrder?.selectedWriterName || activeOrder?.writerId || activeOrder?.selectedWriterId;

  const copyOrderId = async () => {
    if (!activeOrder) return;
    await navigator.clipboard.writeText(activeOrder.id);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const cancelOrder = async () => {
    if (!activeOrder || !window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) return;
    
    try {
      const orderRef = doc(db, 'orders', activeOrder.id);
      const cancelledOrderRef = doc(db, 'cancelledOrders', activeOrder.id);
      const batch = writeBatch(db);
      batch.set(cancelledOrderRef, {
        ...activeOrder,
        orderId: activeOrder.id,
        userId: user?.uid,
        cancelledAt: serverTimestamp()
      }, { merge: true });
      batch.delete(orderRef);
      await batch.commit();
      setOrders((currentOrders) => currentOrders.filter((order) => order.id !== activeOrder.id));
      if (localStorage.getItem('boffinDraftOrderId') === activeOrder.id) {
        localStorage.removeItem('boffinDraftOrderId');
        localStorage.removeItem('boffinOrderDraft');
      }
      alert('Order cancelled successfully and removed from the database.');
      setSelectedOrderId('');
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order. Please try again.');
    }
  };

  return (
    <div className="track-order-page mx-auto w-full max-w-7xl animate-in fade-in duration-500 font-['Open_Sans',sans-serif]">
      <section className="overflow-hidden bg-transparent">
        <div className="mt-2">
          <PortalPageHeader title="Track your order" description="Follow the latest status of your submitted orders.">
            <label className="relative block w-full lg:max-w-xs"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search order or subject" className="w-full border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#0080d1]" /></label>
          </PortalPageHeader>
        </div>

        {loading && <div className="px-6 py-16 text-center text-sm text-slate-500"><LoaderCircle size={24} className="mx-auto mb-2 animate-spin text-[#0080d1]" />Loading your orders...</div>}
        {!loading && error && <div className="px-6 py-16 text-center"><p className="text-sm font-semibold text-rose-700">{error}</p><button type="button" onClick={() => { setError(''); setLoading(true); setReloadKey((key) => key + 1); }} className="mt-4 bg-[#0080d1] px-4 py-2 text-sm font-bold text-white hover:bg-[#006db3]">Retry</button></div>}
        {!loading && !error && orders.length === 0 && <div className="px-6 py-16 text-center"><FileText size={34} className="mx-auto mb-3 text-slate-300" /><p className="font-bold text-slate-700">No orders yet</p><p className="mt-1 text-sm text-slate-500">Your orders will appear here after checkout.</p><Link to="/portal/place-order" className="mt-5 inline-flex bg-[#0080d1] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#006db3]">Place an order</Link></div>}
        {!loading && !error && orders.length > 0 && filteredOrders.length === 0 && <div className="px-6 py-16 text-center text-sm text-slate-500">No orders match your search.</div>}

        {!loading && !error && activeOrder && <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
          <div className="border-b border-slate-200 bg-slate-50 p-3 lg:border-b-0 lg:border-r lg:p-4"><div className="mb-3 flex gap-2 border-b border-slate-200"><button onClick={() => { setViewCancelled(false); setSelectedOrderId(''); }} className={`px-3 py-2 text-xs font-bold uppercase transition ${!viewCancelled ? 'border-b-2 border-[#0080d1] text-[#0080d1]' : 'text-slate-500 hover:text-slate-700'}`}>Active ({activeOrders.length})</button><button onClick={() => { setViewCancelled(true); setSelectedOrderId(''); }} className={`px-3 py-2 text-xs font-bold uppercase transition ${viewCancelled ? 'border-b-2 border-red-600 text-red-600' : 'text-slate-500 hover:text-slate-700'}`}>Cancelled ({cancelledOrders.length})</button></div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">{viewCancelled ? 'Cancelled orders' : 'Your orders'} ({filteredOrders.length})</p><div className="space-y-1">{filteredOrders.map((order) => <button key={order.id} type="button" onClick={() => setSelectedOrderId(order.id)} className={`w-full border px-2.5 py-2 text-left transition ${order.id === activeOrder.id ? 'border-[#0080d1] bg-white shadow-sm' : 'border-slate-200 bg-slate-50 hover:bg-white'}`}><div className="flex items-center gap-2"><span className="shrink-0 font-mono text-[10px] font-bold text-slate-900">#{order.id.slice(-8).toUpperCase()}</span><p className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-700">{getOrderTitle(order)}</p><StatusBadge status={(order.status || 'draft') as OrderStatus} deadline={order.deadlineDate || order.deadline} /></div><div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500"><span className="shrink-0 truncate">Due: {formatDeadline(order.deadlineDate || order.deadline)}</span><span className="ml-auto shrink-0">{typeof order.totalCost === 'number' ? `$${order.totalCost.toFixed(2)}` : 'Price pending'}</span></div><div className="mt-1 h-0.5 bg-slate-200"><div className="h-full bg-[#13bdb0]" style={{ width: `${getProgress(order.status)}%` }} /></div></button>)}</div></div>

          <div className="min-w-0 p-5 lg:p-8"><div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5"><div><div className="flex items-center gap-2"><span className="font-mono text-sm font-bold text-slate-900">#{activeOrder.id.slice(-8).toUpperCase()}</span><button type="button" onClick={copyOrderId} title="Copy order ID" className="p-1 text-slate-500 hover:text-[#0080d1]">{copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}</button></div><h2 className="mt-2 text-xl font-bold text-slate-900">{getOrderTitle(activeOrder)}</h2></div><div className="text-left sm:text-right"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{viewCancelled ? 'Status' : 'Deadline'}</p><p className={`mt-1 flex items-center gap-1 text-sm font-bold sm:justify-end ${viewCancelled ? 'text-red-700' : isOrderOverdue(activeOrder.deadlineDate || activeOrder.deadline, activeStatus) ? 'text-red-700' : 'text-slate-800'}`}><Clock size={15} className={viewCancelled ? 'text-red-700' : isOrderOverdue(activeOrder.deadlineDate || activeOrder.deadline, activeStatus) ? 'text-red-500' : 'text-[#0080d1]'} />{viewCancelled ? 'Cancelled' : formatDeadline(activeOrder.deadlineDate || activeOrder.deadline)} {!viewCancelled && isOrderOverdue(activeOrder.deadlineDate || activeOrder.deadline, activeStatus) && <span className="ml-2 text-xs font-bold text-red-700">OVERDUE</span>}</p></div></div>
            {!viewCancelled && <div className="py-6"><div className="mb-2 flex justify-between text-sm font-bold text-slate-700"><span>Order progress</span><span className="text-[#0080d1]">{getProgress(activeStatus)}%</span></div><div className="relative h-2 bg-slate-200"><div className="order-progress-fill h-full transition-all" style={{ width: `${getProgress(activeStatus)}%` }} />{activeStatus !== 'completed' && <span className="order-progress-truck absolute -top-5 text-[#0080d1]" style={{ left: `${getProgress(activeStatus)}%` }} aria-label="Your assignment is being prepared"><Truck size={23} strokeWidth={2.2} /></span>}</div><p className="mt-2 text-xs text-slate-500">Your assignment is being worked on and will be delivered shortly.</p></div>}
            {!viewCancelled && <div className="space-y-3">{STATUS_STEPS.map((step, index) => { const completed = index <= activeStepIndex; const current = index === activeStepIndex; return <div key={step.status} className={`flex items-start gap-3 border p-3 ${current ? 'border-[#0080d1] bg-sky-50' : 'border-slate-200'}`}><span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>{completed ? <CheckCircle2 size={16} /> : index + 1}</span><div><p className="text-sm font-bold text-slate-800">{step.label}{current && <span className="ml-2 text-xs font-semibold text-[#0080d1]">Current</span>}</p><p className="mt-0.5 text-xs text-slate-500">{step.description}</p></div></div>; })}</div>}
            {viewCancelled && <div className="py-6"><div className="rounded-lg border border-red-200 bg-red-50 p-4"><p className="text-sm font-bold text-red-800">This order has been cancelled</p><p className="mt-2 text-xs text-red-700">The cancellation was processed and the order is no longer active.</p></div></div>}
            {!viewCancelled && <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5"><div className="flex items-center gap-3"><UserCheck size={20} className="text-[#0080d1]" /><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Assigned expert</p><p className="text-sm font-semibold text-slate-800">{assignedWriter || 'Not assigned yet'}</p></div></div><Link to="/contact-us" className="inline-flex items-center gap-2 border border-[#0080d1] px-3 py-2 text-xs font-bold text-[#0080d1] hover:bg-sky-50"><MessageSquare size={14} /> Contact support</Link></div>}
            <div className="mt-6 flex flex-wrap items-center gap-3"><div className="flex flex-wrap items-center gap-3">{activeOrder.isDraft && activeStatus === 'pending' && <Link to={`/portal/place-order?resumeOrder=${activeOrder.id}`} className="inline-flex items-center gap-2 bg-[#0080d1] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#006db3]">Continue this order</Link>}{(activeStatus === 'draft' || activeStatus === 'pending') && <button onClick={cancelOrder} className="inline-flex items-center gap-2 bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700"><X size={16} /> Cancel order</button>}{activeStatus === 'completed' && <Link to="/portal/completed" className="inline-flex items-center gap-2 bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">View completed solution</Link>}</div></div>
          </div>
        </div>}
      </section>
    </div>
  );
}

function StatusBadge({ status, deadline }: { status: OrderStatus; deadline?: string }) {
  const overdue = isOrderOverdue(deadline, status);
  const completed = status === 'completed';
  const cancelled = status === 'cancelled';
  const pending = status === 'pending' || status === 'draft';
  
  if (overdue && !cancelled) {
    return <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase bg-red-50 text-red-700"><Clock size={11} />Overdue</span>;
  }
  
  if (cancelled) {
    return <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase bg-slate-100 text-slate-700"><X size={11} />Cancelled</span>;
  }
  
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${completed ? 'bg-emerald-50 text-emerald-700' : pending ? 'bg-amber-50 text-amber-700' : 'bg-sky-50 text-sky-700'}`}>{completed ? <CheckCircle2 size={11} /> : <Clock size={11} />}{STATUS_LABELS[status] || 'Processing'}</span>;
}
