"use client";

import { useEffect, useState } from "react";

export default function Checklist({ slug, items }: { slug: string; items: string[] }) {
  const key = `lesson_checklist_${slug}`;
  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) setState(JSON.parse(raw));
  }, [key]);

  function toggle(item: string) {
    const next = { ...state, [item]: !state[item] };
    setState(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  return (
    <div className="card">
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Checklist da aula</div>
      <div className="small" style={{ marginBottom: 12 }}>Marque tudo que você concluiu hoje.</div>
      <div style={{ display:"grid", gap: 10 }}>
        {items.map(it => (
          <label key={it} style={{ display:"flex", gap: 10, alignItems:"center", cursor:"pointer" }}>
            <input type="checkbox" checked={!!state[it]} onChange={() => toggle(it)} />
            <span>{it}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
