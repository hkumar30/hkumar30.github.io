import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#011993',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          fontStyle: 'italic',
          fontWeight: 700,
          color: '#fff',
          fontSize: 14,
          lineHeight: 0.8,
          letterSpacing: '-1.5px',
          padding: '2px 3px',
        }}
      >
        <span>HK</span>
      </div>
    ),
    { ...size },
  );
}
