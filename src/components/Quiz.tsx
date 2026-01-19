"use client";

import { useMemo, useState } from "react";
import type { QuizQ } from "@/lib/course";
import { saveQuizScore } from "@/lib/storage";

export default function Quiz({ slug, questions }: { slug: string; questions: QuizQ[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    let s = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].answerIndex) s++;
    }
    return s;
  }, [answers, questions]);

  function submit() {
    setSubmitted(true);
    saveQuizScore(slug, score);
  }

  return (
    <div className="card">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap: 12, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontWeight: 900 }}>Quiz do dia</div>
          <div className="small">10 questões rápidas para consolidar conteúdo.</div>
        </div>
        <button className="btn" onClick={submit}>
          {submitted ? `Nota: ${score}/10` : "Enviar quiz"}
        </button>
      </div>

      <div className="sep" />

      <div style={{ display:"grid", gap: 14 }}>
        {questions.map((q, idx) => (
          <div key={idx} style={{ border:"1px solid var(--border)", borderRadius: 16, padding: 14, background:"rgba(255,255,255,0.04)" }}>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>{idx+1}. {q.q}</div>
            <div style={{ display:"grid", gap: 8 }}>
              {q.options.map((op, i) => {
                const chosen = answers[idx] === i;
                const correct = q.answerIndex === i;
                let outline = "1px solid var(--border)";
                if (submitted && chosen && correct) outline = "1px solid rgba(110,231,255,0.8)";
                if (submitted && chosen && !correct) outline = "1px solid rgba(255,120,120,0.9)";
                return (
                  <button
                    key={i}
                    className="btn"
                    style={{
                      justifyContent:"flex-start",
                      background: chosen ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
                      border: outline
                    }}
                    onClick={() => setAnswers(a => ({ ...a, [idx]: i }))}
                  >
                    {String.fromCharCode(65+i)}. {op}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="small" style={{ marginTop: 10 }}>
                ✅ Correta: <b>{String.fromCharCode(65 + q.answerIndex)}</b>
                {q.explain ? ` — ${q.explain}` : ""}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
