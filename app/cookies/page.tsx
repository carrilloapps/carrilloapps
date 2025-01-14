export const metadata = {
  title: 'Cookie Policy - DevPlatform',
  description: 'Learn about how we use cookies and similar technologies on DevPlatform.',
}

export default function CookiesPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile
          device when you visit a website. They are widely used to make websites
          work more efficiently and provide information to the owners of the site.
        </p>

        <h2>How we use cookies</h2>
        <p>
          We use cookies for several purposes, including:
        </p>
        <ul>
          <li>To provide essential website functionality</li>
          <li>To remember your preferences</li>
          <li>To help us understand how you use our website</li>
          <li>To deliver personalized content and advertising</li>
        </ul>

        <h2>Types of cookies we use</h2>
        <h3>Essential cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They
          enable core functionality such as security, network management, and
          accessibility.
        </p>

        <h3>Analytics cookies</h3>
        <p>
          We use analytics cookies to help us understand how you interact with our
          website, discover errors, and determine which pages people visit most
          frequently.
        </p>

        <h2>Managing cookies</h2>
        <p>
          Most web browsers allow you to manage your cookie preferences. You can
          set your browser to refuse cookies, or to alert you when cookies are
          being sent. However, please note that disabling cookies may affect the
          functionality of this and many other websites you visit.
        </p>
      </div>
    </div>
  )
}

