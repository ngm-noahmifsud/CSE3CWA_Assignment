'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ToggleTheme(){
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme} = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return (
        <p>Loading</p>
    )

    if (resolvedTheme == 'light') {
        return (
            <button className='bg-gray-800 p-2 text-white font-bold' onClick={() => setTheme('dark')}>Turn Dark</button>
        )
    }
    if (resolvedTheme == 'dark') {
        return (
            <button className='bg-gray-300 p-2 text-black font-bold' onClick={() => setTheme('light')}>Turn Light</button>
        )
    }
}
