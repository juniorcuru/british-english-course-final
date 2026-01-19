"use client";

import AuthGate from "@/components/AuthGate";
import { course, groupedCurriculum } from "@/lib/course";
import LessonCard from "@/components/LessonCard";
import ProgressBar from "@/components/ProgressBar";
import { courseStats } from "@/lib/utils";
import { loadProgress, resetProgress } from "@/lib/storage";

export default function CurriculumPage() {
  const stats = courseStats();
  const progress = loadProgress();
  const modules = groupedCurriculum();

  return (
    <AuthGate>
      <main className="grid" style={{ gap: 18 }}>
        <section className="card">
          <div style={{ display:"flex", justifyContent:"space-between", gap: 12, alignItems:"center", flexWrap:"wrap" }}>
            <div>
              <div className="badge">Currículo completo</div>
              <h1 className="h1" style={{ marginTop: 10 }}>Módulos • Semanas • Aulas</h1>
              <p className="sub">Cada aula tem vídeo embutido + PDF (worksheet).</p>
            </div>
            <button className="btn btnDanger" onClick={() => resetProgress()}>Resetar progresso</button>
          </div>

          <ProgressBar value={stats.percent} />
          <div className="small" style={{ marginTop: 10 }}>
            Concluídas: <b>{stats.completed}</b> / {stats.total}
          </div>
        </section>

        {modules.map(m => (
          <section key={m.module} className="card">
            <div style={{ fontWeight: 900, fontSize: 18 }}>{m.title}</div>
            <div className="sep" />
            <div className="grid" style={{ gap: 14 }}>
              {m.weeks.map(week => {
                const weekLessons = course.filter(l => l.week === week);
                return (
                  <div key={week}>
                    <div className="badge">Semana {week}</div>
                    <div style={{ height: 10 }} />
                    <div className="grid" style={{ gap: 12 }}>
                      {weekLessons.map(lesson => (
                        <LessonCard
                          key={lesson.slug}
                          title={lesson.title}
                          slug={lesson.slug}
                          meta={`Módulo ${lesson.module} • Semana ${lesson.week} • Dia ${lesson.day} • 60 min`}
                          done={!!progress.completedLessons[lesson.slug]}
                          score={progress.quizScores[lesson.slug]}
                        />
                      ))}
                    </div>
                    <div className="sep" />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </AuthGate>
  );
}
