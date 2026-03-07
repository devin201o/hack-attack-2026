"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.session) {
      // Auto-confirmed — go straight to home
      router.push("/");
    } else {
      // Email confirmation required
      setConfirmEmail(true);
      setLoading(false);
    }
  }

  if (confirmEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl bg-white p-8 shadow dark:bg-zinc-900">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Check your email
          </h1>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            We sent a confirmation link to <strong className="text-black dark:text-white">{email}</strong>. Click the link to activate your account, then come back and sign in.
          </p>
          <a
            href="/login"
            className="mt-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <form
        onSubmit={handleSignUp}
        className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-8 shadow dark:bg-zinc-900"
      >
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Create Account
        </h1>

        {error && (
          <p className="rounded bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </p>
        )}

        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Name
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-600 dark:border-zinc-700 dark:text-white dark:focus:border-zinc-400"
            placeholder="Your name"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-600 dark:border-zinc-700 dark:text-white dark:focus:border-zinc-400"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Password
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-600 dark:border-zinc-700 dark:text-white dark:focus:border-zinc-400"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {loading ? "Creating account…" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-black dark:text-white hover:underline"
          >
            Click here to login
          </a>
        </p>
      </form>
    </div>
  );
}
