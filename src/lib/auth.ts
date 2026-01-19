const KEY = "british_course_auth_v1";

/**
 * Login simples (offline) para plataforma pessoal.
 * - Usuário e senha ficam armazenados no navegador (localStorage).
 * - Para uso real/comercial: substitua por Auth real (NextAuth, Supabase, Clerk).
 */

export type AuthState = { isLoggedIn: boolean; user?: string };

export function getAuth(): AuthState {
  if (typeof window === "undefined") return { isLoggedIn: false };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { isLoggedIn: false };
    return JSON.parse(raw);
  } catch {
    return { isLoggedIn: false };
  }
}

export function login(user: string, pass: string): { ok: boolean; message?: string } {
  // credenciais padrão (mude aqui)
  const DEFAULT_USER = "antonio";
  const DEFAULT_PASS = "1234";

  if (user.trim().toLowerCase() !== DEFAULT_USER || pass !== DEFAULT_PASS) {
    return { ok: false, message: "Usuário ou senha incorretos." };
  }

  const state: AuthState = { isLoggedIn: true, user: DEFAULT_USER };
  localStorage.setItem(KEY, JSON.stringify(state));
  return { ok: true };
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function requireAuth(): boolean {
  return getAuth().isLoggedIn === true;
}
