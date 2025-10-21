import { PrismaClient } from '@prisma/client'
import { POST, GET } from '../app/api/outputs/route'

const prisma = new PrismaClient()

describe('Outputs API CRUD Tests', () => {
  beforeAll(async () => {
    await prisma.output.deleteMany() // clean DB
  })

  // ✅ Test 1: Create new output
  it('should create a new output', async () => {
    const req = new Request('http://localhost:3000/api/outputs', {
      method: 'POST',
      body: JSON.stringify({ content: 'Test Output' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.content).toBe('Test Output')
  })

  // ✅ Test 2: Read all outputs
  it('should fetch all outputs', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })
})
