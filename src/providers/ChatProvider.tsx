import React, { createContext, useContext, useState, useCallback } from 'react'
import type { ChatCompletionMessageParam } from '@mlc-ai/web-llm'
import { useWebLLM } from '@/hooks/useWebLLM'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatContextType {
  messages: Message[]
  isChatOpen: boolean
  toggleChat: () => void
  sendMessage: (content: string) => Promise<void>
  clearHistory: () => void
  isLoading: boolean
  isLoaded: boolean
  progress: number
  status: string
  error: string | null
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

const SYSTEM_PROMPT = "You are a TriMet transit assistant. Only answer questions about buses, MAX, routes, schedules, accessibility, and fare information. Politely decline questions outside this scope."

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const { 
    isLoaded, 
    isLoading: isEngineLoading, 
    progress, 
    status, 
    error, 
    initialize, 
    chat, 
    reset 
  } = useWebLLM()

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev)
    // Initialize model on first open if not already loaded
    if (!isLoaded && !isEngineLoading) {
      initialize()
    }
  }, [isLoaded, isEngineLoading, initialize])

  const sendMessage = useCallback(async (content: string) => {
    if (!isLoaded || isProcessing) return

    const userMsg: Message = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setIsProcessing(true)

    const aiMsg: Message = { role: 'assistant', content: '' }
    setMessages([...newMessages, aiMsg])

    try {
      const chatMessages: ChatCompletionMessageParam[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...newMessages.map(m => ({ role: m.role, content: m.content } as ChatCompletionMessageParam))
      ]

      await chat(chatMessages, (currentContent) => {
        setMessages(prev => {
          const updated = [...prev]
          if (updated.length > 0) {
            updated[updated.length - 1] = { role: 'assistant', content: currentContent }
          }
          return updated
        })
      })
    } catch (err) {
      console.error('Chat error:', err)
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again or check your connection." }
      ])
    } finally {
      setIsProcessing(false)
    }
  }, [isLoaded, isProcessing, messages, chat])

  const clearHistory = useCallback(() => {
    setMessages([])
    reset()
  }, [reset])

  return (
    <ChatContext.Provider value={{
      messages,
      isChatOpen,
      toggleChat,
      sendMessage,
      clearHistory,
      isLoading: isEngineLoading || isProcessing,
      isLoaded,
      progress,
      status,
      error
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
