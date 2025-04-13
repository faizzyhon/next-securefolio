"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Taskbar from "@/components/desktop/taskbar"
import DesktopIcon from "@/components/desktop/desktop-icon"
import Window from "@/components/desktop/window"
import Terminal from "@/components/applications/terminal"
import FileExplorer from "@/components/applications/file-explorer"
import Browser from "@/components/applications/browser"
import ContextMenu from "@/components/desktop/context-menu"
import StartMenu from "@/components/desktop/start-menu"
import MrRobotHack from "@/components/hacking/mr-robot-hack"
import Wireshark from "@/components/applications/wireshark"
import Nmap from "@/components/applications/nmap"
import CodeEditor from "@/components/applications/code-editor"
import Notes from "@/components/applications/notes"
import Calculator from "@/components/applications/calculator"
import PDFViewer from "@/components/applications/pdf-viewer"
import VPNApp from "@/components/applications/vpn"
import Settings from "@/components/applications/settings"
import { useWindowManager } from "@/hooks/use-window-manager"
import { motion, AnimatePresence } from "framer-motion"

export default function Desktop() {
  const {
    windows,
    activeWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    windowRefs,
    updateWindowPosition,
  } = useWindowManager()

  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showHackingAnimation, setShowHackingAnimation] = useState(false)
  const [hackingComplete, setHackingComplete] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      clearInterval(timer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
    setShowContextMenu(true)
  }

  const handleClick = () => {
    setShowContextMenu(false)
    if (showStartMenu) setShowStartMenu(false)
  }

  const toggleStartMenu = () => {
    setShowStartMenu(!showStartMenu)
    setShowContextMenu(false)
  }

  const handleOpenApplication = (appType: string) => {
    openWindow(appType)
    setShowStartMenu(false)
  }

  const handleHackingComplete = () => {
    setShowHackingAnimation(false)
    setHackingComplete(true)
  }

  const triggerHack = () => {
    setShowHackingAnimation(true)
  }

  return (
    <div
      className="h-full w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/kali-small-logo-wallpaper.png')" }}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {/* Desktop Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 p-4">
        <DesktopIcon icon="/kali-linux-icon.png" label="Home" onClick={() => handleOpenApplication("fileExplorer")} />
        <DesktopIcon
          icon="/icons/terminal-icon.png"
          label="Terminal"
          onClick={() => handleOpenApplication("terminal")}
        />
        <DesktopIcon icon="/icons/chrome-icon.png" label="Browser" onClick={() => handleOpenApplication("browser")} />
        <DesktopIcon icon="/icons/tools-icon.png" label="Tools" onClick={() => handleOpenApplication("fileExplorer")} />
        <DesktopIcon icon="/icons/wireshark.svg" label="Wireshark" onClick={() => handleOpenApplication("wireshark")} />
        <DesktopIcon icon="/icons/tools.svg" label="Nmap" onClick={() => handleOpenApplication("nmap")} />
        <DesktopIcon icon="/icons/app.svg" label="Code Editor" onClick={() => handleOpenApplication("codeEditor")} />
        <DesktopIcon icon="/icons/app.svg" label="Notes" onClick={() => handleOpenApplication("notes")} />
        <DesktopIcon icon="/icons/app.svg" label="Settings" onClick={() => handleOpenApplication("settings")} />
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            isActive={window.id === activeWindow}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized || isMobile} // Force maximize on mobile
            x={window.x}
            y={window.y}
            width={window.width}
            height={window.height}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            windowRef={windowRefs[window.id]}
            updatePosition={(x, y) => updateWindowPosition(window.id, x, y)}
            icon={window.icon}
          >
            {window.type === "terminal" && <Terminal setActiveSection={() => {}} triggerHack={triggerHack} />}
            {window.type === "fileExplorer" && <FileExplorer />}
            {window.type === "browser" && <Browser />}
            {window.type === "wireshark" && <Wireshark />}
            {window.type === "nmap" && <Nmap />}
            {window.type === "codeEditor" && <CodeEditor />}
            {window.type === "notes" && <Notes />}
            {window.type === "calculator" && <Calculator />}
            {window.type === "pdfViewer" && <PDFViewer />}
            {window.type === "vpn" && <VPNApp />}
            {window.type === "settings" && <Settings />}
          </Window>
        ))}
      </AnimatePresence>

      {/* Context Menu */}
      <AnimatePresence>
        {showContextMenu && (
          <ContextMenu
            x={contextMenuPosition.x}
            y={contextMenuPosition.y}
            onClose={() => setShowContextMenu(false)}
            onOpenTerminal={() => {
              handleOpenApplication("terminal")
              setShowContextMenu(false)
            }}
            onOpenBrowser={() => {
              handleOpenApplication("browser")
              setShowContextMenu(false)
            }}
            onOpenFileExplorer={() => {
              handleOpenApplication("fileExplorer")
              setShowContextMenu(false)
            }}
          />
        )}
      </AnimatePresence>

      {/* Start Menu */}
      <AnimatePresence>
        {showStartMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <StartMenu onOpenApplication={handleOpenApplication} onClose={() => setShowStartMenu(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onWindowClick={focusWindow}
        onStartClick={toggleStartMenu}
        showStartMenu={showStartMenu}
        currentTime={currentTime}
      />

      {/* Mr. Robot Hacking Animation */}
      <AnimatePresence>{showHackingAnimation && <MrRobotHack onComplete={handleHackingComplete} />}</AnimatePresence>

      {/* Mobile instructions overlay - only shown on first load on mobile */}
      {isMobile && (
        <motion.div
          className="fixed bottom-16 left-0 right-0 bg-black/80 text-green-400 p-4 text-center text-sm z-30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p>Tap icons to open applications. Long press for context menu.</p>
          <p className="mt-1">Created by Muhammad Faizan</p>
        </motion.div>
      )}
    </div>
  )
}
