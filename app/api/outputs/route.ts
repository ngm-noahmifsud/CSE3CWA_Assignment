import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const outputs = await prisma.output.findMany()
  return NextResponse.json(outputs)
}

export async function POST(req: Request) {
  const data = await req.json()
  const newOutput = await prisma.output.create({
    data: { content: data.content },
  })
  return NextResponse.json(newOutput)
}
