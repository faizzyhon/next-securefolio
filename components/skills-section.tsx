"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

export default function SkillsSection() {
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const skillCategories = [
    {
      name: "AI & Machine Learning",
      skills: [
        { name: "TensorFlow", level: 90 },
        { name: "PyTorch", level: 85 },
        { name: "LangChain", level: 88 },
        { name: "Computer Vision", level: 82 },
        { name: "NLP", level: 85 },
      ],
    },
    {
      name: "Web Development",
      skills: [
        { name: "Next.js", level: 95 },
        { name: "React", level: 92 },
        { name: "Node.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Firebase", level: 85 },
      ],
    },
    {
      name: "Cybersecurity",
      skills: [
        { name: "Penetration Testing", level: 88 },
        { name: "Network Security", level: 85 },
        { name: "Web App Security", level: 90 },
        { name: "Cryptography", level: 80 },
        { name: "Security Auditing", level: 85 },
      ],
    },
    {
      name: "Mobile & IoT",
      skills: [
        { name: "React Native", level: 85 },
        { name: "Flutter", level: 80 },
        { name: "ESP32/Arduino", level: 88 },
        { name: "IoT Protocols", level: 82 },
        { name: "Embedded Systems", level: 78 },
      ],
    },
  ]

  return (
    <Card className="bg-[#0D1117] border-green-700 text-green-400">
      <CardHeader>
        <CardTitle className="text-2xl text-green-500 flex items-center gap-2">
          <span className="text-green-400">[</span>
          Technical Skills
          <span className="text-green-400">]</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="terminal-output mb-6">
          <p className="mb-3">
            <span className="text-green-500">$</span> ls -la /usr/bin/skills/
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <Card key={category.name} className="bg-[#161B22] border-green-700">
              <CardHeader className="py-3">
                <CardTitle className="text-lg text-green-500 flex justify-between">
                  <span>{category.name}</span>
                  <button
                    onClick={() => setShowDetails(showDetails === category.name ? null : category.name)}
                    className="text-sm text-green-400 hover:text-green-300"
                  >
                    {showDetails === category.name ? "hide" : "show"} details
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2 bg-gray-800">
                      <div
                        className="h-full bg-gradient-to-r from-green-700 to-green-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </Progress>

                    {showDetails === category.name && (
                      <div className="mt-1 text-xs text-green-400/80 pl-2 border-l border-green-700">
                        {getSkillDescription(skill.name)}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xl text-green-500 mb-4">Command Line Proficiency</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Bash", "Python", "Git", "Docker", "AWS CLI", "Linux Admin", "Network Tools", "Security Tools"].map(
              (tool) => (
                <div key={tool} className="bg-[#161B22] p-3 rounded border border-green-700 text-center">
                  {tool}
                </div>
              ),
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getSkillDescription(skillName: string): string {
  const descriptions: Record<string, string> = {
    TensorFlow: "Built neural networks for image classification and object detection",
    PyTorch: "Developed deep learning models for NLP and computer vision tasks",
    LangChain: "Created AI agents and RAG systems for knowledge retrieval",
    "Computer Vision": "Implemented object detection and image segmentation models",
    NLP: "Built text classification and sentiment analysis systems",
    "Next.js": "Developed full-stack applications with server components and API routes",
    React: "Created interactive UIs with hooks, context API and custom components",
    "Node.js": "Built RESTful APIs and real-time applications with WebSockets",
    TypeScript: "Implemented type-safe code across frontend and backend applications",
    Firebase: "Integrated authentication, Firestore, and real-time database features",
    "Penetration Testing": "Conducted security assessments and vulnerability scanning",
    "Network Security": "Implemented secure network architectures and protocols",
    "Web App Security": "Secured applications against OWASP Top 10 vulnerabilities",
    Cryptography: "Implemented encryption and secure communication protocols",
    "Security Auditing": "Performed code reviews and security compliance checks",
    "React Native": "Built cross-platform mobile applications for iOS and Android",
    Flutter: "Developed mobile apps with custom animations and state management",
    "ESP32/Arduino": "Created IoT devices for environmental monitoring and automation",
    "IoT Protocols": "Implemented MQTT, CoAP, and other IoT communication protocols",
    "Embedded Systems": "Developed firmware for microcontrollers and sensor integration",
  }

  return descriptions[skillName] || "Advanced proficiency in this technology"
}
