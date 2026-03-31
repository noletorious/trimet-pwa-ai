import { useState } from 'react'
import { z } from 'zod'

interface FormState {
  isSubmitting: boolean
  error: string | null
  success: boolean
}

export function useFormState() {
  const [state, setState] = useState<FormState>({
    isSubmitting: false,
    error: null,
    success: false,
  })

  const startSubmit = () => {
    setState({ isSubmitting: true, error: null, success: false })
  }

  const setError = (error: string) => {
    setState({ isSubmitting: false, error, success: false })
  }

  const setSuccess = () => {
    setState({ isSubmitting: false, error: null, success: true })
  }

  const reset = () => {
    setState({ isSubmitting: false, error: null, success: false })
  }

  return { ...state, startSubmit, setError, setSuccess, reset }
}

/**
 * Helper to validate and handle form submission
 */
export async function handleFormSubmit<T>(
  data: unknown,
  schema: z.ZodSchema,
  handler: (validData: T) => Promise<void>
) {
  try {
    const validData = schema.parse(data) as T
    await handler(validData)
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
