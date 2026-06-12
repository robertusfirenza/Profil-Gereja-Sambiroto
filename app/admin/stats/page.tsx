"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Modal, ConfirmDelete } from "@/components/admin/modal"
import { FormField } from "@/components/admin/form-field"

interface Stat {
  id: number
  stat_key: string
  stat_value: string
  label: string
  sort_order: number
}

const emptyForm = { stat_key: "", stat_value: "", label: "", sort_order: "0" }

export default function StatsPage() {
  const [data, setData] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Stat | null>(null)
  const [deleting, setDeleting] = useState<Stat | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/stats")
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleChange = (e: React.ChangeEvent<any>) => setForm({ ...form, [e.target.name]: e.target.value })

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true) }
  const openEdit = (row: Stat) => {
    setEditing(row)
    setForm({ stat_key: row.stat_key, stat_value: row.stat_value, label: row.label, sort_order: String(row.sort_order) })
    setModalOpen(true)
  }
  const openDelete = (row: Stat) => { setDeleting(row); setDeleteOpen(true) }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = { ...form, sort_order: parseInt(form.sort_order) || 0 }
      const url = editing ? `/api/stats/${editing.id}` : "/api/stats"
      const res = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (res.ok) { setModalOpen(false); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setSaving(true)
    try {
      const res = await fetch(`/api/stats/${deleting.id}`, { method: "DELETE" })
      if (res.ok) { setDeleteOpen(false); setDeleting(null); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const columns = [
    { key: "stat_key", label: "Key" },
    {
      key: "stat_value",
      label: "Nilai",
      render: (val: string) => <span className="font-semibold text-foreground">{val}</span>,
    },
    { key: "label", label: "Label" },
    { key: "sort_order", label: "Urutan" },
  ]

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Statistik Paroki</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola jumlah umat, lingkungan, kelompok, dan tahun berdiri.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> Tambah Statistik
        </button>
      </div>

      {loading ? <div className="h-40 animate-pulse rounded-xl border border-border bg-card" /> : (
        <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={openDelete} emptyMessage="Belum ada data statistik." />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Statistik" : "Tambah Statistik"}
        footer={<>
          <button onClick={() => setModalOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Batal</button>
          <button onClick={handleSave} disabled={saving} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50">{saving ? "Menyimpan..." : "Simpan"}</button>
        </>}
      >
        <div className="space-y-4">
          <FormField label="Key" name="stat_key" value={form.stat_key} onChange={handleChange} required placeholder="Contoh: umat" />
          <FormField label="Nilai" name="stat_value" value={form.stat_value} onChange={handleChange} required placeholder="Contoh: 12.400+" />
          <FormField label="Label" name="label" value={form.label} onChange={handleChange} required placeholder="Contoh: Umat Terdaftar" />
          <FormField label="Urutan" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
        </div>
      </Modal>

      <ConfirmDelete open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null) }} onConfirm={handleDelete} loading={saving} message={`Hapus statistik "${deleting?.label}"?`} />
    </>
  )
}
