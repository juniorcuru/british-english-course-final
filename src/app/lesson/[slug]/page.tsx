"use client";

import AuthGate from "@/components/AuthGate";
import { useEffect, useMemo, useState } from "react";
import { getLesson } from "@/lib/course";
import { loadProgress, markLessonCompleted } from "@/lib/storage";
import Checklist from "@/components/Checklist";
import Quiz from "@/components/Quiz";
import Flashcards from "@/components/Flashcards";

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = useMemo(() => getLesson(params.slug), [params.slug]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const p = loadProgress();
    setDone(!!p.completedLessons[params.slug]);
  }, [params.slug]);

  if (!lesson) return <main className="card">Aula não encontrada.</main>;

  function toggleDone() {
    const next = !done;
    setDone(next);
    markLessonCompleted(params.slug, next);
  }

  return (
    <AuthGate>
      <main className="grid" style={{ gap: 18 }}>
        <section className="card">
          <div style={{ display:"flex", justifyContent:"space-between", gap: 12, alignItems:"center", flexWrap:"wrap" }}>
            <div>
              <div className="badge">Módulo {lesson.module} • Semana {lesson.week} • Dia {lesson.day}</div>
              <h1 className="h1">{lesson.title}</h1>
              <p className="sub">Duração: 60 minutos • Vídeo embutido • Worksheet em PDF</p>
            </div>
            <button className="btn" onClick={toggleDone}>
              {done ? "✅ Aula concluída" : "Marcar como concluída"}
            </button>
          </div>

          <div className="sep" />
          <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
            <a className="btn" href={lesson.worksheetPdf} target="_blank">📄 Baixar worksheet (PDF)</a>
            <a className="btn" href={lesson.listening.link} target="_blank">🌐 Fonte extra (BBC/BC)</a>
          </div>

          <div className="sep" />
          <div style={{ display:"grid", gap: 10 }}>
            <div style={{ fontWeight: 900 }}>Objetivos</div>
            <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
              {lesson.goals.map((g, i) => <li key={i}>{g}</li>)}
            </ul>
          </div>
        </section>

        <section className="grid grid2">
          <div className="card">
            <div style={{ fontWeight: 900 }}>Aula (vídeo embutido)</div>
            <div className="sep" />
            {lesson.listening.embedType === "youtube" && lesson.listening.embedUrl && (
              <div style={{ position:"relative", paddingBottom:"56.25%", height:0, overflow:"hidden", borderRadius: 16, border:"1px solid var(--border)" }}>
                <iframe
                  src={lesson.listening.embedUrl}
                  title="Aula em vídeo"
                  style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            {lesson.listening.embedType === "audio" && lesson.listening.audioUrl && (
              <audio controls style={{ width:"100%" }}>
                <source src={lesson.listening.audioUrl} />
              </audio>
            )}
            <div style={{ height: 10 }} />
            <div className="small"><b>{lesson.listening.title}</b></div>
            <ul className="small" style={{ paddingLeft: 18 }}>
              {lesson.listening.tasks.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <div className="card">
            <div style={{ fontWeight: 900 }}>Pronunciation Warm-up (10m)</div>
            <div className="sep" />
            <div className="small"><b>Foco:</b> {lesson.pronunciation.focus}</div>
            <ul className="small" style={{ paddingLeft: 18 }}>
              {lesson.pronunciation.drills.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        </section>

        <section className="grid grid2">
          <div className="card">
            <div style={{ fontWeight: 900 }}>Vocabulary (15m)</div>
            <div className="sep" />
            <div className="grid" style={{ gap: 10 }}>
              {lesson.vocab.map((v, i) => (
                <div key={i} style={{ border:"1px solid var(--border)", borderRadius: 16, padding: 12, background:"rgba(255,255,255,0.04)" }}>
                  <div style={{ fontWeight: 900, fontSize: 16 }}>{v.term}</div>
                  <div className="small">{v.meaning}</div>
                  <div className="small" style={{ marginTop: 6 }}><b>Example:</b> {v.example}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 900 }}>Grammar (15m)</div>
            <div className="sep" />
            <div className="small"><b>Tópico:</b> {lesson.grammar.topic}</div>
            <div style={{ height: 10 }} />
            <div className="small"><b>Notas:</b></div>
            <ul className="small" style={{ paddingLeft: 18 }}>
              {lesson.grammar.notes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
            <div className="small"><b>Practice:</b></div>
            <ul className="small" style={{ paddingLeft: 18 }}>
              {lesson.grammar.practice.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        </section>

        <section className="card">
          <div style={{ fontWeight: 900 }}>Speaking (15m)</div>
          <div className="sep" />
          <div className="small"><b>Tarefa:</b> {lesson.speaking.task}</div>
          <div style={{ height: 10 }} />
          <div className="small"><b>Prompts:</b></div>
          <ul className="small" style={{ paddingLeft: 18 }}>
            {lesson.speaking.prompts.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <div className="small"><b>Shadowing:</b> {lesson.speaking.shadowing}</div>
        </section>

        <Checklist slug={lesson.slug} items={lesson.checklist} />
        <Quiz slug={lesson.slug} questions={lesson.quiz} />
        <Flashcards cards={lesson.flashcards} />
      </main>
    </AuthGate>
  );
}
