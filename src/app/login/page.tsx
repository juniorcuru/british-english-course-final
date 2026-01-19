"use client";

import { useEffect, useState } from "react";
import { login, getAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (getAuth().isLoggedIn) router.replace("/curriculum");
  }, [router]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = login(user, pass);
    if (!res.ok) {
      setErr(res.message ?? "Falha no login");
      return;
    }
    router.replace("/curriculum");
  }

  return (
    <main className="grid grid2">
      <section className="card">
        <div className="badge">Acesso</div>
        <h1 className="h1">Login</h1>
        <p className="sub">Entre para acessar o curso.</p>

        <div className="sep" />

        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <div>
            <label>Usuário</label>
            <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="antonio" autoComplete="username" />
          </div>
          <div>
            <label>Senha</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="1234" autoComplete="current-password" />
          </div>
          {err && <div className="small" style={{ color: "var(--danger)", fontWeight: 900 }}>{err}</div>}
          <button className="btn" type="submit">Entrar</button>
        </form>

        <div className="sep" />
        <div className="small">
          Credenciais padrão (edite em <span className="kbd">src/lib/auth.ts</span>):<br/>
          usuário: <b>antonio</b> • senha: <b>1234</b>
        </div>
      </section>

      <section className="card">
        <div style={{ fontWeight: 900, fontSize: 18 }}>Próximas melhorias</div>
        <div className="sep" />
        <ul className="small" style={{ lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
          <li>Login real (NextAuth/Supabase/Clerk)</li>
          <li>Perfis de usuários</li>
          <li>Upload de áudio do aluno</li>
          <li>Correção automática por IA</li>
        </ul>
      </section>
    </main>
  );
}
