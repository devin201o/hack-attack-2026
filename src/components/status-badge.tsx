import { STATUS_COLORS } from "@/lib/shelter-data";

export function StatusBadge({ status }: { status: string }) {
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
