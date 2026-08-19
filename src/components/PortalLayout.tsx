import React, { useEffect, useState } from 'react';
import { Award, Bell, CheckCircle2, ChevronDown, CheckCircle, Clock3, FileText, Headphones, Lock, LogOut, Menu, TrendingUp, User, Wallet, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { auth } from '../lib/firebase';
import { db } from '../lib/firebase';
import ChangePassword from '../pages/ChangePassword';
import LiveChat from './LiveChat';
import { useAuth } from '../context/AuthContext';

interface PortalNotification {
  id: string;
  title: string;
  description: string;
  createdAt: number;
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<PortalNotification[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);
  const [clientStats, setClientStats] = useState({ orders: 0, completed: 0, inProgress: 0, pending: 0, loyaltyPoints: 0, balance: 0 });
  const [clientProfile, setClientProfile] = useState<{ name?: string; avatar?: string }>({});
  const profileName = user?.displayName || user?.email?.split('@')[0] || 'Account';
  const isEmailVerified = Boolean(user?.emailVerified || (user?.uid && sessionStorage.getItem(`boffinEmailVerified:${user.uid}`)));

  useEffect(() => {
    if (!user) return;
    const unsubscribeProfile = onSnapshot(doc(db, 'studentProfiles', user.uid), (profileSnapshot) => {
      if (profileSnapshot.exists()) {
        const profile = profileSnapshot.data();
        setClientProfile({ name: profile.name, avatar: profile.avatar });
        setClientStats((current) => ({ ...current, loyaltyPoints: profile.loyaltyPoints || 0, balance: profile.balance || 0 }));
      }
    }, (error) => console.error('Error syncing client profile:', error));

    getDocs(query(collection(db, 'orders'), where('userId', '==', user.uid))).then((snapshot) => {
      const orders = snapshot.docs.map((order) => order.data());
      setClientStats((current) => ({
        orders: orders.length,
        completed: orders.filter((order) => order.status === 'completed').length,
        inProgress: orders.filter((order) => order.status === 'in_progress' || order.writerStarted === true).length,
        pending: orders.filter((order) => order.status === 'pending').length,
        loyaltyPoints: current.loyaltyPoints,
        balance: current.balance
      }));
    }).catch((error) => console.error('Error loading client statistics:', error));

    return unsubscribeProfile;
  }, [user]);

  const guardedLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isEmailVerified) {
      event.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const loadNotifications = async () => {
    if (!user) return;
    setNotificationsLoading(true);
    try {
      const snapshot = await getDocs(query(collection(db, 'orders'), where('userId', '==', user.uid)));
      const activity: PortalNotification[] = [];
      snapshot.docs.forEach((orderDocument) => {
        const order = orderDocument.data();
        const orderLabel = `Order #${orderDocument.id.slice(-8).toUpperCase()}`;
        const createdAt = order.createdAt?.toDate?.()?.getTime() || 0;
        activity.push({ id: `${orderDocument.id}-placed`, title: 'Order placed', description: `${orderLabel} was received.`, createdAt });

        if (order.status === 'paid') {
          activity.push({ id: `${orderDocument.id}-paid`, title: 'Payment completed', description: `${orderLabel} payment was completed.`, createdAt: createdAt + 1 });
        }
        if (order.status === 'pending') {
          activity.push({ id: `${orderDocument.id}-pending`, title: 'Payment pending', description: `${orderLabel} is waiting for payment.`, createdAt: createdAt + 1 });
        }
        if (order.status === 'in_progress' || order.writerStarted === true) {
          activity.push({ id: `${orderDocument.id}-started`, title: 'Writer started working', description: `${orderLabel} is now in progress.`, createdAt: createdAt + 2 });
        }
        if (order.status === 'completed') {
          activity.push({ id: `${orderDocument.id}-completed`, title: 'Assignment completed', description: `${orderLabel} is ready to review.`, createdAt: createdAt + 3 });
        }
      });
      setNotifications(activity.sort((first, second) => second.createdAt - first.createdAt).slice(0, 20));
    } catch (error) {
      console.error('Error loading notifications:', error);
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  };

  const toggleNotifications = () => {
    const nextOpen = !isNotificationsOpen;
    setIsNotificationsOpen(nextOpen);
    if (nextOpen) loadNotifications();
  };

  const mobileItems = [
    { label: 'Orders', to: '/portal/assignments', icon: FileText },
    { label: 'Balance', to: '/portal/finances', icon: Wallet },
    { label: 'Loyalty Points', to: '/portal/loyalty', icon: Award },
    { label: 'Support', to: '/contact-us', icon: Headphones },
    { label: 'Profile', to: '/portal/profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/portal/dashboard') {
      return location.pathname === path || location.pathname === '/dashboard';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <header className="header-v2 sticky top-0 z-50 border-b border-[#cbd8e6] bg-[#f4f7fa]">
        <div className="relative flex min-h-[72px] w-full items-center px-4 lg:px-6">
          <Link to="/portal/dashboard" className="shrink-0">
            <img className="shark-logo max-[414px]:hidden" src="/_redesign/assets/img/logo.svg" alt="BoffinGlobal(TM)" width="190" height="36" />
            <img className="hidden max-[414px]:block" src="/next/img/logos/boffinglobal-small.svg" alt="BoffinGlobal" width="46" height="32" />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:flex">
            <Link to="/#how-it-works" className="whitespace-nowrap text-sm font-bold tracking-wide text-slate-500 transition hover:text-blue-500">How it works</Link>
            <Link to="/reviews" onClick={guardedLink} className="whitespace-nowrap text-sm font-bold tracking-wide text-slate-500 transition hover:text-blue-500">Latest reviews</Link>
            <Link to="/writers" onClick={guardedLink} className="whitespace-nowrap text-sm font-bold tracking-wide text-slate-500 transition hover:text-blue-500">Top writers</Link>
            <Link to="/faq" onClick={guardedLink} className="whitespace-nowrap text-sm font-bold tracking-wide text-slate-500 transition hover:text-blue-500">FAQ</Link>
            <Link to="/blog" onClick={guardedLink} className="whitespace-nowrap text-sm font-bold tracking-wide text-slate-500 transition hover:text-blue-500">Blog</Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-3 lg:flex">
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleNotifications}
                  className={`rounded-lg border p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 ${isNotificationsOpen ? 'border-[#0080d1] text-[#0080d1]' : 'border-slate-200'}`}
                  aria-label="Notifications"
                  aria-expanded={isNotificationsOpen}
                  aria-haspopup="dialog"
                >
                  <Bell size={18} />
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
                      <button type="button" onClick={() => setIsNotificationsOpen(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-700">Close</button>
                    </div>
                    {notificationsLoading ? <div className="py-7 text-center text-sm text-slate-500">Loading activity...</div> : notifications.length === 0 ? (
                      <div className="py-7 text-center"><Bell size={22} className="mx-auto text-slate-300" /><p className="mt-2 text-sm font-semibold text-slate-700">No activity yet</p><p className="mt-1 text-xs text-slate-500">Updates about your orders will appear here.</p></div>
                    ) : (
                      <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
                        {notifications.map((notification) => <div key={notification.id} className="py-3 first:pt-1"><p className="text-sm font-bold text-slate-800">{notification.title}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{notification.description}</p><p className="mt-1 text-[11px] text-slate-400">{notification.createdAt ? new Date(notification.createdAt).toLocaleString() : 'Recently'}</p></div>)}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <button type="button" onClick={() => setIsProfileOpen((open) => !open)} className="flex items-center gap-2 border border-slate-200 bg-white px-2 py-1 transition hover:border-[#0080d1]" aria-label="Open account menu" aria-expanded={isProfileOpen}>
                  <img src={user?.photoURL || '/profiles/profile-1.jpg'} alt={profileName} className="h-8 w-8 object-cover" />
                  <span className="text-left"><span className="block max-w-[120px] truncate text-xs font-semibold text-slate-800">{profileName}</span><span className="block text-[11px] text-slate-500">Client ID: {user?.uid.slice(-8).toUpperCase() || 'Pending'}</span></span>
                  <ChevronDown size={14} className="text-slate-500" />
                </button>
                {isProfileOpen && <div className="absolute right-0 top-full z-50 mt-2 w-48 border border-slate-200 bg-white p-1 shadow-xl">
                  <button type="button" onClick={() => { setIsProfileOpen(false); setIsChangePasswordOpen(true); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"><Lock size={15} /> Password reset</button>
                  <Link to="/portal/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><User size={15} /> My profile</Link>
                  <Link to="/portal/finances" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Wallet size={15} /> Balance</Link>
                  <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut size={15} /> Sign out</button>
                </div>}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-700 xl:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 xl:hidden">
          <div className="h-full w-[85%] max-w-sm bg-white p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080d1] to-[#10b981] text-sm font-black text-white">
                  B
                </div>
                <span className="text-lg font-black text-slate-900">Boffin</span>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg border border-slate-200 p-2"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {mobileItems.map((item) => {
                const Icon = item.icon;
                if (item.label === 'Support') {
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => { setIsMobileMenuOpen(false); setIsSupportChatOpen(true); }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#0080d1]"
                    >
                      <Icon size={17} />
                      {item.label}
                    </button>
                  );
                }
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        isActive ? 'bg-slate-100 text-[#0080d1]' : 'text-slate-700 hover:bg-slate-50 hover:text-[#0080d1]'
                      }`
                    }
                  >
                    <Icon size={17} />
                    {item.label}
                  </NavLink>
                );
              })}
              <Link to="/order" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg bg-[#f47321] px-3 py-2 text-sm font-extrabold text-white">New order</Link>
              <button type="button" onClick={() => setIsChangePasswordOpen(true)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700"><Lock size={17} />Change Password</button>
              <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600"><LogOut size={17} />Sign out</button>
            </div>
          </div>
        </div>
      )}

      <nav className="flex w-full flex-wrap items-center justify-end gap-x-5 gap-y-3 border-b border-[#b7dcd8] bg-[#eaf7f5] px-5 py-4 shadow-[0_2px_8px_rgba(15,76,84,0.08)] lg:px-6">
        <Link to="/portal/track" className={`flex items-center gap-2.5 text-sm font-semibold ${isActive('/portal/track') ? 'text-[#0080d1]' : 'text-slate-600 hover:text-[#0080d1]'}`}><FileText size={23} strokeWidth={2.25} /> Track your order</Link>
        <Link to="/dashboard?newOrder=1" className="rounded-full border border-[#0080d1] px-5 py-2.5 text-sm font-extrabold text-[#0080d1] transition hover:bg-[#0080d1] hover:text-white">Place your order</Link>
        <Link to="/portal/finances" className={`flex items-center gap-2.5 text-sm font-semibold ${isActive('/portal/finances') ? 'text-[#0080d1]' : 'text-slate-600 hover:text-[#0080d1]'}`}><Wallet size={23} strokeWidth={2.25} /> Balance</Link>
        <Link to="/portal/completed" className={`flex items-center gap-2.5 text-sm font-semibold ${isActive('/portal/completed') ? 'text-[#0080d1]' : 'text-slate-600 hover:text-[#0080d1]'}`}><CheckCircle size={23} strokeWidth={2.25} /> Completed solution</Link>
        <Link to="/portal/loyalty" className={`flex items-center gap-2.5 text-sm font-semibold ${isActive('/portal/loyalty') ? 'text-[#0080d1]' : 'text-slate-600 hover:text-[#0080d1]'}`}><Award size={23} strokeWidth={2.25} /> Loyalty Points</Link>
        <button type="button" onClick={() => setIsSupportChatOpen(true)} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 hover:text-[#0080d1]"><Headphones size={23} strokeWidth={2.25} /> Support</button>
        <Link to="/portal/profile" className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 hover:text-[#0080d1]"><User size={23} strokeWidth={2.25} /> Profile</Link>
      </nav>

      <div className="flex w-full flex-1">
        <aside className="hidden min-h-full w-60 shrink-0 bg-[#eaf7f5] lg:block">
          <div className="mx-2 flex items-center gap-4 bg-[#f1f1f1] px-3 py-2">
            <img src={clientProfile.avatar?.startsWith('data:') ? clientProfile.avatar : user?.photoURL || '/profiles/profile-1.jpg'} alt={clientProfile.name || profileName} className="h-20 w-20 object-cover" />
            <div className="min-w-0 text-sm leading-5 text-slate-900"><p className="truncate font-medium">{clientProfile.name || profileName}</p><p className="whitespace-nowrap text-xs">User Id : {user?.uid.slice(-8).toUpperCase() || 'Pending'}</p><Link to="/portal/profile" className="mt-1 block text-xs font-bold text-[#0080d1] hover:text-[#004695]">View my profile</Link></div>
          </div>
          <div className="border-t border-[#b7dcd8] bg-[#eaf7f5] p-4">
            <div className="space-y-2">
              <Link to="/portal/loyalty" className="block bg-[#13bdb0] px-3 py-3 text-center text-white transition hover:bg-[#0fa99d]">
                <strong className="block text-xl font-bold leading-6">LP = {clientStats.loyaltyPoints} points</strong>
              </Link>
              <Link to="/portal/resources" className="flex items-center justify-center bg-[#13bdb0] px-3 py-2 text-center text-xl font-bold leading-6 text-white transition hover:bg-[#0fa99d]">
                Writing Guide
              </Link>
            </div>
            <h2 className="mt-5 text-sm font-bold text-[#174b54]">My client statistics</h2>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between bg-slate-50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-slate-600"><FileText size={15} /> Orders</span><strong>{clientStats.orders}</strong></div>
              <div className="flex items-center justify-between bg-slate-50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-slate-600"><Clock3 size={15} /> In progress</span><strong>{clientStats.inProgress}</strong></div>
              <div className="flex items-center justify-between bg-slate-50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-slate-600"><CheckCircle2 size={15} /> Completed</span><strong>{clientStats.completed}</strong></div>
              <div className="flex items-center justify-between bg-slate-50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-slate-600"><TrendingUp size={15} /> Pending</span><strong>{clientStats.pending}</strong></div>
              <div className="flex items-center justify-between bg-slate-50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-slate-600"><Wallet size={15} /> Wallet</span><strong>${clientStats.balance.toFixed(2)}</strong></div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
        <main className="mx-auto w-full max-w-[1400px] px-4 py-8 lg:px-6">{children}</main>
        </div>
      </div>

      <footer className="bg-[#132335] px-4 py-6 text-center text-sm text-[#cdcdcd]">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span>© 2011 — 2026, BoffinGlobal.com. All rights reserved.</span>
          <nav aria-label="Legal links" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-[#cdcdcd]">
          <Link to="/terms" className="transition hover:text-white">Terms &amp; Conditions</Link>
          <Link to="/privacy-policy" className="transition hover:text-white">Privacy Policy</Link>
          <Link to="/revision-refund-policy" className="transition hover:text-white">Refund Policy</Link>
          <Link to="/faq" className="transition hover:text-white">FAQ</Link>
          </nav>
        </div>
      </footer>

      <ChangePassword isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
      <LiveChat open={isSupportChatOpen} onOpenChange={setIsSupportChatOpen} />
    </div>
  );
}
