export type UserRole = 'user' | 'admin' | 'broadcaster';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: UserRole;
  referralCode: string;
  referredBy?: string;
  createdAt: string;
  subscriptionPlan: 'FREE' | 'PRO' | 'BUSINESS';
  subscriptionStatus: 'active' | 'expired' | 'pending';
  subscriptionExpiresAt?: string;
  avatarUrl?: string;
  isVerified: boolean;
  status: 'active' | 'suspended' | 'pending_approval';
}

export interface PlayerStats {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  avatar?: string;
  runs?: number;
  balls?: number;
  fours?: number;
  sixes?: number;
  strikeRate?: number;
  status: 'batting' | 'out' | 'yet_to_bat';
  howOut?: string;
  overs?: string;
  maidens?: number;
  bowlingRuns?: number;
  wickets?: number;
  economy?: number;
}

export interface FallOfWicket {
  wicketNumber: number;
  batsmanName: string;
  score: number;
  over: string;
}

export interface Partnership {
  runs: number;
  balls: number;
  batsman1: string;
  batsman2: string;
}

export interface MatchUpdateTimeline {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'toss' | 'wicket' | 'milestone' | 'powerplay' | 'rain' | 'result' | 'start';
}

export interface MatchScore {
  id: string;
  title: string;
  team1: string;
  team2: string;
  team1Score: string; // e.g. "185/4"
  team2Score: string; // e.g. "142/7"
  overs1: string; // e.g. "20.0"
  overs2: string; // e.g. "17.4"
  status: 'LIVE' | 'UPCOMING' | 'COMPLETED' | 'PAUSED';
  currentInnings: 1 | 2;
  runRate1: number;
  runRate2: number;
  requiredRunRate?: number;
  target?: number;
  runsRequired?: number;
  toss: string;
  venue: string;
  battingTeam: string;
  bowlingTeam: string;
  playerOfTheMatch?: string;
  batsmen: PlayerStats[];
  bowler: {
    name: string;
    overs: string;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
  };
  playingXI1: string[];
  playingXI2: string[];
  substitutes1?: string[];
  substitutes2?: string[];
  fallOfWickets: FallOfWicket[];
  currentPartnership: Partnership;
  recentBalls: string[]; // e.g. ["4", "1", "W", "0", "6", "2", "WD", "NB"]
  commentary: {
    id: string;
    over: string;
    textEn: string;
    textHi?: string;
    isWicket?: boolean;
    isBoundary?: boolean;
    source: 'api' | 'manual';
    timestamp: string;
  }[];
  timeline: MatchUpdateTimeline[];
}

export interface CricketService {
  id: string;
  title: string;
  category: 'broadcast' | 'overlay' | 'graphics' | 'scoring' | 'website' | 'youtube';
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  popular?: boolean;
  iconName: string;
}

export interface ServiceOrder {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  serviceId: string;
  serviceTitle: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  requirements: string;
  createdAt: string;
  quotationNote?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: 'general' | 'billing' | 'technical' | 'referral' | 'service';
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  adminReply?: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'subscription' | 'service_payment' | 'referral_commission' | 'expense' | 'other';
  category: 'Subscription Earnings' | 'Broadcast Service Earnings' | 'Graphics Design Earnings' | 'Sponsorship Earnings' | 'Affiliate Earnings' | 'Direct Referral Commission' | 'Operating Expense';
  amount: number;
  netAmount: number;
  status: 'completed' | 'pending' | 'failed' | 'paid';
  description: string;
  createdAt: string;
  referenceId?: string;
}

export interface ReferralRecord {
  id: string;
  referrerId: string;
  referrerName: string;
  referredUserId: string;
  referredUserName: string;
  referredUserEmail: string;
  status: 'registered' | 'eligible_paid' | 'commission_paid';
  commissionAmount: number;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  fullName: string;
  username: string;
  bio: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  category: string;
  contactEmail: string;
  location: string;
  avatarUrl?: string;
  bannerUrl?: string;
  createdAt: string;
  status: 'pending' | 'active' | 'suspended';
}

export interface CreatorVideo {
  id: string;
  creatorId: string;
  creatorName: string;
  username: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  language: string;
  visibility: 'public' | 'private' | 'draft';
  status: 'draft' | 'pending_review' | 'approved' | 'published' | 'rejected';
  rejectionReason?: string;
  viewsCount: number;
  createdAt: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface CreatorNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
