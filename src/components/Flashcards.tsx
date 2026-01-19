"use client";

import { useMemo, useState } from "react";

export default function Flashcards({ cards }: { cards: { front: string; back: string }[] }) {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);

  const card = useMemo(() => cards[i], [cards, i]);

  function next() { setFlip(false); setI(v => Math.min(v+1, cards.length-1)); }
  function prev() { setFlip(false); setI(v => Math.max(v-1, 0)); }

  function exportTxt() {
    const content = cards.map(c => `${c.front}\t${c.back.replaceAll("\n"," ")}`).join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flashcards_anki_import.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap: 10, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontWeight: 900 }}>Flashcards</div>
          <div className="small">Clique para virar. Exporta em formato compatível com Anki (tab-separated).</div>
        </div>
        <button className="btn" onClick={exportTxt}>Exportar</button>
      </div>

      <div className="sep" />

      <button
        onClick={() => setFlip(f => !f)}
        className="card"
        style={{
          width: "100%",
          textAlign: "left",
          cursor: "pointer",
          minHeight: 140
        }}
      >
        <div className="small">{i+1}/{cards.length}</div>
        <div style={{ fontSize: 24, fontWeight: 900, marginTop: 6 }}>
          {flip ? card.back : card.front}
        </div>
        <div className="small" style={{ marginTop: 10, opacity: 0.8 }}>
          {flip ? "Clique para ver a frente" : "Clique para ver o verso"}
        </div>
      </button>

      <div style={{ display:"flex", gap: 10, marginTop: 12 }}>
        <button className="btn" onClick={prev} disabled={i===0}>← Anterior</button>
        <button className="btn" onClick={next} disabled={i===cards.length-1}>Próximo →</button>
      </div>
    </div>
  );
}
