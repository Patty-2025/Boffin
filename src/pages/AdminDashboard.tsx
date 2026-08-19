import React from 'react';
import { LayoutDashboard, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/chat" className="bg-white p-6 rounded-lg shadow border border-slate-200 flex items-center gap-4 hover:bg-slate-50">
          <MessageCircle className="text-blue-600" size={32} />
          <div>
            <h2 className="font-bold text-lg">Live Chat</h2>
            <p className="text-slate-500">Manage student chats</p>
          </div>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow border border-slate-200 flex items-center gap-4">
          <Users className="text-emerald-600" size={32} />
          <div>
            <h2 className="font-bold text-lg">User Management</h2>
            <p className="text-slate-500">View and manage users</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-slate-200 flex items-center gap-4">
          <LayoutDashboard className="text-amber-600" size={32} />
          <div>
            <h2 className="font-bold text-lg">Orders Management</h2>
            <p className="text-slate-500">View and manage orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
