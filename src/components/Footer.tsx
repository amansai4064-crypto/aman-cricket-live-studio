import React from 'react';
import { Radio, Phone, Mail, MessageSquare, ShieldCheck, Heart, Award } from 'lucide-react';
import { OFFICIAL_SUPPORT_MOBILE, OFFICIAL_SUPPORT_EMAIL, BRAND_NAME, POWERED_BY } from '../data/mockData';

interface FooterProps {
  onOpenLegal: (policyType: string) => void;
  onOpenSupport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenSupport }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30">
                <Radio className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{BRAND_NAME}</h3>
                <p className="text-xs text-red-400 font-semibold">{POWERED_BY}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              Professional cricket live streaming, OBS overlays, dynamic scoreboards, match analytics, single-level referral program, and secure business solutions for cricket creators and tournaments worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={`https://wa.me/91${OFFICIAL_SUPPORT_MOBILE}?text=Hello%20Aman%20Cricket%20Live%20Studio`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +{OFFICIAL_SUPPORT_MOBILE}</span>
              </a>
            </div>
          </div>

          {/* Official Support & Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-base">Official Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:${OFFICIAL_SUPPORT_MOBILE}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>+{OFFICIAL_SUPPORT_MOBILE}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${OFFICIAL_SUPPORT_EMAIL}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>{OFFICIAL_SUPPORT_EMAIL}</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenSupport} className="text-red-400 hover:text-red-300 font-medium text-xs bg-red-950/40 px-3 py-1.5 rounded-lg border border-red-900/50">
                  Open Support Ticket
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-base">Platform Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white transition-colors">Live Match Center</a></li>
              <li><a href="#obs" className="hover:text-white transition-colors">OBS Broadcast Overlays</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cricket Services</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Subscription Pricing</a></li>
              <li><button onClick={onOpenSupport} className="hover:text-white transition-colors text-left">Customer Support</button></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-base">Legal & Policies</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors text-left">Terms and Conditions</button></li>
              <li><button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => onOpenLegal('referral')} className="hover:text-white transition-colors text-left">Referral Program Policy</button></li>
              <li><button onClick={() => onOpenLegal('refund')} className="hover:text-white transition-colors text-left">Refund & Cancellation Policy</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BRAND_NAME} ({POWERED_BY}). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure Business & SSL Verified
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Award className="w-4 h-4 text-amber-500" />
              Official Support: +{OFFICIAL_SUPPORT_MOBILE}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
