import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DOT_PATTERNS = [".", "..", "..."];

export default function LoadingScreen() {
  const [dots, setDots] = useState(DOT_PATTERNS[0]);

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      setDots(DOT_PATTERNS[index % DOT_PATTERNS.length]);
      index++;
    }, 200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="font-mono text-2xl tracking-widest text-black"
      >
        {dots}
      </motion.div>
    </motion.div>
  );
}
