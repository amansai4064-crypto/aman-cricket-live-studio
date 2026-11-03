import React, { createContext, useContext, useState, useEffect } from 'react';
import { MatchScore, MatchUpdateTimeline } from '../types';
import { initialMatches } from '../data/mockData';

interface CricketContextType {
  matches: MatchScore[];
  selectedMatch: MatchScore;
  selectMatch: (id: string) => void;
  updateMatchScore: (matchId: string, updates: Partial<MatchScore>) => void;
  addBallManual: (matchId: string, runs: number, extraType: 'none' | 'wd' | 'nb' | 'lb' | 'b', isWicket: boolean, commentaryEn: string, commentaryHi: string) => void;
  createNewMatchAdmin: (matchData: { title: string; team1: string; team2: string; venue: string; toss: string }) => void;
  updateMatchStatusAdmin: (matchId: string, status: MatchScore['status']) => void;
  simulateNextBall: (matchId: string) => void;
}

const CricketContext = createContext<CricketContextType | undefined>(undefined);

export const CricketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<MatchScore[]>(() => {
    const saved = localStorage.getItem('aman_cricket_matches');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialMatches;
  });

  const [selectedMatchId, setSelectedMatchId] = useState<string>(matches[0]?.id || 'match_1');

  useEffect(() => {
    localStorage.setItem('aman_cricket_matches', JSON.stringify(matches));
  }, [matches]);

  const selectedMatch = matches.find(m => m.id === selectedMatchId) || matches[0];

  const selectMatch = (id: string) => {
    setSelectedMatchId(id);
  };

  const updateMatchScore = (matchId: string, updates: Partial<MatchScore>) => {
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, ...updates } : m));
  };

  const addBallManual = (matchId: string, runs: number, extraType: 'none' | 'wd' | 'nb' | 'lb' | 'b', isWicket: boolean, commentaryEn: string, commentaryHi: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;

      let ballLabel = runs.toString();
      if (extraType === 'wd') ballLabel = 'WD';
      else if (extraType === 'nb') ballLabel = 'NB';
      else if (isWicket) ballLabel = 'W';
      else if (runs === 4) ballLabel = '4';
      else if (runs === 6) ballLabel = '6';

      const newBalls = [ballLabel, ...m.recentBalls.slice(0, 5)];

      // Update commentary
      const newComm = {
        id: 'comm_' + Date.now(),
        over: (parseFloat(m.overs2) + 0.1).toFixed(1),
        textEn: commentaryEn || `Ball update: ${runs} runs scored (${extraType}).`,
        textHi: commentaryHi || `गेंद अपडेट: ${runs} रन बनाए गए।`,
        isWicket,
        isBoundary: runs === 4 || runs === 6,
        source: 'manual' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Calculate new score
      const currentScoreParts = m.currentInnings === 2 ? m.team2Score.split('/') : m.team1Score.split('/');
      let totalRuns = parseInt(currentScoreParts[0]) || 0;
      let totalWickets = parseInt(currentScoreParts[1]) || 0;

      totalRuns += runs;
      if (extraType === 'wd' || extraType === 'nb') totalRuns += 1;
      if (isWicket) totalWickets += 1;

      const newScoreStr = `${totalRuns}/${totalWickets}`;

      // Update timeline if wicket
      const newTimeline = [...m.timeline];
      if (isWicket) {
        newTimeline.unshift({
          id: 'tl_' + Date.now(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: `Wicket Fallen!`,
          description: `Wicket down at score ${newScoreStr}`,
          type: 'wicket'
        });
      }

      return {
        ...m,
        team2Score: m.currentInnings === 2 ? newScoreStr : m.team2Score,
        team1Score: m.currentInnings === 1 ? newScoreStr : m.team1Score,
        recentBalls: newBalls,
        commentary: [newComm, ...m.commentary],
        timeline: newTimeline
      };
    }));
  };

  const createNewMatchAdmin = (matchData: { title: string; team1: string; team2: string; venue: string; toss: string }) => {
    const newMatch: MatchScore = {
      id: 'match_' + Date.now(),
      title: matchData.title,
      team1: matchData.team1,
      team2: matchData.team2,
      team1Score: '0/0',
      team2Score: '0/0',
      overs1: '0.0',
      overs2: '0.0',
      status: 'UPCOMING',
      currentInnings: 1,
      runRate1: 0.0,
      runRate2: 0.0,
      toss: matchData.toss,
      venue: matchData.venue,
      battingTeam: matchData.team1,
      bowlingTeam: matchData.team2,
      playingXI1: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9', 'Player 10', 'Player 11'],
      playingXI2: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9', 'Player 10', 'Player 11'],
      fallOfWickets: [],
      currentPartnership: { runs: 0, balls: 0, batsman1: 'Batsman 1', batsman2: 'Batsman 2' },
      batsmen: [
        { id: 'b1', name: 'Batsman 1', role: 'Batsman', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'batting' }
      ],
      bowler: { name: 'Bowler 1', overs: '0.0', maidens: 0, runs: 0, wickets: 0, economy: 0.0 },
      recentBalls: [],
      commentary: [{ id: 'c_init', over: '0.0', textEn: 'Match created and scheduled.', textHi: 'मैच शुरू होने वाला है।', source: 'manual', timestamp: 'Just now' }],
      timeline: [{ id: 'tl_init', time: 'Just now', title: 'Match Created', description: `${matchData.team1} vs ${matchData.team2} scheduled at ${matchData.venue}`, type: 'start' }]
    };

    setMatches(prev => [newMatch, ...prev]);
    setSelectedMatchId(newMatch.id);
  };

  const updateMatchStatusAdmin = (matchId: string, status: MatchScore['status']) => {
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, status } : m));
  };

  const simulateNextBall = (matchId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      const outcomes = ['0', '1', '2', '4', '6', 'W', 'WD'];
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      const newBalls = [randomOutcome, ...m.recentBalls.slice(0, 5)];
      
      const newComm = {
        id: 'comm_' + Date.now(),
        over: (parseFloat(m.overs2) + 0.1).toFixed(1),
        textEn: `Simulated ball update: ${randomOutcome} scored.`,
        textHi: `सिम्युलेटेड गेंद अपडेट: ${randomOutcome} रन।`,
        isWicket: randomOutcome === 'W',
        isBoundary: randomOutcome === '4' || randomOutcome === '6',
        source: 'api' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      return {
        ...m,
        recentBalls: newBalls,
        commentary: [newComm, ...m.commentary]
      };
    }));
  };

  return (
    <CricketContext.Provider value={{
      matches,
      selectedMatch,
      selectMatch,
      updateMatchScore,
      addBallManual,
      createNewMatchAdmin,
      updateMatchStatusAdmin,
      simulateNextBall
    }}>
      {children}
    </CricketContext.Provider>
  );
};

export const useCricket = () => {
  const context = useContext(CricketContext);
  if (!context) throw new Error('useCricket must be used within a CricketProvider');
  return context;
};
