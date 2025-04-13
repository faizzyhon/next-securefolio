"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Folder, File, Home, ArrowLeft, ArrowRight, RefreshCw, Plus } from "lucide-react"
import { motion } from "framer-motion"

interface FileItem {
  name: string
  type: "file" | "folder"
  size?: string
  modified?: string
  children?: FileItem[]
}

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState("/home/kali")
  const [history, setHistory] = useState<string[]>(["/home/kali"])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "/home/kali": true,
  })
  const [showNewFolderInput, setShowNewFolderInput] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [fileSystem, setFileSystem] = useState<Record<string, FileItem[]>>({
    "/home/kali": [
      {
        name: "Desktop",
        type: "folder",
        children: [
          { name: "tools", type: "folder" },
          { name: "readme.txt", type: "file", size: "2.3 KB", modified: "2023-04-15" },
          { name: "kali-setup.sh", type: "file", size: "4.7 KB", modified: "2023-04-10" },
        ],
      },
      { name: "Documents", type: "folder" },
      { name: "Downloads", type: "folder" },
      { name: "Music", type: "folder" },
      { name: "Pictures", type: "folder" },
      { name: "Public", type: "folder" },
      { name: "Templates", type: "folder" },
      { name: "Videos", type: "folder" },
    ],
    "/home/kali/Desktop": [
      { name: "tools", type: "folder" },
      { name: "readme.txt", type: "file", size: "2.3 KB", modified: "2023-04-15" },
      { name: "kali-setup.sh", type: "file", size: "4.7 KB", modified: "2023-04-10" },
    ],
  })
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [clipboard, setClipboard] = useState<{ item: FileItem; path: string; action: "copy" | "cut" } | null>(null)

  const navigateTo = (path: string) => {
    setCurrentPath(path)
    setHistory([...history.slice(0, historyIndex + 1), path])
    setHistoryIndex(historyIndex + 1)
    setSelectedItem(null)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setCurrentPath(history[historyIndex - 1])
      setSelectedItem(null)
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setCurrentPath(history[historyIndex + 1])
      setSelectedItem(null)
    }
  }

  const toggleFolder = (path: string) => {
    setExpandedFolders({
      ...expandedFolders,
      [path]: !expandedFolders[path],
    })
  }

  const createNewFolder = () => {
    if (!newFolderName.trim()) return

    // Check if folder already exists
    const currentFiles = fileSystem[currentPath] || []
    if (currentFiles.some((item) => item.name === newFolderName && item.type === "folder")) {
      alert(`Folder "${newFolderName}" already exists.`)
      return
    }

    // Create new folder
    const newFolder: FileItem = {
      name: newFolderName,
      type: "folder",
      modified: new Date().toISOString().split("T")[0],
    }

    // Add to file system
    const updatedFiles = [...currentFiles, newFolder]
    setFileSystem({
      ...fileSystem,
      [currentPath]: updatedFiles,
    })

    // Reset state
    setNewFolderName("")
    setShowNewFolderInput(false)
  }

  const handleItemClick = (item: FileItem, path: string) => {
    const fullPath = `${path}/${item.name}`
    setSelectedItem(fullPath)
  }

  const handleItemDoubleClick = (item: FileItem, path: string) => {
    if (item.type === "folder") {
      const fullPath = `${path}/${item.name}`
      navigateTo(fullPath)

      // Initialize this path in the file system if it doesn't exist
      if (!fileSystem[fullPath]) {
        setFileSystem({
          ...fileSystem,
          [fullPath]: [],
        })
      }
    }
  }

  const copyItem = (item: FileItem, path: string) => {
    setClipboard({
      item,
      path,
      action: "copy",
    })
  }

  const cutItem = (item: FileItem, path: string) => {
    setClipboard({
      item,
      path,
      action: "cut",
    })
  }

  const pasteItem = () => {
    if (!clipboard) return

    const currentFiles = fileSystem[currentPath] || []

    // Check if item already exists in destination
    let newName = clipboard.item.name
    let counter = 1
    while (currentFiles.some((item) => item.name === newName)) {
      newName = `${clipboard.item.name} (${counter})`
      counter++
    }

    // Create copy of the item
    const newItem: FileItem = {
      ...clipboard.item,
      name: newName,
    }

    // Add to current directory
    const updatedFiles = [...currentFiles, newItem]
    setFileSystem({
      ...fileSystem,
      [currentPath]: updatedFiles,
    })

    // If it was a cut operation, remove from source
    if (clipboard.action === "cut") {
      const sourcePath = clipboard.path
      const sourceFiles = fileSystem[sourcePath] || []
      const updatedSourceFiles = sourceFiles.filter((item) => item.name !== clipboard.item.name)

      setFileSystem({
        ...fileSystem,
        [sourcePath]: updatedSourceFiles,
      })

      // Clear clipboard after cut
      setClipboard(null)
    }
  }

  const deleteItem = (item: FileItem, path: string) => {
    const files = fileSystem[path] || []
    const updatedFiles = files.filter((f) => f.name !== item.name)

    setFileSystem({
      ...fileSystem,
      [path]: updatedFiles,
    })

    setSelectedItem(null)
  }

  const renderFileTree = (items: FileItem[], basePath: string, level = 0) => {
    return items.map((item) => {
      const fullPath = `${basePath}/${item.name}`
      const isExpanded = expandedFolders[fullPath]
      const isSelected = selectedItem === fullPath

      return (
        <div key={fullPath} style={{ paddingLeft: `${level * 16}px` }}>
          <div
            className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer ${isSelected ? "bg-gray-600" : ""}`}
            onClick={() => handleItemClick(item, basePath)}
            onDoubleClick={() => handleItemDoubleClick(item, basePath)}
          >
            {item.type === "folder" ? (
              <>
                {item.children ? (
                  isExpanded ? (
                    <ChevronDown className="h-4 w-4 mr-1" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-1" />
                  )
                ) : (
                  <span className="w-4 mr-1" />
                )}
                <Folder className="h-4 w-4 mr-2 text-blue-400" />
              </>
            ) : (
              <>
                <span className="w-4 mr-1" />
                <File className="h-4 w-4 mr-2 text-gray-400" />
              </>
            )}
            <span>{item.name}</span>
          </div>
          {item.type === "folder" && isExpanded && item.children && renderFileTree(item.children, fullPath, level + 1)}
        </div>
      )
    })
  }

  const currentFiles = fileSystem[currentPath] || []

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white">
      {/* Toolbar */}
      <div className="flex items-center p-2 border-b border-gray-700 bg-gray-800">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-1 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
          className="p-1 rounded hover:bg-gray-700 disabled:opacity-50 ml-1"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <button onClick={() => navigateTo("/home/kali")} className="p-1 rounded hover:bg-gray-700 ml-1">
          <Home className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            // Refresh current directory (simulation)
          }}
          className="p-1 rounded hover:bg-gray-700 ml-1"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <div className="ml-2 px-2 py-1 bg-gray-700 rounded flex-1 text-sm truncate">{currentPath}</div>

        {/* New folder button */}
        <button
          onClick={() => setShowNewFolderInput(true)}
          className="p-1 rounded hover:bg-gray-700 ml-2"
          title="New Folder"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* New folder input */}
      {showNewFolderInput && (
        <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New folder name"
            className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") createNewFolder()
              if (e.key === "Escape") setShowNewFolderInput(false)
            }}
          />
          <button onClick={createNewFolder} className="ml-2 bg-green-700 hover:bg-green-600 px-2 py-1 rounded text-sm">
            Create
          </button>
          <button
            onClick={() => setShowNewFolderInput(false)}
            className="ml-2 bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Context menu for selected item */}
      {selectedItem && (
        <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
          <button
            onClick={() => {
              const path = selectedItem.substring(0, selectedItem.lastIndexOf("/"))
              const name = selectedItem.substring(selectedItem.lastIndexOf("/") + 1)
              const item = fileSystem[path]?.find((i) => i.name === name)
              if (item) copyItem(item, path)
            }}
            className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm mr-2"
          >
            Copy
          </button>
          <button
            onClick={() => {
              const path = selectedItem.substring(0, selectedItem.lastIndexOf("/"))
              const name = selectedItem.substring(selectedItem.lastIndexOf("/") + 1)
              const item = fileSystem[path]?.find((i) => i.name === name)
              if (item) cutItem(item, path)
            }}
            className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm mr-2"
          >
            Cut
          </button>
          <button
            onClick={() => {
              const path = selectedItem.substring(0, selectedItem.lastIndexOf("/"))
              const name = selectedItem.substring(selectedItem.lastIndexOf("/") + 1)
              const item = fileSystem[path]?.find((i) => i.name === name)
              if (item) deleteItem(item, path)
            }}
            className="bg-red-700 hover:bg-red-600 px-2 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      )}

      {/* Paste button (only shown when clipboard has content) */}
      {clipboard && (
        <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
          <button onClick={pasteItem} className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm">
            Paste "{clipboard.item.name}"
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-700 overflow-y-auto bg-gray-800 p-2">
          <div className="text-sm font-medium mb-2">Quick Access</div>
          {renderFileTree(
            [
              { name: "home", type: "folder", children: [{ name: "kali", type: "folder" }] },
              { name: "mnt", type: "folder" },
              { name: "usr", type: "folder" },
              { name: "var", type: "folder" },
            ],
            "",
          )}
        </div>

        {/* File list */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-[auto_1fr_100px_150px] gap-1 p-2 text-sm border-b border-gray-700 bg-gray-800">
            <div className="px-2">Type</div>
            <div className="px-2">Name</div>
            <div className="px-2">Size</div>
            <div className="px-2">Modified</div>
          </div>
          <div className="overflow-auto">
            {currentFiles.map((file) => {
              const fullPath = `${currentPath}/${file.name}`
              const isSelected = selectedItem === fullPath

              return (
                <motion.div
                  key={file.name}
                  className={`grid grid-cols-[auto_1fr_100px_150px] gap-1 p-2 text-sm hover:bg-gray-800 cursor-pointer ${
                    isSelected ? "bg-gray-700" : ""
                  }`}
                  onClick={() => handleItemClick(file, currentPath)}
                  onDoubleClick={() => handleItemDoubleClick(file, currentPath)}
                  whileHover={{ backgroundColor: isSelected ? "rgba(55, 65, 81, 1)" : "rgba(31, 41, 55, 0.8)" }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="px-2">
                    {file.type === "folder" ? (
                      <Folder className="h-4 w-4 text-blue-400" />
                    ) : (
                      <File className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div className="px-2 truncate">{file.name}</div>
                  <div className="px-2">{file.type === "folder" ? "--" : file.size}</div>
                  <div className="px-2">{file.modified || "--"}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="p-1 text-xs border-t border-gray-700 bg-gray-800">
        {currentFiles.length} items | Created by Muhammad Faizan
      </div>
    </div>
  )
}
