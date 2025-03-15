import React, { useEffect } from 'react';
import "@/styles/globals.css";
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import LoadingPage from '@/components/ui/LoadingPage';
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arsal",
  description: "Personal portfolio of Arsalan, a cloud engineer passionate about technology and innovation.",
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/favicon.ico' }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Preload all images for smoother performance
  useEffect(() => {
    const images = ["/Arsalan.jpg", "/Pakistan3.jpg", "/SCSU.jpg", "/USA.jpg"];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingPage />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}