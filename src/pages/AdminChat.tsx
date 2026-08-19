import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc, doc, getDoc } from 'firebase/firestore';
import { MessageCircle, User, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Chat {
  id: string;
  userId: string;
  status: string;
  createdAt: string;
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
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    }, (error) => {
      console.warn("Firestore chats snapshot info:", error.message);
    });
    return () => unsubscribe();
  }, [isAdmin]);

  useEffect(() => {
    if (!selectedChat) return;

    const messagesRef = collection(db, `chats/${selectedChat}/messages`);
    const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      setMessages(msgs);
    }, (error) => {
      console.warn("Firestore messages snapshot info:", error.message);
    });
    return () => unsubscribe();
  }, [selectedChat]);

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
    <div className="flex h-screen bg-slate-100">
      <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
        <h2 className="p-4 font-bold border-b border-slate-100">Active Chats</h2>
        {chats.map(chat => (
          <div 
            key={chat.id} 
            onClick={() => setSelectedChat(chat.id)}
            className={`p-4 cursor-pointer hover:bg-slate-50 border-b border-slate-100 ${selectedChat === chat.id ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-blue-600" />
              <span className="text-sm font-medium">Chat User: {chat.userId}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex mb-2 ${msg.senderRole === 'support' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 rounded-lg ${msg.senderRole === 'support' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-200 flex gap-2">
              <input 
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                className="flex-1 p-2 border border-slate-200 rounded-lg"
                placeholder="Reply..."
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Send</button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-slate-500">Select a chat</div>
        )}
      </div>
    </div>
  );
}
