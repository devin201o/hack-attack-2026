"use client";

import Link from "next/link";

export default function AnimalManagementPage() {
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

      <h1 className="text-2xl font-semibold mb-4">Animal Management</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        This is where you will manage the animals available for adoption.
      </p>
      {/* TODO: implement animal management features */}
    </div>
  );
}
