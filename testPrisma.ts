import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const outputs = await prisma.output.findMany()
  console.log(outputs)
}

main()
