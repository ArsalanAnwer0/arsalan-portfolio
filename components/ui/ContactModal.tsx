import React, { useState } from "react";

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSendMessage = async () => {
    if (!email.trim() || !message.trim()) {
      setStatus("Both fields are required.");
      return;
    }

    setStatus("Sending...");

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
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
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Contact Me
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter your message"
              rows={4}
              required
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end space-x-4">
          {/* Cancel as plain text */}
          <span
            onClick={onClose}
            className="cursor-pointer text-black hover:underline dark:text-white"
          >
            Cancel
          </span>
          {/* Send as plain text */}
          <span
            onClick={handleSendMessage}
            className="cursor-pointer text-black hover:underline dark:text-white"
          >
            Send
          </span>
        </div>
        {status && (
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
