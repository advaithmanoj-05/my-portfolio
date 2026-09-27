import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Advaith Manoj | Software Development Engineer & Systems Architecture',
  description: 'Portfolio v2 of Advaith Manoj - Software Development Engineer specializing in FastAPI, Spring Boot, React, Next.js, and Systems Architecture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#F7F7F5] text-[#111111] dark:bg-[#090a0c] dark:text-[#f3f4f6] font-geist transition-colors duration-300 antialiased selection:bg-emerald-500 selection:text-white">
        {/* Soft Enterprise Ambient Glow Background */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[140px] rounded-full" />
          <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
