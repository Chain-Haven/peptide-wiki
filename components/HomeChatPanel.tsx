'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import {
  Send,
  StopCircle,
  FlaskConical,
  User,
  Sparkles,
  RotateCcw,
  ChevronRight,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

const SUGGESTED_QUESTIONS = [
  { text: 'What is BPC-157 and how does it work?', emoji: '🩹' },
  { text: 'Compare semaglutide vs tirzepatide for weight loss', emoji: '⚖️' },
  { text: 'Best peptide stack for muscle growth and recovery?', emoji: '💪' },
  { text: 'How do I reconstitute a 5mg peptide vial?', emoji: '💉' },
  { text: 'What does clinical data show for Epithalon?', emoji: '🧬' },
  { text: 'Which peptides are FDA approved?', emoji: '✅' },
  { text: 'Explain the CJC-1295 + Ipamorelin stack', emoji: '🔬' },
  { text: 'What peptides help with cognitive enhancement?', emoji: '🧠' },
]

function MessageContent({ parts }: { parts: Array<{ type: string; text?: string }> }) {
  const text = parts.filter(p => p.type === 'text').map(p => p.text || '').join('')
  return (
    <div className="prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-headings:text-white prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-1 prose-ul:my-1.5 prose-li:my-0.5 prose-code:bg-zinc-700 prose-code:px-1 prose-code:rounded prose-a:text-blue-400 prose-strong:text-white">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  )
}

export default function HomeChatPanel() {
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'submitted' || status === 'streaming'
  const hasMessages = messages.length > 0

  useEffect(() => {
    if (hasMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading, hasMessages])

  const handleSend = (text?: string) => {
    const msg = text ?? input
    if (!msg.trim() || isLoading) return
    setStarted(true)
    sendMessage({ text: msg })
    setInput('')
  }

  const handleSuggestion = (q: string) => {
    setStarted(true)
    sendMessage({ text: q })
  }

  const handleReset = () => {
    setMessages([])
    setStarted(false)
    setInput('')
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-blue-600/20 rounded-2xl blur-xl pointer-events-none" />

      <div className="relative bg-zinc-900 border border-zinc-700/80 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">PeptideWiki AI</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs text-zinc-500">
                  {isLoading ? <span className="text-blue-400">Thinking...</span> : 'Online · Ask anything about peptides'}
                </p>
              </div>
            </div>
          </div>
          {hasMessages && (
            <button onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-zinc-800">
              <RotateCcw className="h-3.5 w-3.5" /> New chat
            </button>
          )}
        </div>

        {/* Messages / Welcome area */}
        <div className={cn(
          'overflow-y-auto transition-all duration-300',
          hasMessages ? 'max-h-80 min-h-48' : 'max-h-0'
        )}>
          <div className="px-5 py-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={cn('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                <div className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center',
                  m.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 border border-zinc-700 text-blue-400'
                )}>
                  {m.role === 'user' ? <User className="h-3.5 w-3.5" /> : <FlaskConical className="h-3.5 w-3.5" />}
                </div>
                <div className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-tl-sm'
                )}>
                  {m.role === 'user'
                    ? <p>{(m.parts as Array<{ type: string; text?: string }>).filter(p => p.type === 'text').map(p => p.text).join('')}</p>
                    : <MessageContent parts={m.parts as Array<{ type: string; text?: string }>} />
                  }
                </div>
              </div>
            ))}
            {status === 'submitted' && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  <FlaskConical className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0ms]" />
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:150ms]" />
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested questions (shown before first message) */}
        {!started && (
          <div className="px-5 py-5">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Suggested questions</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED_QUESTIONS.map(q => (
                <button
                  key={q.text}
                  onClick={() => handleSuggestion(q.text)}
                  className="flex items-center gap-2.5 text-left text-xs text-zinc-300 bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-600 px-3.5 py-2.5 rounded-xl transition-all group"
                >
                  <span className="text-base flex-shrink-0">{q.emoji}</span>
                  <span className="flex-1 leading-snug">{q.text}</span>
                  <ChevronRight className="h-3 w-3 text-zinc-600 group-hover:text-zinc-400 flex-shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-zinc-800" />

        {/* Input */}
        <div className="px-4 py-3 bg-zinc-900/50">
          <div className="flex gap-2 items-center">
            <div className="flex-1 flex items-center bg-zinc-800 border border-zinc-700 rounded-xl focus-within:border-blue-500 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                placeholder="Ask about any peptide, protocol, dosing, or research..."
                disabled={isLoading}
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
            {isLoading ? (
              <button onClick={stop}
                className="flex-shrink-0 p-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition-colors">
                <StopCircle className="h-4 w-4 text-zinc-300" />
              </button>
            ) : (
              <button onClick={() => handleSend()}
                disabled={!input.trim()}
                className="flex-shrink-0 p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors">
                <Send className="h-4 w-4 text-white" />
              </button>
            )}
          </div>
          <p className="text-center text-xs text-zinc-700 mt-2">For research purposes only · Not medical advice</p>
        </div>
      </div>
    </div>
  )
}
