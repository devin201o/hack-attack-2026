"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
//import { ANIMALS, APPLICATIONS } from "@/lib/shelter-data";
//import type { Animal } from "@/lib/shelter-data";
import { supabase } from "../../lib/supabase";

// ─── ANIMAL LIST ──────────────────────────────────────────────────────────────
function AnimalsPage({ animals, onSelectAnimal }: { 
  animals: any[]; 
  onSelectAnimal: (a: any) => void 
}) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [search, setSearch] = useState("");

  const locations = ["All", ...new Set(animals.map(a => a.location))];
  const statuses = ["All", "Available", "Pending", "Adopted"];

  const filtered = animals.filter(a => {
    // Use 'pet_name' (or whatever your column is) and provide a fallback string
    const name = (a.pet_name || "").toLowerCase();
    const breed = (a.breed || "").toLowerCase();
    const searchTerm = search.toLowerCase();
  
    return (
      (statusFilter === "All" || a.health_status === statusFilter) &&
      (name.includes(searchTerm) || breed.includes(searchTerm))
    );
  });

  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#f9fafb", fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, margin: 0 }}>Animal Manager</h1>
        <p style={{ color: "#6b7280", marginTop: 6, fontSize: 14 }}>{animals.length} animals in the system</p>
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
              {["Animal", "Breed", "Age", "Gender", "Animal Type", "Lnving Environment", "Status", ""].map(h => (
                <th key={h} style={{ padding: "12px 16px", color: "#6b7280", fontSize: 12, fontWeight: 600, textAlign: "left", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.animal_id} style={{
                borderBottom: i < filtered.length - 1 ? "1px solid #1e2130" : "none",
                transition: "background 0.15s"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#1e2130"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{a.image}</span>
                    <span style={{ color: "#f9fafb", fontWeight: 600 }}>{a.pet_name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.breed}</td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.pet_age}y</td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.sex}</td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.animal_type}</td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 14 }}>{a.living_environment}</td>
                <td style={{ padding: "14px 16px" }}>
                  <StatusBadge status={a.status ?  "Adopted" : "Adoption Available"} />
                </td>
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
function AnimalDetailPage({ 
  animal, 
  applications, 
  onBack 
}: { 
  animal: any; 
  applications: any[]; 
  onBack: () => void 
}) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...animal });

  const animalApps = applications.filter(a => a.animal_id === animal.animal_id);

  return (
    <div style={{ padding: "32px 36px", maxWidth: 860 }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "#6b7280", cursor: "pointer",
        fontSize: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 6
      }}>← Back to Animal Manager</button>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
        {/* Left Column: Image & Quick Stats */}
        <div>
          <div style={{
            background: "#161820", borderRadius: 14, border: "1px solid #1e2130",
            overflow: "hidden", marginBottom: 16
          }}>
            <div style={{
              height: 160, background: "linear-gradient(135deg, #064e3b, #065f46)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72
            }}>🐾</div>
            <div style={{ padding: 20 }}>
              <div style={{ color: "#f9fafb", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>{animal.pet_name}</div>
              <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 12 }}>{animal.Breed}</div>
              <StatusBadge status={animal.health_status} />
              
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Age", animal.pet_age],
                  ["Gender", animal.sex],
                  ["Color", animal.color],
                  ["Type", animal.animal_type],
                  ["Intake", animal.in_date]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280", fontSize: 13 }}>{k}</span>
                    <span style={{ color: "#d1d5db", fontSize: 13 }}>{v || "N/A"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Applications */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#161820", borderRadius: 14, border: "1px solid #1e2130", padding: 22 }}>
            <h3 style={{ color: "#f9fafb", margin: "0 0 16px", fontSize: 16 }}>
              Live Applications ({animalApps.length})
            </h3>
            {animalApps.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: 14 }}>No applications found in Supabase for this pet.</p>
            ) : (
              animalApps.map(app => (
                <div key={app.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0", borderBottom: "1px solid #1e2130"
                }}>
                  <div>
                    <div style={{ color: "#f9fafb", fontSize: 14, fontWeight: 500 }}>{app.applicant_name}</div>
                    <div style={{ color: "#6b7280", fontSize: 12 }}>{app.email}</div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))
            )}
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

  // 1. ALL HOOKS MUST BE AT THE VERY TOP
  const [animals, setAnimals] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function loadData() {
      try {
        const { data: animals } = await supabase.from('animals').select('*');
        if (animals) setAnimals(animals);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []); // useEffect is also a hook, it must be here at the top level

  // 2. LOGIC COMES AFTER HOOKS
  if (loading) return <div>Loading Shelter Data...</div>;

  const selectedAnimal = idParam ? animals.find(a => String(a.animal_id) === idParam) : null;

  // 3. RETURNS COME LAST
  if (selectedAnimal) {
    return (
      <AnimalDetailPage
        animal={selectedAnimal}
        applications={applications}
        onBack={() => router.push("/animal-management")}
      />
    );
  }

  return (
    <AnimalsPage
      animals={animals}
      onSelectAnimal={(a) => router.push(`/animal-management?id=${a.animal_id}`)}
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
