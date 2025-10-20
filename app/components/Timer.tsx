import React, { useEffect, useRef, useState } from 'react'

const formatTime = (s: number) => {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

const Timer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(5) // default minutes
  const [seconds, setSeconds] = useState<number>(0) // default seconds
  const [totalSeconds, setTotalSeconds] = useState<number>(5 * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const alertedRef = useRef(false)

  // Keep totalSeconds in sync when minutes/seconds are changed manually
  useEffect(() => {
    setTotalSeconds(Math.max(0, minutes * 60 + seconds))
    alertedRef.current = false
  }, [minutes, seconds])

  // Tick effect
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    if (intervalRef.current) return // already running

    intervalRef.current = window.setInterval(() => {
      setTotalSeconds(s => {
        if (s <= 1) {
          // time will reach 0
          window.clearInterval(intervalRef.current!)
          intervalRef.current = null
          setRunning(false)
          if (!alertedRef.current) {
            alertedRef.current = true
            window.alert('Time is up!')
            console.log('Timer: time ran out')
          }
          return 0
        }
        return s - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [running])

  // Keep minute/second inputs in sync with totalSeconds when ticking or reset
  useEffect(() => {
    setMinutes(Math.floor(totalSeconds / 60))
    setSeconds(totalSeconds % 60)
  }, [totalSeconds])

  const handleStart = () => {
    if (totalSeconds <= 0) return
    setRunning(true)
  }
  const handlePause = () => setRunning(false)
  const handleReset = () => {
    setRunning(false)
    alertedRef.current = false
    setTotalSeconds(minutes * 60 + seconds)
  }
  const handleSet = () => {
    alertedRef.current = false
    setTotalSeconds(Math.max(0, minutes * 60 + seconds))
  }

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <label>
          Min
          <input
            type="number"
            min={0}
            value={minutes}
            onChange={e => setMinutes(Math.max(0, Number(e.target.value) || 0))}
            style={{ width: 60, marginLeft: 6 }}
          />
        </label>
        <label>
          Sec
          <input
            type="number"
            min={0}
            max={59}
            value={seconds}
            onChange={e => {
              let v = Number(e.target.value) || 0
              if (v < 0) v = 0
              if (v > 59) v = 59
              setSeconds(v)
            }}
            style={{ width: 60, marginLeft: 6 }}
          />
        </label>
        <button onClick={handleSet} style={{ marginLeft: 6 }}>Set</button>
      </div>

      <div style={{ minWidth: 80, textAlign: 'center', fontFamily: 'monospace', fontSize: 18 }}>
        {formatTime(totalSeconds)}
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={handleStart} disabled={running || totalSeconds <= 0}>Start</button>
        <button onClick={handlePause} disabled={!running}>Pause</button>
        <button onClick={() => { setRunning(false); setTotalSeconds(0); alertedRef.current = true; window.alert('Timer cleared'); }}>Clear</button>
        <button onClick={() => { setRunning(false); alertedRef.current = false; setTotalSeconds(minutes * 60 + seconds); }}>Reset</button>
      </div>
    </div>
  )
}

export default Timer