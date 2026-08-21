import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, getDoc, addDoc, serverTimestamp, deleteDoc, doc, limit } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  CreditCard,
  Award,
  FileText,
  Headphones,
  User,
  Wallet,
  History,
  TrendingUp,
  DollarSign,
  Plus,
  Trash2,
  Lock,
  X,
  CreditCard as CardIcon,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import PortalPageHeader from '../components/PortalPageHeader';

interface Transaction {
  id: string;
  transactionId: string;
  createdAt: any;
  paymentType: string;
  source: string;
  amount: number;
  description: string;
}

interface StoredCard {
  id: string;
  cardHolder: string;
  last4: string;
  brand: string;
  expiry: string;
  isPrimary: boolean;
}

export default function MyFinances() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cards, setCards] = useState<StoredCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddCard, setShowAddCard] = useState(false);
  
  // Form State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactionPage, setTransactionPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const profileSnapshot = await getDoc(doc(db, 'studentProfiles', user.uid));
        setBalance(profileSnapshot.exists() ? profileSnapshot.data().balance || 0 : 0);

        // Fetch Transactions
        const tQuery = query(
          collection(db, 'transactions'), 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(20)
        );
        const tSnapshot = await getDocs(tQuery);
        const tData = tSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Transaction[];
        setTransactions(tData);
        setTransactionPage(1);

        // Fetch Cards
        const cQuery = query(
          collection(db, 'paymentMethods'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const cSnapshot = await getDocs(cQuery);
        const cData = cSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StoredCard[];
        setCards(cData);

      } catch (err) {
        console.error('Error fetching financial data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Basic simulation of card brand detection
      const brand = cardNumber.startsWith('4') ? 'Visa' : 'MasterCard';
      const last4 = cardNumber.slice(-4);

      const newCard = {
        userId: user.uid,
        cardHolder,
        last4,
        brand,
        expiry,
        isPrimary: cards.length === 0,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'paymentMethods'), newCard);
      
      setCards(prev => [{ id: docRef.id, ...newCard } as StoredCard, ...prev]);
      setShowAddCard(false);
      
      // Reset form
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setCardHolder('');
    } catch (error) {
      console.error("Error adding card:", error);
      alert("Failed to secure card. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeCard = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'paymentMethods', id));
      setCards(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error removing card:", error);
    }
  };

  const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const primaryCard = cards.find(c => c.isPrimary) || cards[0];
  const transactionPageCount = Math.max(1, Math.ceil(transactions.length / transactionsPerPage));
  const visibleTransactions = transactions.slice(
    (transactionPage - 1) * transactionsPerPage,
    transactionPage * transactionsPerPage
  );

  return (
    <div className="mx-auto mt-2 w-full max-w-7xl animate-in fade-in duration-500 pb-6 font-['Open_Sans',sans-serif]">
      <PortalPageHeader title="Balance" description="Manage your balance, payment methods, and transaction history." />
      {/* Finance Stats */}
      <div className="hidden">
        <div className="bg-emerald-500 p-6 rounded-3xl text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="text-xs font-black uppercase tracking-widest text-orange-100 mb-2 opacity-80">Total Expenditure</div>
            <div className="text-3xl font-black mb-4">${totalSpent.toFixed(2)}</div>
            <div className="flex items-center gap-2 text-xs font-black text-orange-100 uppercase tracking-widest">
              <TrendingUp size={14} />
              <span>Verified Ledger</span>
            </div>
          </div>
          <DollarSign className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-emerald-500/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
              <History size={24} />
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Recent Activity</div>
              <div className="text-lg font-black text-slate-900">
                {transactions[0] ? `$${transactions[0].amount.toFixed(2)}` : '$0.00'}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400 font-black uppercase tracking-widest mt-4">
            {transactions[0] ? `Ref: ${transactions[0].transactionId}` : 'Standby for payment'}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl shadow-xl relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Digital Vault</div>
              <CardIcon className="text-emerald-500" size={24} />
            </div>
            
            {primaryCard ? (
              <div className="mt-8">
                <div className="text-white font-mono text-lg tracking-widest mb-2 uppercase">
                  •••• •••• •••• {primaryCard.last4}
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    {primaryCard.cardHolder}
                  </div>
                  <div className="text-xs font-black text-white bg-emerald-500 px-2 py-0.5 rounded italic">
                    {primaryCard.brand.toUpperCase()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 text-center py-4">
                <button 
                  onClick={() => setShowAddCard(true)}
                  className="text-xs font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center gap-2 justify-center mx-auto"
                >
                  <Plus size={14} /> Add Verified Card
                </button>
              </div>
            )}
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="mt-4 flex w-full flex-col gap-6 lg:flex-row lg:gap-6">
        {/* Transaction History */}
        <div className="order-1 min-w-0 flex-1 overflow-hidden border border-black bg-transparent shadow-sm lg:order-1">
          <div className="flex items-center justify-between border-b border-black px-4 py-3">
            <h2 className="text-base font-bold text-slate-900">Transaction history</h2>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-[#0080d1]">
              <Filter size={14} /> Filter Activity
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-[#d7ebe9] text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#174b54]">
                <tr className="border-b-2 border-black">
                  <th className="border-r border-black px-4 py-3.5">Reference</th>
                  <th className="border-r border-black px-4 py-3.5">Details</th>
                  <th className="border-r border-black px-4 py-3.5">Method</th>
                  <th className="border-r border-black px-4 py-3.5">Amount</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">Loading transactions...</td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="bg-transparent px-6 py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                         <History size={34} className="text-slate-300" />
                         <p className="font-bold text-slate-700">No transactions yet</p>
                         <p className="text-sm text-slate-500">Your balance activity will appear here.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  visibleTransactions.map((t, idx) => (
                    <motion.tr 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={t.id} 
                      className="bg-white transition-colors hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-bold text-slate-900">{t.transactionId}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-800">{t.description}</div>
                        <div className="mt-1 text-xs font-normal text-slate-400">{t.createdAt?.toDate().toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <span className="flex h-5 w-8 items-center justify-center rounded border border-slate-200 bg-slate-100 text-[9px] font-bold italic">
                            {t.paymentType.includes('Card') ? 'SECURE' : 'BANK'}
                          </span>
                          {t.paymentType}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                          <ArrowUpRight size={14} className="text-red-500" />
                          ${(t.amount || 0).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                         <div className="flex justify-center">
                           <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                             Verified
                           </span>
                         </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {!loading && transactions.length > transactionsPerPage && (
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-xs font-semibold text-slate-500">
              <span>Page {transactionPage} of {transactionPageCount}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={transactionPage === 1}
                  onClick={() => setTransactionPage((page) => Math.max(1, page - 1))}
                  className="rounded border border-slate-200 px-3 py-1.5 transition-colors hover:border-[#0080d1] hover:text-[#0080d1] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={transactionPage === transactionPageCount}
                  onClick={() => setTransactionPage((page) => Math.min(transactionPageCount, page + 1))}
                  className="rounded border border-slate-200 px-3 py-1.5 transition-colors hover:border-[#0080d1] hover:text-[#0080d1] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Saved Cards Sidebar */}
        <div className="order-2 w-full space-y-4 lg:order-2 lg:w-80 lg:shrink-0">
          <div className="border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d9e0ed] text-[#0080d1]"><Plus size={20} /></div>
              <div><h2 className="text-base font-extrabold text-slate-900">Top up balance</h2><p className="text-xs text-slate-500">Current balance: ${balance.toFixed(2)}</p></div>
            </div>
            <label className="block text-xs font-bold text-slate-600">Amount</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-500">$</span>
              <input type="number" min="1" step="0.01" value={topUpAmount} onChange={(event) => setTopUpAmount(event.target.value)} placeholder="Enter amount" className="w-full rounded-lg border border-slate-200 py-2.5 pl-7 pr-3 text-sm font-bold outline-none placeholder:font-normal placeholder:text-slate-400 focus:border-[#0080d1]" />
            </div>
            <button type="button" onClick={() => setShowAddCard(true)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0080d1] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#004695]"><CardIcon size={16} /> Top up with card</button>
            <p className="mt-2 text-center text-xs text-slate-400">Secure payment powered by Stripe.</p>
          </div>

           <div className="border border-slate-200 bg-white p-5 shadow-sm">
             <h3 className="mb-3 flex items-center justify-between text-sm font-bold text-slate-900">
               Saved Accounts
               <Lock size={12} className="text-slate-400" />
             </h3>
             
             {loading ? (
                <div className="space-y-3">
                  {[1,2].map(i => <div key={i} className="h-16 rounded-lg bg-slate-50 animate-pulse" />)}
                </div>
             ) : cards.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="py-4 text-center text-sm leading-relaxed text-slate-500">
                    No payment accounts linked.<br/>Add a card to enable fast-track checkout.
                  </p>
                </div>
             ) : (
                <div className="space-y-3">
                  {cards.map((card) => (
                    <motion.div 
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                      <button 
                        onClick={() => removeCard(card.id)}
                        className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-6 bg-white rounded border border-slate-200 flex items-center justify-center text-xs font-black italic shadow-sm">
                          {card.brand.toUpperCase()}
                        </div>
                        <div className="text-xs font-bold text-slate-900 tracking-tight">
                          •••• {card.last4}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-xs font-semibold text-slate-500">
                          EXP {card.expiry || 'MM/YY'}
                        </div>
                        {card.isPrimary && <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">PRIMARY</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
             )}

             <button 
               onClick={() => setShowAddCard(true)}
               className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-xs font-bold text-slate-500 transition-colors hover:border-[#0080d1] hover:bg-sky-50 hover:text-[#0080d1]"
             >
               <Plus size={14} /> Link New Account
             </button>
          </div>

        </div>
      </div>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/45 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
            >
              <button 
                onClick={() => setShowAddCard(false)}
                className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-start gap-3 border-b border-slate-200 pb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9e0ed] text-[#0080d1]">
                    <CardIcon size={21} />
                  </div>
                  <div><h3 className="text-xl font-bold text-slate-900">Add payment card</h3><p className="mt-1 text-sm text-slate-500">Save a card for balance top-ups.</p></div>
                </div>

                <form onSubmit={handleAddCard} className="space-y-4">
                  <div>
                    <label className="mb-1.5 ml-1 block text-xs font-bold text-slate-600">Cardholder name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. PATRICIA WAFULA"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0080d1] focus:ring-2 focus:ring-sky-100"
                      value={cardHolder}
                      onChange={e => setCardHolder(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 ml-1 block text-xs font-bold text-slate-600">Card number</label>
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        maxLength={16}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0080d1] focus:ring-2 focus:ring-sky-100"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      />
                      <CardIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 ml-1 block text-xs font-bold text-slate-600">Expiry date</label>
                      <input 
                        required
                        type="text" 
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0080d1] focus:ring-2 focus:ring-sky-100"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 ml-1 block text-xs font-bold text-slate-600">CVC code</label>
                      <div className="relative">
                        <input 
                          required
                          type="password" 
                          maxLength={3}
                          placeholder="•••"
                          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0080d1] focus:ring-2 focus:ring-sky-100"
                          value={cvc}
                          onChange={e => setCvc(e.target.value.replace(/\D/g, ''))}
                        />
                        <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="mt-2 flex w-full items-center justify-center gap-3 rounded-lg bg-[#0080d1] py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#004695]"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        Save card
                        <ArrowUpRight size={18} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <span>Visa</span><span>Mastercard</span><span>Stripe</span>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
