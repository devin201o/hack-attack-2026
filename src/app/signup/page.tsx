"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setLogo(file);
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setLogoPreview(null);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Sign up with org metadata
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          shelter: orgName,       // org name → user_metadata.shelter
          full_name: orgName,     // used for display name fallback
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // 2. Upload logo if provided (requires a public "logos" bucket in Supabase Storage)
    if (logo && data.user) {
      const ext = logo.name.split(".").pop();
      const path = `${data.user.id}/logo.${ext}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("logos")
        .upload(path, logo, { upsert: true });

      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage
          .from("logos")
          .getPublicUrl(path);

        // Store logo URL back into user_metadata
        await supabase.auth.updateUser({
          data: { logo_url: urlData.publicUrl },
        });
      }
    }

    if (data.session) {
      router.push("/dashboard");
    } else {
      setConfirmEmail(true);
      setLoading(false);
    }
  }

  if (confirmEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl bg-white p-8 shadow dark:bg-zinc-900">
          <h1 className="text-2xl font-semibold text-black dark:text-white">Check your email</h1>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            We sent a confirmation link to{" "}
            <strong className="text-black dark:text-white">{email}</strong>. Click it to activate your account, then sign in.
          </p>
          <a
            href="/login"
            className="mt-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
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
        <h1 className="text-center text-2xl font-semibold text-black dark:text-white">Register Organization</h1>

        {error && (
          <p className="rounded bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </p>
        )}

        {/* Logo upload — optional */}
        <div className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          <span>Logo <span className="text-zinc-400">(optional)</span></span>
          <div className="flex items-center gap-4">
            {/* Preview */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 overflow-hidden dark:border-zinc-700 dark:bg-zinc-800">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xl text-zinc-400">🏠</span>
              )}
            </div>
            <label className="cursor-pointer rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">
              {logo ? "Change image" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>
            {logo && (
              <button
                type="button"
                onClick={() => { setLogo(null); setLogoPreview(null); }}
                className="cursor-pointer text-xs text-zinc-400 hover:text-red-500"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Organization Name
          <input
            type="text"
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-600 dark:border-zinc-700 dark:text-white dark:focus:border-zinc-400"
            placeholder="PawPath Animal Rescue"
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
            placeholder="org@example.com"
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
          className="mt-2 rounded-full bg-black py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {loading ? "Creating account…" : "Register"}
        </button>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already registered?{" "}
          <a href="/login" className="font-medium text-black hover:underline dark:text-white">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}