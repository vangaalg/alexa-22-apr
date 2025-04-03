import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MeditationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Meditation Resources</h1>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-yellow-300 rounded-full"></div>
          </div>
          <p className="text-purple-200 mt-4 max-w-2xl mx-auto">
            Enhance your spiritual journey with these meditation practices and resources. Regular meditation can help
            you better connect with the Universe's guidance.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-6">Beginner Meditation Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 p-6 shadow-xl">
              <h3 className="text-xl font-medium text-purple-200 mb-3">Breath Awareness Meditation</h3>
              <p className="text-purple-100 mb-4">
                This simple practice focuses on your breath, helping to calm the mind and center your awareness in the
                present moment.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-purple-200 mb-4">
                <li>Find a comfortable seated position</li>
                <li>Close your eyes and take a few deep breaths</li>
                <li>Allow your breath to return to its natural rhythm</li>
                <li>Focus your attention on the sensation of breathing</li>
                <li>When your mind wanders, gently bring it back to your breath</li>
                <li>Practice for 5-10 minutes daily</li>
              </ol>
              <p className="text-purple-300 text-sm italic">Ideal for: Beginners, stress reduction, improving focus</p>
            </Card>

            <Card className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 p-6 shadow-xl">
              <h3 className="text-xl font-medium text-purple-200 mb-3">Loving-Kindness Meditation</h3>
              <p className="text-purple-100 mb-4">
                This practice cultivates feelings of love, compassion, and goodwill toward yourself and others.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-purple-200 mb-4">
                <li>Sit comfortably and close your eyes</li>
                <li>Begin by focusing on your heart center</li>
                <li>Silently repeat phrases like "May I be happy, may I be peaceful"</li>
                <li>Extend these wishes to loved ones, then to all beings</li>
                <li>Notice the feelings that arise as you practice</li>
                <li>Practice for 10-15 minutes</li>
              </ol>
              <p className="text-purple-300 text-sm italic">
                Ideal for: Developing compassion, healing relationships, emotional balance
              </p>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-6">Intermediate Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 p-6 shadow-xl">
              <h3 className="text-xl font-medium text-purple-200 mb-3">Cosmic Connection Meditation</h3>
              <p className="text-purple-100 mb-4">
                This meditation helps you feel your connection to the universe and all living beings.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-purple-200 mb-4">
                <li>Find a quiet space where you won't be disturbed</li>
                <li>Sit or lie down comfortably</li>
                <li>Visualize yourself as a point of light</li>
                <li>Imagine this light expanding beyond your body</li>
                <li>Feel your connection to the earth, sky, and all beings</li>
                <li>Rest in the awareness of universal connection</li>
                <li>Practice for 15-20 minutes</li>
              </ol>
              <p className="text-purple-300 text-sm italic">
                Ideal for: Spiritual growth, overcoming isolation, developing universal awareness
              </p>
            </Card>

            <Card className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 p-6 shadow-xl">
              <h3 className="text-xl font-medium text-purple-200 mb-3">Intuition Development Meditation</h3>
              <p className="text-purple-100 mb-4">
                This practice helps you tune into your inner wisdom and strengthen your intuitive abilities.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-purple-200 mb-4">
                <li>Begin with 5 minutes of breath awareness</li>
                <li>Place your hands over your heart center</li>
                <li>Ask yourself a question you seek guidance on</li>
                <li>Listen for the subtle responses that arise</li>
                <li>Notice sensations, images, or thoughts that emerge</li>
                <li>Journal about your experience afterward</li>
                <li>Practice regularly to strengthen your intuition</li>
              </ol>
              <p className="text-purple-300 text-sm italic">
                Ideal for: Developing intuition, decision-making, spiritual guidance
              </p>
            </Card>
          </div>
        </div>

        <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 rounded-lg p-6 shadow-xl mb-12">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Recommended Resources</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-purple-200 mb-2">Books</h3>
              <ul className="list-disc list-inside space-y-1 text-purple-100">
                <li>"The Miracle of Mindfulness" by Thich Nhat Hanh</li>
                <li>"Wherever You Go, There You Are" by Jon Kabat-Zinn</li>
                <li>"The Universe Has Your Back" by Gabrielle Bernstein</li>
                <li>"Meditation for Beginners" by Jack Kornfield</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-purple-200 mb-2">Apps</h3>
              <ul className="list-disc list-inside space-y-1 text-purple-100">
                <li>Insight Timer - Free meditation timer and guided meditations</li>
                <li>Calm - Sleep, meditation, and relaxation app</li>
                <li>Headspace - Guided meditation and mindfulness practices</li>
                <li>Waking Up - Meditation and mindfulness with a scientific approach</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-purple-200 mb-2">Online Courses</h3>
              <ul className="list-disc list-inside space-y-1 text-purple-100">
                <li>Mindfulness-Based Stress Reduction (MBSR) online courses</li>
                <li>Sounds True's "The Power of Awareness" with Tara Brach and Jack Kornfield</li>
                <li>Deepak Chopra's 21-Day Meditation Experiences</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-purple-200 mb-6">
            Ready to apply your meditation practice to receive guidance from the Universe?
          </p>
          <Link href="/chat">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg shadow-purple-900/30">
              Start Your Conversation
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

