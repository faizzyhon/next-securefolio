"use client"

import { useState, useEffect } from "react"
import { Shield, Power, Globe, ChevronDown, ChevronUp, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface VPNServer {
  id: string
  country: string
  city: string
  ip: string
  ping: number
  load: number
  favorite: boolean
}

export default function VPNApp() {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [selectedServer, setSelectedServer] = useState<VPNServer | null>(null)
  const [showServerList, setShowServerList] = useState(false)
  const [connectionTime, setConnectionTime] = useState(0)
  const [ipInfo, setIpInfo] = useState({
    ip: "192.168.1.1",
    location: "Unknown",
    isp: "Unknown",
  })
  const [vpnIpInfo, setVpnIpInfo] = useState({
    ip: "",
    location: "",
    isp: "",
  })

  // Sample server list
  const [servers, setServers] = useState<VPNServer[]>([
    { id: "us1", country: "United States", city: "New York", ip: "103.25.58.1", ping: 45, load: 65, favorite: true },
    { id: "uk1", country: "United Kingdom", city: "London", ip: "185.65.134.78", ping: 78, load: 42, favorite: true },
    { id: "jp1", country: "Japan", city: "Tokyo", ip: "45.76.98.118", ping: 120, load: 30, favorite: false },
    { id: "de1", country: "Germany", city: "Frankfurt", ip: "89.163.252.230", ping: 62, load: 55, favorite: false },
    { id: "sg1", country: "Singapore", city: "Singapore", ip: "128.199.215.67", ping: 110, load: 25, favorite: true },
    { id: "ca1", country: "Canada", city: "Toronto", ip: "159.203.44.95", ping: 58, load: 48, favorite: false },
    { id: "fr1", country: "France", city: "Paris", ip: "51.15.80.14", ping: 70, load: 38, favorite: false },
    { id: "nl1", country: "Netherlands", city: "Amsterdam", ip: "95.179.136.14", ping: 65, load: 72, favorite: true },
  ])

  // Set initial selected server
  useEffect(() => {
    if (servers.length > 0 && !selectedServer) {
      // Select the server with the lowest ping
      const bestServer = [...servers].sort((a, b) => a.ping - b.ping)[0]
      setSelectedServer(bestServer)
    }
  }, [servers, selectedServer])

  // Handle connection timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (connected) {
      interval = setInterval(() => {
        setConnectionTime((prev) => prev + 1)
      }, 1000)
    } else {
      setConnectionTime(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [connected])

  // Format time
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle connection
  const toggleConnection = () => {
    if (connected) {
      setConnected(false)
      setVpnIpInfo({
        ip: "",
        location: "",
        isp: "",
      })
    } else {
      setConnecting(true)

      // Simulate connection delay
      setTimeout(() => {
        setConnected(true)
        setConnecting(false)

        // Set VPN IP info based on selected server
        if (selectedServer) {
          setVpnIpInfo({
            ip: selectedServer.ip,
            location: `${selectedServer.city}, ${selectedServer.country}`,
            isp: "Kali Secure VPN",
          })
        }
      }, 2000)
    }
  }

  // Toggle favorite status
  const toggleFavorite = (serverId: string) => {
    setServers(servers.map((server) => (server.id === serverId ? { ...server, favorite: !server.favorite } : server)))
  }

  // Get color based on ping or load value
  const getStatusColor = (value: number, isLoad = false) => {
    const thresholds = isLoad ? [30, 70] : [50, 100]
    if (value <= thresholds[0]) return "text-green-500"
    if (value <= thresholds[1]) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-green-500 mr-2" />
            <h1 className="text-xl font-bold">Kali Secure VPN</h1>
          </div>
          <div className="text-xs text-gray-400">Version 2.3.1</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Connection status */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <motion.div
              className={`w-32 h-32 rounded-full flex items-center justify-center ${
                connected ? "bg-green-900/50" : connecting ? "bg-yellow-900/50" : "bg-gray-700"
              }`}
              animate={{
                scale: connected || connecting ? [1, 1.05, 1] : 1,
              }}
              transition={{ repeat: connected || connecting ? Number.POSITIVE_INFINITY : 0, duration: 2 }}
            >
              <motion.div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  connected ? "bg-green-700" : connecting ? "bg-yellow-600" : "bg-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connecting ? undefined : toggleConnection}
              >
                <Power className="h-10 w-10" />
              </motion.div>
            </motion.div>
          </div>

          <div className="mb-2">
            <div className="text-lg font-medium">
              {connected ? "Connected" : connecting ? "Connecting..." : "Not Connected"}
            </div>
            {connected && <div className="text-sm text-gray-400">Connected for {formatTime(connectionTime)}</div>}
          </div>

          {connected && (
            <div className="flex justify-center">
              <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Your connection is secure
              </div>
            </div>
          )}
        </div>

        {/* Server selection */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowServerList(!showServerList)}
          >
            <div className="font-medium">VPN Server</div>
            {showServerList ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {selectedServer && (
            <div className="mt-2 p-3 bg-gray-700 rounded-lg flex justify-between items-center">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-400" />
                <div>
                  <div className="font-medium">
                    {selectedServer.city}, {selectedServer.country}
                  </div>
                  <div className="text-xs text-gray-400">
                    Ping: <span className={getStatusColor(selectedServer.ping)}>{selectedServer.ping} ms</span> • Load:{" "}
                    <span className={getStatusColor(selectedServer.load, true)}>{selectedServer.load}%</span>
                  </div>
                </div>
              </div>
              <div>
                {connected ? (
                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">Active</span>
                ) : (
                  <button
                    className="text-xs bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleConnection()
                    }}
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          )}

          <AnimatePresence>
            {showServerList && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="max-h-64 overflow-y-auto">
                  {servers.map((server) => (
                    <div
                      key={server.id}
                      className={`p-3 border-b border-gray-700 flex justify-between items-center hover:bg-gray-700 cursor-pointer ${
                        selectedServer?.id === server.id ? "bg-gray-700" : ""
                      }`}
                      onClick={() => {
                        setSelectedServer(server)
                        if (connected) {
                          setConnected(false)
                          setTimeout(() => {
                            setConnecting(true)
                            setTimeout(() => {
                              setConnected(true)
                              setConnecting(false)
                              setVpnIpInfo({
                                ip: server.ip,
                                location: `${server.city}, ${server.country}`,
                                isp: "Kali Secure VPN",
                              })
                            }, 1500)
                          }, 500)
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <div className="mr-2">
                          {server.favorite ? (
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-yellow-500"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(server.id)
                              }}
                            >
                              ★
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-500"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(server.id)
                              }}
                            >
                              ☆
                            </motion.button>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {server.city}, {server.country}
                          </div>
                          <div className="text-xs text-gray-400">
                            Ping: <span className={getStatusColor(server.ping)}>{server.ping} ms</span> • Load:{" "}
                            <span className={getStatusColor(server.load, true)}>{server.load}%</span>
                          </div>
                        </div>
                      </div>
                      {selectedServer?.id === server.id && <Check className="h-4 w-4 text-green-500" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* IP Information */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="font-medium mb-3">Connection Information</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Your Real IP</div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{ipInfo.ip}</div>
                  <div className="text-xs text-gray-400">{ipInfo.location}</div>
                  <div className="text-xs text-gray-400">{ipInfo.isp}</div>
                </div>
                {connected && (
                  <div className="bg-red-900/30 text-red-400 p-1 rounded text-xs flex items-center">
                    <X className="h-3 w-3 mr-1" />
                    Exposed
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Your VPN IP</div>
              {connected ? (
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{vpnIpInfo.ip}</div>
                    <div className="text-xs text-gray-400">{vpnIpInfo.location}</div>
                    <div className="text-xs text-gray-400">{vpnIpInfo.isp}</div>
                  </div>
                  <div className="bg-green-900/30 text-green-400 p-1 rounded text-xs flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Protected
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-12 text-gray-500">Not connected to VPN</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-gray-800 p-2 border-t border-gray-700 flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${connected ? "bg-green-500" : "bg-red-500"}`}></div>
          <span>{connected ? "Protected" : "Not Protected"}</span>
        </div>
        <div>Created by Muhammad Faizan</div>
      </div>
    </div>
  )
}
