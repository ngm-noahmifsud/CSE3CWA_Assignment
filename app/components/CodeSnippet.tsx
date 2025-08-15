// src/components/CodeSnippet.tsx
"use client";

import { useState } from "react";

type CodeSnippetProps = {
  code: string;
  language?: string;    // e.g. "tsx", "js", "py"
  filename?: string;    // optional label
  wrap?: boolean;       // set true to wrap long lines
};

export default function CodeSnippet({
  code,
  language = "",
  filename,
  wrap = false,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="relative rounded-xl border bg-zinc-950 text-zinc-100">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          {filename && <span className="px-2 py-0.5 rounded bg-zinc-800">{filename}</span>}
          {language && <span className="px-1.5 py-0.5 rounded bg-zinc-900/80">{language}</span>}
        </div>
        <button
          onClick={copy}
          className="rounded px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800 active:bg-zinc-700"
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code body */}
      <pre
        className={[
          "m-0 p-4 font-mono text-sm leading-relaxed",
          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre overflow-auto",
        ].join(" ")}
      >
        <code className={language ? `language-${language}` : undefined}>{code}</code>
      </pre>
    </div>
  );
}
