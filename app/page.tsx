import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { GitHubProfile } from '@/components/github-profile'

const TOOLS = [
  { name: 'TypeScript', image: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/typescript/typescript-plain.svg' },
  { name: 'Golang', image: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/go/go-original-wordmark.svg' },
  { name: 'Python', image: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/python/python-original.svg' },
  { name: 'Kotlin', image: 'https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg' },
  { name: 'Swift', image: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/swift/swift-original.svg' },
  { name: 'Rust', image: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/rust/rust-original.svg' },
  { name: 'Git', image: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg' },
  { name: 'Jest', image: 'https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg' },
  { name: 'AWS', image: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Azure', image: 'https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg' },
  { name: 'GCP', image: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg' },
  { name: 'Firebase', image: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' },
  { name: 'MongoDB', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg' },
  { name: 'Postgresql', image: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/postgresql/postgresql-plain.svg' },
  { name: 'Kubernets', image: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg' },
  { name: 'Figma', image: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg' },
]

export default function Home() {
  return (
    <>
      <section className="py-5 md:py-22 bg-background">
        <div className="container pb-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <GitHubProfile username="carrilloapps" />
            </div>
            <div className="md:w-1/2 space-y-4 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Desarrollador de software <span className="text-primary">{`{fullstack}`}</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Líder técnico y desarrollador de software fullstack senior especializado en banking, fintech y ecommerce.
              </p>
              <div className="space-x-4">
                <Button size="lg">Solicitar asesoría</Button>
                <Button variant="outline" size="lg">Conóceme</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-2xl sm:text-4xl">
                Soy <span className="text-primary">{`{tech_lead}`}</span> @ Yummy Inc de Payments &amp; Financial Backoffice.
              </h2>
              <p className="text-muted-foreground">
                Yummy es la primera superapp de Venezuela, con más de 1 millón de usuarios activos y más de 100.000 transacciones diarias.
                Opera integrando tecnologías de vanguardia en diferentes verticales.
              </p>
              <Button>Conocer más</Button>
            </div>
            <div className="relative aspect-video">
              <Image
                className="object-cover rounded-lg border"
                src="https://cdn.prod.website-files.com/627eccaab96d0621ae273f80/628bdd75126b798f289d1c9a_ymy_og_img.png"
                alt="Yummy, Inc."
                width={560}
                height={295}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Algunas <span className="text-primary">{`{tecnologías}`}</span> que implemento
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center justify-center">
            {TOOLS.map((it, i) => (
              <div key={i} className="flex items-center justify-center">
                <Image
                  className="opacity-50 hover:opacity-100 transition-opacity rounded-xl bg-white p-2 lg:p-6"
                  src={it.image}
                  alt={it.name}
                  width={120}
                  height={120}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

