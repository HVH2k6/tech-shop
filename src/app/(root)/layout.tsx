import Header from '@/components/header/Header';
import Footer from '@/components/header/footer/Footer';
import type { Metadata } from 'next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      <div className='container'>{children}</div>
      <Footer></Footer>
    </>
  );
}
