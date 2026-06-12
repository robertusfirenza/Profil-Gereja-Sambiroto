import type { Metadata } from "next"
import { PageShell, PageHeader } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Galeri | Paroki Santo Petrus Sambiroto",
  description: "Dokumentasi kegiatan, liturgi, dan kehidupan komunitas Paroki Santo Petrus Sambiroto.",
}

const gallery = [
  { src: "/images/church-hero.png", alt: "Interior gereja", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/mass.png", alt: "Perayaan Ekaristi", span: "" },
  { src: "/images/choir.png", alt: "Paduan suara paroki", span: "" },
  { src: "/images/community.png", alt: "Komunitas umat", span: "lg:col-span-2" },
  { src: "/images/candles.png", alt: "Lilin doa", span: "" },
  { src: "/images/baptism.png", alt: "Sakramen baptis", span: "" },
  { src: "/images/church-exterior.png", alt: "Tampak luar gereja", span: "lg:col-span-2" },
  { src: "/images/priest.png", alt: "Pastor paroki", span: "" },
]

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Dokumentasi"
        title="Galeri Paroki"
        description="Momen-momen penuh makna dari kehidupan iman dan kebersamaan paroki kita."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((img, i) => (
            <div key={i} className={`group overflow-hidden rounded-2xl ${img.span}`}>
              <img
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
