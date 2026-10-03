import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0f3b52 0%, #14506a 60%, #1d6a86 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, color: "#f2b33d", display: "flex" }}>{site.name}</div>
        <div style={{ marginTop: 24, fontSize: 72, fontWeight: 700, lineHeight: 1.1, display: "flex" }}>Compare UK Weight Loss Injections &amp; Tablets</div>
        <div style={{ marginTop: 28, fontSize: 28, opacity: 0.85, display: "flex" }}>{site.description}</div>
      </div>
    ),
    size,
  );
}
