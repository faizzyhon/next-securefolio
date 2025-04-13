"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Typewriter } from "@/components/typewriter"

interface TerminalProps {
  setActiveSection: (section: string) => void
  triggerHack: () => void
}

interface CommandHistory {
  command: string
  response: string
}

export default function Terminal({ setActiveSection, triggerHack }: TerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      response: 'Welcome to Muhammad Faizen\'s Portfolio Terminal\nType "help" to see available commands.',
    },
  ])
  const [currentPath, setCurrentPath] = useState("~")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [hackTriggered, setHackTriggered] = useState(false)
  const [commandCount, setCommandCount] = useState(0)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
    inputRef.current?.focus()
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const command = input.trim().toLowerCase()
    let response = ""

    // Increment command count
    setCommandCount((prev) => prev + 1)

    // Check if we should trigger the hack animation
    // Trigger after 3 commands or if specific "hack" commands are used
    if (
      (commandCount >= 2 && !hackTriggered) ||
      command.includes("hack") ||
      command.includes("exploit") ||
      command.includes("breach")
    ) {
      setHackTriggered(true)
      triggerHack()
    }

    // Process commands
    if (command === "help") {
      response = `Available commands:
- help: Show this help message
- about: Display information about me
- skills: List my technical skills
- projects: View my projects
- contact: Show contact information
- clear: Clear the terminal
- ls: List available sections
- cd [section]: Navigate to a section
- copy [text]: Copy text to clipboard
- whoami: Display current user`
    } else if (command === "about") {
      setActiveSection("about")
      response = "Loading about section..."
    } else if (command === "skills") {
      setActiveSection("skills")
      response = "Loading skills section..."
    } else if (command === "projects") {
      setActiveSection("projects")
      response = "Loading projects section..."
    } else if (command === "contact") {
      setActiveSection("contact")
      response = "Loading contact section..."
    } else if (command === "clear") {
      setHistory([])
      setInput("")
      return
    } else if (command === "ls") {
      response = "about/  skills/  projects/  contact/"
    } else if (command.startsWith("cd ")) {
      const section = command.split(" ")[1]
      if (["about", "skills", "projects", "contact"].includes(section)) {
        setActiveSection(section)
        setCurrentPath(`~/${section}`)
        response = `Changed directory to ${section}`
      } else {
        response = `Directory not found: ${section}`
      }
    } else if (command.startsWith("copy ")) {
      const textToCopy = command.substring(5)
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          response = `Text copied to clipboard: "${textToCopy}"`
        })
        .catch((err) => {
          response = `Failed to copy text: ${err}`
        })
    } else if (command === "whoami") {
      response = "Muhammad Faizen (Mohammad Faizan) - AI Engineer, Full-Stack Developer, and Certified Ethical Hacker"
    } else if (command === "date") {
      response = new Date().toString()
    } else if (command === "pwd") {
      response = `/home/faizzyhon/${currentPath}`
    } else {
      response = `Command not found: ${command}. Type "help" for available commands.`
    }

    setHistory([...history, { command: input, response }])
    setInput("")
  }

  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInput((prev) => prev + text)
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err)
    }
  }

  return (
    <div className="bg-black border border-green-700 rounded-md p-4 h-[60vh] overflow-auto" ref={terminalRef}>
      <div className="flex justify-between mb-2">
        <span className="text-green-500">Terminal</span>
        <div className="flex space-x-2">
          <button
            onClick={handlePaste}
            className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded hover:bg-green-900/50"
          >
            Paste
          </button>
          <button
            onClick={() => {
              if (input) {
                navigator.clipboard.writeText(input)
              }
            }}
            className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded hover:bg-green-900/50"
          >
            Copy
          </button>
        </div>
      </div>

      {history.map((item, index) => (
        <div key={index} className="mb-2">
          {item.command && (
            <div className="flex">
              <span className="text-green-500">faizzyhon@kali:{currentPath}# </span>
              <span className="ml-1">{item.command}</span>
            </div>
          )}
          <div className="text-green-400 whitespace-pre-line">
            <Typewriter text={item.response} speed={5} />
          </div>
        </div>
      ))}

      <form onSubmit={handleCommand} className="flex mt-2">
        <span className="text-green-500">faizzyhon@kali:{currentPath}# </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-green-400 ml-1"
          autoFocus
        />
      </form>
    </div>
  )
}
