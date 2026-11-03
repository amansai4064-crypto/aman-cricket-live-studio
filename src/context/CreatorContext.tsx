import React, { createContext, useContext, useState, useEffect } from 'react';
import { CreatorProfile, CreatorVideo, AIChatMessage, CreatorNotification, SupportTicket } from '../types';

interface CreatorContextType {
  creatorProfile: CreatorProfile | null;
  creatorVideos: CreatorVideo[];
  notifications: CreatorNotification[];
  aiMessages: AIChatMessage[];
  registerCreator: (data: Omit<CreatorProfile, 'id' | 'createdAt' | 'status'>) => void;
  updateCreatorProfile: (updates: Partial<CreatorProfile>) => void;
  uploadVideo: (videoData: Omit<CreatorVideo, 'id' | 'creatorId' | 'creatorName' | 'username' | 'viewsCount' | 'createdAt' | 'status'>) => void;
  updateVideoStatus: (videoId: string, status: CreatorVideo['status'], reason?: string) => void;
  deleteVideo: (videoId: string) => void;
  sendAIMessage: (text: string) => void;
  markNotificationRead: (notifId: string) => void;
}

const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

export const CreatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile | null>(() => {
    const saved = localStorage.getItem('aman_creator_profile');
    if (saved) { try { return JSON.parse(saved); } catch (e) { console.error(e); } }
    return {
      id: 'cr_1',
      userId: 'usr_demo_2',
      fullName: 'Rahul Sharma',
      username: 'rahulvlogs',
      bio: 'Cricket vlogger and OBS broadcasting expert covering IPL and local tournaments.',
      youtubeUrl: 'https://youtube.com/@rahulcricket',
      instagramUrl: 'https://instagram.com/rahulcricket',
      category: 'Cricket Commentary',
      contactEmail: 'rahul@example.com',
      location: 'Mumbai, India',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bannerUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200',
      createdAt: new Date().toISOString(),
      status: 'active'
    };
  });

  const [creatorVideos, setCreatorVideos] = useState<CreatorVideo[]>(() => {
    const saved = localStorage.getItem('aman_creator_videos');
    if (saved) { try { return JSON.parse(saved); } catch (e) { console.error(e); } }
    return [
      {
        id: 'vid_1',
        creatorId: 'cr_1',
        creatorName: 'Rahul Sharma',
        username: 'rahulvlogs',
        title: 'Mumbai Warriors vs Chennai Superstars Match Analysis & OBS Overlay Setup',
        description: 'Complete breakdown of Qualifier 1 with live chroma-key OBS overlay guide.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600',
        category: 'Match Analysis',
        tags: ['IPL2026', 'OBSOverlay', 'CricketLive'],
        language: 'Hindi',
        visibility: 'public',
        status: 'published',
        viewsCount: 1420,
        createdAt: '2026-02-15T10:00:00Z'
      }
    ];
  });

  const [notifications, setNotifications] = useState<CreatorNotification[]>([
    {
      id: 'notif_1',
      userId: 'cr_1',
      title: 'Video Approved',
      message: 'Your video "Mumbai Warriors vs Chennai Superstars Match Analysis" has been approved and published.',
      isRead: false,
      createdAt: '2026-02-15T10:30:00Z'
    }
  ]);

  const [aiMessages, setAiMessages] = useState<AIChatMessage[]>([
    {
      id: 'aim_1',
      sender: 'ai',
      text: 'Hello! I am your Aman Cricket AI Support Manager. How can I help you today regarding registration, video uploads, OBS overlay setup, or match scorecards? (मैं आपकी क्या सहायता कर सकता हूँ?)',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  useEffect(() => {
    if (creatorProfile) localStorage.setItem('aman_creator_profile', JSON.stringify(creatorProfile));
    else localStorage.removeItem('aman_creator_profile');
  }, [creatorProfile]);

  useEffect(() => {
    localStorage.setItem('aman_creator_videos', JSON.stringify(creatorVideos));
  }, [creatorVideos]);

  const registerCreator = (data: Omit<CreatorProfile, 'id' | 'createdAt' | 'status'>) => {
    const newProfile: CreatorProfile = {
      ...data,
      id: 'cr_' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setCreatorProfile(newProfile);
  };

  const updateCreatorProfile = (updates: Partial<CreatorProfile>) => {
    if (!creatorProfile) return;
    setCreatorProfile({ ...creatorProfile, ...updates });
  };

  const uploadVideo = (videoData: Omit<CreatorVideo, 'id' | 'creatorId' | 'creatorName' | 'username' | 'viewsCount' | 'createdAt' | 'status'>) => {
    if (!creatorProfile) return;
    const newVideo: CreatorVideo = {
      ...videoData,
      id: 'vid_' + Date.now(),
      creatorId: creatorProfile.id,
      creatorName: creatorProfile.fullName,
      username: creatorProfile.username,
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      status: videoData.visibility === 'draft' ? 'draft' : 'pending_review'
    };
    setCreatorVideos(prev => [newVideo, ...prev]);
  };

  const updateVideoStatus = (videoId: string, status: CreatorVideo['status'], reason?: string) => {
    setCreatorVideos(prev => prev.map(v => v.id === videoId ? { ...v, status, rejectionReason: reason || v.rejectionReason } : v));
  };

  const deleteVideo = (videoId: string) => {
    setCreatorVideos(prev => prev.filter(v => v.id !== videoId));
  };

  const sendAIMessage = (text: string) => {
    const userMsg: AIChatMessage = {
      id: 'aim_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString()
    };

    setAiMessages(prev => [...prev, userMsg]);

    // Intelligent AI response generation
    setTimeout(() => {
      let reply = "I understand your query. For assistance with Aman Cricket Live Studio, video publishing, or OBS overlays, please check our help desk or raise a support ticket with our official team (+7782967261).";
      const query = text.toLowerCase();

      if (query.includes('video') || query.includes('upload') || query.includes('thumbnail')) {
        reply = "To upload a video, go to your Creator Dashboard -> Upload Video tab. Enter your title, description, and thumbnail, then submit for admin review. Once approved, it appears on your public creator profile!";
      } else if (query.includes('obs') || query.includes('overlay') || query.includes('broadcast')) {
        reply = "To setup OBS overlays, visit the Broadcast Studio page, copy your match browser source URL, and paste it into OBS Studio as a Browser Source with 1920x1080 resolution.";
      } else if (query.includes('score') || query.includes('match') || query.includes('commentary')) {
        reply = "All live cricket matches, scorecards, and commentary are 100% free to view for all visitors without any login requirement in the Match Center.";
      } else if (query.includes('hindi') || query.includes('हिंदी')) {
        reply = "नमस्ते! अमन क्रिकेट लाइव स्टूडियो में आपका स्वागत है। वीडियो अपलोड, ओबीएस ओव्हरले और लाइव स्कोर के संबंध में मैं आपकी सहायता के लिए उपलब्ध हूँ।";
      }

      const aiMsg: AIChatMessage = {
        id: 'aim_ai_' + Date.now(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString()
      };
      setAiMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n));
  };

  return (
    <CreatorContext.Provider value={{
      creatorProfile,
      creatorVideos,
      notifications,
      aiMessages,
      registerCreator,
      updateCreatorProfile,
      uploadVideo,
      updateVideoStatus,
      deleteVideo,
      sendAIMessage,
      markNotificationRead
    }}>
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreator = () => {
  const context = useContext(CreatorContext);
  if (!context) throw new Error('useCreator must be used within a CreatorProvider');
  return context;
};
