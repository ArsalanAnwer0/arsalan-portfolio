'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    const darkModeObserver = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      darkModeObserver.disconnect();
    };
  }, []);

  return (
    <motion.div
      className={`fixed w-4 h-4 rounded-full pointer-events-none z-50 ${
        isDarkMode ? 'bg-white' : 'bg-black'
      }`}
      animate={{
        x: mousePosition.x - 8, // Adjust offset for centering
        y: mousePosition.y - 8, // Adjust offset for centering
      }}
      transition={{
        type: 'spring',
        damping: 30,
        mass: 0.5,
        stiffness: 400,
      }}
    />
  );
}
