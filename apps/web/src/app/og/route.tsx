import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Gabriel Fonseca';
    const description =
      searchParams.get('description') ||
      'Lisbon-based software developer & founder of Frontal Labs.';

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '24px',
            }}
          >
            GF
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#fff',
              letterSpacing: '-0.025em',
            }}
          >
            gabfon.com
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontSize: '84px',
              fontWeight: 'bold',
              color: '#fff',
              lineHeight: '1.1',
              marginBottom: '0',
              letterSpacing: '-0.05em',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '42px',
              color: '#888',
              maxWidth: '800px',
              lineHeight: '1.4',
              letterSpacing: '-0.025em',
            }}
          >
            {description}
          </p>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div style={{ color: '#fff', fontSize: '24px', opacity: '0.5' }}>
            Founder @ Frontal Labs
          </div>
          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#333',
            }}
          />
          <div style={{ color: '#fff', fontSize: '24px', opacity: '0.5' }}>
            Lisbon, Portugal
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (_error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
