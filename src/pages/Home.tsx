import React, { useState } from 'react';
import { Radio, Tv, Activity, Briefcase, CreditCard, ArrowRight, ShieldCheck, Phone, CheckCircle2, Award, Clock, Share2, Calendar, MapPin } from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { useBusiness } from '../context/BusinessContext';
import { BRAND_NAME, POWERED_BY, OFFICIAL_SUPPORT_MOBILE } from '../data/mockData';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  onOpenSupport: () => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab, onOpenSupport }) => {
  const { matches, selectMatch } = useCricket();
  const { services } = useBusiness();
  const [filterTab, setFilterTab] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');

  const liveMatches = matches.filter(m => m.status === 'LIVE');
  const upcomingMatches = matches.filter(m => m.status === 'UPCOMING');
  const completedMatches = matches.filter(m => m.status === 'COMPLETED');

  const filteredMatches = matches.filter(m => {
    if (filterTab === 'live') return m.status === 'LIVE';
    if (filterTab === 'upcoming') return m.status === 'UPCOMING';
    if (filterTab === 'completed') return m.status === 'COMPLETED';
    return true;
  });

  const handleShareMatch = (matchTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = window.location.origin;
    if (navigator.share) {
      navigator.share({ title: matchTitle, text: `Watch live cricket score for ${matchTitle} on ${BRAND_NAME}`, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Match link copied to clipboard for sharing!');
    }
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-10 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.15),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.15),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-bold uppercase tracking-wide">
            <Award className="w-4 h-4 text-amber-400" />
            {BRAND_NAME} • {POWERED_BY}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Professional Cricket Live Scores & Broadcasts
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Instant live scores, full scorecards, ball-by-ball commentary in English & Hindi, interactive graphs, and professional OBS overlays for creators worldwide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentTab('live')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all"
            >
              <Activity className="w-4 h-4" />
              <span>Launch Live Match Center</span>
            </button>
            <button
              onClick={() => setCurrentTab('broadcast-studio')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              <Tv className="w-4 h-4 text-red-400" />
              <span>Broadcast Studio</span>
            </button>
          </div>
        </div>
      </section>

      {/* Match Category Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-900 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Matches', count: matches.length },
              { id: 'live', label: 'Live', count: liveMatches.length },
              { id: 'upcoming', label: 'Upcoming', count: upcomingMatches.length },
              { id: 'completed', label: 'Completed', count: completedMatches.length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  filterTab === tab.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${filterTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Realtime Supabase Match Feed Active
          </div>
        </div>
      </div>

      {/* MATCH SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* A. LIVE MATCHES */}
        {(filterTab === 'all' || filterTab === 'live') && liveMatches.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
              <h2 className="text-2xl font-black text-white tracking-tight">LIVE MATCHES</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMatches.map(match => (
                <div
                  key={match.id}
                  onClick={() => { selectMatch(match.id); setCurrentTab('live'); }}
                  className="bg-slate-900 border border-red-600/50 rounded-3xl p-6 cursor-pointer hover:border-red-500 transition-all shadow-xl shadow-red-600/10 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        LIVE MATCH
                      </span>
                      <button
                        onClick={(e) => handleShareMatch(match.title, e)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Share Match"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-base group-hover:text-red-400 transition-colors">{match.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{match.venue}</p>
                    </div>

                    <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{match.team1}</span>
                        <span className="font-black text-white text-base">{match.team1Score}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-400">{match.team2}</span>
                        <span className="font-black text-amber-400 text-base">{match.team2Score}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="text-emerald-400 font-semibold">{match.battingTeam} batting</span>
                      <span>CRR: {match.runRate2 || match.runRate1}</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
                    <span>Live Scorecard & Commentary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* B. UPCOMING MATCHES */}
        {(filterTab === 'all' || filterTab === 'upcoming') && upcomingMatches.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-black text-white tracking-tight">UPCOMING MATCHES</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map(match => (
                <div
                  key={match.id}
                  onClick={() => { selectMatch(match.id); setCurrentTab('live'); }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400">UPCOMING</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" /> Starts Soon
                      </span>
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-base">{match.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-400" /> {match.venue}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                      <div className="text-sm font-bold text-white">{match.team1} vs {match.team2}</div>
                      <div className="text-xs text-slate-400">{match.toss}</div>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                    <span>Match Details & Lineups</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* C. COMPLETED MATCHES */}
        {(filterTab === 'all' || filterTab === 'completed') && completedMatches.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-2xl font-black text-white tracking-tight">COMPLETED MATCHES</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedMatches.map(match => (
                <div
                  key={match.id}
                  onClick={() => { selectMatch(match.id); setCurrentTab('live'); }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">COMPLETED</span>
                      <span className="text-[10px] text-slate-400">{match.venue}</span>
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-base">{match.title}</h3>
                    </div>

                    <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-300">{match.team1}</span>
                        <span className="text-white">{match.team1Score}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-300">{match.team2}</span>
                        <span className="text-white">{match.team2Score}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-xs text-emerald-300 font-semibold text-center">
                      Result: Pakistan won by 5 wickets
                    </div>
                  </div>

                  <button className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                    <span>Full Scorecard & Summary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Services Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <h2 className="text-3xl font-black text-white">Professional Cricket Broadcast Services</h2>
          <p className="text-slate-400 text-sm">
            Scale your cricket channel or tournament with professional OBS setups, custom scorecard websites, and broadcast graphics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((srv) => (
            <div key={srv.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
                  <Tv className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-base">{srv.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{srv.description}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="text-lg font-black text-white">₹{srv.price}</div>
                <button
                  onClick={() => setCurrentTab('services')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs"
                >
                  Order Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
