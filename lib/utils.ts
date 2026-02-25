import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// Construct a direct affiliate product URL from a product page URL + supplier slug
export function buildBuyUrl(
  productUrl: string | null,
  supplierSlug: string,
  affiliateUrl: string
): string {
  if (!productUrl || supplierSlug === 'felix-chem') return affiliateUrl
  const params: Record<string, string> = {
    'peptide-tech': '?ref=bre&utm_source=affiliate',
    'vandl-labs': '?ref=BRE',
    'modified-aminos': '?ref=bre',
    'modern-aminos': '?ref=bre',
  }
  const suffix = params[supplierSlug] || ''
  const clean = productUrl.replace(/\/$/, '')
  return suffix ? `${clean}${suffix}` : affiliateUrl
}

export function getResearchStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    fda_approved: 'FDA Approved',
    clinical_trials: 'Clinical Trials',
    research_only: 'Research Only',
    prescription: 'Prescription',
  }
  return labels[status] || status
}

export function getResearchStatusColor(status: string): string {
  const colors: Record<string, string> = {
    fda_approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    clinical_trials: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    research_only: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    prescription: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  }
  return colors[status] || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
}
