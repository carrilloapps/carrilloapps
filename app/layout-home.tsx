export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container w-full max-w-7xl mx-auto py-12">
      {children}
    </div>
  )
}

