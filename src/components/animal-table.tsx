"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/status-badge";

interface AnimalTableProps {
  animals: any[];
  onSelectAnimal: (a: any) => void;
  title?: string;
  subtitle?: string;
  showAddButton?: boolean;
}

export function AnimalTable({
  animals,
  onSelectAnimal,
  title = "Animal Manager",
  subtitle,
  showAddButton = true,
}: AnimalTableProps) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [search, setSearch] = useState("");

  const locations = ["All", ...new Set(animals.map(a => a.location))];
  const statuses = ["All", "Available", "Pending", "Adopted"];

  const filtered = animals.filter(a => {
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
        <h1 style={{ color: "#f9fafb", fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, margin: 0 }}>{title}</h1>
        <p style={{ color: "#6b7280", marginTop: 6, fontSize: 14 }}>{subtitle ?? `${animals.length} animals in the system`}</p>
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
            {f.opts.map((o, idx) => <option key={`${f.label}-${idx}`} value={o}>{o}</option>)}
          </select>
        ))}
        {showAddButton && (
          <button style={{
            marginLeft: "auto", padding: "9px 18px", borderRadius: 8,
            background: "#f97316", border: "none", color: "#fff", fontWeight: 600,
            fontSize: 14, cursor: "pointer"
          }}>+ Add Animal</button>
        )}
      </div>

      {/* Table */}
      <div style={{ background: "#161820", borderRadius: 12, border: "1px solid #1e2130", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e2130" }}>
              {["Animal", "Breed", "Age", "Gender", "Animal Type", "Lnving Environment", "Status", ""].map((h, idx) => (
                <th key={h || `header-${idx}`} style={{ padding: "12px 16px", color: "#6b7280", fontSize: 12, fontWeight: 600, textAlign: "left", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
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
                  <StatusBadge status={a.status ? "Adopted" : "Adoption Available"} />
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
