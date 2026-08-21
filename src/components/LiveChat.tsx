import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, CheckCheck, Headphones, Minus, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, doc, updateDoc, getDocs } from '../lib/realtimeFirestore';
import { playChatNotificationSound } from '../lib/chatSound';

interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderRole: 'user' | 'support' | 'system';
  content: string;
  createdAt: any;
}

interface ChatSession {
  status: 'active' | 'closed';
  agentId?: string;
  agentName?: string;
  agentAvatar?: string;
}

interface LiveChatProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  activeChatId?: string | null;
}

export default function LiveChat({ open, onOpenChange, activeChatId }: LiveChatProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = open ?? internalIsOpen;
  const setIsOpen = (nextOpen: boolean) => {
    setInternalIsOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [isEndConfirmationOpen, setIsEndConfirmationOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const knownIncomingMessageIds = useRef<Set<string>>(new Set());
  const hasLoadedMessages = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!user || !isOpen) return;

    const initChat = async () => {
      setIsInitializing(true);
      knownIncomingMessageIds.current = new Set();
      hasLoadedMessages.current = false;
      try {
        const requestedOrderId = new URLSearchParams(location.search).get('orderId');
        // Find or create chat
        const chatsRef = collection(db, 'chats');
        const q = query(chatsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        let selectedChatId = activeChatId || '';
        const matchingChat = querySnapshot.docs.find((chatDocument: any) => requestedOrderId && chatDocument.data().orderId === requestedOrderId);
        if (selectedChatId) {
          selectedChatId = selectedChatId;
        } else if (matchingChat) {
          selectedChatId = matchingChat.id;
        } else if (querySnapshot.empty || requestedOrderId || !querySnapshot.docs.some((chatDocument: any) => chatDocument.data().status === 'active')) {
          const newChatRef = await addDoc(chatsRef, {
            userId: user.uid,
            orderId: requestedOrderId || null,
            status: 'active',
            agentStatus: 'waiting',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          selectedChatId = newChatRef.id;
        } else {
          selectedChatId = querySnapshot.docs[0].id;
        }
        setChatId(selectedChatId);

        // Subscribe to messages
        const messagesRef = collection(db, `chats/${selectedChatId}/messages`);
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'));
        
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const msgs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ChatMessage[];
          const incomingMessages = msgs.filter((message) => message.senderRole === 'support' || message.senderRole === 'system');
          if (hasLoadedMessages.current && incomingMessages.some((message) => !knownIncomingMessageIds.current.has(message.id))) {
            playChatNotificationSound();
          }
          incomingMessages.forEach((message) => knownIncomingMessageIds.current.add(message.id));
          hasLoadedMessages.current = true;
          setMessages(msgs);
          setIsInitializing(false);
        }, (error) => {
          console.warn("Firestore live chat messages snapshot info:", error.message);
          setIsInitializing(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error initializing chat:", error);
        setIsInitializing(false);
      }
    };

    initChat();
  }, [user, isOpen, activeChatId]);

  useEffect(() => {
    if (!chatId || !isOpen) return;
    return onSnapshot(doc(db, `chats/${chatId}`), (snapshot) => {
      if (snapshot.exists()) setChatSession(snapshot.data() as ChatSession);
    });
  }, [chatId, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !chatId || chatSession?.status !== 'active') return;

    const messageContent = newMessage.trim();
    setNewMessage('');

    await addDoc(collection(db, `chats/${chatId}/messages`), {
      chatId,
      senderId: user.uid,
      senderRole: 'user',
      content: messageContent,
      createdAt: new Date().toISOString()
    });
  };

  const endConversation = async () => {
    if (!chatId || chatSession?.status !== 'active') return;
    setIsEndConfirmationOpen(false);
    await updateDoc(doc(db, `chats/${chatId}`), { status: 'closed', updatedAt: new Date().toISOString() });
  };

  const agentAvatar = chatSession?.agentAvatar
    ? chatSession.agentAvatar.startsWith('/') || chatSession.agentAvatar.startsWith('http')
      ? chatSession.agentAvatar
      : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(chatSession.agentAvatar)}`
    : '/profiles/profile-1.jpg';
  const customerName = user?.displayName || user?.email?.split('@')[0] || 'Customer';

  const handleSignIn = () => {
    setIsOpen(false);
    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-3 z-50 flex h-[min(520px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden border border-[#c8dedb] bg-white shadow-[0_18px_48px_rgba(15,76,84,0.2)] sm:right-6">
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between bg-[#174b54] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-[#13bdb0] text-white">
                {chatSession?.agentAvatar ? <img src={agentAvatar} alt="" className="h-full w-full object-cover" /> : <Headphones size={19} />}
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#174b54] bg-[#9de36d]" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide">{chatSession?.agentName || 'Support desk'}</h3>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <p className="text-xs font-medium text-[#b9e7df]">24/7 support · Usually replies in a few minutes</p>
                </div>
              </div>
            </div>
              <div className="flex items-center gap-1">
                {user && chatSession?.status === 'active' && <button type="button" onClick={() => setIsEndConfirmationOpen(true)} className="flex items-center gap-1 border border-[#b9e7df] px-2 py-1 text-[10px] font-bold text-[#b9e7df] transition hover:border-white hover:text-white" aria-label="End conversation"><XCircle size={14} /> End</button>}
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-[#b9e7df] transition hover:bg-white/10 hover:text-white" aria-label="Minimize support chat">
                <Minus size={17} />
              </button>
              <button type="button" onClick={() => {
                if (user && chatSession?.status === 'active') {
                  setIsEndConfirmationOpen(true);
                  return;
                }
                setIsOpen(false);
              }} className="rounded-lg p-2 text-[#b9e7df] transition hover:bg-white/10 hover:text-white" aria-label="Close support chat">
                <X size={17} />
              </button>
            </div>
          </div>

          {isEndConfirmationOpen && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#174b54]/35 p-5">
              <div role="dialog" aria-modal="true" aria-labelledby="end-conversation-title" className="w-full border border-[#c8dedb] bg-white p-5 text-center shadow-xl">
                <h4 id="end-conversation-title" className="text-base font-bold text-[#174b54]">End this conversation?</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">This will close the chat for you and the support agent.</p>
                <div className="mt-5 flex gap-2">
                  <button type="button" onClick={() => setIsEndConfirmationOpen(false)} className="flex-1 border border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:border-slate-500 hover:text-slate-800">Cancel</button>
                  <button type="button" onClick={() => void endConversation()} className="flex-1 bg-[#f47321] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#d85f14]">End conversation</button>
                </div>
              </div>
            </div>
          )}

          {!user ? (
            // Not Logged In State
            <div className="flex flex-1 flex-col items-center justify-center bg-[#f4f9f8] p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#dff3ef] text-[#087f79]">
                <User size={30} />
              </div>
              <h4 className="mb-2 text-lg font-bold text-[#174b54]">Let’s get you connected</h4>
              <p className="mb-8 text-xs leading-relaxed text-slate-500">Sign in to start a private conversation with our support team. Your order context stays connected to your account.</p>
              <button
                onClick={handleSignIn}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f47321] py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#d85f14]"
              >
                Sign in or Create Account
              </button>
            </div>
          ) : (
            // Chat Interface
            <>
              {/* Messages Area */}
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-[#f4f9f8] p-4">
                <div className="flex items-center justify-between border-b border-[#d7e8e5] pb-3 text-[11px] text-slate-500"><span>Customer: <strong className="text-slate-700">{customerName}</strong></span><span>Agent: <strong className="text-slate-700">{chatSession?.agentName || 'Support desk'}</strong></span></div>
                {chatSession?.status === 'closed' && <div className="border border-[#d7e8e5] bg-white p-3 text-center text-xs font-semibold text-slate-500">This conversation has ended.</div>}
                {messages.length === 0 && !isInitializing && (
                  <div className="flex flex-1 flex-col items-center justify-center opacity-80">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#13bdb0] shadow-sm">
                      <MessageCircle size={25} />
                    </div>
                    <div className="text-center text-sm font-semibold text-[#174b54]">
                      How can we help today?
                      <p className="mt-1 text-xs font-normal text-slate-500">Send us a message and we’ll take it from here.</p>
                    </div>
                  </div>
                )}
                {isInitializing && (
                  <div className="flex flex-col flex-1 items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <div className="text-center text-slate-500 text-xs font-medium">
                      Connecting to secure chat...
                    </div>
                  </div>
                )}
                {messages.map((msg) => {
                  const isSupport = msg.senderRole === 'support' || msg.senderRole === 'system';
                  return (
                    <div key={msg.id} className={`flex ${!isSupport ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex max-w-[85%] flex-col px-4 py-2.5 text-sm shadow-sm ${isSupport ? 'border border-[#d7e8e5] bg-white text-slate-700' : 'bg-[#087f79] text-white'}`}>
                         <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                         <div className={`flex items-center gap-1 mt-1 justify-end ${!isSupport ? 'text-blue-200' : 'text-slate-400'}`}>
                           <span className="text-xs font-medium tracking-wide">
                             {new Date(msg.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                           </span>
                           {!isSupport && <CheckCheck size={12} className="text-blue-200" />}
                         </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={sendMessage} className="flex items-end gap-2 border-t border-[#d7e8e5] bg-white p-3">
                <div className="flex flex-1 items-end border border-[#c8dedb] bg-[#f7fbfa]">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(e);
                      }
                    }}
                    placeholder="Type your message..."
                    className="min-h-[44px] max-h-32 w-full resize-none border-none bg-transparent px-4 py-3 text-sm outline-none focus:ring-0"
                    rows={1}
                    disabled={isInitializing || chatSession?.status !== 'active'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isInitializing || chatSession?.status !== 'active'}
                  className="mb-[1px] flex-shrink-0 bg-[#f47321] p-3 text-white transition-colors hover:bg-[#d85f14] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={18} className="translate-x-[1px] translate-y-[-1px]" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
