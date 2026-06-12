import { events, stats } from "@/lib/site"

export function EventsAndStats() {
  return (
    <section className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Agenda</p>
            <h2 className="mb-8 text-balance font-serif text-4xl font-semibold text-foreground lg:text-5xl">
              Kegiatan Mendatang
            </h2>
            <ul className="space-y-3">
              {events.map((ev) => {
                const [day, month] = ev.date.split(" ")
                return (
                  <li
                    key={ev.title}
                    className="flex items-center gap-5 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <span className="font-serif text-2xl font-semibold leading-none">{day}</span>
                      <span className="text-xs uppercase tracking-wider">{month}</span>
                    </div>
                    <div>
                      <p className="font-serif text-lg font-semibold text-foreground">{ev.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {ev.time} &middot; {ev.place}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex flex-col">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">Paroki Kami</p>
            <h2 className="mb-8 text-balance font-serif text-4xl font-semibold text-foreground lg:text-5xl">
              Statistik Umat
            </h2>
            <div className="grid flex-1 grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center"
                >
                  <span className="font-serif text-4xl font-semibold text-primary lg:text-5xl">{s.value}</span>
                  <span className="mt-2 text-sm text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
