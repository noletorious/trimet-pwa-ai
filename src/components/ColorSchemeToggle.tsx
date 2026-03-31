import { useTheme } from '@/providers/ThemeProvider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Palette } from 'lucide-react'

const colorSchemes = [
  { id: 'default', label: 'Default', color: 'bg-gradient-to-r from-slate-900 to-slate-700' },
  { id: 'blue', label: 'Blue', color: 'bg-gradient-to-r from-blue-600 to-blue-400' },
  { id: 'purple', label: 'Purple', color: 'bg-gradient-to-r from-purple-600 to-purple-400' },
  { id: 'green', label: 'Green', color: 'bg-gradient-to-r from-green-600 to-green-400' },
] as const

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change color scheme">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change color scheme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {colorSchemes.map((scheme) => (
          <DropdownMenuItem
            key={scheme.id}
            onClick={() => setColorScheme(scheme.id as any)}
            className="flex items-center gap-2"
          >
            <div className={`h-3 w-3 rounded-full ${scheme.color}`} />
            <span>{scheme.label}</span>
            {colorScheme === scheme.id && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
