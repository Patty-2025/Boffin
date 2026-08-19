import React, { useState } from 'react';
import { LayoutDashboard, MessageCircle, LogOut, User, ChevronLeft, ChevronRight, Map } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import BrandLogo from './BrandLogo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Live Chat', icon: MessageCircle, path: '/admin/chat' },
    { name: 'Sitemaps', icon: Map, path: '/admin/sitemaps' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-white font-sans">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-950 border-r border-slate-800 transition-all flex flex-col`}>
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-800">
          {isSidebarOpen && <BrandLogo />}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400">
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-6 border-t border-slate-800 text-slate-400 hover:text-white"
        >
          <LogOut size={20} />
          {isSidebarOpen && <span>Sign out</span>}
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-50 text-slate-900 p-8">
        {children}
      </main>
    </div>
  );
}
