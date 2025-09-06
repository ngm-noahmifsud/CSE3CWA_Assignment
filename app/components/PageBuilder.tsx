"use client";
import { useState } from "react";
import TabCreator, { Tab } from "./TabCreator";
import ContentCreator from "./ContentCreator";

export default function PageBuilder() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleAdd = (tab: Tab) => {
    setTabs((prev) => [...prev, tab]);
    setActiveId(tab.id);
  };

  const handleContentChange = (id: number, newContent: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, content: newContent } : t))
    );
  };

  const activeTab = tabs.find((t) => t.id === activeId) ?? null;

  const generateHTML = () => {
    const tabButtons = tabs.map(
        (t, i) =>
          `<button onclick="openTab('tab${i}')">${t.title}</button>`
      ).join("\n");

    const tabContents = tabs.map(
        (t, i) =>
          `<div id="tab${i}" style="display:${i === 0 ? "block" : "none"};">\n<p>${t.content
            .replace(/\n/g, "<br>")
            .trim()}</p>\n</div>`
      ).join("\n");

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Generated Tabs Page</title>
<style>
  body { font-family: Arial, sans-serif; padding:20px; }
  button { margin-right:5px; padding:6px 12px; cursor:pointer; }
  div { margin-top:10px; }
</style>
</head>
<body>

<div>
${tabButtons}
</div>

${tabContents}

<script>
function openTab(id) {
  var divs = document.querySelectorAll("body > div[id^='tab']");
  divs.forEach(d => d.style.display = "none");
  document.getElementById(id).style.display = "block";
}
</script>

</body>
</html>`;
  };

  return (
    <div className='bg-white dark:bg-black transition-all p-4'>
      <h1 className='text-black dark:text-white text-4xl pb-4'>Page Builder</h1>

      <TabCreator onAdd={handleAdd} />

      <div className=''>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`mr-2 px-3 py-1 rounded-2 hover:cursor-pointer text-black dark:text-white
                ${tab.id === activeId ? "font-bold bg-black text-white" : "font-normal"}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {activeTab && (
        <ContentCreator tab={activeTab} onChange={handleContentChange} />
      )}

      {tabs.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Generated HTML</h3>
          <textarea
            rows={15}
            style={{ width: "100%" }}
            readOnly
            value={generateHTML()}
          />
        </div>
      )}
    </div>
  );
}
