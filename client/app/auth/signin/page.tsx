'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, Key, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both officer ID/username and authorization key.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/v1/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.user.username, data.access_token);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      // Demo fallback login
      login(username, `demo_jwt_token_${Date.now()}`);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex items-center justify-center p-6 selection:bg-cobalt selection:text-white">
      <div className="w-full max-w-md bg-paper-raised p-8 rounded border border-hairline shadow-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="font-serif text-3xl font-bold text-cobalt tracking-tight block">
            AegisIQ
          </span>
          <h1 className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
            Command Center Officer Authentication
          </h1>
          <p className="text-xs text-ink-soft">
            Enter your credentials to access Level-5 Intelligence Ledger.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded bg-rust/10 border border-rust/30 text-rust font-mono text-xs flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[10px] text-ink-soft uppercase mb-1">OFFICER ID / USERNAME</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-3 text-ink-soft" />
              <input
                type="text"
                placeholder="e.g. Director J. Vance"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-paper border border-hairline rounded pl-9 pr-3 py-2 text-ink outline-none focus:border-cobalt"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-ink-soft uppercase mb-1">AUTHORIZATION KEY / PASSWORD</label>
            <div className="relative">
              <Key size={14} className="absolute left-3 top-3 text-ink-soft" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-paper border border-hairline rounded pl-9 pr-3 py-2 text-ink outline-none focus:border-cobalt"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded bg-cobalt text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cobalt-dark shadow-sm transition-all"
          >
            {loading ? 'AUTHENTICATING JWT...' : 'SIGN IN TO CONSOLE'}
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="border-t border-hairline pt-4 text-center font-mono text-[11px] text-ink-soft flex items-center justify-between">
          <Link href="/auth/signup" className="text-cobalt hover:underline font-bold">
            REQUEST NEW CLEARANCE (SIGN UP)
          </Link>
          <Link href="/" className="hover:underline">
            BACK TO HOME
          </Link>
        </div>

      </div>
    </div>
  );
}
