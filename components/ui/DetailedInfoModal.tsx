import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DetailedInfoModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  scrollProgress?: number;
}

const DetailedInfoModal: React.FC<DetailedInfoModalProps> = ({
  title,
  content,
  onClose,
  isOpen,
  scrollProgress = 0
}) => {
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[100] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with blur effect */}
          <motion.div 
            className="absolute inset-0 backdrop-blur-[2px] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
          />
          
          {/* Modal container - Force Grey Background with Inline Styles */}
          <motion.div
            className="rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden relative z-10 shadow-2xl"
            style={{ 
              backgroundColor: 'rgba(45, 45, 45, 0.85)',
              borderColor: 'rgba(45, 45, 45, 0.85)',
              border: '1px solid rgba(45, 45, 45, 0.85)'
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 350
            }}
          >
            {/* Header */}
            <div 
              className="px-6 py-5 flex justify-between items-center"
              style={{ 
                borderBottom: '1px solid rgba(45, 45, 45, 0.85)',
                backgroundColor: 'rgba(45, 45, 45, 0.85)'
              }}
            >
              <h2 className="text-xl font-semibold" style={{ color: 'white' }}>
                {title}
              </h2>
              
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-all duration-300"
                style={{ color: '#9ca3af' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content area */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(85vh - 130px)" }}>
              <div className="p-6" style={{ backgroundColor: 'rgba(45, 45, 45, 0.85)' }}>
                <div 
                  style={{ color: 'white' }}
                  dangerouslySetInnerHTML={{ __html: content as string }} 
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailedInfoModal;