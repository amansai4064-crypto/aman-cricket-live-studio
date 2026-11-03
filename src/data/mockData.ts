import { UserProfile, MatchScore, CricketService, ServiceOrder, SupportTicket, Transaction, ReferralRecord } from '../types';

export const OFFICIAL_SUPPORT_MOBILE = "7782967261";
export const OFFICIAL_SUPPORT_EMAIL = "amanpriya174@gmail.com";
export const BRAND_NAME = "Aman Cricket Live Studio";
export const POWERED_BY = "Aman Vlogs Pro";

export const initialUsers: UserProfile[] = [
  {
    id: 'usr_admin_1',
    fullName: 'Aman Priya',
    email: 'amanpriya174@gmail.com',
    mobile: '7782967261',
    role: 'admin',
    referralCode: 'AMANPRO',
    createdAt: '2026-01-15T10:00:00Z',
    subscriptionPlan: 'BUSINESS',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: '2027-01-15T10:00:00Z',
    isVerified: true,
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 'usr_demo_2',
    fullName: 'Rahul Sharma',
    email: 'rahul@example.com',
    mobile: '9876543210',
    role: 'user',
    referralCode: 'RAHUL2026',
    referredBy: 'AMANPRO',
    createdAt: '2026-02-01T14:30:00Z',
    subscriptionPlan: 'PRO',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: '2026-06-01T14:30:00Z',
    isVerified: true,
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  }
];

export const initialMatches: MatchScore[] = [
  {
    id: 'match_1',
    title: 'IPL 2026 - Qualifier 1',
    team1: 'Mumbai Warriors',
    team2: 'Chennai Superstars',
    team1Score: '188/4',
    team2Score: '145/6',
    overs1: '20.0',
    overs2: '17.2',
    status: 'LIVE',
    currentInnings: 2,
    runRate1: 9.40,
    runRate2: 8.38,
    requiredRunRate: 12.43,
    target: 189,
    runsRequired: 44,
    toss: 'Mumbai Warriors won the toss and elected to bat',
    venue: 'Wankhede Stadium, Mumbai',
    battingTeam: 'Chennai Superstars',
    bowlingTeam: 'Mumbai Warriors',
    playerOfTheMatch: 'Jasprit Bumrah (Pending)',
    playingXI1: ['Rohit Sharma', 'Ishan Kishan', 'Suryakumar Yadav', 'Hardik Pandya', 'Tim David', 'Tilak Varma', 'Mohammad Nabi', 'Jasprit Bumrah', 'Gerald Coetzee', 'Piyush Chawla', 'Trent Boult'],
    playingXI2: ['Ruturaj Gaikwad', 'Devon Conway', 'Ajinkya Rahane', 'Shivam Dube', 'Ravindra Jadeja', 'MS Dhoni', 'Deepak Chahar', 'Maheesh Theekshana', 'Matheesha Pathirana', 'Tushar Deshpande', 'Shardul Thakur'],
    fallOfWickets: [
      { wicketNumber: 1, batsmanName: 'Ruturaj Gaikwad', score: 25, over: '3.1' },
      { wicketNumber: 2, batsmanName: 'Devon Conway', score: 58, over: '7.4' },
      { wicketNumber: 3, batsmanName: 'Ajinkya Rahane', score: 82, over: '10.2' },
      { wicketNumber: 4, batsmanName: 'Shivam Dube', score: 110, over: '13.5' },
      { wicketNumber: 5, batsmanName: 'Ravindra Jadeja', score: 132, over: '16.1' },
      { wicketNumber: 6, batsmanName: 'Deepak Chahar', score: 140, over: '17.0' }
    ],
    currentPartnership: { runs: 5, balls: 2, batsman1: 'MS Dhoni', batsman2: 'Shardul Thakur' },
    batsmen: [
      { id: 'b1', name: 'MS Dhoni (WK)', role: 'Wicket-keeper', runs: 34, balls: 19, fours: 2, sixes: 3, strikeRate: 178.9, status: 'batting' },
      { id: 'b2', name: 'Shardul Thakur', role: 'Bowler', runs: 2, balls: 3, fours: 0, sixes: 0, strikeRate: 66.6, status: 'batting' }
    ],
    bowler: {
      name: 'Jasprit Bumrah',
      overs: '3.2',
      maidens: 0,
      runs: 28,
      wickets: 2,
      economy: 8.40
    },
    recentBalls: ['1', '6', 'W', '4', '0', '2', 'WD'],
    commentary: [
      { id: 'c1', over: '17.2', textEn: 'Jasprit Bumrah to Dhoni, SIX! Magnificent pull shot over deep mid-wicket into the stands!', textHi: 'जसप्रीत बुमराह से धोनी, छक्का! डीप मिड-विकेट के ऊपर से शानदार शॉट!', isBoundary: true, source: 'manual', timestamp: '11:18 AM' },
      { id: 'c2', over: '17.1', textEn: 'Jasprit Bumrah to Dhoni, 2 runs, driven nicely towards extra cover.', textHi: 'जसप्रीत बुमराह से धोनी, 2 रन, एक्स्ट्रा कवर की ओर शानदार ड्राइव।', source: 'api', timestamp: '11:17 AM' },
      { id: 'c3', over: '16.6', textEn: 'Trent Boult to Dube, OUT! Bowled him! Cleaned up with a searing yorker!', textHi: 'ट्रेंट बोल्ट से दुबे, आउट! यॉर्कर गेंद पर बोल्ड कर दिया!', isWicket: true, source: 'manual', timestamp: '11:15 AM' }
    ],
    timeline: [
      { id: 'tl_1', time: '10:00 AM', title: 'Match Scheduled', description: 'Teams announced and pitch inspection completed.', type: 'start' },
      { id: 'tl_2', time: '10:30 AM', title: 'Toss Result', description: 'Mumbai Warriors won the toss and elected to bat.', type: 'toss' },
      { id: 'tl_3', time: '02:00 PM', title: 'Innings Completed', description: 'Mumbai Warriors posted 188/4 in 20 overs.', type: 'milestone' }
    ]
  },
  {
    id: 'match_2',
    title: 'International T20 - 3rd Match',
    team1: 'India',
    team2: 'Australia',
    team1Score: '210/3',
    team2Score: '0/0',
    overs1: '20.0',
    overs2: '0.0',
    status: 'UPCOMING',
    currentInnings: 1,
    runRate1: 10.50,
    runRate2: 0.0,
    toss: 'Australia won the toss and elected to field',
    venue: 'Melbourne Cricket Ground, Australia',
    battingTeam: 'India',
    bowlingTeam: 'Australia',
    playingXI1: ['Rohit Sharma', 'Virat Kohli', 'Suryakumar Yadav', 'Rishabh Pant', 'Hardik Pandya', 'Ravindra Jadeja', 'Axar Patel', 'Kuldeep Yadav', 'Jasprit Bumrah', 'Arshdeep Singh', 'Mohammed Siraj'],
    playingXI2: ['Travis Head', 'David Warner', 'Mitchell Marsh', 'Glenn Maxwell', 'Josh Inglis', 'Tim David', 'Marcus Stoinis', 'Pat Cummins', 'Mitchell Starc', 'Adam Zampa', 'Josh Hazlewood'],
    fallOfWickets: [],
    currentPartnership: { runs: 0, balls: 0, batsman1: 'Virat Kohli', batsman2: 'Rohit Sharma' },
    batsmen: [
      { id: 'ib1', name: 'Virat Kohli', role: 'Batsman', runs: 85, balls: 51, fours: 8, sixes: 3, strikeRate: 166.6, status: 'batting' },
      { id: 'ib2', name: 'Rohit Sharma', role: 'Batsman', runs: 64, balls: 38, fours: 7, sixes: 4, strikeRate: 168.4, status: 'batting' }
    ],
    bowler: {
      name: 'Mitchell Starc',
      overs: '4.0',
      maidens: 0,
      runs: 42,
      wickets: 1,
      economy: 10.50
    },
    recentBalls: ['4', '6', '1', '1', '2', '4'],
    commentary: [
      { id: 'c20', over: '20.0', textEn: 'Innings break! India posts a massive 210/3 in 20 overs.', textHi: 'पारी समाप्त! भारत ने 20 ओवर में 210/3 का विशाल स्कोर बनाया।', source: 'api', timestamp: '10:00 AM' }
    ],
    timeline: [
      { id: 'tl_20', time: '09:00 AM', title: 'Toss Won', description: 'Australia elected to field.', type: 'toss' }
    ]
  }
];

export const initialServices: CricketService[] = [
  {
    id: 'srv_1',
    title: 'Professional Cricket Scoreboard & OBS Overlay',
    category: 'overlay',
    price: 4999,
    originalPrice: 7999,
    description: 'Custom OBS broadcast overlays with real-time dynamic scores, animated lower thirds, team logos, and match tickers.',
    features: ['Chroma Key Ready', 'Auto Live Score Sync', 'Custom Color Themes', 'OBS Browser Source Integration'],
    popular: true,
    iconName: 'Tv'
  },
  {
    id: 'srv_2',
    title: 'Live Tournament Scoring Management',
    category: 'scoring',
    price: 9999,
    originalPrice: 14999,
    description: 'End-to-end professional scoring management for local leagues, corporate tournaments, and academy matches.',
    features: ['Dedicated Scorer & Operator', 'Ball-by-Ball Live Commentary', 'Detailed Batsman & Bowler Stats', 'Instant Social Media Share Cards'],
    popular: false,
    iconName: 'Activity'
  },
  {
    id: 'srv_3',
    title: 'Custom Cricket Broadcast Graphics Pack',
    category: 'graphics',
    price: 3499,
    originalPrice: 5999,
    description: 'High-end motion graphics package designed specifically for cricket YouTube streamers and sports channels.',
    features: ['Starting Soon & BRB Screens', 'Lineup & Squad Templates', 'Wicket & Milestone Animations', 'Full HD 60FPS Render Files'],
    popular: false,
    iconName: 'Layout'
  },
  {
    id: 'srv_4',
    title: 'Match Scorecard Website & App',
    category: 'website',
    price: 14999,
    originalPrice: 24999,
    description: 'Your own dedicated cricket tournament website with live scoreboards, points tables, player profiles, and photo galleries.',
    features: ['Fully Responsive Design', 'Admin Tournament Control Panel', 'Points Table & Net Run Rate Calculator', 'Custom Domain Support'],
    popular: true,
    iconName: 'Globe'
  }
];

export const initialSubscriptions = [
  {
    id: 'sub_free',
    name: 'FREE',
    price: 0,
    duration: 'Lifetime',
    features: ['Basic live scoreboard', 'Basic manual scoring', 'Standard overlay', 'Community support']
  },
  {
    id: 'sub_pro',
    name: 'PRO',
    price: 999,
    duration: 'Per Month',
    features: ['Premium broadcast themes', 'Advanced scoreboard customization', 'Match analytics & graphs', 'Additional overlay customization', 'Priority WhatsApp support'],
    popular: true
  },
  {
    id: 'sub_business',
    name: 'BUSINESS',
    price: 4999,
    duration: 'Per Year',
    features: ['Multiple match management', 'Custom branding & logos', 'Broadcast graphics services priority', 'Advanced financial & match reporting', 'Dedicated account manager', 'Single-level referral commission earnings']
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx_1',
    userId: 'usr_demo_2',
    userName: 'Rahul Sharma',
    type: 'subscription',
    category: 'Subscription Earnings',
    amount: 999,
    netAmount: 950,
    status: 'completed',
    description: 'PRO Subscription - Monthly',
    createdAt: '2026-02-01T14:30:00Z',
    referenceId: 'sub_pro'
  }
];

export const initialReferrals: ReferralRecord[] = [
  {
    id: 'ref_1',
    referrerId: 'usr_admin_1',
    referrerName: 'Aman Priya',
    referredUserId: 'usr_demo_2',
    referredUserName: 'Rahul Sharma',
    referredUserEmail: 'rahul@example.com',
    status: 'eligible_paid',
    commissionAmount: 200,
    createdAt: '2026-02-01T14:30:00Z'
  }
];

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'tkt_1',
    userId: 'usr_demo_2',
    userName: 'Rahul Sharma',
    userEmail: 'rahul@example.com',
    subject: 'OBS overlay chroma key setup assistance',
    category: 'technical',
    message: 'Hello, I need help setting up the chroma key green background in OBS Studio for the cricket scoreboard overlay.',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-02-20T10:00:00Z',
    adminReply: 'Hello Rahul, our team will contact you via WhatsApp shortly with the exact OBS setup steps.',
    updatedAt: '2026-02-20T12:00:00Z'
  }
];

export const initialServiceOrders: ServiceOrder[] = [
  {
    id: 'ord_1',
    userId: 'usr_demo_2',
    userName: 'Rahul Sharma',
    userEmail: 'rahul@example.com',
    serviceId: 'srv_1',
    serviceTitle: 'Professional Cricket Scoreboard & OBS Overlay',
    amount: 4999,
    status: 'completed',
    requirements: 'Need Mumbai Warriors vs Chennai Superstars theme with custom channel logo.',
    createdAt: '2026-02-15T11:20:00Z',
    quotationNote: 'Overlay package delivered successfully via Google Drive link.'
  }
];
