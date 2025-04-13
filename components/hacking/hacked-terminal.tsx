"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Typewriter } from "@/components/typewriter"

interface PortfolioSection {
  title: string
  content: string
  isExpanded?: boolean
}

export default function HackedTerminal() {
  const [stage, setStage] = useState<"initializing" | "accessing" | "displaying" | "interactive">("initializing")
  const [currentSection, setCurrentSection] = useState<number>(0)
  const [sections, setSections] = useState<PortfolioSection[]>([
    {
      title: "PERSONAL_INFO",
      content: `
NAME: Muhammad Faizen (Mohammad Faizan)
ALIAS: @faizzyhon
LOCATION: Bahawalpur, Pakistan
OCCUPATION: AI Engineer, Full-Stack Developer, Certified Ethical Hacker
EDUCATION: Computer Science, Artificial Intelligence, Cybersecurity
`,
      isExpanded: true,
    },
    {
      title: "SKILLS",
      content: `
AI & MACHINE LEARNING:
- TensorFlow, PyTorch, LangChain [PROFICIENCY: 90%]
- Computer Vision, NLP [PROFICIENCY: 85%]

WEB DEVELOPMENT:
- Next.js, React, Node.js [PROFICIENCY: 95%]
- TypeScript, Firebase [PROFICIENCY: 90%]

CYBERSECURITY:
- Penetration Testing, Network Security [PROFICIENCY: 88%]
- Web App Security, Cryptography [PROFICIENCY: 85%]

MOBILE & IOT:
- React Native, Flutter [PROFICIENCY: 85%]
- ESP32/Arduino, IoT Protocols [PROFICIENCY: 88%]
`,
      isExpanded: false,
    },
    {
      title: "PROJECTS",
      content: `
1. [CLASSIFIED] Brain Tumor Detection System
   - AI-powered system for detecting and classifying brain tumors from MRI scans
   - Technologies: TensorFlow, Computer Vision, Python

2. [CLASSIFIED] Secure Payment Gateway
   - Stripe-style payment system with advanced security features
   - Technologies: Next.js, TypeScript, Stripe API

3. [CLASSIFIED] Network Vulnerability Scanner
   - Automated security tool for identifying vulnerabilities
   - Technologies: Python, Ethical Hacking, Network Security

4. [CLASSIFIED] IoT pH Monitoring System
   - ESP32-based system for real-time monitoring of pH levels
   - Technologies: ESP32, IoT, Sensors, Real-time Data

5. [CLASSIFIED] AI Travel Assistant
   - Intelligent travel planning tool using NLP
   - Technologies: NLP, LangChain, React, API Integration
`,
      isExpanded: false,
    },
    {
      title: "CONTACT",
      content: `
EMAIL: faizzyhon@example.com
GITHUB: github.com/faizzyhon
LINKEDIN: linkedin.com/in/faizzyhon
LOCATION: Bahawalpur, Pakistan

SECURE COMMUNICATION CHANNEL:
PGP KEY FINGERPRINT: 3A2F 8E1D 6B7C 9D0E 5F4A 2C1B 7D8E 9F0A 1B2C 3D4E
`,
      isExpanded: false,
    },
  ])
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  // Simulate hacking sequence
  useEffect(() => {
    const stages = [
      { stage: "initializing", delay: 2000 },
      { stage: "accessing", delay: 3000 },
      { stage: "displaying", delay: 8000 },
      { stage: "interactive", delay: 0 },
    ]

    let currentIndex = 0
    const timers: NodeJS.Timeout[] = []

    const advanceStage = () => {
      if (currentIndex < stages.length - 1) {
        const nextStage = stages[currentIndex + 1]
        const timer = setTimeout(() => {
          setStage(nextStage.stage as any)
          currentIndex++
          advanceStage()
        }, stages[currentIndex].delay)
        timers.push(timer)
      }
    }

    advanceStage()

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [stage, currentSection, sections])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const command = input.trim().toLowerCase()
    setCommandHistory([...commandHistory, input])

    // Process commands
    if (command === "help") {
      setSections((prev) => [
        ...prev,
        {
          title: "HELP",
          content: `
Available commands:
- help: Show this help message
- ls: List all sections
- cat [section]: Display section content
- clear: Clear the terminal
- exit: Close this terminal
`,
          isExpanded: true,
        },
      ])
    } else if (command === "ls") {
      setSections((prev) => [
        ...prev,
        {
          title: "SECTIONS",
          content: sections.map((s) => s.title).join("\n"),
          isExpanded: true,
        },
      ])
    } else if (command.startsWith("cat ")) {
      const sectionName = command.substring(4).toUpperCase()
      const section = sections.find((s) => s.title === sectionName)

      if (section) {
        setSections((prev) => prev.map((s) => (s.title === sectionName ? { ...s, isExpanded: true } : s)))
      } else {
        setSections((prev) => [
          ...prev,
          {
            title: "ERROR",
            content: `Section not found: ${sectionName}`,
            isExpanded: true,
          },
        ])
      }
    } else if (command === "clear") {
      setSections([])
    } else if (command === "exit") {
      // This would close the terminal in a real implementation
      setSections((prev) => [
        ...prev,
        {
          title: "SYSTEM",
          content: "Closing terminal...",
          isExpanded: true,
        },
      ])
    } else {
      setSections((prev) => [
        ...prev,
        {
          title: "ERROR",
          content: `Command not found: ${command}. Type "help" for available commands.`,
          isExpanded: true,
        },
      ])
    }

    setInput("")
  }

  // Render different stages of the hacking sequence
  const renderContent = () => {
    switch (stage) {
      case "initializing":
        return (
          <div className="text-green-500 animate-pulse">
            <Typewriter text="INITIALIZING HACK SEQUENCE..." speed={10} />
          </div>
        )

      case "accessing":
        return (
          <div>
            <div className="text-green-500 mb-2">INITIALIZING HACK SEQUENCE... [COMPLETE]</div>
            <div className="text-green-500 animate-pulse">
              <Typewriter text="ACCESSING PORTFOLIO DATABASE..." speed={10} />
            </div>
            <div className="mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="text-gray-500 text-sm">
                  {getRandomHackingCommand()}
                </div>
              ))}
            </div>
          </div>
        )

      case "displaying":
        return (
          <div>
            <div className="text-green-500 mb-1">INITIALIZING HACK SEQUENCE... [COMPLETE]</div>
            <div className="text-green-500 mb-1">ACCESSING PORTFOLIO DATABASE... [COMPLETE]</div>
            <div className="text-red-500 mb-3 text-xl font-bold animate-pulse">
              <Typewriter text="!!! CONFIDENTIAL DATA EXTRACTED !!!" speed={20} />
            </div>

            {sections.slice(0, currentSection + 1).map((section, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-2">[CLASSIFIED]</span>
                  <span className="text-green-500 font-bold">{section.title}</span>
                </div>
                {section.isExpanded && (
                  <div className="ml-4 text-green-400 whitespace-pre-line">
                    {index === currentSection ? <Typewriter text={section.content} speed={5} /> : section.content}
                  </div>
                )}
              </div>
            ))}

            {/* Auto advance to next section */}
            {currentSection < sections.length - 1 && (
              <div className="text-gray-500 text-sm animate-pulse">
                Loading next section...
                {setTimeout(() => setCurrentSection((prev) => prev + 1), 4000) && null}
              </div>
            )}
          </div>
        )

      case "interactive":
        return (
          <div>
            <div className="text-red-500 mb-3 text-xl font-bold">!!! PORTFOLIO DATA EXTRACTION COMPLETE !!!</div>

            <div className="text-green-500 mb-4">
              Interactive terminal mode activated. Type <span className="text-yellow-500">help</span> for available
              commands.
            </div>

            {sections.map((section, index) => (
              <div key={index} className="mb-4">
                <div
                  className="flex items-center cursor-pointer hover:text-yellow-500"
                  onClick={() => {
                    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, isExpanded: !s.isExpanded } : s)))
                  }}
                >
                  <span className="text-yellow-500 mr-2">[{section.isExpanded ? "-" : "+"}]</span>
                  <span className="text-green-500 font-bold">{section.title}</span>
                </div>
                {section.isExpanded && <div className="ml-4 text-green-400 whitespace-pre-line">{section.content}</div>}
              </div>
            ))}

            {/* Command history */}
            {commandHistory.map((cmd, index) => (
              <div key={index} className="flex">
                <span className="text-green-500">hacker@kali:~$</span>
                <span className="ml-1 text-white">{cmd}</span>
              </div>
            ))}

            {/* Command input */}
            <form onSubmit={handleCommand} className="flex mt-2">
              <span className="text-green-500">hacker@kali:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white ml-1"
                autoFocus
              />
            </form>
          </div>
        )
    }
  }

  return (
    <div
      ref={terminalRef}
      className="h-full w-full bg-black text-green-400 font-mono p-4 overflow-auto"
      onClick={() => document.querySelector("input")?.focus()}
    >
      {renderContent()}
    </div>
  )
}

function getRandomHackingCommand() {
  const commands = [
    "sudo nmap -sS -sV -O -p- 192.168.1.1",
    "hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.1",
    "sqlmap -u http://target.com/page.php?id=1 --dbs",
    "dirb http://target.com/ /usr/share/dirb/wordlists/common.txt",
    "john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt",
    "aircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap",
    "msfconsole -q -x 'use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_tcp; set LHOST 192.168.1.100; set LPORT 4444; run'",
    "hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt",
    "ssh root@192.168.1.1 -p 2222",
    "curl -s -X POST -d 'username=admin&password=password' http://target.com/login.php",
  ]
  return commands[Math.floor(Math.random() * commands.length)]
}
