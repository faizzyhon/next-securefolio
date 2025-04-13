"use client"

import { motion } from "framer-motion"

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  onOpenTerminal: () => void
  onOpenBrowser: () => void
  onOpenFileExplorer: () => void
}

export default function ContextMenu({
  x,
  y,
  onClose,
  onOpenTerminal,
  onOpenBrowser,
  onOpenFileExplorer,
}: ContextMenuProps) {
  // Adjust position to keep menu in viewport
  const adjustedY = y + 200 > window.innerHeight ? window.innerHeight - 200 : y
  const adjustedX = x + 200 > window.innerWidth ? window.innerWidth - 200 : x

  return (
    <motion.div
      className="fixed z-50 bg-gray-800 border border-gray-700 shadow-lg rounded w-48"
      style={{ top: adjustedY, left: adjustedX }}
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.1 }}
    >
      <ul className="py-1">
        <motion.li whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }} whileTap={{ scale: 0.98 }}>
          <button onClick={onOpenTerminal} className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
            <img src="/icons/terminal-icon.png" alt="Terminal" className="w-5 h-5 mr-2" />
            Open Terminal
          </button>
        </motion.li>
        <motion.li whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }} whileTap={{ scale: 0.98 }}>
          <button onClick={onOpenBrowser} className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
            <img src="/icons/chrome-icon.png" alt="Browser" className="w-5 h-5 mr-2" />
            Open Browser
          </button>
        </motion.li>
        <motion.li whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }} whileTap={{ scale: 0.98 }}>
          <button
            onClick={onOpenFileExplorer}
            className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
          >
            <img src="/icons/folder-icon.png" alt="File Explorer" className="w-5 h-5 mr-2" />
            Open File Explorer
          </button>
        </motion.li>
        <li className="border-t border-gray-700">
          <motion.button
            onClick={onClose}
            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-400"
            whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        </li>
      </ul>
    </motion.div>
  )
}
