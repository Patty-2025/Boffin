import React, { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { CheckCircle2, Clock, Copy, FileText, LoaderCircle, MessageSquare, Search, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';

type OrderStatus = 'draft' | 'pending' | 'paid' | 'completed';

interface TrackableOrder {
  id: string;
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
  { status: 'paid', label: 'Payment confirmed', description: 'Your order is ready for expert processing.' },
  { status: 'completed', label: 'Solution delivered', description: 'Your completed solution is available.' }
];

const STATUS_LABELS: Record<OrderStatus, string> = { draft: 'Draft', pending: 'Pending', paid: 'In progress', completed: 'Completed' };

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
  if (status === 'paid') return 66;
  if (status === 'pending') return 33;
  return 0;
}

function getStepIndex(status: TrackableOrder['status']) {
  if (status === 'completed') return 2;
  if (status === 'paid') return 1;
  if (status === 'pending') return 0;
  return -1;
}

export default function TrackOrder() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<TrackableOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const nextOrders = snapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }) as TrackableOrder)
        .sort((first, second) => getTimestamp(second.createdAt) - getTimestamp(first.createdAt));
      setOrders(nextOrders);
      setSelectedOrderId((current) => nextOrders.some((order) => order.id === current) ? current : nextOrders[0]?.id || '');
      setLoading(false);
    }, (snapshotError) => {
      console.error('Error loading orders:', snapshotError);
      setError('We could not load your orders right now. Please try again.');
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const filteredOrders = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return orders;
    return orders.filter((order) => `${order.id} ${getOrderTitle(order)}`.toLowerCase().includes(search));
  }, [orders, searchTerm]);

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

  return (
    <div className="mx-auto w-full max-w-7xl animate-in fade-in duration-500 font-['Open_Sans',sans-serif]">
      <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-[#d9e0ed] px-5 py-5 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div><h1 className="text-2xl font-bold text-slate-900">Track your order</h1><p className="mt-1 text-sm text-slate-600">Follow the latest status of your submitted orders.</p></div>
            <label className="relative block w-full md:max-w-xs"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search order or subject" className="w-full border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#0080d1]" /></label>
          </div>
        </div>

        {loading && <div className="px-6 py-16 text-center text-sm text-slate-500"><LoaderCircle size={24} className="mx-auto mb-2 animate-spin text-[#0080d1]" />Loading your orders...</div>}
        {!loading && error && <div className="px-6 py-16 text-center text-sm font-semibold text-rose-700">{error}</div>}
        {!loading && !error && orders.length === 0 && <div className="px-6 py-16 text-center"><FileText size={34} className="mx-auto mb-3 text-slate-300" /><p className="font-bold text-slate-700">No orders yet</p><p className="mt-1 text-sm text-slate-500">Your orders will appear here after checkout.</p><Link to="/dashboard?newOrder=1" className="mt-5 inline-flex bg-[#0080d1] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#006db3]">Place an order</Link></div>}
        {!loading && !error && orders.length > 0 && filteredOrders.length === 0 && <div className="px-6 py-16 text-center text-sm text-slate-500">No orders match your search.</div>}

        {!loading && !error && activeOrder && <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
          <div className="border-b border-slate-200 bg-slate-50 p-4 lg:border-b-0 lg:border-r lg:p-5"><p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Your orders ({filteredOrders.length})</p><div className="space-y-2">{filteredOrders.map((order) => <button key={order.id} type="button" onClick={() => setSelectedOrderId(order.id)} className={`w-full border p-3 text-left transition ${order.id === activeOrder.id ? 'border-[#0080d1] bg-white shadow-sm' : 'border-slate-200 bg-slate-50 hover:bg-white'}`}><div className="flex items-center justify-between gap-2"><span className="font-mono text-xs font-bold text-slate-900">#{order.id.slice(-8).toUpperCase()}</span><StatusBadge status={(order.status || 'draft') as OrderStatus} /></div><p className="mt-2 truncate text-sm font-semibold text-slate-700">{getOrderTitle(order)}</p><div className="mt-3 h-1.5 bg-slate-200"><div className="h-full bg-[#13bdb0]" style={{ width: `${getProgress(order.status)}%` }} /></div><div className="mt-2 flex justify-between text-xs text-slate-500"><span>Due: {order.deadlineDate || order.deadline || 'Not set'}</span><span>{typeof order.totalCost === 'number' ? `$${order.totalCost.toFixed(2)}` : 'Price pending'}</span></div></button>)}</div></div>

          <div className="min-w-0 p-5 lg:p-8"><div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5"><div><div className="flex items-center gap-2"><span className="font-mono text-sm font-bold text-slate-900">#{activeOrder.id.slice(-8).toUpperCase()}</span><button type="button" onClick={copyOrderId} title="Copy order ID" className="p-1 text-slate-500 hover:text-[#0080d1]">{copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}</button></div><h2 className="mt-2 text-xl font-bold text-slate-900">{getOrderTitle(activeOrder)}</h2></div><div className="text-left sm:text-right"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Deadline</p><p className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-800 sm:justify-end"><Clock size={15} className="text-[#0080d1]" />{activeOrder.deadlineDate || activeOrder.deadline || 'Not set'}</p></div></div>
            <div className="py-6"><div className="mb-2 flex justify-between text-sm font-bold text-slate-700"><span>Order progress</span><span className="text-[#0080d1]">{getProgress(activeStatus)}%</span></div><div className="h-2 bg-slate-200"><div className="h-full bg-[#13bdb0] transition-all" style={{ width: `${getProgress(activeStatus)}%` }} /></div></div>
            <div className="space-y-3">{STATUS_STEPS.map((step, index) => { const completed = index <= activeStepIndex; const current = index === activeStepIndex; return <div key={step.status} className={`flex items-start gap-3 border p-3 ${current ? 'border-[#0080d1] bg-sky-50' : 'border-slate-200'}`}><span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>{completed ? <CheckCircle2 size={16} /> : index + 1}</span><div><p className="text-sm font-bold text-slate-800">{step.label}{current && <span className="ml-2 text-xs font-semibold text-[#0080d1]">Current</span>}</p><p className="mt-0.5 text-xs text-slate-500">{step.description}</p></div></div>; })}</div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5"><div className="flex items-center gap-3"><UserCheck size={20} className="text-[#0080d1]" /><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Assigned expert</p><p className="text-sm font-semibold text-slate-800">{assignedWriter || 'Not assigned yet'}</p></div></div><Link to="/contact-us" className="inline-flex items-center gap-2 border border-[#0080d1] px-3 py-2 text-xs font-bold text-[#0080d1] hover:bg-sky-50"><MessageSquare size={14} /> Contact support</Link></div>
            {activeOrder.isDraft && activeStatus === 'pending' && <Link to={`/dashboard?newOrder=1&resumeOrder=${activeOrder.id}`} className="mt-6 inline-flex items-center gap-2 bg-[#0080d1] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#006db3]">Continue this order</Link>}
            {activeStatus === 'completed' && <Link to="/portal/completed" className="mt-6 inline-flex items-center gap-2 bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">View completed solution</Link>}
          </div>
        </div>}
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const completed = status === 'completed';
  const pending = status === 'pending' || status === 'draft';
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${completed ? 'bg-emerald-50 text-emerald-700' : pending ? 'bg-amber-50 text-amber-700' : 'bg-sky-50 text-sky-700'}`}>{completed ? <CheckCircle2 size={11} /> : <Clock size={11} />}{STATUS_LABELS[status] || 'Processing'}</span>;
}
