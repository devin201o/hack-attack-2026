"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
  }, [router]);

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
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <nav className="mb-6 flex items-center">
        <Link
          href="/dashboard"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        <strong>Name:</strong> {displayName}
      </p>
      <p className="text-zinc-700 dark:text-zinc-300">
        <strong>Email:</strong> {user?.email}
      </p>

      {/* Add more profile details or editing form here */}
    </div>
  );
}
