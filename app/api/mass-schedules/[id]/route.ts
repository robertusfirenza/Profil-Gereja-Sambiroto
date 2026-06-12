import { NextRequest, NextResponse } from 'next/server'
import { execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const { day, subtitle, times, sort_order } = await request.json()

    if (!day || !times || !Array.isArray(times)) {
      return NextResponse.json({ error: 'Hari dan waktu harus diisi' }, { status: 400 })
    }

    await execute(
      'UPDATE mass_schedules SET day = ?, subtitle = ?, times = ?, sort_order = ? WHERE id = ?',
      [day, subtitle || null, JSON.stringify(times), sort_order || 0, id]
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error updating mass schedule:', error)
    return NextResponse.json({ error: 'Gagal mengubah data' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    await execute('DELETE FROM mass_schedules WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error deleting mass schedule:', error)
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 })
  }
}
