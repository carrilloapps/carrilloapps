export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <main className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mt-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

