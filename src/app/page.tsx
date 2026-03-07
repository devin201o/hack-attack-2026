"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        // once we know the user is logged in, send them to the dashboard
        setUser(data.user);
        setLoading(false);
        router.push("/dashboard");
      } else {
        router.push("/signup");
      }
    });
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-zinc-500">Loading…</p>
      </div>
    );
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-white p-10 shadow dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          Welcome, {displayName}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          You are signed in.
        </p>
        <button
          onClick={handleSignOut}
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
        >
          Sign Out
        </button>
      </main>
    </div>
  );
}
