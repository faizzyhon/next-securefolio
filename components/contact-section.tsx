"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Mail, Github, Linkedin, Twitter, Globe } from "lucide-react"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <Card className="bg-[#0D1117] border-green-700 text-green-400">
      <CardHeader>
        <CardTitle className="text-2xl text-green-500 flex items-center gap-2">
          <span className="text-green-400">[</span>
          Contact
          <span className="text-green-400">]</span>
        </CardTitle>
        <CardDescription className="text-green-400/70">
          <div className="terminal-output">
            <p>
              <span className="text-green-500">$</span> cat /etc/contact_info.conf
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl text-green-500 mb-4">Connect With Me</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-900/30 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-green-400/70">Email</p>
                  <p className="text-green-400">faizzyhon@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-green-900/30 p-2 rounded-full">
                  <Globe className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-green-400/70">Location</p>
                  <p className="text-green-400">Bahawalpur, Pakistan</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl text-green-500 mt-8 mb-4">Social Profiles</h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="bg-[#161B22] p-3 rounded-full border border-green-700 hover:bg-green-900/30 transition-colors"
              >
                <Github className="h-5 w-5 text-green-400" />
              </a>

              <a
                href="#"
                className="bg-[#161B22] p-3 rounded-full border border-green-700 hover:bg-green-900/30 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-green-400" />
              </a>

              <a
                href="#"
                className="bg-[#161B22] p-3 rounded-full border border-green-700 hover:bg-green-900/30 transition-colors"
              >
                <Twitter className="h-5 w-5 text-green-400" />
              </a>

              <a
                href="#"
                className="bg-[#161B22] p-3 rounded-full border border-green-700 hover:bg-green-900/30 transition-colors"
              >
                <Globe className="h-5 w-5 text-green-400" />
              </a>
            </div>

            <div className="mt-8 p-4 bg-[#161B22] border border-green-700 rounded-md">
              <h4 className="text-green-500 mb-2">Terminal Access</h4>
              <p className="text-sm text-green-400/80 mb-2">For direct communication:</p>
              <div className="bg-black p-2 rounded font-mono text-sm">
                <p>ssh contact@faizzyhon.dev</p>
                <p>Password: **********</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl text-green-500 mb-4">Send Message</h3>

            {submitted ? (
              <div className="p-4 bg-green-900/20 border border-green-500 rounded-md text-center">
                <p className="text-green-400 mb-2">Message sent successfully!</p>
                <p className="text-sm text-green-400/80">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-green-400/80">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="bg-[#161B22] border-green-700 text-green-400 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-green-400/80">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="bg-[#161B22] border-green-700 text-green-400 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm text-green-400/80">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="bg-[#161B22] border-green-700 text-green-400 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-green-400/80">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-[#161B22] border-green-700 text-green-400 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-700 hover:bg-green-600 text-black font-medium"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <div className="text-xs text-green-400/60 text-center mt-2">
                  <p>All communications are encrypted with PGP</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
