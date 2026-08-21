import React, { useEffect, useState } from 'react';
import { CheckCircle2, FileText, LoaderCircle, RotateCcw } from 'lucide-react';
import { collection, doc, onSnapshot, updateDoc, query, where } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import PortalPageHeader from '../components/PortalPageHeader';

interface CompletedOrder {
  id: string;
  subject?: string;
  taskType?: string;
  deadline?: string;
  completedAt?: any;
  createdAt?: any;
  revisionRequested?: boolean;
  revisionStatus?: string;
}

export default function CompletedSolutions() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<CompletedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    return onSnapshot(query(collection(db, 'orders'), where('userId', '==', user.uid)), (snapshot) => {
      setOrders(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })).filter((order) => (order as CompletedOrder & { status?: string }).status === 'completed') as CompletedOrder[]);
      setLoading(false);
    }, () => setLoading(false));
  }, [user]);

  const requestRevision = async (orderId: string) => {
    await updateDoc(doc(db, 'orders', orderId), { revisionRequested: true, revisionStatus: 'requested', revisionRequestedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  };

  return (
    <div className="mx-auto mt-2 w-full max-w-7xl animate-in fade-in duration-500 font-['Open_Sans',sans-serif]">
      <section className="overflow-hidden bg-transparent">
        <PortalPageHeader title="Completed solutions" description="Access the solutions from your completed orders." />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-[#d9e0ed] text-xs font-bold text-slate-900">
              <tr><th className="px-4 py-3">Order ID</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Deadline</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-500"><LoaderCircle size={20} className="mx-auto mb-2 animate-spin text-[#0080d1]" />Loading completed solutions...</td></tr>}
              {!loading && orders.length === 0 && <tr><td colSpan={5} className="px-6 py-10 text-center"><FileText size={30} className="mx-auto mb-2 text-slate-300" /><p className="font-bold text-slate-700">No completed solutions yet</p><p className="mt-1 text-sm text-slate-500">Completed orders will appear here.</p></td></tr>}
              {!loading && orders.map((order) => <tr key={order.id} className="hover:bg-slate-50"><td className="px-4 py-3 font-mono text-xs font-bold">#{order.id.slice(-8).toUpperCase()}</td><td className="px-4 py-3 font-semibold text-slate-700">{order.subject || order.taskType || 'Order solution'}</td><td className="px-4 py-3 text-slate-600">{order.deadline || 'Delivered'}</td><td className="px-4 py-3">{order.revisionStatus === 'requested' ? <span className="inline-flex items-center gap-1 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"><RotateCcw size={12} /> Revision requested</span> : order.revisionStatus === 'in_progress' ? <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"><RotateCcw size={12} /> Under revision</span> : <span className="inline-flex items-center gap-1 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"><CheckCircle2 size={12} /> Completed</span>}</td><td className="px-4 py-3 text-right"><div className="flex justify-end gap-2"><button type="button" className="border border-[#0080d1] px-3 py-1.5 text-xs font-bold text-[#0080d1] hover:bg-sky-50">View solution</button>{order.revisionStatus !== 'requested' && order.revisionStatus !== 'in_progress' && <button type="button" onClick={() => void requestRevision(order.id)} className="flex items-center gap-1 border border-amber-300 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-50"><RotateCcw size={13} /> Request revision</button>}</div></td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
