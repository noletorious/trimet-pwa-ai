import { useState, useCallback, useRef } from 'react'
import type { MLCEngineInterface, InitProgressReport, ChatCompletionMessageParam } from '@mlc-ai/web-llm'

// We'll lazy load the CreateMLCEngine to avoid heavy initial bundle size if possible,
// but for simplicity in this prototype we'll import it.
import { CreateMLCEngine } from '@mlc-ai/web-llm'

const SELECTED_MODEL = 'Qwen2-0.5B-Instruct-q4f16_1-MLC'

export interface WebLLMState {
  isLoaded: boolean
  isLoading: boolean
  progress: number
  status: string
  error: string | null
}

export function useWebLLM() {
  const [state, setState] = useState<WebLLMState>({
    isLoaded: false,
    isLoading: false,
    progress: 0,
    status: '',
    error: null
  })
  
  const engineRef = useRef<MLCEngineInterface | null>(null)

  const initialize = useCallback(async () => {
    if (engineRef.current || state.isLoading) return

    setState(s => ({ ...s, isLoading: true, status: 'Initializing engine...' }))
    
    try {
      const engine = await CreateMLCEngine(SELECTED_MODEL, {
        initProgressCallback: (report: InitProgressReport) => {
          setState(s => ({
            ...s,
            progress: report.progress * 100,
            status: report.text
          }))
        }
      })
      
      engineRef.current = engine
      setState(s => ({ ...s, isLoaded: true, isLoading: false, status: 'Ready' }))
    } catch (err: any) {
      console.error('WebLLM init error:', err)
      setState(s => ({ ...s, isLoading: false, error: err.message || 'Failed to load model' }))
    }
  }, [state.isLoading])

  const chat = useCallback(async (
    messages: ChatCompletionMessageParam[],
    onUpdate: (content: string) => void
  ) => {
    if (!engineRef.current) return

    try {
      let fullContent = ''
      const completion = await engineRef.current.chat.completions.create({
        messages,
        stream: true
      })

      for await (const chunk of completion) {
        const delta = chunk.choices[0]?.delta?.content || ''
        if (delta) {
          fullContent += delta
          onUpdate(fullContent)
        }
      }
    } catch (err: any) {
      console.error('WebLLM chat error:', err)
      throw err
    }
  }, [])

  const reset = useCallback(async () => {
    if (engineRef.current) {
      await engineRef.current.resetChat()
    }
  }, [])

  return {
    ...state,
    initialize,
    chat,
    reset
  }
}
