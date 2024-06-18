import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-screen bg-slate-300 flex flex-col items-center justify-center'>
    {children}
    </div>
  );
}
