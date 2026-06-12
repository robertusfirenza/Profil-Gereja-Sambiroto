import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/page-shell"
import { news } from "@/lib/site"
import { ArrowLeft } from "lucide-react"

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = news.find((n) => n.slug === slug)
  return {
    title: item ? `${item.title} | Paroki Santo Petrus Sambiroto` : "Berita",
    description: item?.excerpt,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = news.find((n) => n.slug === slug)
  if (!item) notFound()

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <Link href="/berita" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Berita
        </Link>

        <div className="mb-6 flex items-center gap-3 text-sm">
          <span className="rounded-full bg-accent px-3 py-1 font-medium text-accent-foreground">{item.category}</span>
          <span className="text-muted-foreground">{item.date}</span>
        </div>

        <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-foreground lg:text-5xl">
          {item.title}
        </h1>

        <div className="mt-8 overflow-hidden rounded-2xl">
          <img src={item.image || "/placeholder.svg"} alt={item.title} className="aspect-[16/9] w-full object-cover" />
        </div>

        <div className="mt-10 space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          <p className="text-xl text-foreground">{item.excerpt}</p>
          <p>
            Seluruh umat diundang untuk turut serta dalam kegiatan ini. Kehadiran dan partisipasi Anda
            menjadi tanda nyata persaudaraan dan semangat pelayanan yang menghidupi paroki kita.
          </p>
          <p>
            Untuk informasi lebih lanjut, silakan menghubungi sekretariat paroki pada jam pelayanan, atau
            menyimak pengumuman yang disampaikan setelah perayaan Ekaristi setiap hari Minggu.
          </p>
          <p>
            Mari kita terus mendukung karya pelayanan paroki dengan doa, kehadiran, dan kebersamaan. Tuhan
            memberkati setiap niat baik dan pelayanan kita.
          </p>
        </div>
      </article>
    </PageShell>
  )
}
