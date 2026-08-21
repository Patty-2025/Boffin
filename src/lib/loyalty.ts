import { get, ref } from 'firebase/database';
import { realtimeDb } from './firebase';

export interface LoyaltySettings {
  pointsPerReferral: number;
  pointsPerReward: number;
  rewardValue: number;
}

export const DEFAULT_LOYALTY_SETTINGS: LoyaltySettings = {
  pointsPerReferral: 100,
  pointsPerReward: 500,
  rewardValue: 5,
};

const parseSetting = (value: unknown, fallback: number): number => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : fallback;
};

export async function fetchLoyaltySettings(): Promise<LoyaltySettings> {
  try {
    const snapshot = await get(ref(realtimeDb, 'settings/loyalty'));
    if (!snapshot.exists()) return DEFAULT_LOYALTY_SETTINGS;

    const data = snapshot.val() || {};
    return {
      pointsPerReferral: parseSetting(data.pointsPerReferral, DEFAULT_LOYALTY_SETTINGS.pointsPerReferral),
      pointsPerReward: parseSetting(data.pointsPerReward, DEFAULT_LOYALTY_SETTINGS.pointsPerReward),
      rewardValue: parseSetting(data.rewardValue, DEFAULT_LOYALTY_SETTINGS.rewardValue),
    };
  } catch (error) {
    console.error('Error loading loyalty settings from database:', error);
    return DEFAULT_LOYALTY_SETTINGS;
  }
}

export function referralCodeForUser(userId: string): string {
  return `BG-${userId}`;
}

export function userIdFromReferralCode(code: string): string | null {
  const normalized = code.trim();
  return normalized.startsWith('BG-') && normalized.length > 3 ? normalized.slice(3) : null;
}

export function referralLinkForUser(userId: string): string {
  return `${window.location.origin}/register?ref=${encodeURIComponent(referralCodeForUser(userId))}`;
}
