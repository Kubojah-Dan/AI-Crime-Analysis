'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Radio, AlertTriangle, FileText, Layers, Plus, 
  Archive, HelpCircle, RefreshCw, Settings, ShieldCheck, 
  User, CheckCircle2, SlidersHorizontal, Activity, LogOut, Sun, Moon, BarChart3 
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/context/theme-context';

export function LedgerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isInitialized, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isInitialized, isAuthenticated, router]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const navItems = [
    { href: '/hotspots', label: 'Hotspots', icon: Radio },
    { href: '/incidents', label: 'Incidents', icon: AlertTriangle },
    { href: '/cases', label: 'Cases', icon: Layers },
    { href: '/reports', label: 'Reports', icon: FileText },
    { href: '/analytics', label: 'Analytics Matrix', icon: BarChart3 },
  ];

  const bottomNavItems = [
    { href: '/networks', label: 'Ingest Networks', icon: Activity },
    { href: '/admin/fairness', label: 'Ethics & Bias', icon: ShieldCheck },
    { href: '/archive', label: 'Archive', icon: Archive },
    { href: '/support', label: 'Support', icon: HelpCircle },
  ];

  if (!isInitialized || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper text-ink flex items-center justify-center font-mono text-xs text-ink-soft">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw size={24} className="animate-spin text-cobalt" />
          <span>INITIALIZING SECURE AEGISIQ PROTOCOL...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans selection:bg-cobalt selection:text-white transition-colors duration-300">
      
      {/* ── Top Bar Header ─────────────────────────────────────────────── */}
      <header className="h-16 px-6 bg-paper-raised border-b border-hairline flex items-center justify-between z-20 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-cobalt hover:scale-[1.02] transition-transform duration-200">
              AegisIQ
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 font-sans text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href) || (pathname === '/' && item.href === '/hotspots');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded transition-colors duration-200 ${
                    isActive 
                      ? 'text-cobalt font-semibold border-b-2 border-cobalt bg-paper/60' 
                      : 'text-ink-soft hover:text-ink hover:bg-paper/40'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-cobalt/10 border border-cobalt/30 text-cobalt font-bold uppercase tracking-wider animate-pulse-slow">
            <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse"></span>
            LIVE STATUS
          </div>

          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 text-ink-soft hover:text-ink hover:bg-paper rounded border border-hairline transition-all duration-200"
          >
            {theme === 'dark' ? <Sun size={15} className="text-yellow-500" /> : <Moon size={15} className="text-cobalt" />}
          </button>

          <button 
            onClick={handleRefresh}
            title="Refresh Feed"
            className="p-2 text-ink-soft hover:text-ink hover:bg-paper rounded border border-hairline transition-all duration-200"
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-cobalt' : ''} />
          </button>

          <Link
            href="/admin/fairness"
            title="System Settings"
            className="p-2 text-ink-soft hover:text-ink hover:bg-paper rounded border border-hairline transition-all duration-200"
          >
            <Settings size={15} />
          </Link>
        </div>
      </header>

      {/* ── Main Workspace Body ────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-64 bg-paper-raised border-r border-hairline flex flex-col justify-between p-4 flex-shrink-0 transition-colors duration-300">
          <div>
            {/* Operator Badge with Logout */}
            <div className="p-3 mb-4 rounded border border-hairline bg-paper flex items-center justify-between gap-3 shadow-inner transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded bg-cobalt/10 border border-cobalt/30 grid place-items-center text-cobalt font-bold font-mono text-xs">
                  <User size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sans text-ink uppercase tracking-wider truncate max-w-[120px]">
                    {user?.username || 'Officer'}
                  </h4>
                  <p className="text-[9px] font-mono text-ink-soft uppercase truncate max-w-[120px]">
                    {user?.clearance || 'Level-5'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { logout(); router.push('/'); }}
                title="Sign Out"
                className="p-1.5 text-rust hover:bg-rust/10 rounded transition-all duration-200"
              >
                <LogOut size={16} />
              </button>
            </div>

            {/* Action Button */}
            <Link
              href="/incidents/new"
              className="w-full mb-6 py-2.5 px-4 rounded bg-cobalt text-white font-sans text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-cobalt-dark hover:scale-[1.02] shadow-sm transition-all duration-200"
            >
              <Plus size={16} />
              New Incident
            </Link>

            {/* Main Nav Links */}
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href) || (pathname === '/' && item.href === '/hotspots');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      isActive 
                        ? 'bg-cobalt text-white shadow-sm' 
                        : 'text-ink-soft hover:text-ink hover:bg-paper'
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Nav Links */}
          <div className="border-t border-hairline pt-4 space-y-1 font-mono text-xs">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded text-[11px] text-ink-soft hover:text-ink hover:bg-paper transition-all duration-200 ${
                    isActive ? 'font-bold text-cobalt' : ''
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-paper transition-colors duration-300">
          {children}
        </main>
      </div>

    </div>
  );
}
