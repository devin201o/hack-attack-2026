"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ANIMALS, CONTENT_HISTORY, SCHEDULED_POSTS } from "@/lib/shelter-data";
import type { ContentHistoryItem, ScheduledPost } from "@/lib/shelter-data";

const PLATFORM_ICONS: Record<string, string> = {
  Instagram: "📸",
  Facebook: "📘",
  Email: "✉️",
  Twitter: "🐦",
};

export default function MarketingHubPage() {
  const [scheduled, setScheduled] = useState<ScheduledPost[]>(SCHEDULED_POSTS);
  const [history] = useState<ContentHistoryItem[]>(CONTENT_HISTORY);

  const removeScheduled = (id: number) => {
    setScheduled(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppShell>
      <div style={{ padding: "32px 36px", maxWidth: 1100 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ color: "#f9fafb", fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 700, margin: 0 }}>
              Marketing Hub
            </h1>
            <p style={{ color: "#6b7280", marginTop: 6, fontSize: 15 }}>
              Create, schedule, and track your adoption content.
            </p>
          </div>
          <button
            onClick={() => {/* TODO: open create post flow */}}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 10,
              background: "linear-gradient(135deg, #f97316, #fb923c)",
              border: "none", color: "#fff", fontWeight: 700, fontSize: 15,
              cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 18 }}>+</span> Create New Post
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Scheduled", val: scheduled.length, icon: "📅", color: "#f59e0b" },
            { label: "Published", val: history.length, icon: "✓", color: "#10b981" },
            { label: "Total Content", val: scheduled.length + history.length, icon: "✦", color: "#6366f1" },
          ].map(s => (
            <div key={s.label} style={{
              background: "#161820", borderRadius: 12, padding: "20px 22px",
              border: "1px solid #1e2130",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                  <div style={{ color: "#f9fafb", fontSize: 28, fontWeight: 700 }}>{s.val}</div>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: s.color + "22", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 18, color: s.color,
                }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scheduled Posts */}
        <div style={{ background: "#161820", borderRadius: 12, border: "1px solid #1e2130", padding: 24, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 style={{ color: "#f9fafb", fontSize: 18, fontWeight: 700, margin: 0 }}>Scheduled Posts</h2>
              <p style={{ color: "#6b7280", fontSize: 13, margin: "4px 0 0" }}>Upcoming content ready to go live</p>
            </div>
          </div>

          {scheduled.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
              <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>No scheduled posts yet. Create one to get started!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {scheduled.map(post => {
                const animal = ANIMALS.find(a => a.id === post.animalId);
                return (
                  <div key={post.id} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                    borderRadius: 10, border: "1px solid #1e2130", background: "#0d0f17",
                  }}>
                    <span style={{ fontSize: 26 }}>{animal?.image || "🐾"}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ color: "#f9fafb", fontSize: 14, fontWeight: 600 }}>{animal?.name}</span>
                        <span style={{
                          background: "#1e2130", color: "#9ca3af", fontSize: 11,
                          padding: "2px 8px", borderRadius: 20,
                        }}>{post.type}</span>
                        <span style={{
                          background: "#f59e0b22", color: "#f59e0b", fontSize: 11,
                          padding: "2px 8px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4,
                        }}>
                          {PLATFORM_ICONS[post.platform] || "📄"} {post.platform}
                        </span>
                      </div>
                      <p style={{ color: "#6b7280", fontSize: 13, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.preview}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ color: "#d1d5db", fontSize: 13, fontWeight: 500 }}>{post.scheduledDate}</div>
                      <div style={{ color: "#6b7280", fontSize: 12 }}>{post.time}</div>
                    </div>
                    <button
                      onClick={() => removeScheduled(post.id)}
                      title="Cancel scheduled post"
                      style={{
                        background: "transparent", border: "1px solid #2d3148", borderRadius: 6,
                        color: "#6b7280", cursor: "pointer", padding: "4px 8px", fontSize: 12,
                        flexShrink: 0,
                      }}
                    >✕</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Previous Posts */}
        <div style={{ background: "#161820", borderRadius: 12, border: "1px solid #1e2130", padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ color: "#f9fafb", fontSize: 18, fontWeight: 700, margin: 0 }}>Previous Posts</h2>
            <p style={{ color: "#6b7280", fontSize: 13, margin: "4px 0 0" }}>Content that has already been published</p>
          </div>

          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
              <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>No content generated yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {history.map(h => {
                const animal = ANIMALS.find(a => a.id === h.animalId);
                return (
                  <div key={h.id} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                    borderRadius: 10, border: "1px solid #1e2130", background: "#0d0f17",
                  }}>
                    <span style={{ fontSize: 26 }}>{animal?.image || "🐾"}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ color: "#f9fafb", fontSize: 14, fontWeight: 600 }}>{animal?.name}</span>
                        <span style={{
                          background: "#1e2130", color: "#9ca3af", fontSize: 11,
                          padding: "2px 8px", borderRadius: 20,
                        }}>{h.type}</span>
                        <span style={{
                          background: "#10b98122", color: "#10b981", fontSize: 11,
                          padding: "2px 8px", borderRadius: 20,
                        }}>Published</span>
                      </div>
                      <p style={{ color: "#6b7280", fontSize: 13, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.preview}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ color: "#d1d5db", fontSize: 13, fontWeight: 500 }}>{h.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
