import React, { useState } from 'react';
import { Shield, Users, DollarSign, LifeBuoy, Briefcase, Gift, FileText, CheckCircle2, AlertTriangle, TrendingUp, Download, Settings, Lock, Activity, Play, PlusCircle, Video, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBusiness } from '../context/BusinessContext';
import { useCricket } from '../context/CricketContext';
import { useCreator } from '../context/CreatorContext';

export const AdminDashboard: React.FC = () => {
  const { currentUser, users, adminUpdateUserStatus, adminUpdateUserRole } = useAuth();
  const { 
    services, serviceOrders, supportTickets, transactions, referralRecords, auditLogs,
    commissionRate, updateCommissionRate, approveReferralCommission, updateSupportTicket, updateServiceOrderStatus
  } = useBusiness();
  const { matches, addBallManual, createNewMatchAdmin, updateMatchStatusAdmin } = useCricket();
  const { creatorVideos, updateVideoStatus } = useCreator();

  const [activeTab, setActiveTab] = useState<'overview' | 'scoring' | 'users' | 'earnings' | 'referrals' | 'tickets' | 'services' | 'videos' | 'ai' | 'audit'>('overview');
  const [newCommission, setNewCommission] = useState(commissionRate.toString());
  const [adminReplyText, setAdminReplyText] = useState<{ [key: string]: string }>({});

  // Manual scoring state
  const [scoringMatchId, setScoringMatchId] = useState(matches[0]?.id || '');
  const [runs, setRuns] = useState(0);
  const [extraType, setExtraType] = useState<'none' | 'wd' | 'nb' | 'lb' | 'b'>('none');
  const [isWicket, setIsWicket] = useState(false);
  const [commEn, setCommEn] = useState('');
  const [commHi, setCommHi] = useState('');

  // New Match creation state
  const [newTitle, setNewTitle] = useState('');
  const [newTeam1, setNewTeam1] = useState('');
  const [newTeam2, setNewTeam2] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [newToss, setNewToss] = useState('');

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <Lock className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Access Denied: Admin privileges required.</h2>
        <p className="text-xs text-slate-400">Use the instant demo admin login in the login modal (amanpriya174@gmail.com).</p>
      </div>
    );
  }

  const totalRevenue = transactions.filter(t => t.type !== 'expense').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const netRevenue = totalRevenue - totalExpenses;

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = parseFloat(newCommission);
    if (!isNaN(rate)) {
      updateCommissionRate(rate);
      alert('Referral commission rate updated successfully.');
    }
  };

  const handleSendReply = (ticketId: string) => {
    const reply = adminReplyText[ticketId];
    if (!reply) return;
    updateSupportTicket(ticketId, 'in_progress', reply);
    setAdminReplyText(prev => ({ ...prev, [ticketId]: '' }));
    alert('Admin reply sent successfully.');
  };

  const handleManualBallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoringMatchId) return;
    addBallManual(scoringMatchId, runs, extraType, isWicket, commEn, commHi);
    setCommEn('');
    setCommHi('');
    setIsWicket(false);
    setExtraType('none');
    alert('Ball scored and broadcasted to public scoreboard & OBS overlays in real time!');
  };

  const handleCreateMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newTeam1 || !newTeam2) return;
    createNewMatchAdmin({
      title: newTitle,
      team1: newTeam1,
      team2: newTeam2,
      venue: newVenue || 'International Stadium',
      toss: newToss || `${newTeam1} won the toss`
    });
    setNewTitle('');
    setNewTeam1('');
    setNewTeam2('');
    setNewVenue('');
    setNewToss('');
    alert('New cricket match created successfully and added to Live Match Center.');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + transactions.map(t => `${t.id},${t.userName},${t.category},${t.amount},${t.status},${t.createdAt}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "aman_cricket_financial_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-blue-950/60 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Admin Control Center</h1>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold uppercase border border-amber-500/30">
                Secured Admin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Logged in as {currentUser.email} • Official Support: +7782967261</p>
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 transition-colors shadow-lg"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Export Financial CSV</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto">
        {[
          { id: 'overview', label: 'Business Overview', icon: TrendingUp },
          { id: 'scoring', label: 'Manual Scoring', icon: Activity },
          { id: 'users', label: 'Manage Users', icon: Users },
          { id: 'videos', label: 'Creator Video Approvals', icon: Video },
          { id: 'ai', label: 'AI Support Settings', icon: Bot },
          { id: 'earnings', label: 'Finances', icon: DollarSign },
          { id: 'referrals', label: 'Referrals', icon: Gift },
          { id: 'tickets', label: 'Support Tickets', icon: LifeBuoy },
          { id: 'audit', label: 'Audit Logs', icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                isActive ? 'border-amber-500 text-white bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Total Revenue</span>
                <div className="text-3xl font-black text-white">₹{totalRevenue}</div>
                <div className="text-xs text-emerald-400">● Verified transactions</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Operating Expenses</span>
                <div className="text-3xl font-black text-red-400">₹{totalExpenses}</div>
                <div className="text-xs text-slate-500">Hosting & bandwidth</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Net Business Revenue</span>
                <div className="text-3xl font-black text-amber-400">₹{netRevenue}</div>
                <div className="text-xs text-slate-400">After all deductions</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Total Registered Users</span>
                <div className="text-3xl font-black text-blue-400">{users.length}</div>
                <div className="text-xs text-slate-400">Active platform accounts</div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 max-w-xl">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-400" />
                <span>Configure Referral Commission Percentage</span>
              </h3>
              <form onSubmit={handleCommissionSubmit} className="flex gap-3">
                <input
                  type="number"
                  value={newCommission}
                  onChange={(e) => setNewCommission(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white w-32 focus:outline-none focus:border-amber-500"
                />
                <span className="self-center font-bold text-slate-300">%</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors"
                >
                  Update Rate
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'scoring' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
              <h3 className="text-white font-bold text-lg">Admin Manual Ball Scoring</h3>
              <form onSubmit={handleManualBallSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Select Active Match</label>
                  <select
                    value={scoringMatchId}
                    onChange={(e) => setScoringMatchId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {matches.map(m => (
                      <option key={m.id} value={m.id}>{m.title} ({m.status})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Runs Scored</label>
                    <select
                      value={runs}
                      onChange={(e) => setRuns(parseInt(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                    >
                      <option value={0}>0 Dot Ball</option>
                      <option value={1}>1 Run</option>
                      <option value={2}>2 Runs</option>
                      <option value={3}>3 Runs</option>
                      <option value={4}>4 (FOUR)</option>
                      <option value={6}>6 (SIX)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Extras</label>
                    <select
                      value={extraType}
                      onChange={(e) => setExtraType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                    >
                      <option value="none">None</option>
                      <option value="wd">Wide (WD)</option>
                      <option value="nb">No Ball (NB)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <input
                    type="checkbox"
                    id="wicket"
                    checked={isWicket}
                    onChange={(e) => setIsWicket(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-red-600 w-4 h-4"
                  />
                  <label htmlFor="wicket" className="text-xs font-bold text-red-400">Wicket Fallen</label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">English Commentary</label>
                  <input
                    type="text"
                    value={commEn}
                    onChange={(e) => setCommEn(e.target.value)}
                    placeholder="e.g. Driven through covers for four!"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">हिन्दी Commentary</label>
                  <input
                    type="text"
                    value={commHi}
                    onChange={(e) => setCommHi(e.target.value)}
                    placeholder="उदा. कवर की दिशा में चौका!"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold text-sm shadow-xl"
                >
                  Broadcast Ball to Scoreboard & OBS
                </button>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
              <h3 className="text-white font-bold text-lg">Create New Match</h3>
              <form onSubmit={handleCreateMatchSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Match Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. IPL 2026 - Final"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Team 1 *</label>
                    <input
                      type="text"
                      required
                      value={newTeam1}
                      onChange={(e) => setNewTeam1(e.target.value)}
                      placeholder="Mumbai Warriors"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Team 2 *</label>
                    <input
                      type="text"
                      required
                      value={newTeam2}
                      onChange={(e) => setNewTeam2(e.target.value)}
                      placeholder="Chennai Superstars"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Venue</label>
                  <input
                    type="text"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="Wankhede Stadium, Mumbai"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700"
                >
                  Schedule & Launch Match
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">Creator Video Approvals</h3>
            <div className="space-y-3">
              {creatorVideos.map(vid => (
                <div key={vid.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={vid.thumbnailUrl} alt="" className="w-20 h-14 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-white font-semibold text-sm">{vid.title}</h4>
                      <p className="text-xs text-slate-400">Creator: {vid.creatorName} • Category: {vid.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                      vid.status === 'published' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {vid.status}
                    </span>
                    {vid.status === 'pending_review' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateVideoStatus(vid.id, 'published')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                        >
                          Approve & Publish
                        </button>
                        <button
                          onClick={() => updateVideoStatus(vid.id, 'rejected', 'Does not meet broadcasting standards.')}
                          className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 max-w-xl">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-400" />
              <span>AI Support Manager Settings</span>
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Configure AI Support Manager behavior, bilingual English & Hindi responses, and rate limits for creators.
            </p>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">AI Chat Floating Widget</div>
                <div className="text-xs text-slate-400">Status: Active on all public and creator pages</div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">Enabled</span>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">User Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="p-4 font-semibold text-white">{u.fullName}</td>
                      <td className="p-4 text-xs text-slate-400">{u.email}</td>
                      <td className="p-4 text-xs font-bold text-amber-400 uppercase">{u.role}</td>
                      <td className="p-4 text-xs font-bold text-emerald-400">{u.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">Financial Transactions</h3>
            <div className="space-y-3">
              {transactions.map(tx => (
                <div key={tx.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">{tx.description}</div>
                    <div className="text-xs text-slate-400">{tx.category} • {new Date(tx.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="text-emerald-400 font-black">₹{tx.amount}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">Referrals</h3>
            <div className="space-y-3">
              {referralRecords.map(ref => (
                <div key={ref.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between text-xs">
                  <div>Referrer: {ref.referrerName} ➔ {ref.referredUserName}</div>
                  <div className="text-emerald-400 font-bold">₹{ref.commissionAmount}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">Support Tickets</h3>
            <div className="space-y-4">
              {supportTickets.map(tkt => (
                <div key={tkt.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs text-amber-400 font-bold">
                    <span>{tkt.userName} ({tkt.userEmail})</span>
                    <span>{tkt.status}</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm">{tkt.subject}</h4>
                  <p className="text-slate-400 text-xs">{tkt.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">Audit Logs</h3>
            <div className="space-y-3">
              {auditLogs.map(log => (
                <div key={log.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between text-xs">
                  <div>
                    <span className="text-amber-400 font-semibold">{log.action}</span> • {log.details}
                  </div>
                  <div className="text-slate-500">{log.adminName}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
