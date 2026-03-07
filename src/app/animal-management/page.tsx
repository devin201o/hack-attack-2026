"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { ANIMALS, APPLICATIONS } from "@/lib/shelter-data";
import type { Animal } from "@/lib/shelter-data";

// ─── ANIMAL LIST ──────────────────────────────────────────────────────────────
function AnimalsPage({ onSelectAnimal }: { onSelectAnimal: (a: Animal) => void }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [search, setSearch] = useState("");

  const locations = ["All", ...new Set(ANIMALS.map(a => a.location))];
  const statuses = ["All", "Available", "Pending", "Adopted"];

  const filtered = ANIMALS.filter(a =>
    (statusFilter === "All" || a.status === statusFilter) &&
    (locationFilter === "All" || a.location === locationFilter) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.breed.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#f9fafb", fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, margin: 0 }}>Animal Manager</h1>
        <p style={{ color: "#6b7280", marginTop: 6, fontSize: 14 }}>{ANIMALS.length} animals in the system</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or breed..."
          style={{
            background: "#161820", border: "1px solid #2d3148", borderRadius: 8,
            color: "#d1d5db", padding: "9px 14px", fontSize: 14, outline: "none", minWidth: 220
          }} />
        {[{ label: "Status", val: statusFilter, set: setStatusFilter, opts: statuses },
          { label: "Location", val: locationFilter, set: setLocationFilter, opts: locations }
        ].map(f => (
          <select key={f.label} value={f.val} onChange={e => f.set(e.target.value)} style={{
            background: "#161820", border: "1px solid #2d3148", borderRadius: 8,
            color: "#d1d5db", padding: "9px 14px", fontSize: 14, outline: "none", cursor: "pointer"
          }}>
            {f.opts.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
        <button style={{
          marginLeft: "auto", padding: "9px 18px", borderRadius: 8,
          background: "#f97316", border: "none", color: "#fff", fontWeight: 600,
          fontSize: 14, cursor: "pointer"
        }}>+ Add Animal</button>
      </div>

      {/* Table */}
      <div style={{ background: "#161820", borderRadius: 12, border: "1px solid #1e2130", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e2130" }}>
              {["Animal", "Breed", "Age", "Gender", "Location", "Status", "Apps", ""].map(h => (
                <th key={h} style={{ padding: "12px 16px", color: "#6b7280", fontSize: 12, fontWeight: 600, textAlign: "left", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.id} style={{
                borderBottom: i < filtered.length - 1 ? "1px solid #1e2130" : "none",
                transition: "background 0.15s"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#1e2130"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{a.image}</span>
                    <span style={{ color: "#f9fafb", fontWeight: 600 }}>{a.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.breed}</td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.age}y</td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.gender}</td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.location}</td>
                <td style={{ padding: "14px 16px" }}><StatusBadge status={a.status} /></td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.applications}</td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => onSelectAnimal(a)} style={{
                    padding: "6px 14px", borderRadius: 6, border: "1px solid #2d3148",
                    background: "transparent", color: "#d1d5db", cursor: "pointer", fontSize: 13
                  }}>Edit →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ANIMAL DETAIL ────────────────────────────────────────────────────────────
function AnimalDetailPage({ animal, onBack }: { animal: Animal; onBack: () => void }) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...animal });

  const animalApps = APPLICATIONS.filter(a => a.animalId === animal.id);

  return (
    <div style={{ padding: "32px 36px", maxWidth: 860 }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "#6b7280", cursor: "pointer",
        fontSize: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 6
      }}>← Back to Animal Manager</button>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
        {/* Left */}
        <div>
          <div style={{
            background: "#161820", borderRadius: 14, border: "1px solid #1e2130",
            overflow: "hidden", marginBottom: 16
          }}>
            <div style={{
              height: 160, background: "linear-gradient(135deg, #064e3b, #065f46)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72
            }}>{animal.image}</div>
            <div style={{ padding: 20 }}>
              <div style={{ color: "#f9fafb", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>{form.name}</div>
              <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 12 }}>{form.breed}</div>
              <StatusBadge status={form.status} />
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Age", `${form.age} years`], ["Gender", form.gender], ["Weight", form.weight], ["Color", form.color], ["Location", form.location], ["Intake", form.intakeDate]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280", fontSize: 13 }}>{k}</span>
                    <span style={{ color: "#d1d5db", fontSize: 13 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => router.push("/marketing-hub")} style={{
            width: "100%", padding: "12px", borderRadius: 8,
            background: "linear-gradient(135deg, #f97316, #fb923c)", border: "none",
            color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer"
          }}>✦ Generate Content</button>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#161820", borderRadius: 14, border: "1px solid #1e2130", padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ color: "#f9fafb", margin: 0, fontSize: 16 }}>Bio & Information</h3>
              <button onClick={() => setEditMode(!editMode)} style={{
                padding: "6px 14px", borderRadius: 6,
                background: editMode ? "#f97316" : "transparent",
                border: "1px solid #2d3148", color: editMode ? "#fff" : "#d1d5db", cursor: "pointer", fontSize: 13
              }}>{editMode ? "Save" : "Edit"}</button>
            </div>
            {editMode ? (
              <textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} style={{
                width: "100%", background: "#1e2130", border: "1px solid #2d3148",
                borderRadius: 8, color: "#d1d5db", padding: 12, fontSize: 14,
                minHeight: 100, resize: "vertical", outline: "none", boxSizing: "border-box"
              }} />
            ) : (
              <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{form.desc}</p>
            )}
          </div>

          <div style={{ background: "#161820", borderRadius: 14, border: "1px solid #1e2130", padding: 22 }}>
            <h3 style={{ color: "#f9fafb", margin: "0 0 16px", fontSize: 16 }}>Applications ({animalApps.length})</h3>
            {animalApps.length === 0
              ? <p style={{ color: "#6b7280", fontSize: 14 }}>No applications yet.</p>
              : animalApps.map(app => (
                <div key={app.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0", borderBottom: "1px solid #1e2130"
                }}>
                  <div>
                    <div style={{ color: "#f9fafb", fontSize: 14, fontWeight: 500 }}>{app.applicant}</div>
                    <div style={{ color: "#6b7280", fontSize: 12 }}>{app.email} · {app.date}</div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ROOT ────────────────────────────────────────────────────────────────
function AnimalManagementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const selectedAnimal = idParam ? ANIMALS.find(a => a.id === Number(idParam)) ?? null : null;

  if (selectedAnimal) {
    return (
      <AnimalDetailPage
        animal={selectedAnimal}
        onBack={() => router.push("/animal-management")}
      />
    );
  }

  return (
    <AnimalsPage
      onSelectAnimal={(a) => router.push(`/animal-management?id=${a.id}`)}
    />
  );
}

export default function AnimalManagementPage() {
  return (
    <AppShell>
      <Suspense>
        <AnimalManagementContent />
      </Suspense>
    </AppShell>
  );
}
