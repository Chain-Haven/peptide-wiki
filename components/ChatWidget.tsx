'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  MessageCircle,
  X,
  Send,
  StopCircle,
  FlaskConical,
  User,
  ChevronDown,
  Sparkles,
  RotateCcw,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const SUGGESTED_QUESTIONS = [
  'What is BPC-157 and what does it do?',
  'What is the best healing stack for injuries?',
  'How do I reconstitute a 5mg peptide vial?',
  'What\'s the difference between semaglutide and tirzepatide?',
  'Which GH peptide stack is best for body recomposition?',
  'How do you dose Epithalon for anti-aging?',
  'What peptides help with cognitive enhancement?',
  'What is the Shoemaker CIRS VIP protocol?',
  'Compare BPC-157 and TB-500',
  'What is the safest peptide for beginners?',
]

function MessageBubble({ role, parts }: { role: string; parts: Array<{ type: string; text?: string }> }) {
  const text = parts
    .filter(p => p.type === 'text')
    .map(p => p.text || '')
    .join('')

  const isUser = role === 'user'

  return (
    <div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <div
        className={cn(
          'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs',
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-zinc-800 border border-zinc-700 text-blue-400'
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <FlaskConical className="h-3.5 w-3.5" />}
      </div>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-tl-sm'
        )}
      >
        {isUser ? (
          <p>{text}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-headings:text-white prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-1 prose-ul:my-1.5 prose-li:my-0.5 prose-code:bg-zinc-700 prose-code:px-1 prose-code:rounded prose-a:text-blue-400 prose-strong:text-white">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
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
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, stop, error, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSend = (text?: string) => {
    const msg = text ?? inputValue
    if (!msg.trim() || isLoading) return
    setShowSuggestions(false)
    sendMessage({ text: msg })
    setInputValue('')
  }

  const handleSuggestion = (q: string) => {
    setShowSuggestions(false)
    sendMessage({ text: q })
  }

  const handleReset = () => {
    setMessages([])
    setShowSuggestions(true)
  }

  const hasMessages = messages.length > 0

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[min(420px,calc(100vw-32px))] h-[min(620px,calc(100vh-120px))] flex flex-col bg-zinc-950 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex-shrink-0">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">PeptideWiki AI</p>
                <p className="text-xs text-zinc-500 leading-tight">
                  {isLoading ? (
                    <span className="text-blue-400 animate-pulse">Thinking...</span>
                  ) : (
                    'Ask me anything about peptides'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {hasMessages && (
                <button
                  onClick={handleReset}
                  className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors rounded-lg hover:bg-zinc-800"
                  title="Clear chat"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors rounded-lg hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
            {/* Welcome message */}
            {!hasMessages && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  <FlaskConical className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-zinc-200 max-w-[85%]">
                  <p className="font-medium text-white mb-1">Hi! I'm PeptideWiki AI 👋</p>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    I can answer questions about peptide mechanisms, dosing, reconstitution, stacks, research, vendors, and more — drawing from our database of 61 peptides.
                  </p>
                </div>
              </div>
            )}

            {/* Suggested questions */}
            {showSuggestions && !hasMessages && (
              <div className="space-y-2">
                <p className="text-xs text-zinc-600 uppercase tracking-wider px-1">Suggested questions</p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_QUESTIONS.slice(0, 5).map(q => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      className="text-left text-xs text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 px-3 py-2 rounded-xl transition-all leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map(m => (
              <MessageBubble key={m.id} role={m.role} parts={m.parts as Array<{ type: string; text?: string }>} />
            ))}

            {/* Typing indicator */}
            {status === 'submitted' && <TypingIndicator />}

            {/* Error state */}
            {error && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                  <X className="h-3.5 w-3.5 text-red-400" />
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-red-400 max-w-[85%]">
                  <p className="font-medium">Something went wrong</p>
                  <p className="text-xs mt-0.5 opacity-80">{error.message || 'Please try again.'}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-1.5 bg-zinc-900/50 border-t border-zinc-800/50 flex-shrink-0">
            <p className="text-center text-zinc-600" style={{ fontSize: '10px', lineHeight: '1.3' }}>
              For research purposes only. Not medical advice.
            </p>
          </div>

          {/* Input area */}
          <div className="px-3 py-3 bg-zinc-900 border-t border-zinc-800 flex-shrink-0">
            <div className="flex gap-2 items-end">
              <div className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl focus-within:border-blue-500 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Ask about any peptide..."
                  disabled={isLoading}
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none resize-none"
                />
              </div>
              {isLoading ? (
                <button
                  onClick={stop}
                  className="flex-shrink-0 p-2.5 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition-colors"
                  title="Stop generating"
                >
                  <StopCircle className="h-4 w-4 text-zinc-300" />
                </button>
              ) : (
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="flex-shrink-0 p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors"
                  title="Send message"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={cn(
          'fixed bottom-4 right-4 z-50 w-14 h-14 rounded-2xl shadow-lg shadow-black/40 flex items-center justify-center transition-all duration-200',
          isOpen
            ? 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-700'
            : 'bg-blue-600 hover:bg-blue-500 hover:scale-105'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open AI chat'}
      >
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-600" />
          </div>
        )}
      </button>
    </>
  )
}
