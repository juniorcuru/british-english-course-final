"use client";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { courseStats } from "@/lib/utils";
import AuthGate from "@/components/AuthGate";

export default function Page() {
  return (
    <AuthGate>
      <main className="grid grid2">
      <section className="card">
        <div className="badge">Plataforma do curso</div>
        <h1 className="h1">Inglês Britânico — 1h/dia</h1>
        <p className="sub">
          Curso completo de 3 meses (12 semanas / 60 aulas). Conteúdo diário com vídeos embutidos,
          pronúncia, vocabulário, speaking, PDF (worksheet) e quiz.
        </p>

        <ProgressBar value={courseStats().percent} />
        <div className="sep" />

        <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
          <Link className="btn" href="/curriculum">Abrir currículo</Link>
          <Link className="btn" href="/flashcards">Flashcards</Link>
          <Link className="btn" href="/quizzes">Quizzes</Link>
        </div>

        <div className="small" style={{ marginTop: 14 }}>
          Dica: faça o worksheet PDF e grave 1–2 minutos de speaking por aula.
        </div>
      </section>

      <section className="card">
        <div style={{ fontWeight: 900, fontSize: 18 }}>Como usar</div>
        <div className="sep" />
        <ol className="small" style={{ lineHeight: 1.8 }}>
          <li>Abra o <b>Currículo</b></li>
          <li>Faça 1 aula por dia (seg–sex)</li>
          <li>Assista o vídeo embutido + shadowing</li>
          <li>Baixe o PDF da aula</li>
          <li>Quiz 7/10+</li>
        </ol>
      </section>
    </main>
    </AuthGate>
  );
}
