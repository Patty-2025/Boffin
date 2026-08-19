import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, CheckCheck, Headphones, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, doc, setDoc, getDocs } from 'firebase/firestore';

interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderRole: 'user' | 'support' | 'system';
  content: string;
  createdAt: any;
}

interface LiveChatProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function LiveChat({ open, onOpenChange }: LiveChatProps) {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
      try {
        // Find or create chat
        const chatsRef = collection(db, 'chats');
        const q = query(chatsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        let activeChatId = '';
        if (querySnapshot.empty) {
          const newChatRef = await addDoc(chatsRef, {
            userId: user.uid,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          activeChatId = newChatRef.id;
        } else {
          activeChatId = querySnapshot.docs[0].id;
        }
        setChatId(activeChatId);

        // Subscribe to messages
        const messagesRef = collection(db, `chats/${activeChatId}/messages`);
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'));
        
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const msgs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ChatMessage[];
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
  }, [user, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !chatId) return;

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

  const handleSignIn = () => {
    setIsOpen(false);
    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-3 z-50 flex h-[min(440px,calc(100vh-8rem))] w-[calc(100vw-2.5rem)] max-w-[320px] flex-col overflow-hidden rounded-2xl border border-[#c8dedb] bg-white shadow-[0_18px_48px_rgba(15,76,84,0.2)] sm:right-6">
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between bg-[#174b54] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#13bdb0] text-white">
                <Headphones size={19} />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#174b54] bg-[#9de36d]" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide">Support desk</h3>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <p className="text-xs font-medium text-[#b9e7df]">Usually replies in a few minutes</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-[#b9e7df] transition hover:bg-white/10 hover:text-white" aria-label="Minimize support chat">
                <Minus size={17} />
              </button>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-[#b9e7df] transition hover:bg-white/10 hover:text-white" aria-label="Close support chat">
                <X size={17} />
              </button>
            </div>
          </div>

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
                      <div className={`flex max-w-[85%] flex-col rounded-2xl px-4 py-2.5 text-sm shadow-sm ${isSupport ? 'rounded-tl-sm border border-[#d7e8e5] bg-white text-slate-700' : 'rounded-tr-sm bg-[#087f79] text-white'}`}>
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
                <div className="flex flex-1 items-end rounded-xl border border-[#c8dedb] bg-[#f7fbfa]">
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
                    disabled={isInitializing}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isInitializing}
                  className="mb-[1px] flex-shrink-0 rounded-xl bg-[#f47321] p-3 text-white transition-colors hover:bg-[#d85f14] disabled:cursor-not-allowed disabled:opacity-50"
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
