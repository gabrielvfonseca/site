import { format } from 'date-fns';

export default function ColophonPage() {
  const lastUpdated = new Date('2026-03-26');

  return (
    <div className="flex max-w-prose flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl tracking-tight">Colophon</h1>
        <p className="text-muted-foreground">
          Behind the scenes of how this site was built.
        </p>
      </section>

      <section className="flex flex-col gap-6 text-base text-foreground/90 leading-7">
        <p>
          gabfon.com is designed to be a minimal, fast, and 100% static-first
          digital portfolio. Everything runs with client-side JavaScript fetches
          or browser-based WebLLM.
        </p>

        <div className="flex flex-col gap-3 border-border border-t pt-4">
          <h2 className="font-semibold text-foreground">Stack</h2>
          <ul className="flex list-inside list-disc flex-col gap-2 text-muted-foreground text-sm">
            <li>
              <span className="text-foreground">Framework:</span> Next.js (App
              Router)
            </li>
            <li>
              <span className="text-foreground">Styling:</span> Tailwind CSS 4.x
            </li>
            <li>
              <span className="text-foreground">Aesthetics:</span> Dark-first,
              Glassmorphism, Fluent-inspired
            </li>
            <li>
              <span className="text-foreground">Deployment:</span> Vercel
              (Static Generation)
            </li>
            <li>
              <span className="text-foreground">AI:</span> WebLLM + WebGPU for
              on-device reasoning
            </li>
            <li>
              <span className="text-foreground">Data:</span> Public fetches for
              GitHub, Spotify, and Strava
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-border border-t pt-4">
          <h2 className="font-semibold text-foreground">Philosophy</h2>
          <p className="text-sm">
            This site is built around the "zero-backend" philosophy for my
            personal presence. By leveraging client-side APIs and edge-AI, the
            site is free to host, blisteringly fast, and respects visitor
            privacy by never storing session data on a server.
          </p>
        </div>

        <div className="flex flex-col gap-3 border-border border-t pt-4">
          <h2 className="font-semibold text-foreground">Typography & Design</h2>
          <p className="text-sm">
            The design follows a clean, spacious layout using modern sans-serif
            fonts. The interactive elements (like the /now page and /ai coach)
            bring life to what would otherwise be a static resume.
          </p>
        </div>

        <p className="border-border border-t pt-8 text-muted-foreground text-xs">
          Last updated on {format(lastUpdated, 'MMMM do, yyyy')}. Built with
          care in Lisbon.
        </p>
      </section>
    </div>
  );
}
