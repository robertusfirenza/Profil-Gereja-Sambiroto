"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Modal, ConfirmDelete } from "@/components/admin/modal"
import { FormField } from "@/components/admin/form-field"

interface Ministry {
  id: number
  name: string
  description: string | null
  category: string | null
  sort_order: number
}

const emptyForm = { name: "", description: "", category: "", sort_order: "0" }

export default function MinistriesPage() {
  const [data, setData] = useState<Ministry[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Ministry | null>(null)
  const [deleting, setDeleting] = useState<Ministry | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/ministries")
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleChange = (e: React.ChangeEvent<any>) => setForm({ ...form, [e.target.name]: e.target.value })

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true) }
  const openEdit = (row: Ministry) => {
    setEditing(row)
    setForm({ name: row.name, description: row.description || "", category: row.category || "", sort_order: String(row.sort_order) })
    setModalOpen(true)
  }
  const openDelete = (row: Ministry) => { setDeleting(row); setDeleteOpen(true) }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = { ...form, sort_order: parseInt(form.sort_order) || 0 }
      const url = editing ? `/api/ministries/${editing.id}` : "/api/ministries"
      const res = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (res.ok) { setModalOpen(false); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setSaving(true)
    try {
      const res = await fetch(`/api/ministries/${deleting.id}`, { method: "DELETE" })
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
    { key: "category", label: "Kategori" },
    { key: "sort_order", label: "Urutan" },
  ]

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Organisasi</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola organisasi dan kelompok paroki.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> Tambah Organisasi
        </button>
      </div>

      {loading ? <div className="h-40 animate-pulse rounded-xl border border-border bg-card" /> : (
        <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={openDelete} emptyMessage="Belum ada organisasi." />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Organisasi" : "Tambah Organisasi"}
        footer={<>
          <button onClick={() => setModalOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Batal</button>
          <button onClick={handleSave} disabled={saving} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50">{saving ? "Menyimpan..." : "Simpan"}</button>
        </>}
      >
        <div className="space-y-4">
          <FormField label="Nama" name="name" value={form.name} onChange={handleChange} required placeholder="Contoh: Paduan Suara" />
          <FormField label="Deskripsi" name="description" type="textarea" value={form.description} onChange={handleChange} placeholder="Deskripsi organisasi..." rows={3} />
          <FormField label="Kategori" name="category" value={form.category} onChange={handleChange} placeholder="Contoh: Liturgi" />
          <FormField label="Urutan" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
        </div>
      </Modal>

      <ConfirmDelete open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null) }} onConfirm={handleDelete} loading={saving} message={`Hapus organisasi "${deleting?.name}"?`} />
    </>
  )
}
