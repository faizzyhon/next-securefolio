"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Lock, Eye, EyeOff, ChevronDown, Shield, Wifi, Battery } from "lucide-react"

interface LoginProps {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("kali")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showUsers, setShowUsers] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username) {
      setError("Please enter a username")
      return
    }

    if (!password) {
      setError("Please enter a password")
      return
    }

    setLoading(true)
    setError("")

    // Simulate login process
    setTimeout(() => {
      if (password === "kali" || password === "toor") {
        onLogin()
      } else {
        setLoading(false)
        setError("Incorrect password")
        setPassword("")
      }
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })
  }

  const users = [
    { username: "kali", fullName: "Kali Linux" },
    { username: "root", fullName: "Administrator" },
    { username: "muhammad", fullName: "Muhammad Faizan" },
  ]

  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/kali-layers-wallpaper.png')" }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center p-4 text-sm">
        <div>Kali Linux</div>
        <div className="flex items-center space-x-4">
          <Wifi className="h-4 w-4" />
          <Battery className="h-4 w-4" />
          <div>{formatTime(currentTime)}</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img src="/kali-linux-icon.png" alt="Kali Linux" className="w-24 h-24" />
        </motion.div>

        {/* Time and date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="text-4xl font-light">{formatTime(currentTime)}</div>
          <div className="text-lg text-gray-400">{formatDate(currentTime)}</div>
        </motion.div>

        {/* Login form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-80"
        >
          <div className="bg-gray-900/80 rounded-lg p-6 backdrop-blur-sm">
            <form onSubmit={handleLogin}>
              <div className="relative mb-4">
                <div
                  className="flex items-center justify-between p-2 bg-gray-800 rounded-t cursor-pointer"
                  onClick={() => setShowUsers(!showUsers)}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{username}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>

                <AnimatePresence>
                  {showUsers && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="absolute w-full z-20 overflow-hidden"
                    >
                      <div className="bg-gray-800 rounded-b border-t border-gray-700">
                        {users.map((user) => (
                          <div
                            key={user.username}
                            className="p-2 hover:bg-gray-700 cursor-pointer flex items-center"
                            onClick={() => {
                              setUsername(user.username)
                              setShowUsers(false)
                            }}
                          >
                            <User className="h-5 w-5 mr-2 text-gray-400" />
                            <div>
                              <div>{user.username}</div>
                              <div className="text-xs text-gray-400">{user.fullName}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative mb-4">
                <div className="flex items-center bg-gray-800 rounded p-2">
                  <Lock className="h-5 w-5 mr-2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="bg-transparent border-none outline-none flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 text-red-500 text-sm flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  {error}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded flex items-center justify-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  "Log In"
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 p-4 text-center text-sm text-gray-500">Created by Muhammad Faizan</div>
    </div>
  )
}
