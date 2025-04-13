"use client"

import { motion } from "framer-motion"

interface DesktopIconProps {
  icon: string
  label: string
  onClick: () => void
}

export default function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-20 h-24 cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-12 h-12 flex items-center justify-center bg-gray-800/50 rounded group-hover:bg-gray-700/70 mb-1"
        whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.7)" }}
      >
        <img src={icon || "/placeholder.svg"} alt={label} className="w-8 h-8" />
      </motion.div>
      <span className="text-white text-xs text-center px-1 py-0.5 rounded bg-black/50 group-hover:bg-black/70">
        {label}
      </span>
    </motion.div>
  )
}
