import type { Metadata } from "next"
import { PageShell, PageHeader } from "@/components/page-shell"
import { parish, stats } from "@/lib/site"
import { Church, Users, HandHeart, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Tentang Paroki | Paroki Santo Petrus Sambiroto",
  description: "Sejarah, visi, misi, dan dewan pastoral Paroki Santo Petrus Sambiroto.",
}

const values = [
  { icon: Church, title: "Iman", desc: "Bertumbuh dalam iman akan Kristus melalui Ekaristi dan Sabda." },
  { icon: Users, title: "Persaudaraan", desc: "Membangun komunitas yang hangat dan saling mengasihi." },
  { icon: HandHeart, title: "Pelayanan", desc: "Melayani sesama, terutama yang miskin dan terpinggirkan." },
  { icon: Sparkles, title: "Pewartaan", desc: "Menjadi saksi kasih Allah di tengah masyarakat." },
]

const council = [
  { name: "RD. Antonius Wijaya", role: "Pastor Kepala" },
  { name: "RD. Yohanes Baptista", role: "Pastor Rekan" },
  { name: "Bapak Petrus Hartono", role: "Ketua Dewan Pastoral" },
  { name: "Ibu Maria Sulastri", role: "Sekretaris Paroki" },
]

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Tentang Kami"
        title="Mengenal Paroki Kami"
        description={`${parish.fullName} adalah komunitas iman yang hidup di bawah naungan ${parish.diocese}.`}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl">
            <img src="/images/church-exterior.png" alt="Gereja Paroki Santo Petrus Sambiroto" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Sejarah</p>
            <h2 className="text-balance font-serif text-4xl font-semibold text-foreground">Perjalanan Iman Sejak 1951</h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              Berawal dari sebuah kapel kecil yang dilayani oleh para misionaris, Paroki Santo Petrus
              Sambiroto tumbuh menjadi komunitas yang besar dan beragam. Gereja ini diresmikan sebagai
              paroki mandiri dan terus berkembang seiring bertambahnya umat di wilayah Tembalang dan sekitarnya.
            </p>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Dengan semangat Santo Petrus sebagai batu karang Gereja, paroki kami berkomitmen menjadi
              rumah doa, pusat pelayanan, dan tempat persaudaraan bagi semua umat.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-10">
              <h3 className="font-serif text-3xl font-semibold text-primary">Visi</h3>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                Menjadi paroki yang beriman mendalam, guyub, dan misioner — yang menghadirkan kasih
                Kristus dalam hidup sehari-hari.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-10">
              <h3 className="font-serif text-3xl font-semibold text-primary">Misi</h3>
              <ul className="mt-5 space-y-3 text-pretty text-lg leading-relaxed text-muted-foreground">
                <li>Menghidupkan liturgi dan doa yang khusyuk.</li>
                <li>Membina iman umat di setiap lingkungan.</li>
                <li>Mengembangkan karya sosial dan kepedulian.</li>
                <li>Memberdayakan kaum muda dan keluarga.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Nilai Kami</p>
          <h2 className="text-balance font-serif text-4xl font-semibold text-foreground">Empat Pilar Paroki</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-7 text-center">
              <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
                <v.icon className="h-7 w-7" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-foreground py-24 text-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="font-serif text-4xl font-semibold text-background lg:text-5xl">{s.value}</span>
              <span className="mt-2 block text-sm text-background/70">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Dewan Pastoral</p>
          <h2 className="text-balance font-serif text-4xl font-semibold text-foreground">Pelayan Paroki</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {council.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-7 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent font-serif text-2xl font-semibold text-primary">
                {p.name.split(" ").slice(-1)[0].charAt(0)}
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.role}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
