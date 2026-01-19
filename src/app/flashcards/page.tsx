"use client";

import AuthGate from "@/components/AuthGate";
import { course } from "@/lib/course";
import { useMemo, useState } from "react";
import Flashcards from "@/components/Flashcards";

export default function FlashcardsPage() {
  const [lessonSlug, setLessonSlug] = useState(course[0].slug);
  const lesson = useMemo(() => course.find(l => l.slug === lessonSlug)!, [lessonSlug]);

  return (
    <AuthGate>
      <main className="grid" style={{ gap: 18 }}>
        <section className="card">
          <div className="badge">Central de flashcards</div>
          <h1 className="h1">Escolha a aula</h1>
          <div style={{ height: 10 }} />
          <select value={lessonSlug} onChange={(e) => setLessonSlug(e.target.value)}>
            {course.map(l => (
              <option key={l.slug} value={l.slug}>{l.title}</option>
            ))}
          </select>
          <div className="small" style={{ marginTop: 10 }}>
            Você pode exportar e importar no Anki.
          </div>
        </section>

        <Flashcards cards={lesson.flashcards} />
      </main>
    </AuthGate>
  );
}
