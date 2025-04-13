"use client"

import { useState, useEffect } from "react"
import { Filter, Download, Play, Pause, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface Packet {
  id: number
  time: string
  source: string
  destination: string
  protocol: string
  length: number
  info: string
}

export default function Wireshark() {
  const [packets, setPackets] = useState<Packet[]>([])
  const [isCapturing, setIsCapturing] = useState(true)
  const [filter, setFilter] = useState("")
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null)
  const [captureTime, setCaptureTime] = useState(0)

  // Generate random IP address
  const generateIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255,
    )}.${Math.floor(Math.random() * 255)}`
  }

  // Generate random protocol
  const generateProtocol = () => {
    const protocols = ["TCP", "UDP", "HTTP", "DNS", "HTTPS", "ICMP", "ARP", "SSH", "TLS", "FTP"]
    return protocols[Math.floor(Math.random() * protocols.length)]
  }

  // Generate random packet info based on protocol
  const generateInfo = (protocol: string, source: string, destination: string) => {
    switch (protocol) {
      case "TCP":
        return `${Math.floor(Math.random() * 65535)} → ${Math.floor(
          Math.random() * 65535,
        )} [SYN, ACK] Seq=${Math.floor(Math.random() * 1000000)} Ack=${Math.floor(Math.random() * 1000000)}`
      case "UDP":
        return `${Math.floor(Math.random() * 65535)} → ${Math.floor(Math.random() * 65535)} Len=${Math.floor(
          Math.random() * 1000,
        )}`
      case "HTTP":
        const methods = ["GET", "POST", "PUT", "DELETE"]
        const resources = ["/index.html", "/api/data", "/images/logo.png", "/login", "/dashboard"]
        return `${methods[Math.floor(Math.random() * methods.length)]} ${
          resources[Math.floor(Math.random() * resources.length)]
        } HTTP/1.1`
      case "DNS":
        const domains = ["example.com", "google.com", "github.com", "microsoft.com", "apple.com"]
        return `Standard query 0x${Math.floor(Math.random() * 10000).toString(16)} A ${
          domains[Math.floor(Math.random() * domains.length)]
        }`
      case "HTTPS":
        return `Application Data Protocol: TLSv1.2`
      case "ICMP":
        return `Echo (ping) request id=${Math.floor(Math.random() * 10000)}, seq=${Math.floor(
          Math.random() * 100,
        )}, ttl=${Math.floor(Math.random() * 64 + 1)}`
      case "ARP":
        return `Who has ${destination}? Tell ${source}`
      case "SSH":
        return `Encrypted packet len=${Math.floor(Math.random() * 500 + 100)}`
      case "TLS":
        return `Application Data Protocol: TLSv1.3`
      case "FTP":
        const ftpCommands = ["RETR", "STOR", "LIST", "CWD", "PWD", "PASV"]
        return `${ftpCommands[Math.floor(Math.random() * ftpCommands.length)]} command`
      default:
        return "Unknown packet data"
    }
  }

  // Generate a new packet
  const generatePacket = (id: number): Packet => {
    const source = generateIP()
    const destination = generateIP()
    const protocol = generateProtocol()
    return {
      id,
      time: (captureTime + id * 0.05).toFixed(6),
      source,
      destination,
      protocol,
      length: Math.floor(Math.random() * 1460) + 40,
      info: generateInfo(protocol, source, destination),
    }
  }

  // Initialize with some packets
  useEffect(() => {
    const initialPackets = Array.from({ length: 50 }, (_, i) => generatePacket(i))
    setPackets(initialPackets)
  }, [])

  // Add new packets periodically if capturing
  useEffect(() => {
    if (!isCapturing) return

    const interval = setInterval(() => {
      setCaptureTime((prev) => prev + 0.1)
      const newPacket = generatePacket(packets.length)
      setPackets((prev) => [...prev, newPacket])
    }, 1000)

    return () => clearInterval(interval)
  }, [isCapturing, packets.length, captureTime])

  // Filter packets based on search term
  const filteredPackets = filter
    ? packets.filter(
        (packet) =>
          packet.source.includes(filter) ||
          packet.destination.includes(filter) ||
          packet.protocol.toLowerCase().includes(filter.toLowerCase()) ||
          packet.info.toLowerCase().includes(filter.toLowerCase()),
      )
    : packets

  // Get protocol color
  const getProtocolColor = (protocol: string) => {
    switch (protocol) {
      case "TCP":
        return "text-blue-400"
      case "UDP":
        return "text-purple-400"
      case "HTTP":
        return "text-green-400"
      case "HTTPS":
        return "text-green-600"
      case "DNS":
        return "text-yellow-400"
      case "ICMP":
        return "text-red-400"
      case "ARP":
        return "text-orange-400"
      case "SSH":
        return "text-cyan-400"
      case "TLS":
        return "text-emerald-400"
      case "FTP":
        return "text-pink-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 p-2 border-b border-gray-700 flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-1.5 rounded ${isCapturing ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          onClick={() => setIsCapturing(!isCapturing)}
        >
          {isCapturing ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
          onClick={() => {
            setPackets([])
            setCaptureTime(0)
          }}
        >
          <RefreshCw size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
        >
          <Download size={16} />
        </motion.button>
        <div className="flex-1 flex items-center bg-gray-700 rounded px-2">
          <Filter size={14} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Display filter"
            className="bg-transparent border-none outline-none w-full py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Packet list */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="grid grid-cols-[60px_120px_120px_80px_70px_1fr] text-xs font-medium bg-gray-800 border-b border-gray-700">
          <div className="p-2">No.</div>
          <div className="p-2">Time</div>
          <div className="p-2">Source</div>
          <div className="p-2">Destination</div>
          <div className="p-2">Protocol</div>
          <div className="p-2">Info</div>
        </div>
        <div className="flex-1 overflow-auto">
          {filteredPackets.map((packet, index) => (
            <motion.div
              key={packet.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`grid grid-cols-[60px_120px_120px_80px_70px_1fr] text-xs border-b border-gray-800 hover:bg-gray-800 cursor-pointer ${
                selectedPacket?.id === packet.id ? "bg-gray-700" : index % 2 === 0 ? "bg-gray-900" : "bg-gray-850"
              }`}
              onClick={() => setSelectedPacket(packet)}
            >
              <div className="p-2 text-gray-400">{packet.id}</div>
              <div className="p-2 text-gray-400">{packet.time}</div>
              <div className="p-2">{packet.source}</div>
              <div className="p-2">{packet.destination}</div>
              <div className={`p-2 font-medium ${getProtocolColor(packet.protocol)}`}>{packet.protocol}</div>
              <div className="p-2 truncate">{packet.info}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Packet details */}
      {selectedPacket && (
        <div className="h-1/3 border-t border-gray-700 bg-gray-800 overflow-auto">
          <div className="p-3">
            <h3 className="text-sm font-medium mb-2">Packet {selectedPacket.id} Details</h3>
            <div className="space-y-1 text-xs">
              <div className="grid grid-cols-[120px_1fr]">
                <span className="text-gray-400">Time:</span>
                <span>{selectedPacket.time} seconds</span>
              </div>
              <div className="grid grid-cols-[120px_1fr]">
                <span className="text-gray-400">Source:</span>
                <span>{selectedPacket.source}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr]">
                <span className="text-gray-400">Destination:</span>
                <span>{selectedPacket.destination}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr]">
                <span className="text-gray-400">Protocol:</span>
                <span className={getProtocolColor(selectedPacket.protocol)}>{selectedPacket.protocol}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr]">
                <span className="text-gray-400">Length:</span>
                <span>{selectedPacket.length} bytes</span>
              </div>
              <div className="grid grid-cols-[120px_1fr]">
                <span className="text-gray-400">Info:</span>
                <span>{selectedPacket.info}</span>
              </div>

              {/* Hex dump */}
              <div className="mt-4">
                <h4 className="font-medium mb-1">Hex Dump:</h4>
                <div className="font-mono bg-gray-900 p-2 rounded text-xs">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="flex">
                      <span className="text-gray-500 w-16">{(i * 16).toString(16).padStart(4, "0")}</span>
                      <span className="flex-1 space-x-1">
                        {Array.from({ length: 16 }, (_, j) => (
                          <span key={j} className="inline-block w-5">
                            {Math.floor(Math.random() * 256)
                              .toString(16)
                              .padStart(2, "0")}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="bg-gray-800 border-t border-gray-700 p-1 text-xs flex justify-between">
        <div>
          <span className="text-gray-400">Packets: </span>
          <span>{packets.length}</span>
          <span className="text-gray-400 ml-4">Displayed: </span>
          <span>{filteredPackets.length}</span>
        </div>
        <div>
          <span className="text-gray-400">Profile: </span>
          <span>Kali Linux</span>
        </div>
      </div>
    </div>
  )
}
