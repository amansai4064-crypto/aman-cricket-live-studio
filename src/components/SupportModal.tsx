import React, { useState } from 'react';
import { X, LifeBuoy, Phone, Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBusiness } from '../context/BusinessContext';
import { OFFICIAL_SUPPORT_MOBILE, OFFICIAL_SUPPORT_EMAIL } from '../data/mockData';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { supportTickets, createSupportTicket } = useBusiness();

  const [activeTab, setActiveTab] = useState<'contact' | 'new_ticket' | 'my_tickets'>('contact');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'general' | 'billing' | 'technical' | 'referral' | 'service'>('technical');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    createSupportTicket(
      subject,
      category,
      message,
      currentUser?.id || 'usr_guest',
      currentUser?.fullName || 'Guest User',
      currentUser?.email || 'guest@example.com'
    );

    setSubmitted(true);
    setSubject('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
      setActiveTab('my_tickets');
    }, 1500);
  };

  const userTickets = supportTickets.filter(t => currentUser ? t.userId === currentUser.id : true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950/50 via-slate-900 to-blue-950/50 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <LifeBuoy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Official Customer Support</h2>
              <p className="text-xs text-red-400 font-semibold">Aman Cricket Live Studio & Broadcast Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50">
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'contact' ? 'border-red-600 text-white bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Contact Details
          </button>
          <button
            onClick={() => setActiveTab('new_ticket')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'new_ticket' ? 'border-red-600 text-white bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Raise Ticket
          </button>
          <button
            onClick={() => setActiveTab('my_tickets')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'my_tickets' ? 'border-red-600 text-white bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Track Tickets</span>
            <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 text-xs flex items-center justify-center border border-red-500/30">
              {userTickets.length}
            </span>
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-950/30 to-slate-900 p-5 rounded-2xl border border-red-900/40">
                <h3 className="text-white font-semibold text-base mb-2">Aman Vlogs Pro Official Support Desk</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  For immediate assistance regarding OBS broadcast setup, match scoring, subscription payments, or referral commissions, reach out to our dedicated support team directly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${OFFICIAL_SUPPORT_MOBILE}`}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all text-white font-medium"
                  >
                    <div className="p-2 rounded-lg bg-red-600/20 text-red-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Call Support</div>
                      <div className="text-sm font-bold">+{OFFICIAL_SUPPORT_MOBILE}</div>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/91${OFFICIAL_SUPPORT_MOBILE}?text=Hello%20Aman%20Cricket%20Live%20Studio%20Support`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/60 text-white font-medium"
                  >
                    <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-300">WhatsApp Chat</div>
                      <div className="text-sm font-bold">+{OFFICIAL_SUPPORT_MOBILE}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${OFFICIAL_SUPPORT_EMAIL}`}
                    className="sm:col-span-2 flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all text-white font-medium"
                  >
                    <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Email Support</div>
                      <div className="text-sm font-bold">{OFFICIAL_SUPPORT_EMAIL}</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Support Availability: Mon - Sat (9:00 AM - 8:00 PM IST)</span>
                <span className="text-emerald-400 font-semibold">● Online Now</span>
              </div>
            </div>
          )}

          {activeTab === 'new_ticket' && (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              {submitted ? (
                <div className="p-6 text-center space-y-3 bg-emerald-950/40 border border-emerald-800 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-white font-bold text-lg">Support Ticket Created Successfully!</h3>
                  <p className="text-slate-300 text-sm">Our support team has received your enquiry and will reply shortly.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Issue Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                    >
                      <option value="technical">Technical / OBS Overlay</option>
                      <option value="billing">Billing & Subscription</option>
                      <option value="referral">Referral & Commission</option>
                      <option value="service">Broadcast Services Quotation</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief summary of your query"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Detailed Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue or custom service requirement..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold shadow-lg shadow-red-600/30 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Support Ticket</span>
                  </button>
                </>
              )}
            </form>
          )}

          {activeTab === 'my_tickets' && (
            <div className="space-y-4">
              {userTickets.length === 0 ? (
                <div className="text-center py-10 text-slate-500 space-y-2">
                  <AlertCircle className="w-10 h-10 mx-auto opacity-40" />
                  <p>No support tickets found.</p>
                </div>
              ) : (
                userTickets.map((tkt) => (
                  <div key={tkt.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                        {tkt.category}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                        tkt.status === 'resolved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        tkt.status === 'in_progress' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-red-950 text-red-400 border border-red-800'
                      }`}>
                        {tkt.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold text-sm">{tkt.subject}</h4>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{tkt.message}</p>
                    </div>

                    {tkt.adminReply && (
                      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-xs text-blue-200">
                        <span className="font-bold text-blue-400 block mb-1">Admin Response:</span>
                        {tkt.adminReply}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-900">
                      <span>Ticket ID: {tkt.id}</span>
                      <span>{new Date(tkt.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
