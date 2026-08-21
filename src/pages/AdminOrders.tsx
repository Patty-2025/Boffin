import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Eye, ExternalLink, FileText, Filter, Search } from 'lucide-react';
import { collection, doc, onSnapshot, updateDoc } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';
import writersData from '../data/topWriters.json';

type AdminOrder = { id: string; userId?: string; email?: string; fullName?: string; topic?: string; subject?: string; taskType?: string; status?: string; paymentStatus?: string; paidAt?: any; solutionOffered?: boolean; solutionDelivered?: boolean; deliveredAt?: any; deliveryUrl?: string; totalCost?: number; writerId?: string | number | null; writerName?: string | null; writerPayout?: number; writerPayoutRate?: number; revisionRequested?: boolean; requiresRevision?: boolean; revisionRequired?: boolean; revisionStatus?: 'requested' | 'in_progress' | 'completed' | string; createdAt?: any; updatedAt?: any; deadline?: string; deadlineDate?: string; instructions?: string; details?: Record<string, any>; attachments?: any[]; uploadedFiles?: any[]; googleDriveItems?: any[] };
type OrderRecord = { id: string; data: () => Record<string, any> };

const statusLabels: Record<string, string> = { pending: 'Pending', paid: 'Paid', in_progress: 'In progress', completed: 'Completed', cancelled: 'Cancelled', revision: 'Revision required' };
const formatCurrency = (value: number) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const hasRevisionRequest = (order: AdminOrder) => Boolean(order.revisionRequested || order.requiresRevision || order.revisionRequired || order.revisionStatus === 'requested' || order.status === 'revision_requested');
const isUnderRevision = (order: AdminOrder) => Boolean(order.revisionStatus === 'in_progress' || order.status === 'revision' || order.status === 'revision_in_progress');
const hasSolution = (order: AdminOrder) => Boolean(order.solutionOffered || order.solutionDelivered || order.deliveredAt || order.deliveryUrl || order.status === 'completed');
const isInProgress = (order: AdminOrder) => Boolean(!hasSolution(order) && (order.status === 'paid' || order.status === 'in_progress' || order.paymentStatus === 'paid' || order.paidAt));
const isAssigned = (order: AdminOrder) => Boolean(order.writerId || order.writerName);
const isPaid = (order: AdminOrder) => ['paid', 'in_progress', 'completed', 'revision', 'revision_requested'].includes(order.status || '') || Number(order.totalCost) > 0 && Boolean(order.paidAt || order.paymentStatus === 'paid');
const isUnpaid = (order: AdminOrder) => !isPaid(order) && order.status !== 'cancelled';

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [studentNames, setStudentNames] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');
  const [viewingOrder, setViewingOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onSnapshot(collection(db, 'orders'), (snapshot) => {
      setOrders((snapshot.docs as OrderRecord[]).map((order) => ({ id: order.id, ...order.data() })).sort((first, second) => new Date(second.createdAt || 0).getTime() - new Date(first.createdAt || 0).getTime()));
      setLoading(false);
    }, () => setLoading(false));
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, 'studentProfiles'), (snapshot) => {
      const names = Object.fromEntries(snapshot.docs.map((profile: OrderRecord) => [profile.id, profile.data().name || profile.data().fullName || '']));
      setStudentNames(names);
    });
  }, []);

  const visibleOrders = useMemo(() => orders.filter((order) => {
    const haystack = `${order.id} ${order.email || ''} ${order.userId || ''} ${order.topic || ''} ${order.subject || ''} ${order.writerName || ''}`.toLowerCase();
    return haystack.includes(search.toLowerCase().trim());
  }), [orders, search]);

  const updateStatus = async (order: AdminOrder, status: string) => {
    const revisionUpdate = status === 'revision_requested'
      ? { status: 'completed', revisionRequested: true, revisionStatus: 'requested' }
      : status === 'revision_in_progress'
        ? { status: 'in_progress', revisionRequested: false, revisionStatus: 'in_progress' }
        : status === 'completed'
          ? { status, revisionRequested: false, requiresRevision: false, revisionRequired: false, revisionStatus: 'completed' }
          : { status, revisionRequested: false };
    await updateDoc(doc(db, 'orders', order.id), { ...revisionUpdate, updatedAt: new Date().toISOString() });
  };

  const assignWriter = async (order: AdminOrder, writerId: string) => {
    const writer = writersData.find((candidate) => String(candidate.id) === writerId);
    if (!writer) return;
    await updateDoc(doc(db, 'orders', order.id), { writerId: writer.id, writerName: writer.name, writerPayout: (Number(order.totalCost) || 0) * 0.3, writerPayoutRate: 0.3, assignedByAdmin: true, status: order.status === 'paid' ? 'in_progress' : order.status, updatedAt: new Date().toISOString() });
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4">
      {viewingOrder ? <OrderDetails order={viewingOrder} studentName={viewingOrder.fullName || (viewingOrder.userId && studentNames[viewingOrder.userId]) || 'Unknown student'} onBack={() => setViewingOrder(null)} /> : <section className="border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5"><div><h1 className="flex items-center gap-2 text-lg font-black text-slate-900"><FileText size={20} /> Order management</h1><p className="mt-1 text-xs text-slate-500">Review payment, assignment, completion, cancellation, and revision status from the database.</p></div></div>
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 p-4"><label className="relative min-w-[260px] flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search order, student, topic, or writer" className="w-full border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-500" /></label><span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><Filter size={15} /> Showing {visibleOrders.length}</span></div>
        <div className="overflow-x-auto">{loading ? <p className="p-8 text-center text-sm text-slate-500">Loading orders...</p> : visibleOrders.length === 0 ? <p className="p-8 text-center text-sm text-slate-500">No orders match this view.</p> : <table className="w-full min-w-[1120px] text-left text-sm"><thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Order ID</th><th className="px-4 py-3">Student</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Assignment</th><th className="px-4 py-3">Writer</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{visibleOrders.map((order) => <tr key={order.id}><td className="px-4 py-4"><strong className="font-mono text-[10px] text-[#0080d1]">#{order.id.slice(-8).toUpperCase()}</strong></td><td className="px-4 py-4"><span className="block max-w-[190px] truncate text-xs text-slate-700">{order.fullName || (order.userId && studentNames[order.userId]) || 'Unknown student'}</span></td><td className="px-4 py-4"><select value={isUnderRevision(order) ? 'revision_in_progress' : hasRevisionRequest(order) ? 'revision_requested' : isInProgress(order) ? 'in_progress' : order.status || 'pending'} onChange={(event) => void updateStatus(order, event.target.value)} className="border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold uppercase text-slate-600"><option value="pending">Pending</option><option value="paid">Paid</option><option value="in_progress">In progress</option><option value="revision_requested">Revision requested</option><option value="revision_in_progress">Under revision</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></td><td className="px-4 py-4 text-xs text-slate-600">{isAssigned(order) ? <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Assigned</span> : <span className="flex items-center gap-1 text-slate-400"><Clock3 size={14} /> Unassigned</span>}</td><td className="px-4 py-4"><select value={order.writerId ? String(order.writerId) : ''} onChange={(event) => void assignWriter(order, event.target.value)} className="max-w-[180px] border border-slate-200 bg-white px-2 py-1 text-xs" aria-label={`Assign writer to ${order.id}`}><option value="">{order.writerName || 'Assign writer'}</option>{writersData.map((writer) => <option key={writer.id} value={writer.id}>{writer.name}</option>)}</select>{order.writerId && <span className="mt-1 block text-[10px] text-slate-500">Writer payout: {formatCurrency(Number(order.writerPayout ?? (Number(order.totalCost) || 0) * 0.3))} (30%)</span>}</td><td className="px-4 py-4 text-xs font-semibold text-slate-700">{formatCurrency(Number(order.totalCost) || 0)}</td><td className="px-4 py-4 text-xs text-slate-500">{formatDate(order.updatedAt || order.createdAt)}</td><td className="px-4 py-4"><button type="button" onClick={() => setViewingOrder(order)} className="flex items-center gap-1 text-xs font-bold text-[#0080d1] hover:underline"><Eye size={14} /> View order</button></td></tr>)}</tbody></table>}</div>
      </section>}
    </div>
  );
}

function OrderDetails({ order, studentName, onBack }: { order: AdminOrder; studentName: string; onBack: () => void }) {
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);
  const documents = getOrderDocuments(order);
  const detailEntries = Object.entries(order.details || {}).filter(([, value]) => value !== undefined && value !== null && value !== '');
  return <section className="border border-slate-200 bg-white"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5"><div><button type="button" onClick={onBack} className="mb-3 text-xs font-bold text-[#0080d1] hover:underline">Back to orders</button><p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Order details</p><h1 className="mt-1 text-xl font-black text-slate-900">#{order.id.slice(-8).toUpperCase()}</h1></div><span className="border border-slate-200 px-3 py-2 text-xs font-bold uppercase text-slate-600">{statusLabels[order.status || 'pending'] || order.status || 'Pending'}</span></div><div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3"><Detail label="Student" value={studentName} /><Detail label="Price" value={formatCurrency(Number(order.totalCost) || 0)} /><Detail label="Writer payout" value={order.writerId ? `${formatCurrency(Number(order.writerPayout ?? (Number(order.totalCost) || 0) * 0.3))} (30%)` : 'Not assigned'} /><Detail label="Topic" value={order.topic || order.subject || order.taskType || '-'} /><Detail label="Deadline" value={formatDate(order.deadline || order.deadlineDate)} /><Detail label="Payment" value={order.paymentStatus || (isPaid(order) ? 'Paid' : 'Pending')} /></div>{order.instructions && <InstructionPanel text={order.instructions} isExpanded={isInstructionsExpanded} onToggle={() => setIsInstructionsExpanded((expanded) => !expanded)} />}{detailEntries.length > 0 && <div className="border-t border-slate-200 p-5"><h2 className="text-sm font-black text-slate-900">Order requirements</h2><dl className="mt-3 grid gap-3 sm:grid-cols-2">{detailEntries.map(([label, value]) => <Detail key={label} label={label.replace(/([A-Z])/g, ' $1')} value={String(value)} />)}</dl></div>}<div className="border-t border-slate-200 p-5"><h2 className="text-sm font-black text-slate-900">Student documents</h2>{documents.length === 0 ? <p className="mt-2 text-sm text-slate-500">No documents were attached to this order.</p> : <div className="mt-3 grid gap-2 sm:grid-cols-2">{documents.map((document, index) => document.url ? <a key={`${document.name}-${index}`} href={document.url} target="_blank" rel="noreferrer" className="flex items-center justify-between border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 transition hover:border-[#0080d1] hover:text-[#0080d1]"><span className="flex min-w-0 items-center gap-2"><FileText size={17} className="shrink-0" /><span className="truncate">{document.name}</span></span><ExternalLink size={15} className="shrink-0" /></a> : <div key={`${document.name}-${index}`} className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600"><FileText size={17} className="shrink-0" /><span className="truncate">{document.name}</span><span className="ml-auto text-[10px] text-slate-400">No download link</span></div>)}</div>}</div></section>;
}


function InstructionPanel({ text, isExpanded, onToggle }: { text: string; isExpanded: boolean; onToggle: () => void }) {
  const isLong = text.length > 420;
  return <div className="border-t border-slate-200 p-5"><h2 className="text-sm font-black text-slate-900">Instructions</h2><div className={`mt-3 overflow-hidden text-sm leading-relaxed text-slate-600 ${isLong && !isExpanded ? 'max-h-28' : 'max-h-none'}`}><p className="whitespace-pre-wrap">{text}</p></div>{isLong && !isExpanded && <div className="pointer-events-none -mt-6 h-6 bg-gradient-to-t from-white to-transparent" />}{isLong && <button type="button" onClick={onToggle} className="mt-2 text-xs font-bold text-[#0080d1] hover:underline">{isExpanded ? 'Read less' : 'Read more'}</button>}</div>;
}
function getOrderDocuments(order: AdminOrder) {
  const sources = [...(order.attachments || []), ...(order.uploadedFiles || []), ...(order.googleDriveItems || [])];
  return sources.map((document: any) => ({ name: document.name || document.fileName || 'Student document', url: document.url || document.downloadUrl || document.link || document.webViewLink }));
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="border border-slate-200 bg-slate-50 px-3 py-2.5"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</p></div>;
}

function formatDate(value?: any) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString();
}



