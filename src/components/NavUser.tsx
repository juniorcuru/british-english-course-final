"use client";

import Link from "next/link";
import { getAuth, logout } from "@/lib/auth";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavUser() {
  const pathname = usePathname();
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(getAuth().isLoggedIn);
  }, [pathname]);

  if (!logged) return <Link href="/login">Login</Link>;

  return (
    <button
      className="btn btnDanger"
      style={{ padding: "8px 10px" }}
      onClick={() => { logout(); router.replace("/login"); }}
      title="Sair"
      type="button"
    >
      Sair
    </button>
  );
}
