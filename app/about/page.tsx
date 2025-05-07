import Image from "next/image"
import { ArrowRight, Award, BookOpen, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Me | Senior Software Developer & Tech Leader",
  description: "Learn more about my journey, expertise, and approach to software development and technical leadership.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-24">
        {/* Hero Section */}
        <section className="py-12 md:py-24 space-y-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  About Me
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The Story Behind the Code</h1>
                <p className="text-xl text-zinc-400">My journey as a developer and tech leader</p>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                With over a decade of experience in the tech industry, I've dedicated my career to building robust
                financial systems and leading technical teams to success. My passion lies in solving complex problems
                and creating software that makes a real difference in how businesses operate.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                As a tech leader, I believe in fostering a culture of innovation, continuous learning, and
                collaboration. I'm committed to mentoring the next generation of developers and creating sustainable,
                scalable software solutions.
              </p>
              <div className="flex gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Download Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-900">
                  Contact Me
                </Button>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Professional headshot"
                width={600}
                height={600}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* My Journey Section */}
        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              My Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Professional Timeline</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              From coding enthusiast to tech leader - the key milestones that shaped my career
            </p>
          </div>

          <div className="relative border-l border-zinc-800 ml-3 md:ml-6 pl-6 md:pl-10 space-y-10">
            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">2020 - Present</Badge>
                  <h3 className="text-xl font-bold">Tech Leader at FinTech Solutions Inc.</h3>
                </div>
                <p className="text-zinc-400">
                  Leading a team of 12 developers building enterprise financial systems. Implemented microservices
                  architecture that improved system reliability by 40%. Mentored junior developers and established
                  technical career paths within the organization.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Leadership
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Architecture
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Mentoring
                  </Badge>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">2017 - 2020</Badge>
                  <h3 className="text-xl font-bold">Senior Developer at Global Banking Solutions</h3>
                </div>
                <p className="text-zinc-400">
                  Developed core banking modules handling $2B in daily transactions. Optimized database queries
                  resulting in 60% faster processing times. Led the migration from monolithic architecture to
                  microservices, improving system scalability and reliability.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Banking Systems
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Performance
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Architecture
                  </Badge>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">2014 - 2017</Badge>
                  <h3 className="text-xl font-bold">Software Engineer at Tech Innovations Ltd</h3>
                </div>
                <p className="text-zinc-400">
                  Built payment processing systems handling 1M+ transactions daily. Implemented fraud detection
                  algorithms reducing fraud by 35%. Collaborated with cross-functional teams to deliver integrated
                  financial solutions for enterprise clients.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Payments
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Security
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Algorithms
                  </Badge>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">2010 - 2014</Badge>
                  <h3 className="text-xl font-bold">Junior Developer at StartUp Ventures</h3>
                </div>
                <p className="text-zinc-400">
                  Started my professional journey building web applications and internal tools. Worked on a variety of
                  projects from e-commerce platforms to data visualization tools. Developed a passion for clean code and
                  user-centered design.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Web Development
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    UI/UX
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Startups
                  </Badge>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">2006 - 2010</Badge>
                  <h3 className="text-xl font-bold">Computer Science Degree, Stanford University</h3>
                </div>
                <p className="text-zinc-400">
                  Graduated with honors in Computer Science with a focus on software engineering and distributed
                  systems. Participated in research projects on financial algorithms and secure transaction processing.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Education
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Research
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Foundations
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              My Philosophy
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Development Approach</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              The core principles that guide my work as a developer and tech leader
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Quality First</h3>
                <p className="text-zinc-400">
                  I believe that quality code is not just about working functionality, but about maintainability,
                  readability, and scalability. I prioritize writing clean, well-tested code that stands the test of
                  time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">User-Centered</h3>
                <p className="text-zinc-400">
                  Technical excellence must serve real user needs. I approach every project with a deep understanding of
                  the end users, ensuring that the solutions I build solve real problems effectively.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Continuous Learning</h3>
                <p className="text-zinc-400">
                  The tech landscape evolves rapidly, and I'm committed to staying at the forefront. I dedicate time to
                  learning new technologies, methodologies, and best practices to deliver cutting-edge solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Personal Interests */}
        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Beyond Code
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Personal Interests</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              When I'm not coding or leading tech teams, here's what keeps me inspired
            </p>
          </div>

          <Tabs defaultValue="hobbies" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto bg-zinc-900 p-1">
              <TabsTrigger value="hobbies" className="data-[state=active]:bg-zinc-800">
                Hobbies
              </TabsTrigger>
              <TabsTrigger value="reading" className="data-[state=active]:bg-zinc-800">
                Reading
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-zinc-800">
                Community
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hobbies" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                  <div className="aspect-video bg-zinc-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl">🏔️</div>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Hiking & Outdoor Adventures</h3>
                    <p className="text-zinc-400">
                      I find that disconnecting from technology and connecting with nature helps me maintain perspective
                      and creativity. I've hiked in over 20 national parks and am always planning my next adventure.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                  <div className="aspect-video bg-zinc-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl">🎸</div>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Music Production</h3>
                    <p className="text-zinc-400">
                      Playing guitar and producing electronic music is my creative outlet. The process of composing and
                      mixing tracks has surprising parallels to software development - both require attention to detail
                      and creative problem-solving.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reading" className="mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-bold">My Bookshelf</h3>
                  <p className="text-zinc-400">
                    Reading is how I continue to grow both professionally and personally. Here are some books that have
                    significantly influenced my thinking:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">Technical Reads</h4>
                      <ul className="mt-2 space-y-2 text-zinc-400">
                        <li>• "Clean Code" by Robert C. Martin</li>
                        <li>• "Designing Data-Intensive Applications" by Martin Kleppmann</li>
                        <li>• "The Phoenix Project" by Gene Kim</li>
                        <li>• "Accelerate" by Nicole Forsgren, Jez Humble, and Gene Kim</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">Leadership & Business</h4>
                      <ul className="mt-2 space-y-2 text-zinc-400">
                        <li>• "The Five Dysfunctions of a Team" by Patrick Lencioni</li>
                        <li>• "Radical Candor" by Kim Scott</li>
                        <li>• "The Lean Startup" by Eric Ries</li>
                        <li>• "High Output Management" by Andrew Grove</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">Philosophy & Thinking</h4>
                      <ul className="mt-2 space-y-2 text-zinc-400">
                        <li>• "Thinking, Fast and Slow" by Daniel Kahneman</li>
                        <li>• "Antifragile" by Nassim Nicholas Taleb</li>
                        <li>• "Mindset" by Carol Dweck</li>
                        <li>• "Deep Work" by Cal Newport</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-bold">Community Involvement</h3>
                  <p className="text-zinc-400">
                    I believe in giving back to the tech community and supporting the next generation of developers.
                    Here's how I'm involved:
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">Mentorship Programs</h4>
                      <p className="mt-2 text-zinc-400">
                        I regularly mentor junior developers through structured programs and informal relationships,
                        helping them navigate their career paths and technical challenges.
                      </p>
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">Open Source Contributions</h4>
                      <p className="mt-2 text-zinc-400">
                        I contribute to several open source projects in the financial technology space, helping build
                        tools that benefit the wider developer community.
                      </p>
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">Tech Talks & Workshops</h4>
                      <p className="mt-2 text-zinc-400">
                        I speak at local meetups and conferences about financial software architecture, leadership, and
                        career development in tech.
                      </p>
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">STEM Education</h4>
                      <p className="mt-2 text-zinc-400">
                        I volunteer with programs that introduce coding and technology concepts to underrepresented
                        groups in tech, helping to build a more diverse industry.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Call to Action */}
        <section className="py-12">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Let's Work Together</h2>
              <p className="text-white/90 max-w-2xl mx-auto text-lg">
                Whether you need technical leadership, architecture expertise, or development support for your financial
                or backoffice systems, I'm here to help turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                  Contact Me
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View My Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
