

export function MapControls() {
  return (
    <div id="map-controls" className="flex flex-col gap-3 p-4 items-center">
      {/* Set 1: One button, round circle */}
      <div className="flex bg-white hover:bg-gray-50 cursor-pointer h-[46px] w-[46px] rounded-full shadow-md border border-gray-200 items-center justify-center transition-colors">
        <div className="h-5 w-5 bg-gray-300 rounded-full" />
      </div>

      {/* Set 2: 4 grouped, rounded corners */}
      <div className="flex flex-col rounded-[12px] overflow-hidden shadow-md border border-gray-200 bg-white w-[46px]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-[46px] w-[46px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${i !== 4 ? 'border-b border-gray-200' : ''}`}>
            <div className="h-5 w-5 bg-gray-300 rounded-full" />
          </div>
        ))}
      </div>

      {/* Set 3: 1 button, rounded corners */}
      <div className="flex bg-white hover:bg-gray-50 cursor-pointer h-[46px] w-[46px] rounded-[12px] shadow-md border border-gray-200 items-center justify-center transition-colors">
        <div className="h-5 w-5 bg-gray-300 rounded-full" />
      </div>
    </div>
  )
}
