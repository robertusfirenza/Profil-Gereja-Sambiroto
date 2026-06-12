"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import { FormField } from "@/components/admin/form-field"

export default function NewNewsPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState("")
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    published_date: new Date().toISOString().split("T")[0],
    is_published: true,
  })

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") } : {}),
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImagePreview(URL.createObjectURL(file))

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) {
        setForm((prev) => ({ ...prev, image: data.url }))
      }
    } catch (err) {
      console.error("Upload error:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push("/admin/news")
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="mb-6">
        <Link href="/admin/news" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Berita
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">Tambah Berita</h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8">
        <div className="space-y-5">
          <FormField label="Judul" name="title" value={form.title} onChange={handleChange} required placeholder="Judul berita" />
          <FormField label="Slug (URL)" name="slug" value={form.slug} onChange={handleChange} required placeholder="judul-berita" />

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Kategori" name="category" value={form.category} onChange={handleChange} placeholder="Contoh: Liturgi" />
            <FormField label="Tanggal Terbit" name="published_date" type="date" value={form.published_date} onChange={handleChange} />
          </div>

          <FormField label="Ringkasan" name="excerpt" type="textarea" value={form.excerpt} onChange={handleChange} placeholder="Ringkasan singkat berita..." rows={3} />
          <FormField label="Konten" name="content" type="textarea" value={form.content} onChange={handleChange} placeholder="Isi lengkap berita..." rows={8} />

          {/* Image Upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Gambar</label>
            {(imagePreview || form.image) ? (
              <div className="relative inline-block">
                <img src={imagePreview || form.image} alt="Preview" className="h-40 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => { setImagePreview(""); setForm((p) => ({ ...p, image: "" })) }}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload gambar
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))} className="rounded" />
              Terbitkan
            </label>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <Link href="/admin/news" className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Batal</Link>
          <button type="submit" disabled={saving} className="rounded-lg bg-foreground px-6 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50">
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </>
  )
}
