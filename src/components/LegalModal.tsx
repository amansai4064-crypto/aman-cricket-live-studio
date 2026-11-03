import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { BRAND_NAME, POWERED_BY, OFFICIAL_SUPPORT_MOBILE, OFFICIAL_SUPPORT_EMAIL } from '../data/mockData';

interface LegalModalProps {
  policyType: string | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const getTitle = () => {
    switch (policyType) {
      case 'terms': return 'Terms and Conditions';
      case 'privacy': return 'Privacy Policy';
      case 'referral': return 'Single-Level Referral Program Policy';
      case 'refund': return 'Refund & Cancellation Policy';
      default: return 'Legal Policy & Compliance';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950/50 via-slate-900 to-blue-950/50 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-red-600 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{getTitle()}</h2>
              <p className="text-xs text-red-400 font-semibold">{BRAND_NAME} ({POWERED_BY})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-slate-300 text-sm leading-relaxed">
          <p className="text-xs text-slate-400">Last updated: February 2026</p>

          {policyType === 'terms' && (
            <>
              <h3 className="text-white font-bold text-base pt-2">1. Acceptance of Terms</h3>
              <p>By accessing and using {BRAND_NAME}, powered by {POWERED_BY}, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our live broadcasting, scoring, OBS overlay, or business services.</p>
              
              <h3 className="text-white font-bold text-base pt-2">2. User Accounts & Security</h3>
              <p>Users must provide accurate registration details including full name, email address, and mobile number. You are responsible for maintaining the confidentiality of your account credentials and password.</p>
              
              <h3 className="text-white font-bold text-base pt-2">3. Intellectual Property & Broadcast Rights</h3>
              <p>All cricket graphics, OBS overlay layouts, software code, and brand logos are the intellectual property of {POWERED_BY}. Unauthorized redistribution or commercial resale is strictly prohibited.</p>
              
              <h3 className="text-white font-bold text-base pt-2">4. Official Contact</h3>
              <p>For any legal or service inquiries, contact us at Mobile: +{OFFICIAL_SUPPORT_MOBILE} or Email: {OFFICIAL_SUPPORT_EMAIL}.</p>
            </>
          )}

          {policyType === 'privacy' && (
            <>
              <h3 className="text-white font-bold text-base pt-2">1. Information Collection</h3>
              <p>We collect essential account details (Name, Email, Mobile Number) required for authentication, subscription management, single-level referral tracking, and customer support.</p>
              
              <h3 className="text-white font-bold text-base pt-2">2. Data Security</h3>
              <p>All user passwords are securely hashed. Financial records and referral audits are maintained with strict row-level security and backend verification. We never sell or share your personal data with third-party advertisers.</p>
            </>
          )}

          {policyType === 'referral' && (
            <>
              <h3 className="text-white font-bold text-base pt-2">1. Single-Level Referral Program Rules</h3>
              <p>{BRAND_NAME} operates a strict single-level referral program. Every registered user receives a unique referral code.</p>
              
              <h3 className="text-white font-bold text-base pt-2">2. Commission Eligibility</h3>
              <p>Commissions are earned strictly when your direct referred user completes a verified paid subscription or service order. No rewards or commissions are paid for registration alone. Multi-level tiers, chain commissions, and self-referrals are strictly barred and subject to automated fraud checks.</p>
            </>
          )}

          {policyType === 'refund' && (
            <>
              <h3 className="text-white font-bold text-base pt-2">1. Subscription & Service Policy</h3>
              <p>Subscriptions and custom broadcast service orders are processed securely. Due to the digital nature of OBS overlays and live broadcasting assets, refunds are evaluated on a case-by-case basis within 48 hours of purchase if technical delivery fails.</p>
              
              <h3 className="text-white font-bold text-base pt-2">2. Cancellation Policy</h3>
              <p>You may cancel your PRO or BUSINESS subscription anytime from your user dashboard. Cancellation takes effect at the end of the current billing cycle without any hidden penalty charges.</p>
            </>
          )}
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors"
          >
            I Understand & Close
          </button>
        </div>

      </div>
    </div>
  );
};
