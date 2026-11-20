import type { Thing, WithContext } from "schema-dts";

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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
      type="application/ld+json"
    />
  );
}

export * from "schema-dts";
