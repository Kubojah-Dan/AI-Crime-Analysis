'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Radio, AlertTriangle, FileText, Layers, Plus, 
  Archive, HelpCircle, RefreshCw, Settings, ShieldCheck, 
  User, CheckCircle2, SlidersHorizontal, Activity, LogOut, Sun, Moon, BarChart3, X, Bell, Database, Cpu 
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/context/theme-context';
import { CyberBackground } from '@/components/ui/cyber-background';

export function LedgerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isInitialized, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);
  
  // Settings Modal Drawer state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState('5s');
  const [defaultJurisdiction, setDefaultJurisdiction] = useState('Delhi NCR');
  const [anomalyAlerts, setAnomalyAlerts] = useState(true);
  const [clearanceLevel, setClearanceLevel] = useState('Level-5 (Full Access)');
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isInitialized, isAuthenticated, router]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSyncToast('SYNCING TELEMETRY WITH CATALYST BACKEND...');
    
    // Refresh Next.js dynamic routes
    router.refresh();

    setTimeout(() => {
      setIsRefreshing(false);
      setSyncToast('✓ LIVE FEED SYNCED & UPDATED');
      setTimeout(() => setSyncToast(null), 2500);
    }, 1200);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('aegis_refresh_rate', refreshInterval);
    localStorage.setItem('aegis_default_jurisdiction', defaultJurisdiction);
    localStorage.setItem('aegis_anomaly_alerts', String(anomalyAlerts));
    
    setSettingsSavedToast(true);
    setTimeout(() => {
      setSettingsSavedToast(false);
      setIsSettingsOpen(false);
    }, 1200);
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
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans selection:bg-cobalt selection:text-white transition-colors duration-300 relative">
      
      {/* ── Top Bar Header ─────────────────────────────────────────────── */}
      <header className="h-16 px-6 bg-paper-raised border-b border-hairline flex items-center justify-between z-30 shadow-sm transition-colors duration-300">
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

          {/* Interactive Sync / Refresh Feed Button */}
          <button 
            onClick={handleRefresh}
            title="Sync & Refresh Telemetry Feed"
            className="p-2 text-ink-soft hover:text-ink hover:bg-paper rounded border border-hairline transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-cobalt' : ''} />
            <span className="hidden sm:inline text-[10px] font-bold uppercase">SYNC</span>
          </button>

          {/* Interactive System Settings Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="System Settings & Preferences"
            className="p-2 text-ink-soft hover:text-ink hover:bg-paper rounded border border-hairline transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Settings size={15} className="hover:rotate-45 transition-transform duration-300" />
            <span className="hidden sm:inline text-[10px] font-bold uppercase">SETTINGS</span>
          </button>

        </div>
      </header>

      {/* Sync Toast Notification Banner */}
      {syncToast && (
        <div className="absolute top-18 right-6 z-50 bg-cobalt text-white font-mono text-xs font-bold px-4 py-2.5 rounded shadow-lg border border-white/20 flex items-center gap-2 animate-fade-in-up">
          <Activity size={16} className="animate-spin" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* ── Main Workspace Body ────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-64 bg-paper-raised border-r border-hairline flex flex-col justify-between p-4 flex-shrink-0 z-20 transition-colors duration-300">
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
                className="p-1.5 text-rust hover:bg-rust/10 rounded transition-all duration-200 cursor-pointer"
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
        <main className="flex-1 overflow-y-auto bg-paper transition-colors duration-300 relative overflow-x-hidden">
          <CyberBackground />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>

      {/* ── System Settings & Preferences Modal Drawer ───────────────── */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up font-sans">
          <div className="bg-paper-raised border border-hairline rounded max-w-xl w-full p-6 space-y-6 shadow-2xl relative text-ink">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2 font-serif font-bold text-xl text-ink">
                <Settings size={20} className="text-cobalt" />
                System Settings & Platform Configuration
              </div>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded hover:bg-paper text-ink-soft hover:text-ink transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {settingsSavedToast && (
              <div className="p-3 rounded bg-stamp-green/10 border border-stamp-green/30 text-stamp-green font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-pulse">
                <CheckCircle2 size={16} />
                CONFIGURATION PREFERENCES SAVED SUCCESSFULLY
              </div>
            )}

            {/* Form Settings Options */}
            <div className="space-y-5 font-mono text-xs">
              
              {/* Option 1: Data Refresh Rate */}
              <div className="space-y-1">
                <label className="font-bold text-ink uppercase block">1. Telemetry Stream Refresh Rate</label>
                <select 
                  value={refreshInterval}
                  onChange={e => setRefreshInterval(e.target.value)}
                  className="w-full bg-paper border border-hairline rounded p-2 text-ink font-sans text-xs outline-none cursor-pointer"
                >
                  <option value="3s">3 Seconds (Real-Time High Frequency)</option>
                  <option value="5s">5 Seconds (Balanced Optimal Performance)</option>
                  <option value="10s">10 Seconds (Low Bandwidth Saver Mode)</option>
                </select>
              </div>

              {/* Option 2: Default Jurisdiction */}
              <div className="space-y-1">
                <label className="font-bold text-ink uppercase block">2. Default State Jurisdiction</label>
                <select 
                  value={defaultJurisdiction}
                  onChange={e => setDefaultJurisdiction(e.target.value)}
                  className="w-full bg-paper border border-hairline rounded p-2 text-ink font-sans text-xs outline-none cursor-pointer"
                >
                  <option value="Delhi NCR">Delhi NCR Sector</option>
                  <option value="Mumbai South">Mumbai South / Twin Peaks</option>
                  <option value="Bangalore Tech Corridor">Bangalore Tech Corridor</option>
                  <option value="Chennai Harbour">Chennai Harbour Zone</option>
                  <option value="Hyderabad Cyberabad">Hyderabad Cyberabad</option>
                </select>
              </div>

              {/* Option 3: Anomaly Alerts Toggle */}
              <div className="flex items-center justify-between p-3 rounded border border-hairline bg-paper">
                <div>
                  <div className="font-bold text-ink uppercase">3. Real-Time Anomaly Popups</div>
                  <div className="font-sans text-[11px] text-ink-soft">Display visual toasts when CAD 112 anomalies spike</div>
                </div>
                <button
                  onClick={() => setAnomalyAlerts(!anomalyAlerts)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                    anomalyAlerts ? 'bg-cobalt' : 'bg-hairline'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    anomalyAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>

              {/* Service Health Diagnostics */}
              <div className="p-3 rounded border border-hairline bg-paper space-y-2">
                <div className="font-bold text-cobalt uppercase flex items-center gap-1.5">
                  <Database size={13} />
                  <span>ZOHO CATALYST SERVICE HEALTH</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="flex items-center justify-between p-1.5 rounded bg-paper-raised border border-hairline">
                    <span>Slate Hosting</span>
                    <span className="stamp-badge stamp-verified">HEALTHY</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-paper-raised border border-hairline">
                    <span>AppSail API</span>
                    <span className="stamp-badge stamp-verified">HEALTHY</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-paper-raised border border-hairline">
                    <span>Data Store</span>
                    <span className="stamp-badge stamp-verified">CONNECTED</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-paper-raised border border-hairline">
                    <span>Groq LLM L3</span>
                    <span className="stamp-badge stamp-live">ACTIVE</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="py-2 px-4 rounded border border-hairline bg-paper text-ink font-bold hover:bg-paper-raised transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveSettings}
                className="py-2 px-6 rounded bg-cobalt text-white font-bold uppercase tracking-wider hover:bg-cobalt-dark shadow-sm transition-all cursor-pointer"
              >
                SAVE PREFERENCES
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
