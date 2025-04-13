"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<{ command: string; output: string }[]>([
    {
      command: "",
      output:
        "Kali Linux Terminal [Version 2023.3]\n(c) 2023 Muhammad Faizan. All rights reserved.\n\nType 'help' for available commands.",
    },
  ])
  const [currentPath, setCurrentPath] = useState("/home/kali")
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
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

    const command = input.trim()
    let output = ""

    // Increment command count
    setCommandCount((prev) => prev + 1)

    // Process commands
    if (command === "help") {
      output = `Available commands:
- help: Show this help message
- ls: List directory contents
- cd [directory]: Change directory
- pwd: Print working directory
- whoami: Display current user
- clear: Clear the terminal
- date: Display current date and time
- ifconfig: Display network configuration
- nmap [options]: Network scanning tool (simulated)
- metasploit: Start Metasploit Framework (simulated)
- copy [text]: Copy text to clipboard
- exit: Close terminal`
    } else if (command === "ls") {
      if (currentPath === "/home/kali") {
        output = "Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos"
      } else if (currentPath === "/home/kali/Desktop") {
        output = "tools  readme.txt  kali-setup.sh"
      } else {
        output = "No files found."
      }
    } else if (command.startsWith("cd ")) {
      const dir = command.split(" ")[1]
      if (dir === "..") {
        if (currentPath !== "/home/kali") {
          setCurrentPath("/home/kali")
          output = `Changed directory to /home/kali`
        } else {
          output = "Permission denied"
        }
      } else if (dir === "Desktop") {
        setCurrentPath("/home/kali/Desktop")
        output = `Changed directory to /home/kali/Desktop`
      } else {
        output = `Directory not found: ${dir}`
      }
    } else if (command === "pwd") {
      output = currentPath
    } else if (command === "whoami") {
      output = "kali"
    } else if (command === "clear") {
      setHistory([])
      setInput("")
      return
    } else if (command === "date") {
      output = new Date().toString()
    } else if (command === "ifconfig") {
      output = `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::216:3eff:fe74:5555  prefixlen 64  scopeid 0x20<link>
        ether 00:16:3e:74:55:55  txqueuelen 1000  (Ethernet)
        RX packets 8756  bytes 1846543 (1.7 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 7543  bytes 1137640 (1.0 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 1433  bytes 123456 (120.5 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1433  bytes 123456 (120.5 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0`
    } else if (command.startsWith("nmap")) {
      output = `Starting Nmap 7.93 ( https://nmap.org ) at ${new Date().toLocaleString()}
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000097s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 0.13 seconds`
    } else if (command === "metasploit" || command === "msfconsole") {
      output = `
                                  ___          ____
                               __/ (_) ___ ___/ / /_ ____ _
                              / _  / // -_) _  / / // /  ' \\
                              \\_,_/_/ \\__/\\_,_/_/\\_,_/_/_/_/


       =[ metasploit v6.3.4-dev                          ]
+ -- --=[ 2275 exploits - 1171 auxiliary - 398 post       ]
+ -- --=[ 864 payloads - 45 encoders - 11 nops            ]
+ -- --=[ 9 evasion                                       ]

Metasploit tip: Use sessions -1 to interact with the last opened session

msf6 > `
    } else if (command.startsWith("copy ")) {
      const textToCopy = command.substring(5)
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          output = `Text copied to clipboard: "${textToCopy}"`
        })
        .catch((err) => {
          output = `Failed to copy text: ${err}`
        })
    } else if (command === "exit") {
      output = "Closing terminal..."
      setTimeout(() => {
        // This would close the terminal window in a real implementation
      }, 500)
    } else {
      output = `Command not found: ${command}. Type "help" for available commands.`
    }

    setHistory([...history, { command: input, output }])
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
    <div
      className="h-full w-full bg-black text-green-400 font-mono p-2 overflow-auto"
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
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
        <div key={index} className="mb-1">
          {item.command && (
            <div className="flex">
              <span className="text-green-500">kali@kali:{currentPath.replace("/home/kali", "~")}$</span>
              <span className="ml-1">{item.command}</span>
            </div>
          )}
          <div className="whitespace-pre-line">{item.output}</div>
        </div>
      ))}

      <form onSubmit={handleCommand} className="flex">
        <span className="text-green-500">kali@kali:{currentPath.replace("/home/kali", "~")}$</span>
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
