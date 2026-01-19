"use client";

import AuthGate from "@/components/AuthGate";
import { course } from "@/lib/course";
import { loadProgress } from "@/lib/storage";

export default function CertificatePage() {
  const p = loadProgress();
  const completed = Object.values(p.completedLessons).filter(Boolean).length;
  const percent = Math.round((completed / course.length) * 100);

  return (
    <AuthGate>
      <main className="grid" style={{ gap: 18 }}>
        <section className="card">
          <div className="badge">Certificado</div>
          <h1 className="h1">Conclusão do curso</h1>
          <p className="sub">Complete o curso para liberar o certificado.</p>

          <div className="sep" />
          <div style={{ fontWeight: 900, fontSize: 18 }}>
            Progresso: {completed}/{course.length} ({percent}%)
          </div>

          <div className="sep" />

          {percent >= 80 ? (
            <div>
              <div className="badge">✅ Certificado liberado</div>
              <div style={{ height: 10 }} />
              <div className="card">
                <div style={{ fontWeight: 900, fontSize: 20 }}>Certificate of Completion</div>
                <div className="small" style={{ marginTop: 8 }}>
                  This certifies that the student has completed the British English Daily Course (12 weeks).
                </div>
                <div className="sep" />
                <div className="small">Dica: você pode fazer print/PDF desta página.</div>
              </div>
            </div>
          ) : (
            <div className="small">
              Para liberar o certificado, complete pelo menos <b>80%</b> das aulas.
            </div>
          )}
        </section>
      </main>
    </AuthGate>
  );
}
