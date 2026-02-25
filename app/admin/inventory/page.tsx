'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import {
  RefreshCw, CheckCircle, XCircle, AlertCircle, Clock, ExternalLink,
  BarChart3, Search, Filter, ShieldCheck, Zap, Brain, BookOpen, Play,
  Sparkles, TrendingUp, Eye
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type PriceRow = {
  id: string
  product_url: string | null
  in_stock: boolean
  last_checked_at: string | null
  check_error: string | null
  stock_source: string
  price: number
  quantity_mg: number
  form: string
  peptide: { name: string; slug: string } | null
  supplier: { name: string; slug: string; affiliate_url: string | null } | null
}

type LogRow = {
  id: string
  run_at: string
  total_checked: number
  in_stock_count: number
  out_of_stock_count: number
  error_count: number
  duration_ms: number
  triggered_by: string
}

type AILogRow = {
  id: string
  peptide_name: string
  supplier_slug: string
  product_url: string
  action: string
  confidence: number
  reasoning: string
  page_title: string
  detected_price: number | null
  detected_stock: boolean
  detected_product_name: string
  was_overridden: boolean
  created_at: string
}

type LearningNote = {
  id: string
  note: string
  source: string
  created_at: string
}

function timeAgo(iso: string | null): string {
  if (!iso) return 'Never'
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (mins > 0) return `${mins}m ago`
  return 'Just now'
}

export default function InventoryAdminPage() {
  const [prices, setPrices] = useState<PriceRow[]>([])
  const [logs, setLogs] = useState<LogRow[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<Record<string, unknown> | null>(null)
  const [search, setSearch] = useState('')
  const [filterVendor, setFilterVendor] = useState('all')
  const [filterStock, setFilterStock] = useState<'all' | 'in_stock' | 'out_of_stock' | 'errors' | 'unchecked'>('all')
  const [secretInput, setSecretInput] = useState('')
  const [authed, setAuthed] = useState(false)

  // AI scraper state
  const [aiLogs, setAiLogs] = useState<AILogRow[]>([])
  const [learningNotes, setLearningNotes] = useState<LearningNote[]>([])
  const [aiSyncing, setAiSyncing] = useState(false)
  const [aiReviewing, setAiReviewing] = useState(false)
  const [aiResult, setAiResult] = useState<Record<string, unknown> | null>(null)
  const [activeTab, setActiveTab] = useState<'inventory' | 'ai'>('inventory')

  const fetchData = useCallback(async () => {
    const [pricesRes, logsRes, aiLogsRes, notesRes] = await Promise.all([
      supabase
        .from('prices')
        .select('id, product_url, in_stock, last_checked_at, check_error, stock_source, price, quantity_mg, form, peptide:peptides(name, slug), supplier:suppliers(name, slug, affiliate_url)')
        .order('last_checked_at', { ascending: true, nullsFirst: true }),
      supabase
        .from('inventory_check_log')
        .select('*')
        .order('run_at', { ascending: false })
        .limit(10),
      supabase
        .from('scraper_ai_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50),
      supabase
        .from('scraper_learning')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20),
    ])

    if (pricesRes.data) setPrices(pricesRes.data as unknown as PriceRow[])
    if (logsRes.data) setLogs(logsRes.data)
    if (aiLogsRes.data) setAiLogs(aiLogsRes.data as AILogRow[])
    if (notesRes.data) setLearningNotes(notesRes.data as LearningNote[])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSync = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/admin/trigger-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: secretInput }),
      })
      const data = await res.json() as Record<string, unknown>
      setSyncResult(data)
      if (res.ok) {
        // Refresh data after sync
        await fetchData()
      }
    } catch (err) {
      setSyncResult({ error: 'Network error', details: String(err) })
    } finally {
      setSyncing(false)
    }
  }

  // AI Scraper handlers
  const handleAiScraper = async () => {
    setAiSyncing(true)
    setAiResult(null)
    try {
      const baseUrl = window.location.origin
      const res = await fetch(`${baseUrl}/api/cron/ai-scraper`, {
        headers: {
          'Authorization': `Bearer ${secretInput}`,
          'x-triggered-by': 'admin_manual',
        },
      })
      const data = await res.json() as Record<string, unknown>
      setAiResult(data)
      if (res.ok) await fetchData()
    } catch (err) {
      setAiResult({ error: 'Network error', details: String(err) })
    } finally {
      setAiSyncing(false)
    }
  }

  const handleSelfReview = async () => {
    setAiReviewing(true)
    setAiResult(null)
    try {
      const baseUrl = window.location.origin
      const res = await fetch(`${baseUrl}/api/cron/ai-self-review`, {
        headers: {
          'Authorization': `Bearer ${secretInput}`,
          'x-triggered-by': 'admin_manual',
        },
      })
      const data = await res.json() as Record<string, unknown>
      setAiResult(data)
      if (res.ok) await fetchData()
    } catch (err) {
      setAiResult({ error: 'Network error', details: String(err) })
    } finally {
      setAiReviewing(false)
    }
  }

  const ACTION_COLORS: Record<string, string> = {
    KEEP: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    MARK_OOS: 'bg-red-500/10 text-red-400 border-red-500/20',
    MARK_INSTOCK: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    UPDATE_PRICE: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    FLAG_WRONG: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    REMOVE_DEAD: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  // Compute stats
  const totalWithUrl = prices.filter(p => p.product_url && p.stock_source !== 'login_gated').length
  const totalLoginGated = prices.filter(p => p.stock_source === 'login_gated').length
  const totalInStock = prices.filter(p => p.in_stock && p.stock_source !== 'login_gated').length
  const totalOutOfStock = prices.filter(p => !p.in_stock && p.stock_source !== 'login_gated').length
  const totalErrors = prices.filter(p => p.check_error).length
  const totalUnchecked = prices.filter(p => !p.last_checked_at && p.product_url && p.stock_source !== 'login_gated').length
  const lastRun = logs[0]?.run_at ? new Date(logs[0].run_at) : null

  // Filter prices
  const vendors = [...new Set(prices.map(p => p.supplier?.name).filter(Boolean))]
  const filtered = prices.filter(p => {
    const matchSearch = !search ||
      p.peptide?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.supplier?.name?.toLowerCase().includes(search.toLowerCase())
    const matchVendor = filterVendor === 'all' || p.supplier?.name === filterVendor
    const matchStock =
      filterStock === 'all' ? true :
      filterStock === 'in_stock' ? (p.in_stock && !p.check_error) :
      filterStock === 'out_of_stock' ? (!p.in_stock && !p.check_error) :
      filterStock === 'errors' ? Boolean(p.check_error) :
      filterStock === 'unchecked' ? !p.last_checked_at :
      true
    return matchSearch && matchVendor && matchStock
  })

  if (!authed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl font-bold text-white">Admin Access</h1>
          </div>
          <p className="text-zinc-400 text-sm mb-4">Enter your CRON_SECRET to access the inventory dashboard.</p>
          <input
            type="password"
            placeholder="CRON_SECRET"
            value={secretInput}
            onChange={e => setSecretInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') setAuthed(true) }}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 mb-4"
          />
          <button onClick={() => setAuthed(true)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors">
            Access Dashboard
          </button>
          <p className="text-xs text-zinc-600 mt-3 text-center">
            If no secret is set, any value works in development.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/30">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-5 w-5 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">Inventory Monitor</h1>
              </div>
              <p className="text-zinc-400 text-sm">
                Auto-syncs every 6 hours via Vercel Cron.
                Last run: <span className="text-zinc-300">{lastRun ? timeAgo(lastRun.toISOString()) : 'Never'}</span>
                {lastRun && <span className="text-zinc-600 ml-1">({lastRun.toLocaleString()})</span>}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={fetchData} disabled={loading}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-800 border border-zinc-700 rounded-lg transition-colors">
                <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
              </button>
              <button
                onClick={handleSync}
                disabled={syncing}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  syncing
                    ? 'bg-zinc-700 text-zinc-400 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                )}
              >
                <RefreshCw className={cn('h-4 w-4', syncing && 'animate-spin')} />
                {syncing ? 'Syncing...' : 'Run Sync Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">

        {/* ═══ Tab navigation ═══ */}
        <div className="flex gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          {[
            { id: 'inventory' as const, label: 'Inventory', icon: BarChart3 },
            { id: 'ai' as const, label: 'AI Scraper', icon: Brain },
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                )}>
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.id === 'ai' && aiLogs.length > 0 && (
                  <span className="bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">{aiLogs.length}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Sync result (always visible) */}
        {syncResult && (
          <div className={cn(
            'p-4 rounded-xl border text-sm',
            'error' in syncResult
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          )}>
            <pre className="whitespace-pre-wrap font-mono text-xs">{JSON.stringify(syncResult, null, 2)}</pre>
          </div>
        )}

        {/* ═══ AI Scraper Tab ═══ */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <button onClick={handleAiScraper} disabled={aiSyncing}
                className={cn('flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  aiSyncing ? 'bg-zinc-700 text-zinc-400 cursor-wait' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20')}>
                <Brain className={cn('h-4 w-4', aiSyncing && 'animate-pulse')} />
                {aiSyncing ? 'AI Analyzing...' : 'Run AI Scraper Now'}
              </button>
              <button onClick={handleSelfReview} disabled={aiReviewing}
                className={cn('flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  aiReviewing ? 'bg-zinc-700 text-zinc-400 cursor-wait' : 'bg-cyan-600 hover:bg-cyan-500 text-white')}>
                <Sparkles className={cn('h-4 w-4', aiReviewing && 'animate-spin')} />
                {aiReviewing ? 'Reviewing...' : 'Run Self-Review'}
              </button>
            </div>
            {aiResult && (
              <div className={cn('p-4 rounded-xl border text-sm',
                'error' in aiResult ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-300')}>
                <pre className="whitespace-pre-wrap font-mono text-xs">{JSON.stringify(aiResult, null, 2)}</pre>
              </div>
            )}
            {aiLogs.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {Object.entries(aiLogs.reduce((acc: Record<string, number>, l) => { acc[l.action] = (acc[l.action] || 0) + 1; return acc }, {})).map(([action, count]) => (
                  <div key={action} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full border inline-block mb-1', ACTION_COLORS[action] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20')}>{action}</span>
                    <div className="text-lg font-bold text-white">{count as number}</div>
                  </div>
                ))}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                  <span className="text-xs text-zinc-500 block mb-1">Avg Confidence</span>
                  <div className="text-lg font-bold text-white">{(aiLogs.reduce((s, l) => s + (l.confidence || 0), 0) / aiLogs.length).toFixed(2)}</div>
                </div>
              </div>
            )}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-800">
                <h2 className="font-semibold text-white text-sm flex items-center gap-2"><Brain className="h-4 w-4 text-purple-400" /> AI Decisions ({aiLogs.length})</h2>
              </div>
              {aiLogs.length === 0 ? (
                <div className="px-5 py-10 text-center text-zinc-600 text-sm">No AI decisions yet. Run the AI Scraper to start.</div>
              ) : (
                <div className="divide-y divide-zinc-800/40 max-h-96 overflow-y-auto">
                  {aiLogs.map(log => (
                    <div key={log.id} className="px-5 py-3 hover:bg-zinc-800/20 transition-colors">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', ACTION_COLORS[log.action] || '')}>{log.action}</span>
                        <span className="text-xs font-semibold text-white">{log.peptide_name}</span>
                        <span className="text-xs text-zinc-500">@ {log.supplier_slug}</span>
                        {log.was_overridden && <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full">Overridden</span>}
                      </div>
                      <p className="text-xs text-zinc-400">{log.reasoning}</p>
                      <div className="flex gap-3 mt-1 text-xs text-zinc-600">
                        <span>Conf: <span className={cn('font-mono', log.confidence > 0.85 ? 'text-emerald-400' : log.confidence > 0.6 ? 'text-amber-400' : 'text-red-400')}>{log.confidence?.toFixed(2)}</span></span>
                        {log.detected_price && <span>Price: ${Number(log.detected_price).toFixed(2)}</span>}
                        <span>{timeAgo(log.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-800">
                <h2 className="font-semibold text-white text-sm flex items-center gap-2"><BookOpen className="h-4 w-4 text-cyan-400" /> Learning Notes ({learningNotes.length})</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Automatically appended to AI system prompt to improve accuracy.</p>
              </div>
              {learningNotes.length === 0 ? (
                <div className="px-5 py-8 text-center text-zinc-600 text-sm">No learning notes yet. Run Self-Review after accumulating AI decisions.</div>
              ) : (
                <div className="divide-y divide-zinc-800/40">
                  {learningNotes.map(note => (
                    <div key={note.id} className="px-5 py-3 flex items-start gap-3">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-zinc-300">{note.note}</p>
                        <p className="text-xs text-zinc-600 mt-1">{note.source} · {timeAgo(note.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ Inventory Tab ═══ */}
        {activeTab === 'inventory' && (<>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { label: 'Total Products', value: prices.length, icon: BarChart3, color: 'text-blue-400' },
            { label: 'Tracked', value: totalWithUrl, icon: CheckCircle, color: 'text-zinc-400' },
            { label: 'In Stock', value: totalInStock, icon: CheckCircle, color: 'text-emerald-400' },
            { label: 'Out of Stock', value: totalOutOfStock, icon: XCircle, color: 'text-red-400' },
            { label: 'Errors', value: totalErrors, icon: AlertCircle, color: 'text-amber-400' },
            { label: 'Login-Gated', value: totalLoginGated, icon: ShieldCheck, color: 'text-zinc-500' },
          ].map(stat => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <Icon className={cn('h-4 w-4 mx-auto mb-1.5', stat.color)} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Recent run log */}
        {logs.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800">
              <h2 className="font-semibold text-white text-sm">Recent Sync Runs</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-zinc-600 border-b border-zinc-800 uppercase tracking-wider">
                    {['Time', 'Triggered By', 'Checked', 'In Stock', 'Out of Stock', 'Errors', 'Duration'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {logs.map(log => (
                    <tr key={log.id} className="hover:bg-zinc-800/20">
                      <td className="px-4 py-2.5 text-zinc-300">
                        {new Date(log.run_at).toLocaleString()}
                        <span className="text-zinc-600 ml-2">({timeAgo(log.run_at)})</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={cn(
                          'px-2 py-0.5 rounded-full text-xs',
                          log.triggered_by === 'cron'
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'bg-purple-500/10 text-purple-400'
                        )}>
                          {log.triggered_by}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-zinc-300 font-mono">{log.total_checked}</td>
                      <td className="px-4 py-2.5 text-emerald-400 font-mono">{log.in_stock_count}</td>
                      <td className="px-4 py-2.5 text-red-400 font-mono">{log.out_of_stock_count}</td>
                      <td className="px-4 py-2.5 text-amber-400 font-mono">{log.error_count}</td>
                      <td className="px-4 py-2.5 text-zinc-400 font-mono">{(log.duration_ms / 1000).toFixed(1)}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input type="text" placeholder="Search peptide or vendor..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
            />
          </div>
          <select value={filterVendor} onChange={e => setFilterVendor(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600">
            <option value="all">All Vendors</option>
            {vendors.map(v => <option key={v}>{v}</option>)}
          </select>
          <div className="flex rounded-lg overflow-hidden border border-zinc-800">
            {([
              ['all', 'All'],
              ['in_stock', '✅ In Stock'],
              ['out_of_stock', '❌ Out'],
              ['errors', '⚠ Errors'],
              ['unchecked', '⏱ Unchecked'],
            ] as const).map(([val, label]) => (
              <button key={val} onClick={() => setFilterStock(val)}
                className={cn(
                  'px-3 py-2 text-xs font-medium transition-colors',
                  filterStock === val ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-white'
                )}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Products table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="font-semibold text-white text-sm">
              Products ({filtered.length} of {prices.length})
            </h2>
            <span className="text-xs text-zinc-500">
              {totalUnchecked > 0 && `${totalUnchecked} not yet checked`}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-zinc-600 border-b border-zinc-800 uppercase tracking-wider bg-zinc-950/30">
                  {['Status', 'Peptide', 'Vendor', 'Price', 'Form', 'Last Checked', 'Source', 'Product URL'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/30">
                {filtered.map(price => {
                  const isLoginGated = price.stock_source === 'login_gated'
                  const isUnchecked = !price.last_checked_at && !isLoginGated
                  const hasError = Boolean(price.check_error)

                  return (
                    <tr key={price.id}
                      className={cn(
                        'hover:bg-zinc-800/20 transition-colors',
                        !price.in_stock && !isLoginGated && 'bg-red-500/3'
                      )}>
                      {/* Status */}
                      <td className="px-4 py-2.5">
                        {isLoginGated ? (
                          <span className="flex items-center gap-1 text-zinc-500"><ShieldCheck className="h-3 w-3" /> Gated</span>
                        ) : isUnchecked ? (
                          <span className="flex items-center gap-1 text-zinc-500"><Clock className="h-3 w-3" /> Pending</span>
                        ) : hasError ? (
                          <span className="flex items-center gap-1 text-amber-400" title={price.check_error || ''}>
                            <AlertCircle className="h-3 w-3" /> Error
                          </span>
                        ) : price.in_stock ? (
                          <span className="flex items-center gap-1 text-emerald-400"><CheckCircle className="h-3 w-3" /> In Stock</span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-400"><XCircle className="h-3 w-3" /> Out of Stock</span>
                        )}
                      </td>
                      {/* Peptide */}
                      <td className="px-4 py-2.5">
                        {price.peptide ? (
                          <Link href={`/peptides/${price.peptide.slug}`}
                            className="text-blue-400 hover:text-blue-300 transition-colors">
                            {price.peptide.name}
                          </Link>
                        ) : '—'}
                      </td>
                      {/* Vendor */}
                      <td className="px-4 py-2.5 text-zinc-300">{price.supplier?.name}</td>
                      {/* Price */}
                      <td className="px-4 py-2.5 text-zinc-300 font-mono">${Number(price.price).toFixed(2)}</td>
                      {/* Form */}
                      <td className="px-4 py-2.5 text-zinc-500 capitalize">{price.form?.replace('_', ' ')}</td>
                      {/* Last checked */}
                      <td className="px-4 py-2.5 text-zinc-500">
                        {price.last_checked_at ? timeAgo(price.last_checked_at) : '—'}
                      </td>
                      {/* Source */}
                      <td className="px-4 py-2.5">
                        <span className="text-zinc-600">{price.stock_source || 'unchecked'}</span>
                      </td>
                      {/* URL */}
                      <td className="px-4 py-2.5 max-w-48 truncate">
                        {price.product_url ? (
                          <a href={price.product_url} target="_blank" rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                            <span className="truncate">{price.product_url.replace('https://', '').split('/')[0]}/...</span>
                            <ExternalLink className="h-2.5 w-2.5 flex-shrink-0" />
                          </a>
                        ) : <span className="text-zinc-700">No URL</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-blue-400" />
            How the Inventory Sync Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {[
              { step: '1', title: 'Vercel Cron', desc: 'Triggers /api/cron/sync-inventory every 6 hours at :00' },
              { step: '2', title: 'Fetch Product Pages', desc: 'For each tracked product, fetches the vendor page with a 12s timeout' },
              { step: '3', title: 'Parse Stock Status', desc: 'WooCommerce: checks HTML for out-of-stock indicators. Shopify: calls /products/{handle}.json API' },
              { step: '4', title: 'Update Supabase', desc: 'Batches updates via security definer RPC function. Results visible immediately on product pages.' },
            ].map(s => (
              <div key={s.step} className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">{s.step}</span>
                <div>
                  <p className="font-medium text-zinc-200 mb-0.5">{s.title}</p>
                  <p className="text-zinc-500 leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg text-xs text-zinc-500">
            <strong className="text-zinc-400">Vendor coverage:</strong>{' '}
            PeptideTech (WooCommerce HTML scraping) ·
            Vandl Labs (WooCommerce HTML scraping) ·
            Modified Aminos (Shopify .json API) ·
            Modern Aminos (WooCommerce HTML scraping) ·
            FelixChem (login-gated — assumed in-stock)
          </div>
        </div>

        </>)}
      </div>
    </div>
  )
}
