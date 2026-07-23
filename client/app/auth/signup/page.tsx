'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, User, Key, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      login(username, `jwt_token_${Date.now()}`);
      router.push('/dashboard');
    }, 1200);
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
            Register Analyst Security Clearance
          </h1>
          <p className="text-xs text-ink-soft">
            Request Level-5 access for Indian Public Safety Intelligence.
          </p>
        </div>

        {success && (
          <div className="p-3 rounded bg-stamp-green/10 border border-stamp-green/30 text-stamp-green font-mono text-xs flex items-center gap-2 animate-pulse">
            <CheckCircle2 size={16} />
            CLEARANCE GRANTED. INITIALIZING JWT CONSOLE SESSION...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[10px] text-ink-soft uppercase mb-1">FULL NAME / OFFICER TITLE</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-3 text-ink-soft" />
              <input
                type="text"
                placeholder="Officer / Analyst Name"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-paper border border-hairline rounded pl-9 pr-3 py-2 text-ink outline-none focus:border-cobalt"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-ink-soft uppercase mb-1">GOVERNMENT / POLICE EMAIL</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-3 text-ink-soft" />
              <input
                type="email"
                placeholder="analyst@publicsafety.gov.in"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-paper border border-hairline rounded pl-9 pr-3 py-2 text-ink outline-none focus:border-cobalt"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-ink-soft uppercase mb-1">NEW AUTHORIZATION PASSWORD</label>
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
            className="w-full py-3 px-4 rounded bg-cobalt text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cobalt-dark shadow-sm transition-all"
          >
            REGISTER & INITIALIZE CONSOLE
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="border-t border-hairline pt-4 text-center font-mono text-[11px] text-ink-soft flex items-center justify-between">
          <Link href="/auth/signin" className="text-cobalt hover:underline font-bold">
            EXISTING OFFICER? SIGN IN
          </Link>
          <Link href="/" className="hover:underline">
            BACK TO HOME
          </Link>
        </div>

      </div>
    </div>
  );
}
