export function getSafeAuthError(error: unknown, fallback = 'Unable to complete authentication. Please check your details and try again.') {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code?: string }).code) : '';
  if (code.includes('popup-closed-by-user') || code.includes('cancelled-popup-request')) return 'Sign-in was cancelled.';
  if (code.includes('too-many-requests')) return 'Too many attempts. Please wait and try again later.';
  if (code.includes('network-request-failed')) return 'Network error. Please check your connection and try again.';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) return 'The email or password is incorrect.';
  if (code.includes('email-already-in-use')) return 'Unable to create this account. Try signing in instead.';
  if (code.includes('weak-password')) return 'Choose a stronger password.';
  return fallback;
}
