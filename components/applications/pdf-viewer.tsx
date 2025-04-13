"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download, Search } from "lucide-react"
import { motion } from "framer-motion"

export default function PDFViewerApp() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10) // Simulated total pages
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [searchText, setSearchText] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simulated PDF document
  const pdfContent = [
    {
      title: "Kali Linux Security Guide",
      content: "This is a comprehensive guide to Kali Linux security tools and techniques.",
    },
    {
      title: "Chapter 1: Introduction",
      content:
        "Kali Linux is a Debian-derived Linux distribution designed for digital forensics and penetration testing.",
    },
    {
      title: "Chapter 2: Installation",
      content: "This chapter covers various installation methods for Kali Linux.",
    },
    {
      title: "Chapter 3: Basic Tools",
      content: "Learn about the basic tools included in Kali Linux for security testing.",
    },
    {
      title: "Chapter 4: Network Scanning",
      content: "This chapter covers network scanning tools like Nmap, Wireshark, and more.",
    },
    {
      title: "Chapter 5: Web Application Testing",
      content: "Learn how to test web applications for vulnerabilities using Kali Linux tools.",
    },
    {
      title: "Chapter 6: Password Attacks",
      content: "This chapter covers various password cracking tools and techniques.",
    },
    {
      title: "Chapter 7: Wireless Attacks",
      content: "Learn about tools for testing wireless network security.",
    },
    {
      title: "Chapter 8: Exploitation Tools",
      content: "This chapter covers Metasploit and other exploitation frameworks.",
    },
    {
      title: "Chapter 9: Maintaining Access",
      content: "Learn about post-exploitation techniques and tools.",
    },
  ]

  // Handle page navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Handle zoom
  const handleZoom = (factor: number) => {
    const newZoom = zoom + factor
    if (newZoom >= 0.5 && newZoom <= 3) {
      setZoom(newZoom)
    }
  }

  // Handle rotation
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  // Handle search
  const handleSearch = () => {
    if (!searchText) return

    // Simulate search functionality
    const foundIndex = pdfContent.findIndex(
      (page) =>
        page.title.toLowerCase().includes(searchText.toLowerCase()) ||
        page.content.toLowerCase().includes(searchText.toLowerCase()),
    )

    if (foundIndex !== -1) {
      setCurrentPage(foundIndex + 1)
    }
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 p-2 border-b border-gray-700 flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft size={16} />
          </motion.button>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => goToPage(Number.parseInt(e.target.value) || 1)}
              className="w-12 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-center text-sm"
            />
            <span className="text-sm">/ {totalPages}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>

        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
            onClick={() => handleZoom(-0.1)}
          >
            <ZoomOut size={16} />
          </motion.button>
          <span className="text-sm">{Math.round(zoom * 100)}%</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
            onClick={() => handleZoom(0.1)}
          >
            <ZoomIn size={16} />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
          onClick={handleRotate}
        >
          <RotateCw size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
          onClick={() => {}}
        >
          <Download size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-1.5 rounded ${isSearchOpen ? "bg-blue-700" : "bg-gray-700 hover:bg-gray-600"}`}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search size={16} />
        </motion.button>

        {isSearchOpen && (
          <div className="flex items-center ml-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-40"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-1 p-1 rounded bg-blue-700 hover:bg-blue-600"
              onClick={handleSearch}
            >
              <Search size={14} />
            </motion.button>
          </div>
        )}
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-800 flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
            <p>Loading PDF...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">
            <p className="text-xl mb-2">Error loading PDF</p>
            <p>{error}</p>
          </div>
        ) : (
          <div
            className="bg-white text-black m-4 p-8 shadow-lg overflow-auto max-w-3xl w-full"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: "center center",
              transition: "transform 0.2s ease",
            }}
          >
            {currentPage > 0 && currentPage <= pdfContent.length && (
              <div className="min-h-[842px] flex flex-col">
                <h1 className="text-2xl font-bold mb-6">{pdfContent[currentPage - 1].title}</h1>
                <p className="text-lg leading-relaxed">{pdfContent[currentPage - 1].content}</p>

                {/* Simulated PDF content */}
                <div className="flex-1 flex flex-col justify-center items-center mt-8">
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center mb-4">
                    <span className="text-gray-400">Sample PDF content</span>
                  </div>
                  <div className="w-full h-32 bg-gray-100 flex items-center justify-center mb-4">
                    <span className="text-gray-400">Figure {currentPage}.1</span>
                  </div>
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Sample PDF content</span>
                  </div>
                </div>

                <div className="mt-8 text-right text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="bg-gray-800 text-xs p-1 flex justify-between border-t border-gray-700">
        <div>Kali Linux Security Guide.pdf</div>
        <div>Created by Muhammad Faizan</div>
      </div>
    </div>
  )
}
