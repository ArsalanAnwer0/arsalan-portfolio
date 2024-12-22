import "../styles/globals.css"; // Correct path to globals.css
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
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

  return <Component {...pageProps} />;
}
