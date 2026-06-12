import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const rows = await query('SELECT * FROM priests ORDER BY sort_order ASC, id ASC')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching priests:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const { name, role, is_head, photo, sort_order } = await request.json()

    if (!name || !role) {
      return NextResponse.json({ error: 'Nama dan jabatan harus diisi' }, { status: 400 })
    }

    const result = await execute(
      'INSERT INTO priests (name, role, is_head, photo, sort_order) VALUES (?, ?, ?, ?, ?)',
      [name, role, is_head ? 1 : 0, photo || null, sort_order || 0]
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error creating priest:', error)
    return NextResponse.json({ error: 'Gagal menambahkan data' }, { status: 500 })
  }
}
