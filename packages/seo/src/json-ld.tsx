import type { JSX } from 'react';
import type { Thing, WithContext } from 'schema-dts';

type JsonLdProps = {
  code: WithContext<Thing>;
};

/**
 * The JsonLd component for the SEO.
 * @param props - The JsonLd props.
 * @returns The JsonLd component.
 */
export function JsonLd({ code }: JsonLdProps): JSX.Element {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is a JSON-LD script, not user-generated content."
      // biome-ignore lint/style/useNamingConvention: "This is a React-specific prop name"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
      type="application/ld+json"
    />
  );
}

export * from 'schema-dts';
