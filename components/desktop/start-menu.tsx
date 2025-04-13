"use client"

import { motion } from "framer-motion"

interface StartMenuProps {
  onOpenApplication: (appType: string) => void
  onClose: () => void
}

export default function StartMenu({ onOpenApplication, onClose }: StartMenuProps) {
  const applications = [
    {
      name: "Terminal",
      icon: "/icons/terminal-icon.png",
      type: "terminal",
    },
    {
      name: "File Explorer",
      icon: "/icons/folder-icon.png",
      type: "fileExplorer",
    },
    {
      name: "Browser",
      icon: "/icons/chrome-icon.png",
      type: "browser",
    },
    {
      name: "Wireshark",
      icon: "/icons/wireshark.svg",
      type: "wireshark",
    },
    {
      name: "Nmap",
      icon: "/icons/tools.svg",
      type: "nmap",
    },
    {
      name: "Code Editor",
      icon: "/icons/app.svg",
      type: "codeEditor",
    },
    {
      name: "Notes",
      icon: "/icons/app.svg",
      type: "notes",
    },
    {
      name: "Calculator",
      icon: "/icons/app.svg",
      type: "calculator",
    },
    {
      name: "PDF Viewer",
      icon: "/icons/app.svg",
      type: "pdfViewer",
    },
    {
      name: "VPN",
      icon: "/icons/app.svg",
      type: "vpn",
    },
    {
      name: "Settings",
      icon: "/icons/app.svg",
      type: "settings",
    },
    {
      name: "Metasploit",
      icon: "/icons/metasploit.svg",
      type: "terminal",
    },
  ]

  return (
    <motion.div
      className="absolute bottom-12 left-0 w-72 bg-gray-800 border border-gray-700 shadow-lg rounded-t z-50"
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="p-4 bg-gray-900 flex items-center border-b border-gray-700">
        <img src="/kali-linux-icon.png" alt="Kali Linux" className="w-10 h-10 mr-3" />
        <div>
          <h3 className="text-sm font-medium">Kali Linux</h3>
          <p className="text-xs text-gray-400">Penetration Testing Platform</p>
        </div>
      </div>

      {/* Applications */}
      <div className="p-2 max-h-80 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {applications.map((app) => (
            <motion.button
              key={app.name}
              className="flex flex-col items-center p-2 rounded hover:bg-gray-700"
              onClick={() => onOpenApplication(app.type)}
              whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={app.icon || "/placeholder.svg"} alt={app.name} className="w-8 h-8 mb-1" />
              <span className="text-xs text-center">{app.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-700 flex justify-between">
        <motion.button
          className="text-xs text-gray-400 hover:text-white flex items-center"
          onClick={onClose}
          whileHover={{ color: "rgba(255, 255, 255, 1)" }}
        >
          <span>Power</span>
        </motion.button>
        <motion.button
          className="text-xs text-gray-400 hover:text-white flex items-center"
          onClick={onClose}
          whileHover={{ color: "rgba(255, 255, 255, 1)" }}
        >
          <span>Log Out</span>
        </motion.button>
      </div>

      <div className="text-xs text-center p-1 bg-gray-900 text-gray-500">Created by Muhammad Faizan</div>
    </motion.div>
  )
}
