"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ExternalLink, Mail, Linkedin, Twitter, MapPin, Code } from "lucide-react"

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("about")

  return (
    <div className="min-h-full bg-[#121212] text-white overflow-y-auto">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-40 h-40 rounded-full border-4 border-green-500 overflow-hidden flex-shrink-0">
            <img src="/profile-image.png" alt="Muhammad Faizen" className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Muhammad Faizen</h1>
            <h2 className="text-xl text-green-400 mb-4">AI Engineer & Ethical Hacker</h2>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-700">
                AI Engineer
              </Badge>
              <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-700">
                Full-Stack Developer
              </Badge>
              <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-700">
                Certified Ethical Hacker
              </Badge>
            </div>
          </div>
          <div className="flex gap-3 ml-auto">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-green-700 text-green-400 hover:bg-green-900/20"
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-green-700 text-green-400 hover:bg-green-900/20"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-green-700 text-green-400 hover:bg-green-900/20"
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-green-700 text-green-400 hover:bg-green-900/20"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto py-8 px-6 md:px-12">
        <Tabs defaultValue="about" value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid grid-cols-4 bg-[#1a1a1a] mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-green-700/50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400">About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  I'm Muhammad Faizen (also known as Mohammad Faizan or @faizzyhon), a passionate AI Engineer,
                  Full-Stack Developer, and Certified Ethical Hacker based in Bahawalpur, Pakistan.
                </p>
                <p>
                  With a background in Artificial Intelligence, Computer Science, and Cybersecurity, I specialize in
                  creating intelligent applications, secure web platforms, and IoT solutions. From building Stripe-style
                  payment systems in Next.js to training ML models for brain tumor and leaf disease detection, I bridge
                  tech innovation with real-world utility.
                </p>
                <p>
                  I'm also an entrepreneur, managing a Shopify store, a Daraz store, and delivering custom solutions to
                  global clients through Upwork. My tech journey includes contributions to real estate web apps, pH
                  monitoring systems with ESP32, and AI-powered travel tools.
                </p>

                <div className="mt-6">
                  <h3 className="text-xl text-green-400 mb-3">Current Focus</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>Preparing for the Camino de Santiago trek (June 2025)</li>
                    <li>Expanding skillset in cloud AI applications</li>
                    <li>Medical research applications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-green-700/50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl text-green-400 mb-2">AI & Machine Learning</h3>
                    <div className="space-y-3">
                      <SkillBar name="TensorFlow" level={90} />
                      <SkillBar name="PyTorch" level={85} />
                      <SkillBar name="LangChain" level={88} />
                      <SkillBar name="Computer Vision" level={82} />
                      <SkillBar name="NLP" level={85} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl text-green-400 mb-2">Web Development</h3>
                    <div className="space-y-3">
                      <SkillBar name="Next.js" level={95} />
                      <SkillBar name="React" level={92} />
                      <SkillBar name="Node.js" level={90} />
                      <SkillBar name="TypeScript" level={88} />
                      <SkillBar name="Firebase" level={85} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl text-green-400 mb-2">Cybersecurity</h3>
                    <div className="space-y-3">
                      <SkillBar name="Penetration Testing" level={88} />
                      <SkillBar name="Network Security" level={85} />
                      <SkillBar name="Web App Security" level={90} />
                      <SkillBar name="Cryptography" level={80} />
                      <SkillBar name="Security Auditing" level={85} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl text-green-400 mb-2">Mobile & IoT</h3>
                    <div className="space-y-3">
                      <SkillBar name="React Native" level={85} />
                      <SkillBar name="Flutter" level={80} />
                      <SkillBar name="ESP32/Arduino" level={88} />
                      <SkillBar name="IoT Protocols" level={82} />
                      <SkillBar name="Embedded Systems" level={78} />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl text-green-400 mb-4">Command Line Proficiency</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      "Bash",
                      "Python",
                      "Git",
                      "Docker",
                      "AWS CLI",
                      "Linux Admin",
                      "Network Tools",
                      "Security Tools",
                    ].map((tool) => (
                      <div key={tool} className="bg-[#252525] p-3 rounded border border-green-700/50 text-center">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-green-700/50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400">Projects</CardTitle>
                <CardDescription className="text-gray-400">A selection of my recent work and research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Brain Tumor Detection System",
                      description:
                        "AI-powered system for detecting and classifying brain tumors from MRI scans using deep learning models.",
                      tags: ["TensorFlow", "Computer Vision", "Medical AI", "Python"],
                      image: "/placeholder.svg?height=200&width=350",
                    },
                    {
                      title: "Secure Payment Gateway",
                      description:
                        "Stripe-style payment system with advanced security features, fraud detection, and real-time transaction monitoring.",
                      tags: ["Next.js", "TypeScript", "Stripe API", "Security"],
                      image: "/placeholder.svg?height=200&width=350",
                    },
                    {
                      title: "Network Vulnerability Scanner",
                      description:
                        "Automated security tool for identifying vulnerabilities in network infrastructure and web applications.",
                      tags: ["Python", "Ethical Hacking", "Network Security", "API"],
                      image: "/placeholder.svg?height=200&width=350",
                    },
                    {
                      title: "IoT pH Monitoring System",
                      description:
                        "ESP32-based system for real-time monitoring of pH levels in agricultural and industrial applications.",
                      tags: ["ESP32", "IoT", "Sensors", "Real-time Data"],
                      image: "/placeholder.svg?height=200&width=350",
                    },
                    {
                      title: "AI Travel Assistant",
                      description:
                        "Intelligent travel planning tool that uses NLP to provide personalized recommendations and itineraries.",
                      tags: ["NLP", "LangChain", "React", "API Integration"],
                      image: "/placeholder.svg?height=200&width=350",
                    },
                    {
                      title: "Crypto Trading Analysis Platform",
                      description:
                        "Advanced platform for cryptocurrency market analysis with predictive algorithms and automated trading strategies.",
                      tags: ["Next.js", "Data Visualization", "API", "Machine Learning"],
                      image: "/placeholder.svg?height=200&width=350",
                    },
                  ].map((project, index) => (
                    <Card key={index} className="bg-[#252525] border-green-700/30 overflow-hidden flex flex-col">
                      <div className="h-48 overflow-hidden border-b border-green-700/30">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg text-green-400">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-green-900/20 text-green-400 border-green-700/50 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-400 border-green-700/50 hover:bg-green-900/20"
                        >
                          <Code className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-green-400 border-green-700/50 hover:bg-green-900/20"
                          >
                            <Github className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-green-400 border-green-700/50 hover:bg-green-900/20"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-green-700/50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400">Contact</CardTitle>
                <CardDescription className="text-gray-400">
                  Get in touch for collaborations or inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl text-green-400 mb-4">Connect With Me</h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-900/30 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="text-green-400">faizzyhon@example.com</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-green-900/30 p-2 rounded-full">
                          <MapPin className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-green-400">Bahawalpur, Pakistan</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl text-green-400 mt-8 mb-4">Social Profiles</h3>

                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="bg-[#252525] p-3 rounded-full border border-green-700/50 hover:bg-green-900/30 transition-colors"
                      >
                        <Github className="h-5 w-5 text-green-400" />
                      </a>

                      <a
                        href="#"
                        className="bg-[#252525] p-3 rounded-full border border-green-700/50 hover:bg-green-900/30 transition-colors"
                      >
                        <Linkedin className="h-5 w-5 text-green-400" />
                      </a>

                      <a
                        href="#"
                        className="bg-[#252525] p-3 rounded-full border border-green-700/50 hover:bg-green-900/30 transition-colors"
                      >
                        <Twitter className="h-5 w-5 text-green-400" />
                      </a>

                      <a
                        href="#"
                        className="bg-[#252525] p-3 rounded-full border border-green-700/50 hover:bg-green-900/30 transition-colors"
                      >
                        <Mail className="h-5 w-5 text-green-400" />
                      </a>
                    </div>

                    <div className="mt-8 p-4 bg-[#252525] border border-green-700/50 rounded-md">
                      <h4 className="text-green-400 mb-2">Secure Communication</h4>
                      <p className="text-sm text-gray-300 mb-2">For encrypted communication:</p>
                      <div className="bg-black p-2 rounded font-mono text-sm">
                        <p>PGP Key Fingerprint:</p>
                        <p className="text-green-400">3A2F 8E1D 6B7C 9D0E 5F4A 2C1B 7D8E 9F0A 1B2C 3D4E</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl text-green-400 mb-4">Send Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm text-gray-400">
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            className="w-full bg-[#252525] border-green-700/50 text-white focus:border-green-500 focus:ring-green-500 rounded-md p-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm text-gray-400">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full bg-[#252525] border-green-700/50 text-white focus:border-green-500 focus:ring-green-500 rounded-md p-2"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm text-gray-400">
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          className="w-full bg-[#252525] border-green-700/50 text-white focus:border-green-500 focus:ring-green-500 rounded-md p-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm text-gray-400">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className="w-full bg-[#252525] border-green-700/50 text-white focus:border-green-500 focus:ring-green-500 rounded-md p-2"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-black font-medium">
                        Send Message
                      </Button>

                      <div className="text-xs text-gray-400 text-center mt-2">
                        <p>All communications are encrypted with PGP</p>
                      </div>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">{name}</span>
        <span className="text-green-400">{level}%</span>
      </div>
      <div className="h-2 bg-[#252525] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-700 to-green-500 rounded-full"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}
