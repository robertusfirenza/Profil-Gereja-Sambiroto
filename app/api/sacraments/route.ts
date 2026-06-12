import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const rows = await query('SELECT * FROM sacraments ORDER BY sort_order ASC, id ASC')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching sacraments:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const { name, description, image, sort_order } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Nama harus diisi' }, { status: 400 })
    }

    const result = await execute(
      'INSERT INTO sacraments (name, description, image, sort_order) VALUES (?, ?, ?, ?)',
      [name, description || null, image || null, sort_order || 0]
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error creating sacrament:', error)
    return NextResponse.json({ error: 'Gagal menambahkan data' }, { status: 500 })
  }
}
