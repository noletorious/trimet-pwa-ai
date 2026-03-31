import { useState, useCallback } from 'react'
import { CreateMLCEngine, InitProgressReport, MLCEngine } from '@mlc-ai/web-llm'

export type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export function useWebLLM() {
  const [engine, setEngine] = useState<MLCEngine | null>(null)
  const [isInitializing, setIsInitializing] = useState(false)
  const [progress, setProgress] = useState<InitProgressReport | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'You are a helpful AI assistant integrated into the local TriMet transit app prototype.' }
  ])
  const [isGenerating, setIsGenerating] = useState(false)

  // Use a smaller model by default so prototyping is fast
  const modelId = "Llama-3.1-8B-Instruct-q4f32_1-MLC-1k"

  const init = useCallback(async () => {
    if (engine || isInitializing) return
    setIsInitializing(true)
    
    try {
      const newEngine = await CreateMLCEngine(modelId, {
        initProgressCallback: (progressReport) => {
          setProgress(progressReport)
        }
      })
      setEngine(newEngine)
    } catch (error) {
      console.error("WebLLM initialization failed", error)
    } finally {
      setIsInitializing(false)
    }
  }, [engine, isInitializing])

  const chat = useCallback(async (text: string) => {
    if (!engine) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setIsGenerating(true)

    try {
      const chunks = await engine.chat.completions.create({
        messages: newMessages as any, // type map matches roughly
        stream: true
      })

      let assistantResponse = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      for await (const chunk of chunks) {
        const delta = chunk.choices[0]?.delta.content || ''
        assistantResponse += delta
        setMessages(prev => {
          const m = [...prev]
          m[m.length - 1].content = assistantResponse
          return m
        })
      }
    } catch(err) {
      console.error("Chat error", err)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }])
    } finally {
      setIsGenerating(false)
    }
  }, [engine, messages])

  return {
    engine,
    isInitializing,
    progress,
    init,
    chat,
    messages,
    isGenerating
  }
}
