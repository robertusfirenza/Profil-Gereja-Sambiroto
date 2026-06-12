import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const rows = await query(
      'SELECT * FROM news ORDER BY published_date DESC, id DESC'
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const { slug, title, excerpt, content, category, image, published_date, is_published } = await request.json()

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug dan judul harus diisi' }, { status: 400 })
    }

    const result = await execute(
      'INSERT INTO news (slug, title, excerpt, content, category, image, published_date, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [slug, title, excerpt || null, content || null, category || null, image || null, published_date || null, is_published !== undefined ? (is_published ? 1 : 0) : 1]
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error creating news:', error)
    return NextResponse.json({ error: 'Gagal menambahkan data' }, { status: 500 })
  }
}
