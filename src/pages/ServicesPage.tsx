import React, { useState } from 'react';
import { Briefcase, CheckCircle2, Tv, Globe, Layout, Video, Activity, Send, Check } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { useAuth } from '../context/AuthContext';
import { CricketService } from '../types';

export const ServicesPage: React.FC = () => {
  const { services, createServiceOrder } = useBusiness();
  const { currentUser } = useAuth();

  const [selectedService, setSelectedService] = useState<CricketService | null>(null);
  const [requirements, setRequirements] = useState('');
  const [orderedSuccess, setOrderedSuccess] = useState(false);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    createServiceOrder(
      selectedService.id,
      selectedService.title,
      selectedService.price,
      requirements,
      currentUser?.id || 'usr_guest',
      currentUser?.fullName || 'Guest Client',
      currentUser?.email || 'client@example.com'
    );

    setOrderedSuccess(true);
    setRequirements('');
    setTimeout(() => {
      setOrderedSuccess(false);
      setSelectedService(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-red-400">Professional Business Solutions</span>
        <h1 className="text-4xl font-black text-white">Cricket Broadcasting & Production Services</h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Scale your cricket channel or tournament with professional OBS setups, custom scorecard websites, high-end broadcast graphics, and live tournament management.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv) => (
          <div 
            key={srv.id} 
            className={`bg-slate-900 border rounded-3xl p-6 flex flex-col justify-between transition-all ${
              srv.popular ? 'border-red-600/80 shadow-xl shadow-red-600/10' : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
                  <Tv className="w-6 h-6" />
                </div>
                {srv.popular && (
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-red-600 text-white font-bold uppercase tracking-wide">
                    Most Popular
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-white font-bold text-lg">{srv.title}</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{srv.description}</p>
              </div>

              <ul className="space-y-2 pt-2">
                {srv.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500 line-through">₹{srv.originalPrice}</div>
                <div className="text-xl font-black text-white">₹{srv.price}</div>
              </div>
              <button
                onClick={() => setSelectedService(srv)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs transition-all shadow-lg shadow-red-600/30"
              >
                Request Quotation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quotation / Enquiry Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="bg-gradient-to-r from-red-950/50 via-slate-900 to-blue-950/50 p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Request Service Quotation</h3>
                <p className="text-xs text-red-400 font-semibold">{selectedService.title}</p>
              </div>
              <button onClick={() => setSelectedService(null)} className="p-2 rounded-xl bg-slate-800 text-slate-300">
                ✕
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="p-6 space-y-4">
              {orderedSuccess ? (
                <div className="p-6 text-center space-y-3 bg-emerald-950/40 border border-emerald-800 rounded-2xl">
                  <Check className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-white font-bold text-lg">Enquiry Submitted Successfully!</h4>
                  <p className="text-slate-300 text-sm">Our production team will contact you via phone and WhatsApp within 2 hours.</p>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Package Price</span>
                    <span className="text-lg font-bold text-white">₹{selectedService.price}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Project Requirements / Custom Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Specify your tournament name, streaming platform (YouTube/Facebook), team logos, or custom requirements..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold shadow-lg shadow-red-600/30 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Service Enquiry</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
