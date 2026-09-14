import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import LoadingScreen from "@/components/LoadingScreen";

import "../styles/globals.css";

const LOADING_DURATION_MS = 1500;

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("portfolio-loaded");
    const loadingDelay = hasLoadedBefore ? 0 : LOADING_DURATION_MS;

    const timer = window.setTimeout(() => {
      setIsLoading(false);
      if (!hasLoadedBefore) {
        sessionStorage.setItem("portfolio-loaded", "true");
      }
    }, loadingDelay);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.png?v=4" type="image/png" />
        <link rel="shortcut icon" href="/icon.png?v=4" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png?v=4" />
        <meta
          name="description"
          content="Portfolio of Arsalan Anwer, a backend, cloud, DevOps, and infrastructure engineer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Arsalan&apos;s Portfolio</title>
      </Head>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <LoadingScreen />
        </motion.div>
      ) : (
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
      )}
    </>
  );
}
