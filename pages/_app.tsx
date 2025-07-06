// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Head from "next/head";
import LoadingPage from "@/components/ui/LoadingPage";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // This environment variable controls the maintenance banner.
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  useEffect(() => {
    // Check if loading screen has already been shown in this session
    const hasLoadedBefore = sessionStorage.getItem("portfolio-loaded");

    if (!hasLoadedBefore) {
      // First time loading - show the loading screen
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Mark as loaded in session storage
        sessionStorage.setItem("portfolio-loaded", "true");
      }, 16000);
      return () => clearTimeout(timer);
    } else {
      // Already loaded before in this session - skip loading screen
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <LoadingPage />
      </motion.div>
    );
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <title>Arsal's Portfolio</title>
      </Head>

      {isMaintenance && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
            color: "#333",
            padding: "12px 20px",
            fontSize: "15px",
            fontWeight: 500,
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 9999,
          }}
        >
          ⚠️ This site is under maintenance. Some features may not work.
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={router.pathname}
          variants={pageVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "tween", duration: 1.2, ease: "easeOut" }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
