"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export default function BootScreen() {
  const [progress, setProgress] = useState(0)
  const [bootMessage, setBootMessage] = useState("Starting Kali Linux...")

  useEffect(() => {
    const messages = [
      "Loading kernel...",
      "Initializing hardware...",
      "Starting system services...",
      "Loading desktop environment...",
      "Preparing workspace...",
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < messages.length) {
        setBootMessage(messages[currentStep])
        setProgress(((currentStep + 1) / (messages.length + 1)) * 100)
        currentStep++
      } else {
        setProgress(100)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-black">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <img src="/kali-linux-icon.png" alt="Kali Linux" className="w-32 h-32 mb-8" />
      </motion.div>

      <motion.h1
        className="text-3xl font-bold text-green-500 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Kali Linux
      </motion.h1>

      <motion.p
        className="text-green-400 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Advanced Penetration Testing Distribution
      </motion.p>

      <div className="w-full max-w-md px-4 mb-4">
        <Progress value={progress} className="h-2 bg-gray-800" />
      </div>

      <p className="text-green-400 font-mono">{bootMessage}</p>

      <motion.div
        className="absolute bottom-4 text-center text-green-400/70 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Created by Muhammad Faizan
      </motion.div>
    </div>
  )
}
