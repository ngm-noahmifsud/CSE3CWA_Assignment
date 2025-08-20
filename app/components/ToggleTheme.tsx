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
            <button onClick={() => setTheme('dark')}>Light</button>
        )
    }
    if (resolvedTheme == 'dark') {
        return (
            <button onClick={() => setTheme('light')}>Dark</button>
        )
    }
}
