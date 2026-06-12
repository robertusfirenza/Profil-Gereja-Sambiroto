import { NextRequest, NextResponse } from 'next/server'
import { execute, queryOne } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const { name, role, is_head, photo, sort_order } = await request.json()

    if (!name || !role) {
      return NextResponse.json({ error: 'Nama dan jabatan harus diisi' }, { status: 400 })
    }

    await execute(
      'UPDATE priests SET name = ?, role = ?, is_head = ?, photo = ?, sort_order = ? WHERE id = ?',
      [name, role, is_head ? 1 : 0, photo || null, sort_order || 0, id]
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error updating priest:', error)
    return NextResponse.json({ error: 'Gagal mengubah data' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    await execute('DELETE FROM priests WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error deleting priest:', error)
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 })
  }
}
