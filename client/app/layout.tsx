import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/context/auth-context';
import { ThemeProvider } from '@/context/theme-context';

export const metadata: Metadata = {
  title: 'AegisIQ - Public Safety Intelligence & Decision Support Platform',
  description: 'AI-Powered Public Safety Intelligence & Decision Support Platform for India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
