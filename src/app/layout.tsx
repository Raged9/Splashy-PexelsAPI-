import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import MyNavbar from '@/components/Navbar'; 

const roboto = Roboto({ 
  weight: ['400', '500', '700'], 
  subsets: ["latin"],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Feeds Gallery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className} style={{ backgroundColor: '#f8f9fa' }}>
        <MyNavbar/>
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>
        <footer className="text-center py-4 text-muted mt-5 border-top">
          <small>&copy; Feeds Project (PexelsAPI). Built with Next.js & Bootstrap.</small>
        </footer>

      </body>
    </html>
  );
}