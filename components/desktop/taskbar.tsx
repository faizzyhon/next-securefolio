"use client"

import { Clock } from "lucide-react"
import { motion } from "framer-motion"

interface TaskbarProps {
  windows: Array<{
    id: string
    title: string
    isMinimized: boolean
    icon: string
  }>
  activeWindow: string | null
  onWindowClick: (id: string) => void
  onStartClick: () => void
  showStartMenu: boolean
  currentTime: Date
}

export default function Taskbar({
  windows,
  activeWindow,
  onWindowClick,
  onStartClick,
  showStartMenu,
  currentTime,
}: TaskbarProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#1A1A1A] border-t border-gray-700 flex items-center px-2 z-50">
      {/* Start Button */}
      <motion.button
        onClick={onStartClick}
        className={`flex items-center justify-center h-10 w-10 rounded ${
          showStartMenu ? "bg-gray-700" : "hover:bg-gray-700"
        }`}
        whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.8)" }}
        whileTap={{ scale: 0.95 }}
      >
        <img src="/kali-linux-icon.png" alt="Start" className="h-6 w-6" />
      </motion.button>

      {/* Open Windows */}
      <div className="flex-1 flex items-center ml-2 space-x-1 overflow-x-auto scrollbar-hide">
        {windows.map((window) => (
          <motion.button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`flex items-center h-10 px-3 rounded text-sm max-w-[200px] ${
              activeWindow === window.id ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            whileHover={{
              backgroundColor: activeWindow === window.id ? "rgba(55, 65, 81, 1)" : "rgba(55, 65, 81, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={window.icon || "/placeholder.svg"} alt={window.title} className="h-4 w-4 mr-2" />
            <span className="truncate hidden sm:inline">{window.title}</span>
          </motion.button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-3 px-3">
        <div className="text-sm text-gray-300 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  )
}
