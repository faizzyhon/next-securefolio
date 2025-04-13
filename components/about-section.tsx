import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutSection() {
  return (
    <Card className="bg-[#0D1117] border-green-700 text-green-400">
      <CardHeader>
        <CardTitle className="text-2xl text-green-500 flex items-center gap-2">
          <span className="text-green-400">[</span>
          About Me
          <span className="text-green-400">]</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="border-2 border-green-700 rounded-md p-1 mb-4">
              <img src="/placeholder.svg?height=300&width=300" alt="Muhammad Faizen" className="w-full rounded" />
            </div>
            <div className="space-y-2">
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

          <div className="md:w-2/3 space-y-4">
            <div className="terminal-output">
              <p className="mb-3">
                <span className="text-green-500">$</span> whoami
              </p>
              <p className="mb-4">
                I'm Muhammad Faizen (also known as Mohammad Faizan or @faizzyhon), a passionate AI Engineer, Full-Stack
                Developer, and Certified Ethical Hacker based in Bahawalpur, Pakistan.
              </p>

              <p className="mb-3">
                <span className="text-green-500">$</span> cat background.txt
              </p>
              <p className="mb-4">
                With a background in Artificial Intelligence, Computer Science, and Cybersecurity, I specialize in
                creating intelligent applications, secure web platforms, and IoT solutions. From building Stripe-style
                payment systems in Next.js to training ML models for brain tumor and leaf disease detection, I bridge
                tech innovation with real-world utility.
              </p>

              <p className="mb-3">
                <span className="text-green-500">$</span> cat entrepreneurship.txt
              </p>
              <p>
                I'm also an entrepreneur, managing a Shopify store, a Daraz store, and delivering custom solutions to
                global clients through Upwork. My tech journey includes contributions to real estate web apps, pH
                monitoring systems with ESP32, and AI-powered travel tools.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl text-green-500 mb-2">Current Focus</h3>
              <ul className="list-disc list-inside space-y-1 text-green-400">
                <li>Preparing for the Camino de Santiago trek (June 2025)</li>
                <li>Expanding skillset in cloud AI applications</li>
                <li>Medical research applications</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
