import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
  title: 'FAQ - DevPlatform',
  description: 'Frequently asked questions about DevPlatform.',
}

const faqs = [
  {
    question: "What is DevPlatform?",
    answer: "DevPlatform is a comprehensive development platform that provides tools and services for building modern web applications. It includes features for code collaboration, deployment, and monitoring."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Sign up for an account, follow our quick start guide in the documentation, and you'll be up and running in minutes."
  },
  {
    question: "What programming languages are supported?",
    answer: "We support all major programming languages including JavaScript/TypeScript, Python, Ruby, Go, and more. Check our documentation for the full list."
  },
  {
    question: "How much does it cost?",
    answer: "We offer various pricing tiers starting with a free plan for individuals and small teams. Visit our pricing page for detailed information about our plans."
  },
  {
    question: "Do you offer enterprise solutions?",
    answer: "Yes, we offer enterprise solutions with additional features, dedicated support, and custom pricing. Contact our sales team for more information."
  }
]

export default function FaqPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Find answers to common questions about DevPlatform.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

