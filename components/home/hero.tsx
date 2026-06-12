import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { parish } from "@/lib/site"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/church-hero.png"
          alt="Interior Gereja Paroki Santo Petrus Sambiroto dengan cahaya keemasan"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-foreground/30" />
      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 py-32 text-center lg:px-8">
        <p className="mb-6 rounded-full border border-primary/40 bg-background/40 px-4 py-1.5 text-sm font-medium uppercase tracking-[0.25em] text-foreground backdrop-blur-sm">
          {parish.diocese}
        </p>
        <h1 className="text-balance font-serif text-5xl font-semibold leading-tight text-foreground sm:text-6xl lg:text-7xl">
          {parish.fullName}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/80 lg:text-xl">
          {parish.taglineId}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/jadwal-misa"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Clock className="h-5 w-5" />
            Jadwal Misa
          </Link>
          <Link
            href="/tentang"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-7 py-3.5 text-base font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background"
          >
            Tentang Paroki
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
