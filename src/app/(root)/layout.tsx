import Header from '@/components/header/Header';
import Footer from '@/components/header/footer/Footer';


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      <div className=''>{children}</div>
      <Footer></Footer>
    </>
  );
}
