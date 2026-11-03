import React, { useState } from 'react';
import { User, Video, Youtube, Instagram, MapPin, Search, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';
import { CreatorProfile, CreatorVideo } from '../types';

interface CreatorDirectoryProps {
  viewUsername?: string;
}

export const CreatorDirectory: React.FC<CreatorDirectoryProps> = ({ viewUsername }) => {
  const { creatorProfile, creatorVideos } = useCreator();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<CreatorVideo | null>(null);

  // If viewing a specific creator profile e.g. /creator/rahulvlogs
  const profile = viewUsername && creatorProfile?.username === viewUsername ? creatorProfile : creatorProfile;
  const publishedVideos = creatorVideos.filter(v => v.status === 'published' || v.status === 'approved');

  if (viewUsername && profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Creator Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="h-56 w-full bg-cover bg-center" style={{ backgroundImage: `url(${profile.bannerUrl})` }}></div>
          <div className="px-8 pb-8 pt-0 relative -mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end gap-5">
              <img src={profile.avatarUrl} alt="" className="w-28 h-28 rounded-2xl object-cover border-4 border-slate-950 shadow-2xl" />
              <div className="space-y-1 mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white">{profile.fullName}</h1>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400">@{profile.username} • {profile.category} • {profile.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {profile.youtubeUrl && (
                <a href={profile.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Published Videos ({publishedVideos.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedVideos.map(vid => (
              <div key={vid.id} onClick={() => setActiveVideo(vid)} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl cursor-pointer group hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img src={vid.thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-600/20 text-red-400 font-bold border border-red-500/30">{vid.category}</span>
                    <h4 className="text-white font-bold text-base leading-snug line-clamp-2">{vid.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{vid.description}</p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80">
                  <span>{vid.creatorName}</span>
                  <span>{vid.viewsCount} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-white font-bold text-base">{activeVideo.title}</h3>
                <button onClick={() => setActiveVideo(null)} className="p-2 rounded-xl bg-slate-800 text-slate-300">✕</button>
              </div>
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <video src={activeVideo.videoUrl} controls autoPlay className="w-full h-full object-contain" />
              </div>
              <div className="p-6 space-y-2">
                <p className="text-slate-300 text-sm">{activeVideo.description}</p>
                <div className="flex gap-2 pt-2">
                  {activeVideo.tags.map((t, idx) => (
                    <span key={idx} className="text-xs bg-slate-800 px-2.5 py-1 rounded-lg text-slate-300">#{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-red-400">Creator Marketplace</span>
        <h1 className="text-4xl font-black text-white">Verified Cricket Creators & Broadcasters</h1>
        <p className="text-slate-300 text-sm">Discover top cricket analysts, live commentators, and OBS broadcast creators from around the world.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={profile.avatarUrl} alt="" className="w-16 h-16 rounded-2xl object-cover border border-slate-700" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-white font-bold text-base">{profile.fullName}</h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-red-400">@{profile.username}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{profile.category}</p>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">{profile.bio}</p>
            </div>

            <a
              href={`/creator/${profile.username}`}
              onClick={(e) => { e.preventDefault(); window.location.search = `?creator=${profile.username}`; }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Creator Profile & Videos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
