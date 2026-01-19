"use client";

import AuthGate from "@/components/AuthGate";
import { course } from "@/lib/course";
import { loadProgress } from "@/lib/storage";
import Link from "next/link";

export default function QuizzesPage() {
  const p = loadProgress();

  return (
    <AuthGate>
      <main className="card">
        <div className="badge">Central de quizzes</div>
        <h1 className="h1">Notas por aula</h1>
        <p className="sub">Clique para refazer o quiz dentro da aula.</p>

        <div className="sep" />

        <div className="grid" style={{ gap: 10 }}>
          {course.map(l => (
            <Link key={l.slug} href={`/lesson/${l.slug}`} className="card" style={{ padding: 14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", gap: 12 }}>
                <div style={{ fontWeight: 900 }}>{l.title}</div>
                <div className="badge">Quiz: {typeof p.quizScores[l.slug] === "number" ? `${p.quizScores[l.slug]}/10` : "—"}</div>
              </div>
              <div className="small">Módulo {l.module} • Semana {l.week} • Dia {l.day}</div>
            </Link>
          ))}
        </div>
      </main>
    </AuthGate>
  );
}
