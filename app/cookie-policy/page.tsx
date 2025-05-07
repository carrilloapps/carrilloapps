import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Cookie Policy | Senior Software Developer & Tech Leader",
  description: "Cookie policy explaining how cookies are used on the DevLeader portfolio website.",
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

          <Card className="bg-zinc-900 border-zinc-800 p-6 md:p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p className="text-zinc-400">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <p className="text-zinc-400">
                This Cookie Policy explains how DevLeader ("I", "me", or "my") uses cookies and similar technologies to
                recognize you when you visit my website at devleader.com. It explains what these technologies are and
                why I use them, as well as your rights to control my use of them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">What Are Cookies?</h2>
              <p className="text-zinc-400">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                Cookies are widely used by website owners in order to make their websites work, or to work more
                efficiently, as well as to provide reporting information.
              </p>
              <p className="text-zinc-400">
                Cookies set by the website owner (in this case, DevLeader) are called "first-party cookies". Cookies set
                by parties other than the website owner are called "third-party cookies". Third-party cookies enable
                third-party features or functionality to be provided on or through the website (e.g., advertising,
                interactive content, and analytics). The parties that set these third-party cookies can recognize your
                computer both when it visits the website in question and also when it visits certain other websites.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Why Do I Use Cookies?</h2>
              <p className="text-zinc-400">
                I use first-party and third-party cookies for several reasons. Some cookies are required for technical
                reasons in order for my website to operate, and I refer to these as "essential" or "strictly necessary"
                cookies. Other cookies also enable me to track and target the interests of my users to enhance the
                experience on my online properties. Third parties serve cookies through my website for analytics and
                other purposes.
              </p>
              <p className="text-zinc-400">
                The specific types of first- and third-party cookies served through my website and the purposes they
                perform are described below:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>
                  <strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with
                  services available through my website and to use some of its features, such as access to secure areas.
                </li>
                <li>
                  <strong>Performance and functionality cookies:</strong> These cookies are used to enhance the
                  performance and functionality of my website but are non-essential to their use. However, without these
                  cookies, certain functionality may become unavailable.
                </li>
                <li>
                  <strong>Analytics and customization cookies:</strong> These cookies collect information that is used
                  either in aggregate form to help me understand how my website is being used or how effective my
                  marketing campaigns are, or to help me customize my website for you.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">How Can You Control Cookies?</h2>
              <p className="text-zinc-400">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by
                setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select
                which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are
                strictly necessary to provide you with services.
              </p>
              <p className="text-zinc-400">
                If you choose to reject cookies, you may still use my website though your access to some functionality
                and areas of my website may be restricted. You may also set or amend your web browser controls to accept
                or refuse cookies.
              </p>
              <p className="text-zinc-400">
                The specific types of first- and third-party cookies served through my website and the purposes they
                perform are described in the table below:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border border-zinc-800">
                  <thead className="bg-zinc-800">
                    <tr>
                      <th className="px-4 py-2 text-left">Cookie Name</th>
                      <th className="px-4 py-2 text-left">Purpose</th>
                      <th className="px-4 py-2 text-left">Expiry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr>
                      <td className="px-4 py-2 text-zinc-400">_ga</td>
                      <td className="px-4 py-2 text-zinc-400">Google Analytics cookie used to distinguish users</td>
                      <td className="px-4 py-2 text-zinc-400">2 years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-zinc-400">_gid</td>
                      <td className="px-4 py-2 text-zinc-400">Google Analytics cookie used to distinguish users</td>
                      <td className="px-4 py-2 text-zinc-400">24 hours</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-zinc-400">_gat</td>
                      <td className="px-4 py-2 text-zinc-400">Google Analytics cookie used to throttle request rate</td>
                      <td className="px-4 py-2 text-zinc-400">1 minute</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Changes to This Cookie Policy</h2>
              <p className="text-zinc-400">
                I may update this Cookie Policy from time to time in order to reflect, for example, changes to the
                cookies I use or for other operational, legal, or regulatory reasons. Please therefore re-visit this
                Cookie Policy regularly to stay informed about my use of cookies and related technologies.
              </p>
              <p className="text-zinc-400">
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="text-zinc-400">
                If you have any questions about my use of cookies or other technologies, please contact me at:
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
