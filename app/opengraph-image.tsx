import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'

export const runtime = 'edge'
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Default social-share card applied to every route that doesn't define its own.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b1220 0%, #09090b 55%, #0a0f1f 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              background: 'linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: '-2px',
            }}
          >
            Pw
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>
            Peptide<span style={{ color: '#38bdf8' }}>Wiki</span>
          </div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          The complete peptide research database
        </div>
        <div style={{ fontSize: 30, color: '#a1a1aa', marginTop: 28, maxWidth: 920 }}>
          Mechanisms · clinical-trial data · dosage protocols · vendor pricing · molecular structures
        </div>
      </div>
    ),
    { ...size }
  )
}
