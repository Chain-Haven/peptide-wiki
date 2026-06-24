// Central site configuration — single source of truth for SEO metadata,
// canonical URLs, sitemap, robots, structured data, and legal pages.

/** Canonical production origin (no trailing slash). Override per-environment. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://peptide-wiki.org').replace(/\/+$/, '')

export const SITE_NAME = 'PeptideWiki'
export const SITE_TAGLINE = 'Comprehensive Peptide Research Database'
export const SITE_DESCRIPTION =
  'The most comprehensive peptide research database — mechanisms of action, clinical-trial data, dosage protocols, vendor price comparisons, molecular structures, and AI-powered answers for 60+ research peptides.'

/** Legal / operating entity behind the site. */
export const ORG_NAME = 'Chain Haven'
export const CONTACT_EMAIL = 'info@chainhaven.co'

/** Build an absolute URL from a root-relative path. */
export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
