import type { Metadata } from 'next';
import { Space_Grotesk, Be_Vietnam_Pro } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'College OS — The Operating System for Modern Colleges',
  description:
    'A production-grade, multi-tenant SaaS platform for college management. Timetables, attendance, assignments, exams, analytics, and more.',
  keywords: ['college', 'management', 'saas', 'attendance', 'timetable', 'education'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${beVietnamPro.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(13, 13, 32, 0.85)',
              backdropFilter: 'blur(16px)',
              color: '#e8e8f0',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.82rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            },
          }}
        />
      </body>
    </html>
  );
}
