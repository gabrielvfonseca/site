import type { Thing, WithContext } from 'schema-dts';

type JsonLdProps = {
  code: WithContext<Thing>;
};

export const JsonLd = ({ code }: JsonLdProps) => (
  <script
    type="application/ld+json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is a JSON-LD script, not user-generated content."
    // biome-ignore lint/style/useNamingConvention: "This is a React-specific prop name"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
  />
);

export * from 'schema-dts';
