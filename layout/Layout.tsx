import React from 'react';
import "@/styles/globals.css";
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import LoadingPage from '@/components/ui/LoadingPage';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Arsalan - Cloud Engineer",
  description: "Personal portfolio of Arsalan, a cloud engineer passionate about technology and innovation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
