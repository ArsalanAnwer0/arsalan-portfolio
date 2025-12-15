'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MinimalLoading() {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const dotPatterns = ['.', '..', '...', '.', '..', '..'];
    let index = 0;

    const interval = setInterval(() => {
      setDots(dotPatterns[index % dotPatterns.length]);
      index++;
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white dark:bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-mono text-black dark:text-white tracking-widest"
      >
        {dots}
      </motion.div>
    </motion.div>
  );
}
