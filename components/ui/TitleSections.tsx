import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

interface TitleSectionProps {
  title: string;
  route: string;
  scrollProgress: number;
  delay?: number;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  route,
  scrollProgress,
  delay = 0,
}) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = async () => {
    setIsTransitioning(true);

    // Wait for fade animation to complete
    setTimeout(() => {
      router.push(route);
    }, 600); // Match the fade duration
  };

  // Dynamic styling based on scroll progress
  const getTextColor = () => {
    return scrollProgress > 0.5 ? "text-white" : "text-gray-800";
  };

  const getHoverEffect = () => {
    return scrollProgress > 0.5
      ? "hover:text-gray-300 hover:scale-105"
      : "hover:text-gray-600 hover:scale-105";
  };

  return (
    <>
      <motion.section
        className="min-h-screen flex flex-col justify-center items-center snap-start cursor-pointer px-8 py-10 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, delay }}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Main Title */}
        <motion.h1
          className={`
            text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 
            font-light leading-none text-center transition-all duration-700
            ${getTextColor()} ${getHoverEffect()}
          `}
          style={{
            fontFamily:
              "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.02em",
          }}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
          animate={isTransitioning ? { opacity: 0, scale: 0.95 } : {}}
        >
          {title}
        </motion.h1>

        {/* Subtle hover indicator */}
        <motion.div
          className={`
            mt-8 text-sm uppercase tracking-widest font-light transition-all duration-700
            ${
              scrollProgress > 0.5
                ? "text-gray-300 opacity-60"
                : "text-gray-600 opacity-60"
            }
          `}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
          animate={isTransitioning ? { opacity: 0 } : {}}
        >
          Click to explore
        </motion.div>

        {/* Subtle background decoration */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, delay: delay + 0.1 }}
          animate={isTransitioning ? { opacity: 0 } : {}}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                scrollProgress > 0.5
                  ? "radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 70%)"
                  : "radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </motion.section>

      {/* Elegant Fade Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{
              background:
                scrollProgress > 0.5 ? "rgb(45, 45, 45)" : "rgb(255, 255, 255)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface TitleSectionsProps {
  scrollProgress: number;
}

const TitleSections: React.FC<TitleSectionsProps> = ({ scrollProgress }) => {
  return (
    <>
      <TitleSection
        title="ABOUT"
        route="/about"
        scrollProgress={scrollProgress}
        delay={0}
      />
      <TitleSection
        title="PROJECTS"
        route="/projects"
        scrollProgress={scrollProgress}
        delay={0.1}
      />
      <TitleSection
        title="CERTIFICATES"
        route="/certificates"
        scrollProgress={scrollProgress}
        delay={0.2}
      />
      <TitleSection
        title="LEARNING"
        route="/learning"
        scrollProgress={scrollProgress}
        delay={0.3}
      />
      <TitleSection
        title="SKILLS"
        route="/skills"
        scrollProgress={scrollProgress}
        delay={0.4}
      />
    </>
  );
};

export default TitleSections;
