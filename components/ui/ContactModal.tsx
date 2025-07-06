import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ContactModalProps {
  onClose: () => void;
  scrollProgress?: number;
}

export default function ContactModal({
  onClose,
  scrollProgress = 0,
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendMessage = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[100] px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleBackdropClick}
      >
        {/* Backdrop with blur effect */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Modal container */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl w-full max-w-lg mx-4 overflow-hidden relative z-10 border border-gray-100"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 400,
            duration: 0.5,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 z-10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="p-10 pt-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-wide">
                Get in Touch
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                I'd love to hear from you. Send me a message, and I'll respond
                as soon as possible.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-light text-gray-600 mb-3"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-5 py-4 border border-gray-100 rounded-2xl focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-gray-25 text-gray-900 placeholder:text-gray-400 transition-all duration-300 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-light text-gray-600 mb-3"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 border border-gray-100 rounded-2xl focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-gray-25 text-gray-900 placeholder:text-gray-400 transition-all duration-300 outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-light text-gray-600 mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message"
                  rows={5}
                  className="w-full px-5 py-4 border border-gray-100 rounded-2xl focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-gray-25 text-gray-900 placeholder:text-gray-400 resize-none transition-all duration-300 outline-none"
                />
              </div>

              {/* Status */}
              {status && (
                <div className="text-center">
                  <p
                    className={`text-sm font-light ${
                      status.includes("success")
                        ? "text-green-500"
                        : "text-red-400"
                    }`}
                  >
                    {status}
                  </p>
                </div>
              )}

              {/* Send Button */}
              <div className="pt-6">
                <button
                  onClick={handleSendMessage}
                  disabled={isSubmitting}
                  className="w-full bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 px-6 py-4 rounded-2xl font-light text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
