import React from "react";
import { motion } from "framer-motion";

interface ClickableInfoCardProps {
  title: string;
  summary: string | React.ReactNode;
  onClick: () => void;
  scrollProgress?: number;
}

const ClickableInfoCard: React.FC<ClickableInfoCardProps> = ({
  title,
  summary,
  onClick,
  scrollProgress = 0
}) => {
  // Dynamic styling based on scroll progress
  const getTitleColor = () => {
    return scrollProgress > 0.4 ? 'text-white' : 'text-gray-900';
  };

  const getSummaryColor = () => {
    return scrollProgress > 0.4 ? 'text-gray-200' : 'text-gray-700';
  };

  const getLearnMoreColor = () => {
    return scrollProgress > 0.4 ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900';
  };

  const getHoverBg = () => {
    return scrollProgress > 0.4 
      ? 'hover:bg-white/5' 
      : 'hover:bg-black/5';
  };

  return (
    <motion.div
      onClick={onClick}
      className={`p-6 md:p-8 cursor-pointer transition-all duration-700 rounded-lg ${getHoverBg()}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      whileHover={{ 
        scale: 1.01,
        y: -2
      }}
      whileTap={{ scale: 0.99 }}
    >
      <h3 className={`font-bold text-xl md:text-2xl mb-4 transition-colors duration-700 ${getTitleColor()}`}>
        {title}
      </h3>
      
      {typeof summary === "string" ? (
        <p className={`text-base md:text-lg leading-relaxed mb-6 transition-colors duration-700 ${getSummaryColor()}`}>
          {summary}
        </p>
      ) : (
        <div className={`text-base md:text-lg leading-relaxed mb-6 transition-colors duration-700 ${getSummaryColor()}`}>
          {summary}
        </div>
      )}
      
      <div className="flex justify-end">
        <motion.div
          className={`text-sm font-medium flex items-center transition-all duration-700 ${getLearnMoreColor()}`}
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, x: 5 }}
        >
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClickableInfoCard;