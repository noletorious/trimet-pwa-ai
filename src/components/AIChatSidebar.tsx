import React, { useEffect, useRef, useState } from 'react'
import { X, Send, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChat } from '@/providers/ChatProvider'
import ReactMarkdown from 'react-markdown'

export function AIChatSidebar() {
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

  if (!isChatOpen) return null

  return (
    <div className="hidden md:flex fixed right-0 top-[50px] bottom-0 w-[400px] bg-white border-l border-gray-100 shadow-2xl z-[100] flex-col transition-transform duration-300">
      {/* Header with blue gradient - flipped colors */}
      <div className="h-[50px] border-b border-border flex items-center justify-between px-4 bg-gradient-to-b from-[#063a6d] to-[#084c8d] text-white">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-300 animate-pulse" />
          <span className="font-semibold text-sm">TriMet AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white cursor-pointer hover:bg-[#002d5e] hover:text-white" onClick={clearHistory}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white cursor-pointer hover:bg-[#002d5e] hover:text-white" onClick={toggleChat}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#084c8d] h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm font-medium text-muted-foreground">{status || 'Initializing model...'}</p>
          <p className="text-xs text-muted-foreground italic">Fastest load (approx. 300MB). Subsequent visits are instant.</p>
        </div>
      )}

      {/* Messages */}
      {isLoaded && (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-10 space-y-1">
              <p className="text-muted-foreground text-sm font-medium">Hello! I'm your TriMet assistant. How can I help you today?</p>
              <p className="text-xs text-muted-foreground/70 italic px-6 mb-4">
                (I'm currently untrained, answers will vary. Questions? DigiComm.)
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['How do I buy a ticket?', 'Plan a trip to PDX', 'Accessibility features'].map(q => (
                  <button key={q} onClick={() => sendMessage(q)} className="text-xs bg-[#084c8d] text-white hover:bg-[#063a6d] px-3 py-1.5 rounded-full transition-colors shadow-sm cursor-pointer border-none font-medium">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm border shadow-sm ${m.role === 'user'
                ? 'bg-white border-[#084c8d] text-gray-900 rounded-br-none'
                : 'bg-white border-gray-200 text-gray-800 rounded-bl-none'
                }`}>
                <div className="prose prose-sm max-w-none text-gray-800">
                  <ReactMarkdown>
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2 flex gap-1 items-center shadow-sm">
                <div className="h-1.5 w-1.5 bg-[#084c8d] rounded-full animate-bounce" />
                <div className="h-1.5 w-1.5 bg-[#084c8d] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="h-1.5 w-1.5 bg-[#084c8d] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder={isLoaded ? "Type a message..." : "Loading AI..."}
            disabled={!isLoaded || isLoading}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-full py-2.5 pl-4 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#084c8d] disabled:opacity-50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || !isLoaded || isLoading}
            className="absolute right-1 w-8 h-8 rounded-full bg-[#084c8d] hover:bg-[#063a6d] text-white flex items-center justify-center p-0 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
