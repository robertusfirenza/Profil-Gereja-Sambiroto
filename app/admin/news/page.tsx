"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus } from "lucide-react"
import Link from "next/link"
import { DataTable } from "@/components/admin/data-table"
import { ConfirmDelete } from "@/components/admin/modal"
import { useRouter } from "next/navigation"

interface NewsItem {
  id: number
  slug: string
  title: string
  category: string | null
  published_date: string | null
  is_published: number
  image: string | null
}

export default function NewsPage() {
  const router = useRouter()
  const [data, setData] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState<NewsItem | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/news")
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const openEdit = (row: NewsItem) => router.push(`/admin/news/${row.id}`)
  const openDelete = (row: NewsItem) => { setDeleting(row); setDeleteOpen(true) }

  const handleDelete = async () => {
    if (!deleting) return
    setSaving(true)
    try {
      const res = await fetch(`/api/news/${deleting.id}`, { method: "DELETE" })
      if (res.ok) { setDeleteOpen(false); setDeleting(null); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const columns = [
    {
      key: "title",
      label: "Judul",
      render: (_: any, row: NewsItem) => (
        <div className="max-w-md">
          <p className="font-medium text-foreground truncate">{row.title}</p>
          <p className="text-xs text-muted-foreground">{row.slug}</p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Kategori",
      render: (val: string | null) => val ? (
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{val}</span>
      ) : "—",
    },
    {
      key: "published_date",
      label: "Tanggal",
      render: (val: string | null) => val ? new Date(val).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "—",
    },
    {
      key: "is_published",
      label: "Status",
      render: (val: number) => (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${val ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
          {val ? "Terbit" : "Draft"}
        </span>
      ),
    },
  ]

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Berita</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola berita dan pengumuman paroki.</p>
        </div>
        <Link href="/admin/news/new" className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> Tambah Berita
        </Link>
      </div>

      {loading ? <div className="h-40 animate-pulse rounded-xl border border-border bg-card" /> : (
        <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={openDelete} emptyMessage="Belum ada berita." />
      )}

      <ConfirmDelete open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null) }} onConfirm={handleDelete} loading={saving} message={`Hapus berita "${deleting?.title}"?`} />
    </>
  )
}
