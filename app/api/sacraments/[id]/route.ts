import { NextRequest, NextResponse } from 'next/server'
import { execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const { name, description, image, sort_order } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Nama harus diisi' }, { status: 400 })
    }

    await execute(
      'UPDATE sacraments SET name = ?, description = ?, image = ?, sort_order = ? WHERE id = ?',
      [name, description || null, image || null, sort_order || 0, id]
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error updating sacrament:', error)
    return NextResponse.json({ error: 'Gagal mengubah data' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    await execute('DELETE FROM sacraments WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error deleting sacrament:', error)
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 })
  }
}
