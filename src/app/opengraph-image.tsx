import { ImageResponse } from "next/og"
import { SITE_CONFIG } from "@/lib/constants"

export const alt = `${SITE_CONFIG.name}: ${SITE_CONFIG.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Share card drawn as a drawing sheet: paper, ink, one red underline */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3EFE6",
          color: "#11151B",
          padding: 56,
          border: "14px solid #11151B",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 3 }}>
          <div style={{ display: "flex", fontWeight: 800, fontSize: 40, letterSpacing: -1 }}>
            Hijaz<span style={{ color: "#CC3A1D" }}>.ai</span>
          </div>
          <div style={{ display: "flex", textTransform: "uppercase" }}>Business technology partner</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 118, fontWeight: 800, letterSpacing: -5, lineHeight: 1 }}>
            Technology that
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "flex", fontSize: 118, fontWeight: 800, letterSpacing: -5, lineHeight: 1.05 }}>
              earns its keep.
            </div>
            <div style={{ display: "flex", width: 760, height: 12, background: "#CC3A1D", marginTop: 6 }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "3px solid #11151B",
            paddingTop: 20,
            fontSize: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>Websites · Stores · AI</div>
          <div style={{ display: "flex" }}>Toronto · Durham Region · Canada</div>
        </div>
      </div>
    ),
    size
  )
}
