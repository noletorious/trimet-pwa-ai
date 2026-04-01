import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Send, Loader2, Bot, User } from 'lucide-react'
import { useWebLLM } from '@/hooks/useWebLLM'
import ReactMarkdown from 'react-markdown'
import { ReactNode } from 'react'

export function AIChatModal({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { engine, isInitializing, progress, init, chat, messages, isGenerating } = useWebLLM()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleOpen = () => {
    setOpen(true)
    if (!engine && !isInitializing) {
      init()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return
    chat(input)
    setInput('')
  }

  return (
    <>
      <div onClick={handleOpen} aria-label="Open AI Assistant" className="inline-flex cursor-pointer transition-opacity hover:opacity-80">
        {trigger}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[450px] h-[80vh] flex flex-col p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 border-b border-border bg-muted/30">
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              TriMet Local AI
            </DialogTitle>
            <DialogDescription>
              Powered by WebLLM running locally in your browser.
            </DialogDescription>
          </DialogHeader>

          {!engine ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <h3 className="font-semibold text-lg">Initializing AI Model</h3>
              <p className="text-sm text-muted-foreground">
                First load downloads the model to your browser cache.
                This may take a few minutes depending on your connection.
              </p>
              {progress && (
                <div className="w-full space-y-2 mt-4">
                  <div className="text-xs font-mono text-muted-foreground bg-muted p-2 rounded max-h-32 overflow-y-auto">
                    {progress.text}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.filter(m => m.role !== 'system').map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                  }`}>
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted rounded-tl-sm'
                  }`}>
                    {msg.content ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none break-words text-current">
                        <ReactMarkdown>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 h-5">
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 border-t border-border bg-background">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="Ask about arriving transit..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={!engine || isGenerating}
                className="flex-1 rounded-full bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!engine || isGenerating || !input.trim()}
                className="rounded-full shrink-0"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
