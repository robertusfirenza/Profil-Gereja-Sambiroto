import { NextRequest, NextResponse } from 'next/server'
import { execute } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const { name, description, category, sort_order } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Nama harus diisi' }, { status: 400 })
    }

    await execute(
      'UPDATE ministries SET name = ?, description = ?, category = ?, sort_order = ? WHERE id = ?',
      [name, description || null, category || null, sort_order || 0, id]
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error updating ministry:', error)
    return NextResponse.json({ error: 'Gagal mengubah data' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    await execute('DELETE FROM ministries WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error deleting ministry:', error)
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 })
  }
}
