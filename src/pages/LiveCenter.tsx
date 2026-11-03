import React, { useState } from 'react';
import { Activity, Play, RefreshCw, Radio, Shield, Zap, TrendingUp, Users, Globe, Award, Clock } from 'lucide-react';
import { useCricket } from '../context/CricketContext';

export const LiveCenter: React.FC = () => {
  const { matches, selectedMatch, selectMatch, simulateNextBall } = useCricket();
  const [activeTab, setActiveTab] = useState<'scoreboard' | 'players' | 'commentary' | 'timeline' | 'analytics'>('scoreboard');
  const [commentaryLang, setCommentaryLang] = useState<'en' | 'hi'>('en');

  const match = selectedMatch || matches[0];

  if (!match) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        No active matches found. Please create a match via the Admin Panel.
      </div>
    );
  }

  const batsmen = match.batsmen || [];
  const bowler = match.bowler || { name: 'Bowler', overs: '0.0', maidens: 0, runs: 0, wickets: 0, economy: 0 };
  const currentPartnership = match.currentPartnership || { runs: 0, balls: 0, batsman1: '-', batsman2: '-' };
  const fallOfWickets = match.fallOfWickets || [];
  const recentBalls = match.recentBalls || [];
  const commentary = match.commentary || [];
  const timeline = match.timeline || [];
  const playingXI1 = match.playingXI1 || [];
  const playingXI2 = match.playingXI2 || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Match Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">Professional Live Cricket Center</span>
          </div>
          <h1 className="text-2xl font-black text-white">{match.title || 'Cricket Match'}</h1>
          <p className="text-xs text-slate-400 mt-1">{match.venue || 'Stadium'} • {match.toss || 'Toss info'}</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 font-medium">Select Match:</label>
          <select
            value={match.id}
            onChange={(e) => selectMatch(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-semibold focus:outline-none focus:border-red-600"
          >
            {matches.map(m => (
              <option key={m.id} value={m.id}>
                {m.team1} vs {m.team2} ({m.status})
              </option>
            ))}
          </select>

          <button
            onClick={() => simulateNextBall(match.id)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-red-600/30"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Simulate Ball</span>
          </button>
        </div>
      </div>

      {/* Main Scoreboard Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Team 1 */}
              <div className={`p-5 rounded-2xl border ${match.currentInnings === 1 ? 'bg-slate-950 border-red-600/50 shadow-lg shadow-red-600/10' : 'bg-slate-950/60 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400">{match.team1}</span>
                  {match.currentInnings === 1 && <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-bold">Batting</span>}
                </div>
                <div className="text-3xl font-black text-white">{match.team1Score || '0/0'}</div>
                <div className="text-xs text-slate-500 mt-1">Overs: {match.overs1 || '0.0'} • CRR: {match.runRate1 || 0}</div>
              </div>

              {/* Team 2 */}
              <div className={`p-5 rounded-2xl border ${match.currentInnings === 2 ? 'bg-slate-950 border-red-600/50 shadow-lg shadow-red-600/10' : 'bg-slate-950/60 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400">{match.team2}</span>
                  {match.currentInnings === 2 && <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-bold">Batting</span>}
                </div>
                <div className="text-3xl font-black text-amber-400">{match.team2Score || '0/0'}</div>
                <div className="text-xs text-slate-500 mt-1">
                  Overs: {match.overs2 || '0.0'} • CRR: {match.runRate2 || 0}
                  {match.target && <span className="block text-red-400 font-semibold mt-0.5">Target: {match.target} (Req RR: {match.requiredRunRate})</span>}
                </div>
              </div>

            </div>

            {/* Recent Balls Ticker with Color Coding */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent 6 Balls Ticker</span>
              <div className="flex items-center gap-2">
                {recentBalls.map((ball, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-md ${
                      ball === 'W' ? 'bg-red-600 text-white' :
                      ball === '6' ? 'bg-amber-500 text-slate-950' :
                      ball === '4' ? 'bg-blue-600 text-white' :
                      ball === 'WD' || ball === 'NB' ? 'bg-purple-600 text-white text-xs' :
                      'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {ball}
                  </div>
                ))}
              </div>
            </div>

            {/* Partnership & Last Wicket */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">Current Partnership</span>
                <span className="text-white font-bold">{currentPartnership.runs} runs ({currentPartnership.balls} balls)</span>
                <div className="text-slate-500 mt-0.5">{currentPartnership.batsman1} & {currentPartnership.batsman2}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">Last Wicket Fallen</span>
                {fallOfWickets.length > 0 ? (
                  <>
                    <span className="text-red-400 font-bold">{fallOfWickets[fallOfWickets.length - 1].batsmanName}</span>
                    <div className="text-slate-500 mt-0.5">Score: {fallOfWickets[fallOfWickets.length - 1].score} (Over {fallOfWickets[fallOfWickets.length - 1].over})</div>
                  </>
                ) : (
                  <span className="text-slate-500">None yet</span>
                )}
              </div>
            </div>
          </div>

          {/* Bowler Summary */}
          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-400">Current Bowler</h3>
            <div className="space-y-1">
              <div className="text-white font-bold text-lg">{bowler.name}</div>
              <div className="text-xs text-slate-400">Overs: {bowler.overs} • Maidens: {bowler.maidens} • Runs: {bowler.runs} • Wickets: <span className="text-amber-400 font-bold">{bowler.wickets}</span></div>
              <div className="text-xs text-slate-500">Economy: {bowler.economy}</div>
            </div>

            <div className="pt-4 border-t border-slate-900 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Match Status</span>
              <div className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {match.status} - {match.battingTeam} batting
              </div>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 pt-4 overflow-x-auto">
          {[
            { id: 'scoreboard', label: 'Scoreboard & Batting' },
            { id: 'players', label: 'Playing XI & Analysis' },
            { id: 'commentary', label: 'Ball-by-Ball Commentary' },
            { id: 'timeline', label: 'Match Updates Timeline' },
            { id: 'analytics', label: 'Statistics & Graphs' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id ? 'border-red-600 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-4">
          {activeTab === 'scoreboard' && (
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm">Active Batsmen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {batsmen.map((bat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">{bat.name}</span>
                        <span className="text-[10px] bg-red-600/30 text-red-400 px-1.5 py-0.5 rounded font-bold border border-red-500/30">Active</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">4s: {bat.fours ?? 0} • 6s: {bat.sixes ?? 0} • SR: {bat.strikeRate ?? 0}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">{bat.runs ?? 0}</div>
                      <div className="text-xs text-slate-500">({bat.balls ?? 0} balls)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'players' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h3 className="text-white font-bold text-sm">{match.team1} Playing XI</h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {playingXI1.map((p, idx) => (
                      <li key={idx} className="flex items-center justify-between py-1 border-b border-slate-900">
                        <span>{idx + 1}. {p}</span>
                        <span className="text-slate-500">Squad Player</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h3 className="text-white font-bold text-sm">{match.team2} Playing XI</h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {playingXI2.map((p, idx) => (
                      <li key={idx} className="flex items-center justify-between py-1 border-b border-slate-900">
                        <span>{idx + 1}. {p}</span>
                        <span className="text-slate-500">Squad Player</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commentary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-bold text-sm">Real-Time Commentary (Chronological)</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCommentaryLang('en')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${commentaryLang === 'en' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setCommentaryLang('hi')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${commentaryLang === 'hi' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {commentary.map((comm) => (
                <div key={comm.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <div className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-bold text-xs">
                    {comm.over}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${comm.source === 'api' ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                        {comm.source === 'api' ? 'Live API Feed' : 'Admin Manual'}
                      </span>
                    </div>
                    <p className={`text-sm ${comm.isWicket ? 'text-red-400 font-bold' : comm.isBoundary ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}>
                      {commentaryLang === 'hi' ? (comm.textHi || comm.textEn) : comm.textEn}
                    </p>
                    <span className="text-[10px] text-slate-500">{comm.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm">Live Match Updates & Milestones Timeline</h3>
              <div className="space-y-3">
                {timeline.map((tl) => (
                  <div key={tl.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-bold text-sm">{tl.title}</h4>
                        <span className="text-[10px] text-slate-500">{tl.time}</span>
                      </div>
                      <p className="text-slate-400 text-xs mt-1">{tl.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6 py-4">
              <h3 className="text-white font-bold text-sm">Match Statistics & Worm Graph</h3>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Over-by-Over Run Comparison</span>
                  <span className="text-red-400 font-bold">{match.team1} vs {match.team2}</span>
                </div>
                <div className="h-48 flex items-end gap-2 pt-6 pb-2 border-b border-slate-800">
                  {[6, 8, 12, 5, 14, 9, 10, 15, 8, 11, 13, 7, 9, 12, 16, 14, 8, 10, 18, 12].map((runs, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div 
                        className={`w-full rounded-t-lg transition-all ${runs > 12 ? 'bg-amber-500' : runs > 8 ? 'bg-red-600' : 'bg-blue-600'}`}
                        style={{ height: `${(runs / 20) * 100}%` }}
                      ></div>
                      <span className="text-[9px] text-slate-500">{i+1}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Over 1</span>
                  <span>Over 10</span>
                  <span>Over 20</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
