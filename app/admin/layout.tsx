"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const data = await res.json()
        if (data.authenticated) {
          setAuthenticated(true)
          if (isLoginPage) {
            router.replace("/admin")
          }
        } else {
          setAuthenticated(false)
          if (!isLoginPage) {
            router.replace("/admin/login")
          }
        }
      } catch {
        setAuthenticated(false)
        if (!isLoginPage) {
          router.replace("/admin/login")
        }
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [pathname, isLoginPage, router])

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
          <p className="text-sm text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  // Login page - no sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  // Authenticated admin pages
  if (!authenticated) return null

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
