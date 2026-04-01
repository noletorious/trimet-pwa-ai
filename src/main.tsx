import ReactDOM from 'react-dom/client'

import { ThemeProvider } from '@/providers/ThemeProvider'
import App from '@/App'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="system" storageKey="app-theme">
    <App />
  </ThemeProvider>,
)
