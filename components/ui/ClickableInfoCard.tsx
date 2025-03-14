import React from "react";
import { motion } from "framer-motion";

interface ClickableInfoCardProps {
  title: string;
  summary: string | React.ReactNode;
  onClick: () => void;
}

const ClickableInfoCard: React.FC<ClickableInfoCardProps> = ({
  title,
  summary,
  onClick
}) => {
  return (
    <motion.div
      onClick={onClick}
      className="p-6 md:p-8 rounded-xl bg-white dark:bg-black text-black dark:text-white shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="font-bold text-xl mb-4">{title}</h3>
      
      {typeof summary === "string" ? (
        <p>{summary}</p>
      ) : (
        <div>{summary}</div>
      )}
      
      <div className="mt-4 flex justify-end">
        <motion.div
          className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center"
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
        >
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
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