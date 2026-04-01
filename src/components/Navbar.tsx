import { Menu, ShieldCheck, Globe, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChat } from '@/providers/ChatProvider'

// @ts-expect-error - TS doesn't have an SVG module declaration file yet
import rosetteInner from '@/media/rosette-inner.svg'

export function Navbar() {
  const { toggleChat } = useChat()
  return (
    <nav id="navbar" className="h-[50px] bg-[#084c8d] flex flex-none items-center justify-between px-4 sm:px-6 lg:px-8 z-50 overflow-hidden text-white relative">
      <div className="flex items-center gap-3 relative z-10 w-full h-full">
        <img src={rosetteInner} alt="TriMet Logo" className="h-[30px] w-[30px]" />
        <h1 className="text-[17px] font-semibold tracking-tight whitespace-nowrap hidden sm:block">TriMet Prototype</h1>
        
        {/* Dynamic SVG Stripe */}
        <div className="hidden sm:block opacity-90 h-full w-[200px] overflow-hidden ml-2 relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 143.1" role="img" aria-hidden="true" fill="#d1441e" className="w-full h-full" preserveAspectRatio="none">
            <path d="M284.9 378.6h191.6l-244.2-605H40.6zM528.1 378.6h64.1l-244.3-605h-64zM158.6 378.6H255l-244.3-605h-96.4z"></path>
          </svg>
        </div>
      </div>
      
      <div className="flex items-center gap-2 relative z-10 ml-auto flex-shrink-0 text-white/90">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:text-white hover:bg-white/10 cursor-pointer" 
          aria-label="AI Assistant"
          onClick={toggleChat}
        >
          <Sparkles className="h-5 w-5" />
        </Button>
        
        <div className="opacity-50 pointer-events-none">
          <Button variant="ghost" size="icon" className="text-white" aria-label="Security">
            <ShieldCheck className="h-5 w-5" />
          </Button>
        </div>

        <div className="opacity-50 pointer-events-none">
          <Button variant="ghost" size="icon" className="text-white" aria-label="Language">
            <Globe className="h-5 w-5" />
          </Button>
        </div>

        <div className="opacity-50 pointer-events-none">
          <Button variant="ghost" size="icon" className="text-white" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
