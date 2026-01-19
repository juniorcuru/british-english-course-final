import Link from "next/link";

export default function LessonCard({
  title, slug, meta, done, score
}: { title: string; slug: string; meta: string; done: boolean; score?: number }) {
  return (
    <Link className="card" href={`/lesson/${slug}`} style={{ display: "block" }}>
      <div style={{ display:"flex", justifyContent:"space-between", gap: 12, alignItems:"center" }}>
        <div>
          <div style={{ fontWeight: 800 }}>{title}</div>
          <div className="small">{meta}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div className="badge" style={{ marginBottom: 8 }}>
            {done ? "✅ Concluída" : "⏳ Pendente"}
          </div>
          <div className="small">Quiz: {typeof score === "number" ? `${score}/10` : "—"}</div>
        </div>
      </div>
    </Link>
  );
}
