import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Senior Software Developer & Tech Leader",
  description: "Get in touch with me to discuss your project or potential collaboration opportunities.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12">
        <section className="py-12 md:py-24 space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get In Touch</h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        First name
                      </label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Last name
                      </label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="Project Inquiry"
                      className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Feel free to reach out through any of these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Email</p>
                      <p className="text-zinc-400">contact@devleader.com</p>
                      <p className="text-zinc-500 text-sm">Typically responds within 24 hours</p>
                    </div>
                  </div>
                  <Separator className="my-4 bg-zinc-800" />
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Phone</p>
                      <p className="text-zinc-400">+1 (555) 123-4567</p>
                      <p className="text-zinc-500 text-sm">Available Mon-Fri, 9AM-5PM EST</p>
                    </div>
                  </div>
                  <Separator className="my-4 bg-zinc-800" />
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Location</p>
                      <p className="text-zinc-400">San Francisco, CA</p>
                      <p className="text-zinc-500 text-sm">Available for remote work worldwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Connect With Me</CardTitle>
                  <CardDescription>Follow me on social media or check out my work.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <a
                      href="https://github.com/carrilloapps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                      <Mail className="h-8 w-8 mb-2" />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                      <Phone className="h-8 w-8 mb-2" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                      <MapPin className="h-8 w-8 mb-2" />
                      <span className="text-sm">Twitter</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Here are some common questions I receive. If you don't find your answer, feel free to contact me directly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">What services do you offer?</h3>
                <p className="text-zinc-400">
                  I specialize in financial software development, technical leadership, architecture design, and
                  backoffice automation solutions. I can help with both development and strategic technical guidance.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Do you work with international clients?</h3>
                <p className="text-zinc-400">
                  Yes, I work with clients globally. With modern collaboration tools and flexible scheduling, I can
                  accommodate different time zones and work arrangements.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">What is your typical project timeline?</h3>
                <p className="text-zinc-400">
                  Project timelines vary based on scope and complexity. Small projects might take 2-4 weeks, while
                  larger enterprise solutions can span several months. I provide detailed timelines during initial
                  consultations.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">How do you handle project management?</h3>
                <p className="text-zinc-400">
                  I use agile methodologies with regular check-ins and progress updates. I'm flexible with tools like
                  Jira, Trello, or Asana based on your preferences, ensuring transparent communication throughout.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
