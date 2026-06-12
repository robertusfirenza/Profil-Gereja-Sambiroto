"use client"

import { useEffect, useState } from "react"
import { FormField } from "@/components/admin/form-field"
import { Save } from "lucide-react"

export default function ParishInfoPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: "",
    location: "",
    full_name: "",
    tagline: "",
    tagline_id: "",
    address: "",
    phone: "",
    email: "",
    diocese: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/parish-info")
        const data = await res.json()
        if (data && !data.error) {
          setForm((prev) => ({ ...prev, ...data }))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/parish-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" /></div>
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Data Kontak Paroki</h1>
        <p className="mt-1 text-sm text-muted-foreground">Kelola informasi kontak dan identitas paroki.</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Nama Paroki" name="name" value={form.name} onChange={handleChange} required placeholder="Paroki Santo Petrus" />
            <FormField label="Lokasi" name="location" value={form.location} onChange={handleChange} required placeholder="Sambiroto" />
          </div>
          <FormField label="Nama Lengkap" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Paroki Santo Petrus Sambiroto" />

          <hr className="border-border" />

          <FormField label="Tagline (Latin)" name="tagline" value={form.tagline} onChange={handleChange} placeholder="Tu es Petrus" />
          <FormField label="Tagline (Indonesia)" name="tagline_id" value={form.tagline_id} onChange={handleChange} placeholder="Engkaulah Petrus..." />

          <hr className="border-border" />

          <FormField label="Alamat" name="address" type="textarea" value={form.address} onChange={handleChange} rows={2} placeholder="Jl. Arumsari A5..." />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Telepon / WhatsApp" name="phone" value={form.phone} onChange={handleChange} placeholder="082231116700" />
            <FormField label="Email" name="email" value={form.email} onChange={handleChange} placeholder="sekpar@kas.id" />
          </div>
          <FormField label="Keuskupan" name="diocese" value={form.diocese} onChange={handleChange} placeholder="Keuskupan Agung Semarang" />
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          {saved && <span className="text-sm text-green-600">✓ Tersimpan</span>}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </>
  )
}
