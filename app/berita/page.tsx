import type { Metadata } from "next"
import Link from "next/link"
import { PageShell, PageHeader } from "@/components/page-shell"
import { news } from "@/lib/site"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Berita Paroki | Paroki Santo Petrus Sambiroto",
  description: "Berita, pengumuman, dan kabar terkini dari Paroki Santo Petrus Sambiroto.",
}

export default function Page() {
  const [featured, ...rest] = news

  return (
    <PageShell>
      <PageHeader
        eyebrow="Kabar Paroki"
        title="Berita & Pengumuman"
        description="Ikuti perkembangan kegiatan, liturgi, dan pelayanan di paroki kita."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Link
          href={`/berita/${featured.slug}`}
          className="group mb-12 grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-2"
        >
          <div className="overflow-hidden">
            <img
              src={featured.image || "/placeholder.svg"}
              alt={featured.title}
              className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="mb-4 flex items-center gap-3 text-xs">
              <span className="rounded-full bg-accent px-3 py-1 font-medium text-accent-foreground">{featured.category}</span>
              <span className="text-muted-foreground">{featured.date}</span>
            </div>
            <h2 className="text-balance font-serif text-3xl font-semibold text-foreground">{featured.title}</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Baca selengkapnya
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {rest.map((item) => (
            <Link
              key={item.slug}
              href={`/berita/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-accent px-3 py-1 font-medium text-accent-foreground">{item.category}</span>
                  <span className="text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="text-balance font-serif text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
