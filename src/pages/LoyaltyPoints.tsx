import React, { useEffect, useState } from 'react';
import { Award, Check, Copy, FileText, Gift, Headphones, Link as LinkIcon, LoaderCircle, User, Wallet } from 'lucide-react';
import { collection, doc, getDoc, getDocs, query, runTransaction, serverTimestamp, setDoc, where } from '../lib/realtimeFirestore';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import PortalPageHeader from '../components/PortalPageHeader';
import { DEFAULT_LOYALTY_SETTINGS, fetchLoyaltySettings, referralCodeForUser, referralLinkForUser, type LoyaltySettings } from '../lib/loyalty';

interface LoyaltyProfile {
  loyaltyPoints?: number;
  balance?: number;
  referralCode?: string;
}

interface ReferralEvent {
  id: string;
  referredUserId: string;
  orderId: string;
  points: number;
  status: 'pending' | 'claimed';
  createdAt?: { toDate?: () => Date };
}

export default function LoyaltyPoints() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<LoyaltyProfile>({});
  const [referrals, setReferrals] = useState<ReferralEvent[]>([]);
  const [loyaltySettings, setLoyaltySettings] = useState<LoyaltySettings>(DEFAULT_LOYALTY_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const referralCode = user ? referralCodeForUser(user.uid) : '';
  const referralLink = user ? referralLinkForUser(user.uid) : '';
  const points = profile.loyaltyPoints || 0;
  const balance = profile.balance || 0;
  const redeemableRewards = Math.floor(points / loyaltySettings.pointsPerReward);

  const loadLoyalty = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const settings = await fetchLoyaltySettings();
      setLoyaltySettings(settings);

      const profileRef = doc(db, 'studentProfiles', user.uid);
      const profileSnapshot = await getDoc(profileRef);
      const currentProfile = (profileSnapshot.exists() ? profileSnapshot.data() : {}) as LoyaltyProfile;
      if (!profileSnapshot.exists() || !currentProfile.referralCode) {
        await setDoc(profileRef, {
          userId: user.uid,
          email: user.email || '',
          emailVerified: user.emailVerified,
          referralCode,
          loyaltyPoints: currentProfile.loyaltyPoints || 0,
          balance: currentProfile.balance || 0
        }, { merge: true });
      }
      setProfile({ ...currentProfile, referralCode, loyaltyPoints: currentProfile.loyaltyPoints || 0, balance: currentProfile.balance || 0 });

      const referralSnapshot = await getDocs(query(collection(db, 'referralEvents'), where('referrerId', '==', user.uid)));
      const referralData = referralSnapshot.docs.map((referral) => ({ id: referral.id, ...referral.data() })) as ReferralEvent[];
      setReferrals(referralData.sort((a, b) => {
        const first = a.createdAt?.toDate?.()?.getTime() || 0;
        const second = b.createdAt?.toDate?.()?.getTime() || 0;
        return second - first;
      }));
    } catch (error) {
      console.error('Error loading loyalty data:', error);
      setMessage('Unable to load loyalty data right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLoyalty();
  }, [user]);

  const claimPendingReferrals = async () => {
    if (!user) return;
    const pending = referrals.filter((referral) => referral.status === 'pending');
    if (pending.length === 0) return;

    try {
      const profileRef = doc(db, 'studentProfiles', user.uid);
      await runTransaction(db, async (transaction) => {
        const profileSnapshot = await transaction.get(profileRef);
        const currentPoints = profileSnapshot.exists() ? profileSnapshot.data().loyaltyPoints || 0 : 0;
        const pendingPoints = pending.reduce((sum, referral) => sum + (referral.points || loyaltySettings.pointsPerReferral), 0);
        transaction.set(profileRef, { loyaltyPoints: currentPoints + pendingPoints }, { merge: true });
        pending.forEach((referral) => transaction.update(doc(db, 'referralEvents', referral.id), { status: 'claimed', claimedAt: serverTimestamp() }));
      });
      await loadLoyalty();
      setMessage(`${pending.length} referral reward${pending.length === 1 ? '' : 's'} added to your points.`);
    } catch (error) {
      console.error('Error claiming referral rewards:', error);
      setMessage('Unable to claim referral rewards right now.');
    }
  };

  const redeemPoints = async () => {
    if (!user || redeemableRewards < 1) return;
    setIsRedeeming(true);
    try {
      const profileRef = doc(db, 'studentProfiles', user.uid);
      await runTransaction(db, async (transaction) => {
        const profileSnapshot = await transaction.get(profileRef);
        const currentPoints = profileSnapshot.exists() ? profileSnapshot.data().loyaltyPoints || 0 : 0;
        const currentBalance = profileSnapshot.exists() ? profileSnapshot.data().balance || 0 : 0;
        const rewards = Math.floor(currentPoints / loyaltySettings.pointsPerReward);
        if (rewards < 1) throw new Error('Not enough points to redeem.');
        transaction.set(profileRef, {
          loyaltyPoints: currentPoints - rewards * loyaltySettings.pointsPerReward,
          balance: currentBalance + rewards * loyaltySettings.rewardValue
        }, { merge: true });
      });
      await loadLoyalty();
      setMessage('Your points were converted into balance credit.');
    } catch (error) {
      console.error('Error redeeming loyalty points:', error);
      setMessage('Unable to redeem points right now.');
    } finally {
      setIsRedeeming(false);
    }
  };

  const copyReferralLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mx-auto mt-2 w-full max-w-7xl animate-in fade-in duration-500 pb-5 font-['Open_Sans',sans-serif]">
      <section className="overflow-hidden bg-transparent">
        <PortalPageHeader title="Loyalty points" description="Share your link, earn points, and turn rewards into balance credit." />

        <div className="grid gap-4 p-4 lg:grid-cols-[1.1fr_0.9fr] lg:p-6">
          <div className="border border-slate-200 p-4">
            <div className="flex items-center gap-3"><LinkIcon className="text-[#0080d1]" size={22} /><h2 className="text-lg font-bold text-slate-900">Your referral link</h2></div>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">A new customer must register through this link and complete their first paid order for the reward to be added.</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input readOnly value={referralLink} className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600 outline-none" aria-label="Your referral link" />
              <button type="button" onClick={copyReferralLink} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0080d1] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#004695]"><Copy size={16} /> {copied ? 'Copied' : 'Copy link'}</button>
            </div>
            <p className="mt-3 text-xs text-slate-400">Referral code: <span className="font-mono font-bold text-slate-600">{referralCode}</span></p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Award size={18} className="text-[#0080d1]" /> Available points</div><p className="mt-1 text-2xl font-bold text-slate-900">{points}</p><p className="mt-1 text-xs text-slate-500">{loyaltySettings.pointsPerReferral} points per qualifying referral</p></div>
            <div className="border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Wallet size={18} className="text-[#0080d1]" /> Balance credit</div><p className="mt-1 text-2xl font-bold text-slate-900">${balance.toFixed(2)}</p><p className="mt-1 text-xs text-slate-500">Available to use at checkout</p></div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-slate-200 p-4 lg:grid-cols-[1fr_1fr] lg:p-6">
          <div className="border border-slate-200 p-4"><h2 className="text-lg font-bold text-slate-900">Redeem points</h2><p className="mt-1 text-sm text-slate-600">Every {loyaltySettings.pointsPerReward} points becomes ${loyaltySettings.rewardValue} in balance credit.</p><button type="button" disabled={redeemableRewards < 1 || isRedeeming} onClick={redeemPoints} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#0080d1] px-4 py-2 text-sm font-bold text-white hover:bg-[#004695] disabled:cursor-not-allowed disabled:opacity-40">{isRedeeming && <LoaderCircle size={16} className="animate-spin" />} Redeem {redeemableRewards > 0 ? `${redeemableRewards * loyaltySettings.rewardValue} dollars` : 'when available'}</button></div>
          <div className="border border-slate-200 p-4"><h2 className="text-lg font-bold text-slate-900">Referral activity</h2>{loading ? <p className="mt-2 text-sm text-slate-500">Loading activity...</p> : referrals.length === 0 ? <p className="mt-2 text-sm text-slate-500">No referrals yet. Your completed referrals will appear here.</p> : <div className="mt-2 space-y-1">{referrals.slice(0, 5).map((referral) => <div key={referral.id} className="flex items-center justify-between border-b border-slate-100 py-1.5 text-sm last:border-0"><span className="truncate text-slate-600">Order {referral.orderId.slice(-8).toUpperCase()}</span><span className={`font-bold ${referral.status === 'claimed' ? 'text-emerald-600' : 'text-amber-600'}`}>{referral.status === 'claimed' ? `+${referral.points} pts` : 'Pending'}</span></div>)}</div>}</div>
        </div>
        {referrals.some((referral) => referral.status === 'pending') && <div className="border-t border-slate-200 px-5 py-4 lg:px-8"><button type="button" onClick={claimPendingReferrals} className="inline-flex items-center gap-2 text-sm font-bold text-[#0080d1] hover:text-[#004695]"><Gift size={17} /> Claim pending referral rewards</button></div>}
        {message && <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-600 lg:px-8"><Check size={16} className="mr-2 inline text-emerald-600" />{message}</div>}
      </section>
    </div>
  );
}
