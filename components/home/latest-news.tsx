import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { news } from "@/lib/site"

export function LatestNews() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Kabar Paroki</p>
          <h2 className="text-balance font-serif text-4xl font-semibold text-foreground lg:text-5xl">
            Berita Terkini
          </h2>
        </div>
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          Semua berita
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {news.map((item) => (
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
                <span className="rounded-full bg-accent px-3 py-1 font-medium text-accent-foreground">
                  {item.category}
                </span>
                <span className="text-muted-foreground">{item.date}</span>
              </div>
              <h3 className="text-balance font-serif text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                {item.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Baca selengkapnya
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
