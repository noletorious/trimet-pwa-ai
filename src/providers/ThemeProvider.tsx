import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ColorScheme = 'default' | 'blue' | 'purple' | 'green'

interface ThemeContextType {
  theme: Theme
  colorScheme: ColorScheme
  setTheme: (theme: Theme) => void
  setColorScheme: (scheme: ColorScheme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  defaultColorScheme?: ColorScheme
  colorSchemeStorageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  defaultColorScheme = 'default',
  colorSchemeStorageKey = 'color-scheme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme
  })

  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => {
    if (typeof window === 'undefined') return defaultColorScheme
    return (localStorage.getItem(colorSchemeStorageKey) as ColorScheme) || defaultColorScheme
  })

  const [isDark, setIsDark] = useState(false)

  // Determine if system prefers dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      const isDarkMode = mediaQuery.matches
      setIsDark(isDarkMode)
      applyTheme(theme === 'system' ? (isDarkMode ? 'dark' : 'light') : theme)
    }

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const applyTheme = (themeToApply: 'light' | 'dark') => {
    const htmlElement = document.documentElement

    if (themeToApply === 'dark') {
      htmlElement.classList.add('dark')
      setIsDark(true)
    } else {
      htmlElement.classList.remove('dark')
      setIsDark(false)
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(storageKey, newTheme)

    if (newTheme === 'system') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(isDarkMode ? 'dark' : 'light')
    } else {
      applyTheme(newTheme)
    }
  }

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme)
    localStorage.setItem(colorSchemeStorageKey, scheme)

    const htmlElement = document.documentElement
    // Remove all theme classes
    htmlElement.classList.remove('theme-blue', 'theme-purple', 'theme-green')
    // Add the new theme class if not default
    if (scheme !== 'default') {
      htmlElement.classList.add(`theme-${scheme}`)
    }
  }

  // Initialize color scheme on mount
  useEffect(() => {
    setColorScheme(colorScheme)
  }, [])

  const value: ThemeContextType = {
    theme,
    colorScheme,
    setTheme,
    setColorScheme,
    isDark,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
