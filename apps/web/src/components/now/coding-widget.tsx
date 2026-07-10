import type { WakaTimeStats } from '@gabfon/wakatime';
import type { JSX } from 'react';

/** How many top languages to show in the bar. */
const MAX_LANGUAGES = 4;
/** Monochrome shades (foreground opacity) applied to language segments. */
const LANGUAGE_SHADES = [
  'bg-foreground',
  'bg-foreground/70',
  'bg-foreground/45',
  'bg-foreground/25',
];

/**
 * Props for {@link CodingWidget}.
 */
interface CodingWidgetProps {
  /** The WakaTime last-7-days payload, or `null` when unavailable. */
  readonly data: WakaTimeStats | null;
}

/**
 * Coding widget: last-7-days total coding time and a thin, monochrome stacked
 * bar of the top languages by share (WakaTime).
 * @param props - The coding widget props.
 * @returns The CodingWidget element.
 */
export function CodingWidget({ data }: CodingWidgetProps): JSX.Element {
  if (!data) {
    return (
      <p className="text-muted-foreground text-sm">
        Coding time is unavailable right now.
      </p>
    );
  }

  const languages = data.languages.slice(0, MAX_LANGUAGES);

  if (languages.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No coding activity in the last 7 days.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-muted-foreground text-sm">
        What I&apos;ve been writing (last 7 days)
      </span>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-muted">
        {languages.map((language, index) => (
          <span
            className={LANGUAGE_SHADES[index]}
            key={language.name}
            style={{ width: `${language.percent}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {languages.map((language, index) => (
          <span
            className="inline-flex items-center gap-1.5 text-muted-foreground text-xs"
            key={language.name}
          >
            <span className={`size-2 rounded-sm ${LANGUAGE_SHADES[index]}`} />
            {language.name}
            <span className="tabular-nums">
              {Math.round(language.percent)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
