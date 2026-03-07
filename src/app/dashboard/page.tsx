"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { AnimalCard } from "@/components/animal-card";
import { ANIMALS, APPLICATIONS } from "@/lib/shelter-data";

export default function DashboardPage() {
  const router = useRouter();

  const available = ANIMALS.filter(a => a.status === "Available").length;
  const pending = ANIMALS.filter(a => a.status === "Pending").length;

  return (
    <AppShell>
      <div style={{ padding: "32px 36px", maxWidth: 1100 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ color: "#f9fafb", fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 700, margin: 0 }}>Good morning 🌤️</h1>
          <p style={{ color: "#6b7280", marginTop: 6, fontSize: 15 }}>{"Here's what's happening at the shelter today."}</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Total Animals", val: ANIMALS.length, icon: "🐾", color: "#f97316" },
            { label: "Available", val: available, icon: "✓", color: "#10b981" },
            { label: "Pending", val: pending, icon: "⏳", color: "#f59e0b" },
            { label: "Applications", val: APPLICATIONS.length, icon: "📋", color: "#6366f1" },
          ].map(s => (
            <div key={s.label} style={{
              background: "#161820", borderRadius: 12, padding: "20px 22px",
              border: "1px solid #1e2130"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                  <div style={{ color: "#f9fafb", fontSize: 28, fontWeight: 700 }}>{s.val}</div>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: s.color + "22", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 18, color: s.color
                }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
          {[
            { label: "Add Animal", icon: "+", action: () => router.push("/animal-management") },
            { label: "View Applications", icon: "📋", action: () => router.push("/animal-management") },
            { label: "Generate Content", icon: "✦", action: () => router.push("/marketing-hub") },
          ].map(q => (
            <button key={q.label} onClick={q.action} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 8, border: "1px solid #2d3148",
              background: "#161820", color: "#d1d5db", cursor: "pointer", fontSize: 14,
              fontWeight: 500, transition: "all 0.15s"
            }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget as HTMLButtonElement).style.borderColor = "#f97316"}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget as HTMLButtonElement).style.borderColor = "#2d3148"}
            >
              <span style={{ fontSize: 16 }}>{q.icon}</span> {q.label}
            </button>
          ))}
        </div>

        {/* Animal Cards */}
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#f9fafb", fontSize: 18, fontWeight: 600, margin: 0 }}>Adoption Animals</h2>
          <button onClick={() => router.push("/animal-management")} style={{
            background: "none", border: "none", color: "#f97316", cursor: "pointer", fontSize: 13, fontWeight: 500
          }}>View all →</button>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16,
          overflowY: "auto", maxHeight: 480, paddingBottom: 8
        }}>
          {ANIMALS.map(animal => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onClick={() => router.push(`/animal-management?id=${animal.id}`)}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
