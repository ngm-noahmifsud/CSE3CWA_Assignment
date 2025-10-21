'use client'

import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Output {
  id: number
  content: string
  createdAt: string
}

export default function OutputPage() {
  const [outputs, setOutputs] = useState<Output[]>([])
  const [newContent, setNewContent] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')

  // --- READ: Load all outputs ---
  const fetchOutputs = async () => {
    const res = await fetch('/api/outputs')
    const data = await res.json()
    setOutputs(data)
  }

  useEffect(() => {
    fetchOutputs()
  }, [])

  // --- CREATE ---
  const handleCreate = async () => {
    if (!newContent.trim()) return
    await fetch('/api/outputs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newContent }),
    })
    setNewContent('')
    fetchOutputs()
  }

  // --- UPDATE ---
  const handleUpdate = async (id: number) => {
    await fetch(`/api/outputs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editContent }),
    })
    setEditId(null)
    setEditContent('')
    fetchOutputs()
  }

  // --- DELETE ---
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    await fetch(`/api/outputs/${id}`, { method: 'DELETE' })
    fetchOutputs()
  }

  return (
    <div>
        <Header title='API'/>
      

      {/* CREATE */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          placeholder="Enter new output..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* READ + UPDATE + DELETE */}
      <ul className="space-y-2">
        {outputs.map((o) => (
          <li key={o.id} className="border p-3 rounded flex justify-between items-center">
            {editId === o.id ? (
              <div className="flex flex-grow gap-2">
                <input
                  className="border p-2 flex-grow rounded"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate(o.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex-grow">
                  <p>{o.content}</p>
                  <small className="text-gray-500">
                    {new Date(o.createdAt).toLocaleString()}
                  </small>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditId(o.id)
                      setEditContent(o.content)
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(o.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  )
}
