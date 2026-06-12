import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const rows = await query('SELECT * FROM mass_schedules ORDER BY sort_order ASC, id ASC')
    // Parse times JSON string into array
    const parsed = rows.map((r: any) => ({
      ...r,
      times: typeof r.times === 'string' ? JSON.parse(r.times) : r.times,
    }))
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Error fetching mass schedules:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const { day, subtitle, times, sort_order } = await request.json()

    if (!day || !times || !Array.isArray(times)) {
      return NextResponse.json({ error: 'Hari dan waktu harus diisi' }, { status: 400 })
    }

    const result = await execute(
      'INSERT INTO mass_schedules (day, subtitle, times, sort_order) VALUES (?, ?, ?, ?)',
      [day, subtitle || null, JSON.stringify(times), sort_order || 0]
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error creating mass schedule:', error)
    return NextResponse.json({ error: 'Gagal menambahkan data' }, { status: 500 })
  }
}
