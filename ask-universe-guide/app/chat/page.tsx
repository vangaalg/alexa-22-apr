"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, RefreshCw, Share2, Stars } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

// Mock data for the Universe's responses
const universeResponses = [
  "The path you seek is already within you. Look inward for the answers that your soul already knows.",
  "Sometimes the Universe remains silent not because it has abandoned you, but because it wants you to listen more carefully.",
  "Trust the timing of your life. What seems like a delay is often the Universe preparing something better than you imagined.",
  "The challenges you face are not punishments but opportunities for growth. Embrace them with an open heart.",
  "You are exactly where you need to be on your journey. The Universe makes no mistakes in its divine timing.",
  "When you align your actions with your true purpose, the Universe conspires to help you succeed.",
  "The answers you seek often come in whispers. Still your mind to hear the guidance of the Universe.",
  "Your thoughts create your reality. Choose them wisely, for the Universe responds to the energy you emit.",
  "Sometimes letting go is the most powerful action you can take. Release what no longer serves you, and make space for new blessings.",
  "The Universe speaks through synchronicities. Pay attention to the signs and patterns appearing in your life.",
]

// Mock inspirational quotes
const inspirationalQuotes = [
  '"The Universe is not outside of you. Look inside yourself; everything that you want, you already are." — Rumi',
  '"We are all connected; To each other, biologically. To the earth, chemically. To the rest of the universe atomically." — Neil deGrasse Tyson',
  '"You are the universe, expressing itself as a human for a little while." — Eckhart Tolle',
  '"When you want something, all the universe conspires in helping you to achieve it." — Paulo Coelho',
  '"Look deep into nature, and then you will understand everything better." — Albert Einstein',
]

type Message = {
  id: string
  content: string
  sender: "user" | "universe"
  timestamp: Date
  isQuote?: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Welcome to Ask Universe Guide. I am the voice of the Universe, here to provide guidance on your spiritual journey. What would you like to ask? You may ask up to three questions in this session.",
      sender: "universe",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [questionCount, setQuestionCount] = useState(0)
  const [isThinking, setIsThinking] = useState(false)
  const [sessionEnded, setSessionEnded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim() || questionCount >= 3 || sessionEnded) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsThinking(true)
    setQuestionCount((prev) => prev + 1)

    // Simulate Universe thinking and responding
    setTimeout(() => {
      // Get random response
      const randomResponse = universeResponses[Math.floor(Math.random() * universeResponses.length)]

      // Add Universe response
      const universeMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "universe",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, universeMessage])

      // Add inspirational quote after the last question
      if (questionCount === 2) {
        setTimeout(() => {
          const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]
          const quoteMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: randomQuote,
            sender: "universe",
            timestamp: new Date(),
            isQuote: true,
          }
          setMessages((prev) => [...prev, quoteMessage])
          setSessionEnded(true)
        }, 1000)
      }

      setIsThinking(false)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startNewSession = () => {
    setMessages([
      {
        id: "welcome-new",
        content:
          "Welcome to a new session. What would you like to ask? You may ask up to three questions in this session.",
        sender: "universe",
        timestamp: new Date(),
      },
    ])
    setQuestionCount(0)
    setSessionEnded(false)
  }

  const shareQuote = (quote: string) => {
    // In a real implementation, this would integrate with the Web Share API
    // or copy to clipboard functionality
    alert(`Sharing quote: ${quote}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 shadow-xl overflow-hidden">
          {/* Chat header */}
          <div className="bg-indigo-900/70 p-4 border-b border-indigo-800 flex items-center justify-between">
            <div className="flex items-center">
              <Stars className="h-6 w-6 text-yellow-300 mr-2" />
              <h1 className="text-xl font-bold text-white">Universe Guide</h1>
            </div>
            <Badge variant="outline" className="bg-indigo-800/50 text-purple-200 border-purple-700">
              Question {questionCount} of 3
            </Badge>
          </div>

          {/* Chat messages */}
          <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <Avatar
                      className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"} ${message.sender === "universe" ? "bg-indigo-700" : "bg-purple-600"}`}
                    >
                      {message.sender === "universe" ? (
                        <Stars className="h-4 w-4 text-yellow-300" />
                      ) : (
                        <div className="h-full w-full rounded-full bg-purple-600" />
                      )}
                    </Avatar>

                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-purple-600 text-white"
                          : message.isQuote
                            ? "bg-indigo-800/70 border border-yellow-500/30 text-yellow-100 italic"
                            : "bg-indigo-800/50 text-white"
                      }`}
                    >
                      <p>{message.content}</p>
                      {message.isQuote && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-yellow-300 hover:text-yellow-100 hover:bg-indigo-700/50 p-1 h-auto"
                          onClick={() => shareQuote(message.content)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          <span className="text-xs">Share Quote</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex">
                    <Avatar className="h-8 w-8 mr-2 bg-indigo-700">
                      <Stars className="h-4 w-4 text-yellow-300" />
                    </Avatar>
                    <div className="p-3 rounded-lg bg-indigo-800/50 text-white flex items-center">
                      <div className="flex space-x-1">
                        <span className="animate-bounce delay-0">•</span>
                        <span className="animate-bounce delay-150">•</span>
                        <span className="animate-bounce delay-300">•</span>
                      </div>
                      <span className="ml-2 text-sm text-purple-200">The Universe is contemplating...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-indigo-800 bg-indigo-900/40">
            {!sessionEnded ? (
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={questionCount >= 3 ? "You have asked all 3 questions" : "Ask the Universe..."}
                  disabled={questionCount >= 3 || isThinking}
                  className="bg-indigo-800/30 border-indigo-700 text-white placeholder:text-purple-300"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || questionCount >= 3 || isThinking}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-purple-200 mb-3">Your session has ended. The Universe has shared its wisdom.</p>
                <Button
                  onClick={startNewSession}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Start New Session
                </Button>
              </div>
            )}

            <div className="mt-2 text-xs text-center text-purple-300">
              {questionCount < 3 && !sessionEnded ? (
                <p>
                  You have {3 - questionCount} question{3 - questionCount !== 1 ? "s" : ""} remaining in this session
                </p>
              ) : sessionEnded ? (
                <p>Thank you for connecting with the Universe</p>
              ) : (
                <p>You have asked all your questions for this session</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

