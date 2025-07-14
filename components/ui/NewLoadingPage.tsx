'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function NewLoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        className="text-4xl font-extralight text-black tracking-tight"
      >
        {progress}
      </motion.div>
    </motion.div>
  );
}