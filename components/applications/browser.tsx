"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { RefreshCw, ArrowLeft, ArrowRight, Home, X, Plus, Search, Loader2 } from "lucide-react"
import PortfolioPage from "@/components/portfolio/portfolio-page"

interface Tab {
  id: string
  title: string
  url: string
  favicon: string
}

export default function Browser() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "tab-1",
      title: "Muhammad Faizen - Portfolio",
      url: "https://faizzyhon.dev",
      favicon: "/icons/app.svg",
    },
  ])
  const [activeTab, setActiveTab] = useState("tab-1")
  const [url, setUrl] = useState("https://faizzyhon.dev")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentContent, setCurrentContent] = useState<"portfolio" | "google" | "search" | "screenshot">("portfolio")
  const inputRef = useRef<HTMLInputElement>(null)
  const [screenshotData, setScreenshotData] = useState<{ screenshot: string; title: string; favicon: string } | null>(
    null,
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab)
    if (activeTabData) {
      setUrl(activeTabData.url)

      if (activeTabData.url.includes("faizzyhon.dev")) {
        setCurrentContent("portfolio")
      } else if (activeTabData.url.includes("google.com") && !activeTabData.url.includes("search")) {
        setCurrentContent("google")
      } else if (activeTabData.url.includes("google.com/search")) {
        setCurrentContent("search")
        const queryMatch = activeTabData.url.match(/[?&]q=([^&]+)/)
        if (queryMatch) {
          setSearchQuery(decodeURIComponent(queryMatch[1]))
        }
      } else {
        // For real websites, use the screenshot API
        setCurrentContent("screenshot")
        fetchWebsiteScreenshot(activeTabData.url)
      }
    }
  }, [activeTab, tabs])

  const fetchWebsiteScreenshot = async (websiteUrl: string) => {
    if (!websiteUrl.startsWith("http")) {
      websiteUrl = `https://${websiteUrl}`
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: websiteUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch screenshot")
      }

      const data = await response.json()
      setScreenshotData(data)
    } catch (error) {
      console.error("Error fetching screenshot:", error)
      setError(error instanceof Error ? error.message : "Failed to load website")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    let newUrl = url
    if (!url.startsWith("http")) {
      newUrl = `https://${url}`
    }

    // Update the current tab
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === activeTab) {
        let title = url
        // Extract domain for title
        try {
          const domain = new URL(newUrl).hostname.replace("www.", "")
          title = domain.charAt(0).toUpperCase() + domain.slice(1)
        } catch (e) {
          title = newUrl
        }

        return {
          ...tab,
          url: newUrl,
          title,
        }
      }
      return tab
    })

    setTabs(updatedTabs)

    if (newUrl.includes("faizzyhon.dev")) {
      setCurrentContent("portfolio")
      setIsLoading(false)
    } else {
      // For real websites, use the screenshot API
      setCurrentContent("screenshot")
      fetchWebsiteScreenshot(newUrl)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
    setUrl(searchUrl)

    // Update the current tab
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === activeTab) {
        return {
          ...tab,
          url: searchUrl,
          title: `${searchQuery} - Google Search`,
        }
      }
      return tab
    })

    setTabs(updatedTabs)
    setCurrentContent("screenshot")
    fetchWebsiteScreenshot(searchUrl)
  }

  const addNewTab = () => {
    const newTabId = `tab-${Date.now()}`
    setTabs([
      ...tabs,
      {
        id: newTabId,
        title: "New Tab",
        url: "https://www.google.com",
        favicon: "/icons/google-favicon.svg",
      },
    ])
    setActiveTab(newTabId)
    setUrl("https://www.google.com")
    setCurrentContent("google")
    setSearchQuery("")
  }

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (tabs.length === 1) {
      // Don't close the last tab, reset it instead
      setTabs([
        {
          id: tabId,
          title: "Muhammad Faizen - Portfolio",
          url: "https://faizzyhon.dev",
          favicon: "/icons/app.svg",
        },
      ])
      setUrl("https://faizzyhon.dev")
      setCurrentContent("portfolio")
      setSearchQuery("")
      return
    }

    const newTabs = tabs.filter((tab) => tab.id !== tabId)
    setTabs(newTabs)

    if (tabId === activeTab) {
      // Set the first tab as active if we closed the active tab
      setActiveTab(newTabs[0].id)
    }
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-100 text-black">
      {/* Browser chrome */}
      <div className="bg-gray-200 border-b border-gray-300">
        {/* Tabs */}
        <div className="flex items-center h-8 bg-gray-300 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center max-w-[200px] h-full px-3 border-r border-gray-400 cursor-pointer ${
                activeTab === tab.id ? "bg-gray-100" : "bg-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <img src={tab.favicon || "/placeholder.svg"} alt="" className="w-3 h-3 mr-2" />
              <span className="truncate text-xs">{tab.title}</span>
              <button className="ml-2 p-0.5 rounded-full hover:bg-gray-300" onClick={(e) => closeTab(tab.id, e)}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button className="p-1 hover:bg-gray-300 rounded-full ml-1" onClick={addNewTab}>
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation bar */}
        <div className="flex items-center p-2 space-x-2">
          <button
            className="p-1 rounded-full hover:bg-gray-300"
            onClick={() => {
              // Back functionality would go here
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-300"
            onClick={() => {
              // Forward functionality would go here
            }}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-300"
            onClick={() => {
              if (currentContent === "screenshot") {
                fetchWebsiteScreenshot(url)
              } else {
                setUrl("https://www.google.com")
                handleNavigate(new Event("submit") as unknown as React.FormEvent)
              }
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-300"
            onClick={() => {
              setUrl("https://www.google.com")
              handleNavigate(new Event("submit") as unknown as React.FormEvent)
            }}
          >
            <Home className="h-4 w-4" />
          </button>

          {/* URL bar */}
          <form onSubmit={handleNavigate} className="flex-1">
            <div className="flex items-center bg-white rounded border border-gray-300 px-2">
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 py-1 px-2 text-sm outline-none"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Browser content */}
      <div className="flex-1 overflow-auto bg-white">
        {isLoading ? (
          <div className="h-full w-full flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
            <p className="text-gray-600 text-sm">Loading {url}...</p>
          </div>
        ) : (
          <>
            {currentContent === "portfolio" && <PortfolioPage />}

            {currentContent === "google" && (
              <div className="h-full flex flex-col items-center pt-24">
                <img src="/icons/google-logo.svg" alt="Google" className="h-24 w-auto mb-6" />
                <form onSubmit={handleSearch} className="w-full max-w-lg px-4">
                  <div className="flex items-center w-full bg-white rounded-full border border-gray-300 px-4 py-2 focus-within:shadow-md">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 ml-3 outline-none"
                      placeholder="Search Google or type a URL"
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-center mt-6">
                    <button type="submit" className="bg-gray-100 text-sm px-4 py-2 mx-2 rounded hover:shadow">
                      Google Search
                    </button>
                    <button type="button" className="bg-gray-100 text-sm px-4 py-2 mx-2 rounded hover:shadow">
                      I'm Feeling Lucky
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentContent === "screenshot" && screenshotData && (
              <div className="h-full w-full overflow-auto">
                <img
                  src={screenshotData.screenshot || "/placeholder.svg"}
                  alt={screenshotData.title || "Website Screenshot"}
                  className="w-full"
                />
              </div>
            )}

            {currentContent === "screenshot" && error && (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-red-500">Error Loading Website</h2>
                <p className="mb-4">{error}</p>
                <p className="text-gray-600">Please check the URL and try again, or try a different website.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
