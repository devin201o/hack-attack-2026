import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "#0a0c12", fontFamily: "'DM Sans', system-ui, sans-serif"
    }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
