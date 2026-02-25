'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, ZoomIn, X, FlaskConical } from 'lucide-react'

interface MoleculeViewerProps {
  pubchemCid: string
  peptideName: string
  molecularFormula?: string | null
  molecularWeight?: string | null
  casNumber?: string | null
  iupacName?: string | null
  aminoAcidCount?: number | null
  wikipediaUrl?: string | null
}

export default function MoleculeViewer({
  pubchemCid,
  peptideName,
  molecularFormula,
  molecularWeight,
  casNumber,
  iupacName,
  aminoAcidCount,
  wikipediaUrl,
}: MoleculeViewerProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [imgError, setImgError] = useState(false)

  const structureUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${pubchemCid}/PNG?image_size=300x300`
  const largeStructureUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${pubchemCid}/PNG?image_size=600x600`
  const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/compound/${pubchemCid}`

  return (
    <>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-blue-400" />
            Molecular Structure
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={pubchemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              PubChem <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="p-4">
          {/* Structure Image */}
          <div className="relative group mb-4">
            <div className="bg-white rounded-xl overflow-hidden flex items-center justify-center aspect-square max-w-[240px] mx-auto border border-zinc-200">
              {!imgError ? (
                <Image
                  src={structureUrl}
                  alt={`Molecular structure of ${peptideName}`}
                  width={240}
                  height={240}
                  className="object-contain"
                  onError={() => setImgError(true)}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-400 bg-zinc-50 min-h-[160px]">
                  <FlaskConical className="h-8 w-8 opacity-30" />
                  <p className="text-xs opacity-60">Structure unavailable</p>
                </div>
              )}
            </div>
            {!imgError && (
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-xl"
              >
                <div className="bg-white/90 rounded-full p-2 shadow-lg">
                  <ZoomIn className="h-5 w-5 text-zinc-700" />
                </div>
              </button>
            )}
          </div>

          {/* Molecular Properties Grid */}
          <dl className="grid grid-cols-1 gap-y-2.5 text-sm">
            {casNumber && (
              <div className="flex justify-between items-start gap-2 py-1.5 border-b border-zinc-800/50">
                <dt className="text-zinc-500 text-xs uppercase tracking-wider flex-shrink-0">CAS Number</dt>
                <dd className="text-zinc-200 font-mono text-xs text-right break-all">{casNumber}</dd>
              </div>
            )}
            {pubchemCid && (
              <div className="flex justify-between items-center gap-2 py-1.5 border-b border-zinc-800/50">
                <dt className="text-zinc-500 text-xs uppercase tracking-wider">PubChem CID</dt>
                <dd>
                  <a
                    href={pubchemUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-mono text-xs flex items-center gap-1 transition-colors"
                  >
                    {pubchemCid} <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </dd>
              </div>
            )}
            {molecularWeight && (
              <div className="flex justify-between items-center gap-2 py-1.5 border-b border-zinc-800/50">
                <dt className="text-zinc-500 text-xs uppercase tracking-wider">Molecular Weight</dt>
                <dd className="text-zinc-200 text-xs font-mono">{molecularWeight}</dd>
              </div>
            )}
            {molecularFormula && (
              <div className="flex justify-between items-start gap-2 py-1.5 border-b border-zinc-800/50">
                <dt className="text-zinc-500 text-xs uppercase tracking-wider flex-shrink-0">Mol. Formula</dt>
                <dd className="text-zinc-200 text-xs font-mono text-right break-all">{molecularFormula}</dd>
              </div>
            )}
            {aminoAcidCount != null && aminoAcidCount > 0 && (
              <div className="flex justify-between items-center gap-2 py-1.5 border-b border-zinc-800/50">
                <dt className="text-zinc-500 text-xs uppercase tracking-wider">Amino Acids</dt>
                <dd className="text-zinc-200 text-xs">{aminoAcidCount}-AA peptide</dd>
              </div>
            )}
            {iupacName && (
              <div className="py-1.5 border-b border-zinc-800/50">
                <dt className="text-zinc-500 text-xs uppercase tracking-wider mb-1">IUPAC Name</dt>
                <dd className="text-zinc-400 text-xs leading-relaxed break-words">{iupacName}</dd>
              </div>
            )}
            {wikipediaUrl && (
              <div className="flex justify-between items-center gap-2 py-1.5">
                <dt className="text-zinc-500 text-xs uppercase tracking-wider">Wikipedia</dt>
                <dd>
                  <a
                    href={wikipediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
                  >
                    View article <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl p-4 max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-zinc-900">{peptideName}</h3>
                <p className="text-xs text-zinc-500">2D Molecular Structure — Source: PubChem</p>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-center bg-white rounded-xl overflow-hidden border border-zinc-100">
              <Image
                src={largeStructureUrl}
                alt={`Molecular structure of ${peptideName}`}
                width={560}
                height={560}
                className="object-contain w-full"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-zinc-400">CAS: {casNumber || 'N/A'} · MW: {molecularWeight || 'N/A'}</p>
              <a
                href={pubchemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Full PubChem profile <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
