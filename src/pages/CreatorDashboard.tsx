import React, { useState } from 'react';
import { Tv, Upload, User, Video, Bell, LifeBuoy, Settings, CheckCircle2, AlertCircle, Clock, Trash2, Edit3, Send, Shield } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const CreatorDashboard: React.FC = () => {
  const { creatorProfile, creatorVideos, notifications, updateCreatorProfile, uploadVideo, deleteVideo, markNotificationRead } = useCreator();
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'videos' | 'notifications' | 'settings'>('overview');

  // Upload form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Match Analysis');
  const [tags, setTags] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [visibility, setVisibility] = useState<'public' | 'private' | 'draft'>('public');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Profile edit state
  const [fullName, setFullName] = useState(creatorProfile?.fullName || '');
  const [bio, setBio] = useState(creatorProfile?.bio || '');
  const [youtubeUrl, setYoutubeUrl] = useState(creatorProfile?.youtubeUrl || '');
  const [successProfile, setSuccessProfile] = useState(false);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    uploadVideo({
      title,
      description,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600',
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      language,
      visibility,
    });

    setUploadSuccess(true);
    setTitle('');
    setDescription('');
    setTags('');
    setTimeout(() => {
      setUploadSuccess(false);
      setActiveTab('videos');
    }, 1500);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCreatorProfile({ fullName, bio, youtubeUrl });
    setSuccessProfile(true);
    setTimeout(() => setSuccessProfile(false), 2000);
  };

  if (!creatorProfile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        Please register or login as a creator to access the Creator Studio.
      </div>
    );
  }

  const myVideos = creatorVideos;
  const publishedCount = myVideos.filter(v => v.status === 'published' || v.status === 'approved').length;
  const pendingCount = myVideos.filter(v => v.status === 'pending_review').length;
  const totalViews = myVideos.reduce((acc, v) => acc + v.viewsCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Banner & Header */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-48 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${creatorProfile.bannerUrl})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        <div className="px-8 pb-8 pt-0 relative -mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-end gap-5">
            <img
              src={creatorProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt=""
              className="w-28 h-28 rounded-2xl object-cover border-4 border-slate-950 shadow-2xl"
            />
            <div className="space-y-1 mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{creatorProfile.fullName}</h1>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  Verified Creator
                </span>
              </div>
              <p className="text-xs text-slate-400">@{creatorProfile.username} • {creatorProfile.category}</p>
            </div>
          </div>

          <a
            href={`/creator/${creatorProfile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-lg shadow-red-600/30 transition-all text-center"
          >
            View Public Creator Profile
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto">
        {[
          { id: 'overview', label: 'Creator Dashboard', icon: User },
          { id: 'upload', label: 'Upload New Video', icon: Upload },
          { id: 'videos', label: 'My Videos', icon: Video },
          { id: 'notifications', label: `Notifications (${notifications.filter(n => !n.isRead).length})`, icon: Bell },
          { id: 'settings', label: 'Account Settings', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Published Videos</span>
                <div className="text-3xl font-black text-white">{publishedCount}</div>
                <div className="text-xs text-emerald-400">● Live on marketplace</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Pending Review</span>
                <div className="text-3xl font-black text-amber-400">{pendingCount}</div>
                <div className="text-xs text-slate-500">Awaiting admin check</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Total Video Views</span>
                <div className="text-3xl font-black text-blue-400">{totalViews}</div>
                <div className="text-xs text-slate-400">Global audience reach</div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-white font-bold text-lg">Creator Bio & Details</h3>
              <p className="text-slate-300 text-sm">{creatorProfile.bio}</p>
              <div className="flex gap-4 text-xs text-slate-400">
                <span>Email: {creatorProfile.contactEmail}</span>
                <span>Location: {creatorProfile.location}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <form onSubmit={handleUploadSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 max-w-2xl">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Upload className="w-5 h-5 text-red-500" />
              <span>Video Upload Studio (MP4 / WebM)</span>
            </h3>

            {uploadSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold">
                Video uploaded successfully! Submitted for admin review.
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Video Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. IPL 2026 Match Highlights & Analysis"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your cricket broadcast or commentary video..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                >
                  <option value="Match Analysis">Match Analysis</option>
                  <option value="Live Commentary">Live Commentary</option>
                  <option value="OBS Tutorial">OBS Tutorial</option>
                  <option value="Tournament Highlights">Tournament Highlights</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                >
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="IPL2026, CricketLive, Commentary"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Video for Admin Review</span>
            </button>
          </form>
        )}

        {activeTab === 'videos' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">My Uploaded Videos</h3>
            <div className="space-y-3">
              {myVideos.map(vid => (
                <div key={vid.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={vid.thumbnailUrl} alt="" className="w-24 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-sm">{vid.title}</h4>
                      <div className="text-xs text-slate-400 mt-0.5">{vid.category} • {vid.language} • {vid.viewsCount} views</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${
                      vid.status === 'published' || vid.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      vid.status === 'pending_review' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {vid.status.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => deleteVideo(vid.id)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                      title="Delete Video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-lg">Creator Notifications</h3>
            <div className="space-y-3">
              {notifications.map(notif => (
                <div key={notif.id} onClick={() => markNotificationRead(notif.id)} className={`p-4 rounded-2xl border cursor-pointer transition-colors ${notif.isRead ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-950/80 border-red-600/50 text-white'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm">{notif.title}</h4>
                    <span className="text-[10px] text-slate-500">{new Date(notif.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <form onSubmit={handleProfileSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 max-w-xl">
            <h3 className="text-white font-bold text-lg">Edit Creator Profile</h3>
            {successProfile && <div className="p-3 rounded-xl bg-emerald-950/60 text-emerald-300 text-xs">Profile updated successfully!</div>}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Bio / About</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">YouTube Channel URL</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
            >
              Save Profile Changes
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
