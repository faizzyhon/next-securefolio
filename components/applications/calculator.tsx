"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [expression, setExpression] = useState("")
  const [memory, setMemory] = useState<number | null>(null)
  const [isNewCalculation, setIsNewCalculation] = useState(true)

  // Handle number input
  const handleNumber = (num: string) => {
    if (isNewCalculation) {
      setDisplay(num)
      setExpression(num)
      setIsNewCalculation(false)
    } else {
      if (display === "0") {
        setDisplay(num)
        setExpression(num)
      } else {
        setDisplay(display + num)
        setExpression(expression + num)
      }
    }
  }

  // Handle operator input
  const handleOperator = (op: string) => {
    setIsNewCalculation(false)

    // If the last character is an operator, replace it
    if (["+", "-", "×", "÷"].includes(expression.slice(-1))) {
      setExpression(expression.slice(0, -1) + op)
    } else {
      setExpression(expression + op)
    }

    setDisplay(op)
  }

  // Handle decimal point
  const handleDecimal = () => {
    if (isNewCalculation) {
      setDisplay("0.")
      setExpression("0.")
      setIsNewCalculation(false)
    } else if (!display.includes(".")) {
      setDisplay(display + ".")
      setExpression(expression + ".")
    }
  }

  // Handle equals
  const handleEquals = () => {
    try {
      // Replace × and ÷ with * and / for evaluation
      const evalExpression = expression.replace(/×/g, "*").replace(/÷/g, "/")
      const result = eval(evalExpression).toString()

      setDisplay(result)
      setExpression(result)
      setIsNewCalculation(true)
    } catch (error) {
      setDisplay("Error")
      setIsNewCalculation(true)
    }
  }

  // Handle clear
  const handleClear = () => {
    setDisplay("0")
    setExpression("")
    setIsNewCalculation(true)
  }

  // Handle backspace
  const handleBackspace = () => {
    if (display.length === 1 || display === "Error") {
      setDisplay("0")
      setExpression(expression.slice(0, -1))
      if (expression.length <= 1) {
        setIsNewCalculation(true)
      }
    } else {
      setDisplay(display.slice(0, -1))
      setExpression(expression.slice(0, -1))
    }
  }

  // Handle memory functions
  const handleMemory = (action: "add" | "subtract" | "recall" | "clear") => {
    switch (action) {
      case "add":
        setMemory((memory || 0) + Number.parseFloat(display))
        setIsNewCalculation(true)
        break
      case "subtract":
        setMemory((memory || 0) - Number.parseFloat(display))
        setIsNewCalculation(true)
        break
      case "recall":
        if (memory !== null) {
          setDisplay(memory.toString())
          setExpression(memory.toString())
        }
        break
      case "clear":
        setMemory(null)
        break
    }
  }

  // Handle special functions
  const handleSpecial = (func: string) => {
    const num = Number.parseFloat(display)
    let result: number

    switch (func) {
      case "sqrt":
        result = Math.sqrt(num)
        break
      case "square":
        result = num * num
        break
      case "reciprocal":
        result = 1 / num
        break
      case "negate":
        result = -num
        break
      default:
        return
    }

    setDisplay(result.toString())
    setExpression(result.toString())
    setIsNewCalculation(true)
  }

  // Button component
  const CalcButton = ({
    value,
    onClick,
    className = "",
    wide = false,
  }: {
    value: string
    onClick: () => void
    className?: string
    wide?: boolean
  }) => (
    <motion.button
      className={`flex items-center justify-center rounded ${wide ? "col-span-2" : ""} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(75, 85, 99, 1)" }}
      whileTap={{ scale: 0.95 }}
    >
      {value}
    </motion.button>
  )

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white p-4">
      {/* Display */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="text-gray-400 text-xs h-4 mb-1 overflow-hidden">{expression}</div>
        <div className="text-right text-2xl font-medium overflow-hidden">{display}</div>
      </div>

      {/* Memory display */}
      <div className="flex justify-between text-xs mb-2">
        <div className="text-gray-400">{memory !== null ? `M: ${memory}` : "M: Empty"}</div>
        <div className="text-gray-400">{isNewCalculation ? "Ready" : "Calculating"}</div>
      </div>

      {/* Keypad */}
      <div className="flex-1 grid grid-cols-4 gap-2 text-lg">
        {/* Row 1 - Memory and Clear */}
        <CalcButton value="MC" onClick={() => handleMemory("clear")} className="bg-gray-700" />
        <CalcButton value="MR" onClick={() => handleMemory("recall")} className="bg-gray-700" />
        <CalcButton value="M+" onClick={() => handleMemory("add")} className="bg-gray-700" />
        <CalcButton value="M-" onClick={() => handleMemory("subtract")} className="bg-gray-700" />

        {/* Row 2 - Clear and operations */}
        <CalcButton value="C" onClick={handleClear} className="bg-red-700 hover:bg-red-600" />
        <CalcButton value="←" onClick={handleBackspace} className="bg-gray-700" />
        <CalcButton value="%" onClick={() => handleOperator("%")} className="bg-gray-700" />
        <CalcButton value="÷" onClick={() => handleOperator("÷")} className="bg-yellow-700" />

        {/* Row 3 - Numbers and operations */}
        <CalcButton value="7" onClick={() => handleNumber("7")} className="bg-gray-800" />
        <CalcButton value="8" onClick={() => handleNumber("8")} className="bg-gray-800" />
        <CalcButton value="9" onClick={() => handleNumber("9")} className="bg-gray-800" />
        <CalcButton value="×" onClick={() => handleOperator("×")} className="bg-yellow-700" />

        {/* Row 4 */}
        <CalcButton value="4" onClick={() => handleNumber("4")} className="bg-gray-800" />
        <CalcButton value="5" onClick={() => handleNumber("5")} className="bg-gray-800" />
        <CalcButton value="6" onClick={() => handleNumber("6")} className="bg-gray-800" />
        <CalcButton value="-" onClick={() => handleOperator("-")} className="bg-yellow-700" />

        {/* Row 5 */}
        <CalcButton value="1" onClick={() => handleNumber("1")} className="bg-gray-800" />
        <CalcButton value="2" onClick={() => handleNumber("2")} className="bg-gray-800" />
        <CalcButton value="3" onClick={() => handleNumber("3")} className="bg-gray-800" />
        <CalcButton value="+" onClick={() => handleOperator("+")} className="bg-yellow-700" />

        {/* Row 6 */}
        <CalcButton value="±" onClick={() => handleSpecial("negate")} className="bg-gray-800" />
        <CalcButton value="0" onClick={() => handleNumber("0")} className="bg-gray-800" />
        <CalcButton value="." onClick={handleDecimal} className="bg-gray-800" />
        <CalcButton value="=" onClick={handleEquals} className="bg-green-700 hover:bg-green-600" />
      </div>
    </div>
  )
}
