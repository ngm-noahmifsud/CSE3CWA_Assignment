'use client'
import React, { useState, useEffect } from 'react'

//Components
import Header from '../components/Header'
import ToggleTheme from '../components/ToggleTheme'
import CodeEditor from '../components/CodeEditor'
import { CodeOutputContext } from './context'
import Timer from '../components/Timer'
import PlayScreen from '../components/PlayScreen'

const Page = () => {
  const [output, setOutput] = useState('')
  const [stagesComplete, setStagesComplete] = useState(0)
  const CODE_INSTRUCTIONS = [
    "Create a for loop that prints Walk forward in the console 5 times",
    "Print only even numbers from 0 to 10 in the console to balance on the beam",
    "Write a loop that prints the square of numbers 1 to 5 to unlock the computer",
  ];
  const DESIRED_OUTPUTS = [
    "Walk forward\nWalk forward\nWalk forward\nWalk forward\nWalk forward",
    "2\n4\n6\n8\n10",
    "1\n4\n9\n16\n25",
  ];

   useEffect(() => {
    if (stagesComplete >= DESIRED_OUTPUTS.length) return; // stop if all done

    const expected = DESIRED_OUTPUTS[stagesComplete];
    console.log("Expected:", expected, "| Got:", output);

    if (output.trim().toLowerCase() === expected.toLowerCase()) {
      console.log("✅ Matched:", expected);
      // Use functional update so we always get the latest value
      setStagesComplete((prev) => prev + 1);
      setOutput("");
    }
  }, [output, stagesComplete]);

  

  return (
    <div>
      <CodeOutputContext.Provider value={{output, setOutput}}>
        <Header title='Escape Room'/>
        <Timer />
        <PlayScreen stagesComplete={stagesComplete} alt="Corridor"/>
        <p>{CODE_INSTRUCTIONS[stagesComplete]}</p>
        <CodeEditor />
      </CodeOutputContext.Provider>
    </div>
  )
}

export default Page