import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/header/footer/Footer';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tech shop',
  description: 'Tech shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Header></Header>

          <div className='container'>{children}</div>
          <Footer></Footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
