import React, { useEffect, useRef, useState } from 'react';
import { LayoutDashboard, MessageCircle, LogOut, ChevronLeft, ChevronRight, Map, Users, FileText, Bell, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot } from '../lib/realtimeFirestore';
import { auth, db } from '../lib/firebase';

type AdminNotification = { id: string; title: string; description: string; createdAt: number };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);
  const adminName = auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || 'Administrator';

  useEffect(() => {
    const readKey = `boffinAdminReadNotifications:${auth.currentUser?.uid || 'admin'}`;
    setReadNotificationIds(JSON.parse(localStorage.getItem(readKey) || '[]'));
    const orderUnsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const next = snapshot.docs.flatMap((document: any) => {
        const order = document.data();
        const label = `Order #${document.id.slice(-8).toUpperCase()}`;
        const timestamp = typeof order.createdAt === 'number' ? order.createdAt : Date.now();
        const notificationsForOrder: AdminNotification[] = [{ id: `${document.id}-placed`, title: 'New order received', description: `${label} requires review and writer assignment.`, createdAt: timestamp }];
        if (order.status === 'paid' || order.status === 'in_progress') notificationsForOrder.push({ id: `${document.id}-paid`, title: 'Payment confirmed', description: `${label} is ready for operations.`, createdAt: timestamp + 1 });
        if (order.writerId || order.writerName) notificationsForOrder.push({ id: `${document.id}-assigned`, title: 'Writer assigned', description: `${label} is assigned to ${order.writerName || 'a writer'} and ready for progress tracking.`, createdAt: timestamp + 2 });
        if (order.status === 'completed') notificationsForOrder.push({ id: `${document.id}-completed`, title: 'Order completed', description: `${label} has been marked completed.`, createdAt: timestamp + 2 });
        return notificationsForOrder;
      });
      setNotifications((current) => [...next, ...current.filter((item) => item.id.startsWith('chat-'))].sort((a, b) => b.createdAt - a.createdAt).slice(0, 30));
    });
    const chatUnsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => {
      const chatNotifications = snapshot.docs.filter((document: any) => document.data().status === 'active').map((document: any) => ({ id: `chat-${document.id}`, title: 'Active support chat', description: `A student is waiting in chat ${document.id.slice(-8).toUpperCase()}.`, createdAt: Date.now() }));
      setNotifications((current) => [...current.filter((item) => !item.id.startsWith('chat-')), ...chatNotifications].sort((a, b) => b.createdAt - a.createdAt).slice(0, 30));
    });
    return () => { orderUnsubscribe(); chatUnsubscribe(); };
  }, []);

  const markNotificationRead = (id: string) => {
    const readKey = `boffinAdminReadNotifications:${auth.currentUser?.uid || 'admin'}`;
    const next = readNotificationIds.includes(id) ? readNotificationIds : [...readNotificationIds, id];
    setReadNotificationIds(next);
    localStorage.setItem(readKey, JSON.stringify(next));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/portal/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/portal/admin/dashboard' },
    { name: 'Live Chat', icon: MessageCircle, path: '/portal/admin/chat' },
    { name: 'Orders', icon: FileText, path: '/portal/admin/orders' },
    { name: 'Students', icon: Users, path: '/portal/admin/dashboard' },
    { name: 'Sitemaps', icon: Map, path: '/portal/admin/sitemaps' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <header className="sticky top-0 z-50 flex w-full flex-wrap items-center gap-x-5 gap-y-3 border-b border-[#b7dcd8] bg-[#eaf7f5] px-5 py-4 shadow-[0_2px_8px_rgba(15,76,84,0.08)] lg:px-6">
        <Link to="/portal/admin/dashboard" className="mr-auto shrink-0">
          <img className="shark-logo max-[414px]:hidden" src="/_redesign/assets/img/logo.svg" alt="BoffinGlobal(TM) Admin" width="190" height="36" />
          <img className="hidden max-[414px]:block" src="/next/img/logos/boffinglobal-small.svg" alt="BoffinGlobal Admin" width="46" height="32" />
        </Link>
        <Link to="/portal/admin/dashboard" className="flex items-center gap-2.5 text-sm font-semibold text-[#0080d1]"><LayoutDashboard size={23} strokeWidth={2.25} /> Dashboard</Link>
        <Link to="/portal/admin/orders" className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 hover:text-[#0080d1]"><FileText size={23} strokeWidth={2.25} /> Orders</Link>
        <Link to="/portal/admin/dashboard" className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 hover:text-[#0080d1]"><Users size={23} strokeWidth={2.25} /> Students</Link>
        <Link to="/portal/admin/chat" className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 hover:text-[#0080d1]"><MessageCircle size={23} strokeWidth={2.25} /> Live Chat</Link>
        <Link to="/portal/admin/sitemaps" className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 hover:text-[#0080d1]"><Map size={23} strokeWidth={2.25} /> Sitemaps</Link>
        <div ref={notificationRef} className="relative border-l border-[#b7dcd8] pl-4">
          <button type="button" onClick={() => setIsNotificationsOpen((open) => !open)} className="relative text-slate-600 hover:text-[#0080d1]" aria-label="View admin notifications" aria-expanded={isNotificationsOpen}><Bell size={22} strokeWidth={2.25} />{notifications.filter((notification) => !readNotificationIds.includes(notification.id)).length > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white">{notifications.filter((notification) => !readNotificationIds.includes(notification.id)).length}</span>}</button>
          {isNotificationsOpen && <div className="absolute right-0 top-full z-50 mt-3 w-80 border border-slate-200 bg-white p-4 shadow-xl"><div className="flex items-center justify-between border-b border-slate-100 pb-3"><h2 className="text-sm font-bold text-slate-900">Admin notifications</h2><button type="button" onClick={() => setIsNotificationsOpen(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-700">Close</button></div>{notifications.length === 0 ? <p className="py-6 text-center text-sm text-slate-500">No operational updates yet.</p> : <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto">{notifications.map((notification) => <button type="button" key={notification.id} onClick={() => markNotificationRead(notification.id)} className={`block w-full py-3 text-left ${!readNotificationIds.includes(notification.id) ? 'bg-sky-50/70' : ''}`}><p className="text-sm font-bold text-slate-800">{notification.title}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{notification.description}</p><p className="mt-1 text-[11px] text-slate-400">{new Date(notification.createdAt).toLocaleString()}</p></button>)}</div>}</div>}
        </div>
        <div className="relative">
          <button type="button" onClick={() => setIsProfileOpen((open) => !open)} className="flex items-center gap-2 border border-slate-200 bg-white px-2 py-1 transition hover:border-[#0080d1]" aria-label="Open admin profile" aria-expanded={isProfileOpen}>
            <span className="flex h-8 w-8 items-center justify-center bg-slate-100 text-[#0080d1]"><UserRound size={18} /></span>
            <span className="hidden text-left sm:block"><span className="block max-w-[150px] truncate text-xs font-semibold text-slate-800">{adminName}</span><span className="block text-[11px] text-slate-500">Administrator</span></span>
          </button>
          {isProfileOpen && <div className="absolute right-0 top-full z-50 mt-2 w-48 border border-slate-200 bg-white p-1 shadow-xl"><p className="border-b border-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">Admin account</p><button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut size={15} /> Sign out</button></div>}
        </div>
      </header>
      <div className="flex flex-1">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} shrink-0 border-r border-slate-200 bg-white transition-all`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          {isSidebarOpen && <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Admin menu</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400">
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        <nav className="space-y-1 p-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#0080d1]"
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center gap-3 border-t border-slate-200 px-4 py-5 text-sm font-semibold text-slate-500 hover:text-red-600"
        >
          <LogOut size={20} />
          {isSidebarOpen && <span>Sign out</span>}
        </button>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto bg-slate-50 p-4 text-slate-900 lg:p-6">
        {children}
      </main>
      </div>
      <footer className="bg-[#132335] px-4 py-6 text-center text-sm text-[#cdcdcd]">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span>© 2011 — 2026, boffinglobalgroup.com. All rights reserved.</span>
          <nav aria-label="Legal links" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-[#cdcdcd]">
            <Link to="/terms" className="transition hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/privacy-policy" className="transition hover:text-white">Privacy Policy</Link>
            <Link to="/revision-refund-policy" className="transition hover:text-white">Refund Policy</Link>
            <Link to="/faq" className="transition hover:text-white">FAQ</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
