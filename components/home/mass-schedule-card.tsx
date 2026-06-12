import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { massSchedule } from "@/lib/site"

export function MassScheduleCard() {
  return (
    <section className="bg-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Ekaristi</p>
            <h2 className="text-balance font-serif text-4xl font-semibold lg:text-5xl">Jadwal Misa</h2>
          </div>
          <Link
            href="/jadwal-misa"
            className="inline-flex items-center gap-2 text-sm font-medium text-background/80 transition-colors hover:text-background"
          >
            Lihat jadwal lengkap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {massSchedule.map((item) => (
            <div
              key={item.day}
              className="rounded-2xl border border-background/15 bg-background/5 p-6 transition-colors hover:bg-background/10"
            >
              <p className="font-serif text-2xl font-semibold text-background">{item.day}</p>
              <p className="mt-1 text-sm text-background/60">{item.subtitle}</p>
              <ul className="mt-5 space-y-2">
                {item.times.map((t) => (
                  <li key={t} className="text-lg font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
