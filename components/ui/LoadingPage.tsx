'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("Loading started"); // Debug log
    const timer = setTimeout(() => {
      console.log("Loading ended"); // Debug log
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null
  console.log("Exiting LoadingPage"); // Debug log
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
    >
      <motion.div
        className="text-4xl font-thin text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="w-16 h-1 bg-gray-300">
          <motion.div
            className="h-full bg-gray-800"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
