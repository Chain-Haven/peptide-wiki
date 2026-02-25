import { supabase } from '@/lib/supabase'
import { ExternalLink, CheckCircle, XCircle, Star } from 'lucide-react'
import type { Supplier } from '@/lib/types'

export const revalidate = 3600

export const metadata = {
  title: 'Peptide Vendors',
  description: 'Compare the top 8 peptide vendors including COA testing, payment methods, ratings, and shipping.',
}

async function getSuppliers() {
  const { data } = await supabase
    .from('suppliers')
    .select('*')
    .order('rating', { ascending: false })
  return data || []
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
      <span className="font-semibold text-white">{rating.toFixed(1)}</span>
      <span className="text-zinc-500 text-xs">/5.0</span>
    </div>
  )
}

export default async function VendorsPage() {
  const suppliers = await getSuppliers()

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Peptide Vendors</h1>
        <p className="text-zinc-400">
          Comparing {suppliers.length} top peptide vendors by COA testing, ratings, payment methods, and shipping.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mb-8 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
        <p className="text-amber-400/80 text-sm">
          <strong>Disclaimer:</strong> All vendors listed sell peptides for research purposes only. Pricing and availability may change. Always verify COA before purchasing.
        </p>
      </div>

      {/* Vendor Cards */}
      <div className="space-y-4 mb-12">
        {suppliers.map((supplier: Supplier, index: number) => (
          <div key={supplier.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold flex-shrink-0">
                  #{index + 1}
                </div>
                <div>
                  <h2 className="font-semibold text-white text-lg">{supplier.name}</h2>
                  <a
                    href={supplier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  >
                    {supplier.url?.replace('https://', '')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <StarRating rating={supplier.rating} />

                <div className="flex items-center gap-1.5">
                  {supplier.has_coa ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400">COA Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-zinc-600" />
                      <span className="text-sm text-zinc-500">No COA</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {supplier.ships_internationally ? (
                    <span className="text-sm text-zinc-400">🌍 Ships Worldwide</span>
                  ) : (
                    <span className="text-sm text-zinc-500">🇺🇸 US Only</span>
                  )}
                </div>

                <a
                  href={supplier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Visit <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {supplier.payment_methods?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Payment Methods</p>
                <div className="flex flex-wrap gap-2">
                  {supplier.payment_methods.map((method: string) => (
                    <span
                      key={method}
                      className="text-xs px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">Quick Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                <th className="text-left px-6 py-3">Vendor</th>
                <th className="text-center px-6 py-3">Rating</th>
                <th className="text-center px-6 py-3">COA</th>
                <th className="text-center px-6 py-3">Ships Intl</th>
                <th className="text-center px-6 py-3">Crypto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {suppliers.map((supplier: Supplier) => {
                const hasCrypto = supplier.payment_methods?.some(
                  m => m.toLowerCase().includes('crypto') || m.toLowerCase().includes('bitcoin')
                )
                return (
                  <tr key={supplier.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <a href={supplier.url} target="_blank" rel="noopener noreferrer"
                        className="font-medium text-white hover:text-blue-400 flex items-center gap-1 transition-colors">
                        {supplier.name} <ExternalLink className="h-3 w-3 text-zinc-600" />
                      </a>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-white text-sm">{supplier.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {supplier.has_coa
                        ? <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                        : <XCircle className="h-4 w-4 text-zinc-600 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {supplier.ships_internationally
                        ? <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                        : <XCircle className="h-4 w-4 text-zinc-600 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {hasCrypto
                        ? <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                        : <XCircle className="h-4 w-4 text-zinc-600 mx-auto" />}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
