import React from 'react';
import { useCricket } from '../context/CricketContext';
import { BRAND_NAME } from '../data/mockData';

interface OverlayViewerProps {
  matchId: string;
  overlayType: string;
}

export const OverlayViewer: React.FC<OverlayViewerProps> = ({ matchId, overlayType }) => {
  const { matches } = useCricket();
  const match = matches.find(m => m.id === matchId) || matches[0];

  const params = new URLSearchParams(window.location.search);
  const transMode = params.get('trans') || 'full';
  const isChromaKey = transMode === 'full';

  return (
    <div className={`w-screen h-screen overflow-hidden p-6 flex flex-col justify-between ${
      isChromaKey ? 'bg-[#00FF00]' : 'bg-transparent'
    }`}>
      
      {/* 1. Full Scoreboard Overlay */}
      {overlayType === 'full' && (
        <div className="w-full max-w-4xl mx-auto bg-slate-900/95 border-2 border-red-600/80 rounded-3xl p-6 text-white shadow-2xl space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
              <span className="font-extrabold text-sm uppercase text-red-400">{match.title}</span>
            </div>
            <span className="text-xs font-mono text-slate-400">{BRAND_NAME}</span>
          </div>

          <div className="grid grid-cols-2 gap-6 text-center">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-bold">{match.team1}</div>
              <div className="text-4xl font-black text-white mt-1">{match.team1Score}</div>
              <div className="text-xs text-slate-500 mt-1">Overs: {match.overs1}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-bold">{match.team2}</div>
              <div className="text-4xl font-black text-amber-400 mt-1">{match.team2Score}</div>
              <div className="text-xs text-slate-500 mt-1">Overs: {match.overs2}</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
            <span>Batting: {match.batsmen[0]?.name} ({match.batsmen[0]?.runs}*) & {match.batsmen[1]?.name} ({match.batsmen[1]?.runs}*)</span>
            <span>Bowler: {match.bowler.name} ({match.bowler.wickets}/{match.bowler.runs})</span>
          </div>
        </div>
      )}

      {/* 2. Scorebar Ticker */}
      {overlayType === 'scorebar' && (
        <div className="w-full max-w-5xl mx-auto bg-slate-900/95 border border-red-600/60 px-6 py-3 rounded-2xl text-white shadow-2xl flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold animate-pulse">LIVE</span>
            <span className="font-bold text-sm">{match.team1} vs {match.team2}</span>
          </div>
          <div className="flex items-center gap-6 font-mono font-bold text-sm">
            <div>{match.team1}: <span className="text-white">{match.team1Score}</span> ({match.overs1})</div>
            <div>{match.team2}: <span className="text-amber-400">{match.team2Score}</span> ({match.overs2})</div>
          </div>
          <div className="flex items-center gap-1.5">
            {match.recentBalls.map((b, i) => (
              <span key={i} className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                b === 'W' ? 'bg-red-600 text-white' : b === '6' ? 'bg-amber-500 text-black' : 'bg-slate-800 text-white'
              }`}>
                {b}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 3. Player Details */}
      {overlayType === 'players' && (
        <div className="self-start max-w-md bg-slate-900/95 border border-slate-700 p-5 rounded-2xl text-white shadow-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Current Batsman</span>
          <div className="flex items-center justify-between font-bold text-lg">
            <span>{match.batsmen[0]?.name}</span>
            <span>{match.batsmen[0]?.runs} ({match.batsmen[0]?.balls})</span>
          </div>
          <div className="text-xs text-slate-400">
            4s: {match.batsmen[0]?.fours} • 6s: {match.batsmen[0]?.sixes} • SR: {match.batsmen[0]?.strikeRate}
          </div>
        </div>
      )}

      {/* 4. Bowling Analysis */}
      {overlayType === 'bowling' && (
        <div className="self-start max-w-md bg-slate-900/95 border border-slate-700 p-5 rounded-2xl text-white shadow-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Current Bowler</span>
          <div className="flex items-center justify-between font-bold text-lg">
            <span>{match.bowler.name}</span>
            <span>{match.bowler.wickets}-{match.bowler.runs}</span>
          </div>
          <div className="text-xs text-slate-400">
            Overs: {match.bowler.overs} • Economy: {match.bowler.economy}
          </div>
        </div>
      )}

      {/* 5. Live Commentary Box */}
      {overlayType === 'commentary' && (
        <div className="self-start max-w-md bg-slate-900/95 border border-slate-700 p-5 rounded-2xl text-white shadow-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Live Commentary ({match.commentary[0]?.over})</span>
          <p className="text-xs text-slate-200">{match.commentary[0]?.textEn}</p>
        </div>
      )}

      {/* 6. Last Over Ticker */}
      {overlayType === 'last-over' && (
        <div className="self-start max-w-md bg-slate-900/95 border border-slate-700 p-4 rounded-2xl text-white shadow-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Last 6 Balls Ticker</span>
          <div className="flex items-center gap-2">
            {match.recentBalls.map((b, i) => (
              <span key={i} className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center border border-slate-700">
                {b}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
