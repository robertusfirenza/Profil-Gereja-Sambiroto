"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Modal, ConfirmDelete } from "@/components/admin/modal"
import { FormField } from "@/components/admin/form-field"

interface Priest {
  id: number
  name: string
  role: string
  is_head: number
  photo: string | null
  sort_order: number
}

const emptyForm = { name: "", role: "Pastor Rekan", is_head: false, photo: "", sort_order: "0" }

export default function PriestsPage() {
  const [data, setData] = useState<Priest[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Priest | null>(null)
  const [deleting, setDeleting] = useState<Priest | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/priests")
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (row: Priest) => {
    setEditing(row)
    setForm({
      name: row.name,
      role: row.role,
      is_head: !!row.is_head,
      photo: row.photo || "",
      sort_order: String(row.sort_order),
    } as any)
    setModalOpen(true)
  }

  const openDelete = (row: Priest) => {
    setDeleting(row)
    setDeleteOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {
        name: form.name,
        role: form.role,
        is_head: (form as any).is_head,
        photo: form.photo || null,
        sort_order: parseInt(form.sort_order) || 0,
      }

      const url = editing ? `/api/priests/${editing.id}` : "/api/priests"
      const method = editing ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setModalOpen(false)
        fetchData()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setSaving(true)
    try {
      const res = await fetch(`/api/priests/${deleting.id}`, { method: "DELETE" })
      if (res.ok) {
        setDeleteOpen(false)
        setDeleting(null)
        fetchData()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    { key: "name", label: "Nama" },
    { key: "role", label: "Jabatan" },
    {
      key: "is_head",
      label: "Kepala",
      render: (val: number) => (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${val ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
          {val ? "Ya" : "Tidak"}
        </span>
      ),
    },
    { key: "sort_order", label: "Urutan" },
  ]

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Daftar Romo</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola data pastor dan romo paroki.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Tambah Romo
        </button>
      </div>

      {loading ? (
        <div className="h-40 animate-pulse rounded-xl border border-border bg-card" />
      ) : (
        <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={openDelete} emptyMessage="Belum ada data romo." />
      )}

      {/* Create/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Romo" : "Tambah Romo"}
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
              Batal
            </button>
            <button onClick={handleSave} disabled={saving} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Nama" name="name" value={form.name} onChange={handleChange} required placeholder="Contoh: RD. Antonius Wijaya" />
          <FormField label="Jabatan" name="role" value={form.role} onChange={handleChange} required placeholder="Contoh: Pastor Kepala" />
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={(form as any).is_head}
                onChange={(e) => setForm({ ...form, is_head: e.target.checked } as any)}
                className="rounded"
              />
              Pastor Kepala
            </label>
          </div>
          <FormField label="Urutan" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} placeholder="0" />
        </div>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDelete
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleting(null) }}
        onConfirm={handleDelete}
        loading={saving}
        message={`Apakah Anda yakin ingin menghapus "${deleting?.name}"?`}
      />
    </>
  )
}
