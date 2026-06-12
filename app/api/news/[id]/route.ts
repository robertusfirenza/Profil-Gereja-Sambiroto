import { NextRequest, NextResponse } from 'next/server'
import { execute, queryOne } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const row = await queryOne('SELECT * FROM news WHERE id = ?', [id])
    if (!row) {
      return NextResponse.json({ error: 'Berita tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json(row)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const { slug, title, excerpt, content, category, image, published_date, is_published } = await request.json()

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug dan judul harus diisi' }, { status: 400 })
    }

    await execute(
      'UPDATE news SET slug = ?, title = ?, excerpt = ?, content = ?, category = ?, image = ?, published_date = ?, is_published = ? WHERE id = ?',
      [slug, title, excerpt || null, content || null, category || null, image || null, published_date || null, is_published ? 1 : 0, id]
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error updating news:', error)
    return NextResponse.json({ error: 'Gagal mengubah data' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    await execute('DELETE FROM news WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error deleting news:', error)
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 })
  }
}
