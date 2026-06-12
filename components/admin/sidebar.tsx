"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Users,
  Clock,
  Newspaper,
  Calendar,
  BarChart3,
  Building2,
  BookOpen,
  Phone,
  LayoutDashboard,
  LogOut,
  Church,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Daftar Romo", href: "/admin/priests", icon: Users },
  { label: "Jadwal Misa", href: "/admin/mass-schedules", icon: Clock },
  { label: "Berita", href: "/admin/news", icon: Newspaper },
  { label: "Agenda", href: "/admin/events", icon: Calendar },
  { label: "Statistik", href: "/admin/stats", icon: BarChart3 },
  { label: "Organisasi", href: "/admin/ministries", icon: Building2 },
  { label: "Sakramen", href: "/admin/sacraments", icon: BookOpen },
  { label: "Data Kontak", href: "/admin/parish-info", icon: Phone },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border/60 bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
          <Church className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">Admin Panel</span>
          <span className="text-xs text-muted-foreground">Paroki Sambiroto</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href + "/"))
            const exactActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    exactActive || active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <link.icon className="h-4.5 w-4.5 shrink-0" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border/60 p-3">
        <Link
          href="/"
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Church className="h-4.5 w-4.5 shrink-0" />
          Lihat Website
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
