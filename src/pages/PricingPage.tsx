import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { initialSubscriptions } from '../data/mockData';
import { useBusiness } from '../context/BusinessContext';

export const PricingPage: React.FC = () => {
  const { currentUser, upgradeSubscription } = useAuth();
  const { addTransaction } = useBusiness();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubscribe = (planName: 'FREE' | 'PRO' | 'BUSINESS', price: number) => {
    upgradeSubscription(planName);

    if (price > 0) {
      addTransaction({
        userId: currentUser?.id || 'usr_guest',
        userName: currentUser?.fullName || 'Guest User',
        type: 'subscription',
        category: 'Subscription Earnings',
        amount: price,
        netAmount: Math.round(price * 0.95),
        status: 'completed',
        description: `${planName} Subscription Plan - Activated`,
        referenceId: planName.toLowerCase()
      });
    }

    setSuccessMsg(`Successfully subscribed to ${planName} Plan!`);
    setTimeout(() => {
      setSuccessMsg('');
      setSelectedPlan(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-red-400">Transparent Pricing</span>
        <h1 className="text-4xl font-black text-white">Choose Your Broadcast Plan</h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Unlock professional broadcast themes, multi-match management, and single-level referral commission earnings.
        </p>
      </div>

      {successMsg && (
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-center text-sm font-bold shadow-xl">
          {successMsg}
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {initialSubscriptions.map((sub) => {
          const isCurrent = currentUser?.subscriptionPlan === sub.name;

          return (
            <div
              key={sub.id}
              className={`bg-slate-900 border rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                sub.popular ? 'border-red-600 shadow-2xl shadow-red-600/10' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {sub.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold text-xl">{sub.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">₹{sub.price}</span>
                    <span className="text-xs text-slate-400">/ {sub.duration}</span>
                  </div>
                </div>

                <ul className="space-y-3 pt-4 border-t border-slate-800">
                  {sub.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800">
                {isCurrent ? (
                  <div className="w-full py-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-bold text-xs text-center">
                    Current Active Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubscribe(sub.name as any, sub.price)}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                      sub.popular
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {sub.price === 0 ? 'Get Started Free' : `Upgrade to ${sub.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
