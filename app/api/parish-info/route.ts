import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const rows = await query('SELECT * FROM parish_info ORDER BY id ASC')
    // Transform rows into key-value object
    const info: Record<string, string> = {}
    for (const row of rows as any[]) {
      info[row.info_key] = row.info_value
    }
    return NextResponse.json(info)
  } catch (error) {
    console.error('Error fetching parish info:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth()
    const data = await request.json()

    // data is a key-value object, e.g. { name: "...", address: "...", ... }
    for (const [key, value] of Object.entries(data)) {
      await execute(
        'INSERT INTO parish_info (info_key, info_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE info_value = ?',
        [key, value as string, value as string]
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error updating parish info:', error)
    return NextResponse.json({ error: 'Gagal mengubah data' }, { status: 500 })
  }
}
