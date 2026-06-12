import Link from "next/link"
import { MapPin, Phone, Mail, Camera, Video, MessageCircle } from "lucide-react"
import { navLinks, parish } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo Paroki" className="h-10 w-10 object-contain" />
              <span className="flex flex-col leading-tight">
                <span className="font-serif text-lg font-semibold text-foreground">{parish.name}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{parish.location}</span>
              </span>
            </Link>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {parish.diocese}. Komunitas iman yang hidup dalam kasih, pelayanan, dan persaudaraan.
            </p>
            <div className="flex gap-3">
              {[Camera, Video, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Media sosial"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-base font-semibold text-foreground">Navigasi</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-base font-semibold text-foreground">Kontak</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{parish.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{parish.phone}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{parish.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-base font-semibold text-foreground">Jam Pelayanan Sekretariat</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex justify-between gap-4">
                <span>Senin – Jumat</span>
                <span className="text-foreground">08.00 – 16.00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sabtu</span>
                <span className="text-foreground">08.00 – 13.00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Minggu</span>
                <span className="text-foreground">Setelah Misa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {parish.fullName}. Hak cipta dilindungi.
          </p>
          <p className="font-serif italic">{parish.taglineId}</p>
        </div>
      </div>
    </footer>
  )
}
