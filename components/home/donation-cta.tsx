import Link from "next/link"
import { Heart, ArrowRight } from "lucide-react"

export function DonationCta() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/candles.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/85" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center text-background lg:px-8">
        <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Heart className="h-7 w-7" />
        </span>
        <h2 className="text-balance font-serif text-4xl font-semibold lg:text-5xl">
          Berbagi dalam Kasih
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-background/80">
          Dukungan Anda membantu paroki melanjutkan karya pelayanan, kegiatan sosial, dan pemeliharaan
          rumah Tuhan. Setiap persembahan adalah wujud nyata kasih kepada sesama.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/kontak"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-3.5 text-base font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Berikan Persembahan
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/tentang"
            className="inline-flex items-center justify-center rounded-full border border-background/30 px-7 py-3.5 text-base font-medium text-background transition-colors hover:bg-background/10"
          >
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
    </section>
  )
}
