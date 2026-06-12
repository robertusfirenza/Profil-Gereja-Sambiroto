import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const rows = await query('SELECT * FROM stats ORDER BY sort_order ASC, id ASC')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const { stat_key, stat_value, label, sort_order } = await request.json()

    if (!stat_key || !stat_value || !label) {
      return NextResponse.json({ error: 'Key, value, dan label harus diisi' }, { status: 400 })
    }

    const result = await execute(
      'INSERT INTO stats (stat_key, stat_value, label, sort_order) VALUES (?, ?, ?, ?)',
      [stat_key, stat_value, label, sort_order || 0]
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error creating stat:', error)
    return NextResponse.json({ error: 'Gagal menambahkan data' }, { status: 500 })
  }
}
