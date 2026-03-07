"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: "⊞", href: "/dashboard" },
  { id: "animals", label: "Animal Management", icon: "🐾", href: "/animal-management" },
  { id: "marketing", label: "Marketing Hub", icon: "✦", href: "/marketing-hub" },
  { id: "profile", label: "Profile", icon: "◎", href: "/profile" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 220, minHeight: "100vh", background: "#0f1117",
      display: "flex", flexDirection: "column",
      borderRight: "1px solid #1e2130", flexShrink: 0
    }}>
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #1e2130" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, #f97316, #fb923c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18
          }}>🐾</div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Georgia', serif", fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>PawPath</div>
            <div style={{ color: "#4b5563", fontSize: 11 }}>Shelter OS</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {nav.map(n => {
          const isActive = pathname === n.href || pathname.startsWith(n.href + "/");
          return (
            <Link key={n.id} href={n.href} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px", borderRadius: 8,
              background: isActive ? "#1e2130" : "transparent",
              color: isActive ? "#f97316" : "#6b7280",
              fontSize: 14, fontWeight: isActive ? 600 : 400,
              marginBottom: 2, transition: "all 0.15s", textDecoration: "none"
            }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              {n.label}
              {isActive && <span style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "#f97316" }} />}
            </Link>
          );
        })}
      </nav>
      <div style={{ padding: "16px 24px", borderTop: "1px solid #1e2130" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14
          }}>N</div>
          <div>
            <div style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 500 }}>Nikola</div>
            <div style={{ color: "#4b5563", fontSize: 11 }}>Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
