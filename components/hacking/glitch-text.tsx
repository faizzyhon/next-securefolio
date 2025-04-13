"use client"

import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  intensity?: number
}

export default function GlitchText({ text, intensity = 1 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    setDisplayText(text)

    // Only apply glitch effect if there's text to glitch
    if (text.length === 0) return

    // Apply glitch effect at random intervals
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const glitchedText = applyGlitch(text, intensity)
        setDisplayText(glitchedText)

        // Reset after a short delay
        setTimeout(() => {
          setDisplayText(text)
        }, 100)
      }
    }, 500)

    return () => clearInterval(glitchInterval)
  }, [text, intensity])

  return <span className="glitch-text">{displayText}</span>
}

// Function to apply glitch effect to text
function applyGlitch(text: string, intensity: number): string {
  // Skip glitch if intensity is too low
  if (intensity < 0.5) return text

  // Number of characters to glitch based on intensity
  const glitchCount = Math.max(1, Math.floor(text.length * (intensity / 10)))

  // Convert text to array for manipulation
  const chars = text.split("")

  // Apply glitches
  for (let i = 0; i < glitchCount; i++) {
    const pos = Math.floor(Math.random() * text.length)

    // Different types of glitches
    const glitchType = Math.floor(Math.random() * 4)

    switch (glitchType) {
      case 0: // Replace with random character
        chars[pos] = getRandomChar()
        break
      case 1: // Replace with special character
        chars[pos] = getRandomSpecialChar()
        break
      case 2: // Uppercase if lowercase, lowercase if uppercase
        if (chars[pos] && chars[pos].match(/[a-z]/)) {
          chars[pos] = chars[pos].toUpperCase()
        } else if (chars[pos] && chars[pos].match(/[A-Z]/)) {
          chars[pos] = chars[pos].toLowerCase()
        }
        break
      case 3: // Remove character (replace with empty space)
        if (chars[pos] && chars[pos] !== " ") {
          chars[pos] = " "
        }
        break
    }
  }

  return chars.join("")
}

function getRandomChar(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

function getRandomSpecialChar(): string {
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\"
  return specialChars.charAt(Math.floor(Math.random() * specialChars.length))
}
