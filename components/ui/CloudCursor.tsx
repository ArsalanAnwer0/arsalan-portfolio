'use client';



import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function CloudCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const prevPosition = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(performance.now());

  const [isMobile, setIsMobile] = useState(true);

  // Create more natural cursor movement with separate springs
  // Main cursor spring - fast and responsive
  const mainSpringConfig = { damping: 15, stiffness: 400, mass: 0.15 };
  const mainX = useSpring(0, mainSpringConfig);
  const mainY = useSpring(0, mainSpringConfig);
    
  // Trail springs - progressively more relaxed for natural trailing
  const trailSpringConfig1 = { damping: 20, stiffness: 250, mass: 0.3 };
  const trailX1 = useSpring(0, trailSpringConfig1);
  const trailY1 = useSpring(0, trailSpringConfig1);
    
  const trailSpringConfig2 = { damping: 25, stiffness: 180, mass: 0.4 };
  const trailX2 = useSpring(0, trailSpringConfig2);
  const trailY2 = useSpring(0, trailSpringConfig2);
    
  const trailSpringConfig3 = { damping: 30, stiffness: 120, mass: 0.5 };
  const trailX3 = useSpring(0, trailSpringConfig3);
  const trailY3 = useSpring(0, trailSpringConfig3);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => window.innerWidth <= 768;
      setIsMobile(checkMobile());
      
      // Add window resize listener to update on orientation change
      window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 768));
      return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 768));
    }
  }, []);


  // Handle mouse movement with improved natural motion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      
      if (deltaTime > 0) {
        // Calculate velocity (pixels per millisecond)
        velocity.current = {
          x: (e.clientX - prevPosition.current.x) / deltaTime,
          y: (e.clientY - prevPosition.current.y) / deltaTime
        };
        
        prevPosition.current = { x: e.clientX, y: e.clientY };
        lastUpdateTime.current = currentTime;
      }
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update springs in sequence for natural trailing
      mainX.set(e.clientX);
      mainY.set(e.clientY);
      
      // Delay trail updates slightly for more natural movement
      setTimeout(() => {
        trailX1.set(e.clientX);
        trailY1.set(e.clientY);
      }, 15);
      
      setTimeout(() => {
        trailX2.set(e.clientX);
        trailY2.set(e.clientY);
      }, 30);
      
      setTimeout(() => {
        trailX3.set(e.clientX);
        trailY3.set(e.clientY);
      }, 45);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mainX, mainY, trailX1, trailY1, trailX2, trailY2, trailX3, trailY3]);

  // Handle hover state over clickable elements
  useEffect(() => {
    const checkHover = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y);
      if (hoveredElement) {
        // Traverse up to check if this element or any parent is clickable
        let currentElement = hoveredElement;
        let foundClickable = false;
        
        while (currentElement && currentElement !== document.body) {
          const style = window.getComputedStyle(currentElement);
          
          if (
            style.cursor === 'pointer' ||
            currentElement.tagName === 'BUTTON' || 
            currentElement.tagName === 'A' ||
            currentElement.tagName === 'INPUT' ||
            currentElement.tagName === 'SELECT' ||
            currentElement.tagName === 'TEXTAREA' ||
            currentElement.getAttribute('role') === 'button' ||
            currentElement.classList.contains('clickable') ||
            currentElement.hasAttribute('data-clickable')
          ) {
            foundClickable = true;
            break;
          }
          
          currentElement = currentElement.parentElement as HTMLElement;
        }
        
        setIsHovering(foundClickable);
      }
    };

    const interval = setInterval(checkHover, 30);
    return () => clearInterval(interval);
  }, [mousePosition]);

  // Handle dark mode detection
  useEffect(() => {
    const detectDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Initial detection
    detectDarkMode();

    // Observer for changes
    const observer = new MutationObserver(detectDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Handle mouse clicks
  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Completely hide default cursor
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
      
      html, body, a, button, input, select, textarea,
      [role="button"], .clickable, [data-clickable="true"],
      .modal, [role="dialog"], .modal *, [role="dialog"] *,
      #root, #__next, .app, .card, [role="button"],
      button *, a *, [role="button"] * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Calculate speed for trail opacity
  const getSpeed = () => {
    const vx = velocity.current.x;
    const vy = velocity.current.y;
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.min(speed * 3, 1); // Normalize and cap
  };

  // Simple black and white colors based on mode
  const dotColor = isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)';
  const ringColor = isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
  const dotSize = 8;
  const ringSize = isHovering ? 38 : 32;

  // Dynamic trail properties
  const speed = getSpeed();
  const trailOpacityBase = 0.7;
  const trailOpacityDelta = 0.25;

    
  // Move this after all hooks
  if (isMobile) return null;

  return (
    <>
      {/* Minimal outer ring */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          zIndex: 10000,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1px solid ${ringColor}`,
          opacity: isClicking ? 0.5 : 1,
          transition: "width 0.2s ease, height 0.2s ease"
        }}
        animate={{
          x: mainX.get() - ringSize / 2,
          y: mainY.get() - ringSize / 2,
          scale: isClicking ? 0.9 : 1
        }}
      />

      {/* Simple dot */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          zIndex: 10001,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: dotColor,
          transition: "width 0.2s ease, height 0.2s ease"
        }}
        animate={{
          x: mainX.get() - dotSize / 2,
          y: mainY.get() - dotSize / 2,
          scale: isClicking ? 0.8 : 1
        }}
      />

      {/* Enhanced trailing dots - more natural, dynamic trail */}
      {/* First trail dot */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          zIndex: 9998,
          width: dotSize - 1,
          height: dotSize - 1,
          borderRadius: '50%',
          backgroundColor: dotColor,
          opacity: trailOpacityBase * (speed * 0.5 + 0.5)
        }}
        animate={{
          x: trailX1.get() - (dotSize - 1) / 2,
          y: trailY1.get() - (dotSize - 1) / 2
        }}
      />
      
      {/* Second trail dot */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          zIndex: 9997,
          width: dotSize - 2,
          height: dotSize - 2,
          borderRadius: '50%',
          backgroundColor: dotColor,
          opacity: (trailOpacityBase - trailOpacityDelta) * (speed * 0.6 + 0.4)
        }}
        animate={{
          x: trailX2.get() - (dotSize - 2) / 2,
          y: trailY2.get() - (dotSize - 2) / 2
        }}
      />
      
      {/* Third trail dot */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          zIndex: 9996,
          width: dotSize - 3,
          height: dotSize - 3,
          borderRadius: '50%',
          backgroundColor: dotColor,
          opacity: (trailOpacityBase - trailOpacityDelta * 2) * (speed * 0.7 + 0.3)
        }}
        animate={{
          x: trailX3.get() - (dotSize - 3) / 2,
          y: trailY3.get() - (dotSize - 3) / 2
        }}
      />
    </>
  );
}