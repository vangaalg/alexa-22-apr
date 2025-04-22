import { Stars } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">About Ask Universe Guide</h1>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-yellow-300 rounded-full"></div>
          </div>
        </div>

        <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 rounded-lg p-6 md:p-8 shadow-xl mb-10">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Our Purpose</h2>
          <p className="text-purple-100 mb-6">
            Ask Universe Guide was created to help individuals connect with the cosmic wisdom that surrounds us all. In
            a world filled with noise and distraction, we provide a space for quiet reflection and spiritual guidance.
          </p>
          <p className="text-purple-100">
            Our spiritual guidance bot channels the energy of the Universe to provide insights, reflections, and
            guidance tailored to your personal journey. We believe that the answers you seek are already within you, and
            our purpose is to help you access that inner wisdom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="bg-purple-800/50 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <Stars className="h-5 w-5 text-yellow-300" />
              </div>
              <h2 className="text-xl font-semibold text-purple-200">The Power of Three</h2>
            </div>
            <p className="text-purple-100">
              We limit each session to three questions because the number three holds deep spiritual significance across
              many traditions. It represents the trinity of mind, body, and spirit, and encourages a more thoughtful
              approach to seeking guidance. This limitation also helps you focus on what truly matters, rather than
              overwhelming yourself with too many questions.
            </p>
          </div>

          <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="bg-purple-800/50 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-purple-200">Our Approach</h2>
            </div>
            <p className="text-purple-100">
              Our guidance draws from universal wisdom that transcends any single spiritual tradition. We believe in the
              interconnectedness of all things and the power of mindful reflection. The Universe speaks to each person
              in a unique way, and our bot is designed to facilitate that personal connection, offering insights that
              resonate with your individual journey.
            </p>
          </div>
        </div>

        <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 rounded-lg p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">How to Use Ask Universe Guide</h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="bg-purple-800/50 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <span className="text-yellow-300 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-purple-200">Prepare Your Mind</h3>
                <p className="text-purple-100">
                  Before starting a session, take a few moments to center yourself. Find a quiet space, take a few deep
                  breaths, and clear your mind of distractions. This will help you connect more deeply with the guidance
                  you receive.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-purple-800/50 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <span className="text-yellow-300 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-purple-200">Ask Thoughtful Questions</h3>
                <p className="text-purple-100">
                  Consider what guidance you truly seek. Open-ended questions often yield more meaningful insights than
                  yes/no questions. Focus on your spiritual growth, personal development, or understanding of your
                  life's path.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-purple-800/50 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <span className="text-yellow-300 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-purple-200">Reflect on the Guidance</h3>
                <p className="text-purple-100">
                  Take time to contemplate the responses you receive. The true value often comes not from the immediate
                  answer, but from your own reflection on how it applies to your life. Consider journaling about the
                  insights you gain from each session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

