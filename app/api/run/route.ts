import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { code } = await req.json();

    const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "javascript",
          version: "18.15.0",
          files: [
            {
              name: "main.js",
              content: code,
            },
          ],
        }),
    });

    const data = await res.json();
    return NextResponse.json(data);
}