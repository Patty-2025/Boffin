import React, { useEffect, useRef, useState } from 'react';
import { Award, Bell, CheckCircle2, ChevronDown, CheckCircle, Clock3, FileText, Headphones, LayoutDashboard, Lock, LogOut, Menu, MessageSquareText, TrendingUp, User, Wallet, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from '../lib/realtimeFirestore';
import { auth } from '../lib/firebase';
import { db } from '../lib/firebase';
import ChangePassword from '../pages/ChangePassword';
import LiveChat from './LiveChat';
import SetupGuide from './SetupGuide';
import { useAuth } from '../context/AuthContext';
import { ensureClientId, fallbackClientId } from '../lib/clientId';
import { onDisconnect, onValue, ref, set } from 'firebase/database';
import { realtimeDb } from '../lib/firebase';

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
  const [unreadNotificationIds, setUnreadNotificationIds] = useState<string[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);
  const [activeSupportChatId, setActiveSupportChatId] = useState<string | null>(null);
  const [clientStats, setClientStats] = useState({ orders: 0, completed: 0, inProgress: 0, pending: 0, cancelled: 0, loyaltyPoints: 0, balance: 0 });
  const [clientProfile, setClientProfile] = useState<{ name?: string; avatar?: string; clientId?: string }>({});
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileName = clientProfile.name || user?.displayName || user?.email?.split('@')[0] || 'Account';
  const displayedClientId = clientProfile.clientId || (user ? fallbackClientId(user.uid) : 'Pending');
  const profileImage = clientProfile.avatar?.startsWith('data:')
    ? clientProfile.avatar
    : clientProfile.avatar
      ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(clientProfile.avatar)}&backgroundColor=eef1f5`
      : user?.photoURL || '/profiles/profile-1.jpg';
  const isEmailVerified = Boolean(user?.emailVerified || (user?.uid && sessionStorage.getItem(`boffinEmailVerified:${user.uid}`)));

  useEffect(() => {
    const closeMenusOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(target)) setIsNotificationsOpen(false);
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) setIsProfileOpen(false);
    };

    document.addEventListener('mousedown', closeMenusOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeMenusOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!user) return;
    let disposed = false;
    let unsubscribeProfile = () => undefined;
    let unsubscribeOrders = () => undefined;
    let unsubscribeCancelledOrders = () => undefined;
    ensureClientId(user).then((clientId) => {
      if (!disposed) setClientProfile((current) => ({ ...current, clientId }));
    }).catch((error) => console.error('Error assigning client ID:', error));
    const initializeRealtimeSync = async () => {
      if (disposed) return;
      unsubscribeProfile = onSnapshot(doc(db, 'studentProfiles', user.uid), (profileSnapshot) => {
        if (profileSnapshot.exists()) {
          const profile = profileSnapshot.data();
          setClientProfile((current) => ({ name: profile.name, avatar: profile.avatar, clientId: profile.clientId || current.clientId }));
          setClientStats((current) => ({ ...current, loyaltyPoints: profile.loyaltyPoints || 0, balance: profile.balance || 0 }));
        }
      }, (error) => console.error('Error syncing client profile:', error));

      const updateOrderStats = (ordersSnapshot: any, cancelledCount: number) => {
        const orders = ordersSnapshot.docs.map((order) => order.data());
        setClientStats((current) => ({
          orders: orders.length,
          completed: orders.filter((order) => order.status === 'completed').length,
          inProgress: orders.filter((order) => (order.status === 'paid' && !order.solutionOffered && !order.solutionDelivered && !order.deliveredAt && !order.deliveryUrl) || order.status === 'in_progress' || order.writerStarted === true).length,
          pending: orders.filter((order) => order.status === 'pending').length,
          cancelled: cancelledCount,
          loyaltyPoints: current.loyaltyPoints,
          balance: current.balance
        }));
      };
      unsubscribeOrders = onSnapshot(query(collection(db, 'orders'), where('userId', '==', user.uid)), (ordersSnapshot) => {
        getDocs(query(collection(db, 'cancelledOrders'), where('userId', '==', user.uid)))
          .then((cancelledSnapshot) => updateOrderStats(ordersSnapshot, cancelledSnapshot.size))
          .catch((error) => console.error('Error loading cancelled order statistics:', error));
      }, (error) => console.error('Error syncing order statistics:', error));
      unsubscribeCancelledOrders = onSnapshot(query(collection(db, 'cancelledOrders'), where('userId', '==', user.uid)), (cancelledSnapshot) => {
        getDocs(query(collection(db, 'orders'), where('userId', '==', user.uid)))
          .then((ordersSnapshot) => updateOrderStats(ordersSnapshot, cancelledSnapshot.size))
          .catch((error) => console.error('Error loading order statistics:', error));
      }, (error) => console.error('Error syncing cancelled statistics:', error));
    };

    initializeRealtimeSync().catch((error) => console.error('Error checking Realtime Database availability:', error));
    return () => {
      disposed = true;
      unsubscribeProfile();
      unsubscribeOrders();
      unsubscribeCancelledOrders();
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const knownMessageIds = new Map<string, Set<string>>();
    let messageUnsubscribers: Array<() => void> = [];
    const chatsUnsubscribe = onSnapshot(query(collection(db, 'chats'), where('userId', '==', user.uid)), (snapshot) => {
      messageUnsubscribers.forEach((unsubscribe) => unsubscribe());
      messageUnsubscribers = snapshot.docs.map((chatDocument: any) => {
        const chatId = chatDocument.id;
        if (!knownMessageIds.has(chatId)) knownMessageIds.set(chatId, new Set());
        let initialized = false;
        return onSnapshot(query(collection(db, `chats/${chatId}/messages`), orderBy('createdAt', 'asc')), (messageSnapshot) => {
          const messages = messageSnapshot.docs.map((messageDocument: any) => ({ id: messageDocument.id, ...messageDocument.data() }));
          const knownIds = knownMessageIds.get(chatId)!;
          const hasNewSupportMessage = initialized && messages.some((message: any) => message.senderRole === 'support' && !knownIds.has(message.id));
          messages.forEach((message: any) => knownIds.add(message.id));
          initialized = true;
          if (hasNewSupportMessage) {
            setActiveSupportChatId(chatId);
            setIsSupportChatOpen(true);
          }
        });
      });
    });
    return () => {
      chatsUnsubscribe();
      messageUnsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const presenceRef = ref(realtimeDb, `clientPresence/${user.uid}`);
    const connectedRef = ref(realtimeDb, '.info/connected');
    const unsubscribe = onValue(connectedRef, async (snapshot) => {
      if (snapshot.val() !== true) return;
      await onDisconnect(presenceRef).set({ online: false, updatedAt: Date.now() });
      await set(presenceRef, { online: true, updatedAt: Date.now() });
    });
    return () => {
      unsubscribe();
      void set(presenceRef, { online: false, updatedAt: Date.now() });
    };
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (location.pathname === '/portal/track' && params.get('chat') === 'open') {
      setIsSupportChatOpen(true);
    }
  }, [location.pathname, location.search]);

  const guardedLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isEmailVerified) {
      event.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    if (user?.uid) sessionStorage.removeItem(`boffinSetupGuideDismissed:${user.uid}`);
    await signOut(auth);
    navigate('/login');
  };

  const loadNotifications = async () => {
    if (!user) return;
    setNotificationsLoading(true);
    try {
      const [notificationSnapshot, orderSnapshot] = await Promise.all([
        getDocs(collection(db, `notifications/${user.uid}`)),
        getDocs(query(collection(db, 'orders'), where('userId', '==', user.uid)))
      ]);
      const activity: PortalNotification[] = [];
      notificationSnapshot.docs.forEach((notificationDocument) => {
        const notification = notificationDocument.data();
        activity.push({
          id: notificationDocument.id,
          title: notification.title || 'Account update',
          description: notification.description || '',
          createdAt: Number(notification.createdAt) || 0
        });
      });
      orderSnapshot.docs.forEach((orderDocument) => {
        const order = orderDocument.data();
        const orderLabel = `Order #${orderDocument.id.slice(-8).toUpperCase()}`;
        const createdAt = typeof order.createdAt === 'number'
          ? order.createdAt
          : order.createdAt?.toDate?.()?.getTime() || Number(order.createdAt) || 0;
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
      const nextNotifications = activity.sort((first, second) => second.createdAt - first.createdAt).slice(0, 20);
      const readStorageKey = `boffinReadNotifications:${user.uid}`;
      const readIds = JSON.parse(localStorage.getItem(readStorageKey) || '[]') as string[];
      setNotifications(nextNotifications);
      setUnreadNotificationIds(nextNotifications.filter((notification) => !readIds.includes(notification.id)).map((notification) => notification.id));
    } catch (error) {
      console.error('Error loading notifications:', error);
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  };

  useEffect(() => {
    if (user) void loadNotifications();
  }, [user]);

  const toggleNotifications = () => {
    const nextOpen = !isNotificationsOpen;
    setIsNotificationsOpen(nextOpen);
    if (nextOpen) loadNotifications();
  };

  const markNotificationAsRead = (notificationId: string) => {
    if (!user) return;
    const readStorageKey = `boffinReadNotifications:${user.uid}`;
    const readIds = JSON.parse(localStorage.getItem(readStorageKey) || '[]') as string[];
    if (!readIds.includes(notificationId)) {
      localStorage.setItem(readStorageKey, JSON.stringify([...readIds, notificationId]));
    }
    setUnreadNotificationIds((currentIds) => currentIds.filter((id) => id !== notificationId));
  };

  const mobileItems = [
    { label: 'Dashboard', to: '/portal/dashboard', icon: LayoutDashboard },
    { label: 'Orders', to: '/portal/assignments', icon: FileText },
    { label: 'Balance', to: '/portal/finances', icon: Wallet },
    { label: 'Loyalty Points', to: '/portal/loyalty', icon: Award },
    { label: 'Support', to: '/contact-us', icon: MessageSquareText },
    { label: 'Profile', to: '/portal/profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/portal/dashboard') {
      return location.pathname === path || location.pathname === '/dashboard';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex flex-col bg-slate-50 text-slate-800">
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
              <Link to="/portal/place-order" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg bg-[#f47321] px-3 py-2 text-sm font-extrabold text-white">New order</Link>
              <button type="button" onClick={() => setIsChangePasswordOpen(true)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700"><Lock size={17} />Change Password</button>
              <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600"><LogOut size={17} />Sign out</button>
            </div>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 flex w-full flex-wrap items-center gap-x-5 gap-y-3 border-b border-[#b7dcd8] bg-[#eaf7f5] px-5 py-4 shadow-[0_2px_8px_rgba(15,76,84,0.08)] lg:px-6">
        <Link to="/portal/dashboard" className="mr-auto shrink-0">
          <img className="shark-logo max-[414px]:hidden" src="/_redesign/assets/img/logo.svg" alt="BoffinGlobal(TM)" width="190" height="36" />
          <img className="hidden max-[414px]:block" src="/next/img/logos/boffinglobal-small.svg" alt="BoffinGlobal" width="46" height="32" />
        </Link>
        <Link to="/portal/dashboard" title="Dashboard" aria-label="Dashboard" className={`flex items-center gap-2.5 text-sm font-semibold ${isActive('/portal/dashboard') ? 'text-[#0080d1]' : 'text-slate-600 hover:text-[#0080d1]'}`}><LayoutDashboard size={23} strokeWidth={2.25} /> Dashboard</Link>
        <Link to="/portal/track" className={`flex items-center gap-2.5 text-sm font-semibold ${isActive('/portal/track') ? 'text-[#0080d1]' : 'text-slate-600 hover:text-[#0080d1]'}`}><FileText size={23} strokeWidth={2.25} /> Track your order</Link>
        <Link to="/portal/place-order" className="rounded-full border border-[#0080d1] px-5 py-2.5 text-sm font-extrabold text-[#0080d1] transition hover:bg-[#0080d1] hover:text-white">Place your order</Link>
        <Link to="/portal/finances" className={`flex items-center gap-2.5 text-sm font-semibold ${isActive('/portal/finances') ? 'text-[#0080d1]' : 'text-slate-600 hover:text-[#0080d1]'}`}><Wallet size={23} strokeWidth={2.25} /> Balance</Link>
        <Link to="/portal/completed" className={`flex items-center gap-2.5 text-sm font-semibold ${isActive('/portal/completed') ? 'text-[#0080d1]' : 'text-slate-600 hover:text-[#0080d1]'}`}><CheckCircle size={23} strokeWidth={2.25} /> Completed solution</Link>
        <Link to="/portal/loyalty" className={`flex items-center gap-2.5 text-sm font-semibold ${isActive('/portal/loyalty') ? 'text-[#0080d1]' : 'text-slate-600 hover:text-[#0080d1]'}`}><Award size={23} strokeWidth={2.25} /> Loyalty Points</Link>
        <div ref={notificationMenuRef} className="relative">
          <button type="button" onClick={toggleNotifications} className={`relative rounded-lg border p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 ${isNotificationsOpen ? 'border-[#0080d1] text-[#0080d1]' : 'border-slate-200'}`} aria-label={unreadNotificationIds.length > 0 ? `${unreadNotificationIds.length} unread notifications` : 'Notifications'} aria-expanded={isNotificationsOpen} aria-haspopup="dialog"><Bell size={18} />{unreadNotificationIds.length > 0 && <span className="absolute -right-2 -top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white">{unreadNotificationIds.length > 99 ? '99+' : unreadNotificationIds.length}</span>}</button>
          {isNotificationsOpen && <div className="absolute right-0 top-full z-50 mt-3 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl"><div className="flex items-center justify-between border-b border-slate-100 pb-3"><h2 className="text-sm font-bold text-slate-900">Notifications</h2><button type="button" onClick={() => setIsNotificationsOpen(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-700">Close</button></div>{notificationsLoading ? <div className="py-7 text-center text-sm text-slate-500">Loading activity...</div> : notifications.length === 0 ? <div className="py-7 text-center"><Bell size={22} className="mx-auto text-slate-300" /><p className="mt-2 text-sm font-semibold text-slate-700">No activity yet</p><p className="mt-1 text-xs text-slate-500">Updates about your orders will appear here.</p></div> : <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto">{notifications.map((notification) => { const isUnread = unreadNotificationIds.includes(notification.id); return <button type="button" key={notification.id} onClick={() => markNotificationAsRead(notification.id)} className={`block w-full py-3 text-left first:pt-1 ${isUnread ? 'bg-red-50/60' : ''}`}><p className="text-sm font-bold text-slate-800">{notification.title}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{notification.description}</p><p className="mt-1 text-[11px] text-slate-400">{notification.createdAt ? new Date(notification.createdAt).toLocaleString() : 'Recently'}</p></button>; })}</div>}</div>}
        </div>
        <div ref={profileMenuRef} className="relative">
          <button type="button" onClick={() => setIsProfileOpen((open) => !open)} className="flex items-center gap-2 border border-slate-200 bg-white px-2 py-1 transition hover:border-[#0080d1]" aria-label="Open account menu" aria-expanded={isProfileOpen}><img src={profileImage} alt={profileName} className="h-8 w-8 object-cover" /><span className="text-left"><span className="block max-w-[120px] truncate text-xs font-semibold text-slate-800">{profileName}</span><span className="block text-[11px] text-slate-500">Client ID: {displayedClientId}</span></span><ChevronDown size={14} className="text-slate-500" /></button>
          {isProfileOpen && <div className="absolute right-0 top-full z-50 mt-2 w-48 border border-slate-200 bg-white p-1 shadow-xl"><button type="button" onClick={() => { setIsProfileOpen(false); setIsChangePasswordOpen(true); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"><Lock size={15} /> Password reset</button><Link to="/portal/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><User size={15} /> My profile</Link><Link to="/portal/finances" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Wallet size={15} /> Balance</Link><button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut size={15} /> Sign out</button></div>}
        </div>
        <button type="button" onClick={() => setIsMobileMenuOpen(true)} className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-700 xl:hidden" aria-label="Open menu"><Menu size={20} /></button>
      </nav>

      <div className="flex w-full flex-1">
        <aside className="hidden min-h-full w-60 shrink-0 bg-[#eaf7f5] lg:block">
          <div className="mx-2 flex items-center gap-4 bg-[#f1f1f1] px-3 py-2">
            <img src={profileImage} alt={clientProfile.name || profileName} className="h-20 w-20 object-cover" />
            <div className="min-w-0 text-sm leading-5 text-slate-900"><p className="truncate font-medium">{clientProfile.name || profileName}</p><p className="whitespace-nowrap text-xs">User Id : {displayedClientId}</p><Link to="/portal/profile" className="mt-1 block text-xs font-bold text-[#0080d1] hover:text-[#004695]">View my profile</Link></div>
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
              <div className="flex items-center justify-between bg-slate-50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-slate-600"><X size={15} /> Cancelled</span><strong>{clientStats.cancelled}</strong></div>
              <div className="flex items-center justify-between bg-slate-50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-slate-600"><Wallet size={15} /> Wallet</span><strong>${clientStats.balance.toFixed(2)}</strong></div>
              <button
                type="button"
                onClick={() => setIsSupportChatOpen(true)}
                className="flex w-full items-center justify-center gap-2 bg-[#13bdb0] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#0fa99d]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-white/10">
                  <MessageSquareText size={13} className="stroke-[2.2]" />
                </span>
                Live Chat Support
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
        <main className="mx-auto w-full max-w-[1400px] px-4 py-8 lg:px-6 lg:py-0">{children}</main>
        </div>
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

      <SetupGuide
        userId={user?.uid}
        profile={clientProfile}
        hasOrders={clientStats.orders > 0}
        hasCompletedOrder={clientStats.completed > 0}
        isEmailVerified={isEmailVerified}
      />
      <ChangePassword isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
      <LiveChat open={isSupportChatOpen} onOpenChange={setIsSupportChatOpen} activeChatId={activeSupportChatId} />
    </div>
  );
}
