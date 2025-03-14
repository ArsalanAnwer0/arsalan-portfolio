import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface DetailedInfoModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const DetailedInfoModal: React.FC<DetailedInfoModalProps> = ({
  title,
  content,
  onClose,
  isOpen
}) => {
  // Handle clicks on the backdrop to close the modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.4
            }}
          >
            {/* Header with title and back button */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center z-10">
              <button
                onClick={onClose}
                className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white absolute left-1/2 transform -translate-x-1/2">
                {title}
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="prose dark:prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content as string }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailedInfoModal;