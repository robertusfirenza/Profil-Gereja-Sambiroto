"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Modal, ConfirmDelete } from "@/components/admin/modal"
import { FormField } from "@/components/admin/form-field"

interface Event {
  id: number
  title: string
  event_date: string
  time: string | null
  place: string | null
  description: string | null
  sort_order: number
}

const emptyForm = { title: "", event_date: "", time: "", place: "", description: "", sort_order: "0" }

export default function EventsPage() {
  const [data, setData] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [deleting, setDeleting] = useState<Event | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/events")
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleChange = (e: React.ChangeEvent<any>) => setForm({ ...form, [e.target.name]: e.target.value })

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true) }
  const openEdit = (row: Event) => {
    setEditing(row)
    setForm({ title: row.title, event_date: row.event_date, time: row.time || "", place: row.place || "", description: row.description || "", sort_order: String(row.sort_order) })
    setModalOpen(true)
  }
  const openDelete = (row: Event) => { setDeleting(row); setDeleteOpen(true) }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = { ...form, sort_order: parseInt(form.sort_order) || 0 }
      const url = editing ? `/api/events/${editing.id}` : "/api/events"
      const res = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (res.ok) { setModalOpen(false); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setSaving(true)
    try {
      const res = await fetch(`/api/events/${deleting.id}`, { method: "DELETE" })
      if (res.ok) { setDeleteOpen(false); setDeleting(null); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const columns = [
    { key: "title", label: "Judul" },
    { key: "event_date", label: "Tanggal" },
    { key: "time", label: "Waktu" },
    { key: "place", label: "Tempat" },
    { key: "sort_order", label: "Urutan" },
  ]

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Agenda & Kegiatan</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola agenda dan kegiatan paroki.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> Tambah Agenda
        </button>
      </div>

      {loading ? <div className="h-40 animate-pulse rounded-xl border border-border bg-card" /> : (
        <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={openDelete} emptyMessage="Belum ada agenda." />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Agenda" : "Tambah Agenda"}
        footer={<>
          <button onClick={() => setModalOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Batal</button>
          <button onClick={handleSave} disabled={saving} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50">{saving ? "Menyimpan..." : "Simpan"}</button>
        </>}
      >
        <div className="space-y-4">
          <FormField label="Judul" name="title" value={form.title} onChange={handleChange} required placeholder="Contoh: Rekoleksi OMK" />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Tanggal" name="event_date" value={form.event_date} onChange={handleChange} required placeholder="Contoh: 12 Jun" />
            <FormField label="Waktu" name="time" value={form.time} onChange={handleChange} placeholder="Contoh: 08.00 WIB" />
          </div>
          <FormField label="Tempat" name="place" value={form.place} onChange={handleChange} placeholder="Contoh: Aula Paroki" />
          <FormField label="Deskripsi" name="description" type="textarea" value={form.description} onChange={handleChange} placeholder="Deskripsi kegiatan..." rows={3} />
          <FormField label="Urutan" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
        </div>
      </Modal>

      <ConfirmDelete open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null) }} onConfirm={handleDelete} loading={saving} message={`Hapus agenda "${deleting?.title}"?`} />
    </>
  )
}
