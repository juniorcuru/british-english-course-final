import "./globals.css";
import Link from "next/link";
import NavUser from "@/components/NavUser";

export const metadata = {
  title: "British English Daily — Course Platform",
  description: "Curso de inglês britânico (12 semanas / 60 aulas)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="container">
          <div className="nav">
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Link href="/" className="brand">🇬🇧 British English Daily</Link>
              <span className="badge">12 semanas • 60 aulas • 1h/dia</span>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Link href="/curriculum">Currículo</Link>
              <Link href="/quizzes">Quizzes</Link>
              <Link href="/flashcards">Flashcards</Link>
              <Link href="/certificate">Certificado</Link>
              <NavUser />
            </div>
          </div>

          <div style={{ height: 18 }} />
          {children}
          <div style={{ height: 28 }} />
          <div className="small" style={{ opacity: 0.75 }}>
            Login simples offline. Para produção real, substitua por autenticação com servidor.
          </div>
        </div>
      </body>
    </html>
  );
}
