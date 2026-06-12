"use client"

import { useEffect, useState } from "react"
import { Users, Clock, Newspaper, Calendar, BarChart3, Building2, BookOpen, Phone } from "lucide-react"
import Link from "next/link"

interface DashboardStat {
  label: string
  value: number | string
  icon: any
  href: string
  color: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [priests, schedules, news, events, statsData, ministries, sacraments] = await Promise.all([
          fetch("/api/priests").then((r) => r.json()),
          fetch("/api/mass-schedules").then((r) => r.json()),
          fetch("/api/news").then((r) => r.json()),
          fetch("/api/events").then((r) => r.json()),
          fetch("/api/stats").then((r) => r.json()),
          fetch("/api/ministries").then((r) => r.json()),
          fetch("/api/sacraments").then((r) => r.json()),
        ])

        setStats([
          { label: "Romo", value: Array.isArray(priests) ? priests.length : 0, icon: Users, href: "/admin/priests", color: "bg-blue-50 text-blue-600" },
          { label: "Jadwal Misa", value: Array.isArray(schedules) ? schedules.length : 0, icon: Clock, href: "/admin/mass-schedules", color: "bg-purple-50 text-purple-600" },
          { label: "Berita", value: Array.isArray(news) ? news.length : 0, icon: Newspaper, href: "/admin/news", color: "bg-green-50 text-green-600" },
          { label: "Agenda", value: Array.isArray(events) ? events.length : 0, icon: Calendar, href: "/admin/events", color: "bg-orange-50 text-orange-600" },
          { label: "Statistik", value: Array.isArray(statsData) ? statsData.length : 0, icon: BarChart3, href: "/admin/stats", color: "bg-red-50 text-red-600" },
          { label: "Organisasi", value: Array.isArray(ministries) ? ministries.length : 0, icon: Building2, href: "/admin/ministries", color: "bg-teal-50 text-teal-600" },
          { label: "Sakramen", value: Array.isArray(sacraments) ? sacraments.length : 0, icon: BookOpen, href: "/admin/sacraments", color: "bg-indigo-50 text-indigo-600" },
        ])
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ringkasan data konten website paroki.</p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl border border-border bg-card" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-3xl font-semibold text-foreground">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
