import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iHelp App',
  description: 'iHelp 웹 애플리케이션',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
