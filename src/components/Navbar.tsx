import React, { useState } from 'react';
import { Radio, Tv, Activity, Briefcase, CreditCard, LifeBuoy, Shield, User, LogOut, Menu, X, Phone, MessageSquare, Mail, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OFFICIAL_SUPPORT_MOBILE, OFFICIAL_SUPPORT_EMAIL } from '../data/mockData';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenLogin: () => void;
  onOpenSupport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenLogin, onOpenSupport }) => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Radio },
    { id: 'live', label: 'Match Center', icon: Activity },
    { id: 'broadcast-studio', label: 'Broadcast Studio', icon: Tv },
    { id: 'creator', label: 'Creator Studio', icon: User },
    { id: 'creators', label: 'Creators', icon: Briefcase },
    { id: 'pricing', label: 'Pricing Plans', icon: CreditCard },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      
      {/* 1. Top Contact Bar */}
      <div className="bg-gradient-to-r from-red-950/50 via-slate-900 to-blue-950/50 border-b border-slate-800/60 py-2 px-3 sm:px-6 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          
          <div className="flex items-center gap-2 sm:gap-3 text-slate-300 shrink-0">
            <span className="flex items-center gap-1.5 text-red-400 font-semibold tracking-tight text-[11px] sm:text-xs">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Aman Vlogs Pro Studio</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              Live Systems Active
            </span>
          </div>

          {/* Phone & WhatsApp Rounded Buttons on One Line */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href={`tel:${OFFICIAL_SUPPORT_MOBILE}`}
              className="flex items-center gap-1.5 bg-blue-950/60 hover:bg-blue-900/60 text-blue-200 hover:text-white px-2.5 py-1 rounded-full border border-blue-800/60 transition-all text-[11px] sm:text-xs font-medium shadow-sm"
              title="Call Support"
            >
              <Phone className="w-3 h-3 text-blue-400 shrink-0" />
              <span>+{OFFICIAL_SUPPORT_MOBILE}</span>
            </a>

            <a 
              href={`https://wa.me/91${OFFICIAL_SUPPORT_MOBILE}?text=Hello%20Aman%20Cricket%20Live%20Studio%20support,%20I%20need%20assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-950/75 hover:bg-emerald-900/80 text-emerald-200 hover:text-white px-2.5 py-1 rounded-full border border-emerald-700/60 transition-all text-[11px] sm:text-xs font-medium shadow-sm"
              title="WhatsApp Support"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => setCurrentTab('home')}>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30 border border-red-400/30 shrink-0">
            <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-lg lg:text-xl bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight leading-tight">
              Aman Cricket Live Studio
            </h1>
            <p className="text-[9px] sm:text-[10px] text-red-400 font-semibold tracking-wider uppercase">
              Powered by Aman Vlogs Pro
            </p>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Support, Dashboard, Auth & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSupport}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium border border-slate-700/80 transition-all"
          >
            <LifeBuoy className="w-4 h-4 text-amber-400" />
            <span>Support</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  currentTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                <img 
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} 
                  alt="" 
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-slate-600"
                />
                <span className="hidden md:inline">{currentUser.fullName.split(' ')[0]}</span>
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-red-600/30 text-red-400 font-bold border border-red-500/30">
                  {currentUser.subscriptionPlan}
                </span>
              </button>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setCurrentTab('admin')}
                  className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    currentTab === 'admin'
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                      : 'bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-700/60'
                  }`}
                >
                  <Shield className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}

              <button
                onClick={logout}
                title="Logout"
                className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-600/30 transition-all"
            >
              <User className="w-4 h-4" />
              <span className="hidden xs:inline">Login / Register</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 p-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  currentTab === item.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => { onOpenSupport(); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/80"
          >
            <LifeBuoy className="w-4 h-4 text-amber-400" />
            Customer Support
          </button>
        </div>
      )}

    </header>
  );
};
