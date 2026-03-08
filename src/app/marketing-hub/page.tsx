"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ANIMALS, CONTENT_HISTORY, SCHEDULED_POSTS, NONPROFIT_EVENTS } from "@/lib/shelter-data";
import type { Animal, ContentHistoryItem, ScheduledPost, NonprofitEvent } from "@/lib/shelter-data";

const PLATFORM_ICONS: Record<string, string> = {
  Instagram: "📸",
  Facebook: "📘",
  Email: "✉️",
  Twitter: "🐦",
};

type ModalStep = "choose-type" | "cat-select" | "cat-caption" | "event-select" | "event-prompt";

export default function MarketingHubPage() {
  const [scheduled, setScheduled] = useState<ScheduledPost[]>(SCHEDULED_POSTS);
  const [history] = useState<ContentHistoryItem[]>(CONTENT_HISTORY);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<ModalStep>("choose-type");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [captionMode, setCaptionMode] = useState<"auto" | "custom" | null>(null);
  const [customCaption, setCustomCaption] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<NonprofitEvent | null>(null);
  const [eventPrompt, setEventPrompt] = useState("");

  const openModal = () => {
    setModalOpen(true);
    setModalStep("choose-type");
    setSelectedAnimal(null);
    setCaptionMode(null);
    setCustomCaption("");
    setSelectedEvent(null);
    setEventPrompt("");
  };
  const closeModal = () => setModalOpen(false);

  const removeScheduled = (id: number) => {
    setScheduled(prev => prev.filter(p => p.id !== id));
  };

  // Shared modal styles
  const overlayStyle: React.CSSProperties = {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
  };
  const panelStyle: React.CSSProperties = {
    background: "#161820", borderRadius: 16, border: "1px solid #1e2130",
    width: 520, maxHeight: "85vh", overflowY: "auto", padding: "28px 28px 24px",
  };
  const headerRow: React.CSSProperties = {
    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20,
  };
  const sectionTitle: React.CSSProperties = {
    color: "#f9fafb", fontSize: 18, fontWeight: 700, margin: 0,
  };
  const closeBtnStyle: React.CSSProperties = {
    background: "transparent", border: "none", color: "#6b7280", fontSize: 20, cursor: "pointer",
  };
  const backBtnStyle: React.CSSProperties = {
    background: "transparent", border: "none", color: "#9ca3af", fontSize: 13, cursor: "pointer",
    padding: 0, marginBottom: 12, display: "flex", alignItems: "center", gap: 4,
  };

  const renderModal = () => {
    if (!modalOpen) return null;

    return (
      <div style={overlayStyle} onClick={closeModal}>
        <div style={panelStyle} onClick={e => e.stopPropagation()}>

          {/* Step 1: Choose post type */}
          {modalStep === "choose-type" && (
            <>
              <div style={headerRow}>
                <h2 style={sectionTitle}>Create New Post</h2>
                <button style={closeBtnStyle} onClick={closeModal}>✕</button>
              </div>
              <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 20px" }}>What kind of post would you like to create?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button onClick={() => setModalStep("cat-select")} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "18px 16px",
                  borderRadius: 12, border: "1px solid #2d3148", background: "#0d0f17",
                  cursor: "pointer", textAlign: "left", transition: "border-color 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#f97316")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#2d3148")}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f9731622", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🐱</div>
                  <div>
                    <div style={{ color: "#f9fafb", fontSize: 15, fontWeight: 600 }}>Cat Spotlight Post</div>
                    <div style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>Feature a specific cat to boost adoption interest</div>
                  </div>
                </button>
                <button onClick={() => setModalStep("event-select")} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "18px 16px",
                  borderRadius: 12, border: "1px solid #2d3148", background: "#0d0f17",
                  cursor: "pointer", textAlign: "left", transition: "border-color 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#6366f1")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#2d3148")}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#6366f122", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎉</div>
                  <div>
                    <div style={{ color: "#f9fafb", fontSize: 15, fontWeight: 600 }}>Event Post</div>
                    <div style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>Promote an upcoming non-profit event</div>
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Cat flow — Step 2a: Select a cat */}
          {modalStep === "cat-select" && (
            <>
              <div style={headerRow}>
                <h2 style={sectionTitle}>Select a Cat</h2>
                <button style={closeBtnStyle} onClick={closeModal}>✕</button>
              </div>
              <button style={backBtnStyle} onClick={() => setModalStep("choose-type")}>← Back</button>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 380, overflowY: "auto" }}>
                {ANIMALS.map(a => (
                  <button key={a.id} onClick={() => { setSelectedAnimal(a); setModalStep("cat-caption"); }} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                    borderRadius: 10, border: `1px solid ${selectedAnimal?.id === a.id ? "#f97316" : "#2d3148"}`,
                    background: selectedAnimal?.id === a.id ? "#2d1a0a" : "#0d0f17",
                    cursor: "pointer", textAlign: "left", width: "100%",
                  }}>
                    <span style={{ fontSize: 26 }}>{a.image}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#f9fafb", fontSize: 14, fontWeight: 600 }}>{a.name}</div>
                      <div style={{ color: "#6b7280", fontSize: 12 }}>{a.breed} · {a.age}y · {a.gender}</div>
                    </div>
                    <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 20,
                      background: a.status === "Available" ? "#10b98122" : a.status === "Pending" ? "#f59e0b22" : "#6366f122",
                      color: a.status === "Available" ? "#10b981" : a.status === "Pending" ? "#f59e0b" : "#6366f1",
                    }}>{a.status}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Cat flow — Step 3a: Caption options */}
          {modalStep === "cat-caption" && selectedAnimal && (
            <>
              <div style={headerRow}>
                <h2 style={sectionTitle}>Post for {selectedAnimal.name}</h2>
                <button style={closeBtnStyle} onClick={closeModal}>✕</button>
              </div>
              <button style={backBtnStyle} onClick={() => { setCaptionMode(null); setCustomCaption(""); setModalStep("cat-select"); }}>← Back to cats</button>

              {/* Selected cat preview */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderRadius: 10, border: "1px solid #f97316", background: "#2d1a0a", marginBottom: 20,
              }}>
                <span style={{ fontSize: 28 }}>{selectedAnimal.image}</span>
                <div>
                  <div style={{ color: "#f9fafb", fontSize: 14, fontWeight: 600 }}>{selectedAnimal.name}</div>
                  <div style={{ color: "#6b7280", fontSize: 12 }}>{selectedAnimal.breed} · {selectedAnimal.age}y · {selectedAnimal.gender}</div>
                </div>
              </div>

              <p style={{ color: "#9ca3af", fontSize: 13, margin: "0 0 14px" }}>How would you like to create the caption?</p>

              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <button onClick={() => setCaptionMode("auto")} style={{
                  flex: 1, padding: "12px", borderRadius: 10,
                  border: `1px solid ${captionMode === "auto" ? "#f97316" : "#2d3148"}`,
                  background: captionMode === "auto" ? "#2d1a0a" : "#0d0f17",
                  color: captionMode === "auto" ? "#f97316" : "#9ca3af",
                  cursor: "pointer", fontSize: 14, fontWeight: 600,
                }}>
                  ✦ Auto-Generate
                </button>
                <button onClick={() => setCaptionMode("custom")} style={{
                  flex: 1, padding: "12px", borderRadius: 10,
                  border: `1px solid ${captionMode === "custom" ? "#f97316" : "#2d3148"}`,
                  background: captionMode === "custom" ? "#2d1a0a" : "#0d0f17",
                  color: captionMode === "custom" ? "#f97316" : "#9ca3af",
                  cursor: "pointer", fontSize: 14, fontWeight: 600,
                }}>
                  ✏️ Write Custom
                </button>
              </div>

              {captionMode === "auto" && (
                <div style={{ background: "#0d0f17", borderRadius: 10, border: "1px solid #1e2130", padding: 16, marginBottom: 16 }}>
                  <p style={{ color: "#6b7280", fontSize: 13, margin: 0, fontStyle: "italic" }}>
                    AI will generate a warm, engaging caption using {selectedAnimal.name}&apos;s profile — breed, age, personality, and bio.
                  </p>
                </div>
              )}

              {captionMode === "custom" && (
                <textarea
                  value={customCaption}
                  onChange={e => setCustomCaption(e.target.value)}
                  placeholder={`Write your caption for ${selectedAnimal.name}...`}
                  style={{
                    width: "100%", minHeight: 100, padding: 14, borderRadius: 10,
                    border: "1px solid #2d3148", background: "#0d0f17", color: "#e5e7eb",
                    fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box",
                  }}
                />
              )}

              {captionMode && (
                <button onClick={() => { /* TODO: submit post */ closeModal(); }} style={{
                  width: "100%", padding: 14, borderRadius: 10, marginTop: 4,
                  background: "linear-gradient(135deg, #f97316, #fb923c)",
                  border: "none", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
                }}>
                  {captionMode === "auto" ? "✦ Generate & Create Post" : "Create Post"}
                </button>
              )}
            </>
          )}

          {/* Event flow — Step 2b: Select event */}
          {modalStep === "event-select" && (
            <>
              <div style={headerRow}>
                <h2 style={sectionTitle}>Choose an Event</h2>
                <button style={closeBtnStyle} onClick={closeModal}>✕</button>
              </div>
              <button style={backBtnStyle} onClick={() => setModalStep("choose-type")}>← Back</button>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 380, overflowY: "auto" }}>
                {NONPROFIT_EVENTS.map(ev => (
                  <button key={ev.id} onClick={() => { setSelectedEvent(ev); setModalStep("event-prompt"); }} style={{
                    display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 14px",
                    borderRadius: 10, border: `1px solid ${selectedEvent?.id === ev.id ? "#6366f1" : "#2d3148"}`,
                    background: selectedEvent?.id === ev.id ? "#1e1b4b" : "#0d0f17",
                    cursor: "pointer", textAlign: "left", width: "100%",
                  }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#6366f122", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🎉</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#f9fafb", fontSize: 14, fontWeight: 600 }}>{ev.name}</div>
                      <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>{ev.date}</div>
                      <div style={{ color: "#6b7280", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>{ev.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Event flow — Step 3b: Prompt */}
          {modalStep === "event-prompt" && selectedEvent && (
            <>
              <div style={headerRow}>
                <h2 style={sectionTitle}>Event Post</h2>
                <button style={closeBtnStyle} onClick={closeModal}>✕</button>
              </div>
              <button style={backBtnStyle} onClick={() => { setEventPrompt(""); setModalStep("event-select"); }}>← Back to events</button>

              {/* Selected event preview */}
              <div style={{
                display: "flex", alignItems: "flex-start", gap: 12, padding: "14px",
                borderRadius: 10, border: "1px solid #6366f1", background: "#1e1b4b", marginBottom: 20,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#6366f122", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🎉</div>
                <div>
                  <div style={{ color: "#f9fafb", fontSize: 14, fontWeight: 600 }}>{selectedEvent.name}</div>
                  <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 2 }}>{selectedEvent.date}</div>
                </div>
              </div>

              <label style={{ color: "#9ca3af", fontSize: 13, display: "block", marginBottom: 8 }}>Describe what the post should focus on or include:</label>
              <textarea
                value={eventPrompt}
                onChange={e => setEventPrompt(e.target.value)}
                placeholder="e.g. Highlight the free adoption specials, mention the live music, encourage families to attend..."
                style={{
                  width: "100%", minHeight: 110, padding: 14, borderRadius: 10,
                  border: "1px solid #2d3148", background: "#0d0f17", color: "#e5e7eb",
                  fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box",
                }}
              />

              <button onClick={() => { /* TODO: submit event post */ closeModal(); }} style={{
                width: "100%", padding: 14, borderRadius: 10, marginTop: 16,
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                border: "none", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
              }}>
                ✦ Generate Event Post
              </button>
            </>
          )}
        </div>
      </div>
    );
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
            onClick={openModal}
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

        {renderModal()}

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
