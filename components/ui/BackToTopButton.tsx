import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface BackToTopButtonProps {
  scrollProgress: number;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  scrollProgress,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show button when user scrolls down 25% of the page
      setIsVisible(scrollTop > windowHeight * 0.25);

      // Enhanced prominence when near bottom (last 20% of page)
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      setIsNearBottom(distanceFromBottom < documentHeight * 0.2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Apple-inspired minimalist styling
  const getButtonStyle = () => {
    const isDark = scrollProgress > 0.65;
    const prominence = isNearBottom ? 1 : 0.75;

    return {
      background: isDark
        ? `rgba(255, 255, 255, ${0.08 * prominence})`
        : `rgba(0, 0, 0, ${0.04 * prominence})`,
      backdropFilter: "blur(20px) saturate(180%)",
      border: isDark
        ? `0.5px solid rgba(255, 255, 255, ${0.15 * prominence})`
        : `0.5px solid rgba(0, 0, 0, ${0.08 * prominence})`,
      color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.7)",
      boxShadow: isDark
        ? `0 1px 20px rgba(255, 255, 255, ${
            0.05 * prominence
          }), 0 8px 16px rgba(0, 0, 0, 0.1)`
        : `0 1px 20px rgba(0, 0, 0, ${
            0.03 * prominence
          }), 0 8px 16px rgba(0, 0, 0, 0.04)`,
    };
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{
            opacity: isNearBottom ? 1 : 0.7,
            scale: isNearBottom ? 1 : 0.95,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{
            scale: 1.02,
            y: -1,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.8,
            },
          }}
          whileTap={{
            scale: 0.98,
            transition: { duration: 0.1 },
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-700 ease-out z-50"
          style={getButtonStyle()}
        >
          <ChevronUp
            className="w-4 h-4"
            strokeWidth={1.5}
            style={{
              transform: isNearBottom ? "translateY(-0.5px)" : "translateY(0)",
              transition: "transform 0.3s ease",
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
