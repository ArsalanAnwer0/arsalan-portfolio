'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { Container, Engine } from 'tsparticles-engine';

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme detection
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const updateTheme = () => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
      };
      
      updateTheme();
      
      const observer = new MutationObserver(updateTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
      
      return () => observer.disconnect();
    }
  }, []);

  // Initialize particles
  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadSlim(engine);
      console.log("Particles initialized successfully");
    } catch (error) {
      console.error("Error initializing particles:", error);
    }
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    if (container) {
      console.log("Particles loaded successfully");
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: false,
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 30,
          particles: {
            number: {
              value: 45,
              density: {
                enable: true,
                value_area: 800,
              }
            },
            color: {
              value: isDarkMode 
                ? ["rgba(255, 255, 255, 0.35)", "rgba(230, 230, 250, 0.35)"] 
                : ["rgba(40, 40, 40, 0.25)", "rgba(60, 60, 80, 0.25)"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: isDarkMode ? 0.35 : 0.25,
              random: false,
              anim: {
                enable: false,
              },
            },
            size: {
              value: 2.5,
              random: true,
              anim: {
                enable: false,
              },
            },
            links: {
              enable: true,
              distance: 160,
              color: isDarkMode 
                ? "rgba(255, 255, 255, 0.18)" 
                : "rgba(50, 50, 50, 0.15)",
              opacity: isDarkMode ? 0.18 : 0.15, 
              width: 1.2,
            },
            move: {
              enable: true,
              speed: 0.4,
              direction: "none",
              random: false,
              straight: false,
              outMode: "bounce",
              attract: {
                enable: false,
              },
            },
          },
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: false,
              },
              onClick: {
                enable: false,
              },
              resize: true,
            },
          },
          detectRetina: false,
          pauseOnBlur: false,
          pauseOnOutsideViewport: false,
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default ParticleBackground;