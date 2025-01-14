export const metadata = {
  title: 'Terms of Service - DevPlatform',
  description: 'Read our terms of service to understand your rights and responsibilities when using DevPlatform.',
}

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Terms</h2>
        <p>
          By accessing this Website, you are agreeing to be bound by these Website
          Terms and Conditions of Use and agree that you are responsible for the
          agreement with any applicable local laws.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials
          (information or software) on DevPlatform's Website for personal,
          non-commercial transitory viewing only.
        </p>

        <h2>3. Disclaimer</h2>
        <p>
          All the materials on DevPlatform's Website are provided "as is".
          DevPlatform makes no warranties, may it be expressed or implied,
          therefore negates all other warranties.
        </p>

        <h2>4. Limitations</h2>
        <p>
          DevPlatform or its suppliers will not be held accountable for any
          damages that will arise with the use or inability to use the materials
          on DevPlatform's Website.
        </p>

        <h2>5. Revisions and Errata</h2>
        <p>
          The materials appearing on DevPlatform's Website may include technical,
          typographical, or photographic errors. DevPlatform will not promise
          that any of the materials in this Website are accurate, complete, or
          current.
        </p>
      </div>
    </div>
  )
}

