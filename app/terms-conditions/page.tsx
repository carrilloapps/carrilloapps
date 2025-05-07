import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms & Conditions | Senior Software Developer & Tech Leader",
  description: "Terms and conditions for using the DevLeader portfolio website.",
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

          <Card className="bg-zinc-900 border-zinc-800 p-6 md:p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p className="text-zinc-400">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <p className="text-zinc-400">
                Welcome to DevLeader. These terms and conditions outline the rules and regulations for the use of my
                website, located at devleader.com.
              </p>
              <p className="text-zinc-400">
                By accessing this website, I assume you accept these terms and conditions in full. Do not continue to
                use DevLeader if you do not agree to all the terms and conditions stated on this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Intellectual Property Rights</h2>
              <p className="text-zinc-400">
                Unless otherwise stated, I own the intellectual property rights for all material on DevLeader. All
                intellectual property rights are reserved. You may access this from DevLeader for your own personal use
                subjected to restrictions set in these terms and conditions.
              </p>
              <p className="text-zinc-400">You must not:</p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>Republish material from DevLeader</li>
                <li>Sell, rent or sub-license material from DevLeader</li>
                <li>Reproduce, duplicate or copy material from DevLeader</li>
                <li>Redistribute content from DevLeader</li>
              </ul>
              <p className="text-zinc-400">
                Parts of this website offer an opportunity for users to share their projects or ideas. I do not filter,
                edit, publish or review comments prior to their presence on the website. Comments do not reflect my
                views and opinions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Content Liability</h2>
              <p className="text-zinc-400">
                I shall not be held responsible for any content that appears on your website. You agree to protect and
                defend me against all claims that arise on your website. No link(s) should appear on any website that
                may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or
                advocates the infringement or other violation of, any third party rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Reservation of Rights</h2>
              <p className="text-zinc-400">
                I reserve the right to request that you remove all links or any particular link to my website. You
                approve to immediately remove all links to my website upon request. I also reserve the right to amend
                these terms and conditions and its linking policy at any time. By continuously linking to my website,
                you agree to be bound to and follow these linking terms and conditions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Removal of Links from My Website</h2>
              <p className="text-zinc-400">
                If you find any link on my website that is offensive for any reason, you are free to contact and inform
                me any moment. I will consider requests to remove links but I am not obligated to do so or to respond to
                you directly.
              </p>
              <p className="text-zinc-400">
                I do not ensure that the information on this website is correct, I do not warrant its completeness or
                accuracy; nor do I promise to ensure that the website remains available or that the material on the
                website is kept up to date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Disclaimer</h2>
              <p className="text-zinc-400">
                To the maximum extent permitted by applicable law, I exclude all representations, warranties, and
                conditions relating to my website and the use of this website. Nothing in this disclaimer will:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>Limit or exclude my or your liability for death or personal injury;</li>
                <li>Limit or exclude my or your liability for fraud or fraudulent misrepresentation;</li>
                <li>Limit any of my or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>Exclude any of my or your liabilities that may not be excluded under applicable law.</li>
              </ul>
              <p className="text-zinc-400">
                The limitations and prohibitions of liability set in this section and elsewhere in this disclaimer: (a)
                are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer,
                including liabilities arising in contract, in tort and for breach of statutory duty.
              </p>
              <p className="text-zinc-400">
                As long as the website and the information and services on the website are provided free of charge, I
                will not be liable for any loss or damage of any nature.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="text-zinc-400">
                If you have any questions about these Terms and Conditions, please contact me at:
              </p>
              <p className="text-zinc-400">Email: legal@devleader.com</p>
            </section>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
