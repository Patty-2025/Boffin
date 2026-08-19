export const POINTS_PER_REFERRAL = 100;
export const POINTS_PER_REWARD = 500;
export const REWARD_VALUE = 5;

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
