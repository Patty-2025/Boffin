import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc, doc, getDoc, updateDoc } from '../lib/realtimeFirestore';
import { MessageCircle, User, LogIn, Send, Search, CheckCheck, Paperclip, MoreVertical, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playChatNotificationSound } from '../lib/chatSound';

interface Chat {
  id: string;
  userId: string;
  orderId?: string;
  status: string;
  agentStatus?: string;
  agentId?: string;
  createdAt: string;
}

interface ClientChatDetails {
  clientId?: string;
  name?: string;
  avatar?: string;
  online: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderRole: 'user' | 'support' | 'system';
  content: string;
  createdAt: any;
}

export default function AdminChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isEndConfirmationOpen, setIsEndConfirmationOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientDetails, setClientDetails] = useState<Record<string, ClientChatDetails>>({});
  const navigate = useNavigate();
  const knownClientMessageIds = React.useRef<Set<string>>(new Set());
  const hasLoadedMessages = React.useRef(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!auth.currentUser) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      try {
        const adminDoc = await getDoc(doc(db, 'admins', auth.currentUser.uid));
        setIsAdmin(adminDoc.exists());
      } catch (e) {
        setIsAdmin(false);
      }
      setIsLoading(false);
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'chats'), where('status', '==', 'active'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Chat[];
      setChats(chatsData);
      setClientDetails((current) => Object.fromEntries(chatsData.map((chat) => [chat.userId, current[chat.userId] || { online: false }])));
    }, (error) => {
      console.warn("Firestore chats snapshot info:", error.message);
    });
    return () => unsubscribe();
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin || chats.length === 0) return;
    const unsubscribers = chats.flatMap((chat) => {
      const userUnsubscribe = onSnapshot(doc(db, 'users', chat.userId), (snapshot) => {
        const profile = snapshot.exists() ? snapshot.data() : {};
        setClientDetails((current) => ({ ...current, [chat.userId]: { ...current[chat.userId], clientId: profile.clientId, online: current[chat.userId]?.online || false } }));
      });
      const profileUnsubscribe = onSnapshot(doc(db, 'studentProfiles', chat.userId), (snapshot) => {
        const profile = snapshot.exists() ? snapshot.data() : {};
        setClientDetails((current) => ({ ...current, [chat.userId]: { ...current[chat.userId], clientId: current[chat.userId]?.clientId || profile.clientId, name: profile.name, avatar: profile.avatar, online: current[chat.userId]?.online || false } }));
      });
      const presenceUnsubscribe = onSnapshot(doc(db, 'clientPresence', chat.userId), (snapshot) => {
        setClientDetails((current) => ({ ...current, [chat.userId]: { ...current[chat.userId], online: Boolean(snapshot.exists() && snapshot.data()?.online) } }));
      });
      return [userUnsubscribe, profileUnsubscribe, presenceUnsubscribe];
    });
    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, [isAdmin, chats]);

  useEffect(() => {
    if (!selectedChat) return;
    knownClientMessageIds.current = new Set();
    hasLoadedMessages.current = false;

    const messagesRef = collection(db, `chats/${selectedChat}/messages`);
    const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      const clientMessages = msgs.filter((message) => message.senderRole === 'user');
      if (hasLoadedMessages.current && clientMessages.some((message) => !knownClientMessageIds.current.has(message.id))) {
        playChatNotificationSound();
      }
      clientMessages.forEach((message) => knownClientMessageIds.current.add(message.id));
      hasLoadedMessages.current = true;
      setMessages(msgs);
    }, (error) => {
      console.warn("Firestore messages snapshot info:", error.message);
    });
    return () => unsubscribe();
  }, [selectedChat]);

  const selectChat = async (chat: Chat) => {
    setSelectedChat(chat.id);
    setIsEndConfirmationOpen(false);
    if (auth.currentUser && chat.agentId !== auth.currentUser.uid) {
      await updateDoc(doc(db, 'chats', chat.id), {
        agentId: auth.currentUser.uid,
        agentName: auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || 'Support agent',
        agentAvatar: auth.currentUser.photoURL || null,
        agentStatus: 'joined',
        updatedAt: new Date().toISOString()
      });
    }
  };

  const endConversation = async () => {
    if (!activeChat) return;
    setIsEndConfirmationOpen(false);
    await updateDoc(doc(db, 'chats', activeChat.id), { status: 'closed', updatedAt: new Date().toISOString() });
    setSelectedChat(null);
    setMessages([]);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat || !auth.currentUser) return;

    await addDoc(collection(db, `chats/${selectedChat}/messages`), {
      chatId: selectedChat,
      senderId: auth.currentUser.uid,
      senderRole: 'support',
      content: newMessage.trim(),
      createdAt: new Date().toISOString()
    });
    setNewMessage('');
  };

  const formatMessageTime = (value: any) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' : date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const activeChat = chats.find((chat) => chat.id === selectedChat);
  const activeClientDetails = activeChat ? clientDetails[activeChat.userId] : undefined;
  const getAvatarSource = (avatar?: string) => {
    if (!avatar) return '/profiles/profile-1.jpg';
    if (avatar.startsWith('data:') || avatar.startsWith('http://') || avatar.startsWith('https://') || avatar.startsWith('/')) return avatar;
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatar)}&backgroundColor=eef1f5`;
  };
  const handleAvatarError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = '/profiles/profile-1.jpg';
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!auth.currentUser) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h2 className="text-xl font-bold">Please log in to access Admin Chat</h2>
        <button 
          onClick={() => navigate('/login?redirect=/admin/chat')} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <LogIn size={20} /> Login
        </button>
      </div>
    );
  }

  if (!isAdmin) return <div className="p-8 text-center">Access Denied: You are not authorized to view admin chat.</div>;

  return (
    <div className="flex h-[calc(100vh-10rem)] min-h-0 overflow-hidden border border-slate-200 bg-white shadow-sm">
      <aside className="flex min-h-0 w-full max-w-[320px] flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between"><div><h1 className="text-lg font-black text-slate-900">Messages</h1><p className="mt-0.5 text-xs text-slate-500">{chats.length} active conversation{chats.length === 1 ? '' : 's'}</p></div><button type="button" aria-label="Chat options" className="text-slate-400 hover:text-slate-700"><MoreVertical size={19} /></button></div>
          <label className="relative mt-4 block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input aria-label="Search conversations" placeholder="Search conversations" className="w-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#0080d1]" /></label>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {chats.length === 0 && <div className="px-5 py-12 text-center text-sm text-slate-500"><MessageCircle size={28} className="mx-auto mb-2 text-slate-300" />No active chats</div>}
          {chats.map((chat) => { const details = clientDetails[chat.userId]; const avatarSource = getAvatarSource(details?.avatar); return <button type="button" key={chat.id} onClick={() => void selectChat(chat)} className={`flex w-full items-center gap-3 border-b border-slate-100 px-4 py-4 text-left transition ${selectedChat === chat.id ? 'bg-sky-50' : 'hover:bg-slate-50'}`}><span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden bg-[#dff3ef] text-[#087f79]"><img src={avatarSource} alt="" onError={handleAvatarError} className="h-full w-full object-cover" /><span className={`absolute bottom-0 right-0 h-3 w-3 border-2 border-white ${details?.online ? 'bg-emerald-500' : 'bg-slate-400'}`} /></span><span className="min-w-0 flex-1"><strong className="block truncate text-sm text-slate-800">{details?.name || `Client ${details?.clientId || '...'}`}</strong><span className="mt-1 block truncate text-xs text-slate-500">Client ID: {details?.clientId || 'Loading...'}</span><span className={`mt-1 block text-[11px] font-semibold ${details?.online ? 'text-emerald-600' : 'text-slate-400'}`}>{details?.online ? 'Online' : 'Offline'}</span></span></button>; })}
        </div>
      </aside>
      <section className="relative flex min-w-0 flex-1 flex-col bg-[#f4f9f8]">
        {selectedChat && activeChat ? <>
          <header className="flex items-center justify-between border-b border-[#d7e8e5] bg-white px-5 py-3.5"><div className="flex items-center gap-3"><span className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-[#dff3ef] text-[#087f79]"><img src={getAvatarSource(activeClientDetails?.avatar)} alt="" onError={handleAvatarError} className="h-full w-full object-cover" /><span className={`absolute bottom-0 right-0 h-3 w-3 border-2 border-white ${activeClientDetails?.online ? 'bg-emerald-500' : 'bg-slate-400'}`} /></span><div><h2 className="text-sm font-black text-slate-900">{activeClientDetails?.name || `Client ${activeClientDetails?.clientId || '...'}`}</h2><p className="mt-0.5 text-xs text-slate-500">Client ID: {activeClientDetails?.clientId || 'Loading...'} <span className="mx-1">•</span><span className={activeClientDetails?.online ? 'font-semibold text-emerald-600' : 'text-slate-400'}>{activeClientDetails?.online ? 'Online' : 'Offline'}</span></p><p className="mt-0.5 text-[11px] font-semibold text-[#087f79]">24/7 support</p></div></div><div className="flex items-center gap-2"><button type="button" onClick={() => setIsEndConfirmationOpen(true)} className="flex items-center gap-1 border border-red-200 px-2 py-1.5 text-[11px] font-bold text-red-600 hover:bg-red-50" aria-label="End conversation"><XCircle size={15} /> End</button><button type="button" aria-label="Conversation options" className="text-slate-400 hover:text-slate-700"><MoreVertical size={19} /></button></div></header>
          {isEndConfirmationOpen && <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/20 p-5"><div role="dialog" aria-modal="true" aria-labelledby="admin-end-conversation-title" className="w-full max-w-sm border border-slate-200 bg-white p-5 text-center shadow-xl"><h3 id="admin-end-conversation-title" className="text-base font-bold text-slate-900">End this conversation?</h3><p className="mt-2 text-sm leading-relaxed text-slate-500">The client will no longer be able to send messages in this chat.</p><div className="mt-5 flex gap-2"><button type="button" onClick={() => setIsEndConfirmationOpen(false)} className="flex-1 border border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:border-slate-500 hover:text-slate-800">Cancel</button><button type="button" onClick={() => void endConversation()} className="flex-1 bg-red-600 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-red-700">End conversation</button></div></div></div>}
          <div className="flex-1 space-y-3 overflow-y-auto p-5"><div className="mx-auto mb-5 flex max-w-md items-center justify-center gap-2 text-center text-[11px] text-slate-400"><span className="h-px flex-1 bg-[#d7e8e5]" /><span>Messages are synced in real time</span><span className="h-px flex-1 bg-[#d7e8e5]" /></div>{messages.map((msg) => { const isAdminMessage = msg.senderRole === 'support'; return <div key={msg.id} className={`flex ${isAdminMessage ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[min(78%,560px)] px-4 py-2.5 text-sm shadow-sm ${isAdminMessage ? 'bg-[#087f79] text-white' : 'border border-[#d7e8e5] bg-white text-slate-700'}`}><p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p><div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${isAdminMessage ? 'text-[#b9e7df]' : 'text-slate-400'}`}>{formatMessageTime(msg.createdAt)}{isAdminMessage && <CheckCheck size={12} />}</div></div></div>; })}</div>
          <form onSubmit={sendMessage} className="flex items-end gap-2 border-t border-[#d7e8e5] bg-white p-4"><button type="button" aria-label="Attach file" className="mb-1 p-2 text-slate-400 hover:text-[#087f79]"><Paperclip size={19} /></button><input value={newMessage} onChange={(event) => setNewMessage(event.target.value)} className="min-w-0 flex-1 border border-[#c8dedb] bg-[#f7fbfa] px-4 py-3 text-sm outline-none focus:border-[#087f79]" placeholder="Write a message..." /><button type="submit" disabled={!newMessage.trim()} aria-label="Send message" className="mb-1 flex h-11 w-11 items-center justify-center bg-[#087f79] text-white transition hover:bg-[#065f5b] disabled:cursor-not-allowed disabled:opacity-40"><Send size={18} /></button></form>
        </> : <div className="flex flex-1 flex-col items-center justify-center px-6 text-center text-slate-500"><div className="flex h-16 w-16 items-center justify-center bg-white text-[#13bdb0] shadow-sm"><MessageCircle size={30} /></div><h2 className="mt-4 text-lg font-bold text-slate-700">Select a conversation</h2><p className="mt-1 max-w-xs text-sm">Choose a client from the list to start a realtime conversation.</p></div>}
      </section>
    </div>
  );
}
