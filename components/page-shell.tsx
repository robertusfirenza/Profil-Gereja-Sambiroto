import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8 lg:py-28">
        {eyebrow && (
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        )}
        <h1 className="text-balance font-serif text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
