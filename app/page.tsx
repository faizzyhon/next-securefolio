"use client"

import { useState, useEffect } from "react"
import Desktop from "@/components/desktop/desktop"
import BootScreen from "@/components/boot-screen"
import LoginScreen from "@/components/login-screen"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [isBooting, setIsBooting] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Simulate boot process
    const timer = setTimeout(() => {
      setIsBooting(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <BootScreen />
          </motion.div>
        ) : !isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 right-0 p-1 text-xs text-green-500/50 z-50">Created by Muhammad Faizan</div>
    </main>
  )
}
