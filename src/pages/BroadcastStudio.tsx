import React, { useState } from 'react';
import { Tv, Copy, Check, Sliders, Play, Pause, RefreshCw, Shield, Monitor, Radio, Settings, Link as LinkIcon } from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { BRAND_NAME, POWERED_BY } from '../data/mockData';

export const BroadcastStudio: React.FC = () => {
  const { matches, selectedMatch, selectMatch, updateMatchScore } = useCricket();
  const [activeTab, setActiveTab] = useState<'links' | 'settings' | 'controls'>('links');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Settings state
  const [themeStyle, setThemeStyle] = useState<'style1' | 'style2' | 'custom'>('style1');
  const [transparency, setTransparency] = useState<'half' | 'full'>('full');
  const [scoreDelay, setScoreDelay] = useState<number>(0);
  const [customBg, setCustomBg] = useState('#0f172a');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  const match = selectedMatch;

  const overlayTypes = [
    { id: 'full', label: 'Full Scoreboard Overlay' },
    { id: 'scorebar', label: 'Scorebar Ticker' },
    { id: 'players', label: 'Player Details' },
    { id: 'bowling', label: 'Bowling Analysis' },
    { id: 'commentary', label: 'Live Commentary Box' },
    { id: 'last-over', label: 'Last Over Ticker' },
  ];

  const getOverlayUrl = (type: string) => {
    return `${window.location.origin}/overlay/${match.id}/${type}?theme=${themeStyle}&trans=${transparency}&delay=${scoreDelay}`;
  };

  const handleCopy = (type: string) => {
    const url = getOverlayUrl(type);
    navigator.clipboard.writeText(url);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Broadcast Studio Header */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-blue-950/60 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <Tv className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">RunBuzz-Style Broadcast Studio</h1>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-red-600/30 text-red-400 font-bold uppercase border border-red-500/30">
                {BRAND_NAME}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Generate transparent OBS browser source overlays & real-time match controls.</p>
          </div>
        </div>

        {/* Match Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 font-medium">Active Match:</label>
          <select
            value={match.id}
            onChange={(e) => selectMatch(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-semibold focus:outline-none focus:border-red-600"
          >
            {matches.map(m => (
              <option key={m.id} value={m.id}>{m.team1} vs {m.team2} ({m.status})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Studio Tabs */}
      <div className="flex border-b border-slate-800">
        {[
          { id: 'links', label: 'A. Link Generator (OBS URLs)', icon: LinkIcon },
          { id: 'settings', label: 'B. Theme & Transparency Settings', icon: Settings },
          { id: 'controls', label: 'C. Live Match Controls', icon: Sliders },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-6 text-sm font-semibold border-b-2 transition-colors ${
                isActive ? 'border-red-600 text-white bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'
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
        {activeTab === 'links' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {overlayTypes.map((item) => {
              const url = getOverlayUrl(item.id);
              const isCopied = copiedLink === item.id;
              return (
                <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">OBS Browser Source</span>
                    <h3 className="text-white font-bold text-base">{item.label}</h3>
                    <p className="text-xs text-slate-400 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 truncate">
                      {url}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleCopy(item.id)}
                      className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                    >
                      Preview
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
              <h3 className="text-white font-bold text-base">Broadcast Style & Transparency</h3>
              
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Match Style Template</label>
                <div className="grid grid-cols-3 gap-3">
                  {['style1', 'style2', 'custom'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setThemeStyle(s as any)}
                      className={`py-2.5 rounded-xl text-xs font-bold uppercase border transition-all ${
                        themeStyle === s ? 'bg-red-600 text-white border-red-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Transparency Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'half', label: 'Half Transparent' },
                    { id: 'full', label: 'Full Transparent (Chroma Key)' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTransparency(t.id as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        transparency === t.id ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Score Broadcast Delay: <span className="text-amber-400 font-bold">{scoreDelay}s</span></label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={scoreDelay}
                  onChange={(e) => setScoreDelay(parseInt(e.target.value))}
                  className="w-full accent-red-600"
                />
                <p className="text-[10px] text-slate-500 mt-1">Applies selected delay consistently across all OBS overlays.</p>
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <Monitor className="w-4 h-4 text-emerald-400" />
                <span>Live Studio Preview</span>
              </h3>
              
              <div className={`w-full aspect-video rounded-2xl border p-6 flex flex-col justify-between shadow-2xl ${
                transparency === 'full' ? 'bg-[#00FF00] border-emerald-500' : 'bg-slate-950/90 border-slate-800'
              }`}>
                <div className="bg-slate-900/90 border border-red-600/60 p-4 rounded-2xl text-white flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="font-bold text-sm">{match.team1} vs {match.team2}</span>
                  </div>
                  <div className="font-mono font-bold text-sm">
                    {match.team1}: {match.team1Score} | {match.team2}: {match.team2Score}
                  </div>
                </div>
                <div className="self-start bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-xl text-xs text-slate-300">
                  Batsman: {match.batsmen[0]?.name} ({match.batsmen[0]?.runs}*)
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'controls' && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 max-w-2xl">
            <h3 className="text-white font-bold text-lg">Live Match Control Panel</h3>
            <p className="text-xs text-slate-400">Quickly toggle match status, active innings, and batting/bowling rotation.</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block">Match Status</span>
                <button
                  onClick={() => updateMatchScore(match.id, { status: match.status === 'LIVE' ? 'PAUSED' : 'LIVE' })}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${
                    match.status === 'LIVE' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                  }`}
                >
                  Status: {match.status}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block">Current Innings</span>
                <button
                  onClick={() => updateMatchScore(match.id, { currentInnings: match.currentInnings === 1 ? 2 : 1 })}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  Innings {match.currentInnings} Active
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 block">Batting Team Control</span>
              <div className="flex gap-2">
                <button
                  onClick={() => updateMatchScore(match.id, { battingTeam: match.team1, bowlingTeam: match.team2 })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${match.battingTeam === match.team1 ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                >
                  {match.team1} Batting
                </button>
                <button
                  onClick={() => updateMatchScore(match.id, { battingTeam: match.team2, bowlingTeam: match.team1 })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${match.battingTeam === match.team2 ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                >
                  {match.team2} Batting
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
