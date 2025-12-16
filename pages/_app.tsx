import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Head from "next/head";
import MinimalLoading from "@/components/ui/MinimalLoading";
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

  useEffect(() => {
    // Check if loading screen has already been shown in this session
    const hasLoadedBefore = sessionStorage.getItem("portfolio-loaded");

    if (!hasLoadedBefore) {
      // Clear the landing page visit flag so Arsalan animates after loading
      sessionStorage.removeItem("hasVisitedLanding");
      
      // First time loading - show the loading screen
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Mark as loaded in session storage
        sessionStorage.setItem("portfolio-loaded", "true");
      }, 1500); // Reduced to 1.5 seconds for minimal loading
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
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <MinimalLoading />
      </motion.div>
    );
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/mashle-nb.png" type="image/png" />
        <link rel="shortcut icon" href="/mashle-nb.png" />
        <link rel="apple-touch-icon" href="/mashle-nb.png" />
        <title>Arsalan's Portfolio</title>
      </Head>

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