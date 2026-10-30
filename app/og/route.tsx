import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  const title = new URL(request.url).searchParams.get('title')?.slice(0, 120) || 'Full Stack Engineer'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#09090b',
          color: '#fafafa',
        }}
      >
        <div style={{ fontSize: 32, color: '#a1a1aa' }}>Mohammed Sadik</div>
        <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.1, letterSpacing: -2 }}>{title}</div>
        <div style={{ fontSize: 28, color: '#71717a' }}>sadik.is-a.dev</div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
