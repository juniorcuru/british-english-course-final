"use client";

import { useEffect, useState } from "react";
import { requireAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "ok">("checking");

  useEffect(() => {
    const isOk = requireAuth();
    if (!isOk) {
      router.replace("/login");
      return;
    }
    setStatus("ok");
  }, [router]);

  if (status !== "ok") {
    return (
      <main className="card">
        Verificando login...
      </main>
    );
  }
  return <>{children}</>;
}
