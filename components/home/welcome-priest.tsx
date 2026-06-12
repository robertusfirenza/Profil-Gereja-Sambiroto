import { Quote } from "lucide-react"

export function WelcomePriest() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/images/priest.png"
              alt="Pastor Paroki Santo Petrus Sambiroto"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-primary px-6 py-4 text-primary-foreground shadow-lg sm:block">
            <p className="font-serif text-lg font-semibold">RD. Antonius Wijaya</p>
            <p className="text-sm opacity-90">Pastor Kepala Paroki</p>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Sambutan Pastor</p>
          <h2 className="text-balance font-serif text-4xl font-semibold text-foreground lg:text-5xl">
            Selamat datang di rumah iman kita
          </h2>
          <Quote className="my-6 h-10 w-10 text-primary/40" />
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Atas nama seluruh keluarga Paroki Santo Petrus Sambiroto, saya menyambut Anda dengan penuh
            sukacita. Gereja kita adalah tempat di mana setiap orang dipanggil untuk bertumbuh dalam
            iman, dipersatukan dalam Ekaristi, dan diutus untuk mewartakan kasih Kristus.
          </p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Mari kita bersama-sama membangun komunitas yang hangat, melayani sesama, dan hidup sebagai
            saksi kasih Allah di tengah dunia. Pintu gereja kami selalu terbuka untuk Anda.
          </p>
          <p className="mt-6 font-serif text-xl italic text-foreground">— RD. Antonius Wijaya</p>
        </div>
      </div>
    </section>
  )
}
