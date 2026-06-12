import type { Metadata } from "next"
import { PageShell, PageHeader } from "@/components/page-shell"
import { massSchedule } from "@/lib/site"
import { Clock, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Jadwal Misa | Paroki Santo Petrus Sambiroto",
  description: "Jadwal lengkap Misa harian, mingguan, dan hari raya di Paroki Santo Petrus Sambiroto.",
}

const weekly = [
  { day: "Senin", times: ["05.30 — Misa Harian"] },
  { day: "Selasa", times: ["05.30 — Misa Harian"] },
  { day: "Rabu", times: ["05.30 — Misa Harian"] },
  { day: "Kamis", times: ["05.30 — Misa Harian"] },
  { day: "Jumat", times: ["05.30 — Misa Harian", "18.00 — Devosi Hati Kudus (Jumat Pertama)"] },
  { day: "Sabtu", times: ["17.00 — Misa Sabtu Sore"] },
  { day: "Minggu", times: ["06.00 — Misa I", "08.00 — Misa II", "17.00 — Misa III"] },
]

const sacramentSchedule = [
  { title: "Pengakuan Dosa", detail: "Sabtu, 16.00 – 16.45 WIB atau dengan perjanjian." },
  { title: "Baptis Bayi", detail: "Minggu ketiga setiap bulan setelah Misa II." },
  { title: "Adorasi Ekaristi", detail: "Kamis pertama, 19.00 – 20.00 WIB." },
  { title: "Misa Lingkungan", detail: "Sesuai jadwal masing-masing lingkungan." },
]

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Ekaristi"
        title="Jadwal Misa"
        description="Datang dan rayakan Ekaristi bersama keluarga besar Paroki Santo Petrus Sambiroto."
      />

      <section className="bg-foreground py-20 text-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {massSchedule.map((item) => (
              <div key={item.day} className="rounded-2xl border border-background/15 bg-background/5 p-6">
                <p className="font-serif text-2xl font-semibold text-background">{item.day}</p>
                <p className="mt-1 text-sm text-background/60">{item.subtitle}</p>
                <ul className="mt-5 space-y-2">
                  {item.times.map((t) => (
                    <li key={t} className="text-lg font-medium">{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-8 flex items-center gap-3 font-serif text-3xl font-semibold text-foreground">
              <Clock className="h-7 w-7 text-primary" />
              Jadwal Mingguan
            </h2>
            <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
              {weekly.map((row) => (
                <li key={row.day} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-start sm:justify-between">
                  <span className="font-serif text-lg font-semibold text-foreground sm:w-28">{row.day}</span>
                  <ul className="flex-1 space-y-1 text-muted-foreground sm:text-right">
                    {row.times.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-8 flex items-center gap-3 font-serif text-3xl font-semibold text-foreground">
              <Info className="h-7 w-7 text-primary" />
              Layanan Lainnya
            </h2>
            <ul className="space-y-4">
              {sacramentSchedule.map((s) => (
                <li key={s.title} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-serif text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-muted-foreground">{s.detail}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-accent p-6 text-accent-foreground">
              <p className="text-pretty leading-relaxed">
                Jadwal dapat berubah pada hari raya dan masa khusus liturgi. Mohon perhatikan pengumuman
                paroki atau hubungi sekretariat untuk informasi terbaru.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
