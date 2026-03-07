"use client";

import { AppShell } from "@/components/app-shell";

export default function ProfilePage() {
  return (
    <AppShell>
      <div style={{ padding: "32px 36px", maxWidth: 600 }}>
        <h1 style={{ color: "#f9fafb", fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, margin: "0 0 28px" }}>Profile</h1>
        <div style={{ background: "#161820", borderRadius: 14, border: "1px solid #1e2130", padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#fff"
            }}>N</div>
            <div>
              <div style={{ color: "#f9fafb", fontSize: 20, fontWeight: 700 }}>Nikola</div>
              <div style={{ color: "#6b7280", fontSize: 14 }}>Shelter Administrator</div>
              <div style={{ color: "#f97316", fontSize: 13, marginTop: 2 }}>PawPath Shelter</div>
            </div>
          </div>
          {[["Email", "nikola@pawpath.org"], ["Role", "Administrator"], ["Shelter", "PawPath Animal Rescue"], ["Member since", "January 2024"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #1e2130" }}>
              <span style={{ color: "#6b7280", fontSize: 14 }}>{k}</span>
              <span style={{ color: "#d1d5db", fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
