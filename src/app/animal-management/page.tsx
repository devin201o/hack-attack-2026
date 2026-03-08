"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { AnimalTable } from "@/components/animal-table";
import { supabase } from "../../lib/supabase";

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
    <AnimalTable
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
