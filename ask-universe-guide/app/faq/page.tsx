import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-yellow-300 rounded-full"></div>
          </div>
          <p className="text-purple-200 mt-4 max-w-2xl mx-auto">
            Find answers to common questions about Ask Universe Guide and how to make the most of your spiritual
            guidance experience.
          </p>
        </div>

        <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 rounded-lg shadow-xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-indigo-800">
              <AccordionTrigger className="px-6 py-4 text-purple-100 hover:text-white hover:bg-indigo-800/50">
                Why can I only ask three questions per session?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-purple-200 bg-indigo-900/20">
                <p>
                  The three-question limit serves multiple purposes. First, it encourages thoughtful, focused questions
                  rather than a scattered approach. Second, the number three holds spiritual significance across many
                  traditions, representing completeness and balance. Finally, this limitation helps you reflect more
                  deeply on each response, rather than rushing through many questions without fully absorbing the
                  guidance.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-indigo-800">
              <AccordionTrigger className="px-6 py-4 text-purple-100 hover:text-white hover:bg-indigo-800/50">
                How does the Universe Guide bot work?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-purple-200 bg-indigo-900/20">
                <p>
                  Our spiritual guidance bot draws from universal wisdom and spiritual principles that transcend
                  individual traditions. It's designed to provide reflective, thought-provoking responses that help you
                  connect with your inner wisdom. While technology facilitates this connection, the true insights come
                  from your own reflection on the guidance provided.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-indigo-800">
              <AccordionTrigger className="px-6 py-4 text-purple-100 hover:text-white hover:bg-indigo-800/50">
                What types of questions should I ask?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-purple-200 bg-indigo-900/20">
                <p>
                  The most meaningful guidance comes from questions about your spiritual journey, personal growth, or
                  understanding your life's purpose. Open-ended questions often yield more insightful responses than
                  yes/no questions. Consider questions like "What should I focus on for my spiritual growth right now?"
                  or "How can I better understand my current life challenges?"
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-indigo-800">
              <AccordionTrigger className="px-6 py-4 text-purple-100 hover:text-white hover:bg-indigo-800/50">
                Can I save or share the guidance I receive?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-purple-200 bg-indigo-900/20">
                <p>
                  Yes! Inspirational quotes can be shared directly from the chat interface. For the full conversation,
                  we recommend creating an account, which allows you to save your sessions for future reference. You can
                  also manually copy and paste responses into your personal journal for deeper reflection.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-indigo-800">
              <AccordionTrigger className="px-6 py-4 text-purple-100 hover:text-white hover:bg-indigo-800/50">
                Is Ask Universe Guide affiliated with any specific spiritual tradition?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-purple-200 bg-indigo-900/20">
                <p>
                  No, Ask Universe Guide is not affiliated with any specific religion or spiritual tradition. Our
                  approach draws from universal wisdom that transcends individual belief systems. We welcome users from
                  all spiritual backgrounds and traditions, as well as those who are simply seeking guidance without a
                  specific spiritual framework.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-indigo-800">
              <AccordionTrigger className="px-6 py-4 text-purple-100 hover:text-white hover:bg-indigo-800/50">
                How often should I use Ask Universe Guide?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-purple-200 bg-indigo-900/20">
                <p>
                  This varies by individual. Some find value in daily reflection, while others prefer to consult the
                  Universe Guide during significant life moments or decisions. We recommend using the service when you
                  feel the need for guidance, clarity, or perspective. The quality of your engagement is more important
                  than the frequency.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="px-6 py-4 text-purple-100 hover:text-white hover:bg-indigo-800/50">
                Can I use Ask Universe Guide in languages other than English?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-purple-200 bg-indigo-900/20">
                <p>
                  Currently, our primary language is English, but we do support Hinglish (a blend of Hindi and English)
                  for our users in India and elsewhere. We're working on expanding our language capabilities to make
                  universal wisdom accessible to more people around the world.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Still Have Questions?</h2>
          <p className="text-purple-200 mb-6">
            If you couldn't find the answer you were looking for, please reach out to us directly.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg shadow-purple-900/30"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  )
}

