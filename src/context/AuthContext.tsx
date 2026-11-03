import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { initialUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: UserProfile | null;
  users: UserProfile[];
  login: (email: string, pass: string) => boolean;
  register: (fullName: string, email: string, mobile: string, pass: string, refCode?: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  upgradeSubscription: (plan: 'FREE' | 'PRO' | 'BUSINESS') => void;
  adminUpdateUserStatus: (userId: string, status: 'active' | 'suspended') => void;
  adminUpdateUserRole: (userId: string, role: UserRole) => void;
  loginAsDemoAdmin: () => void;
  loginAsDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('aman_cricket_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('aman_cricket_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialUsers[0]; // default logged in as admin for smooth initial experience
  });

  useEffect(() => {
    localStorage.setItem('aman_cricket_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aman_cricket_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aman_cricket_current_user');
    }
  }, [currentUser]);

  const login = (email: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (found.status === 'suspended') {
        alert('Your account has been suspended. Please contact support.');
        return false;
      }
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const register = (fullName: string, email: string, mobile: string, _pass: string, refCode?: string) => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'Email already registered.' };
    }

    const cleanEmail = email.toLowerCase();
    const isAdminEmail = cleanEmail === 'amanpriya174@gmail.com';
    const assignedRole: UserRole = isAdminEmail ? 'admin' : 'user';
    
    // Generate unique referral code for new user
    const generatedRefCode = fullName.split(' ')[0].toUpperCase() + Math.floor(100 + Math.random() * 900);

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      fullName,
      email,
      mobile,
      role: assignedRole,
      referralCode: generatedRefCode,
      referredBy: refCode ? refCode.trim().toUpperCase() : undefined,
      createdAt: new Date().toISOString(),
      subscriptionPlan: isAdminEmail ? 'BUSINESS' : 'FREE',
      subscriptionStatus: 'active',
      isVerified: true,
      status: 'active',
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150`
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);

    // Also record referral if valid refCode was entered
    if (refCode) {
      const referrer = users.find(u => u.referralCode === refCode.trim().toUpperCase());
      if (referrer && referrer.id !== newUser.id) {
        const savedRefs = localStorage.getItem('aman_cricket_referrals');
        let refs = savedRefs ? JSON.parse(savedRefs) : [];
        refs.push({
          id: 'ref_' + Date.now(),
          referrerId: referrer.id,
          referrerName: referrer.fullName,
          referredUserId: newUser.id,
          referredUserName: fullName,
          referredUserEmail: email,
          status: 'registered',
          commissionAmount: 0,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('aman_cricket_referrals', JSON.stringify(refs));
      }
    }

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const upgradeSubscription = (plan: 'FREE' | 'PRO' | 'BUSINESS') => {
    if (!currentUser) return;
    const expires = new Date();
    if (plan === 'PRO') expires.setMonth(expires.getMonth() + 1);
    if (plan === 'BUSINESS') expires.setFullYear(expires.getFullYear() + 1);

    const updated: UserProfile = {
      ...currentUser,
      subscriptionPlan: plan,
      subscriptionStatus: 'active',
      subscriptionExpiresAt: plan === 'FREE' ? undefined : expires.toISOString()
    };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const adminUpdateUserStatus = (userId: string, status: 'active' | 'suspended') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, status } : null);
    }
  };

  const adminUpdateUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, role } : null);
    }
  };

  const loginAsDemoAdmin = () => {
    const adminUser = users.find(u => u.email === 'amanpriya174@gmail.com') || users[0];
    setCurrentUser(adminUser);
  };

  const loginAsDemoUser = () => {
    const demoUser = users.find(u => u.role === 'user') || users[1];
    setCurrentUser(demoUser);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      register,
      logout,
      updateProfile,
      upgradeSubscription,
      adminUpdateUserStatus,
      adminUpdateUserRole,
      loginAsDemoAdmin,
      loginAsDemoUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
