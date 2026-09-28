"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();

  return (
    <main style={{ padding: 30, fontFamily: "monospace" }}>
      <h1>Auth Error</h1>

      <pre>
        {JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}
      </pre>
    </main>
  );
}
