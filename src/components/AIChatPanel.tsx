import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Send, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChat } from '@/providers/ChatProvider'
import ReactMarkdown from 'react-markdown'

export function AIChatPanel() {
  const { 
    isChatOpen, 
    toggleChat, 
    messages, 
    sendMessage, 
    clearHistory,
    isLoading, 
    isLoaded,
    progress,
    status 
  } = useChat()

  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input on open
  useEffect(() => {
    if (isChatOpen && isLoaded) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isChatOpen, isLoaded])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !isLoaded) return
    const text = input
    setInput('')
    await sendMessage(text)
  }

  return (
    <div className="flex flex-col h-full bg-white overscroll-none text-gray-900">
      {/* Header with blue gradient - flipped colors */}
      <div className="h-[48px] border-b border-border flex items-center justify-between px-3 bg-gradient-to-b from-[#063a6d] to-[#084c8d] text-white sticky top-0 z-10 font-sans">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white cursor-pointer hover:bg-[#002d5e] hover:text-white" onClick={toggleChat}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-sm">TriMet AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white cursor-pointer hover:bg-[#002d5e] hover:text-white" onClick={clearHistory}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-64 bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#084c8d] h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm font-medium text-muted-foreground">{status || 'Initializing engine...'}</p>
          <p className="text-xs text-muted-foreground italic">Approx. 300MB download on first load. Second visit is instant.</p>
        </div>
      )}

      {/* Messages */}
      {isLoaded && (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {messages.length === 0 && (
            <div className="text-center py-10 space-y-4 px-6">
              <div className="space-y-2">
                <p className="text-muted-foreground text-[16px] font-medium leading-tight">Hello! I'm your TriMet assistant. How can I help you today?</p>
                <p className="text-xs text-muted-foreground/70 italic px-4">
                  (I'm currently untrained, answers will vary. Questions? DigiComm.)
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  'How much is a fare?',
                  'How do I buy a ticket?',
                  'Schedules for the Portland Airport'
                ].map(q => (
                  <button 
                    key={q} 
                    onClick={() => sendMessage(q)} 
                    className="text-xs text-left bg-[#084c8d] text-white hover:bg-[#063a6d] px-4 py-2.5 rounded-xl border-none transition-colors leading-tight shadow-sm cursor-pointer font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed border shadow-sm ${
                m.role === 'user' 
                  ? 'bg-white border-[#084c8d] text-gray-900 rounded-br-none' 
                  : 'bg-white border-gray-200 text-gray-800 rounded-bl-none'
              }`}>
                <div className="prose prose-sm max-w-none text-gray-800 prose-p:leading-relaxed">
                  <ReactMarkdown>
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && messages.length > 0 && messages[messages.length-1].role === 'user' && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 items-center shadow-sm">
                <div className="h-1.5 w-1.5 bg-[#084c8d] rounded-full animate-bounce" />
                <div className="h-1.5 w-1.5 bg-[#084c8d] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="h-1.5 w-1.5 bg-[#084c8d] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sticky Bottom Input */}
      <div className="p-3 border-t border-gray-100 bg-white sticky bottom-0 safe-area-bottom">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={isLoaded ? "Type a message..." : "Loading..."}
            disabled={!isLoaded || isLoading}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-white border border-gray-100 rounded-full py-3 pl-5 pr-12 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#084c8d] disabled:opacity-50"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || !isLoaded || isLoading}
            className="absolute right-1 w-9 h-9 rounded-full bg-[#084c8d] hover:bg-[#063a6d] text-white flex items-center justify-center p-0 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="h-2" /> {/* Mobile home indicator padding */}
      </div>
    </div>
  )
}
