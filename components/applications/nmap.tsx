"use client"

import { useState } from "react"
import { Play, AlertCircle, CheckCircle, Clock, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface ScanResult {
  ip: string
  hostname: string
  ports: {
    port: number
    protocol: string
    service: string
    state: string
    version?: string
  }[]
  osMatch?: string
  scanTime: number
}

export default function Nmap() {
  const [targetIP, setTargetIP] = useState("192.168.1.1")
  const [scanType, setScanType] = useState("basic")
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const [scanOutput, setScanOutput] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  // Generate random port information
  const generatePorts = (count: number, includeVersions = false) => {
    const commonPorts = [
      { port: 21, protocol: "tcp", service: "ftp" },
      { port: 22, protocol: "tcp", service: "ssh" },
      { port: 23, protocol: "tcp", service: "telnet" },
      { port: 25, protocol: "tcp", service: "smtp" },
      { port: 53, protocol: "tcp", service: "domain" },
      { port: 80, protocol: "tcp", service: "http" },
      { port: 110, protocol: "tcp", service: "pop3" },
      { port: 111, protocol: "tcp", service: "rpcbind" },
      { port: 135, protocol: "tcp", service: "msrpc" },
      { port: 139, protocol: "tcp", service: "netbios-ssn" },
      { port: 143, protocol: "tcp", service: "imap" },
      { port: 443, protocol: "tcp", service: "https" },
      { port: 445, protocol: "tcp", service: "microsoft-ds" },
      { port: 993, protocol: "tcp", service: "imaps" },
      { port: 995, protocol: "tcp", service: "pop3s" },
      { port: 1723, protocol: "tcp", service: "pptp" },
      { port: 3306, protocol: "tcp", service: "mysql" },
      { port: 3389, protocol: "tcp", service: "ms-wbt-server" },
      { port: 5900, protocol: "tcp", service: "vnc" },
      { port: 8080, protocol: "tcp", service: "http-proxy" },
    ]

    // Randomly select ports from common ports
    const selectedPorts = []
    const usedIndexes = new Set()

    for (let i = 0; i < Math.min(count, commonPorts.length); i++) {
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * commonPorts.length)
      } while (usedIndexes.has(randomIndex))

      usedIndexes.add(randomIndex)
      const port = { ...commonPorts[randomIndex] }

      // Randomly decide if port is open or filtered
      port.state = Math.random() > 0.3 ? "open" : "filtered"

      // Add version info for intensive scans
      if (includeVersions && port.state === "open") {
        switch (port.service) {
          case "ssh":
            port.version = "OpenSSH 8.2p1 Ubuntu 4ubuntu0.5"
            break
          case "http":
            port.version = "Apache httpd 2.4.41"
            break
          case "https":
            port.version = "nginx 1.18.0"
            break
          case "ftp":
            port.version = "vsftpd 3.0.3"
            break
          case "mysql":
            port.version = "MySQL 5.7.38"
            break
          default:
            port.version = "unknown"
        }
      }

      selectedPorts.push(port)
    }

    return selectedPorts
  }

  // Generate OS match for intensive scans
  const generateOSMatch = () => {
    const osList = [
      "Linux 5.4 - 5.6",
      "Ubuntu 20.04 LTS",
      "Windows 10 21H2",
      "Windows Server 2019",
      "FreeBSD 13.0",
      "macOS 12.0.1",
    ]
    return osList[Math.floor(Math.random() * osList.length)]
  }

  // Start scan
  const startScan = () => {
    if (!targetIP.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
      setError("Invalid IP address format")
      return
    }

    setError(null)
    setIsScanning(true)
    setScanProgress(0)
    setScanOutput([`Starting Nmap scan against ${targetIP}...`])

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + Math.random() * 5
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 200)

    // Add scan output messages
    const messageInterval = setInterval(() => {
      setScanOutput((prev) => {
        if (prev.length >= 15) return prev

        const messages = [
          `Scanning ${targetIP} [${scanType} scan]`,
          "Initiating ARP Ping Scan",
          "Scanning 1 IP address (1 host up)",
          `Initiating ${scanType === "intensive" ? "Service Version" : "SYN Stealth"} Scan`,
          "Discovered open port 80/tcp on 192.168.1.1",
          "Discovered open port 443/tcp on 192.168.1.1",
          "Discovered open port 22/tcp on 192.168.1.1",
          scanType === "intensive" ? "Initiating OS detection" : null,
          scanType === "intensive" ? "OS detection performed" : null,
        ].filter(Boolean) as string[]

        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        if (prev.includes(randomMessage)) return prev
        return [...prev, randomMessage]
      })
    }, 800)

    // Complete scan after delay
    setTimeout(
      () => {
        clearInterval(interval)
        clearInterval(messageInterval)
        setScanProgress(100)

        // Generate scan results based on scan type
        const portCount = scanType === "basic" ? 5 : scanType === "default" ? 10 : 15
        const includeVersions = scanType === "intensive"

        const result: ScanResult = {
          ip: targetIP,
          hostname: `host-${targetIP.replace(/\./g, "-")}.local`,
          ports: generatePorts(portCount, includeVersions),
          scanTime: Math.floor(Math.random() * 10) + 5,
        }

        if (includeVersions) {
          result.osMatch = generateOSMatch()
        }

        setScanResults([result, ...scanResults])
        setScanOutput((prev) => [
          ...prev,
          `Nmap scan report for ${result.hostname} (${result.ip})`,
          `${result.ports.length} ports scanned, ${result.ports.filter((p) => p.state === "open").length} ports open`,
          `Scan completed in ${result.scanTime} seconds`,
        ])

        setIsScanning(false)
      },
      5000 + Math.random() * 5000,
    )
  }

  return (
    <div className="h-full w-full flex flex-col bg-black text-green-400 font-mono overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-900 p-3 border-b border-gray-800">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-20">Target:</label>
            <input
              type="text"
              value={targetIP}
              onChange={(e) => setTargetIP(e.target.value)}
              className="flex-1 bg-black border border-gray-700 rounded px-2 py-1 text-sm"
              placeholder="IP address"
              disabled={isScanning}
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm w-20">Scan Type:</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="flex-1 bg-black border border-gray-700 rounded px-2 py-1 text-sm"
              disabled={isScanning}
            >
              <option value="basic">Basic (-sS)</option>
              <option value="default">Default (-sS -sV)</option>
              <option value="intensive">Intensive (-sS -sV -O -A)</option>
            </select>
          </div>

          <div className="flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1 rounded flex items-center space-x-1 ${
                isScanning ? "bg-red-900 hover:bg-red-800" : "bg-green-900 hover:bg-green-800"
              }`}
              onClick={isScanning ? () => {} : startScan}
              disabled={isScanning}
            >
              {isScanning ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>Start Scan</span>
                </>
              )}
            </motion.button>

            {error && (
              <div className="flex items-center text-red-500 text-xs">
                <AlertCircle size={12} className="mr-1" />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar (only visible when scanning) */}
      {isScanning && (
        <div className="h-1 bg-gray-800">
          <div
            className="h-full bg-green-600 transition-all duration-300 ease-out"
            style={{ width: `${scanProgress}%` }}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Scan output */}
        <div className="flex-1 overflow-auto p-3 bg-black">
          <h3 className="text-sm font-bold mb-2">Scan Output:</h3>
          <div className="text-xs space-y-1">
            {scanOutput.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.div>
            ))}
            {isScanning && (
              <div className="animate-pulse">
                <span className="inline-block w-2 h-4 bg-green-500 ml-1"></span>
              </div>
            )}
          </div>
        </div>

        {/* Scan results */}
        <div className="flex-1 overflow-auto border-t md:border-t-0 md:border-l border-gray-800 bg-gray-900">
          <div className="p-3">
            <h3 className="text-sm font-bold mb-2">Scan Results:</h3>

            {scanResults.length === 0 ? (
              <div className="text-gray-500 text-xs italic">No scan results yet</div>
            ) : (
              <div className="space-y-4">
                {scanResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-800 rounded bg-black"
                  >
                    <div className="p-2 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
                      <div>
                        <span className="font-bold">{result.ip}</span>
                        <span className="text-gray-500 text-xs ml-2">({result.hostname})</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        <span>{result.scanTime}s</span>
                      </div>
                    </div>

                    <div className="p-2 text-xs">
                      {result.osMatch && (
                        <div className="mb-2">
                          <span className="text-gray-500">OS:</span> {result.osMatch}
                        </div>
                      )}

                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-500 border-b border-gray-800">
                            <th className="py-1">Port</th>
                            <th className="py-1">State</th>
                            <th className="py-1">Service</th>
                            {scanType !== "basic" && <th className="py-1">Version</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {result.ports.map((port, i) => (
                            <tr key={i} className="border-b border-gray-900">
                              <td className="py-1">
                                {port.port}/{port.protocol}
                              </td>
                              <td className="py-1">
                                <span
                                  className={
                                    port.state === "open"
                                      ? "text-green-500 flex items-center"
                                      : "text-yellow-500 flex items-center"
                                  }
                                >
                                  {port.state === "open" ? (
                                    <CheckCircle size={10} className="mr-1" />
                                  ) : (
                                    <AlertCircle size={10} className="mr-1" />
                                  )}
                                  {port.state}
                                </span>
                              </td>
                              <td className="py-1">{port.service}</td>
                              {scanType !== "basic" && <td className="py-1">{port.version || "-"}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-gray-900 border-t border-gray-800 p-1 text-xs flex justify-between">
        <div>
          <span className="text-gray-500">Status: </span>
          <span>{isScanning ? "Scanning..." : "Ready"}</span>
        </div>
        <div>
          <span className="text-gray-500">Results: </span>
          <span>{scanResults.length}</span>
        </div>
      </div>
    </div>
  )
}
