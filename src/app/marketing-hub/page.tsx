"use client";

import Link from "next/link";

export default function MarketingHubPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <nav className="mb-6">
        <Link
          href="/dashboard"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-semibold mb-4">Marketing Hub</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        Browse and analyze past marketing campaigns and history.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Recent Campaigns</h2>
        <ul className="list-disc ml-6">
          <li>Summer Awareness (2026-01-15)</li>
          <li>Fall Fundraiser (2025-10-02)</li>
        </ul>
      </section>
    </div>
  );
}
