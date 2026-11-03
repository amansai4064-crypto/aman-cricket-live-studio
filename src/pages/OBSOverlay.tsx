import React, { useState } from 'react';
import { Tv, Copy, Check, Sliders, Sparkles, Monitor, Radio } from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { BRAND_NAME } from '../data/mockData';

export const OBSOverlay: React.FC = () => {
  const { selectedMatch } = useCricket();
  const [theme, setTheme] = useState<'classic' | 'neon' | 'cyberpunk' | 'minimal'>('classic');
  const [chromaKey, setChromaKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const match = selectedMatch;
  const widgetUrl = `${window.location.origin}/obs-widget?match=${match.id}&theme=${theme}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(widgetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">OBS Broadcast Overlay Generator</span>
          </div>
          <h1 className="text-2xl font-black text-white">Live Stream Scoreboard & Lower Thirds</h1>
          <p className="text-xs text-slate-400 mt-1">Configure your OBS Browser Source for YouTube, Facebook, or Twitch cricket live streaming.</p>
        </div>

        <button
          onClick={handleCopyUrl}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-lg shadow-red-600/30 transition-all"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Widget URL Copied!' : 'Copy OBS Browser Source URL'}</span>
        </button>
      </div>

      {/* Controls & Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Settings Panel */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <Sliders className="w-4 h-4 text-red-400" />
            <span>Overlay Customization</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Select Broadcast Theme</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'classic', label: 'Classic Red/Black' },
                { id: 'neon', label: 'Neon Cyber' },
                { id: 'cyberpunk', label: 'Gold Accent' },
                { id: 'minimal', label: 'Minimal Dark' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    theme === t.id ? 'bg-red-600 text-white border-red-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Background Mode</label>
            <button
              onClick={() => setChromaKey(!chromaKey)}
              className={`w-full py-3 px-4 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                chromaKey ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700' : 'bg-slate-950 text-slate-300 border-slate-800'
              }`}
            >
              <span>Chroma Key Green Screen</span>
              <span className={`w-3 h-3 rounded-full ${chromaKey ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></span>
            </button>
            <p className="text-[10px] text-slate-500 mt-1">Enable pure green background (#00FF00) for OBS chroma key transparency.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400">OBS Setup Instructions:</span>
            <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside">
              <li>Copy the Browser Source URL above.</li>
              <li>Open OBS Studio & add a new <strong>Browser Source</strong>.</li>
              <li>Paste URL, set width to 1920 & height to 1080.</li>
              <li>Enable Chroma Key filter in OBS if green screen is active.</li>
            </ol>
          </div>
        </div>

        {/* Live Preview Screen */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <Monitor className="w-4 h-4 text-blue-400" />
              <span>Live Broadcast Overlay Preview (1080p Streamer View)</span>
            </h3>
            <span className="text-xs text-slate-400">Match: {match.title}</span>
          </div>

          {/* Overlay Box Container */}
          <div className={`w-full aspect-video rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden transition-all shadow-2xl ${
            chromaKey ? 'bg-[#00FF00] border-emerald-500' : 'bg-slate-950 border-slate-800'
          }`}>
            {!chromaKey && (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.1),transparent_50%)] pointer-events-none"></div>
            )}

            {/* Top Score Ticker Bar */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between shadow-lg ${
              theme === 'neon' ? 'bg-slate-900/90 border-cyan-500 text-cyan-300' :
              theme === 'cyberpunk' ? 'bg-slate-900/90 border-amber-500 text-amber-300' :
              'bg-slate-900/90 border-red-600/60 text-white'
            }`}>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold animate-pulse">LIVE</span>
                <span className="font-bold text-sm">{match.team1} vs {match.team2}</span>
              </div>

              <div className="flex items-center gap-6 font-mono font-bold text-sm">
                <div>{match.team1}: <span className="text-white">{match.team1Score}</span> ({match.overs1})</div>
                <div>{match.team2}: <span className="text-amber-400">{match.team2Score}</span> ({match.overs2})</div>
              </div>

              <div className="text-xs text-slate-400 font-sans hidden sm:block">
                {BRAND_NAME}
              </div>
            </div>

            {/* Lower Thirds Player / Bowler Info */}
            <div className="self-start max-w-md bg-slate-900/90 border border-slate-700 p-4 rounded-2xl shadow-2xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Current Batsman</span>
                <span className="text-[10px] text-slate-400">{match.battingTeam}</span>
              </div>
              <div className="flex items-center justify-between text-white font-bold">
                <span>{match.batsmen[0]?.name}</span>
                <span>{match.batsmen[0]?.runs}* ({match.batsmen[0]?.balls})</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Bowler: {match.bowler.name} ({match.bowler.wickets}/{match.bowler.runs})
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
