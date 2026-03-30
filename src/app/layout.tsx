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
    <html lang="en" className={`${spaceGrotesk.variable} ${beVietnamPro.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e1e2e',
              color: '#cdd6f4',
              border: '2px solid #313244',
              borderRadius: '16px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.85rem',
            },
          }}
        />
      </body>
    </html>
  );
}
