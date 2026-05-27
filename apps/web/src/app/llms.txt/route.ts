export const dynamic = 'force-static';

export async function GET() {
  const content = `# Gabriel Fonseca - Portfolio (gabfon.com)

Lisbon-based software developer, founder of Frontal Labs, and Computer Engineering student at NOVA FCT.

## Key Projects
- **Frontal Labs**: AI-powered platform to streamline business operations and decision-making.
- **Fluent Theme**: A clean VS Code theme designed by Gabriel.
- **Open Source**: Various projects on GitHub (@gab-fon).

## Technical Stack
- **Frameworks**: Next.js, React, Tailwind CSS.
- **Languages**: TypeScript, JavaScript, Go, Rust.
- **Specialties**: Edge-AI, LLMs, Micro-animations, Product Development.

## Current Activities (/now)
- Studying Computer Engineering.
- Building Frontal Labs.
- Running (Strava).
- Listening to music (Spotify/Last.fm).

## Tools I Use (/use)
- **Editors**: VS Code, Cursor.
- **Browsers**: Arc.
- **OS Tools**: Raycast.
- **AI**: WebLLM, WebGPU.

## Contact
- **Email**: gabriel@frontal.dev
- **Twitter**: @gabfon_
- **GitHub**: @gab-fon
- **LinkedIn**: /in/gabriel-p-fonseca/

## Site Philosophy
A minimal, fast, and 100% static portfolio. No backend required—uses client-side fetches and browser-based AI (WebLLM).
`;

  return new Response(content, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
