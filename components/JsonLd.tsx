// Renders a JSON-LD <script> for structured data (schema.org).
// Server-rendered so search engines see it in the initial HTML.

type JsonLdData = Record<string, unknown> | Record<string, unknown>[]

export default function JsonLd({ data, id }: { data: JsonLdData; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Structured data is trusted, machine-generated content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
