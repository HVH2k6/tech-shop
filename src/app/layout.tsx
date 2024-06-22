import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { ClerkProvider } from '@clerk/nextjs';
import ToastProvider from '@/module/toast/ToastProvider';
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
          <ToastProvider>
            <div className=''>{children}</div>
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
