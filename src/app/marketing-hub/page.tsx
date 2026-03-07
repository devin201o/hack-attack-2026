"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ANIMALS, CONTENT_HISTORY } from "@/lib/shelter-data";
import type { Animal, ContentHistoryItem } from "@/lib/shelter-data";

export default function MarketingHubPage() {
  const [chosenAnimal, setChosenAnimal] = useState<Animal>(ANIMALS[0]);
  const [contentType, setContentType] = useState("Social Post");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState<ContentHistoryItem[]>(CONTENT_HISTORY);

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
      const text = data.content?.map((c: { text?: string }) => c.text || "").join("") || "Could not generate content.";
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
    <AppShell>
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
    </AppShell>
  );
}
