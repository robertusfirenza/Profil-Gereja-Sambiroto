import type { Metadata } from "next"
import { PageShell, PageHeader } from "@/components/page-shell"
import { parish } from "@/lib/site"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Kontak | Paroki Santo Petrus Sambiroto",
  description: "Hubungi sekretariat Paroki Santo Petrus Sambiroto untuk informasi, pelayanan, dan pendaftaran sakramen.",
}

const details = [
  { icon: MapPin, label: "Alamat", value: parish.address },
  { icon: Phone, label: "Telepon", value: parish.phone },
  { icon: Mail, label: "Email", value: parish.email },
  { icon: Clock, label: "Jam Sekretariat", value: "Senin – Jumat, 08.00 – 16.00 WIB" },
]

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Hubungi Kami"
        title="Kontak Paroki"
        description="Kami senang mendengar dari Anda. Sampaikan pertanyaan, kebutuhan pelayanan, atau intensi doa Anda."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground">Informasi Kontak</h2>
            <ul className="mt-8 space-y-6">
              {details.map((d) => (
                <li key={d.label} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <d.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground">{d.label}</p>
                    <p className="text-lg text-foreground">{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Peta lokasi Paroki Santo Petrus Sambiroto"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.828331184173!2d110.45522947499745!3d-7.029454692972389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c4698ae29e1%3A0xa47b12321eee519c!2sGereja%20Katolik%20Paroki%20St.%20Petrus%2C%20Sambiroto!5e0!3m2!1sid!2sid!4v1781246360815!5m2!1sid!2sid"
                className="h-64 w-full"
                loading="lazy"
                allowFullScreen={true}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center lg:p-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-foreground">
              <MessageCircle className="h-7 w-7" />
            </span>
            <h2 className="mt-6 font-serif text-3xl font-semibold text-foreground">Hubungi via WhatsApp</h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Untuk pelayanan yang lebih cepat dan responsif mengenai pendaftaran sakramen, administrasi,
              atau informasi paroki lainnya, Anda dapat menghubungi sekretariat paroki langsung melalui WhatsApp.
            </p>
            <a
              href="https://wa.me/6282231116700"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" />
              Hubungi Sekretariat
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
