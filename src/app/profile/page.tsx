"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { AppShell } from "@/components/app-shell";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadUser() {

    await supabase.auth.refreshSession();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
      setLoading(false);
    } else {
      router.push("/login");
    }
  }
  loadUser();
}, [router]);


  if (loading) {
    return (
      <AppShell>
        <div
          style={{
            width: "100%",
            maxWidth: 960,
            margin: "0 auto",
            padding: "40px 36px",
            color: "#6b7280",
          }}
        >
          Loading...
        </div>
      </AppShell>
    );
  }

  const displayName = user?.user_metadata?.full_name || user?.email || "User";
  const email = user?.email || "";
  const shelter = user?.user_metadata?.shelter || "Not specified";
  const logoUrl = user?.user_metadata?.logo_url;
  const memberSince = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : "Unknown";

  // Get first letter of name for avatar fallback
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <AppShell>
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          margin: "0 auto",
          padding: "40px 36px",
        }}
      >
        <h1 style={{ color: "#f9fafb", fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, margin: "0 0 28px" }}>Profile</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: logoUrl ? "transparent" : "linear-gradient(135deg, #8b5cf6, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#fff",
              overflow: "hidden"
            }}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                initial
              )}
            </div>
            <div>
              <div style={{ color: "#f9fafb", fontSize: 20, fontWeight: 700 }}>{displayName}</div>
              <div style={{ color: "#6b7280", fontSize: 14 }}>Shelter Administrator</div>
              <div style={{ color: "#f97316", fontSize: 13, marginTop: 2 }}>{shelter}</div>
            </div>
          </div>
          {[["Email", email], ["Shelter", shelter], ["Member since", memberSince]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #1e2130" }}>
              <span style={{ color: "#6b7280", fontSize: 14 }}>{k}</span>
              <span style={{ color: "#d1d5db", fontSize: 14 }}>{v}</span>
            </div>
          ))}
      </div>
    </AppShell>
  );
}
