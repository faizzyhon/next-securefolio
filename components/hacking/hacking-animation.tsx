"use client"

import { useState, useEffect, useRef } from "react"
import { useWindowManager } from "@/hooks/use-window-manager"
import MatrixBackground from "@/components/hacking/matrix-background"

interface HackingAnimationProps {
  onComplete: () => void
}

export default function HackingAnimation({ onComplete }: HackingAnimationProps) {
  const [stage, setStage] = useState<"initial" | "accessing" | "hacking" | "complete">("initial")
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("INITIALIZING HACK SEQUENCE...")
  const { openWindow } = useWindowManager()
  const terminalRef = useRef<string | null>(null)

  useEffect(() => {
    // Stage 1: Initial warning
    const timer1 = setTimeout(() => {
      setStage("accessing")
      setMessage("ACCESSING MAIN SYSTEM...")
    }, 3000)

    // Stage 2: Accessing system
    const timer2 = setTimeout(() => {
      setStage("hacking")
      setMessage("EXTRACTING PORTFOLIO DATA...")

      // Open terminal window with hacking animation
      terminalRef.current = openWindow("hackedTerminal")
    }, 6000)

    // Stage 3: Complete
    const timer3 = setTimeout(() => {
      setStage("complete")
      setMessage("ACCESS GRANTED - PORTFOLIO UNLOCKED")

      // After a delay, call onComplete to finish the animation
      setTimeout(onComplete, 2000)
    }, 15000)

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 150)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearInterval(progressInterval)
    }
  }, [openWindow, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <MatrixBackground />

      <div className="relative z-10 w-full max-w-2xl bg-black bg-opacity-80 border-2 border-green-500 p-6 text-green-500 font-mono">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold tracking-wider">SYSTEM BREACH</h2>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
            <span className="text-red-500 text-sm">LIVE</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span>{message}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 h-2">
            <div
              className="bg-green-500 h-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-green-500 p-3">
            <div className="text-xs mb-1">TARGET SYSTEM</div>
            <div className="text-lg">PORTFOLIO SERVER</div>
          </div>
          <div className="border border-green-500 p-3">
            <div className="text-xs mb-1">SECURITY LEVEL</div>
            <div className="text-lg">BYPASSED</div>
          </div>
          <div className="border border-green-500 p-3">
            <div className="text-xs mb-1">CONNECTION</div>
            <div className="text-lg">ENCRYPTED</div>
          </div>
          <div className="border border-green-500 p-3">
            <div className="text-xs mb-1">TRACE STATUS</div>
            <div className="text-lg">UNDETECTABLE</div>
          </div>
        </div>

        <div className="text-xs overflow-y-auto h-32 bg-black p-2 font-mono">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="mb-1">
              {`>${getRandomHackingText()}`}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-red-500 animate-pulse text-lg">
          {stage === "complete" ? "ACCESS GRANTED" : "HACKING IN PROGRESS..."}
        </div>
      </div>
    </div>
  )
}

function getRandomHackingText() {
  const texts = [
    "Bypassing firewall...",
    "Injecting SQL payload...",
    "Cracking password hash...",
    "Establishing secure connection...",
    "Extracting user data...",
    "Bypassing 2FA...",
    "Accessing root directory...",
    "Disabling security protocols...",
    "Scanning open ports...",
    "Exploiting vulnerability CVE-2023-1337...",
    "Downloading portfolio assets...",
    "Decrypting protected files...",
    "Establishing backdoor access...",
    "Clearing access logs...",
    "Mapping network topology...",
  ]
  return texts[Math.floor(Math.random() * texts.length)]
}
