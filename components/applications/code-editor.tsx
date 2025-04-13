"use client"

import { useState, useEffect } from "react"
import { Folder, File, Save, Play, Settings, ChevronRight, ChevronDown, X } from "lucide-react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface FileNode {
  id: string
  name: string
  type: "file" | "folder"
  content?: string
  language?: string
  children?: FileNode[]
  isOpen?: boolean
}

export default function CodeEditor() {
  const [files, setFiles] = useState<FileNode[]>([
    {
      id: "root",
      name: "project",
      type: "folder",
      isOpen: true,
      children: [
        {
          id: "file1",
          name: "index.html",
          type: "file",
          language: "html",
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello, Kali Linux!</h1>
  <p>This is a sample project.</p>
  <script src="script.js"></script>
</body>
</html>`,
        },
        {
          id: "file2",
          name: "styles.css",
          type: "file",
          language: "css",
          content: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f0f0f0;
  color: #333;
}

h1 {
  color: #0066cc;
}`,
        },
        {
          id: "file3",
          name: "script.js",
          type: "file",
          language: "javascript",
          content: `// JavaScript code
document.addEventListener('DOMContentLoaded', () => {
  console.log('Document loaded');
  
  // Add event listener to h1
  const heading = document.querySelector('h1');
  heading.addEventListener('click', () => {
    alert('Hello from Kali Linux!');
  });
});`,
        },
        {
          id: "folder1",
          name: "src",
          type: "folder",
          children: [
            {
              id: "file4",
              name: "app.js",
              type: "file",
              language: "javascript",
              content: `// Main application file
class App {
  constructor() {
    this.name = 'Kali App';
    this.version = '1.0.0';
  }
  
  init() {
    console.log(\`\${this.name} v\${this.version} initialized\`);
    return true;
  }
}

const app = new App();
app.init();`,
            },
          ],
        },
      ],
    },
  ])

  const [activeFile, setActiveFile] = useState<FileNode | null>(null)
  const [editorTheme, setEditorTheme] = useState("vs-dark")
  const [editorOptions, setEditorOptions] = useState({
    minimap: { enabled: true },
    fontSize: 14,
    wordWrap: "on" as const,
    automaticLayout: true,
  })
  const [output, setOutput] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  // Set first file as active by default
  useEffect(() => {
    if (files[0]?.children && files[0].children.length > 0) {
      setActiveFile(files[0].children[0])
    }
  }, [])

  // Handle file content change
  const handleEditorChange = (value: string | undefined) => {
    if (!activeFile || !value) return

    // Update file content
    const updateFileContent = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.id === activeFile.id) {
          return { ...node, content: value }
        }
        if (node.children) {
          return { ...node, children: updateFileContent(node.children) }
        }
        return node
      })
    }

    setFiles((prevFiles) => updateFileContent(prevFiles))
  }

  // Toggle folder open/close
  const toggleFolder = (id: string) => {
    const toggleNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, isOpen: !node.isOpen }
        }
        if (node.children) {
          return { ...node, children: toggleNode(node.children) }
        }
        return node
      })
    }

    setFiles((prevFiles) => toggleNode(prevFiles))
  }

  // Select a file to edit
  const selectFile = (file: FileNode) => {
    if (file.type === "file") {
      setActiveFile(file)
    }
  }

  // Run the code (simulated)
  const runCode = () => {
    if (!activeFile) return

    setIsRunning(true)
    setOutput("Running code...")

    // Simulate code execution with a delay
    setTimeout(() => {
      let result = ""

      switch (activeFile.language) {
        case "javascript":
          result = "// JavaScript output\nCode executed successfully!\n> Console output:\nDocument loaded"
          break
        case "html":
          result = "HTML rendered successfully in browser."
          break
        case "css":
          result = "CSS applied successfully."
          break
        default:
          result = "Code executed."
      }

      setOutput(result)
      setIsRunning(false)
    }, 1500)
  }

  // Create a new file
  const createNewFile = () => {
    const newFileName = prompt("Enter file name:")
    if (!newFileName) return

    // Determine file language from extension
    const extension = newFileName.split(".").pop()?.toLowerCase() || ""
    let language = "plaintext"

    if (extension === "js") language = "javascript"
    else if (extension === "html") language = "html"
    else if (extension === "css") language = "css"
    else if (extension === "json") language = "json"
    else if (extension === "md") language = "markdown"
    else if (extension === "py") language = "python"
    else if (extension === "php") language = "php"

    const newFile: FileNode = {
      id: `file${Date.now()}`,
      name: newFileName,
      type: "file",
      language,
      content: "",
    }

    // Add to root folder
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles]
      if (newFiles[0].children) {
        newFiles[0].children = [...newFiles[0].children, newFile]
      }
      return newFiles
    })

    // Set as active file
    setActiveFile(newFile)
  }

  // Render file tree recursively
  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.id} style={{ paddingLeft: `${level * 16}px` }}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer ${
            activeFile?.id === node.id ? "bg-gray-700" : ""
          }`}
          onClick={() => (node.type === "folder" ? toggleFolder(node.id) : selectFile(node))}
        >
          {node.type === "folder" ? (
            <>
              {node.isOpen ? (
                <ChevronDown className="h-4 w-4 mr-1 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1 text-gray-400" />
              )}
              <Folder className="h-4 w-4 mr-2 text-blue-400" />
            </>
          ) : (
            <>
              <span className="w-4 mr-1" />
              <File className="h-4 w-4 mr-2 text-gray-400" />
            </>
          )}
          <span className="text-sm">{node.name}</span>
        </div>
        {node.type === "folder" && node.isOpen && node.children && renderFileTree(node.children, level + 1)}
      </div>
    ))
  }

  // Get file icon based on language
  const getFileIcon = (language?: string) => {
    switch (language) {
      case "javascript":
        return "js-icon"
      case "html":
        return "html-icon"
      case "css":
        return "css-icon"
      default:
        return "file-icon"
    }
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 p-2 border-b border-gray-700 flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
          onClick={createNewFile}
        >
          <File size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
          onClick={() => {}}
        >
          <Save size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-1.5 rounded ${isRunning ? "bg-red-700" : "bg-green-700 hover:bg-green-600"}`}
          onClick={runCode}
          disabled={isRunning || !activeFile}
        >
          <Play size={16} />
        </motion.button>
        <div className="flex-1" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
          onClick={() => {}}
        >
          <Settings size={16} />
        </motion.button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File explorer */}
        <div className="w-48 border-r border-gray-700 overflow-y-auto bg-gray-800">
          <div className="p-2 text-sm font-medium border-b border-gray-700">Explorer</div>
          <div className="p-1">{files.length > 0 && renderFileTree(files)}</div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeFile ? (
            <>
              <div className="bg-gray-800 border-b border-gray-700 px-4 py-1 text-sm flex items-center">
                <span className={`mr-2 ${getFileIcon(activeFile.language)}`}></span>
                {activeFile.name}
              </div>
              <div className="flex-1 overflow-hidden">
                <MonacoEditor
                  height="100%"
                  language={activeFile.language}
                  value={activeFile.content}
                  theme={editorTheme}
                  options={editorOptions}
                  onChange={handleEditorChange}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">Select a file to edit</div>
          )}

          {/* Output panel */}
          {output && (
            <div className="h-1/3 border-t border-gray-700 bg-gray-800 overflow-auto">
              <div className="p-2 text-sm font-medium border-b border-gray-700 flex justify-between">
                <span>Output</span>
                <button className="text-gray-400 hover:text-white" onClick={() => setOutput(null)}>
                  <X size={14} />
                </button>
              </div>
              <pre className="p-3 text-sm font-mono whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-blue-900 text-xs p-1 flex justify-between">
        <div className="flex items-center space-x-4">
          <span>{activeFile?.language || "plaintext"}</span>
          <span>UTF-8</span>
        </div>
        <div>Created by Muhammad Faizan</div>
      </div>
    </div>
  )
}
