"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Modal, ConfirmDelete } from "@/components/admin/modal"
import { FormField } from "@/components/admin/form-field"

interface Sacrament {
  id: number
  name: string
  description: string | null
  image: string | null
  sort_order: number
}

const emptyForm = { name: "", description: "", image: "", sort_order: "0" }

export default function SacramentsPage() {
  const [data, setData] = useState<Sacrament[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Sacrament | null>(null)
  const [deleting, setDeleting] = useState<Sacrament | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/sacraments")
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleChange = (e: React.ChangeEvent<any>) => setForm({ ...form, [e.target.name]: e.target.value })

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true) }
  const openEdit = (row: Sacrament) => {
    setEditing(row)
    setForm({ name: row.name, description: row.description || "", image: row.image || "", sort_order: String(row.sort_order) })
    setModalOpen(true)
  }
  const openDelete = (row: Sacrament) => { setDeleting(row); setDeleteOpen(true) }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = { ...form, image: form.image || null, sort_order: parseInt(form.sort_order) || 0 }
      const url = editing ? `/api/sacraments/${editing.id}` : "/api/sacraments"
      const res = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (res.ok) { setModalOpen(false); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setSaving(true)
    try {
      const res = await fetch(`/api/sacraments/${deleting.id}`, { method: "DELETE" })
      if (res.ok) { setDeleteOpen(false); setDeleting(null); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const columns = [
    { key: "name", label: "Nama" },
    {
      key: "description",
      label: "Deskripsi",
      render: (val: string | null) => val ? <span className="max-w-xs truncate block">{val}</span> : "—",
    },
    { key: "sort_order", label: "Urutan" },
  ]

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Sakramen</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola daftar sakramen paroki.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> Tambah Sakramen
        </button>
      </div>

      {loading ? <div className="h-40 animate-pulse rounded-xl border border-border bg-card" /> : (
        <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={openDelete} emptyMessage="Belum ada sakramen." />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Sakramen" : "Tambah Sakramen"}
        footer={<>
          <button onClick={() => setModalOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Batal</button>
          <button onClick={handleSave} disabled={saving} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50">{saving ? "Menyimpan..." : "Simpan"}</button>
        </>}
      >
        <div className="space-y-4">
          <FormField label="Nama" name="name" value={form.name} onChange={handleChange} required placeholder="Contoh: Baptis" />
          <FormField label="Deskripsi" name="description" type="textarea" value={form.description} onChange={handleChange} placeholder="Deskripsi sakramen..." rows={3} />
          <FormField label="URL Gambar" name="image" value={form.image} onChange={handleChange} placeholder="Contoh: /images/baptism.png" />
          <FormField label="Urutan" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
        </div>
      </Modal>

      <ConfirmDelete open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null) }} onConfirm={handleDelete} loading={saving} message={`Hapus sakramen "${deleting?.name}"?`} />
    </>
  )
}
