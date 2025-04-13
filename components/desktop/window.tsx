"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Maximize2, Minimize2, X } from "lucide-react"
import { motion } from "framer-motion"

interface WindowProps {
  id: string
  title: string
  children: React.ReactNode
  isActive: boolean
  isMinimized: boolean
  isMaximized: boolean
  x: number
  y: number
  width: number
  height: number
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  windowRef: React.RefObject<HTMLDivElement>
  updatePosition: (x: number, y: number) => void
  icon: string
}

export default function Window({
  id,
  title,
  children,
  isActive,
  isMinimized,
  isMaximized,
  x,
  y,
  width,
  height,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  windowRef,
  updatePosition,
  icon,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y
        updatePosition(newX, newY)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, updatePosition, isMaximized])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
      setIsDragging(true)
      const rect = windowRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
    onFocus()
  }

  if (isMinimized) {
    return null
  }

  return (
    <motion.div
      ref={windowRef}
      className={`absolute rounded-t overflow-hidden flex flex-col ${
        isActive ? "shadow-lg ring-1 ring-gray-700 z-20" : "shadow z-10"
      }`}
      style={{
        left: isMaximized ? 0 : x,
        top: isMaximized ? 0 : y,
        width: isMaximized ? "100%" : width,
        height: isMaximized ? "calc(100% - 48px)" : height,
      }}
      onMouseDown={handleMouseDown}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0}
      onDragStart={(e, info) => {
        setIsDragging(true)
        const rect = windowRef.current?.getBoundingClientRect()
        if (rect) {
          setDragOffset({
            x: info.point.x - rect.left,
            y: info.point.y - rect.top,
          })
        }
      }}
      onDragEnd={(e, info) => {
        setIsDragging(false)
        updatePosition(info.point.x - dragOffset.x, info.point.y - dragOffset.y)
      }}
    >
      {/* Window Header */}
      <motion.div
        ref={headerRef}
        className={`h-8 flex items-center justify-between px-2 cursor-move ${isActive ? "bg-gray-800" : "bg-gray-700"}`}
        whileTap={{ cursor: "grabbing" }}
      >
        <div className="flex items-center">
          <img src={icon || "/placeholder.svg"} alt={title} className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium truncate">{title}</span>
        </div>
        <div className="flex items-center space-x-1">
          <motion.button
            onClick={onMinimize}
            className="h-5 w-5 flex items-center justify-center rounded hover:bg-gray-600"
            whileHover={{ backgroundColor: "rgba(75, 85, 99, 0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Minimize2 className="h-3 w-3" />
          </motion.button>
          <motion.button
            onClick={onMaximize}
            className="h-5 w-5 flex items-center justify-center rounded hover:bg-gray-600"
            whileHover={{ backgroundColor: "rgba(75, 85, 99, 0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize2 className="h-3 w-3" />
          </motion.button>
          <motion.button
            onClick={onClose}
            className="h-5 w-5 flex items-center justify-center rounded hover:bg-red-600"
            whileHover={{ backgroundColor: "rgba(220, 38, 38, 0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="h-3 w-3" />
          </motion.button>
        </div>
      </motion.div>

      {/* Window Content */}
      <div className="flex-1 bg-gray-900 overflow-hidden">{children}</div>
    </motion.div>
  )
}
