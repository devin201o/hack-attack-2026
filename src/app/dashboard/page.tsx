"use client";

import { useState, useEffect } from "react";

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const ANIMALS = [
  { id: 1, name: "Mango", species: "Cat", breed: "Orange Tabby", age: 2, gender: "Male", location: "Shelter A", status: "Available", weight: "9 lbs", color: "Orange", desc: "Mango is a playful and affectionate tabby who loves sunny spots and chin scratches. Great with kids.", image: "🐱", intakeDate: "2025-01-10", applications: 3 },
  { id: 2, name: "Luna", species: "Cat", breed: "Siamese Mix", age: 4, gender: "Female", location: "Shelter B", status: "Pending", weight: "7 lbs", color: "Cream/Brown", desc: "Luna is a graceful and intelligent cat who bonds deeply with her person. Prefers a quiet home.", image: "🐈", intakeDate: "2024-12-03", applications: 5 },
  { id: 3, name: "Biscuit", species: "Cat", breed: "Domestic Shorthair", age: 1, gender: "Male", location: "Foster Home", status: "Available", weight: "6 lbs", color: "White/Brown", desc: "Biscuit is a kitten full of energy and mischief. He loves toys and chasing shadows.", image: "🐱", intakeDate: "2025-02-14", applications: 7 },
  { id: 4, name: "Shadow", species: "Cat", breed: "Black Domestic", age: 6, gender: "Male", location: "Shelter A", status: "Available", weight: "11 lbs", color: "Black", desc: "Shadow is a calm, wise cat who prefers lounging over playing. Ideal for apartment life.", image: "🐈‍⬛", intakeDate: "2024-11-20", applications: 1 },
  { id: 5, name: "Peaches", species: "Cat", breed: "Persian Mix", age: 3, gender: "Female", location: "Foster Home", status: "Adopted", weight: "8 lbs", color: "Peach/White", desc: "Peaches found her forever home! She loves long naps and gentle pets.", image: "🐱", intakeDate: "2024-09-01", applications: 9 },
  { id: 6, name: "Ozzy", species: "Cat", breed: "Maine Coon Mix", age: 5, gender: "Male", location: "Shelter B", status: "Available", weight: "14 lbs", color: "Gray Tabby", desc: "Ozzy is a big gentle giant who loves being brushed and watching birds from the window.", image: "🐈", intakeDate: "2025-01-28", applications: 2 },
  { id: 7, name: "Cleo", species: "Cat", breed: "Tortoiseshell", age: 7, gender: "Female", location: "Shelter A", status: "Pending", weight: "9 lbs", color: "Tortoiseshell", desc: "Cleo has seen it all and she's still charming. A wise senior cat looking for her last loving home.", image: "🐱", intakeDate: "2024-10-15", applications: 4 },
  { id: 8, name: "Noodle", species: "Cat", breed: "Sphynx Mix", age: 2, gender: "Female", location: "Foster Home", status: "Available", weight: "6 lbs", color: "Pink/Gray", desc: "Noodle is hairless, warm, and absolutely loves cuddles. Velcro cat — she never leaves your side.", image: "🐈", intakeDate: "2025-03-02", applications: 6 },
];

const APPLICATIONS = [
  { id: 1, animalId: 1, applicant: "Sarah Chen", date: "2025-03-01", status: "Under Review", email: "sarah@email.com" },
  { id: 2, animalId: 2, applicant: "Marcus Webb", date: "2025-02-28", status: "Approved", email: "marcus@email.com" },
  { id: 3, animalId: 3, applicant: "Priya Nair", date: "2025-03-03", status: "Pending", email: "priya@email.com" },
  { id: 4, animalId: 1, applicant: "Tom Bakker", date: "2025-03-04", status: "Pending", email: "tom@email.com" },
  { id: 5, animalId: 6, applicant: "Yuki Tanaka", date: "2025-03-05", status: "Under Review", email: "yuki@email.com" },
];

const CONTENT_HISTORY = [
  { id: 1, animalId: 1, type: "Social Post", date: "2025-02-20", preview: "🍊 Meet Mango! This sunshine-colored tabby is looking for his forever human..." },
  { id: 2, animalId: 2, type: "Adoption Bio", date: "2025-02-18", preview: "Luna is a refined Siamese mix who will bring elegance and quiet companionship..." },
  { id: 3, animalId: 3, type: "Social Post", date: "2025-03-01", preview: "🍪 Biscuit is breaking hearts at the shelter! This fluffy little troublemaker..." },
];

// ─── THEME ───────────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  Available: { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  Pending:   { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  Adopted:   { bg: "#e0e7ff", text: "#3730a3", dot: "#6366f1" },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.Available;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c.bg, color: c.text,
      padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
      {status}
    </span>
  );
}

function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "⊞", href: "/dashboard" },
    { id: "animals", label: "Animal Management", icon: "🐾", href: "/animal-management" },
    { id: "marketing", label: "Marketing Hub", icon: "✦", href: "/marketing-hub" },
    { id: "profile", label: "Profile", icon: "◎", href: "/profile" },
  ];
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
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)} style={{
            display: "flex", alignItems: "center", gap: 12,
            width: "100%", padding: "10px 12px", borderRadius: 8, border: "none",
            background: page === n.id ? "#1e2130" : "transparent",
            color: page === n.id ? "#f97316" : "#6b7280",
            cursor: "pointer", fontSize: 14, fontWeight: page === n.id ? 600 : 400,
            marginBottom: 2, transition: "all 0.15s", textAlign: "left"
          }}>
            <span style={{ fontSize: 16 }}>{n.icon}</span>
            {n.label}
            {page === n.id && <span style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "#f97316" }} />}
          </button>
        ))}
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

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
function DashboardPage({ setPage, setSelectedAnimal }: { setPage: (p: string) => void; setSelectedAnimal: (a: any) => void }) {
  const available = ANIMALS.filter(a => a.status === "Available").length;
  const pending = ANIMALS.filter(a => a.status === "Pending").length;
  const adopted = ANIMALS.filter(a => a.status === "Adopted").length;

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1100 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: "#f9fafb", fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 700, margin: 0 }}>Good morning 🌤️</h1>
        <p style={{ color: "#6b7280", marginTop: 6, fontSize: 15 }}>Here's what's happening at the shelter today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
        {[
          { label: "Total Animals", val: ANIMALS.length, icon: "🐾", color: "#f97316" },
          { label: "Available", val: available, icon: "✓", color: "#10b981" },
          { label: "Pending", val: pending, icon: "⏳", color: "#f59e0b" },
          { label: "Applications", val: APPLICATIONS.length, icon: "📋", color: "#6366f1" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#161820", borderRadius: 12, padding: "20px 22px",
            border: "1px solid #1e2130"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                <div style={{ color: "#f9fafb", fontSize: 28, fontWeight: 700 }}>{s.val}</div>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: s.color + "22", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 18, color: s.color
              }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
        {[
          { label: "Add Animal", icon: "+", action: () => setPage("animals") },
          { label: "View Applications", icon: "📋", action: () => setPage("animals") },
          { label: "Generate Content", icon: "✦", action: () => setPage("marketing") },
        ].map(q => (
          <button key={q.label} onClick={q.action} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 18px", borderRadius: 8, border: "1px solid #2d3148",
            background: "#161820", color: "#d1d5db", cursor: "pointer", fontSize: 14,
            fontWeight: 500, transition: "all 0.15s"
          }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.target as HTMLButtonElement).style.borderColor = "#f97316"}
onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.target as HTMLButtonElement).style.borderColor = "#2d3148"}
          >
            <span style={{ fontSize: 16 }}>{q.icon}</span> {q.label}
          </button>
        ))}
      </div>

      {/* Animal Cards */}
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#f9fafb", fontSize: 18, fontWeight: 600, margin: 0 }}>Adoption Animals</h2>
        <button onClick={() => setPage("animals")} style={{
          background: "none", border: "none", color: "#f97316", cursor: "pointer", fontSize: 13, fontWeight: 500
        }}>View all →</button>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16,
        overflowY: "auto", maxHeight: 480, paddingBottom: 8
      }}>
        {ANIMALS.map(animal => (
          <AnimalCard key={animal.id} animal={animal} onClick={() => { setSelectedAnimal(animal); setPage("animal-detail"); }} />
        ))}
      </div>
    </div>
  );
}

function AnimalCard({ animal, onClick }: { animal: any; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const emojiBg = (({
    Available: "linear-gradient(135deg, #064e3b, #065f46)",
    Pending: "linear-gradient(135deg, #78350f, #92400e)",
    Adopted: "linear-gradient(135deg, #1e1b4b, #3730a3)",
  } as const)[animal.status as "Available" | "Pending" | "Adopted"]) || "linear-gradient(135deg, #064e3b, #065f46)";

  return (
    <div onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#161820", borderRadius: 14, overflow: "hidden",
        border: `1px solid ${hovered ? "#f97316" : "#1e2130"}`,
        cursor: "pointer", transition: "all 0.2s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(249,115,22,0.12)" : "none"
      }}>
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

// ─── ANIMAL MANAGER PAGE ──────────────────────────────────────────────────────
function AnimalsPage({ setSelectedAnimal, setPage }: { setSelectedAnimal: (a: any) => void; setPage: (p: string) => void }) {
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
                  <button onClick={() => { setSelectedAnimal(a); setPage("animal-detail"); }} style={{
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

// ─── ANIMAL DETAIL PAGE ───────────────────────────────────────────────────────
function AnimalDetailPage({ animal, setPage }: { animal: any; setPage: (p: string) => void }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...animal });

  const animalApps = APPLICATIONS.filter(a => a.animalId === animal.id);

  return (
    <div style={{ padding: "32px 36px", maxWidth: 860 }}>
      <button onClick={() => setPage("animals")} style={{
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
          <button onClick={() => setPage("marketing")} style={{
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

// ─── MARKETING HUB ────────────────────────────────────────────────────────────
function MarketingPage({ selectedAnimal }: { selectedAnimal: any }) {
  const [chosenAnimal, setChosenAnimal] = useState(selectedAnimal || ANIMALS[0]);
  const [contentType, setContentType] = useState("Social Post");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState(CONTENT_HISTORY);

  const generateContent = async () => {
    setLoading(true);
    setOutput("");
    try {
      const prompt = `Write a ${contentType} for a cat named ${chosenAnimal.name} (${chosenAnimal.breed}, ${chosenAnimal.age} years old, ${chosenAnimal.gender}). Bio: ${chosenAnimal.desc}. Keep it warm, engaging, and suitable for a cat adoption shelter. ${contentType === "Social Post" ? "Include relevant emojis and a call to action." : "Write in a professional yet heartfelt tone."} Keep it under 150 words.`;

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await resp.json();
      const text = data.content?.map((c: any) => c.text || "").join("") || "Could not generate content.";
      setOutput(text);
      setHistory(prev => [{
        id: Date.now(), animalId: chosenAnimal.id, type: contentType,
        date: new Date().toISOString().split("T")[0], preview: text.slice(0, 80) + "..."
      }, ...prev]);
    } catch {
      setOutput("⚠️ Error generating content. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#f9fafb", fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, margin: 0 }}>Marketing Hub</h1>
        <p style={{ color: "#6b7280", marginTop: 6, fontSize: 14 }}>Generate adoption content powered by AI</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24 }}>
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#161820", borderRadius: 12, border: "1px solid #1e2130", padding: 20 }}>
            <h3 style={{ color: "#f9fafb", margin: "0 0 14px", fontSize: 15 }}>1. Select Animal</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 220, overflowY: "auto" }}>
              {ANIMALS.map(a => (
                <button key={a.id} onClick={() => setChosenAnimal(a)} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                  borderRadius: 8, border: `1px solid ${chosenAnimal.id === a.id ? "#f97316" : "#2d3148"}`,
                  background: chosenAnimal.id === a.id ? "#2d1a0a" : "transparent",
                  cursor: "pointer", textAlign: "left"
                }}>
                  <span style={{ fontSize: 22 }}>{a.image}</span>
                  <div>
                    <div style={{ color: "#f9fafb", fontSize: 14, fontWeight: 500 }}>{a.name}</div>
                    <div style={{ color: "#6b7280", fontSize: 12 }}>{a.breed}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "#161820", borderRadius: 12, border: "1px solid #1e2130", padding: 20 }}>
            <h3 style={{ color: "#f9fafb", margin: "0 0 14px", fontSize: 15 }}>2. Content Type</h3>
            {["Social Post", "Adoption Bio", "Email Campaign", "Flyer Copy"].map(t => (
              <button key={t} onClick={() => setContentType(t)} style={{
                display: "block", width: "100%", padding: "10px 12px", marginBottom: 6,
                borderRadius: 8, border: `1px solid ${contentType === t ? "#f97316" : "#2d3148"}`,
                background: contentType === t ? "#2d1a0a" : "transparent",
                color: contentType === t ? "#f97316" : "#9ca3af",
                cursor: "pointer", fontSize: 14, textAlign: "left", fontWeight: contentType === t ? 600 : 400
              }}>{t}</button>
            ))}
          </div>

          <button onClick={generateContent} disabled={loading} style={{
            padding: "14px", borderRadius: 10,
            background: loading ? "#4b5563" : "linear-gradient(135deg, #f97316, #fb923c)",
            border: "none", color: "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer"
          }}>{loading ? "Generating..." : "✦ Generate"}</button>
        </div>

        {/* Output */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{
            background: "#161820", borderRadius: 12, border: "1px solid #1e2130", padding: 24,
            minHeight: 200
          }}>
            <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Generated Output</div>
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#6b7280" }}>
                <div style={{ width: 16, height: 16, border: "2px solid #f97316", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                Writing content for {chosenAnimal.name}...
              </div>
            ) : output ? (
              <div>
                <p style={{ color: "#e5e7eb", fontSize: 15, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{output}</p>
                <button onClick={() => navigator.clipboard?.writeText(output)} style={{
                  marginTop: 16, padding: "7px 16px", borderRadius: 6,
                  background: "transparent", border: "1px solid #2d3148",
                  color: "#9ca3af", cursor: "pointer", fontSize: 13
                }}>Copy text</button>
              </div>
            ) : (
              <p style={{ color: "#4b5563", fontSize: 14, fontStyle: "italic" }}>Select an animal and content type, then hit Generate.</p>
            )}
          </div>

          <div style={{ background: "#161820", borderRadius: 12, border: "1px solid #1e2130", padding: 24 }}>
            <h3 style={{ color: "#f9fafb", margin: "0 0 16px", fontSize: 15 }}>Content History</h3>
            {history.length === 0 ? <p style={{ color: "#6b7280", fontSize: 14 }}>No content generated yet.</p> : history.map(h => {
              const a = ANIMALS.find(x => x.id === h.animalId);
              return (
                <div key={h.id} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #1e2130" }}>
                  <span style={{ fontSize: 22 }}>{a?.image || "🐾"}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                      <span style={{ color: "#f9fafb", fontSize: 13, fontWeight: 600 }}>{a?.name}</span>
                      <span style={{ background: "#1e2130", color: "#9ca3af", fontSize: 11, padding: "2px 8px", borderRadius: 20 }}>{h.type}</span>
                      <span style={{ color: "#4b5563", fontSize: 11, marginLeft: "auto" }}>{h.date}</span>
                    </div>
                    <p style={{ color: "#6b7280", fontSize: 12, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.preview}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage() {
  return (
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
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const renderPage = () => {
    switch (page) {
      case "dashboard":    return <DashboardPage setPage={setPage} setSelectedAnimal={setSelectedAnimal} />;
      case "animals":      return <AnimalsPage setSelectedAnimal={setSelectedAnimal} setPage={setPage} />;
      case "animal-detail": return selectedAnimal ? <AnimalDetailPage animal={selectedAnimal} setPage={setPage} /> : <AnimalsPage setSelectedAnimal={setSelectedAnimal} setPage={setPage} />;
      case "marketing":    return <MarketingPage selectedAnimal={selectedAnimal} />;
      case "profile":      return <ProfilePage />;
      default:             return <DashboardPage setPage={setPage} setSelectedAnimal={setSelectedAnimal} />;
    }
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "#0a0c12", fontFamily: "'DM Sans', system-ui, sans-serif"
    }}>
      <Sidebar page={page} setPage={setPage} />
      <main style={{ flex: 1, overflowY: "auto" }}>
        {renderPage()}
      </main>
    </div>
  );
}