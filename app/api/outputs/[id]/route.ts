import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await prisma.output.update({
    where: { id: Number(params.id) },
    data: { content: data.content },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.output.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ message: 'Deleted successfully' })
}
