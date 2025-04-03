'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoveRight, Stars } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E1B2E] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="text-yellow-300 text-2xl">✧</div>
          <Link href="/" className="text-xl font-semibold text-white">
            Ask Universe
          </Link>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/" className="text-gray-200 hover:text-white">Home</Link>
          <Link href="/about" className="text-gray-200 hover:text-white">About</Link>
          <Link href="/faqs" className="text-gray-200 hover:text-white">FAQs</Link>
          <Link href="/meditation" className="text-gray-200 hover:text-white">Meditation</Link>
          <Link href="/contact" className="text-gray-200 hover:text-white">Contact</Link>
          <Button asChild className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <Link href="/chat">Start Chat</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 mt-32">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
          Ask Universe Guide
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-12">
          Connect with the wisdom of the Universe and receive spiritual guidance for your journey
        </p>
        <Button asChild size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
          <Link href="/chat" className="inline-flex items-center gap-2">
            Start Your Conversation
            <MoveRight className="h-5 w-5" />
          </Link>
        </Button>
        
        <p className="text-gray-400 mt-8">
          Ask up to three questions per session and receive guidance from the Universe
        </p>
        
        <Link 
          href="#learn-more"
          className="text-gray-400 mt-16 flex flex-col items-center hover:text-white transition-colors"
        >
          Learn More
          <span className="text-2xl mt-2">↓</span>
        </Link>
      </main>

      {/* About Section */}
      <section id="learn-more" className="py-20 px-4 bg-indigo-950/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-300">
            Connect with the Universe
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-indigo-900/30 p-6 rounded-lg backdrop-blur-sm border border-indigo-800">
              <h3 className="text-xl font-semibold mb-4 text-purple-200">How It Works</h3>
              <p className="text-purple-100">
                Ask Universe Guide allows you to pose three questions per session to the Universe. Our spiritual
                guidance bot channels cosmic wisdom to provide you with insights, reflections, and guidance on your
                spiritual journey.
              </p>
            </div>

            <div className="bg-indigo-900/30 p-6 rounded-lg backdrop-blur-sm border border-indigo-800">
              <h3 className="text-xl font-semibold mb-4 text-purple-200">Why Three Questions?</h3>
              <p className="text-purple-100">
                The number three holds spiritual significance across many traditions. By limiting each session to three
                questions, we encourage thoughtful reflection and deeper connection with the guidance you receive.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-indigo-700 hover:bg-indigo-800">
              <Link href="/chat">Begin Your Spiritual Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-300">Features</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-sm border border-purple-800 text-center">
              <div className="bg-purple-800/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stars className="h-6 w-6 text-yellow-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-200">Universal Wisdom</h3>
              <p className="text-purple-100">
                Receive guidance that draws from cosmic intelligence and spiritual traditions
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-sm border border-purple-800 text-center">
              <div className="bg-purple-800/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-200">Intuitive Chat</h3>
              <p className="text-purple-100">Simple, distraction-free interface that focuses on your conversation</p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-sm border border-purple-800 text-center">
              <div className="bg-purple-800/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-200">Inspirational Quotes</h3>
              <p className="text-purple-100">Receive and share cosmic wisdom through beautifully formatted quotes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

