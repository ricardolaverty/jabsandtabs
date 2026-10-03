import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/** Per-page Open Graph image: /og?title=... */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? site.tagline).slice(0, 140);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #0f3b52 0%, #14506a 60%, #1d6a86 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 36, fontWeight: 700 }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: "#f2b33d", display: "flex" }} />
          {site.name}
        </div>
        <div style={{ fontSize: title.length > 70 ? 54 : 66, fontWeight: 700, lineHeight: 1.15, display: "flex" }}>{title}</div>
        <div style={{ fontSize: 26, opacity: 0.85, display: "flex" }}>Independent, evidence-based comparisons for UK weight loss medicines</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
