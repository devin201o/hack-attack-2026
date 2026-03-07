"use client";

import { useState } from "react";
import { StatusBadge } from "./status-badge";
import type { Animal } from "@/lib/shelter-data";

export function AnimalCard({ animal, onClick }: { animal: Animal; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const emojiBg = (({
    Available: "linear-gradient(135deg, #064e3b, #065f46)",
    Pending: "linear-gradient(135deg, #78350f, #92400e)",
    Adopted: "linear-gradient(135deg, #1e1b4b, #3730a3)",
  } as const)[animal.status as "Available" | "Pending" | "Adopted"]) || "linear-gradient(135deg, #064e3b, #065f46)";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#161820", borderRadius: 14, overflow: "hidden",
        border: `1px solid ${hovered ? "#f97316" : "#1e2130"}`,
        cursor: "pointer", transition: "all 0.2s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(249,115,22,0.12)" : "none"
      }}
    >
      <div style={{
        height: 100, background: emojiBg,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48
      }}>
        {animal.image}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <div style={{ color: "#f9fafb", fontWeight: 700, fontSize: 16 }}>{animal.name}</div>
            <div style={{ color: "#6b7280", fontSize: 12 }}>{animal.breed}</div>
          </div>
          <StatusBadge status={animal.status} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {[`${animal.age}y`, animal.gender, animal.location].map(t => (
            <span key={t} style={{
              background: "#1e2130", color: "#9ca3af", fontSize: 11,
              padding: "3px 8px", borderRadius: 20
            }}>{t}</span>
          ))}
        </div>
        {animal.applications > 0 && (
          <div style={{ marginTop: 10, color: "#6b7280", fontSize: 12 }}>
            📋 {animal.applications} application{animal.applications > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
