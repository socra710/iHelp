import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import AuthProvider from '@/components/providers/authProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'i-Help',
  description: 'i-Help App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto max-w-[650px] px-4 py-8">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
        <Script src="service-worker.js"></Script>
      </body>
    </html>
  );
}
