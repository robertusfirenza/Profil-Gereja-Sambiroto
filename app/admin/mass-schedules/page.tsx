"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus, X } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Modal, ConfirmDelete } from "@/components/admin/modal"
import { FormField } from "@/components/admin/form-field"

interface MassSchedule {
  id: number
  day: string
  subtitle: string | null
  times: string[]
  sort_order: number
}

const emptyForm = { day: "", subtitle: "", times: [""], sort_order: "0" }

export default function MassSchedulesPage() {
  const [data, setData] = useState<MassSchedule[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<MassSchedule | null>(null)
  const [deleting, setDeleting] = useState<MassSchedule | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/mass-schedules")
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...form.times]
    newTimes[index] = value
    setForm({ ...form, times: newTimes })
  }

  const addTime = () => setForm({ ...form, times: [...form.times, ""] })
  const removeTime = (index: number) => {
    if (form.times.length <= 1) return
    setForm({ ...form, times: form.times.filter((_, i) => i !== index) })
  }

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true) }
  const openEdit = (row: MassSchedule) => {
    setEditing(row)
    setForm({ day: row.day, subtitle: row.subtitle || "", times: row.times.length ? row.times : [""], sort_order: String(row.sort_order) })
    setModalOpen(true)
  }
  const openDelete = (row: MassSchedule) => { setDeleting(row); setDeleteOpen(true) }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = { day: form.day, subtitle: form.subtitle || null, times: form.times.filter(Boolean), sort_order: parseInt(form.sort_order) || 0 }
      const url = editing ? `/api/mass-schedules/${editing.id}` : "/api/mass-schedules"
      const res = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (res.ok) { setModalOpen(false); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setSaving(true)
    try {
      const res = await fetch(`/api/mass-schedules/${deleting.id}`, { method: "DELETE" })
      if (res.ok) { setDeleteOpen(false); setDeleting(null); fetchData() }
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const columns = [
    { key: "day", label: "Hari" },
    { key: "subtitle", label: "Keterangan" },
    { key: "times", label: "Waktu", render: (val: string[]) => val?.join(", ") || "—" },
    { key: "sort_order", label: "Urutan" },
  ]

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Jadwal Misa</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola jadwal misa paroki.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> Tambah Jadwal
        </button>
      </div>

      {loading ? <div className="h-40 animate-pulse rounded-xl border border-border bg-card" /> : (
        <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={openDelete} emptyMessage="Belum ada jadwal misa." />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Jadwal" : "Tambah Jadwal"}
        footer={<>
          <button onClick={() => setModalOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Batal</button>
          <button onClick={handleSave} disabled={saving} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50">{saving ? "Menyimpan..." : "Simpan"}</button>
        </>}
      >
        <div className="space-y-4">
          <FormField label="Hari" name="day" value={form.day} onChange={handleChange} required placeholder="Contoh: Minggu" />
          <FormField label="Keterangan" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Contoh: Misa Hari Minggu" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Waktu Misa <span className="text-red-500">*</span></label>
            {form.times.map((time, i) => (
              <div key={i} className="mb-2 flex items-center gap-2">
                <input value={time} onChange={(e) => handleTimeChange(i, e.target.value)} placeholder="Contoh: 06.00 WIB"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground" />
                {form.times.length > 1 && (
                  <button onClick={() => removeTime(i)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500"><X className="h-4 w-4" /></button>
                )}
              </div>
            ))}
            <button onClick={addTime} type="button" className="text-sm font-medium text-foreground hover:opacity-70">+ Tambah waktu</button>
          </div>
          <FormField label="Urutan" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
        </div>
      </Modal>

      <ConfirmDelete open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null) }} onConfirm={handleDelete} loading={saving} message={`Hapus jadwal "${deleting?.day}"?`} />
    </>
  )
}
