"use client"

import { useState, useEffect } from "react"
import { Trash, Plus, Edit, Check, X } from "lucide-react"
import { motion } from "framer-motion"

interface Note {
  id: string
  title: string
  content: string
  lastModified: Date
  color: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "note1",
      title: "Kali Linux Commands",
      content:
        "# Useful Kali Linux Commands\n\n- `nmap -sS -sV <target>` - Scan for open ports and service versions\n- `hydra -l user -P passlist.txt ssh://<target>` - Brute force SSH\n- `dirb http://<target>` - Directory brute forcing\n- `sqlmap -u <url> --dbs` - SQL injection scanner\n- `wpscan --url <url>` - WordPress vulnerability scanner",
      lastModified: new Date(2023, 5, 15),
      color: "#4CAF50",
    },
    {
      id: "note2",
      title: "Project Ideas",
      content:
        "1. Build a network traffic analyzer\n2. Create a custom password cracking tool\n3. Develop a web vulnerability scanner\n4. Design a secure file encryption system\n5. Build a phishing detection browser extension",
      lastModified: new Date(2023, 6, 22),
      color: "#2196F3",
    },
    {
      id: "note3",
      title: "Meeting Notes",
      content:
        "Meeting with security team - 07/28/2023\n\n- Discussed new firewall implementation\n- Reviewed recent security incidents\n- Planned penetration testing schedule\n- Assigned tasks for vulnerability assessment\n- Next meeting: 08/15/2023",
      lastModified: new Date(2023, 6, 28),
      color: "#FF9800",
    },
  ])

  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [editColor, setEditColor] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Set first note as active by default
  useEffect(() => {
    if (notes.length > 0 && !activeNote) {
      setActiveNote(notes[0])
    }
  }, [notes, activeNote])

  // Create a new note
  const createNewNote = () => {
    const newNote: Note = {
      id: `note${Date.now()}`,
      title: "New Note",
      content: "",
      lastModified: new Date(),
      color: getRandomColor(),
    }

    setNotes([...notes, newNote])
    setActiveNote(newNote)
    setEditMode(true)
    setEditTitle(newNote.title)
    setEditContent(newNote.content)
    setEditColor(newNote.color)
  }

  // Delete a note
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)

    if (activeNote?.id === id) {
      setActiveNote(updatedNotes.length > 0 ? updatedNotes[0] : null)
      setEditMode(false)
    }
  }

  // Save note changes
  const saveNote = () => {
    if (!activeNote) return

    const updatedNote: Note = {
      ...activeNote,
      title: editTitle,
      content: editContent,
      lastModified: new Date(),
      color: editColor,
    }

    setNotes(notes.map((note) => (note.id === activeNote.id ? updatedNote : note)))
    setActiveNote(updatedNote)
    setEditMode(false)
  }

  // Cancel editing
  const cancelEdit = () => {
    if (!activeNote) return
    setEditMode(false)
  }

  // Start editing
  const startEdit = () => {
    if (!activeNote) return
    setEditTitle(activeNote.title)
    setEditContent(activeNote.content)
    setEditColor(activeNote.color)
    setEditMode(true)
  }

  // Get random color for new notes
  const getRandomColor = () => {
    const colors = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0", "#607D8B"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Filter notes based on search term
  const filteredNotes = searchTerm
    ? notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : notes

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 p-2 border-b border-gray-700 flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
          onClick={createNewNote}
        >
          <Plus size={16} />
        </motion.button>
        {activeNote && !editMode && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded bg-gray-700 hover:bg-gray-600"
              onClick={startEdit}
            >
              <Edit size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded bg-red-700 hover:bg-red-600"
              onClick={() => deleteNote(activeNote.id)}
            >
              <Trash size={16} />
            </motion.button>
          </>
        )}
        {activeNote && editMode && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded bg-green-700 hover:bg-green-600"
              onClick={saveNote}
            >
              <Check size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded bg-red-700 hover:bg-red-600"
              onClick={cancelEdit}
            >
              <X size={16} />
            </motion.button>
          </>
        )}
        <div className="flex-1 ml-2">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Note list */}
        <div className="w-64 border-r border-gray-700 overflow-y-auto bg-gray-800">
          {filteredNotes.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">No notes found</div>
          ) : (
            filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 ${
                  activeNote?.id === note.id ? "bg-gray-700" : ""
                }`}
                onClick={() => {
                  setActiveNote(note)
                  setEditMode(false)
                }}
                whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
              >
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: note.color }}></div>
                  <h3 className="font-medium text-sm truncate">{note.title}</h3>
                </div>
                <p className="text-xs text-gray-400 truncate">{note.content.substring(0, 60)}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(note.lastModified)}</p>
              </motion.div>
            ))
          )}
        </div>

        {/* Note content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeNote ? (
            editMode ? (
              <div className="flex-1 flex flex-col p-4 overflow-auto">
                <input
                  type="text"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2 mb-3 text-lg font-medium"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Note title"
                />
                <div className="flex mb-3 space-x-2">
                  {["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0", "#607D8B"].map((color) => (
                    <div
                      key={color}
                      className={`w-6 h-6 rounded-full cursor-pointer ${
                        editColor === color ? "ring-2 ring-white" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setEditColor(color)}
                    ></div>
                  ))}
                </div>
                <textarea
                  className="flex-1 bg-gray-800 border border-gray-700 rounded p-3 text-sm font-mono resize-none"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Write your note here..."
                ></textarea>
              </div>
            ) : (
              <div className="flex-1 p-4 overflow-auto">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: activeNote.color }}></div>
                  <h2 className="text-xl font-medium">{activeNote.title}</h2>
                </div>
                <div className="text-xs text-gray-400 mb-4">Last modified: {formatDate(activeNote.lastModified)}</div>
                <div className="whitespace-pre-wrap">{activeNote.content}</div>
              </div>
            )
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              {notes.length === 0 ? "Create your first note" : "Select a note"}
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-gray-800 text-xs p-1 flex justify-between border-t border-gray-700">
        <div>{notes.length} notes</div>
        <div>Created by Muhammad Faizan</div>
      </div>
    </div>
  )
}
