import type { Metadata } from "next"
import { PageShell, PageHeader } from "@/components/page-shell"
import { ministries } from "@/lib/site"
import { Users, Music, Sparkles, HandHeart, Baby, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Organisasi Paroki | Paroki Santo Petrus Sambiroto",
  description: "Kelompok kategorial, komunitas, dan organisasi pelayanan di Paroki Santo Petrus Sambiroto.",
}

const icons = [Baby, Music, Sparkles, Users, HandHeart, BookOpen]

const categories = [
  { title: "Bidang Liturgi", groups: ["Putra-Putri Altar", "Paduan Suara", "Lektor", "Prodiakon", "Tata Tertib"] },
  { title: "Bidang Pewartaan", groups: ["Sekami", "Pendamping Bina Iman", "Katekis", "Komsos Paroki"] },
  { title: "Bidang Pelayanan", groups: ["Seksi Sosial", "PSE", "Pengurus Lingkungan", "Kelompok Doa"] },
  { title: "Kategorial", groups: ["Orang Muda Katolik", "Wanita Katolik", "Legio Maria", "WKRI"] },
]

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Komunitas"
        title="Organisasi Paroki"
        description="Beragam kelompok dan komunitas yang menjadi tulang punggung pelayanan dan kehidupan iman paroki."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div key={m.name} className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-serif text-xl font-semibold text-foreground">{m.name}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Struktur</p>
            <h2 className="text-balance font-serif text-4xl font-semibold text-foreground">Bidang Pelayanan</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {categories.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-8">
                <h3 className="font-serif text-2xl font-semibold text-primary">{c.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {c.groups.map((g) => (
                    <li key={g} className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground">
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
        <h2 className="text-balance font-serif text-3xl font-semibold text-foreground">Tertarik bergabung?</h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Setiap umat dipanggil untuk melayani sesuai talenta masing-masing. Hubungi sekretariat untuk
          mengetahui kelompok yang sesuai dengan Anda.
        </p>
        <a
          href="/kontak"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Gabung Pelayanan
        </a>
      </section>
    </PageShell>
  )
}
