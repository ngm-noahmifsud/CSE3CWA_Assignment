'use client';
import { useState } from "react";

export type Tab = {
  id: number;
  title: string;
  content: string;
};

type TabCreatorProps = {
  onAdd: (tab: Tab) => void;
};

export default function TabCreator({ onAdd }: TabCreatorProps) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim().length === 0) return;
    onAdd({ id: Date.now(), title, content: "" });
    setTitle("");
  };

  return (
    <div className='mb-2'>
      <input className='bg-white border-1 border-black text-black  dark:bg-black dark:border-white dark:text-white' type="text" value={title}onChange={(e) => setTitle(e.target.value)} placeholder="New tab name..."/>
      <button type="button" onClick={handleAdd} className='ml-4 hover:cursor-pointer text-black dark:text-white'>Add Tab</button>
    </div>
  );
}
