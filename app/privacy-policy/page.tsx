import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | Senior Software Developer & Tech Leader",
  description: "Privacy policy outlining how your data is collected, used, and protected.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <Card className="bg-zinc-900 border-zinc-800 p-6 md:p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p className="text-zinc-400">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <p className="text-zinc-400">
                Thank you for visiting my professional portfolio website. I respect your privacy and am committed to
                protecting your personal data. This privacy policy will inform you about how I look after your personal
                data when you visit my website and tell you about your privacy rights and how the law protects you.
              </p>
              <p className="text-zinc-400">
                This policy applies to information I collect through my website at devleader.com, in email, text, or
                other electronic messages between you and this website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Information I Collect</h2>
              <p className="text-zinc-400">
                I may collect several types of information from and about users of my website, including:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>
                  Personal information you provide directly when you fill out forms on my website, including your name,
                  email address, and any messages you send me through the contact form.
                </li>
                <li>
                  Information about your internet connection, the equipment you use to access my website, and usage
                  details.
                </li>
                <li>
                  Non-personal identification information, including browser name, type of computer, and technical
                  information about your means of connection to my website.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">How I Use Your Information</h2>
              <p className="text-zinc-400">
                I use information that I collect about you or that you provide to me, including any personal
                information:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>To present my website and its contents to you.</li>
                <li>To respond to your inquiries and provide you with information that you request from me.</li>
                <li>To fulfill any other purpose for which you provide it.</li>
                <li>To carry out my obligations and enforce my rights.</li>
                <li>In any other way I may describe when you provide the information.</li>
                <li>For any other purpose with your consent.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Cookies and Tracking Technologies</h2>
              <p className="text-zinc-400">
                My website uses cookies and similar tracking technologies to track the activity on my website and hold
                certain information. Cookies are files with a small amount of data which may include an anonymous unique
                identifier.
              </p>
              <p className="text-zinc-400">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                if you do not accept cookies, you may not be able to use some portions of my website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Data Security</h2>
              <p className="text-zinc-400">
                I have implemented measures designed to secure your personal information from accidental loss and from
                unauthorized access, use, alteration, and disclosure. However, the transmission of information via the
                internet is not completely secure, and I cannot guarantee the security of your personal information
                transmitted to my website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Third-Party Links</h2>
              <p className="text-zinc-400">
                My website may contain links to third-party websites, plugins, and applications. Clicking on those links
                or enabling those connections may allow third parties to collect or share data about you. I do not
                control these third-party websites and am not responsible for their privacy statements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
              <p className="text-zinc-400">
                I may update this privacy policy from time to time. I will notify you of any changes by posting the new
                privacy policy on this page and updating the "Last Updated" date.
              </p>
              <p className="text-zinc-400">
                You are advised to review this privacy policy periodically for any changes. Changes to this privacy
                policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="text-zinc-400">
                If you have any questions about this privacy policy or my data practices, please contact me at:
              </p>
              <p className="text-zinc-400">Email: privacy@devleader.com</p>
            </section>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
