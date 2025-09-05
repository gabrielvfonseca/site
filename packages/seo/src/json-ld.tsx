import type { Thing, WithContext } from 'schema-dts';

interface JsonLdProps {
  code: WithContext<Thing>;
}

/**
 * The JsonLd component for the SEO.
 * @param props - The JsonLd props.
 * @returns The JsonLd component.
 */
export function JsonLd({ code }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is a JSON-LD script, not user-generated content."
      // biome-ignore lint/style/useNamingConvention: "This is a React-specific prop name"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
    />
  );
}

export * from 'schema-dts';
