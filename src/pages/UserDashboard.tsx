import React, { useState } from 'react';
import { User, Copy, Check, Gift, DollarSign, CreditCard, Shield, Clock, Award, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBusiness } from '../context/BusinessContext';

export const UserDashboard: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { transactions, referralRecords } = useBusiness();

  const [activeTab, setActiveTab] = useState<'profile' | 'referral' | 'earnings' | 'subscriptions' | 'settings'>('profile');
  const [copied, setCopied] = useState(false);
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [mobile, setMobile] = useState(currentUser?.mobile || '');
  const [successMsg, setSuccessMsg] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Please login to access your user dashboard.</h2>
      </div>
    );
  }

  const referralLink = `${window.location.origin}/?ref=${currentUser.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, mobile });
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  const userTransactions = transactions.filter(t => t.userId === currentUser.id);
  const userReferrals = referralRecords.filter(r => r.referrerId === currentUser.id);
  const totalCommissionEarned = userReferrals.reduce((acc, r) => acc + (r.status !== 'registered' ? r.commissionAmount : 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>

        <div className="flex items-center gap-5">
          <img
            src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt=""
            className="w-20 h-20 rounded-2xl object-cover border-2 border-red-600/60 shadow-xl"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">{currentUser.fullName}</h1>
              <span className="text-xs px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 font-bold border border-red-500/30">
                {currentUser.subscriptionPlan} Plan
              </span>
            </div>
            <p className="text-xs text-slate-400">{currentUser.email} • ID: {currentUser.id}</p>
            <p className="text-xs text-amber-400 font-medium">Referral Code: <span className="font-mono font-bold">{currentUser.referralCode}</span></p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Referrals</div>
            <div className="text-xl font-bold text-white">{userReferrals.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Commission Earned</div>
            <div className="text-xl font-bold text-emerald-400">₹{totalCommissionEarned}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto">
        {[
          { id: 'profile', label: 'Overview & Profile', icon: User },
          { id: 'referral', label: 'Single-Level Referral Program', icon: Gift },
          { id: 'earnings', label: 'Earnings & Transactions', icon: DollarSign },
          { id: 'subscriptions', label: 'Subscription Status', icon: CreditCard },
          { id: 'settings', label: 'Account Settings', icon: Shield },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                isActive ? 'border-red-600 text-white bg-slate-900/40' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-white font-bold text-base">Account Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Full Name</span>
                  <span className="text-white font-semibold">{currentUser.fullName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Email Address</span>
                  <span className="text-white font-semibold">{currentUser.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Mobile Number</span>
                  <span className="text-white font-semibold">{currentUser.mobile}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Account Role</span>
                  <span className="text-amber-400 font-bold uppercase">{currentUser.role}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Member Since</span>
                  <span className="text-white font-semibold">{new Date(currentUser.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-white font-bold text-base">Quick Referral Share</h3>
              <p className="text-slate-400 text-xs">Share your unique referral link to earn commission when your friends upgrade their subscription.</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-300"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'referral' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">Single-Level Referral Program</h3>
                  <p className="text-slate-400 text-xs mt-1">Earn direct commission when users registered via your code complete eligible paid transactions.</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Your Referral Code</div>
                  <div className="text-lg font-mono font-black text-amber-400">{currentUser.referralCode}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Total Referrals</div>
                  <div className="text-2xl font-black text-white">{userReferrals.length}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Eligible Paid Referrals</div>
                  <div className="text-2xl font-black text-blue-400">{userReferrals.filter(r => r.status !== 'registered').length}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Commission Earned</div>
                  <div className="text-2xl font-black text-emerald-400">₹{totalCommissionEarned}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-white font-bold text-base">Referral History</h3>
              <div className="space-y-3">
                {userReferrals.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">No referrals recorded yet. Share your referral link!</div>
                ) : (
                  userReferrals.map(ref => (
                    <div key={ref.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold text-sm">{ref.referredUserName}</div>
                        <div className="text-xs text-slate-400">{ref.referredUserEmail} • {new Date(ref.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                          ref.status === 'commission_paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          ref.status === 'eligible_paid' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {ref.status.replace('_', ' ')}
                        </span>
                        <div className="text-sm font-bold text-emerald-400 mt-1">₹{ref.commissionAmount}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">Earnings & Transaction History</h3>
            <div className="space-y-3">
              {userTransactions.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No transactions recorded.</div>
              ) : (
                userTransactions.map(tx => (
                  <div key={tx.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold text-sm">{tx.description}</div>
                      <div className="text-xs text-slate-400">{tx.category} • {new Date(tx.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-400">+₹{tx.amount}</div>
                      <span className="text-[10px] text-slate-500 uppercase">{tx.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">Active Subscription Status</h3>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">Current Plan</span>
                <div className="text-2xl font-black text-white mt-1">{currentUser.subscriptionPlan} Plan</div>
                <p className="text-xs text-slate-400 mt-1">Status: <span className="text-emerald-400 font-bold uppercase">{currentUser.subscriptionStatus}</span></p>
              </div>
              <a
                href="#pricing"
                onClick={() => window.location.hash = '#pricing'}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
              >
                Change / Upgrade Plan
              </a>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <form onSubmit={handleProfileUpdate} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 max-w-xl">
            <h3 className="text-white font-bold text-lg">Edit Account Settings</h3>
            {successMsg && <div className="p-3 rounded-xl bg-emerald-950/60 text-emerald-300 text-xs">{successMsg}</div>}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
