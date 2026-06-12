import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"
import { ministries } from "@/lib/site"

export function Ministries() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-12 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Pelayanan</p>
        <h2 className="text-balance font-serif text-4xl font-semibold text-foreground lg:text-5xl">
          Pelayanan &amp; Komunitas
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Berbagai kelompok dan komunitas yang menghidupi paroki melalui pelayanan, doa, dan persaudaraan.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ministries.map((m) => (
          <div
            key={m.name}
            className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
          >
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
              <Heart className="h-6 w-6" />
            </span>
            <h3 className="font-serif text-xl font-semibold text-foreground">{m.name}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/organisasi"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Lihat semua organisasi
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
