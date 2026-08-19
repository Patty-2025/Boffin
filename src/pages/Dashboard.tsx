import React from 'react';
import { Search, FileText, Clock, CheckCircle2, MessageSquare, Download, Upload, Plus } from 'lucide-react';

export default function Dashboard() {
  const orders = [
    { id: '#ORD-98234', title: 'Calculus III Problem Sets', status: 'In Progress', due: 'Tomorrow, 5:00 PM', progress: 65 },
    { id: '#ORD-98110', title: 'Shakespeare Analysis Essay', status: 'Completed', due: 'Delivered', progress: 100 },
    { id: '#ORD-97880', title: 'Macroeconomics term paper', status: 'Completed', due: 'Delivered', progress: 100 },
  ];

  return (
    <main className="pt-[80px] bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
           <div>
             <h1 className="text-3xl font-extrabold text-slate-900">Welcome back, Student!</h1>
             <p className="text-slate-500 mt-1">Here is the status of your current assignments and documents.</p>
           </div>
           <button className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded shadow-md flex items-center gap-2 transition-colors">
              <Plus size={20} />
              New Order
           </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Active Orders</h4>
            <div className="text-3xl font-extrabold text-slate-900">1</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Completed</h4>
            <div className="text-3xl font-extrabold text-slate-900">12</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Wallet Balance</h4>
            <div className="text-3xl font-extrabold text-green-600">$45.00</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <h4 className="text-amber-800 text-sm font-bold uppercase tracking-wider mb-2">Rewards Tier</h4>
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 flex items-center gap-2">Gold Member</div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
               <FileText size={20} className="text-emerald-500" /> Recent Orders
            </h2>
            <div className="relative">
               <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
               <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">Order ID / Title</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Deadline</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{order.id}</div>
                      <div className="text-sm text-slate-500">{order.title}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {order.status === 'Completed' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                            <CheckCircle2 size={12} /> {order.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                            <Clock size={12} /> {order.status}
                          </span>
                        )}
                      </div>
                      {order.progress < 100 && (
                        <div className="w-32 h-1.5 bg-slate-200 rounded mt-2 overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${order.progress}%` }}></div>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-600 font-medium">{order.due}</span>
                    </td>
                    <td className="p-4 text-right">
                       <div className="flex justify-end gap-2">
                         <button className="p-2 text-slate-400 hover:text-blue-700 hover:bg-amber-50 rounded transition-colors" title="Message Expert">
                           <MessageSquare size={18} />
                         </button>
                         {order.status === 'Completed' && (
                           <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Download Final Paper">
                             <Download size={18} />
                           </button>
                         )}
                         {order.status === 'In Progress' && (
                           <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Upload Files">
                             <Upload size={18} />
                           </button>
                         )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
