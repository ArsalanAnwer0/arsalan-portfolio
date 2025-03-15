import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Head from 'next/head';
import LoadingPage from "@/components/ui/LoadingPage";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Display loading screen for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Show loading page if `isLoading` is true
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <title>Arsal</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}