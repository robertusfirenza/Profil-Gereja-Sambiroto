import type { Metadata } from "next"
import { PageShell, PageHeader } from "@/components/page-shell"
import { sacraments } from "@/lib/site"
import { Droplets } from "lucide-react"

export const metadata: Metadata = {
  title: "Sakramen | Paroki Santo Petrus Sambiroto",
  description: "Tujuh sakramen Gereja Katolik dan tata cara penerimaannya di Paroki Santo Petrus Sambiroto.",
}

export default function Page() {
  const [featured, ...rest] = sacraments

  return (
    <PageShell>
      <PageHeader
        eyebrow="Rahmat Allah"
        title="Sakramen"
        description="Tujuh sakramen adalah tanda nyata rahmat Allah yang menguduskan perjalanan hidup kita sebagai umat beriman."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl">
            <img src={featured.image || "/placeholder.svg"} alt={`Sakramen ${featured.name}`} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
              <Droplets className="h-6 w-6" />
            </span>
            <h2 className="text-balance font-serif text-4xl font-semibold text-foreground">Sakramen {featured.name}</h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{featured.desc}</p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Untuk pendaftaran dan persiapan penerimaan sakramen, silakan menghubungi sekretariat paroki
              atau ketua lingkungan setempat. Pembekalan akan diberikan sesuai pedoman keuskupan.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => (
            <div key={s.name} className="rounded-2xl border border-border bg-card p-7">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-serif text-lg font-semibold text-primary-foreground">
                {i + 2}
              </span>
              <h3 className="font-serif text-xl font-semibold text-foreground">{s.name}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground">
            Ingin menerima sakramen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Hubungi sekretariat paroki untuk informasi pendaftaran, syarat, dan jadwal pembinaan.
          </p>
          <a
            href="/kontak"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Hubungi Sekretariat
          </a>
        </div>
      </section>
    </PageShell>
  )
}
