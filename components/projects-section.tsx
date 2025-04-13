import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Code } from "lucide-react"

export default function ProjectsSection() {
  const projects = [
    {
      title: "Brain Tumor Detection System",
      description:
        "AI-powered system for detecting and classifying brain tumors from MRI scans using deep learning models.",
      category: "ai",
      tags: ["TensorFlow", "Computer Vision", "Medical AI", "Python"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Secure Payment Gateway",
      description:
        "Stripe-style payment system with advanced security features, fraud detection, and real-time transaction monitoring.",
      category: "web",
      tags: ["Next.js", "TypeScript", "Stripe API", "Security"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Network Vulnerability Scanner",
      description:
        "Automated security tool for identifying vulnerabilities in network infrastructure and web applications.",
      category: "security",
      tags: ["Python", "Ethical Hacking", "Network Security", "API"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "IoT pH Monitoring System",
      description:
        "ESP32-based system for real-time monitoring of pH levels in agricultural and industrial applications.",
      category: "iot",
      tags: ["ESP32", "IoT", "Sensors", "Real-time Data"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "AI Travel Assistant",
      description:
        "Intelligent travel planning tool that uses NLP to provide personalized recommendations and itineraries.",
      category: "ai",
      tags: ["NLP", "LangChain", "React", "API Integration"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Crypto Trading Analysis Platform",
      description:
        "Advanced platform for cryptocurrency market analysis with predictive algorithms and automated trading strategies.",
      category: "web",
      tags: ["Next.js", "Data Visualization", "API", "Machine Learning"],
      image: "/placeholder.svg?height=200&width=350",
    },
  ]

  return (
    <Card className="bg-[#0D1117] border-green-700 text-green-400">
      <CardHeader>
        <CardTitle className="text-2xl text-green-500 flex items-center gap-2">
          <span className="text-green-400">[</span>
          Projects
          <span className="text-green-400">]</span>
        </CardTitle>
        <CardDescription className="text-green-400/70">
          <div className="terminal-output">
            <p>
              <span className="text-green-500">$</span> find /projects -type f -name "*.showcase" | sort
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 bg-[#161B22]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ai">AI/ML</TabsTrigger>
            <TabsTrigger value="web">Web Dev</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="iot">IoT</TabsTrigger>
          </TabsList>

          {["all", "ai", "web", "security", "iot"].map((category) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects
                  .filter((project) => category === "all" || project.category === category)
                  .map((project, index) => (
                    <Card key={index} className="bg-[#161B22] border-green-700 overflow-hidden flex flex-col">
                      <div className="h-48 overflow-hidden border-b border-green-700/50">
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
                        <p className="text-sm text-green-400/80 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-green-900/20 text-green-400 border-green-700 text-xs"
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
                          className="text-green-400 border-green-700 hover:bg-green-900/20"
                        >
                          <Code className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-green-400 border-green-700 hover:bg-green-900/20"
                          >
                            <Github className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-green-400 border-green-700 hover:bg-green-900/20"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
