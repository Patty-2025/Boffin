import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Award, CheckCircle2, Clock, FileText, Headphones, LoaderCircle, User, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortalPageHeader from '../components/PortalPageHeader';

interface Order {
  id: string;
  taskType: string;
  subject: string;
  status: 'draft' | 'pending' | 'paid' | 'in_progress' | 'completed';
  totalCost: number;
  deadlineDate?: string;
  deadline?: string;
  selectedWriterId?: string | number | null;
  writerId?: string | number | null;
  paymentStatus?: string;
  createdAt?: any;
}

export default function MyAssignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!user) return;
      
      try {
        const q = query(
          collection(db, 'orders'), 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setAssignments(data);
      } catch (err) {
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user]);

  return (
    <div className="mt-2 space-y-6">
      <PortalPageHeader title="My assignments" description="Review the latest status of your submitted orders." />
      <div className="mx-auto w-full max-w-7xl animate-in fade-in duration-500">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead className="bg-[#d9e0ed] text-sm font-extrabold text-slate-900">
            <tr>
              <th className="rounded-tl-xl px-4 py-4">Order ID &amp; Status</th>
              <th className="px-4 py-4">Subject</th>
              <th className="px-4 py-4">Deadline</th>
              <th className="px-4 py-4">Expert Id</th>
              <th className="px-4 py-4">Payment Status</th>
              <th className="rounded-tr-xl px-4 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {loading && <tr><td colSpan={6} className="px-6 py-14 text-center text-slate-500"><LoaderCircle size={22} className="mx-auto mb-2 animate-spin text-[#0080d1]" />Loading orders...</td></tr>}
            {!loading && assignments.length === 0 && <tr><td colSpan={6} className="px-6 py-14 text-center"><FileText size={34} className="mx-auto mb-3 text-slate-300" /><p className="font-bold text-slate-700">No orders yet</p><p className="mt-1 text-sm text-slate-500">Your orders will appear here after checkout.</p></td></tr>}
            {!loading && assignments.map((order) => {
              const expertId = order.selectedWriterId || order.writerId || 'Not assigned';
              const deadline = order.deadlineDate || order.deadline || 'Not set';
              return <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-4 py-4"><span className="block font-bold text-slate-900">#{order.id.slice(-8).toUpperCase()}</span><StatusBadge status={order.status} /></td>
                <td className="max-w-[240px] px-4 py-4 font-semibold text-slate-700">{order.subject || order.taskType || 'Order requirements'}</td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-600">{deadline}</td>
                <td className="px-4 py-4 text-slate-600">{expertId}</td>
                <td className="px-4 py-4"><PaymentBadge status={order.paymentStatus || order.status} /></td>
                <td className="px-4 py-4 text-right"><button type="button" className="rounded-lg border border-[#0080d1] px-3 py-2 text-xs font-bold text-[#0080d1] hover:bg-sky-50">View</button></td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const paid = status === 'paid' || status === 'in_progress' || status === 'completed';
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${paid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{paid ? <CheckCircle2 size={11} /> : <Clock size={11} />}{paid ? 'Paid' : 'Pending'}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string, text: string, icon: any }> = {
    paid: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle2 },
    in_progress: { bg: 'bg-slate-100', text: 'text-slate-700', icon: Clock },
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', icon: AlertCircle },
    completed: { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: CheckCircle2 },
    draft: { bg: 'bg-slate-50', text: 'text-slate-500', icon: Clock }
  };

  const style = styles[status] || styles.draft;
  const Icon = style.icon;

  return (
    <span className={`px-2.5 py-1 ${style.bg} ${style.text} rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5`}>
      <Icon size={10} />
      {status}
    </span>
  );
}
