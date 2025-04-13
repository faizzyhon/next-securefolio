"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Github, Linkedin, Globe, Code, Briefcase, Book, Monitor, Moon, Sun, Bell } from "lucide-react"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [fontSize, setFontSize] = useState(14)
  const [language, setLanguage] = useState("en")

  const personalInfo = {
    name: "Muhammad Faizan",
    title: "AI Engineer & Ethical Hacker",
    email: "faizzyhon@example.com",
    location: "Bahawalpur, Pakistan",
    bio: "Passionate AI Engineer, Full-Stack Developer, and Certified Ethical Hacker with expertise in creating intelligent applications, secure web platforms, and IoT solutions.",
    github: "github.com/faizzyhon",
    linkedin: "linkedin.com/in/faizzyhon",
    website: "faizzyhon.dev",
    skills: [
      { name: "AI & Machine Learning", level: 90 },
      { name: "Web Development", level: 95 },
      { name: "Cybersecurity", level: 88 },
      { name: "Mobile & IoT", level: 85 },
    ],
    projects: [
      {
        name: "Brain Tumor Detection System",
        description:
          "AI-powered system for detecting and classifying brain tumors from MRI scans using deep learning models.",
        technologies: ["TensorFlow", "Computer Vision", "Python"],
      },
      {
        name: "Secure Payment Gateway",
        description:
          "Stripe-style payment system with advanced security features, fraud detection, and real-time transaction monitoring.",
        technologies: ["Next.js", "TypeScript", "Stripe API"],
      },
      {
        name: "Network Vulnerability Scanner",
        description:
          "Automated security tool for identifying vulnerabilities in network infrastructure and web applications.",
        technologies: ["Python", "Ethical Hacking", "Network Security"],
      },
      {
        name: "IoT pH Monitoring System",
        description:
          "ESP32-based system for real-time monitoring of pH levels in agricultural and industrial applications.",
        technologies: ["ESP32", "IoT", "Sensors"],
      },
    ],
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <nav className="p-2">
            <ul className="space-y-1">
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded flex items-center ${
                    activeTab === "profile" ? "bg-green-900/50 text-green-400" : "hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded flex items-center ${
                    activeTab === "projects" ? "bg-green-900/50 text-green-400" : "hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Projects
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded flex items-center ${
                    activeTab === "appearance" ? "bg-green-900/50 text-green-400" : "hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveTab("appearance")}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Appearance
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded flex items-center ${
                    activeTab === "about" ? "bg-green-900/50 text-green-400" : "hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  <Book className="h-4 w-4 mr-2" />
                  About
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden mr-6 flex-shrink-0">
                  <img src="/profile-image.png" alt={personalInfo.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{personalInfo.name}</h2>
                  <p className="text-green-400">{personalInfo.title}</p>
                  <p className="text-gray-400 mt-1">{personalInfo.location}</p>
                  <div className="flex mt-3 space-x-3">
                    <motion.a
                      href={`https://${personalInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href={`https://${personalInfo.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href={`https://${personalInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Globe className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href={`mailto:${personalInfo.email}`}
                      className="text-gray-400 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Bio</h3>
                <p className="text-gray-300">{personalInfo.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Skills</h3>
                <div className="space-y-3">
                  {personalInfo.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-green-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-700 to-green-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{personalInfo.website}</span>
                  </div>
                  <div className="flex items-center">
                    <Github className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{personalInfo.github}</span>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{personalInfo.linkedin}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalInfo.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-green-400 mr-2 mt-1" />
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="text-xs bg-gray-700 text-green-400 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Appearance</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Theme</h3>
                  <div className="flex space-x-4">
                    <motion.div
                      className={`p-4 rounded-lg border ${
                        darkMode ? "border-green-500 bg-gray-800" : "border-gray-700 bg-gray-800 hover:border-gray-500"
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setDarkMode(true)}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <Moon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-center">Dark</div>
                    </motion.div>
                    <motion.div
                      className={`p-4 rounded-lg border ${
                        !darkMode ? "border-green-500 bg-gray-800" : "border-gray-700 bg-gray-800 hover:border-gray-500"
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setDarkMode(false)}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <Sun className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div className="text-center">Light</div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Font Size</h3>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">A</span>
                    <input
                      type="range"
                      min="12"
                      max="20"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
                      className="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-lg ml-2">A</span>
                    <span className="ml-4">{fontSize}px</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Language</h3>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded px-3 py-2 w-64"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ur">Urdu</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Notifications</h3>
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="mr-4">Enable notifications</span>
                    <div
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                        notifications ? "bg-green-600" : "bg-gray-700"
                      }`}
                      onClick={() => setNotifications(!notifications)}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full"
                        animate={{ x: notifications ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div>
              <h2 className="text-xl font-bold mb-4">About</h2>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-center mb-4">
                  <img src="/kali-linux-icon.png" alt="Kali Linux" className="h-16 w-16" />
                </div>
                <h3 className="text-center text-lg font-medium">Kali Linux</h3>
                <p className="text-center text-gray-400 mb-4">Version 2023.3</p>
                <p className="text-center mb-6">
                  Kali Linux is a Debian-derived Linux distribution designed for digital forensics and penetration
                  testing.
                </p>
                <div className="text-center text-sm text-gray-400">
                  <p>Created by Muhammad Faizan</p>
                  <p className="mt-1">© 2023 All rights reserved</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
