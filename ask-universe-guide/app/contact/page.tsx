"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Send, Mail, Phone, MapPin } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll respond to your inquiry soon.",
      })
      form.reset()
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-yellow-300 rounded-full"></div>
          </div>
          <p className="text-purple-200 mt-4 max-w-2xl mx-auto">
            Have questions about Ask Universe Guide? We're here to help. Send us a message and we'll respond as soon as
            possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="bg-purple-800/50 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-200">Email</h3>
                  <p className="text-purple-300">support@askuniverse.com</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="bg-purple-800/50 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-200">Phone</h3>
                  <p className="text-purple-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-800/50 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <MapPin className="h-5 w-5 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-200">Location</h3>
                  <p className="text-purple-300">Cosmic Center, Universe Way</p>
                </div>
              </div>
            </Card>

            <Card className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 p-6 shadow-xl">
              <h3 className="text-lg font-medium text-purple-200 mb-3">Response Time</h3>
              <p className="text-purple-100">
                We strive to respond to all inquiries within 24-48 hours during business days. For urgent matters,
                please include "Urgent" in your subject line.
              </p>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800 p-6 shadow-xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-purple-200">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="bg-indigo-800/30 border-indigo-700 text-white placeholder:text-purple-300"
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-purple-200">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email"
                              type="email"
                              {...field}
                              className="bg-indigo-800/30 border-indigo-700 text-white placeholder:text-purple-300"
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-200">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Message subject"
                            {...field}
                            className="bg-indigo-800/30 border-indigo-700 text-white placeholder:text-purple-300"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-200">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            {...field}
                            rows={6}
                            className="bg-indigo-800/30 border-indigo-700 text-white placeholder:text-purple-300 resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

