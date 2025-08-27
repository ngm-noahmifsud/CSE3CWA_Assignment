"use client";
import { Tab } from "./TabCreator";

type ContentCreatorProps = {
  tab: Tab;
  onChange: (id: number, newContent: string) => void;
};

export default function ContentCreator({ tab, onChange }: ContentCreatorProps) {
  return (
    <div>
      <h3 className='text-black dark:text-white'>Content for: {tab.title}</h3>
      <textarea
        className='text-black dark:text-white border-1 border-black dark:border-white'
        rows={6}
        value={tab.content}
        onChange={(e) => onChange(tab.id, e.target.value)}
        placeholder="Type content here..."
      />
    </div>
  );
}
