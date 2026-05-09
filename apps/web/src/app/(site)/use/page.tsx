import { Badge } from '@gabfon/design-system/components/badge';
import { Code, Cpu, Music, Zap } from 'lucide-react';

const USES = [
  {
    category: 'Code',
    icon: <Code className="size-5" />,
    items: [
      {
        name: 'VS Code',
        description: 'Primary editor with my own Fluent Theme.',
        link: 'https://marketplace.visualstudio.com/items?itemName=gabriel-fonseca.fluent-theme',
      },
      {
        name: 'GitHub',
        description: 'Where all my code lives.',
        link: 'https://github.com',
      },
      {
        name: 'Cursor',
        description: 'AI-first code editor for complex refactors.',
        link: 'https://cursor.com',
      },
      {
        name: 'Vercel',
        description: 'Hosting and deployments.',
        link: 'https://vercel.com',
      },
    ],
  },
  {
    category: 'Productivity',
    icon: <Zap className="size-5" />,
    items: [
      {
        name: 'Notion',
        description: 'Second brain for tasks, docs, and notes.',
        link: 'https://notion.so',
      },
      {
        name: 'Raycast',
        description: 'Spotlight replacement on steroids.',
        link: 'https://raycast.com',
      },
      {
        name: 'Arc',
        description: 'The only browser that feels like an OS.',
        link: 'https://arc.net',
      },
    ],
  },
  {
    category: 'Music & Life',
    icon: <Music className="size-5" />,
    items: [
      {
        name: 'Spotify',
        description: 'Fueling my focus since 2012.',
        link: 'https://spotify.com',
      },
      {
        name: 'Last.fm',
        description: 'Tracking every scrobble.',
        link: 'https://last.fm/user/gab_fon',
      },
      {
        name: 'Strava',
        description: 'Motivation for my weekly runs.',
        link: 'https://strava.com/athletes/gabriel_fonseca',
      },
    ],
  },
  {
    category: 'AI Lab',
    icon: <Cpu className="size-5" />,
    items: [
      {
        name: 'WebLLM',
        description: 'Running LLMs at the edge (in the browser).',
        link: 'https://webllm.mlc-ai.org/',
      },
      {
        name: 'Frontal Labs',
        description: 'Building the future of AI operations.',
        link: 'https://frontal.dev',
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl tracking-tight">Uses</h1>
        <p className="text-muted-foreground">
          The tools, hardware, and software I use daily to build and stay
          productive.
        </p>
      </section>

      <div className="flex flex-col gap-12">
        {USES.map((group) => (
          <section className="flex flex-col gap-4" key={group.category}>
            <div className="flex items-center gap-2 border-accent-2 border-b pb-2">
              <span className="text-muted-foreground">{group.icon}</span>
              <h2 className="font-semibold text-lg">{group.category}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.items.map((item) => (
                <a
                  className="group -mx-3 flex flex-col gap-1 rounded-lg border border-transparent p-3 ring-inset transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  href={item.link}
                  key={item.name}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium transition-colors group-hover:text-link">
                      {item.name}
                    </span>
                    <Badge
                      className="text-[10px] opacity-0 transition-opacity group-hover:opacity-100"
                      variant="outline"
                    >
                      Visit
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
