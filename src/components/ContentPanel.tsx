
export function ContentPanel() {
  return (
    <div id="content-panel" className="w-full h-full bg-background flex flex-col overflow-y-auto rounded-t-2xl">
      {/* Top Header Box */}
      <div className="h-[48px] bg-[#084c8d] w-full flex items-center justify-center px-4 rounded-t-2xl shrink-0">
        <div className="h-4 w-32 bg-white/20 rounded-md"></div>
      </div>

      <div className="p-4 space-y-2 flex-1 bg-white">
        {/* Row 1: First box centered, second box right-aligned */}
        <div className="relative flex items-center justify-center w-full">
          <div className="h-7 w-[100px] bg-gray-200 rounded-md"></div>
          <div className="absolute right-0 h-7 w-[70px] bg-gray-200 rounded-md"></div>
        </div>

        {/* Row 2: Button min-width 250px */}
        <div className="flex gap-4">
          <div className="h-3 min-w-[250px] bg-gray-200 rounded-lg"></div>
          <div className="h-3 min-w-[50px] bg-gray-200 rounded-lg"></div>
        </div>

        {/* Row 3: Gray box placeholders for next arrivals text - centered */}
        <div className="flex flex-row items-center gap-2">
          <div className="h-5 w-38 bg-gray-300 rounded-sm"></div>
          <div className="h-3 w-28 bg-gray-200 rounded-sm"></div>
        </div>

        {/* Row 4: 4 Cards stacked, shorter with gaps */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-h-[44px] bg-white border border-gray-200 rounded-xl shadow-sm p-3 flex items-center gap-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full shrink-0"></div>
              <div className="space-y-1 flex-1">
                <div className="h-2.5 w-3/4 bg-gray-200 rounded-sm"></div>
                <div className="h-2.5 w-1/2 bg-gray-200 rounded-sm"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
