import React, { useState } from "react";

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSendMessage = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("All fields are required.");
      return;
    }

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
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-8 sm:p-10 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title and Description */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
          Get in Touch
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          I'd love to hear from you. Send me a message, and I'll respond as soon
          as possible.
        </p>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 bg-gray-50 dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 bg-gray-50 dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              rows={5}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 bg-gray-50 dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Send Button */}
          <div className="mt-6 flex justify-center">
          <button
  onClick={handleSendMessage}
  className="w-full bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 text-white dark:text-gray-900 hover:opacity-90 transition-opacity px-6 py-3 rounded-xl shadow-lg"
>
  Send Message
</button>

          </div>
        </form>

        {/* Status */}
        {status && (
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
