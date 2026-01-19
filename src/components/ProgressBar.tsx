export default function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div className="small">Progresso: <b>{value}%</b></div>
      <div style={{
        height: 10,
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
        marginTop: 8
      }}>
        <div style={{
          height: "100%",
          width: `${value}%`,
          background: "linear-gradient(90deg, var(--accent), var(--accent2))"
        }} />
      </div>
    </div>
  );
}
