import React, { useState } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  providerName: string;
}

export default function TermsModal({ isOpen, onClose, onContinue, providerName }: TermsModalProps) {
  const [policyAgree, setPolicyAgree] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-appear-0">
      <div className="bb-modalContainer bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative border border-slate-100">
        <div className="bb-modalHeader flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
          <h3 className="text-lg font-bold text-slate-800 font-display">Review our Terms to sign up</h3>
          <button 
            onClick={onClose}
            className="bb-modalClose p-1 hover:bg-slate-100 rounded-full transition text-slate-400 hover:text-slate-600"
          >
            <div className="bb-fillPath">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="#8cabca"></path>
              </svg>
            </div>
          </button>
        </div>

        <div className="bb-modalBody space-y-4">
          <div className="bb-policyModalContent space-y-4">
            <label className="bb-gdprOAuth2Label flex items-start gap-3 cursor-pointer">
              <div className="bb-checkboxContainer relative flex items-center mt-0.5">
                <input 
                  name="policy_agree" 
                  type="checkbox" 
                  checked={policyAgree}
                  onChange={(e) => setPolicyAgree(e.target.checked)}
                  className="peer sr-only bb-checkboxInput" 
                />
                <div className={`w-5 h-5 rounded border ${policyAgree ? 'bg-[#0080d1] border-[#0080d1]' : 'bg-white border-[#8cabca]'} flex items-center justify-center transition`}>
                  {policyAgree && (
                    <svg width="12" height="10" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.75 8.15L1.6 5 .55 6.05l4.2 4.2 9-9L12.7.2 4.75 8.15z" fill="#fff"></path>
                    </svg>
                  )}
                </div>
              </div>
              <span className="bb-gdprOAuth2Text text-sm text-slate-700 leading-snug">
                I agree to the <a href="/terms-and-conditions" target="_blank" className="text-[#0080d1] underline hover:text-[#0050b5]">Terms & Conditions</a> and <a href="/privacy-policy" target="_blank" className="text-[#0080d1] underline hover:text-[#0050b5]">Privacy Policy</a>.
              </span>
            </label>

            <label className="bb-gdprOAuth2Label flex items-start gap-3 cursor-pointer">
              <div className="bb-checkboxContainer relative flex items-center mt-0.5">
                <input 
                  name="marketing_agree" 
                  type="checkbox" 
                  checked={marketingAgree}
                  onChange={(e) => setMarketingAgree(e.target.checked)}
                  className="peer sr-only bb-checkboxInput" 
                />
                <div className={`w-5 h-5 rounded border ${marketingAgree ? 'bg-[#0080d1] border-[#0080d1]' : 'bg-white border-[#8cabca]'} flex items-center justify-center transition`}>
                  {marketingAgree && (
                    <svg width="12" height="10" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.75 8.15L1.6 5 .55 6.05l4.2 4.2 9-9L12.7.2 4.75 8.15z" fill="#fff"></path>
                    </svg>
                  )}
                </div>
              </div>
              <span className="bb-gdprOAuth2Text text-sm text-slate-700 leading-snug">
                I agree to receive bonuses, discounts and promotional materials.
              </span>
            </label>

            <div className="bb-policyButtonContainer pt-2">
              <div className="bb-policyButtonWrapper">
                <button 
                  type="button" 
                  disabled={!policyAgree}
                  onClick={onContinue}
                  className={`w-full py-3 px-8 rounded-full font-bold text-base transition flex items-center justify-center shadow-sm ${
                    policyAgree 
                      ? 'bg-[#0080d1] text-white hover:bg-[#004695] cursor-pointer' 
                      : 'bg-[#efefef] text-[#878787] cursor-not-allowed border border-[#efefef]'
                  }`}
                >
                  Continue with {providerName}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
