import { PageShell } from "@/components/page-shell"
import { Hero } from "@/components/home/hero"
import { WelcomePriest } from "@/components/home/welcome-priest"
import { MassScheduleCard } from "@/components/home/mass-schedule-card"
import { LatestNews } from "@/components/home/latest-news"
import { EventsAndStats } from "@/components/home/events-stats"
import { Ministries } from "@/components/home/ministries"
import { DonationCta } from "@/components/home/donation-cta"

export default function Page() {
  return (
    <PageShell>
      <Hero />
      <WelcomePriest />
      <MassScheduleCard />
      <LatestNews />
      <EventsAndStats />
      <Ministries />
      <DonationCta />
    </PageShell>
  )
}
