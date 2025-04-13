"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"

interface Window {
  id: string
  title: string
  type: string
  isMinimized: boolean
  isMaximized: boolean
  x: number
  y: number
  width: number
  height: number
  icon: string
}

export function useWindowManager() {
  const [windows, setWindows] = useState<Window[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const windowRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({}).current

  const openWindow = useCallback(
    (type: string) => {
      const id = `window-${Date.now()}`
      const newWindow: Window = {
        id,
        type,
        isMinimized: false,
        isMaximized: false,
        x: 100 + ((windows.length * 30) % 200),
        y: 100 + ((windows.length * 30) % 200),
        width: getDefaultWidth(type),
        height: getDefaultHeight(type),
        title: getWindowTitle(type),
        icon: getWindowIcon(type),
      }

      windowRefs[id] = React.createRef()
      setWindows([...windows, newWindow])
      setActiveWindow(id)
      return id
    },
    [windows, windowRefs],
  )

  const closeWindow = useCallback(
    (id: string) => {
      const newWindows = windows.filter((window) => window.id !== id)
      setWindows(newWindows)

      if (activeWindow === id) {
        setActiveWindow(newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null)
      }

      delete windowRefs[id]
    },
    [windows, activeWindow, windowRefs],
  )

  const minimizeWindow = useCallback(
    (id: string) => {
      setWindows(
        windows.map((window) => {
          if (window.id === id) {
            return { ...window, isMinimized: true }
          }
          return window
        }),
      )

      if (activeWindow === id) {
        const visibleWindows = windows.filter((w) => !w.isMinimized && w.id !== id)
        setActiveWindow(visibleWindows.length > 0 ? visibleWindows[visibleWindows.length - 1].id : null)
      }
    },
    [windows, activeWindow],
  )

  const maximizeWindow = useCallback(
    (id: string) => {
      setWindows(
        windows.map((window) => {
          if (window.id === id) {
            return { ...window, isMaximized: !window.isMaximized }
          }
          return window
        }),
      )
    },
    [windows],
  )

  const focusWindow = useCallback(
    (id: string) => {
      const window = windows.find((w) => w.id === id)
      if (window && window.isMinimized) {
        setWindows(
          windows.map((w) => {
            if (w.id === id) {
              return { ...w, isMinimized: false }
            }
            return w
          }),
        )
      }
      setActiveWindow(id)
    },
    [windows],
  )

  const updateWindowPosition = useCallback(
    (id: string, x: number, y: number) => {
      setWindows(
        windows.map((window) => {
          if (window.id === id) {
            return { ...window, x, y }
          }
          return window
        }),
      )
    },
    [windows],
  )

  return {
    windows,
    activeWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    windowRefs,
    updateWindowPosition,
  }
}

function getDefaultWidth(type: string): number {
  switch (type) {
    case "terminal":
      return 700
    case "fileExplorer":
      return 800
    case "browser":
      return 900
    case "hackedTerminal":
      return 800
    case "wireshark":
      return 900
    case "nmap":
      return 800
    case "codeEditor":
      return 900
    case "notes":
      return 700
    case "calculator":
      return 350
    case "pdfViewer":
      return 800
    case "vpn":
      return 600
    case "settings":
      return 800
    default:
      return 600
  }
}

function getDefaultHeight(type: string): number {
  switch (type) {
    case "terminal":
      return 400
    case "fileExplorer":
      return 500
    case "browser":
      return 600
    case "hackedTerminal":
      return 500
    case "wireshark":
      return 600
    case "nmap":
      return 500
    case "codeEditor":
      return 600
    case "notes":
      return 500
    case "calculator":
      return 500
    case "pdfViewer":
      return 600
    case "vpn":
      return 550
    case "settings":
      return 600
    default:
      return 400
  }
}

function getWindowTitle(type: string): string {
  switch (type) {
    case "terminal":
      return "Terminal"
    case "fileExplorer":
      return "File Explorer"
    case "browser":
      return "Web Browser"
    case "hackedTerminal":
      return "SYSTEM BREACH - Portfolio Data Extraction"
    case "wireshark":
      return "Wireshark"
    case "nmap":
      return "Nmap Scanner"
    case "codeEditor":
      return "Code Editor"
    case "notes":
      return "Notes"
    case "calculator":
      return "Calculator"
    case "pdfViewer":
      return "PDF Viewer"
    case "vpn":
      return "Kali Secure VPN"
    case "settings":
      return "Settings"
    default:
      return "Window"
  }
}

function getWindowIcon(type: string): string {
  switch (type) {
    case "terminal":
      return "/icons/terminal-icon.png"
    case "fileExplorer":
      return "/icons/folder-icon.png"
    case "browser":
      return "/icons/chrome-icon.png"
    case "hackedTerminal":
      return "/icons/terminal-icon.png"
    case "wireshark":
      return "/icons/wireshark.svg"
    case "nmap":
      return "/icons/tools.svg"
    case "codeEditor":
      return "/icons/app.svg"
    case "notes":
      return "/icons/app.svg"
    case "calculator":
      return "/icons/app.svg"
    case "pdfViewer":
      return "/icons/app.svg"
    case "vpn":
      return "/icons/app.svg"
    case "settings":
      return "/icons/app.svg"
    default:
      return "/icons/app.svg"
  }
}
