import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const rows = await query('SELECT * FROM events ORDER BY sort_order ASC, id ASC')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const { title, event_date, time, place, description, sort_order } = await request.json()

    if (!title || !event_date) {
      return NextResponse.json({ error: 'Judul dan tanggal harus diisi' }, { status: 400 })
    }

    const result = await execute(
      'INSERT INTO events (title, event_date, time, place, description, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [title, event_date, time || null, place || null, description || null, sort_order || 0]
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Gagal menambahkan data' }, { status: 500 })
  }
}
